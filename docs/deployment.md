# Deployment

This page is the runbook for staging and production on the university VM: the environments, the VM and its access, the configuration, the telemetry pipelines, the deploy, the verification, and the rollback.
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
   Docker publishes ports `80`, `8080`, the analytics port `3000`, and the observability port `5080` past `ufw`, so a port that does not answer from campus is blocked outside the VM: ask the university's IT support to open it.

## Configuration

Each deployment has two files, both ignored by git and installed only on the VM:

| File | What it holds | Shape |
| ---- | ------------- | ----- |
| `app/.env` | The Compose project name and the host port | `app/.env.example` |
| `app/backend/.env` | The LLM service provider's key, the proxy to it, the analytics client in [Configure Each Deployment's Backend](#configure-each-deployments-backend), and the observability export in [Configure Each Deployment's Export](#configure-each-deployments-export) | `app/backend/.env.example` |

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

## The Telemetry Pipelines

The telemetry pipelines carry what the product records from the deployment that records it to the backend that stores it and serves its dashboards, on the same VM.
This section has the steps and the configuration; the events, the metrics, and the queries the analytics dashboards run are in [the analytics plan](analytics.md), and the signals, the `SLI`s, and their queries are in [the observability plan](observability.md), and both link here instead of repeating them.

### Analytics

The analytics backend is OpenPanel, self-hosted on the VM, so the events never leave the university network.

| What | Value |
| ---- | ----- |
| Version | OpenPanel 2.3.0, from the `self-hosting` directory of [its repository](https://github.com/Openpanel-dev/openpanel) |
| Directory | `/opt/workspace-ai/analytics/self-hosting`, a Compose project of its own, apart from both deployments |
| Dashboard | `http://<university-vm-ipv4>:3000` |
| Event endpoint | `http://<university-vm-ipv4>:3000/api` |
| Environment scopes | One organization with two projects, `staging` and `production`, each with its own `write` client |
| Credentials | The owner account and each project's client ID and secret, in the team's password manager and the Moodle submission |
| Reached by | The members and the customer on the university network, and the `backend` of each deployment, which sends the events |

OpenPanel runs Postgres, Redis, ClickHouse, its API, its worker, its dashboard, and a Caddy proxy, and only the proxy publishes a port.

#### Install OpenPanel

Do this once after the VM is prepared, in the SSH session.

1. Get the self-hosting files at the installed version:

   ```bash
   cd /opt/workspace-ai
   git clone https://github.com/Openpanel-dev/openpanel.git analytics
   cd analytics
   git checkout --detach v2.3.0
   cd self-hosting
   ```

2. Run the setup script:

   ```bash
   ./setup
   ```

   Give the domain as `http://<university-vm-ipv4>:3000`, use the bundled Postgres, Redis, and ClickHouse, and skip the email settings.
   The script writes `.env`, `docker-compose.yml`, and `caddy/Caddyfile`; `.env` holds the generated secrets, so protect it with `chmod 600 .env`.
3. Check that `.env` has `DASHBOARD_URL=http://<university-vm-ipv4>:3000` and `API_URL=http://<university-vm-ipv4>:3000/api`, both with `http://`.
4. In `docker-compose.yml`, change the `op-proxy` service's ports from `80:80` and `443:443` to the one line `"3000:80"`, because port `80` is production's.
5. Replace `caddy/Caddyfile` with this, which serves plain HTTP:

   ```text
   {
       auto_https off
   }

   http:// {
       encode gzip

       handle_path /api* {
           reverse_proxy op-api:3000
       }

       reverse_proxy /* op-dashboard:3000
   }
   ```

   The generated Caddyfile names the site without `http://`, so Caddy issues itself a certificate and redirects every request to HTTPS, which the VM, having no domain name, cannot serve.
   The generated `worker.` site is dropped, because an IP address has no subdomain; the queue dashboard it served is not needed.
6. Start it, and check that it answers:

   ```bash
   ./start
   docker compose ps
   curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:3000/
   ```

   The last command prints `200`, or a redirect to an `http://` path such as the login page, and never to `https://`.
7. From a campus machine that is not the VM, open `http://<university-vm-ipv4>:3000` in a browser.
   A timeout means port `3000` is blocked outside the VM: ask the university's IT support to open it.

Running `./setup` again regenerates `caddy/Caddyfile`, so step 5 is repeated after it.

#### Create The Projects

1. Sign up at the dashboard at once, with the team's account, and store its password in the password manager.
   OpenPanel has no default account: the first user to sign up owns the instance, and registration closes after it, so the other members and the customer join by invitation.
2. Create the organization, named `Workspace AI`.
3. Create the two projects, `staging` and `production`.
4. In each project's settings, create a client of the `write` type, which sends events and reads nothing, and store its client ID and secret in the password manager and the Moodle submission; the secret is shown once.
5. In each project's settings, enable the domains and add the project's allowed domain below.

| Project | Allowed domain | Client ID | Client secret |
| ------- | -------------- | --------- | ------------- |
| `staging` | `http://<university-vm-ipv4>:8080` | `<staging-client-id>` | `<staging-client-secret>` |
| `production` | `http://<university-vm-ipv4>` | `<production-client-id>` | `<production-client-secret>` |

The `backend` sends every event with its client's ID and secret, so OpenPanel accepts it without checking an `Origin`.
The allowed domains then only matter to an event sent from a browser, and a project created without them refuses every such event; they are kept so that a browser event added later reaches only its own project.
Neither client allows the wildcard `*` or ignores the domain and the secret.
A client's secret stays in the password manager and the deployment's `app/backend/.env`, and never goes into the frontend.

#### Configure Each Deployment's Backend

The `backend` sends the events in [the analytics plan](analytics.md), after the request that records them, so each deployment's `backend` is configured with its own project's client.
Add these lines to each deployment's `app/backend/.env`, beside the values in [Configuration](#configuration), here for staging:

```bash
ANALYTICS_ENABLED=true
OPENPANEL_API_URL=http://<university-vm-ipv4>:3000/api
OPENPANEL_CLIENT_ID=<staging-client-id>
OPENPANEL_CLIENT_SECRET=<staging-client-secret>
```

| Deployment | `ANALYTICS_ENABLED` | `OPENPANEL_API_URL` | `OPENPANEL_CLIENT_ID` and `OPENPANEL_CLIENT_SECRET` |
| ---------- | ------------------- | ------------------- | --------------------------------------------------- |
| Staging | `true` | `http://<university-vm-ipv4>:3000/api` | The staging project's client |
| Production | `true` | `http://<university-vm-ipv4>:3000/api` | The production project's client |

The values are read when the `backend` starts, so a change takes effect after `docker compose up -d` in the deployment's `app/` directory, and both deployments keep running the same images.
A local run sends no events, because [the setup page](setup.md) leaves `ANALYTICS_ENABLED` at `false`.
Never paste a production client into staging or the other way round: the client, not the address, decides which project an event reaches.

#### Check The Pipeline

Check the pipeline after it is installed, after each change to a project or a deployment's `app/backend/.env`, and after each deploy to staging.

1. Check, in the SSH session, that each deployment has its own project's client:

   ```bash
   grep -H OPENPANEL_CLIENT_ID /opt/workspace-ai/staging/app/backend/.env /opt/workspace-ai/production/app/backend/.env
   ```

   The two IDs differ, and each matches its project's client in the password manager.
2. Check, from the staging `backend` container, that it reaches the staging project with its client, by sending one test event tagged `source=smoke`:

   ```bash
   cd /opt/workspace-ai/staging/app
   docker compose exec backend python -c "from app.backend.src.services.analytics import send_event; send_event('smoke_check', {}, 'smoke')"
   docker compose logs --tail=20 backend
   ```

   The logs carry no `Could not send analytics event` and no `configuration is incomplete` line.
   The command needs the instrumentation in the deployed commit; before it is deployed, the module does not exist and the command fails with `ModuleNotFoundError`.
3. From a campus machine that is not the VM, open `$STAGING_URL/?source=smoke`, open a board, and submit one query, so the `backend` sends `board_opened`, `query_submitted`, and `reply_received` tagged `source=smoke`.
4. Open the staging project's event list and check that `smoke_check` and the three events are there with `source` set to `smoke`.
5. Open the production project's event list and check that it has none of them and no other test traffic.
6. Check that each project's dashboard carries the chart `Weekly boards completing a context-reuse flow`, after the focus metric in [the analytics plan](analytics.md), with the metric's `**Query:**`, and that the staging chart leaves the `smoke` events out while the staging event list shows them.

A `smoke` event that reaches the production project is a deviation the week's report declares.

| What showed it | What it means |
| -------------- | ------------- |
| `Analytics is enabled but OpenPanel configuration is incomplete` in the `backend`'s logs | One of the four values is missing from `app/backend/.env` |
| `Could not send analytics event` in the `backend`'s logs | OpenPanel refused the event or could not be reached: check the client ID and secret, then the address and port `3000` |
| No event and no warning | `ANALYTICS_ENABLED` is not `true`, or the `backend` was not restarted after the change |
| A test event in the production project | The production deployment has the staging client, or the other way round: fix `app/backend/.env`, restart, and delete the event |

OpenPanel caches a client's settings for a few minutes, so a changed client or allowed domain takes effect after that, or at once after `docker compose restart op-api` in its directory.

#### Run And Restart

In `/opt/workspace-ai/analytics/self-hosting`:

```bash
./stop
./start
docker compose ps
docker compose logs --tail=100 op-api
```

`./stop` keeps the data volumes, so the events survive a restart.
An upgrade checks out the new version's tag, repeats the steps of [Install OpenPanel](#install-openpanel) from step 2 with the existing `.env` kept, and updates the version above.

### Observability

The observability backend is OpenObserve, self-hosted on the VM, so the signals never leave the university network.
The `backend` of each deployment exports a structured log line for every request and the request duration as a histogram, as [the observability plan](observability.md) describes, over OTLP/HTTP to its own organization.

| What | Value |
| ---- | ----- |
| Version | OpenObserve v1.2.0-rc, the image `public.ecr.aws/zinclabs/openobserve` |
| Directory | `/opt/workspace-ai/observability`, the Compose project `workspace-ai-observability`, apart from both deployments and OpenPanel |
| Interface and API | `http://<university-vm-ipv4>:5080` |
| OTLP endpoint | `http://<university-vm-ipv4>:5080/api/<org-id>`, to which the `backend` adds `/v1/logs` and `/v1/metrics` |
| Environment scopes | Two organizations, `staging` and `production`, each with a generated identifier, written `<staging-org-id>` and `<production-org-id>` below |
| Credentials | The root account, and one member user per organization, whose ingestion token is the deployment's credential and whose password is the query credential; all in the team's password manager and the Moodle submission |
| Retention | 30 days, which covers the five-minute window of `SLI-01` and the per-request log line |
| Reached by | The members and the customer on the university network, and the `backend` of each deployment, which exports the signals |

#### Install OpenObserve

Do this once after the VM is prepared, in the SSH session.

1. Check that the VM reaches the image registry:

   ```bash
   curl -sS -o /dev/null -w '%{http_code}\n' https://public.ecr.aws/v2/
   ```

   It prints a status code, not a timeout.
2. Create the directory and the Compose file:

   ```bash
   mkdir -p /opt/workspace-ai/observability
   cd /opt/workspace-ai/observability
   nano docker-compose.yml
   ```

   ```yaml
   services:
     openobserve:
       image: public.ecr.aws/zinclabs/openobserve:<openobserve-version>
       env_file: .env
       environment:
         ZO_DATA_DIR: /data
         ZO_COMPACT_DATA_RETENTION_DAYS: "30"
       ports:
         - "5080:5080"
       volumes:
         - openobserve-data:/data
       mem_limit: 1g
       restart: unless-stopped

   volumes:
     openobserve-data:
   ```

   The memory limit keeps OpenObserve from starving the two deployments and OpenPanel on the VM's 4 GB.
3. Write the root account into `.env`, which only the VM holds:

   ```bash
   cat > .env <<'EOF'
   COMPOSE_PROJECT_NAME=workspace-ai-observability
   ZO_ROOT_USER_EMAIL=<o2-root-email>
   ZO_ROOT_USER_PASSWORD=<o2-root-password>
   EOF
   chmod 600 .env
   ```

4. Start it, and check that it answers:

   ```bash
   docker compose up -d
   docker compose ps
   curl -sS http://localhost:5080/healthz
   ```

   The last command prints `{"status":"ok"}`.
5. From a campus machine that is not the VM, open `http://<university-vm-ipv4>:5080` in a browser and log in as root.
   A timeout means port `5080` is blocked outside the VM: ask the university's IT support to open it.

#### Create The Organizations

1. Create the two organizations, in the interface or through the API from the SSH session:

   ```bash
   export O2_ROOT='<o2-root-email>:<o2-root-password>'
   for org in staging production; do
     curl -sS -u "$O2_ROOT" -H 'Content-Type: application/json' \
       -X POST http://localhost:5080/api/organizations -d "{\"name\":\"$org\"}"; echo
   done
   ```

   Each answer carries the organization's `identifier`, which OpenObserve generates and which every URL below uses; store both in the password manager.
2. Create one member user in each organization, with its own email and password:

   ```bash
   curl -sS -u "$O2_ROOT" -H 'Content-Type: application/json' -X POST \
     http://localhost:5080/api/<staging-org-id>/users \
     -d '{"email":"<staging-o2-user>","password":"<staging-o2-password>","role":"member","first_name":"staging"}'
   ```

   Repeat it for production, with `<production-org-id>` and the production user.
3. Log in to the interface as each member user, not as root, open **Data sources**, and copy the organization's `Authorization` value, `Basic` and its token, into the password manager.
   Root's token works for every organization, so it is never a deployment's credential.

| Organization | Identifier | User | Ingestion credential | Query credential |
| ------------ | ---------- | ---- | -------------------- | ---------------- |
| `staging` | `<staging-org-id>` | `<staging-o2-user>` | `Basic <staging-ingest-token>` | `<staging-o2-user>` and `<staging-o2-password>` |
| `production` | `<production-org-id>` | `<production-o2-user>` | `Basic <production-ingest-token>` | `<production-o2-user>` and `<production-o2-password>` |

#### Configure Each Deployment's Export

Add these lines to each deployment's `app/backend/.env`, beside the values in [Configuration](#configuration), here for staging:

```bash
OBSERVABILITY_ENABLED=true
OBSERVABILITY_ENVIRONMENT=staging
OBSERVABILITY_OTLP_ENDPOINT=http://<university-vm-ipv4>:5080/api/<staging-org-id>
OBSERVABILITY_AUTHORIZATION="Basic <staging-ingest-token>"
OBSERVABILITY_LOG_STREAM=backend_requests
OBSERVABILITY_LOG_EXPORT_INTERVAL_SECONDS=1
OBSERVABILITY_METRIC_EXPORT_INTERVAL_SECONDS=10
```

| Deployment | `OBSERVABILITY_ENVIRONMENT` | `OBSERVABILITY_OTLP_ENDPOINT` | `OBSERVABILITY_AUTHORIZATION` |
| ---------- | --------------------------- | ----------------------------- | ----------------------------- |
| Staging | `staging` | `http://<university-vm-ipv4>:5080/api/<staging-org-id>` | `Basic <staging-ingest-token>` |
| Production | `production` | `http://<university-vm-ipv4>:5080/api/<production-org-id>` | `Basic <production-ingest-token>` |

- The log exporter's batch interval is `OBSERVABILITY_LOG_EXPORT_INTERVAL_SECONDS=1`, so a request's log line is searchable within five seconds.
- The metric exporter's interval is `OBSERVABILITY_METRIC_EXPORT_INTERVAL_SECONDS=10`, so the histogram has a point well inside the five-minute window of `SLI-01`.
- `OBSERVABILITY_ENVIRONMENT` is the `environment` label on every signal, and the endpoint and its credential decide which organization the signals reach.
- The `NO_PROXY` line from [Configure Each Deployment's Backend](#configure-each-deployments-backend) also keeps the export off the proxy to the LLM service provider, and it holds the VM's address for both.

The values are read when the `backend` starts, so a change takes effect after `docker compose up -d` in the deployment's `app/` directory.
A local run exports nothing, because [the setup page](setup.md) leaves `OBSERVABILITY_ENABLED` at `false`.
Never paste a production endpoint or credential into staging or the other way round.

#### Query The Signals

The aggregate and the per-request log line are read with the organization's query credential, here for staging:

```bash
export O2_URL="http://$VM_HOST:5080"
export O2_STAGING='<staging-o2-user>:<staging-o2-password>'
```

- The aggregate, the PromQL query of `SLI-01` in [the observability plan](observability.md), at `$O2_URL/api/<staging-org-id>/prometheus/api/v1/query`:

  ```bash
  curl -sS -u "$O2_STAGING" "$O2_URL/api/<staging-org-id>/prometheus/api/v1/query" \
    --data-urlencode 'query=<the SLI-01 query>'
  ```

- The per-request log line, the SQL query beside `SLI-01`, at `$O2_URL/api/<staging-org-id>/_search`, with the time range in microseconds:

  ```bash
  NOW=$(( $(date +%s) * 1000000 ))
  curl -sS -u "$O2_STAGING" -H 'Content-Type: application/json' \
    -X POST "$O2_URL/api/<staging-org-id>/_search" \
    -d "{\"query\":{\"sql\":\"SELECT request_id, route, outcome, duration_ms FROM backend_requests WHERE request_id = '<request-id>'\",\"start_time\":$((NOW - 3600000000)),\"end_time\":$NOW}}"
  ```

The diagnosability test runs these queries against the staging organization only.

#### Check The Observability Pipeline

Check the pipeline after it is installed, after each change to an organization or a deployment's `app/backend/.env`, and after each deploy to staging.

1. Check, in the SSH session, that each deployment has its own organization:

   ```bash
   grep -H OBSERVABILITY_OTLP_ENDPOINT /opt/workspace-ai/staging/app/backend/.env /opt/workspace-ai/production/app/backend/.env
   ```

   The two endpoints end in different identifiers, each matching its organization.
2. Before the instrumentation is deployed, send a log line and a histogram by hand from the staging `backend` container, two that succeed and one that fails, into a stream of their own:

   ```bash
   cd /opt/workspace-ai/staging/app
   export EP='http://<university-vm-ipv4>:5080/api/<staging-org-id>'
   export AUTH='Authorization: Basic <staging-ingest-token>'
   NOW=$(date +%s%N)
   docker compose exec -T backend sh -c "wget -qO- --header='$AUTH' --header='stream-name: pipeline_check' --header='Content-Type: application/json' \
    --post-data='{\"resourceLogs\":[{\"scopeLogs\":[{\"logRecords\":[
     {\"timeUnixNano\":\"$NOW\",\"body\":{\"stringValue\":\"request\"},\"attributes\":[{\"key\":\"request_id\",\"value\":{\"stringValue\":\"check-1\"}},{\"key\":\"outcome\",\"value\":{\"stringValue\":\"success\"}},{\"key\":\"duration_ms\",\"value\":{\"doubleValue\":120}}]},
     {\"timeUnixNano\":\"$NOW\",\"body\":{\"stringValue\":\"request\"},\"attributes\":[{\"key\":\"request_id\",\"value\":{\"stringValue\":\"check-2\"}},{\"key\":\"outcome\",\"value\":{\"stringValue\":\"success\"}},{\"key\":\"duration_ms\",\"value\":{\"doubleValue\":180}}]},
     {\"timeUnixNano\":\"$NOW\",\"body\":{\"stringValue\":\"request\"},\"attributes\":[{\"key\":\"request_id\",\"value\":{\"stringValue\":\"check-3\"}},{\"key\":\"outcome\",\"value\":{\"stringValue\":\"server_error\"}},{\"key\":\"duration_ms\",\"value\":{\"doubleValue\":900}}]}
    ]}]}]}' $EP/v1/logs"; echo
   docker compose exec -T backend sh -c "wget -qO- --header='$AUTH' --header='Content-Type: application/json' \
    --post-data='{\"resourceMetrics\":[{\"scopeMetrics\":[{\"metrics\":[{\"name\":\"pipeline_check_duration_ms\",\"histogram\":{\"aggregationTemporality\":2,\"dataPoints\":[
     {\"attributes\":[{\"key\":\"outcome\",\"value\":{\"stringValue\":\"success\"}}],\"timeUnixNano\":\"$NOW\",\"count\":\"2\",\"sum\":300,\"explicitBounds\":[100,250,500,1000],\"bucketCounts\":[\"0\",\"2\",\"0\",\"0\",\"0\"]},
     {\"attributes\":[{\"key\":\"outcome\",\"value\":{\"stringValue\":\"server_error\"}}],\"timeUnixNano\":\"$NOW\",\"count\":\"1\",\"sum\":900,\"explicitBounds\":[100,250,500,1000],\"bucketCounts\":[\"0\",\"0\",\"0\",\"1\",\"0\"]}
    ]}}]}]}]}' $EP/v1/metrics"; echo
   ```

   Then, as in [Query The Signals](#query-the-signals), the query `histogram_quantile(0.95, sum by (le, outcome) (pipeline_check_duration_ms_bucket))` returns a `success` and a `server_error` series, each with a number and not `NaN`, and the `pipeline_check` stream holds the three `request_id`s.
3. After the instrumentation is deployed to staging, open a board on `$STAGING_URL`, take its identifier from the address, and send a request to an API route from a campus machine, reading the request identifier the `backend` returns:

   ```bash
   curl -sS -D - -o /dev/null "$STAGING_URL/api/widgets?boardId=<staging-board-id>" | grep -i x-request-id
   ```

   A route outside the API, such as `/api/openapi.json`, is recorded with the route `unmatched`, so the check uses `/api/widgets`, which is recorded as `/widgets`.
   Within five seconds, the per-request log query in [Query The Signals](#query-the-signals) finds that `request_id` in the staging organization's `backend_requests` stream, and within a minute the query of `SLI-01` returns a series labelled `environment="staging"`.
4. Log in as the production user and check that the production organization has no `pipeline_check` stream and no signal labelled `environment="staging"`, so it received no test traffic.

| What showed it | What it means |
| -------------- | ------------- |
| The `backend` exits at start with `OBSERVABILITY_OTLP_ENDPOINT is required` or `OBSERVABILITY_AUTHORIZATION is required` | `OBSERVABILITY_ENABLED` is `true` without that value in `app/backend/.env`: add it, or set `OBSERVABILITY_ENABLED=false` |
| `401` from `/v1/logs` or `/v1/metrics` | The `Authorization` value is not the organization's member token, or `Basic` is missing |
| A `404` or an organization that does not appear | The endpoint names the organization's name, not its generated identifier |
| The log line but no histogram series | Wait for the ten-second metric export, then check the `le` label in the query: a sum without `le` leaves `histogram_quantile` nothing to interpolate |
| A `NaN` P95 | No observation in the queried range: widen the range, or send the requests again |
| A timeout | Port `5080` is not reachable from campus, or the `backend` cannot reach the VM's address |

#### Run And Restart OpenObserve

In `/opt/workspace-ai/observability`:

```bash
docker compose ps
docker compose logs --tail=100 openobserve
docker compose restart openobserve
```

`docker compose down` keeps the `openobserve-data` volume, so the signals survive a restart.
An upgrade changes the image tag in `docker-compose.yml` and in the table above, then runs `docker compose up -d`.

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

Record the check in `reports/week-NN/deployment.md`, which the week's report and the release link: the date, the member, the deployment, the commit, the steps done, and the result, with the address written as `<university-vm-ipv4>`, as `reports/week-05/deployment.md` does.
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
A board that works on `http://localhost` but not on the VM points at a browser feature that needs HTTPS, and the browser console names it.

## When The VM Is Not Available

When the VM or its campus access is not available in time, the deployment is postponed to the date the group chat announces.
The week's report records the postponement and that date and declares the deviation, the Sprint Review shows the product running locally, and a `deployed` test falls back to `scripted` or `CI` until the VM arrives.

## Failed Runs

Each deploy that went wrong is recorded here: what showed it, how it was recovered, and what to try first next time.

| Date | Deployment | What showed it | Recovery | Try first next time |
| ---- | ---------- | -------------- | -------- | ------------------- |
| 2026-10-30 | Before the first deploy | The backend container exited at once with `/bin/sh: syntax error: unterminated quoted string` | The cut-off `CMD` line of `app/backend/Dockerfile` was restored in [#214](https://github.com/WellMadeTeam/workspace-ai-03/pull/214) | `docker compose logs backend` |
| 2026-10-31 | Before the first deploy | `curl` from the VM to the LLM service provider printed `403` | The calls to the provider go through the proxy in [The Proxy To The LLM Service Provider](#the-proxy-to-the-llm-service-provider) | The proxy check with `curl -x` |
| 2026-10-31 | Staging | The board did not open over plain HTTP, and the browser console showed `crypto.randomUUID is not a function`, because browsers offer it only over HTTPS or on `localhost` | The frontend makes its UUIDs with `crypto.getRandomValues` since [#221](https://github.com/WellMadeTeam/workspace-ai-03/pull/221), and the fixed commit is deployed to staging again | The browser console on `$STAGING_URL` |
| 2026-11-08 | Analytics | Every request to the dashboard was redirected to HTTPS, which the VM cannot serve | The plain-HTTP Caddyfile in [Install OpenPanel](#install-openpanel) | `curl -sS -o /dev/null -w '%{redirect_url}\n'` on the dashboard |
| 2026-11-08 | Analytics | The staging test event was refused with `401` and `Ingestion: Invalid cors or secret` | Enabling Domains feature of the project | The staging project's allowed domain against `$STAGING_URL` |
