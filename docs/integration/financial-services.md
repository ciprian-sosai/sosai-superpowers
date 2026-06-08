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

## Where sosai-superpowers adds the most value

### High value

**Complex analytical deliverables** — IC memos, initiating coverage reports, CIMs, pitch decks. These require structured problem decomposition, parallel workstreams, and disciplined verification. Every sosai-superpowers skill is relevant.

**Reconciliation and close workflows** — GL reconciliation, NAV tieouts, break tracing. These are canonical systematic-problem-solving scenarios: a discrepancy exists, hypotheses must be formed and tested one at a time. `systematic-problem-solving` before `break-trace` prevents jumping to the first plausible explanation.

**Any client-facing or externally distributed output** — Research notes, client reports, CIMs, investment proposals. `source-before-claiming` here is risk management, not just quality control.

### Low value

**Deterministic mechanical tasks** — `accrual-schedule`, `kyc-doc-parse`, `roll-forward`: data-in/data-out workflows. `verification-before-completion` applies; other process skills do not.

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
