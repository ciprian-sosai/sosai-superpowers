---
name: context-isolation
description: Resets Claude's working context between tasks so prior assumptions, data, and framing do not carry over into the current task. Use when switching between tasks, starting a fresh task in an active session, or when context from a previous task might affect the current one — user says "let's move on to", "now let's do", "switching to", "forget about X", or starts a new topic mid-session.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
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

## Examples

**Example 1: Switching from budget review to vendor negotiation**
User: "OK, let's move on to the vendor contract renewal."
Applied: The skill flags that cost assumptions from the budget review do not automatically apply to the negotiation context, and prompts fetching current vendor terms fresh.
Result: The negotiation proceeds on actual contract terms, not on budget-session assumptions.

**Example 2: Shifting from a marketing campaign debrief to a new campaign brief**
User: "Now let's do the Q3 campaign plan."
Applied: The skill identifies that the Q2 debrief framing (what went wrong, cost overruns) does not carry into Q3 planning, and resets to a clean brief.
Result: Q3 planning starts from current goals and budget, not colored by Q2 retrospective constraints.

**Example 3: Mid-session pivot from a compliance check to a client proposal**
User: "Forget the compliance stuff — I need to draft the proposal for Acme."
Applied: The skill confirms none of the compliance review findings are relevant to the Acme proposal and proceeds as a fresh task.
Result: The proposal is drafted on its own merits without risk language or caveats imported from the compliance check.

## Troubleshooting

**Claude carries over a constraint from the previous task without flagging it**
Explicitly state "treat all prior context as invalid unless I confirm otherwise" at the start of the new task. Do not assume Claude will self-correct without a direct instruction.

**Claude asks whether context carries over on every single message, slowing the session**
Context isolation is a task-boundary check, not a per-message check. Invoke it once when the topic changes, then proceed normally.

**Claude re-verifies data that was confirmed valid in the same task**
Context isolation applies between tasks, not within a single task. If you are mid-task, do not re-trigger this skill — it will disrupt continuity.

**Claude treats a sub-topic as a full task switch and resets unnecessarily**
Clarify: a new task means a different goal or subject, not a new angle on the same goal. If you are still working toward the same outcome, there is no context boundary to reset.

**Prior session data (e.g., a spreadsheet or report) is discarded when it should carry over**
Before switching, explicitly state what carries over: "Keep the Q2 data — only reset the analysis framing." Context isolation drops assumptions, not artifacts you name as still relevant.
