# Integration Guide: sosai-superpowers + enterprise-search

sosai-superpowers governs **how** to work. enterprise-search governs **what** to do when finding and synthesizing information across an organization. They operate at different layers and compose cleanly — one wraps the other.

**The core pattern:**
```
sosai-superpowers    →  define the information need and scope
enterprise-search    →  search, synthesize, produce the digest
sosai-superpowers    →  verify attribution and completeness before distributing
```

The enterprise-search plugin aggregates information across connected sources — chat platforms, email, cloud storage, project trackers, CRMs, and knowledge bases — and synthesizes the results into coherent, attributed outputs. sosai-superpowers is what ensures the search serves an actual decision, synthesis outputs are traceable, and digests are complete before reaching their audience.

---

## Quick Reference: Which sosai-superpowers skill wraps which search stage

| Stage | sosai-superpowers skill | Why |
|---|---|---|
| Starting any research or information gathering task | `brainstorming` | Clarify what information is actually needed and why before designing a search |
| Before searching or synthesizing | `outcome-first-thinking` | Define what a useful result looks like — what decision does this serve? |
| Before knowledge synthesis | `research-before-acting` | Understand the organizational context before interpreting search results |
| Any synthesized output with cited sources | `source-before-claiming` | Every assertion in a synthesis must trace to a named source and date |
| Multi-source, multi-step research workflow | `writing-plans` | Structure the search and synthesis steps before executing |
| Parallel search across independent questions | `dispatching-parallel-agents` | Independent questions can run simultaneously; each agent needs the full brief |
| Before claiming a digest or synthesis is complete | `verification-before-completion` | Check completeness and accuracy against the original brief |
| Before distributing to a team, executive, or stakeholder | `requesting-peer-review` | Brief the distributor on key findings and confidence level |
| After receiving feedback on a digest or report | `receiving-peer-review` | Process all feedback systematically |

---

## When to use sosai-superpowers — and when to skip it

### The scoping problem

Enterprise search is good at finding what exists. It does not question whether the search is looking for the right thing. `outcome-first-thinking` fills this gap:

- "Find everything about the API decision" is a literal query.
- "Find the final decision on the API approach, who made it, and what rationale was documented" is a scoped query that serves a specific need.

The difference determines whether the search results are useful or just large.

### Use sosai-superpowers when the task is ambiguous or the output will inform a decision

| Situation | Use sosai-superpowers | Why |
|---|---|---|
| Executive briefing before a major meeting | `outcome-first-thinking` | Define what the executive needs to know, not just what can be found |
| Research for a business decision | `brainstorming` + `outcome-first-thinking` | Clarify what information would actually change the decision |
| Synthesis output with multiple sources | `source-before-claiming` | Ensure every assertion traces back — synthesis can drift from sources |
| Weekly digest for leadership | `verification-before-completion` | Confirm completeness against the brief before distribution |
| Parallel research on independent questions | `dispatching-parallel-agents` | Independent retrieval with consistent methodology |

### Skip sosai-superpowers when the task is well-defined

| Situation | Just use the domain skill | Why |
|---|---|---|
| Finding a specific document by name or topic | `search` directly | Specific enough that outcome-first-thinking adds no value |
| Locating who owns a resource | `source-management` directly | Defined task, no synthesis needed |
| Routine digest with a fixed format | `digest` directly | Known scope, mechanical execution |

---

## The synthesis drift problem

Knowledge synthesis paraphrases and aggregates across sources. Drift is common:
- A tentative discussion ("maybe we should try REST") becomes a decision ("we decided on REST")
- Multiple sources with different dates are treated as contemporaneous
- The most recent source is weighted over the most authoritative

`source-before-claiming` addresses this at the output level:
- Each assertion in the synthesis must trace to a named source, date, and specific content
- Conflicting sources must be noted, not silently resolved
- The confidence level of the synthesis depends on source quality and agreement

---

## Search strategy before parallel search

When research spans multiple independent questions or multiple source types, `search-strategy` (enterprise-search) designs the retrieval plan. But the strategy is only as good as the question it is trying to answer. The correct sequence:

```
brainstorming → outcome-first-thinking → search-strategy → search → knowledge-synthesis
```

Skipping to `search-strategy` without `outcome-first-thinking` produces a thorough plan for the wrong question.

---

## Weekly digests and recurring briefings

Recurring digests have fixed formats but variable content. The scoping work still applies — what changed this week that matters, what can be safely omitted, what needs to be elevated. `outcome-first-thinking` takes 2 minutes on a recurring basis and prevents digests that answer a question no one asked.

Before any digest is distributed:
```
[digest produced] → source-before-claiming → verification-before-completion → [distribute]
```

Verification catches: missing key source, stat that can't be traced, coverage gap against the brief.

---

## Parallel research: when it adds value

`dispatching-parallel-agents` is appropriate for enterprise search when:
- Multiple independent questions need answers simultaneously
- The same question needs to be searched across fundamentally different source types (financial records vs. customer communications vs. project history)
- Time constraints require parallel retrieval

Each parallel agent needs: the specific question, the search scope, the format of the expected output, and what to do if the source doesn't contain a useful answer. Agents do not share context.

Parallel search is NOT appropriate when:
- Questions are dependent (Question B depends on the answer to Question A)
- Sources overlap significantly (results will need deduplication across agents)
- The synthesis requires cross-referencing across all results before any single result is useful

---

## High value

**Decision support research** — Finding information to support a specific decision. `outcome-first-thinking` defines what information would change the decision. `source-before-claiming` ensures the synthesis is traceable. `verification-before-completion` checks completeness before the decision is made.

**Executive briefings** — Time-constrained, audience-specific, high-stakes. `outcome-first-thinking` scopes what the executive needs for that specific meeting. `verification-before-completion` checks it covers everything before distribution.

**Knowledge synthesis for distribution** — Any synthesis that will be shared across a team or used in a written record. `source-before-claiming` is non-negotiable.

## Low value

**Simple document lookup** — Finding a specific document, locating a resource owner. Search directly.

**Routine recurring digests with fixed, well-understood scope** — Still run `verification-before-completion`, but skip the scoping skills on iterations where nothing has changed about the brief.
