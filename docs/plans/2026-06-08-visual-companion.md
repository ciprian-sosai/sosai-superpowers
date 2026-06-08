# Visual Companion for Brainstorming — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a browser-based visual companion to `sosai-superpowers:brainstorming` — adapted from superpowers with cowork-specific layouts.

**Architecture:** Copy superpowers' 5 scripts with credit comments and minimal adaptation. Adapt `frame-template.html` to add cowork-specific CSS layouts (process-flow, decision-tree, stakeholder-map, comparison-table). Write a new `visual-companion.md` guide for cowork. Update `brainstorming/SKILL.md` to offer the companion.

**Tech Stack:** Node.js (built-ins only), Bash, HTML/CSS/JS

**Credit:** All scripts derived from [superpowers](https://github.com/obra/superpowers) by Jesse Vincent, MIT License.

---

## File Map

| File | Action |
|---|---|
| `skills/brainstorming/scripts/server.cjs` | Copy + add credit comment |
| `skills/brainstorming/scripts/start-server.sh` | Copy + add credit comment + change `.superpowers` → `.sosai-superpowers` |
| `skills/brainstorming/scripts/stop-server.sh` | Copy + add credit comment + change `.superpowers` → `.sosai-superpowers` |
| `skills/brainstorming/scripts/helper.js` | Copy + add credit comment |
| `skills/brainstorming/scripts/frame-template.html` | Copy + add cowork layouts (process-flow, decision-tree, stakeholder-map, comparison-table) |
| `skills/brainstorming/visual-companion.md` | Write from scratch for cowork context |
| `skills/brainstorming/SKILL.md` | Add Visual Companion section (same pattern as superpowers) |

---

## Task 1: `server.cjs`

**Files:**
- Create: `skills/brainstorming/scripts/server.cjs`

- [ ] **Step 1: Create `skills/brainstorming/scripts/server.cjs`**

```javascript
// Derived from superpowers (https://github.com/obra/superpowers) by Jesse Vincent, MIT License.
// Adapted for sosai-superpowers by Ciprian Sosai.
const crypto = require('crypto');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ========== WebSocket Protocol (RFC 6455) ==========

const OPCODES = { TEXT: 0x01, CLOSE: 0x08, PING: 0x09, PONG: 0x0A };
const WS_MAGIC = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

function computeAcceptKey(clientKey) {
  return crypto.createHash('sha1').update(clientKey + WS_MAGIC).digest('base64');
}

function encodeFrame(opcode, payload) {
  const fin = 0x80;
  const len = payload.length;
  let header;

  if (len < 126) {
    header = Buffer.alloc(2);
    header[0] = fin | opcode;
    header[1] = len;
  } else if (len < 65536) {
    header = Buffer.alloc(4);
    header[0] = fin | opcode;
    header[1] = 126;
    header.writeUInt16BE(len, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = fin | opcode;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(len), 2);
  }

  return Buffer.concat([header, payload]);
}

function decodeFrame(buffer) {
  if (buffer.length < 2) return null;

  const secondByte = buffer[1];
  const opcode = buffer[0] & 0x0F;
  const masked = (secondByte & 0x80) !== 0;
  let payloadLen = secondByte & 0x7F;
  let offset = 2;

  if (!masked) throw new Error('Client frames must be masked');

  if (payloadLen === 126) {
    if (buffer.length < 4) return null;
    payloadLen = buffer.readUInt16BE(2);
    offset = 4;
  } else if (payloadLen === 127) {
    if (buffer.length < 10) return null;
    payloadLen = Number(buffer.readBigUInt64BE(2));
    offset = 10;
  }

  const maskOffset = offset;
  const dataOffset = offset + 4;
  const totalLen = dataOffset + payloadLen;
  if (buffer.length < totalLen) return null;

  const mask = buffer.slice(maskOffset, dataOffset);
  const data = Buffer.alloc(payloadLen);
  for (let i = 0; i < payloadLen; i++) {
    data[i] = buffer[dataOffset + i] ^ mask[i % 4];
  }

  return { opcode, payload: data, bytesConsumed: totalLen };
}

// ========== Configuration ==========

const PORT = process.env.BRAINSTORM_PORT || (49152 + Math.floor(Math.random() * 16383));
const HOST = process.env.BRAINSTORM_HOST || '127.0.0.1';
const URL_HOST = process.env.BRAINSTORM_URL_HOST || (HOST === '127.0.0.1' ? 'localhost' : HOST);
const SESSION_DIR = process.env.BRAINSTORM_DIR || '/tmp/brainstorm';
const CONTENT_DIR = path.join(SESSION_DIR, 'content');
const STATE_DIR = path.join(SESSION_DIR, 'state');
let ownerPid = process.env.BRAINSTORM_OWNER_PID ? Number(process.env.BRAINSTORM_OWNER_PID) : null;

const MIME_TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml'
};

// ========== Templates and Constants ==========

const WAITING_PAGE = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Brainstorm Companion</title>
<style>body { font-family: system-ui, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; }
h1 { color: #333; } p { color: #666; }</style>
</head>
<body><h1>Brainstorm Companion</h1>
<p>Waiting for the agent to push a screen...</p></body></html>`;

const frameTemplate = fs.readFileSync(path.join(__dirname, 'frame-template.html'), 'utf-8');
const helperScript = fs.readFileSync(path.join(__dirname, 'helper.js'), 'utf-8');
const helperInjection = '<script>\n' + helperScript + '\n</script>';

// ========== Helper Functions ==========

function isFullDocument(html) {
  const trimmed = html.trimStart().toLowerCase();
  return trimmed.startsWith('<!doctype') || trimmed.startsWith('<html');
}

function wrapInFrame(content) {
  return frameTemplate.replace('<!-- CONTENT -->', content);
}

function getNewestScreen() {
  const files = fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.html'))
    .map(f => {
      const fp = path.join(CONTENT_DIR, f);
      return { path: fp, mtime: fs.statSync(fp).mtime.getTime() };
    })
    .sort((a, b) => b.mtime - a.mtime);
  return files.length > 0 ? files[0].path : null;
}

// ========== HTTP Request Handler ==========

function handleRequest(req, res) {
  touchActivity();
  if (req.method === 'GET' && req.url === '/') {
    const screenFile = getNewestScreen();
    let html = screenFile
      ? (raw => isFullDocument(raw) ? raw : wrapInFrame(raw))(fs.readFileSync(screenFile, 'utf-8'))
      : WAITING_PAGE;

    if (html.includes('</body>')) {
      html = html.replace('</body>', helperInjection + '\n</body>');
    } else {
      html += helperInjection;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } else if (req.method === 'GET' && req.url.startsWith('/files/')) {
    const fileName = req.url.slice(7);
    const filePath = path.join(CONTENT_DIR, path.basename(fileName));
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}

// ========== WebSocket Connection Handling ==========

const clients = new Set();

function handleUpgrade(req, socket) {
  const key = req.headers['sec-websocket-key'];
  if (!key) { socket.destroy(); return; }

  const accept = computeAcceptKey(key);
  socket.write(
    'HTTP/1.1 101 Switching Protocols\r\n' +
    'Upgrade: websocket\r\n' +
    'Connection: Upgrade\r\n' +
    'Sec-WebSocket-Accept: ' + accept + '\r\n\r\n'
  );

  let buffer = Buffer.alloc(0);
  clients.add(socket);

  socket.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);
    while (buffer.length > 0) {
      let result;
      try {
        result = decodeFrame(buffer);
      } catch (e) {
        socket.end(encodeFrame(OPCODES.CLOSE, Buffer.alloc(0)));
        clients.delete(socket);
        return;
      }
      if (!result) break;
      buffer = buffer.slice(result.bytesConsumed);

      switch (result.opcode) {
        case OPCODES.TEXT:
          handleMessage(result.payload.toString());
          break;
        case OPCODES.CLOSE:
          socket.end(encodeFrame(OPCODES.CLOSE, Buffer.alloc(0)));
          clients.delete(socket);
          return;
        case OPCODES.PING:
          socket.write(encodeFrame(OPCODES.PONG, result.payload));
          break;
        case OPCODES.PONG:
          break;
        default: {
          const closeBuf = Buffer.alloc(2);
          closeBuf.writeUInt16BE(1003);
          socket.end(encodeFrame(OPCODES.CLOSE, closeBuf));
          clients.delete(socket);
          return;
        }
      }
    }
  });

  socket.on('close', () => clients.delete(socket));
  socket.on('error', () => clients.delete(socket));
}

function handleMessage(text) {
  let event;
  try {
    event = JSON.parse(text);
  } catch (e) {
    console.error('Failed to parse WebSocket message:', e.message);
    return;
  }
  touchActivity();
  console.log(JSON.stringify({ source: 'user-event', ...event }));
  if (event.choice) {
    const eventsFile = path.join(STATE_DIR, 'events');
    fs.appendFileSync(eventsFile, JSON.stringify(event) + '\n');
  }
}

function broadcast(msg) {
  const frame = encodeFrame(OPCODES.TEXT, Buffer.from(JSON.stringify(msg)));
  for (const socket of clients) {
    try { socket.write(frame); } catch (e) { clients.delete(socket); }
  }
}

// ========== Activity Tracking ==========

const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
let lastActivity = Date.now();

function touchActivity() {
  lastActivity = Date.now();
}

// ========== File Watching ==========

const debounceTimers = new Map();

// ========== Server Startup ==========

function startServer() {
  if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });
  if (!fs.existsSync(STATE_DIR)) fs.mkdirSync(STATE_DIR, { recursive: true });

  const knownFiles = new Set(
    fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.html'))
  );

  const server = http.createServer(handleRequest);
  server.on('upgrade', handleUpgrade);

  const watcher = fs.watch(CONTENT_DIR, (eventType, filename) => {
    if (!filename || !filename.endsWith('.html')) return;

    if (debounceTimers.has(filename)) clearTimeout(debounceTimers.get(filename));
    debounceTimers.set(filename, setTimeout(() => {
      debounceTimers.delete(filename);
      const filePath = path.join(CONTENT_DIR, filename);

      if (!fs.existsSync(filePath)) return;
      touchActivity();

      if (!knownFiles.has(filename)) {
        knownFiles.add(filename);
        const eventsFile = path.join(STATE_DIR, 'events');
        if (fs.existsSync(eventsFile)) fs.unlinkSync(eventsFile);
        console.log(JSON.stringify({ type: 'screen-added', file: filePath }));
      } else {
        console.log(JSON.stringify({ type: 'screen-updated', file: filePath }));
      }

      broadcast({ type: 'reload' });
    }, 100));
  });
  watcher.on('error', (err) => console.error('fs.watch error:', err.message));

  function shutdown(reason) {
    console.log(JSON.stringify({ type: 'server-stopped', reason }));
    const infoFile = path.join(STATE_DIR, 'server-info');
    if (fs.existsSync(infoFile)) fs.unlinkSync(infoFile);
    fs.writeFileSync(
      path.join(STATE_DIR, 'server-stopped'),
      JSON.stringify({ reason, timestamp: Date.now() }) + '\n'
    );
    watcher.close();
    clearInterval(lifecycleCheck);
    server.close(() => process.exit(0));
  }

  function ownerAlive() {
    if (!ownerPid) return true;
    try { process.kill(ownerPid, 0); return true; } catch (e) { return e.code === 'EPERM'; }
  }

  const lifecycleCheck = setInterval(() => {
    if (!ownerAlive()) shutdown('owner process exited');
    else if (Date.now() - lastActivity > IDLE_TIMEOUT_MS) shutdown('idle timeout');
  }, 60 * 1000);
  lifecycleCheck.unref();

  if (ownerPid) {
    try { process.kill(ownerPid, 0); }
    catch (e) {
      if (e.code !== 'EPERM') {
        console.log(JSON.stringify({ type: 'owner-pid-invalid', pid: ownerPid, reason: 'dead at startup' }));
        ownerPid = null;
      }
    }
  }

  server.listen(PORT, HOST, () => {
    const info = JSON.stringify({
      type: 'server-started', port: Number(PORT), host: HOST,
      url_host: URL_HOST, url: 'http://' + URL_HOST + ':' + PORT,
      screen_dir: CONTENT_DIR, state_dir: STATE_DIR
    });
    console.log(info);
    fs.writeFileSync(path.join(STATE_DIR, 'server-info'), info + '\n');
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { computeAcceptKey, encodeFrame, decodeFrame, OPCODES };
```

- [ ] **Step 2: Commit**

```bash
git add skills/brainstorming/scripts/server.cjs
git commit -m "feat: add brainstorm server (adapted from superpowers)"
```

---

## Task 2: `start-server.sh`

**Files:**
- Create: `skills/brainstorming/scripts/start-server.sh`

- [ ] **Step 1: Create `skills/brainstorming/scripts/start-server.sh`**

```bash
#!/usr/bin/env bash
# Derived from superpowers (https://github.com/obra/superpowers) by Jesse Vincent, MIT License.
# Adapted for sosai-superpowers by Ciprian Sosai.
# Start the brainstorm server and output connection info.
# Usage: start-server.sh [--project-dir <path>] [--host <bind-host>] [--url-host <display-host>] [--foreground] [--background]

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

PROJECT_DIR=""
FOREGROUND="false"
FORCE_BACKGROUND="false"
BIND_HOST="127.0.0.1"
URL_HOST=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --project-dir)
      PROJECT_DIR="$2"
      shift 2
      ;;
    --host)
      BIND_HOST="$2"
      shift 2
      ;;
    --url-host)
      URL_HOST="$2"
      shift 2
      ;;
    --foreground|--no-daemon)
      FOREGROUND="true"
      shift
      ;;
    --background|--daemon)
      FORCE_BACKGROUND="true"
      shift
      ;;
    *)
      echo "{\"error\": \"Unknown argument: $1\"}"
      exit 1
      ;;
  esac
done

if [[ -z "$URL_HOST" ]]; then
  if [[ "$BIND_HOST" == "127.0.0.1" || "$BIND_HOST" == "localhost" ]]; then
    URL_HOST="localhost"
  else
    URL_HOST="$BIND_HOST"
  fi
fi

if [[ -n "${CODEX_CI:-}" && "$FOREGROUND" != "true" && "$FORCE_BACKGROUND" != "true" ]]; then
  FOREGROUND="true"
fi

if [[ "$FOREGROUND" != "true" && "$FORCE_BACKGROUND" != "true" ]]; then
  case "${OSTYPE:-}" in
    msys*|cygwin*|mingw*) FOREGROUND="true" ;;
  esac
  if [[ -n "${MSYSTEM:-}" ]]; then
    FOREGROUND="true"
  fi
fi

SESSION_ID="$$-$(date +%s)"

if [[ -n "$PROJECT_DIR" ]]; then
  SESSION_DIR="${PROJECT_DIR}/.sosai-superpowers/brainstorm/${SESSION_ID}"
else
  SESSION_DIR="/tmp/brainstorm-${SESSION_ID}"
fi

STATE_DIR="${SESSION_DIR}/state"
PID_FILE="${STATE_DIR}/server.pid"
LOG_FILE="${STATE_DIR}/server.log"

mkdir -p "${SESSION_DIR}/content" "$STATE_DIR"

if [[ -f "$PID_FILE" ]]; then
  old_pid=$(cat "$PID_FILE")
  kill "$old_pid" 2>/dev/null
  rm -f "$PID_FILE"
fi

cd "$SCRIPT_DIR"

OWNER_PID="$(ps -o ppid= -p "$PPID" 2>/dev/null | tr -d ' ')"
if [[ -z "$OWNER_PID" || "$OWNER_PID" == "1" ]]; then
  OWNER_PID="$PPID"
fi

if [[ "$FOREGROUND" == "true" ]]; then
  echo "$$" > "$PID_FILE"
  env BRAINSTORM_DIR="$SESSION_DIR" BRAINSTORM_HOST="$BIND_HOST" BRAINSTORM_URL_HOST="$URL_HOST" BRAINSTORM_OWNER_PID="$OWNER_PID" node server.cjs
  exit $?
fi

nohup env BRAINSTORM_DIR="$SESSION_DIR" BRAINSTORM_HOST="$BIND_HOST" BRAINSTORM_URL_HOST="$URL_HOST" BRAINSTORM_OWNER_PID="$OWNER_PID" node server.cjs > "$LOG_FILE" 2>&1 &
SERVER_PID=$!
disown "$SERVER_PID" 2>/dev/null
echo "$SERVER_PID" > "$PID_FILE"

for i in {1..50}; do
  if grep -q "server-started" "$LOG_FILE" 2>/dev/null; then
    alive="true"
    for _ in {1..20}; do
      if ! kill -0 "$SERVER_PID" 2>/dev/null; then
        alive="false"
        break
      fi
      sleep 0.1
    done
    if [[ "$alive" != "true" ]]; then
      echo "{\"error\": \"Server started but was killed. Retry with: $SCRIPT_DIR/start-server.sh${PROJECT_DIR:+ --project-dir $PROJECT_DIR} --host $BIND_HOST --url-host $URL_HOST --foreground\"}"
      exit 1
    fi
    grep "server-started" "$LOG_FILE" | head -1
    exit 0
  fi
  sleep 0.1
done

echo '{"error": "Server failed to start within 5 seconds"}'
exit 1
```

- [ ] **Step 2: Make executable and commit**

```bash
chmod +x skills/brainstorming/scripts/start-server.sh
git add skills/brainstorming/scripts/start-server.sh
git commit -m "feat: add start-server.sh (adapted from superpowers)"
```

---

## Task 3: `stop-server.sh`

**Files:**
- Create: `skills/brainstorming/scripts/stop-server.sh`

- [ ] **Step 1: Create `skills/brainstorming/scripts/stop-server.sh`**

```bash
#!/usr/bin/env bash
# Derived from superpowers (https://github.com/obra/superpowers) by Jesse Vincent, MIT License.
# Adapted for sosai-superpowers by Ciprian Sosai.
# Stop the brainstorm server and clean up ephemeral session directories.
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

# Try graceful shutdown first
kill "$SERVER_PID" 2>/dev/null

for i in {1..20}; do
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    break
  fi
  sleep 0.1
done

# Force kill if still alive
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
```

- [ ] **Step 2: Make executable and commit**

```bash
chmod +x skills/brainstorming/scripts/stop-server.sh
git add skills/brainstorming/scripts/stop-server.sh
git commit -m "feat: add stop-server.sh (adapted from superpowers)"
```

---

## Task 4: `helper.js`

**Files:**
- Create: `skills/brainstorming/scripts/helper.js`

- [ ] **Step 1: Create `skills/brainstorming/scripts/helper.js`**

```javascript
// Derived from superpowers (https://github.com/obra/superpowers) by Jesse Vincent, MIT License.
// Adapted for sosai-superpowers by Ciprian Sosai.
(function () {
  const wsUrl = 'ws://' + location.host;
  let ws = null;
  const queue = [];

  function send(event) {
    const msg = JSON.stringify(event);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(msg);
    } else {
      queue.push(msg);
    }
  }

  function connect() {
    ws = new WebSocket(wsUrl);

    ws.addEventListener('open', () => {
      while (queue.length > 0) {
        ws.send(queue.shift());
      }
    });

    ws.addEventListener('message', (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === 'reload') location.reload();
      } catch (_) {}
    });

    ws.addEventListener('close', () => {
      ws = null;
      setTimeout(connect, 1000);
    });

    ws.addEventListener('error', () => {
      ws = null;
    });
  }

  connect();

  // Handle data-choice clicks
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-choice]');
    if (!el) return;

    const container = el.closest('[data-multiselect]');
    if (!container) {
      // Single select: deselect siblings
      const parent = el.parentElement;
      parent.querySelectorAll('[data-choice]').forEach(s => s.classList.remove('selected'));
    }

    el.classList.toggle('selected');

    const selected = (container || el.parentElement)
      .querySelectorAll('[data-choice].selected');

    send({
      choice: el.dataset.choice,
      text: el.textContent.trim(),
      id: el.id || null,
      timestamp: Date.now()
    });

    updateIndicator(selected);
  });

  function updateIndicator(selected) {
    const bar = document.getElementById('indicator-bar');
    if (!bar) return;
    if (selected.length === 0) {
      bar.textContent = '';
      bar.style.display = 'none';
    } else {
      const labels = Array.from(selected).map(el => el.textContent.trim().slice(0, 40));
      bar.textContent = 'Selected: ' + labels.join(', ');
      bar.style.display = 'block';
    }
  }

  function toggleSelect(containerId) {
    const container = document.getElementById(containerId);
    if (container) container.toggleAttribute('data-multiselect');
  }

  window.brainstorm = {
    send,
    choice: (value, metadata = {}) => send({ choice: value, ...metadata, timestamp: Date.now() })
  };
  window.toggleSelect = toggleSelect;
})();
```

- [ ] **Step 2: Commit**

```bash
git add skills/brainstorming/scripts/helper.js
git commit -m "feat: add helper.js WebSocket client (adapted from superpowers)"
```

---

## Task 5: `frame-template.html`

**Files:**
- Create: `skills/brainstorming/scripts/frame-template.html`

- [ ] **Step 1: Create `skills/brainstorming/scripts/frame-template.html`**

```html
<!DOCTYPE html>
<!-- Derived from superpowers (https://github.com/obra/superpowers) by Jesse Vincent, MIT License. -->
<!-- Adapted for sosai-superpowers with cowork-specific layouts by Ciprian Sosai. -->
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Brainstorm Companion</title>
<style>
  :root {
    --bg: #f5f5f7;
    --surface: #ffffff;
    --border: #d1d1d6;
    --text: #1d1d1f;
    --text-secondary: #6e6e73;
    --accent: #0071e3;
    --accent-light: #e8f0fe;
    --green: #28a745;
    --green-light: #d4edda;
    --red: #dc3545;
    --red-light: #f8d7da;
    --radius: 12px;
    --radius-sm: 8px;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #1d1d1f;
      --surface: #2c2c2e;
      --border: #3a3a3c;
      --text: #f5f5f7;
      --text-secondary: #aeaeb2;
      --accent: #0a84ff;
      --accent-light: #1c3a5e;
      --green-light: #1a3a24;
      --red-light: #3a1c1f;
    }
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  header h1 { font-size: 1rem; font-weight: 600; color: var(--text); }
  header .status { font-size: 0.75rem; color: var(--text-secondary); }

  main {
    flex: 1;
    padding: 1.5rem;
    max-width: 960px;
    margin: 0 auto;
    width: 100%;
  }

  /* ===== SHARED COMPONENTS ===== */

  h2 { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--text); }
  h3 { font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text); }
  p  { color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.5; }

  /* ===== OPTIONS (A/B/C choices) ===== */

  .options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .option {
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: border-color 0.15s, background 0.15s;
  }

  .option:hover { border-color: var(--accent); }
  .option.selected { border-color: var(--accent); background: var(--accent-light); }

  .option .badge {
    background: var(--accent);
    color: #fff;
    font-weight: 700;
    font-size: 0.85rem;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .option .content .label { font-weight: 600; margin-bottom: 0.25rem; }
  .option .content .desc  { font-size: 0.875rem; color: var(--text-secondary); }

  /* ===== CARDS (grid layout) ===== */

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }

  .card {
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem;
    cursor: pointer;
    transition: border-color 0.15s;
  }

  .card:hover { border-color: var(--accent); }
  .card.selected { border-color: var(--accent); background: var(--accent-light); }
  .card .card-title { font-weight: 600; margin-bottom: 0.5rem; }
  .card .card-body  { font-size: 0.875rem; color: var(--text-secondary); }

  /* ===== SPLIT (side by side comparison) ===== */

  .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 700px) { .split { grid-template-columns: 1fr; } }

  /* ===== MOCKUP (prototype container) ===== */

  .mockup {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem;
    margin-bottom: 1rem;
  }

  /* ===== PROS / CONS ===== */

  .pros-cons { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

  @media (max-width: 600px) { .pros-cons { grid-template-columns: 1fr; } }

  .pros, .cons {
    background: var(--surface);
    border-radius: var(--radius);
    padding: 1rem;
  }

  .pros { border-top: 4px solid var(--green); }
  .cons { border-top: 4px solid var(--red); }

  .pros h3 { color: var(--green); }
  .cons h3 { color: var(--red); }

  .pros ul, .cons ul { padding-left: 1.25rem; }
  .pros li, .cons li { font-size: 0.875rem; margin-bottom: 0.4rem; color: var(--text-secondary); }

  /* ===== PROCESS FLOW (cowork: steps in sequence) ===== */

  .process-flow {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .process-step {
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: border-color 0.15s;
    position: relative;
  }

  .process-step:not(:last-child)::after {
    content: '↓';
    position: absolute;
    bottom: -1.35rem;
    left: 50%;
    transform: translateX(-50%);
    color: var(--text-secondary);
    font-size: 1.25rem;
    z-index: 1;
  }

  .process-step:not(:last-child) { margin-bottom: 1.5rem; }

  .process-step:hover { border-color: var(--accent); }
  .process-step.selected { border-color: var(--accent); background: var(--accent-light); }

  .process-step .step-number {
    background: var(--accent);
    color: #fff;
    font-weight: 700;
    font-size: 0.85rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .process-step .step-content .step-title { font-weight: 600; }
  .process-step .step-content .step-desc  { font-size: 0.875rem; color: var(--text-secondary); }

  /* ===== DECISION TREE (cowork: branching choices) ===== */

  .decision-tree { display: flex; flex-direction: column; gap: 1rem; }

  .decision-node {
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem 1.25rem;
  }

  .decision-node .question {
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text);
  }

  .decision-branches {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .branch {
    background: var(--bg);
    border: 2px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: border-color 0.15s, background 0.15s;
  }

  .branch:hover  { border-color: var(--accent); }
  .branch.selected { border-color: var(--accent); background: var(--accent-light); }

  /* ===== STAKEHOLDER MAP (cowork: people/roles grid) ===== */

  .stakeholder-map {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.75rem;
  }

  .stakeholder {
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.15s;
  }

  .stakeholder:hover { border-color: var(--accent); }
  .stakeholder.selected { border-color: var(--accent); background: var(--accent-light); }

  .stakeholder .avatar {
    width: 2.5rem;
    height: 2.5rem;
    background: var(--accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.5rem;
    font-size: 1.1rem;
    color: #fff;
    font-weight: 700;
  }

  .stakeholder .name { font-weight: 600; font-size: 0.875rem; }
  .stakeholder .role { font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.2rem; }

  /* ===== COMPARISON TABLE (cowork: criteria vs options) ===== */

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--surface);
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--border);
  }

  .comparison-table th {
    background: var(--accent);
    color: #fff;
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .comparison-table td {
    padding: 0.65rem 1rem;
    font-size: 0.875rem;
    border-bottom: 1px solid var(--border);
    color: var(--text-secondary);
  }

  .comparison-table tr:last-child td { border-bottom: none; }
  .comparison-table tr:hover td { background: var(--accent-light); }

  .tick   { color: var(--green); font-weight: 700; }
  .cross  { color: var(--red);   font-weight: 700; }
  .neutral { color: var(--text-secondary); }

  /* ===== INDICATOR BAR ===== */

  #indicator-bar {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--accent);
    color: #fff;
    text-align: center;
    padding: 0.6rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
  }
</style>
</head>
<body>
  <header>
    <h1>Brainstorm Companion</h1>
    <span class="status" id="conn-status">connecting…</span>
  </header>
  <main id="claude-content">
    <!-- CONTENT -->
  </main>
  <div id="indicator-bar"></div>
  <script>
    // Update connection status indicator
    const status = document.getElementById('conn-status');
    const orig = window.WebSocket;
    // Status is updated by helper.js after load
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        if (status.textContent === 'connecting…') status.textContent = 'live';
      }, 1200);
    });
  </script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add skills/brainstorming/scripts/frame-template.html
git commit -m "feat: add frame-template.html with cowork layouts (adapted from superpowers)"
```

---

## Task 6: `visual-companion.md`

**Files:**
- Create: `skills/brainstorming/visual-companion.md`

- [ ] **Step 1: Create `skills/brainstorming/visual-companion.md`**

```markdown
# Visual Companion Guide

The visual companion is a browser-based tool for showing mockups, diagrams, and visual options during brainstorming. It runs a local server and opens in the user's browser, allowing them to click on choices that Claude reads back.

**Derived from** [superpowers](https://github.com/obra/superpowers) by Jesse Vincent. Adapted for cowork context.

---

## Starting the Server

```bash
bash ~/.claude/skills/sosai-superpowers/skills/brainstorming/scripts/start-server.sh --project-dir /path/to/project
```

The command outputs JSON with:
- `url` — open this in a browser
- `screen_dir` — write HTML files here
- `state_dir` — read user clicks from `events` here

**Windows note:** The server runs in foreground mode (Git Bash limitation). Open a second terminal for other commands.

---

## Interaction Loop

1. Write an HTML fragment to `<screen_dir>/<name>.html`
2. Tell the user: "I've pushed a screen — open `<url>` to see it"
3. Wait; the user clicks in the browser
4. Read `<state_dir>/events` — each line is a JSON click event
5. Respond based on their selection, push next screen or return to text

Each new HTML file clears the previous events file automatically.

---

## When to Use the Browser vs Terminal

| Use browser | Use terminal |
|---|---|
| Layout or flow comparisons | Requirements questions |
| Process diagrams with steps | Conceptual trade-offs |
| Stakeholder maps | Scope decisions |
| Comparison tables | Open-ended clarification |
| Decision trees | Any text-based question |

**Rule:** Would the user understand this better by seeing it than reading it? If yes → browser. If no → terminal.

---

## Available CSS Classes

### Options (A/B/C choices)
```html
<h2>Which approach?</h2>
<div class="options">
  <div class="option" data-choice="A">
    <div class="badge">A</div>
    <div class="content">
      <div class="label">Option A</div>
      <div class="desc">Description of this option</div>
    </div>
  </div>
  <div class="option" data-choice="B">
    <div class="badge">B</div>
    <div class="content">
      <div class="label">Option B</div>
      <div class="desc">Description of this option</div>
    </div>
  </div>
</div>
```

### Process Flow (sequential steps)
```html
<h2>Proposed workflow</h2>
<div class="process-flow">
  <div class="process-step" data-choice="step-1">
    <div class="step-number">1</div>
    <div class="step-content">
      <div class="step-title">Gather requirements</div>
      <div class="step-desc">Interview stakeholders, review existing docs</div>
    </div>
  </div>
  <div class="process-step" data-choice="step-2">
    <div class="step-number">2</div>
    <div class="step-content">
      <div class="step-title">Draft proposal</div>
      <div class="step-desc">Write options with trade-offs</div>
    </div>
  </div>
</div>
```

### Decision Tree (branching choices)
```html
<div class="decision-tree">
  <div class="decision-node">
    <div class="question">Is this time-sensitive?</div>
    <div class="decision-branches">
      <div class="branch" data-choice="yes">Yes — under 48h</div>
      <div class="branch" data-choice="no">No — flexible timeline</div>
    </div>
  </div>
</div>
```

### Stakeholder Map
```html
<h2>Who is involved?</h2>
<div class="stakeholder-map">
  <div class="stakeholder" data-choice="ceo">
    <div class="avatar">C</div>
    <div class="name">CEO</div>
    <div class="role">Decision maker</div>
  </div>
  <div class="stakeholder" data-choice="ops">
    <div class="avatar">O</div>
    <div class="name">Operations</div>
    <div class="role">Implementer</div>
  </div>
</div>
```

### Comparison Table
```html
<h2>Option comparison</h2>
<table class="comparison-table">
  <thead>
    <tr><th>Criteria</th><th>Option A</th><th>Option B</th></tr>
  </thead>
  <tbody>
    <tr><td>Cost</td><td class="tick">✓ Low</td><td class="cross">✗ High</td></tr>
    <tr><td>Speed</td><td class="cross">✗ Slow</td><td class="tick">✓ Fast</td></tr>
    <tr><td>Risk</td><td class="tick">✓ Low</td><td class="neutral">~ Medium</td></tr>
  </tbody>
</table>
```

### Pros / Cons
```html
<div class="pros-cons">
  <div class="pros">
    <h3>Pros</h3>
    <ul>
      <li>Fast to implement</li>
      <li>Low cost</li>
    </ul>
  </div>
  <div class="cons">
    <h3>Cons</h3>
    <ul>
      <li>Requires buy-in from ops</li>
      <li>Short-term solution only</li>
    </ul>
  </div>
</div>
```

### Split (side by side)
```html
<div class="split">
  <div class="mockup">
    <h3>Current state</h3>
    <!-- describe current situation -->
  </div>
  <div class="mockup">
    <h3>Proposed state</h3>
    <!-- describe proposed change -->
  </div>
</div>
```

---

## File Naming

- Use descriptive names: `01-approach-options.html`, `02-process-flow.html`
- Never reuse a filename — always increment or use a new name
- The server always serves the newest file

---

## Stopping the Server

```bash
bash ~/.claude/skills/sosai-superpowers/skills/brainstorming/scripts/stop-server.sh <session_dir>
```

`session_dir` is the value returned in the `start-server.sh` output JSON.
```

- [ ] **Step 2: Commit**

```bash
git add skills/brainstorming/visual-companion.md
git commit -m "feat: add visual-companion.md for cowork brainstorming"
```

---

## Task 7: Update `brainstorming/SKILL.md`

**Files:**
- Modify: `skills/brainstorming/SKILL.md`

- [ ] **Step 1: Read current SKILL.md**

```bash
cat skills/brainstorming/SKILL.md
```

- [ ] **Step 2: Add Visual Companion section before the Red Flags section**

Add this section:

```markdown
## Visual Companion

A browser-based companion for showing mockups, diagrams, and visual options during brainstorming. Available as a tool — not required. Requires Node.js (no npm install needed).

**Offering the companion:** When you anticipate visual questions ahead (process flows, comparisons, decision trees, stakeholder maps), offer it once in its own message — no other content:

> "Some of what we're working through might be clearer if I can show it to you in a browser — process flows, comparison tables, diagrams. Want to try it? (Requires opening a local URL in your browser)"

Wait for the user's response. If they decline, continue text-only.

**If they accept:** Read `skills/brainstorming/visual-companion.md` for the full guide before starting the server.

**Per-question decision:** Even after acceptance, use the browser only for content that IS visual. A question about trade-offs is a text question. A question about which process flow works better is a visual question.
```

- [ ] **Step 3: Commit**

```bash
git add skills/brainstorming/SKILL.md
git commit -m "feat: add visual companion offer to brainstorming skill"
```

---

## Task 8: Push to GitHub

- [ ] **Step 1: Verify all files**

```bash
ls skills/brainstorming/
ls skills/brainstorming/scripts/
```

Expected in `skills/brainstorming/`:
- `SKILL.md`
- `visual-companion.md`
- `scripts/`

Expected in `skills/brainstorming/scripts/`:
- `server.cjs`
- `start-server.sh`
- `stop-server.sh`
- `helper.js`
- `frame-template.html`

- [ ] **Step 2: Push**

```bash
git push
```

Expected: `main -> main` pushed to `git@github.com:ciprian-sosai/sosai-superpowers.git`
