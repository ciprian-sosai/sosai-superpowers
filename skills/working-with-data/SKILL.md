---
name: working-with-data
description: Use when working with the Anthropic data plugin — to know which sosai-superpowers skills wrap each stage of a data analysis workflow and in what order
---

# Working with the data plugin

## Overview

sosai-superpowers and the data plugin operate at different layers. This skill tells you which process skills to apply before, during, and after each analytical workflow stage.

**The pattern:**
```
sosai-superpowers  →  clarify the question, define the decision being served   (before the analysis)
data               →  execute the analytical workflow                           (the analysis itself)
sosai-superpowers  →  source every claim, verify the brief was met              (before distribution)
[DISTRIBUTION / DECISION]
```

## Which skill wraps which stage

| When | sosai-superpowers skill |
|---|---|
| Starting any non-trivial analysis | `outcome-first-thinking` |
| Business question is not yet crisp | `brainstorming` |
| Before exploring an unfamiliar dataset | `research-before-acting` |
| Query returns unexpected results | `systematic-problem-solving` |
| Multiple independent analytical cuts needed | `dispatching-parallel-agents` |
| Any insight going to stakeholders | `source-before-claiming` |
| Before distributing results | `verification-before-completion` |
| Before stakeholder presentation | `requesting-peer-review` |
| After receiving review feedback | `receiving-peer-review` |

## Three workflow patterns

### Decision-Driven Analysis
```
outcome-first-thinking → brainstorming (if question is fuzzy) → research-before-acting
→ explore-data → write-query → [unexpected results: systematic-problem-solving]
→ analyze → create-viz → source-before-claiming → validate-data
→ verification-before-completion → requesting-peer-review
→ [DISTRIBUTION]
```

### Multi-Angle Analysis with Parallel Agents
```
outcome-first-thinking → writing-plans
→ dispatching-parallel-agents (one per independent cut, each with full decision framing)
  [each agent: explore-data → write-query → analyze → create-viz]
→ source-before-claiming → build-dashboard
→ verification-before-completion → [DISTRIBUTION]
```

### Exploratory-to-Insight Pipeline
```
explore-data (no fixed question yet)
→ outcome-first-thinking (now that data is understood, what decision could it inform?)
→ brainstorming → write-query → analyze → create-viz → validate-data
→ source-before-claiming → [DISTRIBUTION or further investigation]
```

## The three most critical pairings

**1. `outcome-first-thinking` before `/analyze`**
"What decision does this analysis support?" before touching data. The data plugin faithfully analyzes whatever question it receives — it cannot detect that the question was wrong. Analysis built on a misframed brief requires a full redo, not a patch. Run `outcome-first-thinking` first.

**2. `source-before-claiming` before distributing any insight**
Every claim distributed to stakeholders must trace to a specific table, query, time range, and methodology — not to "the analysis." The data plugin produces the insight; `source-before-claiming` ensures it is accountable. Unsourced findings create decisions built on untraceable foundations.

**3. `systematic-problem-solving` when a query returns unexpected results**
Unexpected output is information. Fix instinct says: change the query. The right first step is to understand what was returned and why — the result may reflect a data quality issue, a wrong schema assumption, or a real finding that changes the question. Fixing before understanding discards that signal.

## Red Flags

| Situation | Action |
|---|---|
| About to run `/analyze` without defining the decision it supports | Stop — run `outcome-first-thinking` first |
| About to distribute an insight to stakeholders | Stop — run `source-before-claiming` first |
| Query returned unexpected results | Stop — run `systematic-problem-solving` before fixing the query |
| Multiple analytical cuts needed | Consider `dispatching-parallel-agents` rather than sequential cuts |
| Analysis "done" but the original brief was never written down | Run `verification-before-completion` — methodology checks are not the same as brief checks |

## Full integration reference

See `docs/integration/data.md` for complete workflow patterns, pairing rationale, and gap analysis.
