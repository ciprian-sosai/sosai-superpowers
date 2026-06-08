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
      while (queue.length > 0) ws.send(queue.shift());
    });
    ws.addEventListener('message', (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === 'reload') location.reload();
      } catch (_) {}
    });
    ws.addEventListener('close', () => { ws = null; setTimeout(connect, 1000); });
    ws.addEventListener('error', () => { ws = null; });
  }

  connect();

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-choice]');
    if (!el) return;
    const container = el.closest('[data-multiselect]');
    if (!container) {
      const parent = el.parentElement;
      parent.querySelectorAll('[data-choice]').forEach(s => s.classList.remove('selected'));
    }
    el.classList.toggle('selected');
    const selected = (container || el.parentElement).querySelectorAll('[data-choice].selected');
    send({ choice: el.dataset.choice, text: el.textContent.trim(), id: el.id || null, timestamp: Date.now() });
    updateIndicator(selected);
  });

  function updateIndicator(selected) {
    const bar = document.getElementById('indicator-bar');
    if (!bar) return;
    if (selected.length === 0) { bar.textContent = ''; bar.style.display = 'none'; }
    else {
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
