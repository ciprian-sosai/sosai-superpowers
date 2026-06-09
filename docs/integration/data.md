# Integration Guide: sosai-superpowers + data

sosai-superpowers governs **how** to work. The data plugin governs **what** to do with data analysis. They operate at different layers and compose cleanly.

**The pattern:**
```
sosai-superpowers  →  clarify the question, define the decision being served
data               →  execute the analytical workflow
sosai-superpowers  →  verify before sharing, source every claim
```

---

## Quick Reference: Which sosai-superpowers skill wraps which data workflow

| Data workflow stage | sosai-superpowers skill | Why |
|---|---|---|
| Starting any non-trivial analysis | `outcome-first-thinking` | Define what decision this analysis supports before touching the data |
| Before choosing an analytical approach | `brainstorming` | Surface the actual business question before committing to a method |
| Before exploring an unfamiliar dataset | `research-before-acting` | Understand the data's origin, grain, and known quirks before profiling |
| Any insight distributed to stakeholders | `source-before-claiming` | Every finding must trace to a source and methodology, not to "the analysis" |
| Multi-step analytical workflow | `writing-plans` | Sequence the pipeline — explore → query → analyze → visualize — before executing |
| Query returns unexpected results | `systematic-problem-solving` | Root cause before fixing — understand why before changing the query |
| Multi-angle analysis of the same dataset | `dispatching-parallel-agents` | Run different analytical cuts in parallel rather than sequentially |
| Before distributing or presenting results | `verification-before-completion` | Confirm the brief was met, not just that the methodology is sound |
| Before sharing outputs with stakeholders | `requesting-peer-review` | Brief the reviewer on assumptions and judgment calls, not just the output |
| After receiving review feedback | `receiving-peer-review` | Process all feedback systematically |

---

## When to use sosai-superpowers — and when to skip it

### The redundancy question

The data plugin already guides analytical execution. `/analyze` walks through the question, methodology, and results. `/validate-data` checks accuracy and bias. If sosai-superpowers also runs `outcome-first-thinking` or `brainstorming`, you appear to answer overlapping questions twice. That is friction, not value.

**The distinction:** data plugin questions ask *what* (which method, which chart type, which SQL dialect). sosai-superpowers questions ask *whether* and *why* (is this the right question, does this analysis support the decision we actually need to make, have we sourced every claim). They are not the same question.

### The handoff question

In the same cowork session, context is shared — it is the conversation thread. If you run `outcome-first-thinking` and surface "this analysis is for a board investment decision, not an operations review," that framing is in context when `/analyze` runs. There is no formal handoff, but the information is there.

For subagents (if using `dispatching-parallel-agents`): subagents do not inherit session context. The decision framing and success criteria from `outcome-first-thinking` must be explicitly included in each subagent prompt — they do not transfer automatically.

### Use sosai-superpowers when the task is ambiguous, high-stakes, or already failing

| Situation | Use sosai-superpowers | Why |
|---|---|---|
| Analysis to support a strategic or financial decision | `outcome-first-thinking` | Define the decision before touching the data — prevents producing the right answer to the wrong question |
| Business question is not yet crisp | `brainstorming` | Surface what the question actually is before choosing a method |
| Insight going to executives or external stakeholders | `source-before-claiming` | Every claim must trace to a source; the data plugin produces the analysis but does not enforce citation |
| Query returns unexpected results | `systematic-problem-solving` | Understand why before fixing — wrong-looking results are often revealing |
| Multiple analytical cuts needed on the same dataset | `dispatching-parallel-agents` | Parallel agents are faster and prevent prior-cut context bleeding into later cuts |
| Before sharing results with stakeholders | `verification-before-completion` | Confirm the original brief was met, not just that the methodology is internally valid |
| Second or third attempt on an analysis that keeps failing | `systematic-problem-solving` | Multiple failed attempts signal a structural problem — wrong data, wrong grain, wrong question |

### Skip sosai-superpowers when the task is routine and well-defined

| Situation | Just use the domain skill | Why |
|---|---|---|
| Exploratory profiling of a new dataset | `/explore-data` directly | No stakes yet — just understanding what you have |
| Writing a known query for a familiar table | `/write-query` directly | Deterministic task, no ambiguity about the question |
| Pulling a standard, recurring dashboard | `/build-dashboard` directly | No new analytical question; execution only |
| Creating a visualization for a pre-answered question | `/create-viz` directly | The question is settled; you just need the chart |

### High value

**Outcome framing before `/analyze`** — The highest-value application of sosai-superpowers in data work. "What decision does this analysis support?" before touching data prevents the most common and expensive analytical failure: producing technically correct analysis for the wrong question. The data plugin cannot catch this — it will faithfully analyze whatever question you give it.

**`source-before-claiming` before distributing any insight** — Analysis distributed to stakeholders gets acted on. Claims that trace only to "the analysis" rather than to specific data sources and methodology create decisions built on untraceable foundations. The data plugin produces the insight; `source-before-claiming` ensures it is accountable.

**`systematic-problem-solving` when queries return unexpected results** — Unexpected output is information. The instinct is to fix the query. The better response is to ask why it returned what it did — the answer may reveal a data quality issue, a wrong assumption about the schema, or a finding that changes the question entirely. Fixing first discards that signal.

### Low value

**Exploratory profiling** — `/explore-data` is deliberate discovery with no analytical stakes yet. Adding `outcome-first-thinking` or `brainstorming` before pure exploration adds process overhead where the point is to not yet have a fixed objective.

**Routine query writing** — `/write-query` for a familiar schema and a clear question does not benefit from process framing. The question is known, the table is known, the output is deterministic.

**Standard dashboard pulls** — Rebuilding a recurring dashboard with no new analytical question attached. The domain skill handles it end to end.

---

## The three most important pairings

### 1. `outcome-first-thinking` before `/analyze`

This is the most important pairing in data work. `/analyze` is powerful at answering the question you give it. The failure mode is not a wrong answer — it is a right answer to the wrong question. "What revenue did we generate by segment?" is a legitimate question. "What revenue did we generate by segment, filtered to inform the pricing review meeting next week?" is a different question with a different answer and different implications.

`outcome-first-thinking` asks: what decision does this analysis support, who is the audience, what would make the analysis successful, and what would make it useless? Running it before `/analyze` changes which question gets asked, which cuts get prioritized, and which findings get surfaced.

The failure cost is high: an analysis run to the wrong brief requires a full redo, not a patch.

**The pattern:**
```
outcome-first-thinking  →  define the decision, audience, success criteria
brainstorming (optional)  →  surface the real business question if still fuzzy
analyze                 →  execute against the framed question
verification-before-completion  →  confirm the output meets the brief
```

### 2. `source-before-claiming` + `/analyze`

Every insight distributed to stakeholders must trace to a data source and methodology — not to "the analysis said." This is the accountability gap that the data plugin does not fill. `/analyze` produces correct, well-structured outputs. It does not ask: if someone acts on this finding and it turns out to be wrong, can we trace where the number came from?

`source-before-claiming` enforces citation discipline before distribution: which table, which query, which time range, which methodology, which exclusions. This matters most when the analysis will affect decisions — pricing, investment, headcount, product direction.

### 3. `systematic-problem-solving` when a query returns unexpected results

Unexpected query output is a decision point. The instinct is to fix the query. The right first response is to understand what the query actually returned and why.

Common causes of unexpected results that look like query errors but are not:
- A data quality issue that the query correctly surfaced
- A schema assumption that was wrong (grain is different than expected, NULLs mean something specific)
- A business logic edge case that reveals a real finding

Fixing the query before understanding the output can discard a legitimate signal as noise. `systematic-problem-solving` before any query fix: state precisely what was expected, state precisely what was returned, identify the gap, generate hypotheses, test the cheapest hypothesis first.

---

## End-to-End Workflow Patterns

### Pattern A: Decision-Driven Analysis

For analysis that will directly inform a business decision.

```
sosai-superpowers:outcome-first-thinking
  → Define: the decision being made, the audience, success criteria, what would make the analysis useless

sosai-superpowers:brainstorming (if business question is still fuzzy)
  → Surface: what question actually needs answering vs. what was first requested

sosai-superpowers:research-before-acting
  → Gather: known data sources, prior analyses on this question, known data quality issues

data:explore-data
  → Profile: shape, grain, nulls, anomalies, distribution

data:write-query
  → Generate: optimized SQL targeting the framed question

[If query returns unexpected results:]
sosai-superpowers:systematic-problem-solving
  → Investigate: what was expected, what was returned, why — before fixing
data:write-query
  → Re-run after understanding the gap

data:analyze
  → Execute: full analysis with validation, against the framed question

data:create-viz (if visualization needed)
  → Generate: publication-quality charts

sosai-superpowers:source-before-claiming
  → Verify: every claim traces to a source, table, query, and methodology

data:validate-data
  → QA: methodology accuracy and bias checks

sosai-superpowers:verification-before-completion
  → Confirm: the original brief was met (not just that methodology is sound)

sosai-superpowers:requesting-peer-review
  → Brief: reviewer on assumptions and judgment calls before distribution

[DISTRIBUTION TO STAKEHOLDERS]
```

---

### Pattern B: Multi-Angle Analysis with Parallel Agents

For complex analytical questions requiring multiple analytical cuts of the same dataset.

```
sosai-superpowers:outcome-first-thinking
  → Define: the decision, the cuts needed, which cuts can run independently

sosai-superpowers:writing-plans
  → Structure: which analyses are independent (parallelizable) vs. dependent (sequential)

sosai-superpowers:dispatching-parallel-agents
  → Spawn: one agent per independent analytical cut, each with full context
    (Each agent receives: decision framing, dataset description, its specific question)

[Each parallel agent runs:]
  data:explore-data → data:write-query → data:analyze → data:create-viz

[Synthesis:]
sosai-superpowers:source-before-claiming
  → Verify: all cut-level claims are sourced before combining into a single view

data:build-dashboard (if interactive output needed)
  → Combine: all cuts into a single filterable dashboard

sosai-superpowers:verification-before-completion
  → Confirm: all cuts answer the original question together

[DISTRIBUTION]
```

---

### Pattern C: Exploratory-to-Insight Pipeline

For situations where the analytical question is not yet known — starting from a dataset.

```
data:explore-data
  → Profile: shape, quality, patterns — without a fixed question

[After profiling, enough context exists to form a question:]

sosai-superpowers:outcome-first-thinking
  → Define: now that the data is understood, what decision could this inform?

sosai-superpowers:brainstorming
  → Surface: what patterns in the profile suggest high-value questions?

data:write-query
  → Target: the specific question that emerged from exploration

data:analyze → data:create-viz → data:validate-data

sosai-superpowers:source-before-claiming
  → Verify: claims trace to profile findings and query results, not to intuition

[DISTRIBUTION or further investigation]
```

---

## Gaps: What neither plugin covers

**1. Question validity enforcement**
Neither plugin has a mechanism for confirming that the business question being analyzed is the right question — i.e., that answering it will actually move the decision forward. `outcome-first-thinking` asks this at the process level, but neither plugin embeds it as a structured pre-flight that must be satisfied before analysis begins.

**2. Data lineage tracking across a session**
In a multi-step analysis pipeline (explore → query → analyze → visualize), the provenance of each output — which query produced it, which table it came from, which filters applied — is not formally tracked across steps. `source-before-claiming` enforces citation discipline at the end, but there is no mid-pipeline lineage log.

**3. Assumption documentation**
Analytical assumptions (excluded date ranges, imputed nulls, chosen aggregation grain) are made throughout data work and rarely surfaced explicitly. Neither plugin has a skill that maintains a running assumption log to be disclosed alongside findings.

---

## Installation

Install both plugins in your Claude cowork settings:

```
https://github.com/ciprian-sosai/sosai-superpowers
https://github.com/anthropics/knowledge-work-plugins/tree/main/data
```

---

*For the process-layer companion skill that guides this integration at runtime, see `sosai-superpowers:working-with-data`.*
