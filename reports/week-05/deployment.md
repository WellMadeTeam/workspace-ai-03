# Week 5 Deployment

The release candidate was deployed by hand to staging and then to production on the university VM, as [the deployment runbook](../../docs/deployment.md) describes.
The real addresses are in the Moodle submission, and the customer reaches production from the university network.

## Metadata

- **Date:** 2026-10-31
- **Deployed by:** danmaninc, from a machine on the university network
- **Commit:** [`01d968f1e48c2637748610140de2563482f2306d`](https://github.com/WellMadeTeam/workspace-ai-03/commit/01d968f1e48c2637748610140de2563482f2306d), on `main`
- **Deployments:** staging at `http://<university-vm-ipv4>:8080`, then production at `http://<university-vm-ipv4>`, each with its own configuration and key

## Staging

The commit was deployed to staging first, and the core task passed there from a campus machine.

## Production Verification

The same commit was then deployed to production, and verified from a campus machine other than the VM:

1. `curl -sS -o /dev/null -w '%{http_code}\n' "http://<university-vm-ipv4>/api/openapi.json"` printed `200`.
2. The core task, as [the setup page](../../docs/setup.md#complete-the-core-task) describes, with the production address in place of `http://localhost`: a board opened in two windows, an AI block added, a query sent, its reply shown, and the same block and reply seen in the second window.

**Result:** passes.

## What Went Wrong On The Way

- The LLM service provider answers `403` to the VM's network, so the backend reaches it through a team proxy, per [The Proxy To The LLM Service Provider](../../docs/deployment.md#the-proxy-to-the-llm-service-provider).
- The first staging deploy failed with `crypto.randomUUID is not a function` over plain HTTP, and [#221](https://github.com/WellMadeTeam/workspace-ai-03/pull/221) fixed it before this commit.

Both are recorded in [the runbook's failed runs](../../docs/deployment.md#failed-runs).

## Redeploy After The Rework

The rework the 2026-10-29 meeting asked for, and the sprint's other merged work, were deployed the same way, so the release runs the reviewed and tested state.

- **Date:** 2026-10-31
- **Deployed by:** danmaninc, from a machine on the university network
- **Commit:** [`debfe3e5dd21ce822633f74d3c8d76c8f4c2698a`](https://github.com/WellMadeTeam/workspace-ai-03/commit/debfe3e5dd21ce822633f74d3c8d76c8f4c2698a), on `main`, tagged [`v0.3.0`](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.3.0)
- **Deployments:** staging first, then the same commit to production

The core task, as [the setup page](../../docs/setup.md#complete-the-core-task) describes, passed on staging and then on production, each from a campus machine.

**Result:** passes.
