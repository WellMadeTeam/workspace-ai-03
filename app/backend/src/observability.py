import logging
import os
from dataclasses import dataclass
from time import perf_counter
from typing import Any
from uuid import uuid4

from fastapi import Request
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
from opentelemetry.exporter.otlp.proto.http.metric_exporter import (
    OTLPMetricExporter,
)
from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader
from opentelemetry.sdk.resources import Resource


request_logger = logging.getLogger("workspace.requests")
request_logger.setLevel(logging.INFO)


@dataclass
class Telemetry:
    environment: str
    logger_provider: LoggerProvider
    meter_provider: MeterProvider
    log_handler: LoggingHandler
    request_duration_histogram: Any


def configure_observability() -> Telemetry | None:
    enabled = os.getenv("OBSERVABILITY_ENABLED", "false").lower() in {
        "1",
        "true",
        "yes",
        "on",
    }

    if not enabled:
        return None

    endpoint = os.getenv("OBSERVABILITY_OTLP_ENDPOINT", "").rstrip("/")
    authorization = os.getenv("OBSERVABILITY_AUTHORIZATION", "").strip()

    if not endpoint:
        raise RuntimeError(
            "OBSERVABILITY_OTLP_ENDPOINT is required when "
            "OBSERVABILITY_ENABLED is true."
        )

    if not authorization:
        raise RuntimeError(
            "OBSERVABILITY_AUTHORIZATION is required when "
            "OBSERVABILITY_ENABLED is true."
        )

    environment = os.getenv("OBSERVABILITY_ENVIRONMENT", "development")
    log_interval_seconds = int(
        os.getenv("OBSERVABILITY_LOG_EXPORT_INTERVAL_SECONDS", "1")
    )
    metric_interval_seconds = int(
        os.getenv("OBSERVABILITY_METRIC_EXPORT_INTERVAL_SECONDS", "10")
    )

    if log_interval_seconds < 1 or metric_interval_seconds < 1:
        raise RuntimeError("Export intervals must be at least one second.")

    resource = Resource.create(
        {
            "service.name": "workspace-ai-backend",
            "deployment.environment.name": environment,
        }
    )

    log_headers = {
        "Authorization": authorization,
        "stream-name": os.getenv(
            "OBSERVABILITY_LOG_STREAM",
            "backend_requests",
        ),
    }

    logger_provider = LoggerProvider(resource=resource)
    logger_provider.add_log_record_processor(
        BatchLogRecordProcessor(
            OTLPLogExporter(
                endpoint=f"{endpoint}/v1/logs",
                headers=log_headers,
            ),
            schedule_delay_millis=log_interval_seconds * 1000,
        )
    )

    metric_reader = PeriodicExportingMetricReader(
        OTLPMetricExporter(
            endpoint=f"{endpoint}/v1/metrics",
            headers={"Authorization": authorization},
        ),
        export_interval_millis=metric_interval_seconds * 1000,
    )
    meter_provider = MeterProvider(
        resource=resource,
        metric_readers=[metric_reader],
    )

    meter = meter_provider.get_meter("workspace-ai.backend")
    request_duration_histogram = meter.create_histogram(
        "backend_http_request_duration_ms",
        unit="ms",
        description="Duration of backend HTTP requests.",
    )

    log_handler = LoggingHandler(
        level=logging.INFO,
        logger_provider=logger_provider,
    )
    request_logger.addHandler(log_handler)
    request_logger.propagate = False

    return Telemetry(
        environment=environment,
        logger_provider=logger_provider,
        meter_provider=meter_provider,
        log_handler=log_handler,
        request_duration_histogram=request_duration_histogram,
    )


async def observe_http_request(request: Request, call_next):
    telemetry = getattr(request.app.state, "telemetry", None)

    if telemetry is None:
        return await call_next(request)

    request_id = uuid4().hex
    request.state.request_id = request_id

    started_at = perf_counter()
    status_code = 500

    try:
        response = await call_next(request)
        status_code = response.status_code
        response.headers["X-Request-ID"] = request_id
        return response
    finally:
        duration_ms = round((perf_counter() - started_at) * 1000, 3)
        route_object = request.scope.get("route")
        route = getattr(route_object, "path", "unmatched")

        if status_code >= 500:
            outcome = "server_error"
        elif status_code >= 400:
            outcome = "client_error"
        else:
            outcome = "success"

        attributes = {
            "environment": telemetry.environment,
            "route": route,
            "outcome": outcome,
        }

        telemetry.request_duration_histogram.record(
            duration_ms,
            attributes,
        )

        request_logger.info(
            "http_request",
            extra={
                "request_id": request_id,
                "route": route,
                "outcome": outcome,
                "duration_ms": duration_ms,
                "environment": telemetry.environment,
            },
        )


def shutdown_observability(telemetry: Telemetry | None) -> None:
    if telemetry is None:
        return

    try:
        telemetry.logger_provider.force_flush(timeout_millis=5000)
        telemetry.meter_provider.force_flush(timeout_millis=5000)
    finally:
        request_logger.removeHandler(telemetry.log_handler)
        request_logger.propagate = True
        telemetry.logger_provider.shutdown()
        telemetry.meter_provider.shutdown()