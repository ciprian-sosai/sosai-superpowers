---
name: working-with-daloopa
description: Maps sosai-superpowers process skills to each stage of an equity research or financial analysis workflow — clarifying the investment question, planning deliverables, verifying outputs, and auditing model assumptions — in the correct sequence. Use when working with the Anthropic daloopa plugin to know which sosai-superpowers skills wrap each stage of an equity research workflow and in what order.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Working with daloopa

## Overview

sosai-superpowers and daloopa operate at different layers and compose cleanly. daloopa pulls live MCP financial data and builds equity research deliverables. sosai-superpowers ensures the investment question is clear before the first data pull, the analysis stays scoped, and every output is verified before it reaches a reader.

**The pattern:**
```
sosai-superpowers  →  clarify investment question, plan deliverables  (before the analysis)
daloopa            →  pull data, build model, write deliverable        (the financial work)
sosai-superpowers  →  audit assumptions, verify, review                (before distribution)
[HUMAN REVIEW GATE]
```

## Which skill wraps which stage

| When | sosai-superpowers skill |
|---|---|
| Starting any research or analysis task | `brainstorming` |
| Before pulling data or building a model | `outcome-first-thinking` |
| Before sector/company deep dive | `research-before-acting` |
| Any output with market data, metrics, or estimates | `source-before-claiming` |
| Multi-deliverable package (model + note + deck) | `writing-plans` |
| Multiple tickers in parallel (earnings season) | `dispatching-parallel-agents` |
| Switching between companies or sectors in a session | `context-isolation` |
| Model errors or data discrepancies | `systematic-problem-solving` |
| After any DCF, comps, or scenario model | `model-assumptions-audit` |
| Before claiming any deliverable done | `verification-before-completion` |
| Before portfolio manager, compliance, or client review | `requesting-peer-review` |
| After receiving review feedback | `receiving-peer-review` |

## Four workflow patterns

### Earnings Analysis
```
outcome-first-thinking → research-before-acting → source-before-claiming
→ earnings-prep → earnings → earnings-flash
→ guidance-tracker → model-assumptions-audit
→ verification-before-completion → requesting-peer-review
→ [PM / COMPLIANCE REVIEW] → receiving-peer-review → finishing-a-task
```

### Initiating Coverage
```
brainstorming → outcome-first-thinking → research-before-acting
→ writing-plans → [parallel: comps + dcf + industry]
→ bull-bear → initiate → source-before-claiming
→ model-assumptions-audit → verification-before-completion
→ requesting-peer-review → [COMPLIANCE REVIEW] → receiving-peer-review → finishing-a-task
```

### DCF / Valuation Model
```
outcome-first-thinking → research-before-acting
→ dcf → comps → precedent-transactions
→ model-assumptions-audit → verification-before-completion
→ [REVIEW GATE] → finishing-a-task
```

### IB Deck / Pitch Materials
```
brainstorming → outcome-first-thinking → writing-plans
→ [parallel: tearsheet + comps + bull-bear]
→ ib-deck → source-before-claiming
→ verification-before-completion → requesting-peer-review
→ [LEGAL / COMPLIANCE REVIEW] → receiving-peer-review → finishing-a-task
```

## The three most critical pairings

**1. `model-assumptions-audit` after every DCF or comps model**
daloopa builds the model with live data; the assumptions still need to be documented, stress-tested, and plausibility-checked. `model-assumptions-audit` is the only skill in this stack that explicitly asks: is the terminal growth rate plausible, is the WACC supportable, what does the model break on?

**2. `source-before-claiming` before any externally distributed output**
Research notes, IB decks, and client memos contain market data, estimates, and statistics. Every figure must trace to a named source. This is compliance and legal exposure.

**3. `outcome-first-thinking` before pulling data**
Before running `dcf` or `initiate`, be clear on the investment question: what decision does this analysis serve, what does a correct result look like, who is the audience? These are not the same questions daloopa asks. daloopa asks *how* to build the model; sosai-superpowers asks *whether* this is the right model for the question.

## Earnings season: parallel execution

When covering multiple tickers in the same earnings cycle, use `dispatching-parallel-agents` with one agent per ticker. Each agent needs the full brief including investment question, audience, and any company-specific context — they do not share session memory.

```
dispatching-parallel-agents
→ [agent-1: earnings AAPL] [agent-2: earnings MSFT] [agent-3: earnings GOOGL]
→ each agent: earnings → guidance-tracker → verification-before-completion
→ synthesis agent: source-before-claiming → research-note
```

## Where to add `context-isolation`

When switching between companies or sectors in the same session, run `context-isolation` explicitly. DCF assumptions, comparable set definitions, and sector context from Company A should not contaminate Company B analysis.

## Examples

**Example 1: Initiating coverage on a mid-cap SaaS name**
User: "We're initiating coverage on a new SaaS name. Where do I start?"
Applied: brainstorming surfaces the investment question, investment horizon, and key risks before any skill runs. outcome-first-thinking defines what the report must answer. research-before-acting ensures sector context is in place before data pulls. model-assumptions-audit runs after the DCF model. source-before-claiming runs before distribution.
Result: The initiation report arrives at compliance review complete, sourced, and scoped to the investment question.

**Example 2: DCF model with questionable terminal growth assumption**
User: "The DCF shows a much higher price target than the comps. Is the model right?"
Applied: systematic-problem-solving is invoked before any model edits — to diagnose whether the divergence is a data error, assumption error, or a genuine finding. model-assumptions-audit then stress-tests the terminal growth rate explicitly.
Result: Root cause identified (terminal growth rate 200bps above peer median) before any modification.

**Example 3: Earnings flash during earnings season for 5 tickers**
User: "We need earnings-flash outputs for our entire coverage universe this afternoon."
Applied: dispatching-parallel-agents fans out one agent per ticker. Each agent runs earnings-prep → earnings → earnings-flash with source-before-claiming. verification-before-completion runs on each before delivery.
Result: Parallel execution with consistent methodology across the coverage universe.

## Troubleshooting

**A daloopa skill was run before the investment question was defined.**
Stop. Run outcome-first-thinking before continuing. Analyses built without a clear investment question tend to be unfocused and fail review because reviewers cannot tell what decision the analysis serves.

**Model assumptions were not documented after a DCF run.**
Run model-assumptions-audit now. Do not proceed to verification-before-completion without it. Every model that will be reviewed, shared, or used in a decision requires documented, plausibility-checked assumptions.

**Market data or estimates in a research note are not sourced.**
Run source-before-claiming before distributing. Every statistic, estimate, and market data point in a research note must trace to a named source. This is non-negotiable for compliance.

**Context from Company A's analysis is bleeding into Company B's model.**
Run context-isolation explicitly. Reset assumptions, comparable sets, and sector context before starting the new company's analysis.

## Red Flags

| Situation | Action |
|---|---|
| About to run `dcf` or `initiate` without a defined investment question | Stop — run `outcome-first-thinking` first |
| Research note or IB deck contains statistics not yet sourced | Run `source-before-claiming` before distributing |
| Model assumptions undocumented after DCF/comps run | Run `model-assumptions-audit` before review gate |
| About to deliver to PM, compliance, or client | Run `verification-before-completion` first |
| Switching from one company or sector to another | Run `context-isolation` before starting the next |
| Model output diverges unexpectedly from comps or prior work | Run `systematic-problem-solving` before any edit |

## Full integration reference

See `docs/integration/daloopa.md` for complete workflow patterns, gap analysis, and pairing rationale.
