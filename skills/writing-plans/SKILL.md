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

```
## Goal
One sentence: what does this produce?

## Success criteria
- This is done when...
- This is done when...

## Steps
- [ ] Step 1: [action] — [expected result]
- [ ] Step 2: [action] — [expected result]
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
