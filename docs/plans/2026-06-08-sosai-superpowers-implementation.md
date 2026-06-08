# sosai-superpowers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish the `sosai-superpowers` cowork plugin — a set of original discipline skills inspired by superpowers, installable via git clone.

**Architecture:** A `.claude-plugin` package containing a session-start hook and 16 SKILL.md files. Each skill enforces a discipline (clarify, plan, verify, isolate) adapted for generic cowork tasks. No code dependencies — pure markdown and bash.

**Tech Stack:** Markdown (SKILL.md files), Bash (hooks), JSON (plugin.json, hooks.json), Git

---

## File Map

| File | Purpose |
|---|---|
| `.claude-plugin/plugin.json` | Plugin metadata — name, author, license |
| `hooks/hooks.json` | Hook configuration — SessionStart trigger |
| `hooks/session-start` | Bash script — injects using-sosai-superpowers at session start |
| `hooks/run-hook.cmd` | Windows/Unix polyglot wrapper for hooks |
| `README.md` | Installation instructions, skill list, credits |
| `skills/using-sosai-superpowers/SKILL.md` | Meta-skill — check skills before any action |
| `skills/brainstorming/SKILL.md` | Clarify intent before acting |
| `skills/writing-plans/SKILL.md` | Plan before executing |
| `skills/executing-plans/SKILL.md` | Execute plans with checkpoints |
| `skills/outcome-first-thinking/SKILL.md` | Define success before starting |
| `skills/systematic-problem-solving/SKILL.md` | Root cause before jumping to fixes |
| `skills/subagent-driven-execution/SKILL.md` | Parallel task execution |
| `skills/writing-skills/SKILL.md` | Create new cowork skills |
| `skills/verification-before-completion/SKILL.md` | Verify before claiming done |
| `skills/finishing-a-task/SKILL.md` | Wrap up tasks properly |
| `skills/requesting-peer-review/SKILL.md` | Ask for review before delivering |
| `skills/receiving-peer-review/SKILL.md` | Handle feedback critically |
| `skills/dispatching-parallel-agents/SKILL.md` | Fan out independent work |
| `skills/context-isolation/SKILL.md` | Keep tasks scoped |
| `skills/source-before-claiming/SKILL.md` | Cite sources before stating facts |
| `skills/research-before-acting/SKILL.md` | Understand before producing output |

---

## Task 1: Plugin Scaffolding

**Files:**
- Create: `.claude-plugin/plugin.json`
- Create: `hooks/hooks.json`
- Create: `hooks/run-hook.cmd`
- Create: `hooks/session-start`

- [ ] **Step 1: Create `.claude-plugin/plugin.json`**

```json
{
  "name": "sosai-superpowers",
  "description": "Cowork discipline skills: clarify before acting, plan before executing, verify before delivering",
  "version": "1.0.0",
  "author": {
    "name": "Ciprian Sosai",
    "email": "ciprian@sosai.ro"
  },
  "homepage": "https://github.com/ciprian-sosai/sosai-superpowers",
  "repository": "https://github.com/ciprian-sosai/sosai-superpowers",
  "license": "MIT"
}
```

- [ ] **Step 2: Create `hooks/hooks.json`**

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|clear|compact",
        "hooks": [
          {
            "type": "command",
            "command": "\"${CLAUDE_PLUGIN_ROOT}/hooks/run-hook.cmd\" session-start",
            "async": false
          }
        ]
      }
    ]
  }
}
```

- [ ] **Step 3: Create `hooks/run-hook.cmd`**

```
: << 'CMDBLOCK'
@echo off
REM Cross-platform polyglot wrapper for hook scripts.
REM On Windows: cmd.exe runs the batch portion, which finds and calls bash.
REM On Unix: the shell interprets this as a script (: is a no-op in bash).

if "%~1"=="" (
    echo run-hook.cmd: missing script name >&2
    exit /b 1
)

set "HOOK_DIR=%~dp0"

if exist "C:\Program Files\Git\bin\bash.exe" (
    "C:\Program Files\Git\bin\bash.exe" "%HOOK_DIR%%~1" %2 %3 %4 %5 %6 %7 %8 %9
    exit /b %ERRORLEVEL%
)
if exist "C:\Program Files (x86)\Git\bin\bash.exe" (
    "C:\Program Files (x86)\Git\bin\bash.exe" "%HOOK_DIR%%~1" %2 %3 %4 %5 %6 %7 %8 %9
    exit /b %ERRORLEVEL%
)

where bash >nul 2>nul
if %ERRORLEVEL% equ 0 (
    bash "%HOOK_DIR%%~1" %2 %3 %4 %5 %6 %7 %8 %9
    exit /b %ERRORLEVEL%
)

exit /b 0
CMDBLOCK

# Unix: run the named script directly
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCRIPT_NAME="$1"
shift
exec bash "${SCRIPT_DIR}/${SCRIPT_NAME}" "$@"
```

- [ ] **Step 4: Create `hooks/session-start`**

```bash
#!/usr/bin/env bash
# SessionStart hook for sosai-superpowers plugin

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Read using-sosai-superpowers content
skill_content=$(cat "${PLUGIN_ROOT}/skills/using-sosai-superpowers/SKILL.md" 2>&1 || echo "Error reading using-sosai-superpowers skill")

escape_for_json() {
    local s="$1"
    s="${s//\\/\\\\}"
    s="${s//\"/\\\"}"
    s="${s//$'\n'/\\n}"
    s="${s//$'\r'/\\r}"
    s="${s//$'\t'/\\t}"
    printf '%s' "$s"
}

skill_escaped=$(escape_for_json "$skill_content")
session_context="<EXTREMELY_IMPORTANT>\nYou have sosai-superpowers.\n\n**Below is the full content of your 'sosai-superpowers:using-sosai-superpowers' skill - your introduction to using skills. For all other skills, use the 'Skill' tool:**\n\n${skill_escaped}\n</EXTREMELY_IMPORTANT>"

if [ -n "${CURSOR_PLUGIN_ROOT:-}" ]; then
  printf '{\n  "additional_context": "%s"\n}\n' "$session_context"
elif [ -n "${CLAUDE_PLUGIN_ROOT:-}" ] && [ -z "${COPILOT_CLI:-}" ]; then
  printf '{\n  "hookSpecificOutput": {\n    "hookEventName": "SessionStart",\n    "additionalContext": "%s"\n  }\n}\n' "$session_context"
else
  printf '{\n  "additionalContext": "%s"\n}\n' "$session_context"
fi

exit 0
```

- [ ] **Step 5: Commit**

```bash
git add .claude-plugin/ hooks/
git commit -m "feat: add plugin scaffolding (plugin.json, hooks)"
```

---

## Task 2: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md`**

```markdown
# sosai-superpowers

Discipline skills for Claude cowork — clarify before acting, plan before executing, verify before delivering.

Inspired by [superpowers](https://github.com/obra/superpowers) by Jesse Vincent. Original content written for the cowork context.

---

## Installation

```bash
git clone https://github.com/ciprian-sosai/sosai-superpowers ~/.claude/skills/sosai-superpowers
```

Restart Claude cowork. Skills are available immediately as `sosai-superpowers:<skill-name>`.

---

## Skills

| Skill | When to use |
|---|---|
| `using-sosai-superpowers` | Auto-loaded at session start |
| `brainstorming` | Before acting on any task — clarify intent first |
| `writing-plans` | Before executing — plan the work |
| `executing-plans` | When running a written plan |
| `outcome-first-thinking` | Before starting any task — define what success looks like |
| `systematic-problem-solving` | When something isn't working — find root cause |
| `subagent-driven-execution` | When tasks can run in parallel |
| `writing-skills` | When creating new cowork skills |
| `verification-before-completion` | Before claiming work is done |
| `finishing-a-task` | When wrapping up and delivering work |
| `requesting-peer-review` | Before delivering — ask for a review |
| `receiving-peer-review` | When handling review feedback |
| `dispatching-parallel-agents` | When fanning out independent research or tasks |
| `context-isolation` | When switching tasks — avoid context bleed |
| `source-before-claiming` | Before stating any fact — know your source |
| `research-before-acting` | Before producing output — understand the situation |

---

## Philosophy

These skills enforce one principle: **discipline before action**. Each skill is a lightweight guardrail that prevents the most common failure modes in cowork tasks — acting without clarity, delivering without verification, stating without sources.

---

## License

MIT © Ciprian Sosai <ciprian@sosai.ro>
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "feat: add README with installation and skill list"
```

---

## Task 3: Meta-skill — `using-sosai-superpowers`

**Files:**
- Create: `skills/using-sosai-superpowers/SKILL.md`

- [ ] **Step 1: Create `skills/using-sosai-superpowers/SKILL.md`**

```markdown
---
name: using-sosai-superpowers
description: Use when starting any cowork session — establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions
---

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.
</EXTREMELY-IMPORTANT>

# Using sosai-superpowers

## The Rule

**Invoke relevant skills BEFORE any response or action.** Even a 1% chance a skill might apply means invoke it first.

## How to Use Skills

Use the `Skill` tool with the skill name: `sosai-superpowers:<skill-name>`

## When to Invoke Which Skill

| Situation | Skill to invoke |
|---|---|
| Starting any task — even a "simple" one | `brainstorming` |
| About to execute multi-step work | `writing-plans` |
| Running a written plan | `executing-plans` |
| Starting any task with deliverable output | `outcome-first-thinking` |
| Something isn't working | `systematic-problem-solving` |
| Tasks can be done independently | `dispatching-parallel-agents` |
| About to claim work is complete | `verification-before-completion` |
| Wrapping up and delivering | `finishing-a-task` |
| About to deliver to a human | `requesting-peer-review` |
| Received feedback on your work | `receiving-peer-review` |
| Switching between tasks | `context-isolation` |
| About to state a fact | `source-before-claiming` |
| Starting research or analysis | `research-before-acting` |
| Creating a new skill | `writing-skills` |

## Red Flags — You Are Rationalizing

| Thought | Reality |
|---|---|
| "This is too simple for a skill" | Simple tasks have the most unexamined assumptions. Check. |
| "I need more context first" | Skill check comes BEFORE gathering context. |
| "I already know what to do" | Skills prevent the failure modes you don't see coming. |
| "This doesn't feel like a formal task" | Any action = check for skills. |
```

- [ ] **Step 2: Verify skill meets CSO rules**

Check:
- Description starts with "Use when..." ✓
- Description does NOT summarize the workflow ✓
- Under 150 words total ✓

- [ ] **Step 3: Commit**

```bash
git add skills/using-sosai-superpowers/
git commit -m "feat: add using-sosai-superpowers meta-skill"
```

---

## Task 4: `brainstorming`

**Files:**
- Create: `skills/brainstorming/SKILL.md`

- [ ] **Step 1: Create `skills/brainstorming/SKILL.md`**

```markdown
---
name: brainstorming
description: Use when starting any task — before researching, writing, planning, or acting — to clarify intent, constraints, and success criteria
---

# Brainstorming

## Overview

Clarify what you're actually building before you build it. Unexamined assumptions cause more wasted work than technical mistakes.

**Hard gate:** Do NOT produce any output, start any research, or take any action until you have presented a design and the user has approved it.

## Process

1. **Understand context** — review any relevant files, previous work, or background
2. **Ask clarifying questions** — one at a time, until you understand purpose, constraints, and success criteria
3. **Propose 2-3 approaches** — with trade-offs and your recommendation
4. **Present design** — get approval before proceeding
5. **Write a brief spec** — save to `docs/specs/YYYY-MM-DD-<topic>.md`

## Rules

- One question per message — never bundle multiple questions
- Prefer multiple choice over open-ended when possible
- YAGNI — remove anything not explicitly needed
- No implementation until design is approved

## Red Flags

| Thought | Reality |
|---|---|
| "This is too simple to need clarification" | Simple tasks hide the most assumptions. Ask. |
| "I can figure out what they want" | You cannot. Ask. |
| "Let me just start and adjust" | Starting wrong wastes more time than asking. |
```

- [ ] **Step 2: Commit**

```bash
git add skills/brainstorming/
git commit -m "feat: add brainstorming skill"
```

---

## Task 5: `outcome-first-thinking`

**Files:**
- Create: `skills/outcome-first-thinking/SKILL.md`

- [ ] **Step 1: Create `skills/outcome-first-thinking/SKILL.md`**

```markdown
---
name: outcome-first-thinking
description: Use when starting any task with a deliverable — before writing, researching, analyzing, or producing output — to define what success looks like first
---

# Outcome-First Thinking

## Overview

Define what done looks like before you start. Work that begins without a clear success definition always drifts.

**Core principle:** Write the acceptance criteria before you write the output. If you cannot describe what a correct result looks like, you are not ready to start.

## Process

- [ ] State the task in one sentence
- [ ] Write 2-3 acceptance criteria: "This is done when..."
- [ ] Identify what you would need to check to confirm it's done
- [ ] Get user confirmation before starting
- [ ] After completing work, check each criterion before claiming done

## Examples

**Report task:**
- Done when: covers all requested topics, sources are cited, length matches brief, no unsupported claims

**Research task:**
- Done when: question is answered directly, evidence is provided, confidence level is stated, gaps are acknowledged

**Plan task:**
- Done when: each step is actionable, owner is identified, timeline is realistic, risks are noted

## Red Flags

| Thought | Reality |
|---|---|
| "I know what good looks like" | Write it down. Unstated criteria drift. |
| "I'll know it when I see it" | That's not a criterion. Define it now. |
| "The task description is clear enough" | Task descriptions describe input, not output. |
```

- [ ] **Step 2: Commit**

```bash
git add skills/outcome-first-thinking/
git commit -m "feat: add outcome-first-thinking skill"
```

---

## Task 6: `writing-plans`

**Files:**
- Create: `skills/writing-plans/SKILL.md`

- [ ] **Step 1: Create `skills/writing-plans/SKILL.md`**

```markdown
---
name: writing-plans
description: Use when about to execute multi-step work — before starting any task with more than two steps — to create a written plan first
---

# Writing Plans

## Overview

Write the plan before you execute. Multi-step work without a written plan produces inconsistent results and makes it impossible to hand off or resume.

## Plan Structure

Save plans to `docs/plans/YYYY-MM-DD-<task-name>.md`.

Every plan must include:

```markdown
## Goal
One sentence: what does this produce?

## Success criteria
- This is done when...
- This is done when...

## Steps
- [ ] Step 1: [action] — [expected result]
- [ ] Step 2: [action] — [expected result]
...
```

## Rules

- Every step must be independently actionable
- Every step must have a stated expected result
- No placeholder steps ("handle edge cases", "add error handling")
- Steps should be 2-5 minutes each — split anything larger
- Commit after every meaningful step

## Self-Review Before Executing

- Can each step be done without reading the others?
- Does any step say what to do without saying how?
- Is every success criterion checkable?

Fix any issues before starting execution.
```

- [ ] **Step 2: Commit**

```bash
git add skills/writing-plans/
git commit -m "feat: add writing-plans skill"
```

---

## Task 7: `executing-plans`

**Files:**
- Create: `skills/executing-plans/SKILL.md`

- [ ] **Step 1: Create `skills/executing-plans/SKILL.md`**

```markdown
---
name: executing-plans
description: Use when running a written plan — to execute step by step with checkpoints, not all at once
---

# Executing Plans

## Overview

Execute one step at a time. Check the result. Move on only when the step is confirmed complete.

## Process

For each step in the plan:
- [ ] Read the step fully before starting
- [ ] Execute only that step — nothing else
- [ ] Verify the expected result was achieved
- [ ] Check the box
- [ ] Report to user before moving to next step (for significant steps)
- [ ] If step fails: stop, diagnose, do not skip ahead

## Checkpoints

Pause and report to the user after:
- Any step that produces a deliverable
- Any step that requires a decision
- Any step that fails or produces unexpected results
- Every 3-5 steps regardless

## What Not To Do

- Do not execute multiple steps at once to "save time"
- Do not skip a failed step and continue
- Do not silently substitute a different approach mid-plan
- Do not declare the plan done until every box is checked and success criteria are met
```

- [ ] **Step 2: Commit**

```bash
git add skills/executing-plans/
git commit -m "feat: add executing-plans skill"
```

---

## Task 8: `verification-before-completion`

**Files:**
- Create: `skills/verification-before-completion/SKILL.md`

- [ ] **Step 1: Create `skills/verification-before-completion/SKILL.md`**

```markdown
---
name: verification-before-completion
description: Use before claiming any work is done, complete, fixed, or ready — requires evidence before assertions
---

# Verification Before Completion

## Overview

Never claim work is done until you have checked it. "It should work" and "I believe it's correct" are not verification.

**Rule:** Evidence before assertions. Always.

## Verification Checklist

Before saying "done", "complete", "fixed", or "ready":

- [ ] Check each success criterion defined at the start of the task
- [ ] Confirm the actual output — not what you intended to produce
- [ ] Identify anything that was not explicitly verified
- [ ] State what you checked and what you did not check

## How to Report Completion

```
Done. Here's what I verified:
- [criterion 1]: checked by [method] — ✓
- [criterion 2]: checked by [method] — ✓

Not verified:
- [anything you could not check]
```

## Red Flags

| Phrase | Problem |
|---|---|
| "This should work" | Should ≠ does. Check it. |
| "I believe it's correct" | Belief ≠ evidence. Check it. |
| "It looks good" | Looking ≠ verifying. Check it. |
| "I tested it mentally" | Mental testing is not testing. Check it. |
```

- [ ] **Step 2: Commit**

```bash
git add skills/verification-before-completion/
git commit -m "feat: add verification-before-completion skill"
```

---

## Task 9: `systematic-problem-solving`

**Files:**
- Create: `skills/systematic-problem-solving/SKILL.md`

- [ ] **Step 1: Create `skills/systematic-problem-solving/SKILL.md`**

```markdown
---
name: systematic-problem-solving
description: Use when something isn't working, a result is unexpected, a process is failing, or an output is wrong — before proposing fixes
---

# Systematic Problem Solving

## Overview

Find the root cause before proposing a fix. Jumping to solutions without understanding the problem produces fixes that don't stick.

## Process

- [ ] **State the problem precisely** — what is happening vs. what should happen
- [ ] **Identify when it started** — was it ever working? what changed?
- [ ] **Gather evidence** — look at actual outputs, not assumptions
- [ ] **Form hypotheses** — list 2-3 possible causes, most likely first
- [ ] **Test one hypothesis at a time** — smallest possible test
- [ ] **Confirm root cause** — do not fix until you can explain why the problem occurs
- [ ] **Fix and verify** — check that the fix resolves the original problem statement

## Rules

- Never skip straight to a fix
- Never test multiple hypotheses simultaneously
- Never declare root cause found until you can reproduce the problem and explain it

## Red Flags

| Thought | Reality |
|---|---|
| "I know what's wrong" | You have a hypothesis. Test it. |
| "Let me try a few things" | Random changes create new problems. One hypothesis at a time. |
| "It seems to be working now" | Confirm with the original problem statement. |
```

- [ ] **Step 2: Commit**

```bash
git add skills/systematic-problem-solving/
git commit -m "feat: add systematic-problem-solving skill"
```

---

## Task 10: `finishing-a-task`

**Files:**
- Create: `skills/finishing-a-task/SKILL.md`

- [ ] **Step 1: Create `skills/finishing-a-task/SKILL.md`**

```markdown
---
name: finishing-a-task
description: Use when work is complete and ready to deliver — to wrap up, document, and hand off properly
---

# Finishing a Task

## Overview

Finishing is not the same as stopping. A properly finished task is documented, verified, and handed off so the next person (or future you) can pick it up without losing context.

## Finishing Checklist

- [ ] All success criteria checked (use `verification-before-completion`)
- [ ] Output is in its final form — not a draft unless agreed
- [ ] Key decisions made during the task are noted
- [ ] Any follow-up actions are listed and owned
- [ ] Relevant files or documents are saved in agreed location
- [ ] Summary written: what was done, what was decided, what's next

## Handoff Summary Template

```
## Task: [name]
**Completed:** [date]
**Output:** [what was produced and where it lives]
**Decisions made:** [key choices and reasoning]
**Follow-up actions:** [what still needs doing, who owns it]
```

## Red Flags

| Thought | Reality |
|---|---|
| "They'll figure it out from the output" | They won't. Write the summary. |
| "I'll document it later" | Later never comes. Document now. |
| "It's basically done" | Basically done is not done. Finish it. |
```

- [ ] **Step 2: Commit**

```bash
git add skills/finishing-a-task/
git commit -m "feat: add finishing-a-task skill"
```

---

## Task 11: `requesting-peer-review`

**Files:**
- Create: `skills/requesting-peer-review/SKILL.md`

- [ ] **Step 1: Create `skills/requesting-peer-review/SKILL.md`**

```markdown
---
name: requesting-peer-review
description: Use before delivering any significant output — to ask for a review in a way that produces useful feedback
---

# Requesting Peer Review

## Overview

A review request is only as good as the context you provide. Sending work with "let me know what you think" produces vague feedback. Sending it with specific questions produces actionable feedback.

## How to Request a Review

```
Reviewing: [what this is]
Goal: [what it was trying to achieve]
What I'd like feedback on: [specific questions]
What I'm not looking for: [scope limits if any]
Where it lives: [link or location]
```

## Self-Review First

Before requesting review, run your own check:
- [ ] Does this meet all success criteria?
- [ ] Is anything missing that you know should be there?
- [ ] Are there any parts you are unsure about? (Flag these explicitly)

Do not send work for review that you know is incomplete. Fix what you can first.

## What Makes a Good Review Request

- Specific questions ("Is the recommendation clear?") over vague asks ("Is this good?")
- Context about constraints ("I had limited data on X")
- Explicit flags on uncertain sections
```

- [ ] **Step 2: Commit**

```bash
git add skills/requesting-peer-review/
git commit -m "feat: add requesting-peer-review skill"
```

---

## Task 12: `receiving-peer-review`

**Files:**
- Create: `skills/receiving-peer-review/SKILL.md`

- [ ] **Step 1: Create `skills/receiving-peer-review/SKILL.md`**

```markdown
---
name: receiving-peer-review
description: Use when receiving feedback on work — before implementing suggestions — to evaluate feedback rigorously rather than accepting it uncritically
---

# Receiving Peer Review

## Overview

Not all feedback is correct. Accepting every suggestion without evaluation produces work that pleases the reviewer but may not serve the goal.

**Rule:** Understand before implementing. Question before accepting.

## For Each Piece of Feedback

- [ ] Do you understand what the reviewer is saying?
- [ ] Is the feedback based on the actual work or a misunderstanding?
- [ ] Does implementing it move the work closer to the stated goal?
- [ ] If you disagree: can you explain why clearly?

## Response Options

| Situation | Response |
|---|---|
| Feedback is valid and clear | Implement it |
| Feedback is valid but unclear | Ask for clarification before implementing |
| Feedback conflicts with requirements | Flag the conflict, ask how to resolve |
| Feedback is based on a misunderstanding | Explain the original intent |
| Feedback is a matter of preference | Note it, decide deliberately |

## What Not To Do

- Do not implement feedback you don't understand
- Do not reject feedback without being able to articulate why
- Do not agree just to avoid conflict
- Do not implement everything and hope it works out
```

- [ ] **Step 2: Commit**

```bash
git add skills/receiving-peer-review/
git commit -m "feat: add receiving-peer-review skill"
```

---

## Task 13: `subagent-driven-execution`

**Files:**
- Create: `skills/subagent-driven-execution/SKILL.md`

- [ ] **Step 1: Create `skills/subagent-driven-execution/SKILL.md`**

```markdown
---
name: subagent-driven-execution
description: Use when executing a plan with multiple independent tasks — to dispatch each task to a fresh subagent with review between tasks
---

# Subagent-Driven Execution

## Overview

Dispatch one subagent per task. Each subagent starts fresh — no accumulated context, no drift from earlier steps. Review each result before dispatching the next.

## Process

For each task in the plan:
- [ ] Dispatch a fresh subagent with: the task, all context it needs, expected output format
- [ ] Review the result before moving to the next task
- [ ] If result is wrong: diagnose before re-dispatching (do not just retry)
- [ ] If result is right: check it off, move to next task

## What to Include in a Subagent Prompt

```
Task: [exactly what to do]
Context: [everything needed — do not assume prior knowledge]
Output: [exactly what to produce and in what format]
Success when: [how to know the task is done correctly]
```

## Rules

- One task per subagent
- Never assume a subagent has context from a previous subagent
- Review before proceeding — do not batch-dispatch without checking
```

- [ ] **Step 2: Commit**

```bash
git add skills/subagent-driven-execution/
git commit -m "feat: add subagent-driven-execution skill"
```

---

## Task 14: `dispatching-parallel-agents`

**Files:**
- Create: `skills/dispatching-parallel-agents/SKILL.md`

- [ ] **Step 1: Create `skills/dispatching-parallel-agents/SKILL.md`**

```markdown
---
name: dispatching-parallel-agents
description: Use when facing 2 or more independent tasks that do not share state or depend on each other's results
---

# Dispatching Parallel Agents

## Overview

When tasks are truly independent, run them in parallel. When they are not, run them in sequence. Dispatching dependent tasks in parallel produces race conditions and inconsistent results.

## Independence Test

Before dispatching in parallel, confirm for each pair of tasks:
- Task A does not need Task B's output
- Task B does not need Task A's output
- They do not write to the same resource

If any answer is "maybe" — run in sequence.

## Dispatch Template

For each parallel task:
```
Task: [what to do]
Input: [exactly what this task receives]
Output: [exactly what this task produces]
Independent of: [confirm it does not depend on other parallel tasks]
```

## After Collection

- Verify all parallel tasks completed successfully before synthesizing
- If one failed: do not use partial results — diagnose and re-run
- Synthesize results explicitly — do not assume they fit together
```

- [ ] **Step 2: Commit**

```bash
git add skills/dispatching-parallel-agents/
git commit -m "feat: add dispatching-parallel-agents skill"
```

---

## Task 15: `writing-skills`

**Files:**
- Create: `skills/writing-skills/SKILL.md`

- [ ] **Step 1: Create `skills/writing-skills/SKILL.md`**

```markdown
---
name: writing-skills
description: Use when creating a new cowork skill or editing an existing one — to write skills that are discoverable, concise, and actually followed
---

# Writing Skills

## Overview

A skill is a reference guide for a proven discipline or technique. It tells future Claude instances what to do in a specific situation. Skills that are too long, too vague, or poorly described get skipped.

## Skill File Structure

Save to: `~/.claude/skills/<plugin-name>/skills/<skill-name>/SKILL.md`

```markdown
---
name: skill-name-with-hyphens
description: Use when [specific triggering conditions]
---

# Skill Name

## Overview
Core principle in 1-2 sentences.

## Process
Numbered or checklist steps.

## Red Flags
Table of rationalizations and counters.
```

## Description Rules (Critical)

- Start with "Use when..."
- Describe ONLY when to use it — never summarize what it does
- Under 500 characters
- Written in third person
- No workflow summary (agents will follow the description and skip the skill body)

## Token Budget

- Session-start skills: under 150 words
- All other skills: under 500 words
- Use tables and checklists over prose

## Quality Check Before Deploying

- [ ] Description starts with "Use when..." and contains no workflow summary
- [ ] All steps are actionable — no "handle appropriately" or "as needed"
- [ ] Red flags table covers the most common ways to rationalize skipping the skill
- [ ] Under word budget
```

- [ ] **Step 2: Commit**

```bash
git add skills/writing-skills/
git commit -m "feat: add writing-skills skill"
```

---

## Task 16: `context-isolation`

**Files:**
- Create: `skills/context-isolation/SKILL.md`

- [ ] **Step 1: Create `skills/context-isolation/SKILL.md`**

```markdown
---
name: context-isolation
description: Use when switching between tasks, starting a fresh task in an active session, or when context from a previous task might affect the current one
---

# Context Isolation

## Overview

Context from one task bleeds into the next. Assumptions formed during Task A contaminate Task B. Explicitly resetting context prevents this.

## When Switching Tasks

- [ ] State the new task explicitly — do not carry forward the frame of the previous task
- [ ] Identify any assumptions from the previous task that might not apply
- [ ] If the new task requires different data, fetch it fresh — do not rely on what's already loaded
- [ ] If you are unsure whether context is still valid: treat it as invalid and re-verify

## When Starting Fresh in an Active Session

- [ ] Confirm: does anything from earlier in this session apply to this task?
- [ ] If yes: state explicitly what carries over and why
- [ ] If no: proceed as if starting a new session

## Signs of Context Bleed

- Applying a constraint from a previous task to a new one without checking
- Reusing data or research without confirming it's still relevant
- Answering the previous task's question instead of the current one
```

- [ ] **Step 2: Commit**

```bash
git add skills/context-isolation/
git commit -m "feat: add context-isolation skill"
```

---

## Task 17: `source-before-claiming`

**Files:**
- Create: `skills/source-before-claiming/SKILL.md`

- [ ] **Step 1: Create `skills/source-before-claiming/SKILL.md`**

```markdown
---
name: source-before-claiming
description: Use before stating any fact, figure, date, name, or claim — to ensure every assertion has a known and statable source
---

# Source Before Claiming

## Overview

Every factual claim needs a source. Stating facts without sources produces plausible-sounding content that may be wrong. In business contexts, unsourced claims cause decisions to be made on false information.

**Rule:** If you cannot state where a fact comes from, do not state the fact.

## Before Making Any Factual Claim

- [ ] Where does this fact come from?
- [ ] Is that source reliable and current?
- [ ] Can you state the source explicitly?

If you cannot answer all three: do not make the claim. Instead:
- Say "I don't know" and offer to research
- Say "I believe X but cannot confirm the source — please verify"
- Ask the user to provide the source

## How to Cite

Inline: "According to [source], X is Y."
Footnote: State the fact, add "[Source: X]" immediately after.

## What Counts as a Source

✓ A document you have read in this session  
✓ A specific URL you have fetched  
✓ A file the user provided  
✗ General knowledge  
✗ "I recall reading..."  
✗ Plausible inference  
```

- [ ] **Step 2: Commit**

```bash
git add skills/source-before-claiming/
git commit -m "feat: add source-before-claiming skill"
```

---

## Task 18: `research-before-acting`

**Files:**
- Create: `skills/research-before-acting/SKILL.md`

- [ ] **Step 1: Create `skills/research-before-acting/SKILL.md`**

```markdown
---
name: research-before-acting
description: Use when starting any research, analysis, or information-gathering task — before producing output — to understand the situation fully first
---

# Research Before Acting

## Overview

Output produced without sufficient research is fast but wrong. The cost of research upfront is always less than the cost of correcting bad output.

## Before Producing Any Output

- [ ] What do you already know about this topic? (State it explicitly)
- [ ] What do you need to know that you don't know yet?
- [ ] What sources are available to you?
- [ ] What is the minimum research needed to answer confidently?

Research first. Output second.

## Research Checklist

- [ ] Primary sources consulted (not just summaries)
- [ ] Conflicting information identified and resolved
- [ ] Gaps in knowledge stated explicitly
- [ ] Confidence level assessed: high / medium / low

## Stating Confidence

Always include a confidence statement with significant output:
- **High:** All key claims sourced and cross-checked
- **Medium:** Main claims sourced; some details inferred
- **Low:** Limited sources; significant uncertainty — flag for verification

## Red Flags

| Thought | Reality |
|---|---|
| "I know enough to answer this" | State what you know, then check what you don't. |
| "Research will take too long" | Bad output takes longer to fix than research takes. |
| "I'll note the gaps at the end" | Research first, then write. Not the other way around. |
```

- [ ] **Step 2: Commit**

```bash
git add skills/research-before-acting/
git commit -m "feat: add research-before-acting skill"
```

---

## Task 19: Final Review and GitHub Push

**Files:** None new

- [ ] **Step 1: Verify all skills are present**

Run:
```bash
ls skills/
```
Expected output (16 directories):
```
brainstorming
context-isolation
dispatching-parallel-agents
executing-plans
finishing-a-task
outcome-first-thinking
receiving-peer-review
requesting-peer-review
research-before-acting
source-before-claiming
subagent-driven-execution
systematic-problem-solving
using-sosai-superpowers
verification-before-completion
writing-plans
writing-skills
```

- [ ] **Step 2: Verify plugin.json is valid JSON**

Run:
```bash
cat .claude-plugin/plugin.json | python -m json.tool
```
Expected: valid JSON printed with no errors

- [ ] **Step 3: Verify hooks.json is valid JSON**

Run:
```bash
cat hooks/hooks.json | python -m json.tool
```
Expected: valid JSON printed with no errors

- [ ] **Step 4: Create GitHub repository**

Go to https://github.com/ciprian-sosai and create a new repository named `sosai-superpowers` with:
- Description: "Discipline skills for Claude cowork — clarify before acting, plan before executing, verify before delivering"
- Public
- No README (we have one)
- License: MIT

- [ ] **Step 5: Push to GitHub**

```bash
git remote add origin https://github.com/ciprian-sosai/sosai-superpowers.git
git branch -M main
git push -u origin main
```

- [ ] **Step 6: Final commit if any loose files**

```bash
git status
# If anything unstaged:
git add .
git commit -m "chore: final cleanup"
git push
```

---

## Installation Verification

After pushing, verify the plugin installs correctly:

- [ ] Clone to a test location:
```bash
git clone https://github.com/ciprian-sosai/sosai-superpowers ~/.claude/skills/sosai-superpowers-test
```
- [ ] Restart Claude cowork
- [ ] Confirm `sosai-superpowers:brainstorming` is available in the Skill tool
- [ ] Remove test clone after verification:
```bash
rm -rf ~/.claude/skills/sosai-superpowers-test
```
