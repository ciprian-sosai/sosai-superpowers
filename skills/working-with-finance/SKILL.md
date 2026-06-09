---
name: working-with-finance
description: Maps sosai-superpowers process skills to each stage of an accounting workflow, specifying which skill to apply before, during, and after close, audit, and analysis work. Use when working with the Anthropic finance plugin — to know which sosai-superpowers skills wrap each stage of an accounting workflow and in what order.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Working with the finance plugin

## Overview

sosai-superpowers and the finance plugin operate at different layers. This skill tells you which process skills to apply before, during, and after each accounting workflow stage.

**The pattern:**
```
sosai-superpowers  →  clarify + plan         (before the accounting work)
finance            →  execute the workflow   (the accounting work itself)
sosai-superpowers  →  verify + review        (before posting or distribution)
[SIGN-OFF / POSTING / DISTRIBUTION]
```

## Which skill wraps which stage

| When | sosai-superpowers skill |
|---|---|
| Starting any close, audit, or analysis task | `outcome-first-thinking` |
| Before gathering background or prior-period data | `research-before-acting` |
| Any output going to management or auditors | `source-before-claiming` |
| Multi-step close workflow | `writing-plans` |
| Multi-entity or multi-period work | `context-isolation` |
| Reconciliation break or unexplained variance | `systematic-problem-solving` |
| Before posting any journal entry | `verification-before-completion` |
| Before controller or auditor sign-off | `requesting-peer-review` |
| After receiving review feedback | `receiving-peer-review` |

## Three workflow patterns

### Month-End Close
```
outcome-first-thinking → writing-plans → context-isolation
→ close-management → journal-entry-prep → journal-entry
→ verification-before-completion (per entry type)
→ reconciliation → [breaks: systematic-problem-solving]
→ financial-statements → variance-analysis → source-before-claiming
→ requesting-peer-review → [CONTROLLER SIGN-OFF] → finishing-a-task
```

### Variance Analysis for Management Reporting
```
outcome-first-thinking → research-before-acting
→ variance-analysis → source-before-claiming
→ verification-before-completion → requesting-peer-review
→ [MANAGEMENT DISTRIBUTION]
```

### SOX 404 Testing
```
outcome-first-thinking → writing-plans
→ audit-support → sox-testing [per control area]
→ [deficiency found: systematic-problem-solving]
→ verification-before-completion (per control area)
→ requesting-peer-review → [AUDITOR SUBMISSION]
```

## The three most critical pairings

**1. `systematic-problem-solving` before `reconciliation` breaks**
A GL break is a structured problem. The wrong response is to start adjusting. Root cause investigation first — is this a timing difference, an unrecorded transaction, or an error? Only then adjust. The `reconciliation` skill's 3-tier classification (timing / adjustment required / investigation) maps directly to systematic-problem-solving phases.

**2. `source-before-claiming` before `variance-analysis` distribution**
Every driver in a variance bridge must trace to a specific source — a GL line item, a headcount report, a rate table. Attribution errors in management reporting affect decisions. Verify sources before the commentary leaves the team.

**3. `verification-before-completion` as the pre-posting gate**
Before any journal entry posts: confirm correct period, account codes, department coding, reversal flag, and that the approval level matches the transaction amount. A posting error requires a correcting entry and leaves an audit trail question.

## Examples

**Example 1: Month-end close with a reconciliation break**
User: "I'm doing the month-end close and I have a GL break I can't explain."
Applied: The skill identifies `systematic-problem-solving` as the required wrap before any adjustment attempt, and maps the reconciliation break to root-cause investigation phases.
Result: The controller gets a classified break (timing difference vs. unrecorded transaction) with documented rationale before any correcting entry is proposed.

**Example 2: Variance commentary going to the CFO**
User: "I need to send the budget vs. actual variance bridge to the CFO by end of day."
Applied: The skill flags `source-before-claiming` as mandatory before distribution, requiring every driver in the bridge to trace to a GL line, headcount report, or rate table.
Result: The commentary is distributed with each variance driver verified against a named source, reducing the risk of attribution errors in management reporting.

**Example 3: SOX 404 testing with a control deficiency**
User: "We found a gap during SOX testing — approvals weren't documented for three transactions."
Applied: The skill routes to `systematic-problem-solving` to classify whether the deficiency is a design failure or an operating effectiveness failure before escalation.
Result: The auditor submission includes a properly classified deficiency with evidence of root-cause analysis, not just a list of exceptions.

## Troubleshooting

**Wrong process skill selected for the stage — e.g., jumping to `verification-before-completion` before the reconciliation is complete.**
Check the workflow pattern table. Verification is a pre-posting gate, not a mid-reconciliation check. If the reconciliation has open breaks, run `systematic-problem-solving` first.

**`source-before-claiming` skipped because the variance commentary "looks right."**
Appearance is not verification. Every driver must trace to a named source. Skipping this step is the most common cause of management reporting corrections.

**`context-isolation` not applied between entities in a multi-entity close.**
Each entity's close should be treated as a separate context. Mixing entity data mid-workflow is a common source of intercompany elimination errors. Rerun the affected entity segment in isolation.

**sosai-superpowers skill invoked but finance plugin workflow not started — process runs but no accounting output produced.**
The integration is sequential: sosai-superpowers wraps the finance plugin, it does not replace it. After the planning or verification skill completes, explicitly invoke the relevant finance skill (e.g., `journal-entry`, `reconciliation`).

**`requesting-peer-review` sent before `verification-before-completion` on a journal entry.**
Peer review is not a substitute for the pre-posting gate. Reverse the order: verification first, then review request. Posting errors require correcting entries and create audit trail questions.

## Red Flags

| Situation | Action |
|---|---|
| About to post a journal entry | Stop — run `verification-before-completion` first |
| Reconciliation break after a fix attempt | Stop — run `systematic-problem-solving` before trying another adjustment |
| Variance commentary going to management | Run `source-before-claiming` before distributing |
| Multi-entity close work | Run `context-isolation` explicitly between entities |
| SOX deficiency found | Run `systematic-problem-solving` to classify design vs. operating effectiveness failure |

## Full integration reference

See `docs/integration/finance.md` for complete workflow patterns, pairing rationale, and gap analysis.
