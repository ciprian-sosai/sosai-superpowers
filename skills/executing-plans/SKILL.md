---
name: executing-plans
description: Enforces step-by-step execution of a written plan with checkpoints and verification after each step. Use when running a written plan — to execute step by step with checkpoints, not all at once.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
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

## Examples

**Example 1: Vendor onboarding checklist**
User: "Run through the vendor onboarding plan I just shared."
Applied: The skill executes each onboarding step individually — sending the welcome email, setting up portal access, scheduling the kickoff call — pausing after each to confirm completion.
Result: Each step is checked off with confirmation before the next begins, and the user is notified when a step requires their decision or produces a deliverable.

**Example 2: Month-end financial close**
User: "Work through our month-end close plan."
Applied: The skill processes each close task in sequence — reconciling accounts, reviewing accruals, running variance checks — stopping immediately if a reconciliation fails rather than continuing to the next item.
Result: The user receives a status report at each checkpoint and a clear failure notice if any step does not produce the expected result.

**Example 3: Marketing campaign launch**
User: "Execute the campaign launch plan we finalized yesterday."
Applied: The skill works through each launch task one at a time — approving final copy, scheduling posts, activating paid spend — verifying each is complete before advancing.
Result: No step is skipped or bundled with another, and the user is briefed before any step that requires sign-off or involves a live action.

## Troubleshooting

**Claude bundles multiple steps together to move faster**
Interrupt and re-invoke the skill. Instruct Claude explicitly: one step at a time, full stop after each. Speed is not the goal — verified completion is.

**A step fails but Claude continues to the next one**
This breaks the core rule. Stop Claude, return to the failed step, diagnose the cause, and resolve it before any forward progress is allowed.

**Claude substitutes a different approach mid-plan without flagging it**
Treat this as a failure. Require Claude to surface any deviation before acting on it. Undisclosed substitutions void the checkpoint integrity of the plan.

**The plan has no clear success criteria for a step, so Claude guesses and moves on**
Pause at that step and define what "done" looks like before proceeding. Do not allow forward movement on a step with ambiguous completion criteria.

**User skips the checkpoint report to save time and loses track of where the plan stands**
Restore the last confirmed checkpoint, ask Claude to summarize completed steps, then resume from the next unverified step.
