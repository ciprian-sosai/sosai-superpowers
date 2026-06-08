---
name: working-with-financial-services
description: Use when working with the Anthropic financial-services plugin — to know which sosai-superpowers skills wrap each stage of a financial workflow and in what order
---

# Working with financial-services

## Overview

sosai-superpowers and financial-services operate at different layers and compose cleanly. This skill tells you which process skills to apply before, during, and after each financial workflow stage.

**The pattern:**
```
sosai-superpowers  →  clarify + plan         (before the financial work)
financial-services →  build the deliverable  (the financial work itself)
sosai-superpowers  →  verify + review        (before human review)
[HUMAN REVIEW GATE]
```

## Which skill wraps which stage

| When | sosai-superpowers skill |
|---|---|
| Starting any financial task | `brainstorming` |
| Before modeling or analysis | `outcome-first-thinking` |
| Before research-heavy work | `research-before-acting` |
| Any output with numbers, rates, or statistics | `source-before-claiming` |
| Multi-step financial workflow | `writing-plans` |
| Parallel deliverables (model + deck + memo) | `dispatching-parallel-agents` |
| Multi-entity / multi-fund / multi-period work | `context-isolation` |
| Reconciliation failures or model errors | `systematic-problem-solving` |
| Before claiming any financial output done | `verification-before-completion` |
| Before senior, compliance, or IC review | `requesting-peer-review` |
| After receiving review feedback | `receiving-peer-review` |

## Four workflow patterns

### IC Memo (Private Equity)
```
brainstorming → outcome-first-thinking → research-before-acting → writing-plans
→ dd-checklist → [parallel: unit-economics + returns-analysis + ai-readiness]
→ ic-memo → verification-before-completion → requesting-peer-review
→ [IC REVIEW] → receiving-peer-review → finishing-a-task
```

### Equity Research Initiation
```
outcome-first-thinking → research-before-acting → source-before-claiming
→ writing-plans → model-update → initiating-coverage
→ verification-before-completion → requesting-peer-review
→ [COMPLIANCE REVIEW] → receiving-peer-review → finishing-a-task
```

### Fund Close / NAV Tieout
```
outcome-first-thinking → systematic-problem-solving → context-isolation
→ executing-plans → roll-forward → gl-recon → nav-tieout
→ [breaks:] systematic-problem-solving → break-trace
→ variance-commentary → verification-before-completion
→ [CONTROLLER REVIEW] → finishing-a-task
```

### M&A Marketing Materials (IB)
```
outcome-first-thinking → brainstorming → source-before-claiming → writing-plans
→ [parallel: cim-builder + datapack-builder + teaser + buyer-list]
→ verification-before-completion → requesting-peer-review
→ [LEGAL / COMPLIANCE REVIEW] → receiving-peer-review → finishing-a-task
```

## The three most critical pairings

**1. `source-before-claiming` + any externally distributed output**
CIMs, research notes, client reports, investment proposals. Every number must trace to a source. This is compliance and legal exposure, not just quality.

**2. `systematic-problem-solving` before `break-trace` or `gl-recon`**
Reconciliation breaks require root cause investigation — not jumping to the first plausible explanation. Systematic-problem-solving enforces the four-phase process before any tool is touched.

**3. `verification-before-completion` before every human review gate**
financial-services stages outputs for human review. Verification makes the artifact complete and consistent before it gets there — so reviewers apply judgment, not proofreading.

## Where to add `model-assumptions-audit`

For any financial model (DCF, LBO, 3-statement, returns analysis), run `model-assumptions-audit` after the model is built and before verification:

```
writing-plans → [model skill] → model-assumptions-audit
→ verification-before-completion → [REVIEW GATE]
```

`model-assumptions-audit` checks numerical plausibility and documents where each key assumption came from. `verification-before-completion` checks structural completeness. They are complementary.

## Red Flags

| Situation | Action |
|---|---|
| About to run a financial skill with no brief | Stop — run `brainstorming` or `outcome-first-thinking` first |
| Financial output contains statistics or figures | Run `source-before-claiming` before delivering |
| Reconciliation break after previous fix attempt | Run `systematic-problem-solving` before trying another fix |
| About to deliver to IC, compliance, or client | Run `verification-before-completion` first |
| Working across multiple funds, periods, or entities | Run `context-isolation` explicitly between each |

## Full integration reference

See `docs/integration/financial-services.md` for complete workflow patterns, gap analysis, and pairing rationale.
