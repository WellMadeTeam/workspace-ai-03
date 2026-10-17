# Contributing

This guide says how the team works in this repository: how work is tracked, how a change gets into `main`, and how commits are written.
What done means for a story, a task, and a pull request is in [`docs/definition-of-done.md`](docs/definition-of-done.md), and this guide does not restate it.

## Tracking work

Every piece of work starts as an issue, created from one of the [issue templates](.github/ISSUE_TEMPLATE/):

- A **user story** states one thing a user needs, with its acceptance criteria.
- A **task** holds one unit of work, such as part of a story, documentation, a report, or a workflow, and one pull request closes it.

Each issue has a `Responsible` and an `Accountable` value, the same two members are its assignees, and it is scheduled by assigning it to its sprint's milestone.

### The GitHub project

The team's public GitHub project is [Workspace for AI collaboration](https://github.com/orgs/WellMadeTeam/projects/1).
It holds every open issue of the repository, and the issues and their milestones stay the source of truth: the project is a view over them, not a second backlog.

The team uses these views:

- **Team items**: a table with the `Responsible`, `Accountable`, `Assignees`, and `Milestone` columns, grouped by `Milestone`.
  The team uses it to plan a sprint and to check that each issue has its two members and its sprint.
- **Backlog**: a board grouped by `Status`, over the task issues (`label:task`).
  The team uses it during the week to see what is waiting, in progress, and done.
- **Assignment 3**: a board grouped by `Status`, over the issues in the `Assignment 3` milestone.
  The team uses it in the weekly review to see what is left before the submission.
- **My items**: a table of the issues assigned to the viewer.
  Each member uses it to see their own work.
- **Roadmap**: a timeline of the issues.
  The team uses it to see how the sprints line up across the course.

## How a change gets in

Every change reaches `main` through a pull request; direct pushes to `main` are blocked.

### Branches

Name a branch after the task issue it works on: `<issue-number>-<short-description>`, lowercase and hyphenated.
For example, `73-ai-block-messages-view` for issue #73.
Branch off the latest `main`, and keep one task per branch.

### Pull requests

A pull request:

- Closes exactly one task issue, with `Closes #<issue-number>` under "Closing issues".
- Fills in every section of the [pull request template](.github/pull_request_template.md): what changed and why, what you checked and how, the type of change, the changelog line, and what the reviewer should look at.
- Updates the `[Unreleased]` section of [`CHANGELOG.md`](CHANGELOG.md) when the change is user-visible, per [Keep a Changelog](https://keepachangelog.com/).
- Passes the link check and the Markdown check.

Merge with **Squash and merge**, so each pull request lands on `main` as one commit titled with the pull request title and its number, for example `feat: add AI block messages view (#85)`.

### Review

A pull request merges only after a member other than its author approves it.
The reviewer, who is the task's accountable member, checks that:

- Every acceptance criterion of the linked task holds, and ticks each one on the issue before approving.
- The description records what changed, why, and how it was checked.
- The changelog line matches the change, and a user-visible change has its `[Unreleased]` entry.
- The checks are green.
- No secret, `.env` file, recording, or private-only material is committed.

The full list a pull request must meet is the [Pull Request section of the Definition of Done](docs/definition-of-done.md#pull-request).

## Commit messages

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<optional scope>): <short description>
```

- `type` is one of `feat`, `fix`, `refactor`, `docs`, `chore`, and matches the type of change in the pull request template.
- `scope` is optional and names the area changed, such as `frontend`, `backend`, or `docs`.
- The description is lowercase, in the imperative mood, without a trailing period, for example `fix: remove unnecessary secondary sorting by id`.

A pull request title uses the same format, because it becomes the squashed commit's message on `main`.

## Releases

Each sprint ends with a release tagged `v<major>.<minor>.<patch>` per [Semantic Versioning](https://semver.org/), on a commit on `main`.
The release is titled with its tag, and cutting it moves the `[Unreleased]` entries of `CHANGELOG.md` into a dated section that links the release.
