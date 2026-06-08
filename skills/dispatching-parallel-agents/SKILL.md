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
