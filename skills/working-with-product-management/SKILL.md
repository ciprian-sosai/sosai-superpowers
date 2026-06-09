---
name: working-with-product-management
description: Maps sosai-superpowers process skills to each stage of the product-management plugin workflow, specifying which skill to run before, during, and after each stage. Use when working with the Anthropic product-management plugin and needing to know which sosai-superpowers skills wrap each stage of a product workflow and in what order.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Working with the product-management plugin

## Overview

sosai-superpowers and the product-management plugin operate at different layers. This skill tells you which process skills to apply before, during, and after each product workflow stage.

**The pattern:**
```
sosai-superpowers      →  clarify + plan         (before the product work)
product-management     →  execute the workflow   (the product work itself)
sosai-superpowers      →  verify + review        (before distribution or handoff)
[HANDOFF / DISTRIBUTION]
```

## Which skill wraps which stage

| When | sosai-superpowers skill |
|---|---|
| Problem space is underspecified | `brainstorming` — define the problem before ideating |
| Starting any spec, brief, or analysis | `outcome-first-thinking` |
| Before gathering user research or market data | `research-before-acting` |
| Multi-step initiative or feature planning | `writing-plans` |
| Metrics drop with unclear cause | `systematic-problem-solving` |
| Competitive claims or research insights for distribution | `source-before-claiming` |
| Before distributing a stakeholder update | `verification-before-completion` |
| Before handing a spec to engineering | `requesting-peer-review` |
| After receiving feedback on a spec or plan | `receiving-peer-review` |

## Two workflow patterns

### Feature from idea to spec
```
brainstorming → outcome-first-thinking
→ product-brainstorming → research-before-acting
→ synthesize-research → source-before-claiming
→ write-spec → requesting-peer-review
→ [ENGINEERING HANDOFF]
```

### Metrics investigation
```
metrics-review → systematic-problem-solving
→ [cause understood] → outcome-first-thinking
→ roadmap-update → verification-before-completion
→ stakeholder-update → source-before-claiming
→ [DISTRIBUTION]
```

## The three most critical pairings

**1. `outcome-first-thinking` before `write-spec`**
Every spec needs to answer: what user problem does this solve, and how will we know it is solved? Run `outcome-first-thinking` before `/write-spec` to produce those anchors. A spec without a measurable success criterion is an implementation instruction. Engineering teams building from it have no way to evaluate whether a tradeoff serves the goal or abandons it.

**2. `systematic-problem-solving` before acting on `metrics-review`**
A metric drop is an observation, not a cause. Before changing roadmap priorities or starting a sprint around a metric problem, run `systematic-problem-solving` to identify the actual driver. A retention drop could be a product regression, an onboarding failure, a cohort effect, or an external market shift. Each has a different response. Only one involves a roadmap change.

**3. `source-before-claiming` before `competitive-brief` / `synthesize-research` distribution**
Competitive claims and research insights distributed to leadership must trace to sources. An insight that cannot be traced to a customer interview, a market report, or a documented source cannot be defended or updated when challenged. Verify before distributing — not after.

## Examples

**Example 1: Feature spec with no success criterion**
User: "I need to write a spec for a new onboarding flow."
Applied: The skill flags that `outcome-first-thinking` must run before `write-spec` to define the user problem and measurable success criterion.
Result: The spec includes a clear problem statement and a testable success criterion, giving engineering a goal to build toward rather than just instructions.

**Example 2: Metrics drop triggering a roadmap discussion**
User: "Retention is down 8% this quarter. We need to reprioritize the roadmap."
Applied: The skill redirects to `systematic-problem-solving` before any roadmap change, preventing a premature response to an undiagnosed cause.
Result: The team identifies the drop traces to an onboarding cohort issue, not a core product regression — a different fix than a roadmap change.

**Example 3: Competitive brief going to leadership**
User: "We finished the competitive brief. Ready to send to the exec team."
Applied: The skill triggers `source-before-claiming` before distribution to verify all competitive claims trace to documented sources.
Result: Two unattributed claims are caught and either sourced or removed before the brief reaches leadership.

## Troubleshooting

**`product-management:product-brainstorming` was run before the problem was defined.**
Run `sosai-superpowers:brainstorming` first to clarify the problem, then re-enter product-brainstorming with a sharper prompt. Output from ideation on an underspecified problem cannot be reused directly.

**`write-spec` was run before `outcome-first-thinking`, and the spec has no success criterion.**
Do not patch the spec by adding a criterion after the fact. Re-run `outcome-first-thinking`, then revise the spec from the goal section forward.

**`systematic-problem-solving` was skipped and a roadmap change was already proposed.**
Before any reprioritization is approved, run `systematic-problem-solving` and present the cause analysis alongside the proposal. Decisions made before diagnosis are not recoverable by running the skill after the fact.

**The wrong sosai-superpowers skill was selected for a stage — for example, `verification-before-completion` was run before `requesting-peer-review`.**
Check the "Which skill wraps which stage" table. Verification checks accuracy and completeness; peer review checks scope decisions and engineering fit. Both are required before handoff, in that order.

**Context from earlier stages was not passed when invoking a downstream skill.**
Each skill invocation needs the output of the prior stage as input. Summarize the key decisions and constraints from the previous stage and include them explicitly in the prompt when invoking the next skill.

## Red Flags

| Situation | Action |
|---|---|
| About to write a spec with no stated success criterion | Stop — run `outcome-first-thinking` first |
| Metrics are down, roadmap change is being discussed | Stop — run `systematic-problem-solving` before any reprioritization |
| Competitive brief or research synthesis about to go to leadership | Run `source-before-claiming` before distributing |
| Spec about to be handed to engineering | Run `requesting-peer-review` — brief the tech lead on scope decisions |
| Stakeholder update going to leadership | Run `verification-before-completion` — check it matches actual roadmap state |
| Starting product-brainstorming with a vague problem | Run `brainstorming` first to define the problem |

## On the brainstorming overlap

`product-management:product-brainstorming` and `sosai-superpowers:brainstorming` are the most directly overlapping skills across any plugin pair. Both involve exploring a problem space. They serve different moments.

`sosai-superpowers:brainstorming` asks: what are we actually trying to solve? It clarifies intent before producing anything. Use it when the problem is underspecified, assumptions need surfacing, or you are not sure you are approaching the right question.

`product-management:product-brainstorming` is a thinking partner for ideation — it helps generate product ideas, explore the solution space, and challenge assumptions. It is optimized for generative divergence.

**The order matters:** use `sosai-superpowers:brainstorming` to define the problem, then `product-management:product-brainstorming` to explore solutions. Running ideation on a poorly defined problem produces high-quality output for the wrong question.

If the problem is already well-defined, skip `sosai-superpowers:brainstorming` and go directly to `product-management:product-brainstorming`.

## Full integration reference

See `docs/integration/product-management.md` for complete workflow patterns, pairing rationale, and gap analysis.
