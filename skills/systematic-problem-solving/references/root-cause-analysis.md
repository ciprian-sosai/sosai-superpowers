# Root Cause Analysis

A technique for tracing a problem backward to its source. Used in Phase 1 of systematic-problem-solving when you need to find where in a chain of steps the problem originates.

## When to Use

- The problem appears at the end of a multi-step process
- You can see the bad output but not where it went wrong
- Multiple steps could be the cause and you need to isolate which one

## The Technique: Trace Backward

Start from the bad output and ask "what produced this?" at each step — working backward until you reach a step where the input was correct but the output was wrong. That step is the source.

**Example chain:**
```
Data source → Analysis → Summary → Report → Stakeholder
                                     ↑
                              Report is wrong
```

Work backward:
1. Is the summary correct? → Yes ✓
2. Is the analysis correct? → No ✗ ← root cause is here

Once you find where it breaks, investigate that step specifically: what assumption failed? what input was wrong? what did the step produce that it shouldn't have?

## Structured Trace

For complex processes, document each step:

| Step | Expected output | Actual output | Status |
|---|---|---|---|
| Data source | Clean data | Clean data | ✓ |
| Analysis | Correct calculations | Incorrect totals | ✗ ← investigate here |
| Summary | — | — | not checked yet |

Stop as soon as you find the first ✗. That is where to investigate.

## "Five Whys" for Process Problems

For recurring process failures, ask "why?" five times to get past symptoms to root causes:

1. The report was wrong. Why?
2. Because the analysis used the wrong data range. Why?
3. Because the date filter was set incorrectly. Why?
4. Because there is no standard for which date range to use. Why?
5. Because we never documented the agreed convention.

**Root cause:** Missing documented convention — not the wrong date range (that's a symptom).

The fix: document the convention and add it to the process checklist.

## Common Root Cause Categories

| Category | Signs | Example |
|---|---|---|
| **Missing information** | Step had to assume or guess | Analyst didn't know the target audience |
| **Wrong input** | Upstream step produced bad data | Source data had duplicates |
| **Broken assumption** | Process assumed X was true, but it wasn't | Assumed stakeholders had read the brief |
| **Process gap** | No one owned this step | No one checked the numbers before sending |
| **Scope mismatch** | Task scope was different from what was delivered | Brief asked for summary, got full analysis |

## After Finding Root Cause

Once identified, fix at the source — not at the symptom.

- If the root cause is a missing document: create it
- If the root cause is a broken assumption: surface the assumption, confirm or correct it
- If the root cause is a process gap: assign an owner or add a checkpoint
- If the root cause is wrong input: fix the input, not the downstream steps
