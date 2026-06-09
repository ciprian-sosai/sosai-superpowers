---
name: working-with-enterprise-search
description: Maps sosai-superpowers process skills to each stage of an enterprise search and knowledge management workflow — defining the information need, synthesizing with attribution, and verifying before distributing — in the correct sequence. Use when working with the Anthropic enterprise-search plugin to know which sosai-superpowers skills wrap each stage of a search or knowledge synthesis workflow and in what order.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Working with enterprise-search

## Overview

sosai-superpowers and enterprise-search operate at different layers and compose cleanly. enterprise-search finds, aggregates, and synthesizes information across connected tools. sosai-superpowers ensures the information need is defined before searching, synthesized outputs are attributed, and digests are complete before distribution.

**The pattern:**
```
sosai-superpowers    →  define information need, scope the question    (before searching)
enterprise-search    →  search, synthesize, produce the digest         (the search work)
sosai-superpowers    →  verify attribution, verify completeness        (before distributing)
[DISTRIBUTION / DECISION GATE]
```

## Which skill wraps which stage

| When | sosai-superpowers skill |
|---|---|
| Starting any research or information gathering task | `brainstorming` |
| Before searching or synthesizing | `outcome-first-thinking` |
| Before a knowledge synthesis or digest | `research-before-acting` |
| Any synthesized output with cited sources | `source-before-claiming` |
| Multi-source, multi-step research workflow | `writing-plans` |
| Parallel search across independent questions | `dispatching-parallel-agents` |
| Before claiming a digest or synthesis is complete | `verification-before-completion` |
| Before distributing to a team, executive, or stakeholder | `requesting-peer-review` |
| After receiving feedback on a digest or report | `receiving-peer-review` |

## Four workflow patterns

### Decision Research
```
outcome-first-thinking → brainstorming → search-strategy
→ [parallel: search across sources] → knowledge-synthesis
→ source-before-claiming → verification-before-completion
→ requesting-peer-review → [DECISION GATE] → finishing-a-task
```

### Weekly Digest / Briefing
```
outcome-first-thinking → search-strategy
→ search → digest
→ source-before-claiming → verification-before-completion
→ [DISTRIBUTION] → finishing-a-task
```

### Source Audit / Knowledge Base Maintenance
```
brainstorming → outcome-first-thinking
→ source-management → knowledge-synthesis
→ source-before-claiming → verification-before-completion
→ [REVIEW] → finishing-a-task
```

### Parallel Research on Independent Questions
```
brainstorming → outcome-first-thinking → writing-plans
→ dispatching-parallel-agents
→ [agent-1: search question-A] [agent-2: search question-B]
→ knowledge-synthesis → source-before-claiming
→ verification-before-completion → [DISTRIBUTION] → finishing-a-task
```

## The three most critical pairings

**1. `outcome-first-thinking` before `search-strategy` or `search`**
Enterprise search retrieves what exists — it does not ask whether you are looking for the right thing. Before running a search, be explicit about what decision the research serves, what a useful result looks like, and what is out of scope. Without this, search results tend to answer the literal query rather than the underlying need.

**2. `source-before-claiming` after `knowledge-synthesis`**
Knowledge synthesis aggregates and paraphrases across sources. The result can drift from the original — claims get generalized, sources get conflated, confidence gets overstated. Every assertion in a synthesized output must trace to a named source and date. This is especially critical in digests distributed to executives or used in decisions.

**3. `verification-before-completion` before any distributed digest or briefing**
A digest that is missing a key source, misattributes a finding, or answers a different question than what was asked is worse than no digest. Verification checks completeness and accuracy against the original brief before distribution.

## The search strategy question

`search-strategy` is the enterprise-search skill for designing multi-source search plans. It pairs with `brainstorming` and `outcome-first-thinking`:

- `brainstorming` → clarifies what you actually need to know
- `outcome-first-thinking` → defines what a useful result looks like
- `search-strategy` → designs the search to find it

Don't run search-strategy before you know what success looks like. The strategy will optimize for the literal query, not the underlying need.

## Parallel search: when to use it

`dispatching-parallel-agents` is appropriate when:
- Multiple independent questions need answering in parallel (not dependent on each other's results)
- The same question needs to be searched across multiple independent source types simultaneously
- Time constraint requires parallel retrieval

Each parallel agent needs the full brief — what decision this serves, what format the result should take, what is out of scope. Agents do not share context.

## Examples

**Example 1: Executive briefing on a competitor**
User: "The CEO wants a briefing on Competitor X before tomorrow's board meeting."
Applied: outcome-first-thinking defines what the CEO actually needs for the board context. brainstorming surfaces what information would change the decision. search-strategy designs the retrieval plan. source-before-claiming ensures every assertion in the briefing is attributed. verification-before-completion checks completeness before distribution.
Result: Briefing answers the board question specifically, every claim is sourced, no gaps.

**Example 2: Finding a decision that was made three months ago**
User: "What did we decide on the API approach for the mobile platform?"
Applied: outcome-first-thinking clarifies what "the decision" means — the final call, or the discussion thread? search runs across chat, email, and cloud storage. knowledge-synthesis produces a coherent answer. source-before-claiming attributes each claim to a specific source and date.
Result: Decision found and attributed: REST over GraphQL, decided by the engineering lead, confirmed in three sources.

**Example 3: Weekly digest for the leadership team**
User: "Compile the weekly market and customer digest for the leadership meeting."
Applied: outcome-first-thinking clarifies which markets and which customer signals matter for this week's agenda. search and digest run with those boundaries. source-before-claiming checks every statistic. verification-before-completion confirms the digest covers everything in the brief before distribution.
Result: Digest arrives at the leadership meeting complete, attributed, and scoped to what they need.

## Troubleshooting

**The search retrieved a lot of results but didn't answer the question.**
This is a search-strategy problem. Run outcome-first-thinking and brainstorming first, then redesign the search strategy around the actual question rather than the literal query.

**Synthesized output contains assertions that can't be traced back to a source.**
Run source-before-claiming before distributing. Every assertion in a knowledge synthesis must trace to a named source and date. Remove or flag any assertion that cannot be attributed.

**The digest was distributed but missed a key source.**
This is a verification gap. Run verification-before-completion as a retrospective check, identify what was missed and why, and update the search strategy for next time.

**Parallel search agents returned inconsistent or conflicting results.**
Run knowledge-synthesis explicitly to deduplicate and reconcile. Note conflicts and their sources rather than picking one result silently.

## Red Flags

| Situation | Action |
|---|---|
| About to search without knowing what decision this serves | Stop — run `outcome-first-thinking` first |
| Knowledge synthesis output contains unattributed assertions | Run `source-before-claiming` before distributing |
| About to distribute a digest to executives or stakeholders | Run `verification-before-completion` first |
| Search results answered the literal query but not the actual need | Re-run `brainstorming` + `outcome-first-thinking` + `search-strategy` |
| Parallel search returned conflicting results | Run `knowledge-synthesis` explicitly to reconcile |

## Full integration reference

See `docs/integration/enterprise-search.md` for complete workflow patterns, gap analysis, and pairing rationale.
