# Integration Guide: sosai-superpowers + financial-services

sosai-superpowers governs **how** to work. financial-services governs **what** to do in finance. They operate at different layers and compose cleanly — one wraps the other.

**The core pattern:**
```
sosai-superpowers  →  clarify scope, write plan, verify output
financial-services →  build the financial work
sosai-superpowers  →  verify before human review
```

financial-services stages every output for human review. sosai-superpowers is what makes the artifact complete, internally consistent, and sourced **before** it reaches the human reviewer — so reviewers apply judgment rather than catch errors.

---

## Quick Reference: Which sosai-superpowers skill wraps which financial workflow

| Financial workflow stage | sosai-superpowers skill | Why |
|---|---|---|
| Starting any financial task | `brainstorming` | Surface assumptions about scope, audience, and objective before producing anything |
| Before modeling or analysis | `outcome-first-thinking` | Define what a correct result looks like before the first formula or paragraph |
| Before research-heavy work | `research-before-acting` | Understand sector, company, and context before producing analysis |
| Any output with numbers, rates, or statistics | `source-before-claiming` | Every figure must trace to a source — compliance and credibility depend on it |
| Multi-step financial workflows | `writing-plans` | Structure the deliverable before building it; catch scope problems early |
| Parallel deliverables (model + deck + memo) | `dispatching-parallel-agents` | Run independent workstreams simultaneously |
| Fund admin / multi-entity work | `context-isolation` | Prevent fund, share class, and period context from bleeding between workstreams |
| Reconciliation failures or model errors | `systematic-problem-solving` | Find root cause before attempting fixes |
| Before claiming any financial output is done | `verification-before-completion` | Check against original brief before the human review gate |
| Before senior/compliance/IC review | `requesting-peer-review` | Brief the reviewer on key judgment calls, not just hand over a file |
| After receiving review feedback | `receiving-peer-review` | Process all feedback systematically |

---

## When to use sosai-superpowers — and when to skip it

### The redundancy question

financial-services skills already ask clarifying questions at the start of each workflow. `ic-memo` asks about the deal thesis and IC decision criteria. `initiating-coverage` asks about the investment question and rating thesis. If sosai-superpowers also runs `brainstorming` or `outcome-first-thinking` first, you answer overlapping questions twice. That is friction, not value.

**The distinction:** domain skill questions ask *what* (deal thesis, entry multiple, rating). sosai-superpowers questions ask *whether* and *why* (are we solving the right problem, have we confirmed the audience, is the scope correct before we build anything). They are not the same question.

### The handoff question

In the same cowork session, context is shared — it is the conversation thread. If `brainstorming` surfaces "the IC needs to decide by Friday and the key risk is management depth, not financials," that is in context when `ic-memo` runs. There is no formal structured handoff, but the information is there.

For subagents (when using `dispatching-parallel-agents` to run `cim-builder`, `datapack-builder`, and `teaser` in parallel): subagents do not inherit session context. Key findings from brainstorming — deal positioning, audience, consistency requirements — must be explicitly included in each subagent prompt. They do not transfer automatically.

### Use sosai-superpowers when the task is ambiguous, high-stakes, or already failing

| Situation | Use sosai-superpowers | Why |
|---|---|---|
| IC memo where the thesis is unclear | `brainstorming` + `outcome-first-thinking` | Surface what the IC actually needs to decide before building the memo |
| Parallel deliverables (CIM + deck + teaser) | `dispatching-parallel-agents` | Consistency across documents requires explicit coordination — the domain skills run independently |
| NAV tieout break after a previous fix attempt | `systematic-problem-solving` | The domain skill investigates; this enforces the discipline of root cause before another fix |
| Research note with figures from multiple sources | `source-before-claiming` | Legal and compliance exposure — the domain skill produces the note but does not enforce citation |
| LBO or DCF model going to IC or client | `model-assumptions-audit` | Assumption documentation and plausibility — neither plugin covers this |
| Deliverable scope is unclear before starting | `brainstorming` | Clarify audience, page count, what "done" looks like — before the domain skill generates anything |

### Skip sosai-superpowers when the task is routine and well-defined

| Situation | Just use the domain skill | Why |
|---|---|---|
| Updating a model with new earnings data | `model-update` directly | Known inputs, known outputs, no scope ambiguity |
| KYC document parsing | `kyc-doc-parse` directly | Deterministic extraction, no judgment required |
| Rolling forward a fund period with no breaks | `roll-forward` directly | Mechanical, domain skill handles it end to end |
| Refreshing a deck with updated numbers | `deck-refresh` directly | Refinement task, no new scope or judgment |
| Pulling a standard accrual schedule | `accrual-schedule` directly | Calculation task, no ambiguity |

### High value

**Complex analytical deliverables** — IC memos, initiating coverage reports, CIMs, pitch decks. The domain skill generates the artifact; sosai-superpowers ensures the scope is correct before it starts and the output is complete before it reaches reviewers.

**Reconciliation and close workflows** — GL reconciliation, NAV tieouts, break tracing. `systematic-problem-solving` fills the gap the domain skill leaves: it does not ask whether you have correctly identified the problem before attempting a fix.

**Any client-facing or externally distributed output** — Research notes, client reports, CIMs, investment proposals. `source-before-claiming` is risk management. The domain skill produces the content; this enforces citation discipline before it leaves the desk.

### Low value

**Deterministic mechanical tasks** — `accrual-schedule`, `kyc-doc-parse`, `roll-forward`: data-in/data-out workflows. `verification-before-completion` applies if the output is material; other process skills do not.

**Template completion** — `deck-refresh`, `clean-data-xls`, `audit-xls`: refinement tasks on existing artifacts. `verification-before-completion` only.

---

## The three most important pairings

### 1. `source-before-claiming` + any externally distributed financial output

Every number in equity research, CIMs, client reports, and wealth management proposals carries legal and compliance weight. Unsourced revenue figures in a CIM can constitute misrepresentation. Unsourced estimates in research can trigger disclosure issues. `source-before-claiming` enforces citation discipline at the point of content generation — before anything reaches compliance review.

**Most critical surfaces:** earnings-analysis, morning-note, initiating-coverage, cim-builder, investment-proposal, client-report

### 2. `systematic-problem-solving` before `break-trace` or `gl-recon`

GL reconciliation breaks are the canonical structured problem: a discrepancy exists, its cause is unknown, multiple hypotheses are plausible. Without systematic investigation, the risk is fixing the first plausible cause without confirming it's the real one — and the break recurs.

**The pattern:**
```
systematic-problem-solving  →  state the break precisely, trace the chain
break-trace                 →  execute the investigation
systematic-problem-solving  →  form single hypothesis, test minimally
gl-recon / nav-tieout       →  verify the fix held
```

### 3. `verification-before-completion` as the pre-gate before every human review stage

financial-services positions outputs for human review. `verification-before-completion` makes the output worth reviewing — checks completeness, internal consistency, and assumption sourcing before the artifact reaches the reviewer.

**Without it:** the human reviewer becomes an error-catcher instead of a judgment-applier.

**With it:** the reviewer receives a complete artifact and can focus on the investment thesis, deal positioning, or accounting judgment — not missing sections or inconsistent numbers.

---

## End-to-End Workflow Patterns

### Pattern A: Investment Committee Memo (Private Equity)

```
sosai-superpowers:brainstorming
  → Clarify: deal thesis, risk surface, missing data, IC decision criteria

sosai-superpowers:outcome-first-thinking
  → Define: what does the IC need to decide? what threshold makes it a yes?

sosai-superpowers:research-before-acting
  → Gather: sector data, comp transactions, management background

sosai-superpowers:writing-plans
  → Structure: memo sections, depth per section, what needs sourcing

private-equity:dd-checklist
  → Generate diligence workplan

sosai-superpowers:dispatching-parallel-agents [
    private-equity:unit-economics
    private-equity:returns-analysis
    private-equity:ai-readiness
  ]
  → Run independent diligence workstreams simultaneously

private-equity:ic-memo
  → Draft the memo from all gathered inputs

sosai-superpowers:verification-before-completion
  → Check: all sections present, assumptions stated, risks acknowledged, numbers sourced

sosai-superpowers:requesting-peer-review
  → Brief the senior reviewer on key judgment calls before they open the doc

[HUMAN REVIEW GATE — IC committee]

sosai-superpowers:receiving-peer-review
  → Process committee feedback systematically

sosai-superpowers:finishing-a-task
  → Final version with change log
```

---

### Pattern B: Equity Research Initiation

```
sosai-superpowers:outcome-first-thinking
  → Define: what is the investment question? what would change the rating?

sosai-superpowers:research-before-acting
  → Read: recent filings, earnings transcripts, competitor moves, consensus estimates

sosai-superpowers:source-before-claiming
  → Catalog: all data sources before writing any numbers

sosai-superpowers:writing-plans
  → Structure: thesis (bull/base/bear), key debates, catalysts, valuation section

equity-research:model-update
  → Update financial model with latest data

equity-research:initiating-coverage
  → Write the initiation note

sosai-superpowers:verification-before-completion
  → Check: all estimates sourced, thesis internally consistent, no contradictions

sosai-superpowers:requesting-peer-review
  → Ask senior analyst to check thesis logic (not the numbers)

[COMPLIANCE REVIEW GATE]

sosai-superpowers:receiving-peer-review
sosai-superpowers:finishing-a-task
```

---

### Pattern C: Fund Close / NAV Tieout

```
sosai-superpowers:outcome-first-thinking
  → Define: close date, fund entities in scope, tolerance thresholds, sign-off owner

sosai-superpowers:systematic-problem-solving
  → Frame: expected vs. actual for each reconciliation item before touching any tool

sosai-superpowers:context-isolation
  → Explicitly isolate each fund entity's context — fund, share class, period, currency

sosai-superpowers:executing-plans
  → Follow the close checklist in order; confirm each step before proceeding

fund-admin:roll-forward        → Build period roll-forward
fund-admin:gl-recon            → Reconcile GL to subledger
fund-admin:nav-tieout          → Tie NAV to investor records

[If breaks exist:]
sosai-superpowers:systematic-problem-solving
  → Form single hypothesis about the break; test minimally
fund-admin:break-trace
  → Execute targeted investigation

fund-admin:variance-commentary
  → Document all variances with explicit source references

sosai-superpowers:verification-before-completion
  → Confirm: zero open breaks, all variances explained, all sources cited

[CONTROLLER / AUDITOR REVIEW GATE]

sosai-superpowers:finishing-a-task
```

---

### Pattern D: M&A Marketing Materials (Investment Banking)

```
sosai-superpowers:outcome-first-thinking
  → Define: buyer audience, deal positioning, page count, what "done" looks like

sosai-superpowers:brainstorming
  → Surface: equity story angles, key value drivers, risk mitigants, buyer universe hypotheses

sosai-superpowers:research-before-acting
  → Gather: company financials, market data, comp transactions, management track record

sosai-superpowers:source-before-claiming
  → Catalog: all financial sources before any document is drafted

sosai-superpowers:writing-plans
  → Structure: CIM sections, page targets, data dependencies

sosai-superpowers:dispatching-parallel-agents [
    investment-banking:cim-builder
    investment-banking:datapack-builder
    investment-banking:teaser
    investment-banking:buyer-list
  ]
  → Run all four in parallel (same data, different audiences)

sosai-superpowers:verification-before-completion
  → Check: all four documents use consistent numbers and consistent story

sosai-superpowers:requesting-peer-review
  → Brief the MD on positioning judgment calls, not grammar

[LEGAL / COMPLIANCE REVIEW GATE]

sosai-superpowers:receiving-peer-review
sosai-superpowers:finishing-a-task
```

---

## Gaps: What neither plugin covers

These are genuine gaps in the combined stack. Consider building skills for them:

**1. Numerical sanity checking**
Neither plugin has a skill for order-of-magnitude reasoning: "Is this revenue figure plausible for a company this size? Does this EBITDA margin make sense for this industry?" This is high-frequency in financial modeling. See `sosai-superpowers:model-assumptions-audit` (a companion skill to this integration).

**2. Assumption documentation**
Financial models require explicit assumption logs — where did this growth rate come from, why this discount rate. `source-before-claiming` covers prose claims; it does not cover model parameters. A dedicated assumption audit step is missing from both plugins.

**3. Stakeholder escalation scaffolding**
Neither plugin addresses how to frame bad news upward (a deal with problems, a model that doesn't support the thesis, a break that can't be traced). This is a high-stakes communication skill in finance with no coverage.

**4. Version and iteration management**
Financial deliverables go through many drafts under client pressure. There is no skill for managing "what changed between v3 and v4," deciding when a model needs a structural rebuild vs. an update, or tracking why a number changed.

---

## Installation

Install both plugins in your Claude cowork settings:

```
https://github.com/ciprian-sosai/sosai-superpowers
https://github.com/anthropics/financial-services
```

Both load automatically. sosai-superpowers skills activate at the process level; financial-services skills activate at the domain level. They do not conflict.

---

*For the process-layer companion skill that guides this integration at runtime, see `sosai-superpowers:working-with-financial-services`.*
