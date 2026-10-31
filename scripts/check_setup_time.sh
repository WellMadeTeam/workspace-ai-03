#!/usr/bin/env bash
# Times a first run of the product by the steps of docs/setup.md: the check of QR-04 QRT-01.
#
# Usage, on a development machine with Git, Docker, curl, and python3:
#
#     GROQ_API_KEY=<key> scripts/check_setup_time.sh [<repository-url>] [<branch>]
#
# It clones the branch (default: main) into a temporary directory, removes the
# images the product is built from so nothing is cached, follows the setup page's
# Install, Configure, and Run steps, and waits until the board opens and an AI
# block answers a query. It prints the seconds from the clone to that answer and
# the files the run changed, and exits with 1 when the run took 600 s or more or
# changed any file other than app/backend/.env.
#
# The run uses its own Compose project and port, set by HTTP_PORT (default:
# 8090), and removes its containers, volume, and images when it ends.

set -euo pipefail

REPOSITORY="${1:-https://github.com/WellMadeTeam/workspace-ai-03.git}"
BRANCH="${2:-main}"
PORT="${HTTP_PORT:-8090}"
LIMIT_S=600
WAIT_S=900

if [ -z "${GROQ_API_KEY:-}" ]; then
    echo "Set GROQ_API_KEY to the LLM service provider's key." >&2
    exit 2
fi

WORKDIR="$(mktemp -d)"
CHECKOUT="$WORKDIR/workspace-ai-03"
export COMPOSE_PROJECT_NAME="workspace-ai-qr04-$$"
export HTTP_PORT="$PORT"
BASE="http://localhost:$PORT"

cleanup() {
    if [ -d "$CHECKOUT/app" ]; then
        (cd "$CHECKOUT/app" && docker compose down -v --rmi local >/dev/null 2>&1) || true
    fi
    rm -rf "$WORKDIR"
}
trap cleanup EXIT

elapsed() {
    echo $(($(date +%s) - START))
}

json_field() {
    python3 -c 'import json, sys; print(json.load(sys.stdin)[sys.argv[1]])' "$1"
}

echo "branch: $BRANCH"
START="$(date +%s)"

# Install.
git clone --quiet --branch "$BRANCH" "$REPOSITORY" "$CHECKOUT"
cd "$CHECKOUT/app"
echo "commit: $(git rev-parse --short HEAD)"

# Nothing cached: the base images every Dockerfile and the Compose file name,
# and `--no-cache` below rebuilds every layer.
for image in $(sed -n 's/^FROM \([^ ]*\).*/\1/p' backend/Dockerfile frontend/Dockerfile) \
    $(sed -n 's/^ *image: *//p' docker-compose.yml); do
    if docker image rm "$image" >/dev/null 2>&1; then
        echo "removed cached image: $image"
    elif docker image inspect "$image" >/dev/null 2>&1; then
        echo "kept cached image, used by another container: $image"
    fi
done

# Configure: the key in place of the placeholder, the one edit the setup page asks for.
cp backend/.env.example backend/.env
{
    grep -v '^GROQ_API_KEY=' backend/.env || true
    printf 'GROQ_API_KEY="%s"\n' "$GROQ_API_KEY"
} > backend/.env.new
mv backend/.env.new backend/.env

# Run: the setup page's `docker compose up --build`, in the background.
docker compose build --no-cache --pull --quiet
docker compose up --detach --quiet-pull
echo "containers up after: $(elapsed) s"

# Open the board, as the browser does on http://localhost.
until curl -fsS "$BASE/" 2>/dev/null | grep -q 'id="root"' \
    && BOARD="$(curl -fsS -X POST "$BASE/api/boards" -H 'Content-Type: application/json' \
        -d '{"title":"QR-04 setup check"}' 2>/dev/null | json_field id 2>/dev/null)"; do
    if [ "$(elapsed)" -ge "$WAIT_S" ]; then
        echo "the board did not open within $WAIT_S s" >&2
        exit 1
    fi
    sleep 1
done
echo "board opened after: $(elapsed) s"

# Add an AI block and send it a query.
WIDGET="$(curl -fsS -X POST "$BASE/api/widgets" -H 'Content-Type: application/json' \
    -d "{\"board_id\":\"$BOARD\",\"widget_type\":\"ai\",\"title\":\"QR-04\",\"x\":0,\"y\":0}" | json_field id)"
REPLY="$(curl -fsS -X POST "$BASE/api/messages" -H 'Content-Type: application/json' --max-time 130 \
    -d "{\"widget_id\":\"$WIDGET\",\"content\":\"Answer with one word: what colour is the sky?\"}")"
ROLE="$(printf '%s' "$REPLY" | python3 -c 'import json, sys; print(json.load(sys.stdin)["reply"]["role"])')"
TOTAL="$(elapsed)"
echo "reply role: $ROLE"
echo "query answered after: $TOTAL s"

# The files the run changed: none tracked, and only app/backend/.env ignored.
CHANGED="$(git -C "$CHECKOUT" status --porcelain)"
IGNORED="$(git -C "$CHECKOUT" status --porcelain --ignored | sed -n 's/^!! //p')"
echo "changed tracked files: ${CHANGED:-none}"
echo "ignored files: ${IGNORED:-none}"

if [ "$ROLE" = "ai" ] && [ "$TOTAL" -lt "$LIMIT_S" ] && [ -z "$CHANGED" ] \
    && [ "$IGNORED" = "app/backend/.env" ]; then
    echo "result: PASS: answered in $TOTAL s, under $LIMIT_S s, editing only app/backend/.env"
else
    echo "result: FAIL: answered in $TOTAL s with reply role $ROLE; limit $LIMIT_S s, only app/backend/.env may change"
    exit 1
fi
