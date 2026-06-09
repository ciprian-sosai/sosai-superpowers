---
name: working-with-marketing
description: Use when working with the Anthropic marketing plugin — to know which sosai-superpowers skills wrap each stage of a marketing workflow and in what order
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
