# Definition of done

This file is the single source for what done means for a story, a task, and a pull request in this repository.
How a change gets in is in [`CONTRIBUTING.md`](../CONTRIBUTING.md).
The team edits this file when its workflow changes, so that the lists below always describe how the team actually works.

## Story

- Every acceptance criterion passes on `main`.
- Every task issue that works on the story has closed with its pull request merged, so each also met the Task and Pull Request lists below.
- The story issue links the evidence for each criterion.
- The accountable member has checked that each criterion is runnable, and that every link on the issue resolves.

A story closes only on the customer's acceptance, per [Showing Working Software](https://github.com/inno-itpd/itpd/blob/main/requirements/customer-meetings-requirements.md#showing-working-software).

## Task

- Every acceptance criterion the task carries is satisfied.
- The task closes as completed, which happens when the pull request that closes it merges into `main`, per [Closing A Task](https://github.com/inno-itpd/itpd/blob/main/requirements/task-issues-requirements.md#closing-a-task).
- The task issue carries its `Responsible` and `Accountable` values, the same two members are its assignees, and it is assigned to its sprint's milestone.

The team does not use an in-repository task tracker, so no other Definition of Done applies to tasks.

## Pull Request

- A pull request closes exactly one task issue and links it with `Closes #<issue-number>`, per [Closing A Task](https://github.com/inno-itpd/itpd/blob/main/requirements/task-issues-requirements.md#closing-a-task).
- The accountable reviewer ticks every task acceptance criterion before approving.
- The approval comes from a member other than the author, per [Review And Approval](https://github.com/inno-itpd/itpd/blob/main/requirements/pull-requests-requirements.md#review-and-approval).
- The repository checks are green: the link check ([`lychee.yml`](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/.github/workflows/lychee.yml)) and the Markdown check ([`markdown.yml`](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/.github/workflows/markdown.yml)).
- A user-visible change updates the `[Unreleased]` section of [`CHANGELOG.md`](../CHANGELOG.md), per [The Changelog](https://github.com/inno-itpd/itpd/blob/main/requirements/releases-requirements.md#the-changelog).
- The acceptance criteria this pull request claims pass on its branch, and on `main` after it merges.
- No secret, recording, or private-only material is committed, per [Sensitive Information Reference](https://github.com/inno-itpd/itpd/blob/main/requirements/visibility-requirements.md#sensitive-information-reference).
- Implementation notes in the pull request description record the decisions made and how the change was checked, under the "What changed and why" and "What you checked and how" headings of the [pull request template](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/.github/pull_request_template.md).
