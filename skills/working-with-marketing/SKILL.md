---
name: working-with-marketing
description: Maps sosai-superpowers process skills to each stage of a marketing workflow — clarifying outcomes, verifying claims, and sequencing parallel work. Use when working with the Anthropic marketing plugin to know which sosai-superpowers skills wrap each stage of a marketing workflow and in what order.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Working with the marketing plugin

## Overview

sosai-superpowers and the marketing plugin operate at different layers. This skill tells you which process skills to apply before, during, and after each marketing workflow stage.

**The pattern:**
```
sosai-superpowers  →  clarify the outcome, define success criteria    (before the marketing work)
marketing          →  execute the workflow                             (the marketing work itself)
sosai-superpowers  →  verify before publishing, distributing, launching  (before anything goes out)
[PUBLISH / LAUNCH / DISTRIBUTE]
```

## Which skill wraps which stage

| When | sosai-superpowers skill |
|---|---|
| Starting any campaign, content, or SEO project | `outcome-first-thinking` |
| Content or copy brief is unclear on audience, message, or CTA | `brainstorming` |
| Before any competitive or market research | `research-before-acting` |
| Any competitive claims or performance metrics going to leadership | `source-before-claiming` |
| Multi-channel campaign (email + social + paid + content) | `dispatching-parallel-agents` |
| Complex content strategy or multi-step campaign planning | `writing-plans` |
| Declining campaign performance — before making changes | `systematic-problem-solving` |
| Before any content is published externally | `verification-before-completion` |
| Before stakeholder or brand review | `requesting-peer-review` |
| After receiving review feedback | `receiving-peer-review` |

## Two workflow patterns

### Campaign from Brief to Launch
```
outcome-first-thinking → brainstorming
→ campaign-plan
→ [multi-channel: dispatching-parallel-agents → email-sequence / draft-content per channel]
→ source-before-claiming (competitive claims, market data)
→ verification-before-completion (brand, legal, accuracy)
→ requesting-peer-review → [STAKEHOLDER SIGN-OFF]
→ finishing-a-task → [LAUNCH]
```

### Content + SEO Workflow
```
outcome-first-thinking
→ seo-audit → brainstorming
→ draft-content
→ source-before-claiming (statistics, research citations)
→ verification-before-completion (on-page SEO, brand voice, legal)
→ requesting-peer-review [if high-stakes]
→ [PUBLISH]
```

## The three most critical pairings

**1. `outcome-first-thinking` before `campaign-plan`**
Define what specific action the audience should take and how it will be measured before generating a campaign brief. Campaigns without a defined conversion metric produce output — channel plans, content calendars, messaging frameworks — but not results. Before running `/campaign-plan`, write one sentence: "We want [specific audience] to [specific action] by [date], measured by [metric]." If that sentence cannot be written, the brief will be wrong.

**2. `source-before-claiming` before distributing `competitive-brief` or `performance-report` output**
Competitive claims and performance metrics distributed to leadership or published externally must trace to verifiable sources. Market share claims built on inference are a credibility risk and, in regulated industries, a legal one. Verify each claim has a specific source — a report, survey, platform data, or primary research — before anything leaves the team.

**3. `brainstorming` before `draft-content`**
`/draft-content` produces good copy for the brief you give it. If the brief is wrong — wrong audience, wrong message hierarchy, wrong CTA — the copy is wrong. Run `brainstorming` first to surface: who is the primary reader, what do they currently believe, what should change, what is the single most important message, what is the one action you are asking for. The output of that session is the input to `/draft-content`.

## Examples

**Example 1: Campaign launch with competitive claims**
User: "We need to launch a demand-gen campaign next month targeting mid-market finance teams. I have a brief ready."
Applied: The skill identifies that `outcome-first-thinking` must run before `/campaign-plan`, and that any competitive or market share claims in the brief must pass through `source-before-claiming` before distribution.
Result: The campaign brief includes a defined conversion metric and all competitive figures trace to verifiable sources before going to leadership.

**Example 2: Content piece stuck in revision cycles**
User: "We're on the fourth revision of this whitepaper and the stakeholder keeps asking for changes."
Applied: The skill flags the revision loop as a red flag indicating a brief problem, not a copy problem, and routes to `brainstorming` to surface audience, message hierarchy, and CTA before any further drafting.
Result: The brainstorming session reveals the primary reader and single most important message were misaligned in the original brief, giving the writer a corrected input for the next draft.

**Example 3: Multi-channel campaign being built sequentially**
User: "I'm working through the email sequence first, then I'll do the social content, then the paid ads."
Applied: The skill redirects to `dispatching-parallel-agents` so each channel is briefed simultaneously rather than in sequence.
Result: All channel content is developed in parallel, cutting planning time and ensuring consistent messaging across email, social, and paid from the start.

## Troubleshooting

**`/campaign-plan` was run without first using `outcome-first-thinking`, and the output feels unfocused**
Stop and write the one-sentence conversion statement ("We want [audience] to [action] by [date], measured by [metric]") before proceeding. Do not continue revising the campaign plan output — fix the input first.

**`source-before-claiming` was skipped and competitive claims are already in a draft going to leadership**
Pull the draft before it is distributed. Run `source-before-claiming` against each market share figure or competitive statement. Replace any claim that cannot be traced to a specific report, survey, or platform dataset.

**`brainstorming` was run after `/draft-content` instead of before it**
The copy is already written to the wrong brief. Use the brainstorming output to identify the specific brief errors, then re-run `/draft-content` with the corrected inputs. Do not edit the existing draft — rewrite from the corrected brief.

**The workflow diagram was followed but the marketing plugin output was not passed into the sosai-superpowers skill**
Each skill needs the actual output as context, not just a summary. When chaining skills, paste the full campaign plan, content brief, or claim list into the next skill's input — not a description of it.

**`verification-before-completion` was run but only checked brand voice, not legal or accuracy**
Verification covers three gates: brand alignment, factual accuracy, and legal/compliance. If only one was checked, re-run the verification step with explicit instructions to check all three before publishing.

## Red Flags

| Situation | Action |
|---|---|
| About to run `/campaign-plan` without a defined conversion metric | Stop — run `outcome-first-thinking` first |
| About to publish content externally | Stop — run `verification-before-completion` first |
| Competitive claim or market share figure going to leadership | Stop — run `source-before-claiming` first |
| Campaign performance is declining, considering changes | Stop — run `systematic-problem-solving` before touching the campaign |
| On the second or third revision of the same content piece | Stop — run `brainstorming` to investigate whether the brief is the problem, not the copy |
| Multi-channel campaign being built sequentially | Stop — use `dispatching-parallel-agents` to brief each channel in parallel |

## Full integration reference

See `docs/integration/marketing.md` for complete workflow patterns, pairing rationale, and gap analysis.
