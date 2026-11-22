# QR-01 QRT-01: 22 November 2026

## Run provenance

The member supplied the following output for the [QR-01 QRT-01](../../docs/quality-requirements/qr/QR-01.md#qrt-01) latency check during the SPRINT-08 closeout.
Codex transcribed and interpreted the supplied output; it did not execute the deployed test.

- **Started:** 2026-11-22 16:03:56 MSK (UTC+03:00).
- **Tested commit:** Awaiting member confirmation; the suggested staging revision was `0fa12cffbe3018876a5e39821625ba00aed98083`, which is not yet confirmed as the tested revision.
- **Environment:** Awaiting confirmation that the target was staging on the university VM and the runner was on the university network.
- **Procedure:** The documented command is `python scripts/check_sync_latency.py "$STAGING_URL"`; the deployment address remains private.
- **Parameters reported:** 10 members, 1,800 seconds, a five-second change interval, and a two-second threshold.

The generated board identifier is omitted from this public evidence because it can provide access to the test board; it remains in the member's original output.

## Supplied output

```text
started: 2026-11-22 16:03:56 MSK
members: 10, duration: 1800 s, interval: 5 s, threshold: 2 s
kind   changes  reads  p95 ms  max ms  over missed
add        114   1026    1036    1305     0      0
move       114   1026    1018    1120     0      0
edit        86    774    1531    1598     0      0
query       28    252    1996    2129    12      0
all        342   3078    1486    2129    12      0
failed reads: 0
socket failures: 0
result: FAIL: 12 reads over 2 s, 0 missed
```

## Interpretation

The supplied run fails the fixed criterion: every change must reach every other member within two seconds, with zero missed reads.
All 12 threshold violations are query-message reads, whose maximum latency is 2,129 ms; the query p95 of 1,996 ms does not override those violations.
Add, move, and edit reads have no reported threshold violation.
No missed reads, failed reads, or socket failures were reported across 342 changes and 3,078 reads.
This check measures visibility of the submitted query message, not the LLM service provider's reply time.
The output does not establish the root cause or a completed fix.

The [testing plan](../../docs/project-plan.md#quality-requirement-testing-plan) retains the failed requirement rather than dropping it or claiming a pass.
The exact revision and environment must be confirmed before this evidence is treated as a fully documented deployed check or the release is tagged.
The run occurred on 22 November, after SPRINT-08's planned 21 November deadline; it is recorded as sprint-closeout evidence without claiming on-time completion.
