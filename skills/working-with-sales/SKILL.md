---
name: working-with-sales
description: Use when working with the Anthropic sales plugin — to know which sosai-superpowers skills wrap each stage of a sales workflow and in what order
---

# Working with the sales plugin

## Overview

sosai-superpowers and the sales plugin operate at different layers. This skill tells you which process skills to apply before, during, and after each sales workflow stage.

**The pattern:**
```
sosai-superpowers  →  clarify intent, define the outcome    (before the sales work)
sales              →  execute the workflow                  (the sales work itself)
sosai-superpowers  →  verify before it reaches the prospect (before delivery)
[SEND / PRESENT / DISTRIBUTE]
```

## Which skill wraps which stage

| When | sosai-superpowers skill |
|---|---|
| Before any research or intel-gathering task | `research-before-acting` |
| Before drafting any outreach or asset | `outcome-first-thinking` |
| Any competitive claim in a battlecard or asset | `source-before-claiming` |
| Multi-step prospecting or deal campaign | `writing-plans` |
| Deal is stalling or multiple failed attempts | `systematic-problem-solving` |
| Before any asset or outreach goes to the prospect | `verification-before-completion` |
| Before a strategic call with an executive | `requesting-peer-review` |
| After receiving feedback on outreach or assets | `receiving-peer-review` |

## Two workflow patterns

### New Prospect Outreach Sequence
```
outcome-first-thinking      → define the ONE action you want the prospect to take
research-before-acting      → frame the specific unknowns that matter for this deal
→ account-research          → gather targeted intel on those unknowns
→ [competitive-intelligence → source-before-claiming (if competitive context needed)]
→ draft-outreach            → write toward the defined outcome with specific intel
→ verification-before-completion → confirm ask is specific, claims are accurate
→ [SEND]
```

### Deal Review / Forecast Cycle
```
outcome-first-thinking      → define what decision this forecast needs to support
→ pipeline-review           → analyze deal health, risk flags, priority actions
→ [stalling deals: systematic-problem-solving before re-engaging]
→ forecast                  → generate weighted scenarios
→ source-before-claiming    → verify deal inputs are current and sourced
→ [create-an-asset → verification-before-completion (if assets need refreshing)]
→ requesting-peer-review    → brief on judgment calls before the pipeline call
→ [PIPELINE CALL / QBR / BOARD UPDATE]
```

## Three most critical pairings

**1. `research-before-acting` before `account-research`**
Without framing, `account-research` returns comprehensive but generic intel. `research-before-acting` forces the prior question: what specific gap in knowledge would actually change your approach? This transforms background-gathering into targeted investigation. One framing question asked before the research starts changes what comes back.

**2. `outcome-first-thinking` before `draft-outreach`**
AIDA without a defined outcome produces a vague Action step. `outcome-first-thinking` produces one concrete answer before any copy is written: the single action you want the prospect to take, and by when. Every sentence that follows is written toward that specific ask.

**3. `source-before-claiming` before any competitive claim leaves your hands**
Battlecards and sales assets contain competitive claims. Each unsourced claim is a legal and credibility risk. `source-before-claiming` checks that every claim traces to a specific, verifiable source before the asset reaches the prospect. Claims that cannot be sourced are removed or qualified.

## Red Flags

| Situation | Action |
|---|---|
| About to draft outreach without a defined goal | Stop — run `outcome-first-thinking` first |
| Running account-research without knowing what you're looking for | Stop — run `research-before-acting` first |
| Competitive claim in a battlecard or asset without a cited source | Stop — run `source-before-claiming` before the asset goes anywhere |
| Deal is stalling — considering a new outreach angle | Stop — run `systematic-problem-solving` to find the root cause before changing angle |
| External asset about to go to a prospect | Stop — run `verification-before-completion` first |
| About to present a forecast to leadership | Stop — run `source-before-claiming` to confirm deal inputs are current |

## Full integration reference

See `docs/integration/sales.md` for complete workflow patterns, pairing rationale, and gap analysis.
