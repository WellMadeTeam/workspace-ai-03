# AI usage — Week 06

## Tools

Claude Code in the terminal.

## What we used them for

- Claude Code: reading Assignment 6 and the course requirements it cites from the course repository through `gh`, and proposing a split of the assignment into tasks before any change.
- Claude Code: creating the task issues #259 to #276 from the task form through `gh`, with acceptance criteria taken from the assignment's items, and scheduling them into the `SPRINT-06` milestone.
- Claude Code: drafting the stories `US-17` (#277) for the product analyst and `US-18` (#278) for the system operator in the Week 4 shape, and creating them after our approval with their `Story Points`, `Responsible`, and `Accountable` values set.
- Claude Code: implementing #259 in #279: planning `SPRINT-06` in `docs/project-plan.md` with its goal and `**Planned Velocity:**`, linking the new stories from the task issues #260 to #269, and setting the `SPRINT-06` milestone's name and description.
- Claude Code: rewriting #264 and #265 at our request, so the backend's observability instrumentation sits in the Part 5 task #264 and #265 only deploys OpenObserve on the VM, the same split as the analytics tasks #261 and #262.
- Claude Code: finding that the `lychee` job failed with exit code 22 because the release download answered `504`, creating #257, and proposing #258, which installs lychee through `gh release download` with retries and a checksum check.
- Claude Code: reading #265 and #262, the Part 4 and Part 6 sections of Assignment 6, and the analytics and observability guide they cite, and writing step-by-step instructions for deploying OpenObserve and OpenPanel on the university VM, each with a `staging` and a `production` scope and a check that test traffic reaches only staging.
- Claude Code: reading OpenPanel's self-hosting files and ingest code through `gh` to explain why its dashboard redirected to HTTPS, which is Caddy's automatic HTTPS for a site named without `http://`, that it has no default account, and how its `/track` endpoint checks a browser event's `Origin` and drops a request it takes for a bot.
- Claude Code: drafting the `The Telemetry Pipelines` section of `docs/deployment.md` for #262, with the OpenPanel 2.3.0 install and the two projects, and rewriting it after reading the `backend` instrumentation on the `261-product-analytics-instrumentation` branch, so each deployment's `backend` is configured with its own project's client and the `source=smoke` check goes through the staging `backend`.
- Claude Code: drafting this report from the week's issues and pull requests.

## What we did with the output

- We read the proposed split before the issues were created; the assignees in it are the agent's proposal from who did similar work in Week 5, and the team can change them.
- The agent asked three planning questions, and we chose: `US-09` and `US-10` stay in `SPRINT-06` and count towards its velocity, `US-17` and `US-18` are Should Have with 5 and 8 points, and danmaninc is Responsible for both with AntonChulakov and Kamil116 Accountable.
- When one `gh issue create` call reported an error after the issue was made, the agent read the created issues back before going on, so no issue was created twice.
- The planned velocity of `47` was checked by hand against the `Story Points` of the eight stories in the `SPRINT-06` milestone.
- The story fields of `US-17` and `US-18` were read back from GitHub after they were set.
- The OpenPanel instructions were followed on the VM: the plain-HTTP Caddyfile ended the redirect, and the `source=smoke` event sent from campus reached the staging project, while the same event with the production client ID was refused with `401`.
- Two instructions were wrong and were corrected against what we saw: the output named a **Website** client type, while what OpenPanel checks is each project's allowed domains, and the first `401` was caused by the projects' domains being disabled, not by the "ignore CORS" option the output suspected; enabling the domains fixed it.
- The values the output did not know, the OpenPanel tag and the organization's name, were marked `[BLANK]` and filled in by the member accountable for #262.
- #258 was closed without merging, because the `504` answers came from a GitHub incident and not from the workflow, and the link check recovers when the incident is resolved.

## What was not used

- The agent's recommendation to take `US-09` and `US-10` out of `SPRINT-06`, because they had not started and the sprint ended the same day, was not taken.
- The change to `.github/workflows/lychee.yml` in #258 was not merged, for the reason above.
- The proposed swap file and `ALLOW_REGISTRATION=false` were not applied: the VM ran OpenPanel without the swap, and OpenPanel closes registration by itself after the first user.
- The first `source=smoke` check, sent from campus with the staging `Origin`, was replaced in `docs/deployment.md` by a check through the staging `backend`, because the `backend` sends the events with its client's secret and OpenPanel then checks no `Origin`.
- No generated text was submitted unchecked.
