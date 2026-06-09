---
name: dispatching-parallel-agents
description: Provides a structured framework for running independent tasks simultaneously rather than sequentially. Use when facing 2 or more independent tasks that do not share state or depend on each other's results — user says "run these in parallel", "do X and Y at the same time", "work on both", or assigns multiple unrelated tasks at once.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
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

## Examples

**Example 1: Quarterly reporting across departments**
User: "Pull together the Q2 financial summary and the sales pipeline report at the same time."
Applied: The skill confirms the two reports draw from separate data sources and do not depend on each other's numbers, then dispatches both simultaneously.
Result: Both reports are delivered together, cutting turnaround time in half compared to running them sequentially.

**Example 2: Simultaneous vendor due diligence**
User: "Review the contracts from Vendor A and Vendor B — I need both done today."
Applied: The skill verifies neither review depends on the other's findings, defines separate inputs and outputs for each, and runs both in parallel.
Result: Two independent contract summaries are returned together, each flagging key risks without cross-contamination of findings.

**Example 3: Multi-market competitive research**
User: "Research how our top three competitors are pricing in the US, UK, and EU markets."
Applied: The skill treats each market as an independent research task with no shared state, dispatches three parallel agents, then synthesizes the results only after all three complete.
Result: A consolidated pricing comparison is produced faster than sequential research would allow, with each market's findings clearly attributed.

## Troubleshooting

**Tasks were dispatched in parallel but one needed the other's output.**
Stop and re-sequence. If Task B needs Task A's result as its input, they are dependent — run A first, then B with A's output. Parallel dispatch only applies when tasks are fully independent.

**One parallel task failed but results from the others were used anyway.**
Discard partial results and re-run the failed task before synthesizing. Using incomplete parallel output produces inconsistent or misleading conclusions.

**The independence test was skipped because tasks "seemed" unrelated.**
Always run the three-question independence test explicitly before dispatching. Tasks that appear unrelated can still write to the same resource or share an implicit dependency.

**Results were synthesized automatically without verifying all tasks completed.**
Confirm every parallel task returned a successful result before combining outputs. Synthesizing before all tasks finish can silently incorporate missing or errored data.

**A task with an ambiguous dependency was dispatched in parallel "to save time."**
When the answer to any independence question is "maybe," treat it as dependent and run in sequence. The time saved by parallel dispatch is not worth the cost of inconsistent results.
