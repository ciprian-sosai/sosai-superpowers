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
