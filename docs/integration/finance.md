# Integration Guide: sosai-superpowers + finance

sosai-superpowers governs **how** to work. The finance plugin governs **what** to do in corporate accounting. They operate at different layers and compose cleanly.

**The pattern:**
```
sosai-superpowers  →  clarify scope, define success criteria
finance            →  execute the accounting workflow
sosai-superpowers  →  verify before posting, sign-off, or distribution
```

---

## Quick Reference: Which sosai-superpowers skill wraps which accounting workflow

| Accounting workflow stage | sosai-superpowers skill | Why |
|---|---|---|
| Starting any close, audit, or analysis task | `outcome-first-thinking` | Define period, scope, entities in scope, and sign-off owner before touching any tool |
| Before research or background gathering | `research-before-acting` | Understand prior-period treatment, policy context before producing entries or analysis |
| Any output distributed to management or auditors | `source-before-claiming` | Every figure in a variance bridge, financial statement, or audit workpaper must trace to a source |
| Multi-step close workflow | `writing-plans` | Structure the close checklist before executing it; catch dependency and sequencing problems early |
| Multi-entity or multi-period work | `context-isolation` | Prevent prior-period or prior-entity context bleeding between workstreams |
| Reconciliation breaks or unexplained variances | `systematic-problem-solving` | Root cause investigation before attempting any adjustment |
| Before posting any journal entry | `verification-before-completion` | Check period, account code, department coding, reversal flag, approval level — before the entry goes live |
| Before controller or auditor sign-off | `requesting-peer-review` | Brief the reviewer on judgment calls, not just hand over a workpaper |
| After receiving review feedback | `receiving-peer-review` | Process all feedback systematically |

---

## Where sosai-superpowers adds the most value

### High value

**Month-end close coordination** — `close-management` covers the framework; sosai-superpowers skills handle the process discipline: `outcome-first-thinking` to define the close scope, `context-isolation` between entity workstreams, `verification-before-completion` before period lock.

**Reconciliation break investigation** — Any unreconciled item is a structured problem: a discrepancy exists, its cause is unknown, multiple explanations are plausible. `systematic-problem-solving` before `reconciliation` enforces root cause investigation before any adjustment.

**Management reporting and variance commentary** — `variance-analysis` output goes to management. `source-before-claiming` ensures every bridge figure traces to a source. Unsourced variance commentary is worse than none — it creates false confidence in wrong attribution.

**SOX workpaper documentation** — `verification-before-completion` before `sox-testing` deliverables confirms all required evidence fields are populated and deficiency classifications are supported before the workpaper goes to the auditor.

### Low value

**Routine entry posting** — Standard, low-judgment entries (recurring depreciation, straight-line amortization) where the calculation is deterministic and the review is simple. `verification-before-completion` applies; other process skills do not.

**Standard report generation** — Pulling a pre-formatted financial statement with no material variances. Minimal process overhead needed.

---

## The three most important pairings

### 1. `systematic-problem-solving` + `reconciliation`

GL reconciliation breaks are the canonical structured accounting problem: a discrepancy exists, the cause is unknown, and the wrong first response is to start adjusting. The risk of jumping straight to adjustments:
- Fixing a symptom (timing difference) when the cause is an unrecorded transaction
- Creating a new imbalance with the correcting entry
- Closing the period with the real issue unresolved

**The pattern:**
```
systematic-problem-solving  →  state the break precisely, trace the chain
reconciliation              →  execute targeted investigation
systematic-problem-solving  →  form single hypothesis, test minimally
verification-before-completion  →  confirm break resolved before period lock
```

The `reconciliation` skill's 3-tier classification (timing / adjustment required / investigation) maps directly onto systematic-problem-solving phases: timing differences are Phase 2 (pattern analysis), "adjustment required" is Phase 4 (fix), "requires investigation" is Phase 1 (root cause).

### 2. `source-before-claiming` + `variance-analysis`

Variance commentary distributed to management or included in board packages carries significant weight. Attribution errors ("revenue shortfall was pricing" when it was actually volume) affect decisions made on that data. Every driver in a variance bridge must trace to a specific source — a line item in the GL, a headcount report, a rate table — not to inference or pattern recognition.

`source-before-claiming` enforces this before `variance-analysis` output leaves the team.

### 3. `verification-before-completion` as the pre-posting gate for journal entries

The `journal-entry` skill generates technically correct entries. `verification-before-completion` is the check that confirms:
- Correct accounting period (not the prior period still open)
- Correct account codes (not a similar account code for a different entity)
- Department coding applied
- Reversal flag set if required
- Approval level matches the transaction amount (from `journal-entry-prep`'s approval matrix)
- Supporting documentation referenced

A posting error in month-end is expensive: it requires a correcting entry, may affect financial statements already distributed, and leaves an audit trail question. The 2-minute verification check is cheaper than the 2-hour correction.

---

## End-to-End Workflow Patterns

### Pattern A: Month-End Close

```
sosai-superpowers:outcome-first-thinking
  → Define: close date, entities in scope, sign-off owner, materiality threshold

sosai-superpowers:writing-plans
  → Structure: close checklist by dependency level, task owners, deadlines

sosai-superpowers:context-isolation
  → Explicitly isolate each entity's context if multi-entity close

finance:close-management
  → Execute 5-day close cycle

finance:journal-entry-prep + finance:journal-entry
  → Generate and review month-end entries by type

sosai-superpowers:verification-before-completion (per entry type)
  → Check period, account codes, reversal flags, approval level before posting

finance:reconciliation
  → GL-to-subledger, bank, intercompany

[If breaks:]
sosai-superpowers:systematic-problem-solving
  → Root cause investigation before any adjustment
finance:reconciliation
  → Re-run after targeted fix

finance:financial-statements
  → Generate comparative statements

finance:variance-analysis
  → Decompose material variances

sosai-superpowers:source-before-claiming
  → Verify every bridge figure traces to a source before distribution

sosai-superpowers:requesting-peer-review
  → Brief controller on judgment calls before sign-off

[CONTROLLER SIGN-OFF]

sosai-superpowers:finishing-a-task
  → Period lock, distribution, change log
```

---

### Pattern B: Variance Analysis for Management Reporting

```
sosai-superpowers:outcome-first-thinking
  → Define: audience (CFO / board / operations), decision they need to make, materiality threshold

sosai-superpowers:research-before-acting
  → Gather: prior period actuals, budget assumptions, known one-time items

finance:variance-analysis
  → Decompose: price/volume/mix/rate, headcount, by segment

sosai-superpowers:source-before-claiming
  → Verify: every driver in the bridge has a traceable source

sosai-superpowers:verification-before-completion
  → Check: bridge ties to P&L, drivers sum correctly, narrative matches numbers

sosai-superpowers:requesting-peer-review
  → Ask FP&A lead to check attribution logic before distribution

[MANAGEMENT DISTRIBUTION]
```

---

### Pattern C: SOX 404 Testing

```
sosai-superpowers:outcome-first-thinking
  → Define: control areas in scope, testing period, auditor timeline

sosai-superpowers:writing-plans
  → Structure: testing schedule by control area, sample timing, documentation deadlines

finance:audit-support
  → Apply methodology: scope → assess → identify → test → evaluate

finance:sox-testing [for each control area]
  → Generate workpapers, select samples, document results

sosai-superpowers:systematic-problem-solving [if deficiency found]
  → Root cause: is this a design deficiency or operating effectiveness failure?

sosai-superpowers:verification-before-completion (per control area)
  → Confirm: all evidence fields populated, deficiency classification supported, sign-off obtained

sosai-superpowers:requesting-peer-review
  → Brief audit lead on judgment calls (classification of significant deficiencies) before submission

[AUDITOR SUBMISSION]
```

---

## Gaps: What neither plugin covers

**1. Cut-off discipline enforcement**
Neither plugin enforces the discipline of checking whether a transaction belongs in the current period before recording it. Cut-off errors are among the most common month-end errors and the most consequential for financial statements. A skill that asks "does this transaction meet the recognition criteria for this period?" before any entry is posted would fill this gap.

**2. Intercompany elimination documentation**
The `reconciliation` skill covers intercompany balance matching. Neither plugin covers the documentation trail for intercompany eliminations in consolidation — which entities eliminated what, at what rate, with what support. This becomes an audit question in complex organizational structures.

**3. Approval workflow tracking**
The `journal-entry-prep` approval matrix defines who should approve at what threshold. Neither plugin has a skill for tracking whether required approvals were actually obtained and documented before posting.

---

## Installation

Install both plugins in your Claude cowork settings:

```
https://github.com/ciprian-sosai/sosai-superpowers
https://github.com/anthropics/knowledge-work-plugins/tree/main/finance
```

---

*For the process-layer companion skill that guides this integration at runtime, see `sosai-superpowers:working-with-finance`.*
