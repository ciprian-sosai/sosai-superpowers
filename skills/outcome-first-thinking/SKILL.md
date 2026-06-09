---
name: outcome-first-thinking
description: Defines acceptance criteria before any work begins, ensuring tasks have a clear, agreed-upon success definition. Use when starting any task with a deliverable — before writing, researching, analyzing, or producing output — to define what success looks like first.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
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

## Examples

**Example 1: Quarterly financial report**
User: "Put together the Q2 performance report for the board."
Applied: Before drafting, the skill surfaces three acceptance criteria: all business units covered, variances explained with root cause, and length under 10 pages.
Result: User confirms the criteria, and the report is checked against each one before delivery — no surprise rewrites.

**Example 2: Vendor selection recommendation**
User: "Help me evaluate these three logistics vendors and pick one."
Applied: The skill prompts the user to define done — a ranked recommendation with scoring rationale, cost comparison, and identified risks — before any analysis begins.
Result: The final memo matches what the stakeholder actually needed, avoiding a second round of work.

**Example 3: Marketing campaign brief**
User: "Draft a campaign brief for the product launch."
Applied: The skill establishes criteria upfront: brief covers audience, message, channels, budget, and timeline; all claims are supported; stakeholder sign-off fields are included.
Result: The brief goes to review complete, with no missing sections flagged.

## Troubleshooting

**Acceptance criteria are written but too vague to check (e.g., "report is good")**
Rewrite each criterion as a binary pass/fail test. "Covers all three business units" passes or fails. "Is good" does not. If you cannot check it, it is not a criterion.

**User skips confirmation and asks Claude to start immediately**
Pause. State the criteria you have inferred and ask for a quick yes before proceeding. One sentence is enough. Skipping this step is how criteria drift.

**Task changes mid-way and the original criteria no longer fit**
Stop, surface the change, and revise the criteria before continuing. Do not silently keep working against stale acceptance criteria.

**Criteria are written for the process, not the output (e.g., "research three sources")**
Process steps describe how you work, not what done looks like. Reframe each criterion around the output: "Question is answered with evidence from at least three sources."

**Skill invoked for an open-ended exploratory task with no clear deliverable**
Outcome-first thinking requires a definable end state. For genuinely open-ended exploration, acknowledge the constraint and define a scoped checkpoint instead — what would make this session useful?

## Red Flags

| Thought | Reality |
|---|---|
| "I know what good looks like" | Write it down. Unstated criteria drift. |
| "I'll know it when I see it" | That's not a criterion. Define it now. |
| "The task description is clear enough" | Task descriptions describe input, not output. |
