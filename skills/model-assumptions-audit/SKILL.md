---
name: model-assumptions-audit
description: Audits financial models and quantitative analyses by verifying assumption documentation, numerical plausibility, and hardcoded values before delivery. Use after building any DCF, LBO, 3-statement model, returns analysis, budget, or financial projection — and before sharing with a senior reviewer, client, or investment committee.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Model Assumptions Audit

## Overview

A model that produces a number is not the same as a model whose number can be trusted. This skill runs after building and before delivering any financial model or quantitative analysis.

**Three things this checks:**
1. Every key assumption is documented and sourced
2. Every key output passes a basic plausibility check
3. Hardcodes that should be formulas are flagged

**Core principle:** A model is only as reliable as the explainability of its inputs. "I used 8% for WACC" is not documentation. "8% WACC based on CAPM: risk-free rate 4.5% (10-year UST), equity risk premium 5.5% (Damodaran 2024), beta 0.9 (2-year weekly regression)" is documentation.

## When to Use

- After building any DCF, LBO, 3-statement, returns analysis, budget, or financial projection
- After `model-update` on existing models
- Before `verification-before-completion`
- Before any model is shared with a senior reviewer, client, or IC committee

**Position in workflow:**
```
[model skill: dcf-model / lbo-model / returns-analysis / etc.]
  → model-assumptions-audit        ← you are here
  → verification-before-completion
  → [human review gate]
```

## The Three Checks

### Check 1: Assumption Documentation

For every key driver in the model, confirm it is documented with:
- **The value used**
- **The source** (specific data provider, date, filing, report, or explicit judgment call)
- **The rationale** (why this value, not a similar one)

**Key drivers to document in every model type:**

| Model type | Key drivers that must be documented |
|---|---|
| DCF | Revenue growth rate(s), EBITDA margin, WACC components, terminal growth rate, tax rate |
| LBO | Entry multiple, exit multiple, revenue growth, margin improvement, debt structure, interest rate |
| 3-Statement | Revenue build assumptions, COGS drivers, working capital assumptions, capex schedule |
| Returns analysis | Holding period, entry/exit valuation basis, fee assumptions, carried interest terms |
| Financial plan (WM) | Return assumptions by asset class, inflation rate, spending growth, Social Security timing |
| Budget model | Revenue growth drivers, headcount plan, cost escalation assumptions |

**Documentation format to use:**
```
Assumption: [name]
Value: [figure]
Source: [specific source — not "market data" or "industry standard"]
Rationale: [why this value]
Sensitivity: [how much does the output change per 1% / 1x / 100bps change in this assumption?]
```

**Red flags in assumption documentation:**
- "Standard industry assumption" — not a source
- "Per management" without a date or document reference
- "Based on comparable companies" without naming which ones
- Round numbers with no rationale (growth rate of exactly 10%, margin of exactly 20%)
- Assumptions identical to a precedent model without confirming they still apply

---

### Check 2: Numerical Plausibility

Before declaring the model complete, run these sanity checks on key outputs:

**Order-of-magnitude checks**
- Does the revenue figure make sense for a company this size and in this sector?
- Does the EBITDA margin fall within a plausible range for this industry?
- Does the implied valuation multiple (at exit or terminal value) fall within historical ranges for this type of business?
- Is the IRR / MOIC within a range that reflects the risk profile?

**Direction checks**
- If revenue grows, does gross profit grow in the same direction?
- If margins improve, does EBITDA grow faster than revenue?
- If debt is being paid down, does interest expense decrease over time?
- If the business is capital-light, does capex stay proportionally low?

**Balance and linkage checks (3-statement models)**
- Does the balance sheet balance (Assets = Liabilities + Equity)?
- Does cash on the balance sheet match the ending cash on the cash flow statement?
- Does net income flow correctly from the income statement to retained earnings?
- Do changes in working capital on the cash flow statement match balance sheet movements?

**Terminal value reasonableness**
- In a DCF: does terminal value represent a reasonable percentage of total enterprise value? (>80% is a warning sign — the model is almost entirely dependent on assumptions about the distant future)
- Does the implied terminal multiple make sense relative to entry multiples and market comps?

**Presenting findings:**
For each check, state:
- ✓ Plausible — and why
- ⚠ Borderline — note the specific concern
- ✗ Flag — the number does not make sense and needs investigation

---

### Check 3: Hardcode Detection

Hardcoded values that should be formula-driven introduce silent errors when inputs change.

**Flag these patterns:**
- A number in a cell that should reference another cell (e.g., a growth rate typed directly into a revenue line instead of referencing the assumptions tab)
- A sum that manually lists rows instead of using a range (breaks when rows are added)
- A prior-period figure typed in instead of linked (breaks when the period rolls)
- A tax rate, discount rate, or multiple that appears in multiple places as a hardcode (should be a single referenced input)

**Document each hardcode found:**
```
Location: [tab name, cell reference]
Value: [the hardcoded value]
Issue: [what breaks if the underlying assumption changes]
Fix: [link to assumptions tab / use formula instead]
```

---

## Audit Report Format

After completing all three checks, produce:

```
## Model Assumptions Audit

**Model:** [name / type]
**Date:** [today]
**Auditor:** [Claude]

### Assumption Documentation
[List each key driver with documentation status: ✓ Documented / ⚠ Partial / ✗ Missing]

Gaps:
- [List any assumptions lacking source or rationale]

### Numerical Plausibility
[List each check with result: ✓ / ⚠ / ✗]

Flags:
- [List any numbers that do not pass plausibility checks, with specific concern]

### Hardcode Detection
[List any hardcoded values that should be formula-driven]

### Summary
**Ready to proceed to verification:** Yes / No — fix [N] items first

**Items requiring human judgment:**
- [List any plausibility concerns that require domain expertise to assess]
```

## Examples

**Example 1: DCF model pre-delivery review**
User: "I just finished the DCF for the Meridian acquisition. Can you run the assumptions audit before I send it to the IC?"
Applied: The skill checks that every key driver (WACC components, revenue growth, terminal growth rate, tax rate) is sourced and rationale-documented, runs order-of-magnitude and direction checks on outputs, and scans for hardcoded rates or multiples.
Result: An audit report flagging two undocumented assumptions and one hardcoded discount rate that appears in three separate cells.

**Example 2: LBO model after a late-stage update**
User: "We updated the debt structure this morning. Run the audit before the 4pm call."
Applied: The skill re-checks all affected drivers — interest rate, debt schedule, and exit multiple — for documentation completeness, verifies that EBITDA coverage and IRR still fall within plausible ranges, and confirms no new hardcodes were introduced during the edit.
Result: A focused audit report showing one direction-check flag (interest expense not declining with paydown) that needs investigation before the call.

**Example 3: Budget model for board presentation**
User: "The annual budget model is done. Audit it before it goes to the board deck."
Applied: The skill verifies that revenue growth drivers, headcount assumptions, and cost escalation rates are each documented with a specific source, checks that margin direction is consistent with the revenue build, and flags any manually typed prior-period figures.
Result: Audit report with a summary line confirming readiness or listing the exact items to fix before the board submission.

## Troubleshooting

**Audit says "documented" but the source is just "per management" or "industry standard"**
These are not valid sources. The audit should flag them as partial at best. Push back on the assumption owner for a specific document, date, or named data provider before accepting.

**Plausibility checks pass but the number still feels wrong**
The skill checks against ranges and direction — it cannot substitute for domain expertise. Escalate to a senior reviewer or sector specialist when a figure is within range but inconsistent with what you know about the specific business.

**The balance sheet balances, so the hardcode detection seems unnecessary**
Balance sheet balance does not mean formulas are correct. A hardcoded figure can match the right answer today and silently break on the next model update. Run hardcode detection regardless of whether the output looks clean.

**Model was built from a template and most assumptions are pre-filled**
Templates carry prior-deal assumptions. Every driver must be re-verified for the current transaction. Pre-filled does not mean documented or applicable.

**Audit is run but findings are not resolved before sharing the model**
The audit report is not a disclosure — it is a fix list. Items marked with a flag or warning must be resolved before delivery, not attached as a caveat.

## Red Flags

| Thought | Reality |
|---|---|
| "The model came from a template so assumptions are fine" | Templates carry prior-project assumptions. Verify every driver applies to this deal. |
| "The number looks reasonable" | Looking reasonable is not a plausibility check. Check against industry data. |
| "Assumptions are documented in the email thread" | If it's not in the model, it doesn't exist for the next person who opens it. |
| "The balance sheet balances so the model is correct" | Balance sheet balance is necessary but not sufficient. Check direction and magnitude too. |
| "We can document assumptions after the review" | Reviewers need documented assumptions to evaluate the model. Document first. |
