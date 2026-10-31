# Deployment

This page is the runbook for staging and production on the university VM: the environments, the VM and its access, the configuration, the deploy, the verification, and the rollback.
It is written for a member on the university network who redeploys the product without the member who deployed it first.
The build and the local run are in [the setup page](setup.md), and this page repeats none of it.

No real address, host name, password, or key is written here.
The VM's IPv4 address is in the team's Moodle submission, and every command below reads it from an environment variable.

## Environments

The product runs in four environments.

| Environment | What runs there | Who reaches it | Configuration and secrets | Test level |
| ----------- | --------------- | -------------- | ------------------------- | ---------- |
| Development | The product on a member's machine, started as [the setup page](setup.md) describes | That member, at `http://localhost` | The member's own `app/backend/.env` with their own key | `scripted` |
| Integration | The workflows in `.github/workflows/` on GitHub Actions, on every pull request and every push to `main` | The team, on the pull request page | None: the automated tests do not call the LLM service provider | `CI` |
| Staging | The release candidate, as the Compose project `workspace-ai-staging` on port `8080` of the VM | Members on the university network | `/opt/workspace-ai/staging/app/.env` and `app/backend/.env`, with the staging key and proxy user | `deployed` |
| Production | The released commit, as the Compose project `workspace-ai-production` on port `80` of the VM | The customer and the members on the university network | `/opt/workspace-ai/production/app/.env` and `app/backend/.env`, with the production key and proxy user | None: only the core task is verified |

A `manual` test has no environment of its own and runs wherever the product already is.

Each environment has a limit:

- Integration runs outside the university network, so the CI cannot reach the VM and deploys nothing.
- Development has the member's own data and key, so a local run proves the code, not the deployment.
- Staging is not the customer's, so a test that passes there is confidence, not acceptance.
- Production is not a test bed, so no quality requirement test runs against it.

Staging and production run the same images from the same commit and differ only in their directory, Compose project, port, key, and database volume.
A command run in the wrong directory then acts on that directory's deployment and never on the other one.

## The VM

The university gives the team one VM, and it hosts both deployments.

| What | Value |
| ---- | ----- |
| Image | Ubuntu Linux 24.04, 64-bit, from the portal's image list |
| Shape | 2 vCPUs, 4 GB of memory, and 60 GB of disk |
| Address | The IPv4 address in the Moodle submission; there is no domain name |
| Password | In the team's password manager |
| Network | Reachable only from the university network |

### Recreate The VM

1. Open the VM in the university portal, recreate it from the image above, and set its password to the one in the team's password manager.
2. Fill in the image and the shape above if they changed.

A recreated VM has no deployments and no data, so follow the rest of this page from [Prepare The VM](#prepare-the-vm).

### Connect From Campus

On a machine on the university network, set the address and the user once per shell, with the values from the Moodle submission and the password manager:

```bash
export VM_HOST=<university-vm-ipv4>
export VM_USER=<vm-user>
export STAGING_URL="http://$VM_HOST:8080"
export PRODUCTION_URL="http://$VM_HOST"
```

Then connect:

```bash
ssh "$VM_USER@$VM_HOST"
```

Off campus, the connection times out: use a machine on the university network.

### Prepare The VM

Do this once after the VM is recreated, in the SSH session.

1. Check that the VM reaches Docker Hub, GitHub, PyPI, and the npm registry, which the deploy pulls from:

   ```bash
   curl -sS -o /dev/null -w '%{http_code}\n' https://registry-1.docker.io/v2/
   curl -sS -o /dev/null -w '%{http_code}\n' https://github.com
   curl -sS -o /dev/null -w '%{http_code}\n' https://pypi.org/simple/
   curl -sS -o /dev/null -w '%{http_code}\n' https://registry.npmjs.org/
   ```

   Each command prints a status code, such as `401` from the first and `200` from the others.
   A timeout means the network blocks that site, and no deploy can succeed until it is reachable.
   The LLM service provider refuses the VM's network, so it is reached through the proxy in [The Proxy To The LLM Service Provider](#the-proxy-to-the-llm-service-provider).
2. Install Docker Engine with the Compose plugin, and let the user run it without `sudo`:

   ```bash
   curl -fsSL https://get.docker.com | sudo sh
   sudo usermod -aG docker "$USER"
   ```

   Log out and connect again, then check that `docker compose version` prints a version.
3. Create the two deployment directories and the backup directory:

   ```bash
   sudo mkdir -p /opt/workspace-ai
   sudo chown "$USER" /opt/workspace-ai
   cd /opt/workspace-ai
   git clone https://github.com/WellMadeTeam/workspace-ai-03.git staging
   git clone https://github.com/WellMadeTeam/workspace-ai-03.git production
   mkdir backups
   ```

4. Check the firewall with `sudo ufw status`.
   When it is active, allow SSH with `sudo ufw allow OpenSSH`.
   Docker publishes ports `80` and `8080` past `ufw`, so a port that does not answer from campus is blocked outside the VM: ask the university's IT support to open it.

## Configuration

Each deployment has two files, both ignored by git and installed only on the VM:

| File | What it holds | Shape |
| ---- | ------------- | ----- |
| `app/.env` | The Compose project name and the host port | `app/.env.example` |
| `app/backend/.env` | The LLM service provider's key and the proxy to it | `app/backend/.env.example` |

The values for each deployment:

| Deployment | Directory | `COMPOSE_PROJECT_NAME` | `HTTP_PORT` | `GROQ_API_KEY` | `HTTPS_PROXY` |
| ---------- | --------- | ---------------------- | ----------- | -------------- | ------------- |
| Staging | `/opt/workspace-ai/staging` | `workspace-ai-staging` | `8080` | The staging key | The proxy address with the staging proxy user |
| Production | `/opt/workspace-ai/production` | `workspace-ai-production` | `80` | The production key | The proxy address with the production proxy user |

The keys, the proxy address, and the proxy users and passwords are in the team's password manager.

Install them once per deployment, here for staging; for production, use its directory and its values:

```bash
cd /opt/workspace-ai/staging/app
printf 'COMPOSE_PROJECT_NAME=workspace-ai-staging\nHTTP_PORT=8080\n' > .env
cp backend/.env.example backend/.env
chmod 600 backend/.env
nano backend/.env
```

In `nano` or another editor, put the deployment's key in place of `your key`, remove the `#` before `HTTPS_PROXY`, and fill in the deployment's proxy user, its password, the proxy host, and its port.
Never paste a production value into staging or the other way round.

### The Proxy To The LLM Service Provider

The LLM service provider answers `403` to every request from the VM's network, so the backend sends its calls to the provider through an HTTP proxy on a team server outside the university network.
The backend's client reads the proxy from `HTTPS_PROXY`, and the provider's key is not visible to the proxy, because the proxy only forwards the encrypted connection.
The proxy accepts only the VM's address and only the two proxy users, so nobody else can use it.

One way to run it is `tinyproxy`, with this in `/etc/tinyproxy/tinyproxy.conf` on the proxy server:

```text
Port <proxy-port>
Allow <university-vm-ipv4>
BasicAuth <staging-proxy-user> <staging-proxy-password>
BasicAuth <production-proxy-user> <production-proxy-password>
ConnectPort 443
```

Check the proxy from the VM, with each deployment's `HTTPS_PROXY` value in place of the variable:

```bash
export LLM_PROXY='http://<proxy-user>:<proxy-password>@<proxy-host>:<proxy-port>'
curl -sS -o /dev/null -w '%{http_code}\n' -x "$LLM_PROXY" https://api.groq.com/openai/v1/models
```

It prints `401`, because the request carries no key.
A `407` means a wrong proxy user or password, a timeout means the VM cannot reach the proxy, and a `403` means the request did not go through the proxy.

Without its own `COMPOSE_PROJECT_NAME`, each deployment is named `app` after its directory, and the second deploy replaces the first one's containers and reuses its database.

The backend creates the tables it is missing when it starts, and never changes a table that exists.
A release that changes a column of an existing table needs its database moved by hand, which no deploy below does.

## Deploy

The commit is what moves: staging runs the release candidate first, and production then runs the same commit.
Run every step in the SSH session.

### Deploy To Staging

1. Check out the release candidate:

   ```bash
   cd /opt/workspace-ai/staging
   git fetch --tags origin
   git checkout --detach <commit>
   cd app
   ```

2. Build the images while the old deployment still runs:

   ```bash
   docker compose build
   ```

3. Back up the database, skipping this step on the first deploy, when there is nothing to back up:

   ```bash
   docker compose stop backend
   docker compose cp backend:/data/workspace.db "/opt/workspace-ai/backups/staging-$(date +%Y%m%d-%H%M).db"
   ```

4. Start the new deployment, and check that its three containers are running:

   ```bash
   docker compose up -d
   docker compose ps
   ```

5. Write down the commit it runs:

   ```bash
   git rev-parse HEAD
   ```

Then run the core task on staging, as [Verify](#verify) describes with `$STAGING_URL`, and any `deployed` quality requirement test against `$STAGING_URL` from a campus machine.

### Deploy To Production

Deploy to production only when staging runs the same commit and its checks passed.
Repeat the steps above in `/opt/workspace-ai/production`, with the commit staging ran and `production` in the backup's name.

## Verify

After each production deploy, verify the core task from a campus machine that is not the VM.

1. Check that the API answers:

   ```bash
   curl -sS -o /dev/null -w '%{http_code}\n' "$PRODUCTION_URL/api/openapi.json"
   ```

   It prints `200`.
   A `502` in the first seconds after a start means the backend is still starting: wait a few seconds and run it again.
2. Open `$PRODUCTION_URL` in a browser, and complete the core task as [the setup page](setup.md#complete-the-core-task) describes, with that address in place of `http://localhost`.

Record the check in the week's report: the date, the member, the deployment, the commit, the steps done, and the result, with the address written as `<university-vm-ipv4>`.
A deploy that fails either step is rolled back.

## Roll Back

Roll back a deploy that fails its verification before fixing anything, then fix on `main`, let the CI run, and deploy again from staging.

1. Check out the previous release tag and build it:

   ```bash
   cd /opt/workspace-ai/production
   git checkout --detach <previous-tag>
   cd app
   docker compose build
   ```

2. When the failed deploy damaged the data, restore the backup taken before it:

   ```bash
   docker compose stop backend
   docker compose run --rm -v /opt/workspace-ai/backups:/backups:ro backend cp /backups/<backup-file> /data/workspace.db
   ```

3. Start it, and verify the core task again:

   ```bash
   docker compose up -d
   ```

On the first deploy there is no previous release on the VM: stop the deployment with `docker compose down`, which keeps its database volume.

When a deployment misbehaves, its logs come first:

```bash
docker compose ps
docker compose logs --tail=100 backend
```

A backend that exits at once with `GROQ_API_KEY not found` has no key in `app/backend/.env`.
A query that fails while the rest of the board works points at the proxy: check it as [The Proxy To The LLM Service Provider](#the-proxy-to-the-llm-service-provider) describes.

## When The VM Is Not Available

When the VM or its campus access is not available in time, the deployment is postponed to the date the group chat announces.
The week's report records the postponement and that date and declares the deviation, the Sprint Review shows the product running locally, and a `deployed` test falls back to `scripted` or `CI` until the VM arrives.

## Failed Runs

Each deploy that went wrong is recorded here: what showed it, how it was recovered, and what to try first next time.

| Date | Deployment | What showed it | Recovery | Try first next time |
| ---- | ---------- | -------------- | -------- | ------------------- |
| 2026-10-30 | Before the first deploy | The backend container exited at once with `/bin/sh: syntax error: unterminated quoted string` | The cut-off `CMD` line of `app/backend/Dockerfile` was restored in [#214](https://github.com/WellMadeTeam/workspace-ai-03/pull/214) | `docker compose logs backend` |
| 2026-10-31 | Before the first deploy | `curl` from the VM to the LLM service provider printed `403` | The calls to the provider go through the proxy in [The Proxy To The LLM Service Provider](#the-proxy-to-the-llm-service-provider) | The proxy check with `curl -x` |
