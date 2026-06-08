---
name: systematic-problem-solving
description: Use when something isn't working, a result is unexpected, a process is failing, or an output is wrong — before proposing fixes
---

# Systematic Problem Solving

## Overview

Random fixes waste time and create new problems. Quick patches mask underlying issues.

**Core principle:** Find the root cause before proposing a fix. Jumping to solutions without understanding the problem produces fixes that don't stick.

**Violating the letter of this process is violating the spirit of problem solving.**

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

If you haven't completed Phase 1, you cannot propose solutions.

## When to Use

Use for ANY situation where something isn't working as expected:
- A process producing wrong or inconsistent results
- A deliverable that missed the mark
- A stakeholder relationship that broke down
- A workflow that keeps failing
- An analysis that doesn't add up
- Repeated mistakes despite corrections

**Use this ESPECIALLY when:**
- Under time pressure ("we need this fixed now")
- "One quick fix" seems obvious
- You've already tried several fixes
- Previous fixes didn't hold

## The Four Phases

Complete each phase before proceeding to the next.

### Phase 1: Root Cause Investigation

**Before attempting any fix:**

1. **State the problem precisely**
   - What is happening vs. what should be happening?
   - How often does it happen?
   - When did it start?
   - Was it ever working correctly?

2. **Gather evidence — look at actuals, not assumptions**
   - What does the actual output show?
   - What data exists about when/how/how often this occurs?
   - What have affected stakeholders actually said?

3. **Check what changed**
   - What is different from when it was working?
   - New process, new tool, new person, new data, new requirement?
   - Changes often reveal themselves as causes

4. **Trace the chain** — see `root-cause-analysis.md` for the full technique
   - Where in the chain does the problem first appear?
   - What produced that output?
   - Keep tracing back until you reach the original source

### Phase 2: Pattern Analysis

**Find the pattern before fixing:**

1. **Find working examples**
   - Where does this process work correctly?
   - What is different about those cases vs. the failing cases?

2. **List every difference, however small**
   - Don't assume something "can't matter"
   - Small differences often reveal the cause

3. **Identify assumptions**
   - What does the process assume that may not be true?
   - What dependencies exist that could have changed?

### Phase 3: Hypothesis and Testing

**Scientific method:**

1. **Form a single clear hypothesis**
   - "I think X is the root cause because Y"
   - Write it down — be specific

2. **Test minimally**
   - Make the smallest possible change to test the hypothesis
   - One variable at a time
   - Do not fix multiple things at once

3. **Verify before continuing**
   - Did it work? → Phase 4
   - Didn't work? → Form a new hypothesis, return to Phase 2
   - Do not add more fixes on top of a fix that didn't work

### Phase 4: Fix and Verify

1. **Fix the root cause — not the symptom**
   - Address what you found in Phase 1, not what was easy to change
   - One fix at a time

2. **Verify with the original problem statement**
   - Does the problem still occur?
   - Is the output now what it should be?

3. **If fix doesn't hold**
   - Count how many fixes you've tried
   - If 3+ fixes have failed: the problem is probably structural — see below

4. **If 3+ fixes failed: question the structure**
   - Each fix revealing a new problem in a different place = structural issue
   - Fixes requiring major rework = wrong approach
   - Stop and discuss with your human partner before attempting more fixes

## Red Flags — Stop Immediately

| Thought | Reality |
|---|---|
| "I know what's wrong" | You have a hypothesis. Test it first. |
| "Let me try a few things" | Multiple simultaneous changes can't be analyzed. One at a time. |
| "It seems to be working now" | Confirm with the original problem statement. |
| "Quick fix for now, investigate later" | Quick fixes become permanent fixes. Investigate now. |
| "I don't fully understand but this might work" | If you don't understand it, you can't fix it. |
| "One more fix attempt" (after 2+ failures) | 3+ failures = structural problem. Stop and reassess. |

## Companion Guides

- **`root-cause-analysis.md`** — technique for tracing a problem backward to its source
- **`problem-framing.md`** — how to state the problem clearly before investigating

## Quick Reference

| Phase | Key Activity | Done When |
|---|---|---|
| 1. Root Cause | Gather evidence, trace chain | You can explain what is happening and why |
| 2. Pattern | Find working examples, compare | You know what's different in failing cases |
| 3. Hypothesis | Form theory, test minimally | Theory confirmed or eliminated |
| 4. Fix | Fix root cause, verify | Original problem no longer occurs |
