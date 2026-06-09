# Integration Guide: sosai-superpowers + marketing

sosai-superpowers governs **how** to work. The marketing plugin governs **what** to do in marketing workflows. They operate at different layers and compose cleanly.

**The pattern:**
```
sosai-superpowers  →  clarify the outcome, define success criteria, plan the workflow
marketing          →  execute the marketing workflow
sosai-superpowers  →  verify before publishing, distributing, or launching
```

---

## Quick Reference: Which sosai-superpowers skill wraps which marketing workflow stage

| Marketing workflow stage | sosai-superpowers skill | Why |
|---|---|---|
| Starting any campaign, content, or SEO project | `outcome-first-thinking` | Define the conversion metric and desired audience action before generating a brief — campaigns without a defined success metric produce output, not results |
| Before any market, audience, or competitive research | `research-before-acting` | Understand the landscape and existing positioning before producing analysis or copy |
| Any output containing competitive claims or performance metrics | `source-before-claiming` | Market share claims, competitor positioning, and metrics distributed to leadership must trace to verifiable sources — inference is a credibility and legal risk |
| Multi-channel campaign | `dispatching-parallel-agents` | Brief each channel agent independently with the same campaign brief and run in parallel |
| Declining campaign performance | `systematic-problem-solving` | Root cause investigation before changing the campaign — is the issue channel, creative, audience, timing, or offer? |
| Before any content is published externally | `verification-before-completion` | Check against brand guidelines, legal requirements, and accuracy of claims — published content is immediate and hard to retract |
| Before content brief, copy, or campaign goes to stakeholder review | `requesting-peer-review` | Brief the reviewer on judgment calls and strategic choices, not just hand over a draft |
| After receiving stakeholder or brand review feedback | `receiving-peer-review` | Process all feedback systematically |
| Complex content strategy or messaging architecture | `writing-plans` | Structure the work before executing it; catch sequencing and dependency problems early |
| Content or copy with unclear audience or message hierarchy | `brainstorming` | Clarify audience, message hierarchy, and call to action before generating copy |

---

## When to use sosai-superpowers — and when to skip it

### The redundancy question

The marketing plugin already asks clarifying questions. `/campaign-plan` asks for objectives, audience, and messaging context. `/draft-content` asks for content type, audience, and brand voice. If sosai-superpowers also runs `outcome-first-thinking` or `brainstorming` first, you may answer overlapping questions twice. That is friction, not value.

**The distinction:** domain plugin questions ask *what* (which content type, which audience segment, which channel). sosai-superpowers questions ask *whether* and *why* (is this the right campaign approach, have we confirmed the conversion metric, are we solving the right problem). They are not the same question.

### The handoff question

In the same cowork session, context is shared — it is the conversation thread. If you run `outcome-first-thinking` and surface "this campaign is optimizing for trial signups, not brand awareness," that is in context when `/campaign-plan` runs. There is no formal structured handoff, but the information is there.

For subagents (if using `dispatching-parallel-agents`): subagents do not inherit session context. The campaign brief — conversion metric, target audience, key message, tone — must be explicitly included in each subagent prompt. It does not transfer automatically.

### Use sosai-superpowers when the task is ambiguous, high-stakes, or already failing

| Situation | Use sosai-superpowers | Why |
|---|---|---|
| Campaign with no defined conversion metric | `outcome-first-thinking` | Define what action the audience should take and how it will be measured before briefing the campaign |
| Competitive analysis or market share claims going to leadership | `source-before-claiming` | Every competitive claim must trace to a verifiable source — inference is a credibility and legal risk |
| Declining campaign performance after one or more optimization attempts | `systematic-problem-solving` | Root cause investigation before changing the campaign — channel? creative? audience? timing? offer? |
| Multi-channel campaign (email + social + paid + content) | `dispatching-parallel-agents` | Brief each channel agent with the same campaign brief and run in parallel |
| Copy brief that is unclear on audience, message hierarchy, or call to action | `brainstorming` | Clarify before generating — `draft-content` produces good copy for the brief you give it; if the brief is wrong, the copy is wrong |
| Content with regulatory implications (claims, disclaimers, jurisdiction-specific rules) | `verification-before-completion` + `source-before-claiming` | Published content cannot be easily retracted; claims must be accurate and sourced |
| Second or third revision attempt on the same content piece | `systematic-problem-solving` | Multiple revision cycles signal a brief problem, not a copy problem |

### Skip sosai-superpowers when the task is routine and well-defined

| Situation | Just use the domain skill | Why |
|---|---|---|
| Routine content draft on a well-understood topic with a clear brief | `/draft-content` directly | Audience, message, and CTA are already defined — no clarification needed |
| Standard performance report with known metrics and data sources | `/performance-report` directly | Deterministic analysis, domain skill handles it |
| Brand review of a minor asset (social caption, image alt text) | `/brand-review` directly | Low stakes, well-defined guidelines, no judgment calls required |
| Email sequence for a known product to a known audience | `/email-sequence` directly | If the campaign brief already exists and is well-defined, the domain skill handles it |

### High value

**Campaign planning without a conversion metric** — `outcome-first-thinking` before `/campaign-plan` asks the question the domain skill does not: what specific action do we want the audience to take, and how will we measure it? Campaigns generated without this anchor produce channel plans, content calendars, and messaging frameworks — output, not results. This pairing is highest value when the campaign objective is vague ("increase brand awareness," "drive engagement") rather than specific.

**Competitive claims and market positioning** — `/competitive-brief` and `/performance-report` produce analysis that may be distributed to leadership, used in board materials, or published in sales collateral. `source-before-claiming` enforces that every competitive claim, market share figure, and benchmark traces to a verifiable source before it leaves the team. Market share claims built on inference are a credibility risk and, in regulated industries, a legal one.

**Declining campaign performance** — The domain skills optimize within their scope. They do not investigate root causes across channel, creative, audience, timing, and offer variables simultaneously. `systematic-problem-solving` before making campaign changes enforces: state the problem precisely, generate hypotheses by layer, test the most probable explanation before touching the campaign. This prevents the common failure of changing multiple variables at once and losing attribution.

### Low value

**Routine content drafts** — Standard copy for a well-understood product, audience, and channel where the brief is clear and the stakes are low. `draft-content` handles it end to end.

**Standard performance reporting** — Pulling a pre-formatted report with known metrics, defined time windows, and no anomalies requiring investigation. The domain skill handles it.

---

## The three most important pairings

### 1. `outcome-first-thinking` + `campaign-plan`

The `/campaign-plan` skill generates a full campaign brief: objectives, audience, messaging, channel strategy, content calendar. The skill is good at generating the structure of a campaign. It is not designed to challenge whether the campaign objective is the right objective.

The risk of skipping `outcome-first-thinking`:
- A campaign optimized for reach when the business problem is conversion
- A campaign with no defined success metric, making optimization impossible
- Audience definition that is too broad ("millennials interested in fitness") rather than specific ("trial users who signed up but haven't completed onboarding")

**The pattern:**
```
outcome-first-thinking   →  define: what action, which audience, how we measure it
campaign-plan            →  generate: brief, channel strategy, content calendar
verification-before-completion  →  check: does the brief address the conversion metric defined in step 1?
```

`outcome-first-thinking` should produce a single sentence before the campaign brief is generated: "We want [specific audience] to [specific action] by [date], measured by [metric]." If that sentence cannot be written, the campaign brief will be wrong.

### 2. `source-before-claiming` + `competitive-brief` / `performance-report`

Competitive intelligence and performance data distributed to leadership shape decisions, resource allocation, and public positioning. Attribution errors in this context — "our market share grew 3 points" when the methodology is unreliable, "competitor X is losing share" when the data is inferred from secondary signals — carry downstream consequences.

`source-before-claiming` enforces that before any competitive claim or performance metric leaves the team:
- Each claim traces to a specific source (report, survey, platform data, primary research)
- The methodology is stated, not implied
- The confidence level is explicit where the data is indirect or estimated

This is especially important for claims that may appear in board materials, investor communications, or published content. An unsourced market share claim is not just a quality problem — in some contexts it is a regulatory one.

### 3. `brainstorming` + `draft-content`

`/draft-content` produces marketing copy tailored to content type, audience, and brand voice. The skill is good at execution given a clear brief. It does not challenge whether the brief is the right brief.

The risk of skipping `brainstorming`:
- Copy optimized for the wrong audience (the person who signs off, not the person who should respond)
- A message hierarchy that leads with features when the audience cares about outcomes
- A call to action that is too weak, too early, or ambiguous about the next step

**The pattern:**
```
brainstorming  →  clarify: who is the primary reader, what do they already believe, what should change, what is the single most important message, what is the one action
draft-content  →  generate: copy tailored to that brief
verification-before-completion  →  check: does the copy serve the brief, does the CTA ask for what was defined in step 1
```

The `brainstorming` session should produce a one-paragraph brief — not a full creative platform, just: audience, what they currently believe, what we want them to believe, one message, one action. That brief is the input to `draft-content`.

---

## End-to-End Workflow Patterns

### Pattern A: Campaign from Brief to Launch

```
sosai-superpowers:outcome-first-thinking
  → Define: conversion metric, target audience, success measurement, timeline

sosai-superpowers:brainstorming
  → Clarify: message hierarchy, key differentiator, primary CTA, tone

marketing:campaign-plan
  → Generate: campaign brief, objectives, messaging, channel strategy, content calendar

sosai-superpowers:dispatching-parallel-agents [if multi-channel]
  → Spin up channel agents: each receives the campaign brief + channel-specific context
    - Agent: email   → marketing:email-sequence
    - Agent: content → marketing:draft-content (blog, landing page)
    - Agent: paid    → marketing:draft-content (ad copy)

sosai-superpowers:source-before-claiming
  → Verify: any competitive claims or market data in the brief traces to verifiable sources

sosai-superpowers:verification-before-completion
  → Check: brand guidelines, legal requirements, accuracy of claims, CTA clarity

sosai-superpowers:requesting-peer-review
  → Brief stakeholder on strategic choices before review, not just hand over a deck

[STAKEHOLDER SIGN-OFF]

sosai-superpowers:finishing-a-task
  → Confirm: launch checklist complete, tracking in place, rollback plan exists

[LAUNCH]
```

---

### Pattern B: Content + SEO Workflow

```
sosai-superpowers:outcome-first-thinking
  → Define: target keyword cluster, target audience, conversion goal for this content

marketing:seo-audit
  → Identify: keyword gaps, on-page issues, competitor content analysis

sosai-superpowers:brainstorming
  → Clarify: primary message, audience intent at this stage of the funnel, single CTA

marketing:draft-content
  → Generate: content draft optimized for target keywords and audience intent

sosai-superpowers:source-before-claiming
  → Verify: any statistics, market claims, or research citations trace to primary sources

sosai-superpowers:verification-before-completion
  → Check: on-page SEO elements (title tag, meta, headings, internal links), brand voice, factual accuracy, legal review if regulated topic

sosai-superpowers:requesting-peer-review [if high-stakes content]
  → Brief subject matter expert on any claims requiring domain validation

[PUBLISH]
```

---

## Gaps: What neither plugin covers

**1. Campaign attribution across channels**
Neither plugin covers the methodology for attributing conversion across a multi-channel campaign — how to split credit between email, paid, and organic when a single user converts after touching multiple channels. This is where campaign planning ends and measurement strategy begins. A skill that asks "how will we attribute conversion before the campaign launches?" would fill this gap.

**2. Audience testing and validation**
Both plugins take the audience definition as an input. Neither challenges whether the defined audience is the right one — whether it is large enough to hit the conversion target, whether it is reachable through the planned channels, whether the assumed beliefs and motivations are accurate. A skill that validates audience assumptions before the campaign is built would catch brief errors earlier.

**3. Content calendar dependency management**
`/campaign-plan` produces a content calendar. Neither plugin covers sequencing dependencies — which content must be live before a campaign email sends, which landing page must be tested before paid traffic starts, which approval must be obtained before a regulated claim can be published. A planning skill that treats the content calendar as a dependency graph rather than a schedule would reduce launch failures.

---

## Installation

Install both plugins in your Claude cowork settings:

```
https://github.com/ciprian-sosai/sosai-superpowers
https://github.com/anthropics/knowledge-work-plugins/tree/main/marketing
```

---

*For the process-layer companion skill that guides this integration at runtime, see `sosai-superpowers:working-with-marketing`.*
