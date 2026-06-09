# Integration Guide: sosai-superpowers + sales

sosai-superpowers governs **how** to work. The sales plugin governs **what** to do in a sales workflow. They operate at different layers and compose cleanly.

**The pattern:**
```
sosai-superpowers  →  clarify intent, define the target outcome
sales              →  execute the sales workflow
sosai-superpowers  →  verify before it reaches the prospect
```

---

## When to use sosai-superpowers — and when to skip it

### The redundancy question

The sales plugin already asks clarifying questions. `/account-research` asks which company, `/draft-outreach` asks which product and persona. If sosai-superpowers also runs `outcome-first-thinking` first, you may answer overlapping questions twice. That is friction, not value.

**The distinction:** domain plugin questions ask *what* (which company, which product, which persona). sosai-superpowers questions ask *whether* and *why* (have we defined the ONE action we want the prospect to take, are we solving the right problem with this outreach, does the claim in this asset trace to a verifiable source). They are not the same question.

### The handoff question

In the same cowork session, context is shared — it is the conversation thread. If you run `outcome-first-thinking` and surface "we want a discovery call booked, not a demo," that is in context when `/draft-outreach` runs. There is no formal structured handoff, but the information is there.

For subagents (if using `dispatching-parallel-agents`): subagents do not inherit session context. Key findings from clarification must be explicitly included in the subagent prompt — they do not transfer automatically.

### Use sosai-superpowers when the task is ambiguous, high-stakes, or already failing

| Situation | Use sosai-superpowers | Why |
|---|---|---|
| About to draft outreach without a defined goal | `outcome-first-thinking` | "What is the ONE action I want this prospect to take?" — AIDA without a defined outcome produces good-sounding but unfocused copy |
| Research before first outreach or call | `research-before-acting` | Frame "what do I already know and what do I need?" before running account research — surfaces targeted questions rather than generic intel |
| Competitive claims in a battlecard or sales asset | `source-before-claiming` | Every claim must trace to a verifiable source — false competitive claims are a legal and credibility risk |
| Deal is stalling with no clear reason | `systematic-problem-solving` | Investigate WHY before re-engaging: is it budget, champion, competition, timing, or wrong problem fit? |
| External asset about to go to a prospect | `verification-before-completion` | Check claims, pricing, positioning, and competitive references before the asset reaches the prospect |
| Multiple outreach attempts with no response | `systematic-problem-solving` | Multiple failed attempts signal a structural problem — wrong persona, wrong message, wrong timing — not just bad copy |

### Skip sosai-superpowers when the task is routine and well-defined

| Situation | Just use the domain skill | Why |
|---|---|---|
| Daily pipeline review and prioritization | `/pipeline-review` directly | Routine structured analysis, no ambiguity in scope |
| Logging and summarizing a completed call | `/call-summary` directly | Deterministic extraction from known inputs — notes in, action items out |
| Pulling a forecast with known inputs | `/forecast` directly | No judgment required when inputs and method are established |
| Daily briefing with no strategic questions | `/daily-briefing` directly | Aggregation task, no clarification needed |

### High value

**Research before first outreach** — `research-before-acting` before `account-research` forces the question: what do I already know about this company, what gap in knowledge would actually change my approach, and what would I do with the answer? Without this framing, `account-research` produces comprehensive but generic intel. With it, the research is targeted at the specific unknowns that matter for this deal.

**Outcome definition before draft outreach** — `outcome-first-thinking` before `draft-outreach` produces a single concrete answer: "The ONE action I want this prospect to take is X." AIDA without a defined outcome produces outreach that sounds good but asks the prospect to do too many things or nothing specific. The clarification takes two minutes; the difference in response rate is not marginal.

**Verification before any prospect-facing asset** — `verification-before-completion` before `create-an-asset` catches claims that are outdated, unsourced, or competitively inaccurate before they reach the prospect. A pricing error or false competitive claim in a leave-behind is harder to walk back than it is to catch before it goes out.

### Low value

**Routine call summary processing** — Extracting action items and drafting a follow-up from call notes. The domain skill handles this end to end with no ambiguity.

**Standard forecast pulls** — Generating a weighted forecast when inputs (deal stages, amounts, close dates) are already defined and up to date. No clarification or verification step adds value here.

---

## Quick Reference: Which sosai-superpowers skill wraps which sales workflow

| Sales workflow stage | sosai-superpowers skill | Why |
|---|---|---|
| Before any research task | `research-before-acting` | Frame what you need to know before gathering intel — prevents generic research |
| Before drafting any outreach or asset | `outcome-first-thinking` | Define the single desired action before writing anything |
| Any competitive claim in battlecard or asset | `source-before-claiming` | Every claim must trace to a verifiable source |
| Multi-step prospecting or deal campaign | `writing-plans` | Structure the sequence before executing it |
| Deal stalling or multiple failed attempts | `systematic-problem-solving` | Root cause investigation before re-engaging |
| Before any asset goes to a prospect | `verification-before-completion` | Claims, pricing, positioning, competitive references — check before sending |
| Before a strategic call with an executive | `requesting-peer-review` | Brief a colleague on your approach before the call, not after |
| After receiving feedback on outreach or assets | `receiving-peer-review` | Process feedback systematically, not selectively |

---

## The three most important pairings

### 1. `research-before-acting` + `account-research`

`account-research` is a capable domain skill. Run it without framing and it returns comprehensive company intel — financials, news, leadership, tech stack. That intel is accurate but generic. You do not know what you are looking for, so you get everything.

`research-before-acting` enforces a prior step: what do you already know, what specific gap in knowledge would actually change your outreach angle, and what would you do with each answer? This transforms `account-research` from a background-gather into a targeted investigation.

**The pattern:**
```
research-before-acting  →  frame the specific unknowns that matter for this deal
account-research        →  gather targeted intel on those unknowns
outcome-first-thinking  →  define the single action you want the prospect to take
draft-outreach          →  write with a known target and specific supporting intel
```

The difference between generic intel and targeted intel is often one question asked before the research starts.

### 2. `outcome-first-thinking` + `draft-outreach`

AIDA (Attention, Interest, Desire, Action) is the structural framework behind `draft-outreach`. It is a sound framework. The failure mode is not the framework — it is the A at the end. If you have not defined what specific action you want the prospect to take, the Action step becomes vague: "let me know if you'd like to connect," "happy to share more," "would love to chat."

`outcome-first-thinking` produces one concrete answer before any copy is written: "The ONE action I want this prospect to take is to book a 30-minute discovery call via this calendar link by Friday." That single answer determines the specificity of every sentence that precedes it.

**The pattern:**
```
outcome-first-thinking  →  define the single desired action, the deadline, and the ask
research-before-acting  →  identify what intel changes the outreach angle
account-research        →  gather targeted intel
draft-outreach          →  write toward the defined outcome with specific supporting context
verification-before-completion  →  confirm the ask is clear and the claims are accurate
```

### 3. `source-before-claiming` + `competitive-intelligence` / `create-an-asset`

Battlecards and sales assets routinely contain competitive claims: "unlike Competitor X, we do not charge for Y," "our implementation time is 40% faster," "Competitor X had a data breach in 2023." Each of these claims, if false or unsourced, is a liability — legal exposure, prospect credibility loss, or both.

`source-before-claiming` runs a check on every claim in the output before it is delivered: does this trace to a specific, verifiable source? If not, it either gets sourced or removed.

**The pattern:**
```
competitive-intelligence / create-an-asset  →  generate the battlecard or asset
source-before-claiming                      →  trace every claim to a specific source
verification-before-completion              →  final check before sending to prospect
```

This is not a perfectionistic step. It is the minimum bar for any output that will be used in a sales conversation or left with a prospect.

---

## End-to-End Workflow Patterns

### Pattern A: New Prospect Outreach Sequence

```
sosai-superpowers:outcome-first-thinking
  → Define: the ONE action you want the prospect to take, and by when

sosai-superpowers:research-before-acting
  → Frame: what you already know, what specific gaps would change your approach

sales:account-research
  → Gather: targeted intel on the framed unknowns

[If competitive context needed:]
sales:competitive-intelligence
  → Generate battlecard / competitive positioning
sosai-superpowers:source-before-claiming
  → Verify every competitive claim traces to a source

sales:draft-outreach
  → Write: outreach toward the defined outcome with supporting intel

sosai-superpowers:verification-before-completion
  → Check: the ask is specific, the claims are accurate, the CTA matches the defined outcome

[SEND]
```

---

### Pattern B: Deal Review / Forecast Cycle

```
sosai-superpowers:outcome-first-thinking
  → Define: what decision does this forecast need to support? (pipeline call, QBR, board update?)

sales:pipeline-review
  → Analyze: deal health, risk flags, priority actions

[If deals are stalling:]
sosai-superpowers:systematic-problem-solving
  → Investigate: is the stall budget, champion, competition, timing, or problem fit?
  → Do not re-engage with a new angle before the root cause is known

sales:forecast
  → Generate: weighted forecast with best/likely/worst scenarios

sosai-superpowers:source-before-claiming
  → Verify: deal amounts, close dates, and stage assumptions are current and sourced
  → Do not present a forecast built on stale inputs as current

[If deal assets need refreshing for re-engagement:]
sales:create-an-asset
  → Generate: updated asset for the specific deal context
sosai-superpowers:verification-before-completion
  → Check: claims, pricing, competitive references before the asset reaches the prospect

sosai-superpowers:requesting-peer-review
  → Brief: manager or colleague on judgment calls (deal classifications, at-risk accounts) before the pipeline call

[PIPELINE CALL / QBR / BOARD UPDATE]
```

---

## Gaps: What neither plugin covers

**1. Persona and ICP validation**
Neither plugin has a skill for checking whether the target persona for an outreach campaign matches the actual buyer profile for recent closed-won deals. Outreach calibrated against the wrong ICP is a structural problem that better copy does not fix. A skill that asks "does this persona match your recent wins?" before drafting would fill this gap.

**2. Message sequence fatigue tracking**
`draft-outreach` produces individual messages. Neither plugin tracks whether a prospect has already received multiple touches in the current sequence, or whether the current message is the third in a series that has gone unanswered. Context about sequence position and prior engagement would change the strategy, not just the copy.

**3. Win/loss root cause analysis**
`pipeline-review` and `forecast` analyze current pipeline. Neither plugin has a systematic skill for analyzing closed-lost deals to surface patterns — why deals are lost, at which stage, to which competitors, for which reasons. `systematic-problem-solving` can fill part of this gap, but a dedicated closed-lost analysis workflow does not exist in either plugin.

---

## Installation

Install both plugins in your Claude cowork settings:

```
https://github.com/ciprian-sosai/sosai-superpowers
https://github.com/anthropics/knowledge-work-plugins/tree/main/sales
```

---

*For the process-layer companion skill that guides this integration at runtime, see `sosai-superpowers:working-with-sales`.*
