---
name: writing-plans
description: Creates a structured, executor-ready written plan before multi-step work begins. Use when about to execute any task with more than two steps — before starting work, not after.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Writing Plans

## Overview

Write the plan before executing. Multi-step work without a written plan produces inconsistent results, makes handoffs impossible, and hides scope problems until it's too late to fix them.

**Assume the executor has zero context about the task.** Document everything they need: what to produce, how to verify it's correct, what success looks like. Give them bite-sized steps with no gaps.

**Save plans to:** `docs/plans/YYYY-MM-DD-<task-name>.md`

## Scope Check

Before writing tasks, check whether this plan covers multiple independent workstreams. If it does, break it into separate plans — one per workstream. Each plan should produce a usable, verifiable deliverable on its own.

**Signs you need to split:**
- Two groups of tasks don't share outputs
- One workstream could be handed off without the other
- The plan's goal sentence contains "and" connecting two different things

## Plan Document Header

Every plan must start with this header:

```markdown
# [Task Name] Plan

> **For executors:** Use sosai-superpowers:subagent-driven-execution (recommended) or sosai-superpowers:executing-plans to run this plan step-by-step.

**Goal:** [One sentence: what does this produce?]

**Approach:** [2-3 sentences: how will this be done?]

**Inputs:** [What you need before starting]

---
```

## Task Structure

Each task in the plan follows this pattern:

````markdown
### Task N: [Task Name]

**Produces:**
- [Deliverable 1]: `exact/path/or/description`
- [Deliverable 2]: `exact/path/or/description`

**Success when:**
- [Checkable criterion 1]
- [Checkable criterion 2]

- [ ] **Step 1: [Action verb + what]**

  [Exactly what to do, in enough detail that someone unfamiliar with the task can do it]

  Expected result: [What you will see when this step is done correctly]

- [ ] **Step 2: [Action verb + what]**

  [Details]

  Expected result: [What you will see]

- [ ] **Step N: Save and confirm**

  Save output to `[path]`. Verify it meets the success criteria above.
````

## Step Granularity

**Each step is one action (2-5 minutes):**
- "Draft the executive summary section" — one step
- "Review summary against the brief" — separate step
- "Get approval from stakeholder" — separate step

If a step takes more than 5 minutes, split it.

## No Placeholders

Every step must contain the actual content an executor needs. These are **plan failures** — never write them:
- "TBD", "TODO", "fill in later"
- "Handle edge cases appropriately"
- "Add the relevant details"
- "Similar to Task N" — repeat the details, the executor may be reading tasks out of order
- Steps that say what to do without saying how
- Success criteria that can't be checked ("make it good", "ensure quality")

## Self-Review

After writing the full plan, check it against the spec or brief before handing it off.

**1. Coverage check:** For each requirement in the spec, can you point to a task that delivers it? List any gaps.

**2. Placeholder scan:** Search for any of the failure patterns above. Fix them.

**3. Consistency check:** Does Task 5 reference output from Task 3 by the exact name Task 3 produces it? Mismatched names are execution errors waiting to happen.

**4. Success criteria check:** Is every "success when" criterion independently verifiable by the executor without asking you?

Fix issues inline. If you find a requirement with no task, add the task.

## Execution Handoff

After saving the plan, offer:

> "Plan saved to `docs/plans/[filename].md`. Two ways to execute:
>
> **1. Subagent-Driven (recommended)** — fresh subagent per task, two-stage review between tasks
> **2. Inline** — execute in this session with checkpoints
>
> Which approach?"

**If subagent-driven:** Use `sosai-superpowers:subagent-driven-execution`
**If inline:** Use `sosai-superpowers:executing-plans`

## Examples

**Example 1: Marketing campaign launch**
User: "We need to launch a Q3 email campaign for our enterprise segment — can you help me get this done?"
Applied: Before drafting any content, the skill creates a plan covering audience segmentation, copy drafting, approval, and send sequence as separate tasks with success criteria.
Result: A saved plan at `docs/plans/2026-06-09-q3-enterprise-email-campaign.md` ready for execution or handoff to a subagent.

**Example 2: Quarterly financial close**
User: "Walk me through closing the books for Q2 — there's a lot of moving parts."
Applied: The skill checks for independent workstreams (AP reconciliation vs. revenue recognition) and splits them into two plans, each with numbered steps and verifiable success criteria.
Result: Two separate plan files, each producible and verifiable independently, with clear executor instructions at every step.

**Example 3: Vendor contract review and onboarding**
User: "We just signed with a new logistics vendor — let's get them set up and the contract filed."
Applied: The skill flags that contract filing and vendor onboarding are independent workstreams and prompts a split, then writes each plan with specific owners, file paths, and confirmation steps.
Result: Two focused plans that can be handed off to different team members without coordination gaps.

## Troubleshooting

**Plan written but steps say what to do, not how**
Each step must include enough detail that an unfamiliar executor can act without asking questions. Go back and replace every instruction-without-method with a concrete how.

**Success criteria written but not independently checkable**
Phrases like "ensure quality" or "looks good" are not criteria. Rewrite each one as a specific condition the executor can confirm — a number, a file existing, a named person approving.

**Plan covers two unrelated deliverables in one document**
If two groups of tasks share no outputs and one could be handed off without the other, they are separate plans. Split them now; do not combine for convenience.

**Step references output from an earlier task by the wrong name**
Task-to-task handoffs break when names don't match exactly. Do a consistency pass: every reference to a prior deliverable must use the exact name and path that task produces it under.

**Plan saved but execution skill not offered**
After saving, always offer the subagent-driven vs. inline choice. Skipping this leaves the executor without a clear next action and the plan may never run.

## Red Flags

| Thought | Reality |
|---|---|
| "The steps are obvious, I don't need to write them out" | If they're obvious to you now, they won't be at 11pm or to the next executor. Write them. |
| "I'll fill in the details as I go" | Placeholders in plans become decisions under pressure. Make decisions now. |
| "This is too simple for a plan" | Simple tasks become complex when you're halfway through. Write the plan. |
| "I know what success looks like" | If it's not written, the executor doesn't. Write the success criteria. |
