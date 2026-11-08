# Observability

This page explains what the backend records about requests and where the team can check it.

## The Signals

The backend will send a request-duration metric to OpenObserve.
It will also send one structured log record for each HTTP request.
The metric includes the `environment`, `route`, and `outcome` labels.
Each log record includes `request_id`, `route`, `outcome`, and `duration_ms`.
This increment uses no traces and defines no alerts.