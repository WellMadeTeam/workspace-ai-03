# Observability

This page explains what the backend records about requests and where the team can check it.

## The Signals

The backend will send a request-duration metric to OpenObserve.
It will also send one structured log record for each HTTP request.
The metric includes the `environment`, `route`, and `outcome` labels.
Each log record includes `request_id`, `route`, `outcome`, and `duration_ms`.
This setup uses no traces and defines no alerts.

## The Retention

OpenObserve retains logs and metrics for 30 days in both staging and production.

## The SLIs

An SLI is a number that shows how the service is working.

### SLI-01

HTTP request duration.

- **Status:** Active
- **Definition:** The 95th percentile of HTTP request duration over five minutes, grouped by `environment`, `route`, and `outcome`. The per-request log record carries `request_id`, `route`, `outcome`, and `duration_ms`; `server_error` marks a failed request.
- **Unit:** Milliseconds.
- **Window:** A rolling five-minute window, recalculated every minute. Each per-request log record should be searchable within five seconds.
- **Source:** For every HTTP request, the `backend` records its duration in a histogram and writes a structured log record. It exports both to OpenObserve over OTLP/HTTP.
- **Query:** `histogram_quantile(0.95, sum by (le, environment, route, outcome) (rate(backend_http_request_duration_ms_bucket[5m])))`

The per-request log query is:

```sql
SELECT request_id, route, outcome, duration_ms
FROM backend_requests
WHERE request_id = '<request_id>'
ORDER BY _timestamp DESC
```