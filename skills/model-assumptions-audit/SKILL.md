---
name: model-assumptions-audit
description: Use after building any financial model or quantitative analysis — before delivering — to verify key assumptions are documented, outputs are numerically plausible, and nothing is hardcoded that should be formula-driven
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

## Red Flags

| Thought | Reality |
|---|---|
| "The model came from a template so assumptions are fine" | Templates carry prior-project assumptions. Verify every driver applies to this deal. |
| "The number looks reasonable" | Looking reasonable is not a plausibility check. Check against industry data. |
| "Assumptions are documented in the email thread" | If it's not in the model, it doesn't exist for the next person who opens it. |
| "The balance sheet balances so the model is correct" | Balance sheet balance is necessary but not sufficient. Check direction and magnitude too. |
| "We can document assumptions after the review" | Reviewers need documented assumptions to evaluate the model. Document first. |
