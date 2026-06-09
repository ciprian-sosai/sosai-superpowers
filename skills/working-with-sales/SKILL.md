---
name: working-with-sales
description: Maps sosai-superpowers process skills to each stage of the sales plugin workflow — clarifying intent before research, verifying before delivery, and sourcing before any competitive claim leaves your hands. Use when working with the Anthropic sales plugin to know which sosai-superpowers skills wrap each stage of a sales workflow and in what order.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
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

## Examples

**Example 1: Preparing outreach to a stalled enterprise prospect**
User: "I need to re-engage a deal that went quiet after the second call."
Applied: The skill flags that re-engagement without root cause analysis is a common failure. It routes to `systematic-problem-solving` before `draft-outreach`, then `verification-before-completion` before sending.
Result: The rep surfaces why the deal stalled before writing a single word of outreach, and the message addresses the actual blocker.

**Example 2: Building a competitive battlecard**
User: "I want to create a battlecard comparing us to a competitor for the mid-market team."
Applied: The skill applies `outcome-first-thinking` to define what action the battlecard must drive, then wraps `competitive-intelligence` with `source-before-claiming` to vet every claim before the asset is distributed.
Result: The battlecard ships with sourced claims only — unverifiable assertions are removed or qualified before it reaches any rep or prospect.

**Example 3: Preparing a quarterly pipeline review for leadership**
User: "I need to prep the Q3 pipeline call with the CRO next week."
Applied: The skill routes through the Deal Review workflow: `outcome-first-thinking` to define the decision the forecast must support, `source-before-claiming` to confirm deal inputs are current, and `requesting-peer-review` before the call.
Result: The CRO review is grounded in verified deal data and the rep has rehearsed the judgment calls that will be challenged in the room.

## Troubleshooting

**Ran `account-research` and got generic background instead of targeted intel**
`research-before-acting` was skipped. Go back and answer the prior question: what specific knowledge gap would change your approach to this deal? Re-run `account-research` with that framing applied.

**`draft-outreach` produced a vague call-to-action**
`outcome-first-thinking` was not run first. Define the single action you want the prospect to take and by when, then rewrite the outreach toward that specific ask.

**Competitive claim flagged during `verification-before-completion` — asset is already with the team**
If the asset has not reached a prospect, pull it back and run `source-before-claiming`. If it has already been sent, log the unsourced claim and correct it before the next version ships.

**Used `systematic-problem-solving` but the deal is still stalling after re-engagement**
Check whether the root cause identified was a symptom rather than the actual blocker. Run `requesting-peer-review` with the problem framing before attempting another outreach angle.

**Skipped `requesting-peer-review` before a strategic executive call and got blindsided**
For future calls, run the skill and pass the specific judgment calls and risk areas — not just the account summary. The review is most useful when it surfaces what could go wrong, not just what is known.

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
