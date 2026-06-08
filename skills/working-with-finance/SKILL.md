---
name: working-with-finance
description: Use when working with the Anthropic finance plugin — to know which sosai-superpowers skills wrap each stage of an accounting workflow and in what order
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
