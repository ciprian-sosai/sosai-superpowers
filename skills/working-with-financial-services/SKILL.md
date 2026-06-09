---
name: working-with-financial-services
description: Maps sosai-superpowers process skills to each stage of a financial workflow — clarifying, planning, verifying, and reviewing — in the correct sequence. Use when working with the Anthropic financial-services plugin to know which sosai-superpowers skills wrap each stage of a financial workflow and in what order.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
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

## Examples

**Example 1: IC Memo for a private equity deal**
User: "I need to build an IC memo for a new platform acquisition."
Applied: The skill sequences brainstorming and outcome-first-thinking before any financial-services stage runs, then wraps the completed memo with verification-before-completion and requesting-peer-review before the IC gate.
Result: The IC memo arrives at review complete, sourced, and structurally consistent — reviewers apply judgment rather than catching gaps.

**Example 2: Equity research initiation with compliance review**
User: "We're initiating coverage on a mid-cap industrials name. Where do I start?"
Applied: The skill routes through outcome-first-thinking, research-before-acting, and source-before-claiming before any model or note is drafted, then enforces the compliance review gate before finishing-a-task.
Result: Every statistic in the initiation report traces to a named source, and the workflow pauses at the correct compliance checkpoint.

**Example 3: Fund NAV tieout with reconciliation breaks**
User: "We have breaks in the NAV tieout and the controller needs it by end of day."
Applied: The skill routes to systematic-problem-solving before break-trace — blocking any immediate fix attempt — then enforces context-isolation between fund entities and verification-before-completion before the controller review gate.
Result: Root cause is identified before any correction is made, reducing the risk of masking the break rather than resolving it.

## Troubleshooting

**A financial-services skill was run before any sosai-superpowers skill was invoked.**
Stop and restart. Run brainstorming or outcome-first-thinking first. Skipping the front-end process skills produces outputs that lack a clear brief and are harder to verify downstream.

**The wrong process skill was used for the stage — for example, brainstorming was run before a reconciliation break instead of systematic-problem-solving.**
Check the "Which skill wraps which stage" table. Reconciliation failures and model errors map to systematic-problem-solving, not brainstorming. Each stage has a specific pairing for a reason.

**verification-before-completion was skipped before sending to a human review gate.**
Do not proceed. Run verification-before-completion now against the artifact before it reaches IC, compliance, or the client. This is the non-negotiable gate before every human review.

**source-before-claiming was not run on a CIM or client report that contains external statistics.**
Treat the output as undeliverable. Every externally distributed document with numbers or figures must pass source-before-claiming first. This is a compliance and legal exposure issue, not a quality preference.

**Context from the planning stage was not passed to the financial-services subagent in a parallel workflow.**
Re-run dispatching-parallel-agents and explicitly include the brief, assumptions, and plan in each subagent prompt. Parallel agents have no shared memory — each one needs the full context to stay aligned.

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
