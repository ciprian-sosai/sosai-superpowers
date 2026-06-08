#!/usr/bin/env bash
# Derived from superpowers (https://github.com/obra/superpowers) by Jesse Vincent, MIT License.
# Adapted for sosai-superpowers by Ciprian Sosai.
# Stop the brainstorm server.
# Usage: stop-server.sh <session_dir>

SESSION_DIR="$1"

if [[ -z "$SESSION_DIR" ]]; then
  echo '{"error": "Usage: stop-server.sh <session_dir>"}'
  exit 1
fi

STATE_DIR="${SESSION_DIR}/state"
PID_FILE="${STATE_DIR}/server.pid"

if [[ ! -f "$PID_FILE" ]]; then
  echo '{"status": "not-running", "reason": "no pid file found"}'
  exit 0
fi

SERVER_PID=$(cat "$PID_FILE")

if ! kill -0 "$SERVER_PID" 2>/dev/null; then
  rm -f "$PID_FILE"
  echo '{"status": "not-running", "reason": "process already dead"}'
  exit 0
fi

kill "$SERVER_PID" 2>/dev/null

for i in {1..20}; do
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then break; fi
  sleep 0.1
done

if kill -0 "$SERVER_PID" 2>/dev/null; then
  kill -9 "$SERVER_PID" 2>/dev/null
  sleep 0.2
fi

if kill -0 "$SERVER_PID" 2>/dev/null; then
  echo "{\"error\": \"Failed to stop server (pid $SERVER_PID)\"}"
  exit 1
fi

rm -f "$PID_FILE" "${STATE_DIR}/server.log"

# Only delete ephemeral /tmp directories — preserve .sosai-superpowers/ for later review
if [[ "$SESSION_DIR" == /tmp/* ]]; then
  rm -rf "$SESSION_DIR"
fi

echo '{"status": "stopped"}'
