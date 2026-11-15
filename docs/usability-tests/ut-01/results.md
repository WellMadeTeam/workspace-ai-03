# UT-01 Results

This is an empty results template; no sessions, findings, or QR verdict are reported here.
Fill it from the [analysis plan](README.md#analysis-plan) after the counted sessions.

## The Results

### Sample and exclusions

| Condition | Participants | Distinct teams | Team runs | Team sizes | Excluded runs and reasons | Missing data |
| --------- | ------------ | -------------- | --------- | ---------- | ------------------------- | ------------ |

### Team-task results

One row per team run and task; a shared result is counted once in team aggregates.
Use the full task names from UT-01.

| Team run | Condition | Task | Outcome | Help given | Elapsed minutes | Stop reason | Sanitized session evidence |
| -------- | --------- | ---- | ------- | ---------- | --------------- | ----------- | -------------------------- |

### Participant-task results

One row per participant and task.
The shared outcome and help refer to the team-task record and do not represent independently assessed individual success.
Link the participant code to its sanitized session note.

| Participant | Team run | Condition | Task | Shared outcome | Shared help | Team-task evidence | SEQ (1–7) | Tool switches | Observed minutes | Coverage complete? |
| ----------- | -------- | --------- | ---- | -------------- | ----------- | ------------------ | --------- | ------------- | ---------------- | ------------------ |

### Individual SUS scores

| Participant | Team run | Condition | All ten answers present? | SUS score or missing reason |
| ----------- | -------- | --------- | ------------------------ | --------------------------- |

### Observer ratings

One row per observer, team run, and task; multiple observers do not create additional team runs.

| Observer GitHub username | Team run | Condition | Task | Rating (1–7) or missing reason |
| ----------------------- | -------- | --------- | ---- | ----------------------------- |

### Tool switches per team task

Sum participant counts and observed minutes only when every participant's task interval has complete coverage.

| Team run | Condition | Task | Total switches | Observed participant-minutes | Switches per participant-minute | Coverage gap |
| -------- | --------- | ---- | -------------- | ---------------------------- | ------------------------------- | ------------ |

### Aggregate team measures

Use one row per task, measure, and condition.
Report main-task completion and unaided completion as counts and percentages; report outcome counts and median elapsed minutes for each task.
Report median switch totals and median switch rates for each task.
Retain failed attempts in the outcome denominator and time summaries; report missing outcomes separately.

| Condition | Task | Measure | Value | Numerator, if applicable | Valid team runs | Missing or excluded runs |
| --------- | ---- | ------- | ----- | ------------------------ | --------------- | ------------------------ |

### Aggregate questionnaire and observer measures

Report median SEQ per task, overall SUS mean and median, and the frequency of each observer score per task, separately by condition.
Specify whether the denominator counts participants or observer ratings and include the contributing team-run count.

| Condition | Task or all tasks | Measure | Value | Valid responses | Response unit | Team runs | Missing responses |
| --------- | ----------------- | ------- | ----- | --------------- | ------------- | --------- | ----------------- |

### Condition comparison

Show task outcomes, durations, help, SEQ, observer scores, and SUS summaries side by side.
For switches, also calculate the shared-board minus control difference in median switches per participant-minute for each task when both values are available.
No statistical significance or causal effect is claimed.

| Task or all tasks | Measure | Shared-board summary and valid n/unit | Control summary and valid n/unit | Switch-rate difference, if applicable | Interpretation and limitations |
| ----------------- | ------- | ------------------------------------- | -------------------------------- | ------------------------------------- | ------------------------------ |

## Findings

Duplicate this template as `### Finding 1`, `### Finding 2`, and so on only after evidence supports a finding.
Retain stable finding anchors once published.

```markdown
### Finding 1

- **Severity:** Critical / Major / Minor — reason
- **Tasks:** task names, team runs, and UT-01 P-nn codes
- **Evidence:** observation or measure linked to sanitized session notes or aggregate tables
- **Recommendation:** proposed change or None
- **Task issue:** issue link or None
```

### Triage

| Finding | Severity and reason | Task issue or reason for no task | Planned sprint | Disposition or deferral reason |
| ------- | ------------------- | -------------------------------- | -------------- | ------------------------------ |

## Instrumentation Comparison

For the board condition, correlate task timestamps and the private run-to-board mapping with the specified staging events.
Keep raw telemetry and opaque board identifiers private.
Control runs have no product telemetry; mark event coverage as not applicable.

| Team run | Condition | Task | Observer evidence | Event coverage | Agreement or discrepancy | Coverage gap |
| -------- | --------- | ---- | ----------------- | -------------- | ------------------------ | ------------ |

## Limitations

Record sample sizes, condition allocation, team sizes, related observations within teams, repeat runs, participants' relation to the target user, and environment.
Disclose exclusions, missing responses, incomplete switch observations, and instrumentation gaps.
One team run per condition permits a description of those runs only.

## Conclusion

Answer the research questions using the evidence above and describe remaining uncertainty.
The QR/QRT verdict belongs in the project plan's testing row, with its date and evidence link, after the chosen measure and bar are fixed and evaluated.
