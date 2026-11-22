# REL-08 release preparation

**State:** Prepared for review; no release or tag is published by this record.

## Candidate scope

The proposed version is `v0.5.1`, a maintenance increment after `v0.5.0`; confirm that the version remains unused when tagging.
The [planning rules](https://github.com/inno-itpd/itpd/blob/main/requirements/planning-requirements.md#releases) leave the tag numbering to the team under SemVer; `REL-08` does not require `v0.6.0`.
The release commit will be the final reviewed commit on `main` after [#410](https://github.com/WellMadeTeam/workspace-ai-03/pull/410) and the stacked evidence PR merge.
Do not tag either feature branch or substitute the merge commit for the actual tested revision in the evidence.

Changes since `v0.5.0` include maintained documentation, usability results and triage, configuration evaluation, and dependency updates.
The changed application inputs are the backend requirements and frontend manifest/lockfile; application source and test scripts have no diff against `v0.5.0` at preparation time.
Dependency updates include FastAPI, AnyIO, annotated-doc, lucide-react, Tailwind CSS, jsdom, oxlint, and Steiger.
This scope is not strictly documentation-only, and it introduces no intentional product feature or behavior change.
No setup, deployment, environment-variable, or database migration change is recorded in this candidate.
No upgrade action beyond ordinary deployment is identified; existing installations need not upgrade to obtain the documentation and evidence.
Routine dependency updates are not presented as user-visible feature or defect fixes in the changelog.

## Quality evidence and limitations

- [QR-01 QRT-01](qr-01-qrt-01.md): the supplied output fails with 12 query-message reads over two seconds, zero missed reads, and a 2,129 ms maximum; the member confirms tested SHA `0fa12cffbe3018876a5e39821625ba00aed98083` and staging on the university VM from the university network.
- [QR-06 QRT-01](../../docs/usability-tests/ut-01/results.md#team-task-results): fails the fixed unaided bar; three counted participants supplied one assisted team attempt.
- [TOS-03](../../docs/threshold-of-success.md#tos-03): remains Missed because the messenger-use answer was not collected, although a retained context-reuse board state is member-confirmed.
- The full results Sprint Review remains pending; the [meeting report](meeting-report.md) does not establish that review or customer acceptance.
  The member requested proceeding with release preparation without that review; the final weekly report must declare this deviation.
- [#405](https://github.com/WellMadeTeam/workspace-ai-03/issues/405) remains open at preparation time.
  It is excluded from the candidate unless its implementation and required verification actually finish; otherwise move it to SPRINT-09 at sprint close and record the actual reason.
- QR-02, QR-04, and QR-05 retain their previous SPRINT-07 checks; this preparation claims no new run of those tests.

The QR-01 run is supplied after the sprint's planned deadline, and the full Sprint Review remains incomplete; the release must not be presented as a fully on-time completion of every assignment requirement.
A failed requirement remains visible and is not a release quality claim.

## Before tagging

1. Preserve the member-confirmed tested SHA and staging/network conditions in the latency evidence.
   The tested application/script revision is `0fa12cffbe3018876a5e39821625ba00aed98083`; the final release SHA will also include subsequent documentation merges.
2. Review and merge #410, then retarget and merge the stacked evidence PR into `main` after its task criteria and required repository checks are satisfied.
3. Inspect the final candidate diff, including dependency inputs and any subsequently merged product change.
   Confirm that the tested application and script match that candidate; rerun an affected test if product changes invalidate its evidence.
4. Decide the disposition of every remaining SPRINT-08 issue, recording unfinished work and its reason without inventing acceptance or completed review.
5. Confirm the candidate version and actual release date, then record the exact final `main` SHA for the tag.
6. Keep `CHANGELOG.md`'s released sections and the plan's empty `REL-08` block unchanged until publication.

## Tag protection and publication

The active `v*` tag ruleset was inspected on 2026-11-22.
It applies to `refs/tags/v*`, blocks deletion, non-fast-forward updates, and updates, and has no bypass actors.
No ruleset change is needed for this candidate; recheck the setting when publishing.

Push the version tag on the final candidate commit on `main`, then publish the GitHub Release with the tag as its title and a deployer-facing upgrade note.
The release note must disclose the known synchronization latency issue and end with the absolute Full changelog link to the eventual dated released section.
Use the actual release date rather than treating the test date or sprint due date as the publication date.

After publication, merge the records in this order: the dated changelog section, the `REL-08` block, and the weekly report.
The changelog section links the release and keeps a fresh empty Unreleased section; it does not invent notable product changes from test evidence or routine dependency updates.
The `REL-08` block lists QR-01 and QR-06 as checked, links each requirement, and closes with one sentence linking the testing plan; both failed results remain in that plan.
The final weekly report links this evidence and declares the executed tests, delayed closeout, missing full review, remaining study limitations, and actual carry-over work.
After the tag exists, move every still-open SPRINT-08 issue to a later sprint's milestone before closing SPRINT-08.
[#392](https://github.com/WellMadeTeam/workspace-ai-03/issues/392) remains open until publication and sprint-close obligations are actually complete.
