---
name: working-with-operations
description: Maps sosai-superpowers process discipline skills to each stage of an operational workflow, specifying which skill to apply before, during, and after each stage. Use when working with the Anthropic operations plugin — to know which sosai-superpowers skills wrap each stage of an operational workflow and in what order.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Working with the operations plugin

## Overview

sosai-superpowers and the operations plugin operate at different layers. This skill tells you which process skills to apply before, during, and after each operational workflow stage.

**The pattern:**
```
sosai-superpowers  →  clarify + plan         (before the operational work)
operations         →  execute the workflow   (the operational work itself)
sosai-superpowers  →  verify + review        (before routing, approval, or distribution)
[APPROVAL / SIGN-OFF / DISTRIBUTION]
```

## Which skill wraps which stage

| When | sosai-superpowers skill |
|---|---|
| Starting any process improvement or optimization task | `systematic-problem-solving` |
| Before generating a risk register | `outcome-first-thinking` |
| Before submitting a change request | `verification-before-completion` |
| Any output distributed to leadership | `source-before-claiming` |
| Before writing an SOP or process doc | `writing-plans` |
| Before research or background gathering | `research-before-acting` |
| Multi-workstream operational initiative | `context-isolation` |
| Before peer or stakeholder sign-off | `requesting-peer-review` |
| After receiving review feedback | `receiving-peer-review` |

## Two workflow patterns

### Process Improvement Initiative
```
outcome-first-thinking → research-before-acting → systematic-problem-solving
→ process-optimization → writing-plans → [if independent sub-processes: context-isolation]
→ process-doc → verification-before-completion
→ requesting-peer-review → [PROCESS OWNER SIGN-OFF] → finishing-a-task
```

### Change Management
```
outcome-first-thinking → research-before-acting
→ risk-assessment → [outcome-first-thinking: confirm decision scope]
→ change-request → verification-before-completion
→ [ROUTE FOR APPROVAL] → requesting-peer-review → runbook
→ [APPROVED — EXECUTE] → finishing-a-task
```

## The three most critical pairings

**1. `systematic-problem-solving` before `process-optimization`**
Process optimization without root cause analysis produces solutions to the wrong problem. `process-optimization` designs the future state — it does not enforce "understand WHY before redesigning." Run `systematic-problem-solving` first to state the observed failure, map the causal chain, and identify the actual constraint. The future-state design should address the confirmed root cause, not the assumed one.

**2. `outcome-first-thinking` before `risk-assessment`**
A risk register with no decision context is comprehensive but un-actionable. Define the decision first — go/no-go on a vendor, approval for a change, board-level disclosure — before generating risk categories. The risk register is then scoped to support that decision: which categories matter, what risk tolerance applies, what "unacceptable" means in this context.

**3. `verification-before-completion` before `change-request` is submitted**
A change request is a commitment. Once routed, errors require recall, revision, and re-routing. Before submitting: confirm impact analysis covers all affected systems, rollback plan is specific and actionable, required approvals are identified, and the change window is confirmed. This check takes minutes; rework after routing takes days.

## Examples

**Example 1: Launching a process improvement initiative**
User: "We need to fix our procurement approval process — too many delays."
Applied: The skill directs the user to run `systematic-problem-solving` before opening `process-optimization`, then sequences `writing-plans` and `process-doc` through to `verification-before-completion`.
Result: The workflow surfaces the actual bottleneck before redesign begins, and the final SOP is verified before routing to the process owner for sign-off.

**Example 2: Submitting a change request for a vendor system migration**
User: "I need to submit a change request to migrate our ERP to the new vendor."
Applied: The skill flags that `verification-before-completion` must run before submission, prompting a check that impact analysis, rollback plan, and approval chain are all in order.
Result: Gaps in the rollback plan are caught before routing, avoiding a recall and re-routing cycle that would have taken days.

**Example 3: Preparing a risk register for a board-level go/no-go decision**
User: "Can you generate a risk register for the supply chain consolidation?"
Applied: The skill requires `outcome-first-thinking` first to name the specific decision — board-level go/no-go — before `risk-assessment` is opened, scoping the register to relevant categories and risk tolerance.
Result: The risk register is decision-scoped and actionable, not a generic comprehensive list that the board cannot act on.

## Troubleshooting

**Running `process-optimization` and then `systematic-problem-solving` in the wrong order**
The workflow table is sequential — do not reverse it. `process-optimization` designs a future state; it cannot identify root cause. Always run `systematic-problem-solving` first, then hand the confirmed root cause into `process-optimization`.

**Using `outcome-first-thinking` after the risk register is already generated**
Running `outcome-first-thinking` after `risk-assessment` is too late to scope the register. If the risk register is already complete, check whether it maps to a named decision. If not, discard and restart with `outcome-first-thinking` first.

**Skipping `verification-before-completion` because the change request "looks complete"**
The check is required regardless of perceived completeness. A change request that looks complete is the most likely place to skip the check — and the most likely place to find an unspecified rollback plan or missing approver.

**Passing no context to `process-doc` after `process-optimization` completes**
The output of `process-optimization` — future-state design, rationale, constraints — must be passed explicitly as context when opening `process-doc`. Without it, the SOP will not reflect the redesign decisions made upstream.

**Applying the Change Management pattern to a process improvement initiative, or vice versa**
The two workflow patterns are not interchangeable. Change Management is for a discrete change being routed for approval; Process Improvement is for redesigning how work is done. Confirm which pattern applies before starting.

## Red Flags

| Situation | Action |
|---|---|
| About to redesign a process without knowing why it fails | Stop — run `systematic-problem-solving` first |
| Generating a risk register without a named decision to support | Stop — run `outcome-first-thinking` first |
| About to route a change request for approval | Stop — run `verification-before-completion` first |
| Status report or vendor review going to leadership | Run `source-before-claiming` before distributing |
| Writing an SOP that might cover multiple independent sub-processes | Run `writing-plans` first to confirm scope |

## Full integration reference

See `docs/integration/operations.md` for complete workflow patterns, pairing rationale, and gap analysis.
