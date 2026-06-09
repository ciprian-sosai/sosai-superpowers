# Integration Guide: sosai-superpowers + daloopa

sosai-superpowers governs **how** to work. daloopa governs **what** to do in equity research and financial analysis. They operate at different layers and compose cleanly — one wraps the other.

**The core pattern:**
```
sosai-superpowers  →  clarify investment question, plan deliverables
daloopa            →  pull data, build model, write deliverable
sosai-superpowers  →  audit assumptions, verify, review
```

daloopa connects to live financial data via MCP and produces equity research deliverables — DCF models, comps, tearsheets, earnings analyses, initiation reports, IB decks. sosai-superpowers is what ensures the investment question is clear before the first data pull, models are audited before being relied upon, and every output is verified before it reaches a reader.

---

## Quick Reference: Which sosai-superpowers skill wraps which equity research stage

| Stage | sosai-superpowers skill | Why |
|---|---|---|
| Starting any research or analysis task | `brainstorming` | Surface the investment question, audience, and scope before building anything |
| Before pulling data or building a model | `outcome-first-thinking` | Define what a correct result looks like — what decision does this analysis serve? |
| Before sector/company deep dive | `research-before-acting` | Understand the sector, competitive dynamics, and company context before producing analysis |
| Any output with market data, metrics, or estimates | `source-before-claiming` | Every figure in a research note or IB deck must trace to a source — compliance exposure |
| Multi-deliverable package (model + note + deck) | `writing-plans` | Structure the deliverables before building; catch scope problems before data is pulled |
| Multiple tickers in parallel (earnings season) | `dispatching-parallel-agents` | Run independent analyses simultaneously; each agent needs the full brief |
| Switching between companies or sectors in a session | `context-isolation` | DCF assumptions and comparable sets from Company A should not contaminate Company B |
| Model errors or data discrepancies | `systematic-problem-solving` | Find root cause before adjusting any model — divergence may be a finding, not an error |
| After any DCF, comps, or scenario model | `model-assumptions-audit` | Document and stress-test every key assumption before the model is used in a decision |
| Before claiming any deliverable done | `verification-before-completion` | Check against the original brief before the human review gate |
| Before PM, compliance, or client review | `requesting-peer-review` | Brief the reviewer on key judgment calls, not just hand over a file |
| After receiving review feedback | `receiving-peer-review` | Process all feedback systematically |

---

## When to use sosai-superpowers — and when to skip it

### The overlap question

daloopa skills ask clarifying questions at the start of each workflow. `earnings` asks about the ticker, period, and focus areas. `initiate` asks about the investment question and rating thesis. If sosai-superpowers also runs `brainstorming` or `outcome-first-thinking` first, there is some question overlap.

**The distinction:** daloopa questions ask *what* (which company, which metrics, which period). sosai-superpowers questions ask *why* and *for whom* (what decision does this serve, who is the audience, is this the right analysis for the question). They are different layers of the same conversation.

### Use sosai-superpowers when the task is ambiguous, high-stakes, or already failing

| Situation | Use sosai-superpowers | Why |
|---|---|---|
| Initiating coverage with an unclear investment thesis | `brainstorming` + `outcome-first-thinking` | Surface the investment question and what the report must answer before building |
| DCF model diverges significantly from comps | `systematic-problem-solving` | Diagnose whether it's a data error, assumption error, or a genuine finding before any edit |
| Research note with figures from multiple sources | `source-before-claiming` | Legal and compliance exposure — daloopa produces the content but does not enforce citation |
| Multi-deliverable package (model + note + deck) | `writing-plans` | Consistency across documents requires coordination — domain skills run independently |
| Earnings season coverage universe | `dispatching-parallel-agents` | Parallel execution with consistent methodology |
| Any DCF, LBO, or returns model going to PM or client | `model-assumptions-audit` | Assumption documentation and plausibility — this gap is not covered by daloopa |

### Skip sosai-superpowers when the task is routine and well-defined

| Situation | Just use the domain skill | Why |
|---|---|---|
| Quick company tearsheet before a meeting | `tearsheet` directly | Known input, known output, no scope ambiguity |
| Updating a model with new earnings data | `earnings` directly | Known inputs, mechanical refresh |
| Pulling a standard comps set for a known comparable universe | `comps` directly | Defined task, domain skill handles end to end |
| Checking current price and market cap for a ticker | `tearsheet` directly | Data retrieval, no judgment required |

---

## Model assumptions: the highest-value gap

daloopa builds models with live data and correct mechanics. The assumptions layer — terminal growth rate, WACC, margin trajectory, cyclicality adjustments — is where analyst judgment lives. `model-assumptions-audit` is the only skill that explicitly asks:

- Is the terminal growth rate supported by sector data or is it a default?
- Is the WACC consistent with the company's capital structure and the risk-free environment?
- What does the model break on — at what assumption does the thesis reverse?
- Are the key assumptions documented so the next reviewer can evaluate them?

Every DCF, comps-derived multiple, or scenario model that will inform a decision or be reviewed by another person should pass `model-assumptions-audit` before leaving the analyst.

---

## Earnings season workflow

When covering multiple tickers in the same earnings cycle, the volume of work requires parallel execution. The pattern:

```
dispatching-parallel-agents
→ agent per ticker: earnings-prep → earnings → earnings-flash → guidance-tracker
→ each agent: verification-before-completion
→ synthesis agent: source-before-claiming → research-note (if applicable)
```

Each parallel agent needs the full brief: investment question, audience, format, any company-specific context. They do not share session memory.

---

## Context isolation between companies

When switching from one company's analysis to another in the same session, DCF terminal growth assumptions, WACC components, comparable set definitions, and sector narrative from the first company can contaminate the second. Run `context-isolation` explicitly before starting a new company's analysis.

---

## Source discipline in research outputs

Research notes, IB decks, and client memos contain market data, estimates, and statistics. This is a compliance exposure. The discipline:

1. Every figure cites a source (daloopa data, Bloomberg, SEC filing, company guidance)
2. Every estimate is labeled as an estimate with the methodology noted
3. No figure appears without an anchor — not "revenue grew ~15%" but "revenue grew 15.2% (daloopa, Q3 2025 actual)"

`source-before-claiming` enforces this before any externally distributed document is finalized.

---

## High value

**Initiating coverage** — Long-horizon deliverable with thesis, model, and recommendation. `brainstorming` surfaces the investment question. `model-assumptions-audit` documents the model foundation. `source-before-claiming` enforces citation. `verification-before-completion` checks completeness before compliance review.

**Earnings season with a coverage universe** — Volume creates consistency risk. `dispatching-parallel-agents` with standardized brief per agent ensures methodology is consistent across tickers.

**IB pitch materials** — Client-facing documents with legal exposure. `source-before-claiming` and `verification-before-completion` before every legal/compliance review gate.

## Low value

**Quick data retrieval** — Tearsheet, earnings-flash, single-ticker quick look. No scope ambiguity, no multi-stage risk. Run daloopa directly.

**Model refresh with new data** — Known inputs, known outputs. `verification-before-completion` applies if the refreshed model will be shared; other process skills do not add value.
