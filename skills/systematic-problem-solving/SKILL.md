---
name: systematic-problem-solving
description: Guides structured root cause investigation before any fix is proposed, using a four-phase process of evidence gathering, pattern analysis, hypothesis testing, and verified resolution. Use when something isn't working, a result is unexpected, a process is failing, or an output is wrong — before proposing fixes.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
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

4. **Trace the chain** — see `references/root-cause-analysis.md` for the full technique
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

## Examples

**Example 1: Finance — recurring reporting discrepancy**
User: "Our monthly revenue report keeps showing different totals than the CRM. We've tried fixing it twice and it's still wrong."
Applied: The skill blocks further fix attempts and runs Phase 1 — pinpointing exactly where the numbers diverge in the chain from CRM to report.
Result: Root cause identified as a currency conversion step applied inconsistently; one targeted fix resolves the discrepancy.

**Example 2: Operations — vendor onboarding process keeps stalling**
User: "New vendor onboarding is taking 6 weeks instead of 2. We added a checklist last month but it didn't help."
Applied: Phase 2 pattern analysis compares vendors who onboarded on time vs. those who stalled, listing every difference in handling.
Result: The stalls trace to a single approver who is only available biweekly; the fix is a calendar change, not a process overhaul.

**Example 3: Marketing — email campaign underperforming despite previous fixes**
User: "Open rates dropped again even after we rewrote the subject lines. I don't know what else to try."
Applied: The skill flags 2 failed fixes and invokes the structural check from Phase 4, pausing further changes to reassess the full send strategy.
Result: Investigation reveals the send-time setting was never corrected after a timezone migration — the root cause was never subject lines.

## Troubleshooting

**Phase 1 skipped because the fix seemed obvious**
Restate the problem precisely using the Phase 1 questions before touching anything. An obvious fix is a hypothesis, not a conclusion — treat it as one.

**Multiple things changed at once to "cover all bases"**
Undo all changes and reintroduce them one at a time. Simultaneous changes make it impossible to identify what actually worked or caused a new problem.

**Hypothesis confirmed in testing but the fix didn't hold in practice**
The test was likely too narrow. Return to Phase 2 and check whether the working test case matches the real conditions that caused the original failure.

**3+ fixes have been tried but the skill hasn't triggered the structural check**
Manually invoke Phase 4's structural check now. Count fixes attempted, look for each fix uncovering a new problem in a different place — that pattern signals a design issue, not an execution issue.

**Phase 1 evidence is assumptions, not actuals**
Discard assumed evidence and collect only what is directly observable — actual outputs, timestamps, stated stakeholder feedback. Assumptions in Phase 1 produce wrong hypotheses in Phase 3.

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

- **`references/root-cause-analysis.md`** — technique for tracing a problem backward to its source
- **`references/problem-framing.md`** — how to state the problem clearly before investigating

## Quick Reference

| Phase | Key Activity | Done When |
|---|---|---|
| 1. Root Cause | Gather evidence, trace chain | You can explain what is happening and why |
| 2. Pattern | Find working examples, compare | You know what's different in failing cases |
| 3. Hypothesis | Form theory, test minimally | Theory confirmed or eliminated |
| 4. Fix | Fix root cause, verify | Original problem no longer occurs |
