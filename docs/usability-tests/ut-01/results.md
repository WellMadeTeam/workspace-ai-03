# UT-01 Qualitative Record

The currently confirmed counted-session total is one: UT-01 P-01.
UT-01 P-02 and UT-01 P-03 remain partially unconfirmed for eligibility and are not currently counted.
The [confirmation summary from #398](sessions/README.md#eligibility-consent-and-capture-confirmation) records prior consent for all three participants, explained telemetry and observer capture with no video, and no withdrawals.

The minimum of three counted sessions is not met.
Under [Assignment 8 Part 3](https://github.com/inno-itpd/itpd/blob/main/assignments/assignment-8.md#part-3-write-the-results) and [the shortfall rule](https://github.com/inno-itpd/itpd/blob/main/requirements/usability-testing-requirements.md#the-week-8-execution), UT-01 remains `Planned` and this page records qualitative observations without aggregate statistics or a completed usability-result claim.
The three observation records and individual questionnaires are retained with their counting status explicit.
The [numbered findings](#findings) analyze this evidence; product decisions await triage in [#386](https://github.com/WellMadeTeam/workspace-ai-03/issues/386), and the [conclusion](#quality-requirement-and-product-response) states the current testing-plan status.

## Session count and shortfall

The three participants took part together in T-01 on 19 November 2026 during [SPRINT-08](../../project-plan.md#sprint-08).
They were software-development students using laptops on staging in person on the university network, as reported by the team.
Task outcomes and assistance include retrospective clarification; exact task timings were not recorded.

| Participant | Eligibility | Prior consent and capture | Withdrawals | Use in this record |
| --- | --- | --- | --- | --- |
| [UT-01 P-01](sessions/P-01.md) | All checks confirmed | Consent preceded explained telemetry and observer capture; no video | None reported | One currently confirmed counted session |
| [UT-01 P-02](sessions/P-02.md) | Partially unconfirmed | Consent preceded explained telemetry and observer capture; no video | None reported | Exploratory; not currently counted |
| [UT-01 P-03](sessions/P-03.md) | Partially unconfirmed | Consent preceded explained telemetry and observer capture; no video | None reported | Exploratory; not currently counted |

The outstanding individual eligibility checks for P-02 and P-03 are not specified; do not infer which criteria were met or failed.
The underlying consent, capture, and eligibility records remain private.
Recruitment did not provide a control group; the customer had agreed it was desirable but optional depending on recruitment.
No supplementary run took place.
The shared observed team attempt is not an independent attempt by each participant.

## Observations

### Team-task results

Each row describes an observed task attempt by the mixed-eligibility team.
It is not a qualified team-run denominator or evidence of three counted participant sessions.
The full scenarios and planned time limits remain in [UT-01](README.md#the-tasks).

| Team run | Task | Outcome | Help given | Elapsed minutes | Sanitized evidence |
| --- | --- | --- | --- | --- | --- |
| T-01 | Task 1: Brainstorm ideas and select one | Assisted | Editing-related technical difficulties for P-01; all participants asked questions about functionality and received assistance. | Not recorded | [Shared task record](sessions/README.md#t-01-shared-task-record) |
| T-01 | Task 2: Reuse another member's AI answer | Assisted | All three participants asked questions about functionality and received assistance. | Not recorded | [Shared task record](sessions/README.md#t-01-shared-task-record) |
| T-01 | Task 3: Create and share a diagram | Assisted | All three participants needed a substantial hint to locate the feature. | Not recorded | [Shared task record](sessions/README.md#t-01-shared-task-record) |

All tasks were reported as completed, rather than stopped early.
Detailed end-state descriptions and evidence of completion within the planned time limits are unavailable in the supplied notes and questionnaires.
Do not substitute the planned limits, questionnaire timestamps, request latencies, or the telemetry collection window for task duration.

### Participant-task results

The outcomes below reference the shared observed team attempt; assistance descriptions are participant-specific where available.
Only P-01 is currently counted; P-02 and P-03 rows are exploratory observations while eligibility is partially unconfirmed.
`Not collected` and `Not recorded` are missing data, not numeric zero.

| Participant | Team run | Task | Shared outcome | Assistance | SEQ (1–7) | Tool switches | Observed minutes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [P-01](sessions/P-01.md#task-results) | T-01 | Task 1 | Assisted | Editing-related technical difficulties and questions about functionality. | Not collected | Not recorded | Not recorded |
| [P-01](sessions/P-01.md#task-results) | T-01 | Task 2 | Assisted | Questions about functionality; assistance received. | Not collected | Not recorded | Not recorded |
| [P-01](sessions/P-01.md#task-results) | T-01 | Task 3 | Assisted | Substantial hint to locate diagram creation. | Not collected | Not recorded | Not recorded |
| [P-02](sessions/P-02.md#task-results) | T-01 | Task 1 | Assisted | Questions about functionality; assistance received. | Not collected | Not recorded | Not recorded |
| [P-02](sessions/P-02.md#task-results) | T-01 | Task 2 | Assisted | Questions about functionality; assistance received. | Not collected | Not recorded | Not recorded |
| [P-02](sessions/P-02.md#task-results) | T-01 | Task 3 | Assisted | Substantial hint to locate diagram creation. | Not collected | Not recorded | Not recorded |
| [P-03](sessions/P-03.md#task-results) | T-01 | Task 1 | Assisted | Questions about functionality; assistance received. | Not collected | Not recorded | Not recorded |
| [P-03](sessions/P-03.md#task-results) | T-01 | Task 2 | Assisted | Questions about functionality; assistance received. | Not collected | Not recorded | Not recorded |
| [P-03](sessions/P-03.md#task-results) | T-01 | Task 3 | Assisted | Substantial hint to locate diagram creation. | Not collected | Not recorded | Not recorded |

### Individual SUS scores

The formula and planned questionnaire are in [surveys.md](surveys.md#sus-scoring).
All ten numeric answers are present for each respondent; raw answers remain private.
These are individual questionnaire records, not a three-counted-participant SUS result.
P-02 and P-03 questionnaire records remain exploratory while eligibility is partially unconfirmed.
No SUS mean, median, or other aggregate statistic is published.
The shortened fourth statement differs from the planned wording, so scores must be interpreted with that instrument limitation.

| Participant | Team run | Condition | All ten answers present? | SUS score |
| --- | --- | --- | --- | --- |
| [P-01](sessions/P-01.md#sus-and-post-test) | T-01 | Shared board | Yes | 77.5 |
| [P-02](sessions/P-02.md#sus-and-post-test) | T-01 | Shared board | Yes | 72.5 |
| [P-03](sessions/P-03.md#sus-and-post-test) | T-01 | Shared board | Yes | 52.5 |

### Missing measures and withheld aggregates

SEQ was not collected after any task.
Task durations, participant tool-switch counts and observation durations, and observer ease ratings were not recorded in the supplied material.
Missing measurements are not zero values and cannot be reconstructed from SUS, post-test comments, questionnaire timestamps, planned task limits, or HTTP request latencies.

Completion percentages, unaided proportions, mean or median SUS, median SEQ, median task times, switch totals/rates, and observer-rating distributions are not published under the fewer-than-three-counted-session rule.
The individual questionnaires above do not establish a qualified sample for those summaries.
There is no control comparison, and exploratory observations do not establish a product benefit or a population effect.

## Thematic analysis

The following exploratory themes organize the observed difficulties within T-01.
Only P-01 is currently counted; references to P-02 and P-03 describe exploratory evidence, not additional counted sessions.
The support codes identify related observations in one team, not independent replication across teams.
The [findings](#findings) apply the [planned severity definitions](README.md#qualitative-analysis-and-severity) and link the evidence for each assessment.
Severity is an analytical assessment for team review, not a record of approved triage or committed fixes.

| Theme | Supporting evidence | Findings and interpretation |
| --- | --- | --- |
| Feature discovery requires guidance | [P-01](sessions/P-01.md#task-results), [P-02](sessions/P-02.md#task-results), and [P-03](sessions/P-03.md#task-results) all needed a substantial hint to locate diagram creation; all tasks involved functionality questions. | [Finding 1](#finding-1): Major; substantial help was explicitly reported for diagram discovery. |
| AI capabilities and context behavior do not match expectations | [P-02](sessions/P-02.md#connections-and-context) was unsure what connections pass to AI and wanted AI to act beyond its block; [P-03](sessions/P-03.md#ai-capabilities-and-output) expected AI to create text blocks. All three needed assistance on Task 2. | [Finding 2](#finding-2): Minor; the records establish uncertainty and assistance but not substantial help attributable specifically to the capability mismatch. |
| Reading and editing areas create friction | [P-01](sessions/P-01.md#reading-and-reusing-replies) and [P-02](sessions/P-02.md#block-interaction) had a small reply area; P-01 also had preview/edit confusion and P-02 a small message-edit field. | [Finding 3](#finding-3) and [Finding 4](#finding-4): Minor; the records establish editing and reading friction without verified loss of work or substantial help caused by each issue. |

The positive feedback also has support from multiple participants: [P-02](sessions/P-02.md#sus-and-post-test) valued context from multiple blocks and convenient block/connection creation, while [P-03](sessions/P-03.md#sus-and-post-test) valued everyone working in one place.
This is perceived value reported by these participants, not a measured improvement over their usual workflow.
P-01's Delete-key and undo concerns, and P-03's ownership/status/comment requests, remain attributed observations rather than being represented as recurring themes on their own.
[Finding 4](#finding-4) also retains participant-specific customization, visualization, output-block, and export requests, and the observer-noted language mismatch, without treating each as a recurring theme.
[Finding 7](#finding-7) records the explicit onboarding request, and [Finding 8](#finding-8) records connection-type and dragging requests without treating unattributed group feedback as independent participant reports.
No Critical incident is established by the supplied sanitized notes.

## Findings

These findings describe the single T-01 team run, not independent observations from several teams.
Severity follows the [definitions fixed in the study plan](README.md#qualitative-analysis-and-severity).
Recommendations are proposed responses for team review; they are not commitments, approved scope changes, or scheduled fixes.
A `None` task issue means no product follow-up issue is linked yet; it is not a decision to decline the recommendation.
Where the original observations lack task boundaries, the task field distinguishes the relevant flow from an established occurrence in a specific task.

### Finding 1

Diagram creation was not discoverable without a substantial hint.

- **Severity:** Major — every participant needed a substantial hint to locate the feature before the team completed the diagram task.
- **Tasks:** UT-01 Task 3; UT-01 P-01, UT-01 P-02, and UT-01 P-03 in T-01.
- **Evidence:** The [shared task record](sessions/README.md#t-01-shared-task-record) confirms Assisted completion and the discovery hint for all three participants; [P-01's feedback](sessions/P-01.md#feature-discovery) also identifies the problem and suggests a dedicated control.
- **Recommendation:** Provide a clearly labelled entry point for diagram creation and explain how a generated diagram can be made available on the board; verify discoverability with an unaided task before accepting the change.
- **Task issue:** None

The explicit substantial hint supports Major severity.
The result is one shared team attempt; the three participant records do not make three independent diagram failures.
The evidence does not establish a rendering defect or the exact time needed to discover the feature.

### Finding 2

Participants were unsure how connections supply context and expected AI actions beyond an AI block's actual capabilities.

- **Severity:** Minor — uncertainty, assistance, and manual-transfer friction were recorded, but the evidence does not establish substantial help or inability to use a central feature caused specifically by this mismatch.
- **Tasks:** UT-01 Task 2; UT-01 P-01, UT-01 P-02, and UT-01 P-03 received functionality assistance. Specific capability observations are attributed to P-02 and P-03; P-01's copying difficulty and ambiguous P-02/P-03 copying observations have no recorded task boundary.
- **Evidence:** [P-02](sessions/P-02.md#connections-and-context) was unsure whether a connection would pass content and wanted AI to act beyond its block; [P-03](sessions/P-03.md#ai-capabilities-and-output) expected AI to create text blocks. [P-01](sessions/P-01.md#reading-and-reusing-replies) found copying inconvenient; the [shared observations](sessions/README.md#shared-observations) retain ambiguous P-02/P-03 attribution without duplicating it. The [team-task results](#team-task-results) record Assisted context reuse.
- **Recommendation:** Explain connection direction and show which blocks supply an AI block's context; make the limits of AI actions explicit and assess a direct reply-to-text transfer action before choosing whether to expand AI capabilities.
- **Task issue:** None

The earlier thematic draft proposed Major severity from the Assisted context-reuse result.
The task outcome does not identify the amount or cause of every intervention, so this finding uses Minor until stronger evidence supports a higher severity.
Participant requests for automatic block creation are expectations, not evidence that such a feature was promised or that the LLM service provider failed.

### Finding 3

Editing and selection controls were not sufficiently clear to participants.

- **Severity:** Minor — preview/edit confusion and selection help were observed, but no substantial intervention attributable to these specific controls or loss of work is established.
- **Tasks:** UT-01 Task 1; UT-01 P-01 received editing-related technical assistance. UT-01 P-02's Ctrl-selection observation is cross-task; the source does not identify its task.
- **Evidence:** [P-01](sessions/P-01.md#editing-and-recovery) tried to edit while the side panel was in preview mode and did not recognize the mode; [P-02](sessions/P-02.md#block-interaction) needed help discovering Ctrl-based selection. [P-01's task results](sessions/P-01.md#task-results) confirm editing-related assistance during Task 1 without identifying which individual issue caused it.
- **Recommendation:** Make the active preview/edit mode and the action to switch modes visible; expose a short selection hint and check that participants can discover both controls without coaching.
- **Task issue:** None

This does not establish that the preview mode itself was a technical failure.
The reported Task 1 editing difficulties and the mode observation are related evidence, but the source does not prove that they are the same incident.

### Finding 4

Participants wanted clearer reply presentation, more adaptable output blocks, and ways to organize and export their results.

- **Severity:** Minor — cramped reading/editing areas and presentation difficulties were observed, while customization, output-block, and export requests describe desired improvements; no task failure or substantial intervention attributable to these specific issues is established.
- **Tasks:** Cross-task observations and post-test feedback from UT-01 P-01, UT-01 P-02, and UT-01 P-03 in the UT-01 Task 1–3 run; reading and reusing replies is relevant to Task 1 and Task 2, but exact observation boundaries were not recorded. Export was a post-test request, not a tested task.
- **Evidence:** [P-01](sessions/P-01.md#reading-and-reusing-replies) had a small reply area, verbose/unstructured output, broken table formatting, and an English reply despite primarily using Russian; the language mismatch was an observer observation. [P-02](sessions/P-02.md#block-interaction) also had a small reply area and message-edit field; [presentation feedback](sessions/P-02.md#presentation-and-onboarding) requests title-only text blocks, customization, stronger visualization, and export. [P-03's feedback](sessions/P-03.md#collaboration-feedback) and [post-test](sessions/P-03.md#sus-and-post-test) request more specific outputs and dedicated output blocks. The [shared observations](sessions/README.md#shared-observations) also note unused text-block titles without identifying individual participants.
- **Recommendation:** Review reading/editing space and long-reply/table rendering; investigate reply-language handling separately from rendering. Evaluate title-only and customizable block presentation, dedicated output blocks, visual organization of schedules and ideas, and export of results as separate candidate improvements during triage.
- **Task issue:** None

Only the cramped reply area has explicit support from both P-01 and P-02.
Table formatting, verbose output, and the observer-noted language mismatch remain P-01 observations.
Title-only presentation, customization, visualization, and export are attributed to P-02; more specific outputs and dedicated output blocks are attributed to P-03.
Unused titles do not by themselves establish why participants avoided them.
No participant-level reading times or export attempt were recorded.
This grouping keeps related result-presentation requests visible for triage; it does not imply that all requests have one cause, require one implementation task, or were independently reported by every participant.

### Finding 5

Expected keyboard actions for deletion and recovery did not match P-01's experience.

- **Severity:** Minor — the participant reported a non-working expected Delete action and wanted undo, but no unintended deletion, loss of work, or task failure is established.
- **Tasks:** Cross-task observation from UT-01 P-01 during the three-task run; the source does not identify a specific task for the keyboard actions.
- **Evidence:** [P-01's editing and recovery observations](sessions/P-01.md#editing-and-recovery) record that Delete did not work as expected and that the participant wanted Ctrl+Z to restore blocks; [post-test feedback](sessions/P-01.md#sus-and-post-test) repeats the Delete-key request.
- **Recommendation:** Reproduce the Delete-key behavior with the correct focus and selected-block state, then document or correct the supported shortcut; evaluate undo separately as a requested recovery capability.
- **Task issue:** None

This is a finding from one participant, not a recurring theme.
The Delete report is not a confirmed root cause, and the undo request does not prove that data was actually lost.

### Finding 6

Shared activity and the distinction between members and AI were unclear, and participants wanted stronger collaboration support.

- **Severity:** Minor — unclear edit authorship, AI-status feedback, and color interpretation were reported, while comments were requested as an improvement; no conflicting edit, lost work, or inability to complete a task because of these issues is established.
- **Tasks:** Cross-task observations and post-test feedback from UT-01 P-03 in the UT-01 Task 1–3 run; the shared color interpretation has no individual participant attribution or exact task boundary.
- **Evidence:** [P-03's collaboration observations](sessions/P-03.md#exploration-and-collaboration) identify unclear edit authorship; [collaboration feedback](sessions/P-03.md#collaboration-feedback) and [post-test feedback](sessions/P-03.md#sus-and-post-test) request ownership indicators, AI generation status, and comments for communication within the team. The [shared observations](sessions/README.md#shared-observations) record that participants interpreted blue as another member rather than AI, without identifying each contributor.
- **Recommendation:** Evaluate clear labels or icons distinguishing AI from member activity, lightweight authorship/activity and generation-state indicators, and comments for team discussion. Review the need for these capabilities before deciding whether accounts or persistent ownership are necessary.
- **Task issue:** None

Ownership, generation-status, and comment requests are attributed to P-03; the unattributed group color observation is not counted as an independent report from every participant.
Comments are a requested capability, not an observed failure of an existing commenting feature.
The observer's separate generation-status idea is not counted as a second participant request.

### Finding 7

Participants asked for onboarding to explain how to use the board's features.

- **Severity:** Minor — missing onboarding was reported and functionality questions occurred across tasks, but the evidence does not establish that an onboarding omission caused a specific task failure or substantial intervention.
- **Tasks:** Cross-task feedback from the UT-01 Task 1–3 run; UT-01 P-02 explicitly requested onboarding, and the shared notes also record group feedback without identifying each contributor.
- **Evidence:** [P-02's presentation and onboarding feedback](sessions/P-02.md#presentation-and-onboarding) explicitly requests onboarding; the [shared observations](sessions/README.md#shared-observations) also report missing onboarding. The [team-task results](#team-task-results) record functionality assistance on all three tasks.
- **Recommendation:** Evaluate a short introduction to block types, selection, editing modes, context connections, and diagram creation, with guidance available again when needed; verify that it helps participants attempt the existing tasks without facilitator explanations.
- **Task issue:** None

The group statement does not identify several independent respondents and is not counted as additional independent support beyond P-02.
The substantial diagram-discovery hint is assessed separately in [Finding 1](#finding-1); onboarding is a proposed response, not an established cause or a proven solution for that difficulty.

### Finding 8

P-02 requested more connection types and connections without arrows; P-01 unsuccessfully tried to reconnect by dragging a connection line.

- **Severity:** Minor — P-01's attempted reconnection did not work as expected and P-02 requested more connection types, but no task failure, lost work, or substantial intervention attributable to these specific interactions is established.
- **Tasks:** Cross-task observations and post-test feedback from the UT-01 Task 1–3 run; UT-01 P-01 supports the reconnection difficulty and UT-01 P-02 supports the connection-type request. These interactions concern context setup in UT-01 Task 2, but their exact task of occurrence was not recorded.
- **Evidence:** [P-01's editing and recovery observations](sessions/P-01.md#editing-and-recovery) describe an unsuccessful attempt to reconnect by dragging a connection line; [P-02's post-test](sessions/P-02.md#sus-and-post-test) requests more connection types, and [connection feedback](sessions/P-02.md#connections-and-context) requests connections without arrows. The [shared observations](sessions/README.md#shared-observations) record group concerns about arrow direction. Individual contributors to the group feedback are not identified.
- **Recommendation:** Clarify which connection types participants intended and what each should mean; evaluate endpoint reconnection in response to P-01's attempt. Consider direction-independent context and moving a connection line independently of its endpoints only as design options to validate with members, separately from arrow appearance. Define the intended context behavior before changing it and show members which content a connection supplies.
- **Task issue:** None

The requested types and their exact semantics were not recorded, so this finding does not prescribe a new relationship model or assume that every type should pass context.
P-02's arrowless-connection request concerns appearance; it does not establish a request for direction-independent context.
The linked notes establish neither direction-independent context nor moving a connection line independently of its endpoints as participant requests.
Those two ideas are recommendation options requiring validation, not evidence of a defect in the current directional model or an approved change to context semantics.

### Product-response coordination

[Finding 1](#finding-1) is Major; [Finding 2](#finding-2), [Finding 3](#finding-3), [Finding 4](#finding-4), [Finding 5](#finding-5), [Finding 6](#finding-6), [Finding 7](#finding-7), and [Finding 8](#finding-8) are Minor under the recorded severity definitions.
No Critical finding is supported by the supplied evidence.
Each recommendation awaits triage in [#386](https://github.com/WellMadeTeam/workspace-ai-03/issues/386), including whether it creates a task, its planned sprint, and the reason for any deferral or rejection.
The significant Major finding requires follow-up consideration under that task; no product issue or schedule is created by this analysis.
The [quality requirement and product response](#quality-requirement-and-product-response) section states the current testing-plan status; this analysis does not establish a completed test.

## Instrumentation Comparison

### Export scope and observed events

The private staging export was inspected within the team's reported collection window, excluding records outside that window.
This qualitative record reports event presence and coverage rather than event-count statistics.

| Event name | Coverage within the reported window |
| --- | --- |
| `board_opened` | Present |
| `ai_block_created` | Present |
| `connection_created` | Present |
| `query_submitted` | Present |
| `reply_received` | Present |
| `query_failed` | Present |
| `context_reuse_query_submitted` | Present |
| `context_reuse_reply_received` | Present |

The team reports that events lacked `source=usability-test`.
The export retains neither `source` nor board/query identifiers, and its group fields are empty.
Board association relies on the team's private mapping and cannot be verified from the retained fields; unrelated activity in the same staging window cannot be ruled out.
Queries cannot be paired with replies, and a failure cannot be attributed to a particular task or context-reuse query.
The event names establish only presence in the selected export, not participant attribution, task completion, a conversion funnel, or evidence that study events were excluded from product dashboards.

### Comparison with task observations

Task timestamps are unavailable, so event names observed in the overall window cannot be assigned to individual tasks.
An event's presence is weaker than verified task-level correspondence.

| Task | Observer evidence and expected event names | Observed coverage | Agreement or limitation |
| --- | --- | --- | --- |
| Task 1 | Shared assisted completion; planned events `board_opened`, `ai_block_created`, `query_submitted`, `reply_received`. | All four names occur within the reported window. | Consistent with board/AI activity at run level; does not establish the recorded ideas, selection, timing, task attribution, or absence of help. |
| Task 2 | Shared assisted completion; planned `context_reuse_query_submitted`, `context_reuse_reply_received`, and `query_failed` when a query fails. | Both context-reuse names and `query_failed` occur within the reported window. | Supports occurrence of context-reuse activity in the selected export; does not identify which answer belonged to another member, pair a query with a reply, or assign the failure to this task. |
| Task 3 | Shared assisted completion with a substantial discovery hint; planned `query_submitted` and `reply_received`. | Both names occur within the reported window. | These general events do not prove a diagram was rendered or shared; the completion/assistance classification comes from the team member's clarification. |

The observations provide the reported Assisted outcomes and descriptions of help that telemetry does not record.
P-02 and P-03 observations remain exploratory; this comparison does not establish the minimum counted-session sample.
They do not supply the missing durations, individual switch counts, or detailed artifact end states.
There is no control telemetry because no control run occurred; this is not an export failure.

### Observability coverage

The supplied request-log extract covers only the final portion of the reported collection window.
It includes successful backend requests, but HTTP success is not usability-task success.
Request identifiers do not provide a shared query identifier or a board/participant link to the analytics export.
The log extract therefore cannot establish complete session coverage, task durations, or the outcome of the separate analytics failure.
Raw telemetry, private identifiers, and exact collection timestamps remain in the [private usability-data repository](https://github.com/WellMadeTeam/workspace-ai-03-usability-data) (GitHub sign-in and granted access required).

## Limitations

- Only P-01 currently meets all confirmed counting requirements; P-02 and P-03 remain exploratory pending full eligibility confirmation.
  The minimum counted-session sample is not met, and no aggregate statistics or completed usability result are claimed.
- The observations come from a shared-board team with no control or supplementary run.
  They support qualitative descriptions, not causal or population conclusions.
- The participants' software-development student roles and laptop use were confirmed retrospectively.
  Exact browsers and P-02/P-03's outstanding eligibility checks are not specified in the public evidence.
- SEQ, task durations, tool switches and observation durations, and observer ease ratings are unavailable.
  The observed task outcomes and descriptions of help cannot replace those measurements.
- The team confirmed Assisted completion retrospectively.
  Detailed end-state artifacts and compliance with task time limits are not independently established by the supplied notes and questionnaires.
- The pre-test was omitted under [DEC-048](../../decisions.md#dec-048), leaving no expectations or detailed-familiarity baseline.
- The fourth SUS statement used shortened wording; individual calculated scores retain that instrument limitation and are not aggregated here.
- Full pre-session verification was not repeated in SPRINT-08, and session events lacked the required study label.
  Missing board/query fields, absent task timestamps, and partial log coverage limit the instrumentation comparison.
- Some notes use ambiguous P-02/P-03 or group attribution; observer ideas remain separate from participant feedback.
  Neither group labels nor related questionnaire records establish independent counted-session support.

## Conclusion

### Research questions

1. **Does the shared board reduce tool switching compared with the existing workflow?**
   The qualitative record cannot answer this comparison: there is no control run and no recorded switch counts or observation durations.
   P-02 and P-03's exploratory feedback about shared context and working together does not establish a reduction in switching.
2. **What difficulties occur when reusing queries and replies as context?**
   The notes describe uncertainty about connection direction and AI capabilities, along with copying friction.
   The team member reported functionality assistance during the context-reuse task; P-02 and P-03's observations remain exploratory.
3. **Can participants complete the main task without help, and where is assistance needed?**
   P-01's counted record describes Assisted main-task completion with editing-related technical help and functionality questions.
   The mixed-eligibility team also received assistance during the other tasks, including a substantial hint for diagram discovery.
   These observations do not establish the minimum sample for the planned usability result or justify publishing a completion rate.

### Quality requirement and product response

The [quality requirement testing plan](../../project-plan.md#quality-requirement-testing-plan) records QR-06 QRT-01 as `Not verified`.
The minimum confirmed participant sample for [QR-06](../../quality-requirements/qr/QR-06.md#response-measure) is not met; this record claims neither a pass nor a completed formal verdict.
The test stays `Planned`, with the shortfall and qualitative evidence explicit.
The row retains `Checked: None` and `Evidence: None`, as required for `Not verified`; this is a shortfall assessment, not a completed QRT check.
The planned sprint remains [SPRINT-08](../../project-plan.md#sprint-08); no later execution is scheduled by this record.
Even if the outstanding eligibility checks are confirmed, the recorded Assisted main-task outcome cannot satisfy the frozen unaided-completion bar.
Do not exclude that outcome to improve the measure or treat the three participant records as three team attempts.

The [numbered findings](#findings) record severity, evidence, and recommendations; product-response selection remains pending triage in [#386](https://github.com/WellMadeTeam/workspace-ai-03/issues/386).
Exploratory requests may inform triage, but no fix is represented as committed, declined, or deferred without a team decision.
The Week 08 report must declare this shortfall and claim no completed usability result when its draft is finalized.

### Threshold of success

[TOS-03](../../threshold-of-success.md#tos-03) is `Missed`.
T-01 took place and the team reported assisted completion of the context-reuse task, but the supplied sanitized record does not establish the session's board state or the team's answer to “did you need a messenger?”.
The member confirms that no further evidence is available and that the Week 8 measure was missed.
This settles the threshold against its existing measure; it does not assert that no brainstorming occurred, that a messenger was used, or that QR-06 received a completed failure verdict.
