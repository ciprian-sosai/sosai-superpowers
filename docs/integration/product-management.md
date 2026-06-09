# Integration Guide: sosai-superpowers + product-management

sosai-superpowers governs **how** to work. The product-management plugin governs **what** to do in product workflows. They operate at different layers and compose cleanly.

**The pattern:**
```
sosai-superpowers  →  clarify scope, define success criteria
product-management →  execute the product workflow
sosai-superpowers  →  verify before distributing or handing off
```

---

## When to use sosai-superpowers — and when to skip it

### The redundancy question

`product-management:product-brainstorming` and `sosai-superpowers:brainstorming` are the most directly overlapping skills across any plugin pair. Both involve exploring a problem space. The distinction matters.

`sosai-superpowers:brainstorming` enforces "clarify intent before producing anything." Its purpose is to surface what you are actually trying to solve, what constraints are real, and whether you are approaching the right problem. It asks questions before generating content.

`product-management:product-brainstorming` is a thinking partner for ideation — it helps you explore a problem space, challenge assumptions, and generate product ideas. It is optimized for generative divergence, not problem definition.

**Use sosai-superpowers:brainstorming first** when the problem is underspecified, when you are not sure what you are solving, or when assumptions need surfacing. Then use product-management:product-brainstorming for the generative work. The two serve different moments: problem definition vs. ideation. Running product-management:product-brainstorming on a poorly defined problem produces high-quality output for the wrong question.

If the problem is already well-defined and you need ideas, go directly to product-management:product-brainstorming.

### The handoff question

In the same cowork session, context is shared — it is the conversation thread. If you run `outcome-first-thinking` and surface "this spec is for a B2B customer, not a consumer," that is in context when `/write-spec` runs. There is no formal structured handoff, but the information is there.

For subagents (if using `dispatching-parallel-agents`): subagents do not inherit session context. Key decisions from upstream sosai-superpowers skills must be explicitly included in the subagent prompt — they do not transfer automatically.

### Use sosai-superpowers when the task is ambiguous, high-stakes, or already failing

| Situation | Use sosai-superpowers | Why |
|---|---|---|
| Writing a spec without a success criterion | `outcome-first-thinking` | Specs without measurable success criteria are implementation instructions, not product decisions |
| Metrics are down — roadmap change under discussion | `systematic-problem-solving` | Root cause investigation before changing priorities — the drop could be product, onboarding, cohort, or market |
| Competitive claims going to leadership | `source-before-claiming` | Every competitive claim must trace to a source; unsourced claims distributed upward are a credibility risk |
| Research synthesis going into a product decision | `source-before-claiming` | Insights without traceable sources cannot be validated or challenged |
| Spec about to go to engineering | `requesting-peer-review` | Brief the tech lead on scope decisions before handing over a doc |
| Stakeholder update going to leadership | `verification-before-completion` | Check that the update matches actual roadmap and sprint state before distribution |
| Starting a major feature with underspecified goals | `brainstorming` then `outcome-first-thinking` | Define the problem before ideating or speccing |

### Skip sosai-superpowers when the task is routine and well-defined

| Situation | Just use the domain skill | Why |
|---|---|---|
| Routine sprint planning with a known team and backlog | `/sprint-planning` directly | Scope and priorities are known; the domain skill handles the execution |
| Standard weekly stakeholder update with no major changes | `/stakeholder-update` directly | Low-stakes, recurring, predictable content |
| Competitive brief for a market you work in daily | `/competitive-brief` directly | Context is current; clarification step adds friction without value |
| Synthesizing research you gathered and understand | `/synthesize-research` directly | If you understand the data, go straight to synthesis |

### High value

**Metrics investigation before roadmap changes** — `systematic-problem-solving` before `metrics-review` prevents the most common product mistake: changing priorities based on a metric drop whose cause is unknown. A retention drop could be product quality, an onboarding regression, a cohort effect, or a market shift. Each has a different response. The domain skill surfaces the metric; the process skill demands root cause before action.

**outcome-first-thinking before write-spec** — Every spec should answer: what user problem does this solve, and how will we know it is solved? `outcome-first-thinking` forces this before any spec content is written. A spec without a measurable success criterion is an implementation plan. A spec with one is a product decision. The difference matters when engineering asks "what does done look like?"

**source-before-claiming + competitive-brief / synthesize-research** — Competitive analysis and research insights distributed to leadership carry significant weight. Claims that cannot be traced to a source — a customer interview, a market report, a competitor's public release note — cannot be defended or updated when challenged. `source-before-claiming` enforces this before distribution.

### Low value

**Routine sprint planning** — When the team is known, the backlog is groomed, and the priorities are set, adding clarification and planning process skills before `/sprint-planning` creates overhead without improving the sprint. The domain skill is designed for this case.

**Standard stakeholder updates** — A weekly update with no major roadmap changes, no escalations, and no leadership decisions pending is low-stakes enough to run directly. Reserve `verification-before-completion` for updates that carry consequential framing.

---

## Quick Reference: Which sosai-superpowers skill wraps which product workflow stage

| Product workflow stage | sosai-superpowers skill | Why |
|---|---|---|
| Exploring a new problem space | `brainstorming` → then `product-brainstorming` | Define the problem before ideating |
| Starting any spec, brief, or analysis | `outcome-first-thinking` | Define success criteria before producing content |
| Before gathering user research or market data | `research-before-acting` | Know what you are trying to learn before gathering |
| Multi-step feature work or initiative planning | `writing-plans` | Structure the work before executing; catch dependency problems early |
| Metrics drop with unclear cause | `systematic-problem-solving` | Root cause investigation before changing roadmap |
| Competitive claims or research insights for distribution | `source-before-claiming` | Every claim must trace to a source |
| Before distributing a stakeholder update | `verification-before-completion` | Check that the update matches actual state |
| Before handing a spec to engineering | `requesting-peer-review` | Brief on scope decisions, not just hand over a doc |
| After receiving feedback on a spec or plan | `receiving-peer-review` | Process feedback systematically |

---

## The three most important pairings

### 1. `outcome-first-thinking` + `write-spec`

A spec that does not answer "what user problem does this solve, and how will we know it is solved?" is an implementation instruction, not a product decision. Engineering teams building from that spec have no way to evaluate whether a tradeoff serves the goal or abandons it. They can only build what was written.

`outcome-first-thinking` surfaces the user problem, the measurable success criterion, and the non-goals before `/write-spec` writes a word. This takes five minutes. It changes what goes into the spec and what gets left out.

**The pattern:**
```
outcome-first-thinking   →  define: user problem, success criterion, non-goals
write-spec               →  produce the spec with those anchors in place
requesting-peer-review   →  brief the tech lead on scope decisions before handoff
```

The spec section that most often gets skipped — "how will we measure success?" — is exactly what `outcome-first-thinking` produces. Do it first, not as a retrospective fill-in.

### 2. `systematic-problem-solving` + `metrics-review`

Metrics inform product decisions. A retention drop that prompts a roadmap reprioritization, a conversion problem that drives a new feature, an engagement decline that changes sprint goals — all of these have the same failure mode: acting on the observation before understanding the cause.

`systematic-problem-solving` before acting on `metrics-review` output enforces the question: is the cause of this metric movement understood? A drop in retention could be:
- A product quality regression (feature broke)
- An onboarding regression (activation step failing)
- A cohort effect (a specific acquisition cohort churning)
- A market shift (external, not product-driven)

Each has a different response. Only one of them involves a roadmap change. Acting before the cause is clear produces the wrong fix.

**The pattern:**
```
metrics-review               →  surface the metric movement and trend
systematic-problem-solving   →  root cause investigation: what is actually driving this?
[then] roadmap-update / sprint-planning  →  act on understood causes, not symptoms
```

### 3. `source-before-claiming` + `competitive-brief` / `synthesize-research`

Competitive analysis and research synthesis reach audiences who will make decisions and repeat the claims. A competitive claim that cannot be traced to a source — a public release note, a pricing page, a documented customer interview — cannot be defended, updated, or challenged. When someone asks "where did this come from?" and the answer is "the model synthesized it," the brief loses credibility.

`source-before-claiming` before distributing output from `/competitive-brief` or `/synthesize-research` enforces that every material claim has a traceable source. This is particularly important for competitive claims that affect pricing decisions or roadmap investments, and for research insights that become the stated rationale for product bets.

---

## End-to-End Workflow Patterns

### Pattern A: Feature from idea to spec

```
sosai-superpowers:brainstorming
  → Surface: is the problem well-defined? What are we actually solving?
  → If underspecified: clarify before anything else

sosai-superpowers:outcome-first-thinking
  → Define: user problem, measurable success criterion, non-goals, out of scope

product-management:product-brainstorming
  → Explore: solution approaches, assumptions to challenge, edge cases

sosai-superpowers:research-before-acting
  → Identify: what do we need to know before writing the spec? What research exists?

product-management:synthesize-research [if user research available]
  → Structure: key insights, themes, open questions

sosai-superpowers:source-before-claiming
  → Verify: every research claim that will appear in the spec traces to a source

product-management:write-spec
  → Produce the spec with success criteria and sources in place

sosai-superpowers:requesting-peer-review
  → Brief: the tech lead on scope decisions, tradeoffs, and open questions
  → Not: hand over a doc and wait for async comments

[ENGINEERING HANDOFF]
```

---

### Pattern B: Metrics investigation

```
product-management:metrics-review
  → Surface: metric movement, trend, magnitude, affected segments

sosai-superpowers:systematic-problem-solving
  → Investigate: what is actually causing this?
  → Form one hypothesis at a time. Test minimally. Do not act on untested hypotheses.
  → Rule out: regression, cohort effect, external cause, measurement artifact

[If cause is understood and requires product response:]

sosai-superpowers:outcome-first-thinking
  → Define: what change would address the root cause, and how will we know it worked?

product-management:roadmap-update [if priorities need to change]
  → Reprioritize based on understood cause, not the metric movement alone

sosai-superpowers:verification-before-completion
  → Check: does the roadmap change actually address the identified root cause?

product-management:stakeholder-update
  → Communicate: what was found, what the cause is, what will change, why

sosai-superpowers:source-before-claiming
  → Verify: every causal claim in the stakeholder update is supported by the investigation
```

---

## Gaps: What neither plugin covers

**1. Customer discovery discipline**
Neither plugin covers the discipline of validating that a proposed feature solves a real problem before speccing it — structured customer discovery interviews, assumption mapping, or explicit "do not spec until validated" gates. `outcome-first-thinking` asks the right questions; neither plugin enforces the discovery process that answers them.

**2. Dependency and sequencing across teams**
`writing-plans` can structure a product initiative, but neither plugin handles cross-team dependency tracking — which engineering team owns what, which releases are blocked on platform work, which features share a backend change. This becomes a problem during `/sprint-planning` for features with significant cross-team scope.

**3. Decision log**
Product decisions made during brainstorming, spec writing, or roadmap updates are not captured in a durable, queryable format. When a stakeholder asks "why did we decide not to do X?" six months later, the answer lives in session context or tribal memory. Neither plugin creates a decision record.

---

## Installation

Install both plugins in your Claude cowork settings:

```
https://github.com/ciprian-sosai/sosai-superpowers
https://github.com/anthropics/knowledge-work-plugins/tree/main/product-management
```

---

*For the process-layer companion skill that guides this integration at runtime, see `sosai-superpowers:working-with-product-management`.*
