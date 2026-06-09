---
name: working-with-small-business
description: Maps sosai-superpowers process skills to each stage of a small business operations workflow — clarifying the business situation, planning before acting, verifying financial outputs, and reviewing before sending — in the correct sequence. Use when working with the Anthropic small-business plugin to know which sosai-superpowers skills wrap each stage of a small business operations workflow and in what order.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Working with small-business

## Overview

sosai-superpowers and small-business operate at different layers and compose cleanly. The small-business plugin handles the day-to-day operations of running a business — cash flow, payroll, contracts, invoices, customer relationships, and close processes. sosai-superpowers ensures the business context is understood before acting, financial outputs are plausible before being relied upon, and anything sent to customers, staff, or advisors is verified first.

**The pattern:**
```
sosai-superpowers  →  clarify situation, define what good looks like  (before the business work)
small-business     →  run the operation, produce the deliverable      (the business work)
sosai-superpowers  →  verify outputs before they leave the business   (before distribution)
[SEND / SIGN / CLOSE GATE]
```

## Which skill wraps which stage

| When | sosai-superpowers skill |
|---|---|
| Starting any ambiguous business task | `brainstorming` |
| Before financial forecasts or planning | `outcome-first-thinking` |
| Before quarterly review or major business decision | `research-before-acting` |
| Any output with financial figures, customer data, or statistics | `source-before-claiming` |
| Multi-step business process (close month, quarterly review) | `writing-plans` |
| After any cash flow forecast or financial model | `model-assumptions-audit` |
| Before sending to a customer, lender, advisor, or regulator | `verification-before-completion` |
| Before a significant business communication | `requesting-peer-review` |
| After receiving feedback on a business deliverable | `receiving-peer-review` |
| Switching between business entities or accounts | `context-isolation` |
| Operational problem with no obvious cause | `systematic-problem-solving` |

## Four workflow patterns

### Cash Flow Crisis
```
outcome-first-thinking → brainstorming
→ cash-flow-snapshot → invoice-chase → plan-payroll
→ model-assumptions-audit → verification-before-completion
→ [OWNER REVIEW] → finishing-a-task
```

### Month-End Close
```
outcome-first-thinking → writing-plans
→ close-month → month-end-prep → margin-analyzer
→ model-assumptions-audit → verification-before-completion
→ requesting-peer-review → [ACCOUNTANT / ADVISOR REVIEW] → receiving-peer-review → finishing-a-task
```

### Quarterly Business Review
```
brainstorming → outcome-first-thinking → research-before-acting
→ quarterly-review → margin-analyzer → customer-pulse
→ source-before-claiming → model-assumptions-audit
→ verification-before-completion → requesting-peer-review
→ [OWNER / ADVISOR REVIEW] → receiving-peer-review → finishing-a-task
```

### Contract / Legal Communication
```
outcome-first-thinking → brainstorming
→ contract-review (or review-contract) → source-before-claiming
→ verification-before-completion → requesting-peer-review
→ [LEGAL / OWNER REVIEW] → receiving-peer-review → finishing-a-task
```

## The three most critical pairings

**1. `model-assumptions-audit` after `cash-flow-snapshot`**
Cash flow forecasts are only as good as their assumptions — payment timing, customer variability, fixed cost coverage. `model-assumptions-audit` explicitly asks: are the 30/60/90-day assumptions supported, what does the forecast break on, are the confidence bands realistic? Small business decisions (payroll, inventory, hiring) are made on these numbers. Unexamined assumptions cause real consequences.

**2. `verification-before-completion` before anything sent outside the business**
Contracts, invoices, customer communications, and lender reports sent with errors or missing information are harder to correct after they leave. The small-business plugin produces the content; `verification-before-completion` checks it against the brief before it goes out.

**3. `systematic-problem-solving` before operational fire-fighting**
When something is broken — a customer dispute, a reconciliation error, a payroll discrepancy — the instinct is to fix it immediately. `systematic-problem-solving` enforces root cause identification first: what is the exact problem, how long has it existed, what changed. In small business operations, quick fixes that mask root causes compound over time.

## Financial forecasts and the assumptions gap

The small-business plugin produces detailed financial outputs — 30/60/90-day cash forecasts, payroll plans, margin analyses. These outputs are used to make real decisions. The plugin handles the calculation; `model-assumptions-audit` handles the assumptions layer:

- Are the payment timing assumptions based on actual customer history, or defaults?
- What does the forecast assume about fixed costs that may not be fixed?
- What is the confidence band on the 90-day figure, and is it wide enough to plan around?

Run `model-assumptions-audit` after any forecast that will drive a decision about payroll, hiring, inventory, or financing.

## Customer-facing and external outputs

Before any output leaves the business — invoice to a customer, contract to a supplier, report to a lender, communication to a regulator — run `verification-before-completion`. Check:
- Does this say what was intended?
- Are the figures correct and consistent?
- Does it match any agreements, prior communications, or requirements?

For significant communications (contract negotiation, financing request, dispute response), run `requesting-peer-review` and get a human to review before sending.

## Context isolation for multiple entities

If the business operates under multiple entities, or the owner is managing multiple businesses, run `context-isolation` explicitly when switching. Payroll figures, tax obligations, and customer accounts from Entity A should not contaminate Entity B's close process.

## Examples

**Example 1: Owner worried about making payroll next week**
User: "I'm stressed about making payroll — will I have enough cash?"
Applied: outcome-first-thinking defines what information is needed (current AR, AP, and cash balance). cash-flow-snapshot pulls the 30-day forecast. invoice-chase stages reminders for overdue invoices. plan-payroll calculates the specific payroll obligation. model-assumptions-audit checks whether the payment timing assumptions are supported by actual customer history.
Result: Clear 30-day cash picture with named risks, before any invoice is sent or payment committed.

**Example 2: Month-end close with an accountant reviewing**
User: "It's month-end. I need to close the books and send the P&L to my accountant."
Applied: outcome-first-thinking defines what the accountant needs. writing-plans structures the close steps. close-month and margin-analyzer produce the outputs. verification-before-completion checks completeness before the P&L is sent. requesting-peer-review briefs the handoff.
Result: P&L arrives at the accountant complete, with margin analysis and a clear summary of notable items.

**Example 3: Customer contract with ambiguous payment terms**
User: "A customer wants to change the payment terms in our standard contract."
Applied: brainstorming surfaces what the owner needs to protect (cash flow, relationship, legal recourse). contract-review identifies the specific clauses at issue. source-before-claiming checks any referenced standards or industry terms. verification-before-completion and requesting-peer-review run before sending back to the customer.
Result: Response to the customer is precise, legally grounded, and reviewed before it is sent.

## Troubleshooting

**Cash flow forecast is showing numbers the owner doesn't recognize.**
Run model-assumptions-audit. The forecast is using assumptions (default payment timing, estimated fixed costs) that may not match the business. Identify which assumptions are driving the unexpected output.

**A contract or invoice was sent with an error.**
For future prevention, run verification-before-completion before sending. For the current situation, run systematic-problem-solving to assess the impact and identify the fastest correct resolution.

**The quarterly review output doesn't match what the owner already knows.**
Run source-before-claiming and model-assumptions-audit together. Identify which figures are sourced from connected tools and which are estimated. Discrepancies often trace to incorrect assumptions in the estimation layer.

**The business has multiple entities and the close was run on the wrong one.**
Run context-isolation before the next close. If the wrong entity's data is already in the output, discard and re-run under the correct entity.

## Red Flags

| Situation | Action |
|---|---|
| About to make a hiring or financing decision based on a cash forecast | Run `model-assumptions-audit` on the forecast first |
| About to send a contract, invoice, or lender report | Run `verification-before-completion` first |
| Trying to fix a payroll or reconciliation error that has been wrong for a while | Run `systematic-problem-solving` before touching anything |
| Working across multiple business entities or accounts | Run `context-isolation` before switching |
| Quarterly review figures don't match the owner's expectations | Run `source-before-claiming` + `model-assumptions-audit` to identify the gap |

## Full integration reference

See `docs/integration/small-business.md` for complete workflow patterns, gap analysis, and pairing rationale.
