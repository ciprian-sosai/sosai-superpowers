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
