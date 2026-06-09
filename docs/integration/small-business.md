# Integration Guide: sosai-superpowers + small-business

sosai-superpowers governs **how** to work. small-business governs **what** to do when running a business. They operate at different layers and compose cleanly — one wraps the other.

**The core pattern:**
```
sosai-superpowers  →  clarify situation, define what good looks like
small-business     →  run the operation, produce the deliverable
sosai-superpowers  →  verify outputs before they leave the business
```

The small-business plugin handles the operational and financial reality of running a small business — cash flow forecasting, payroll planning, invoice collection, contract review, margin analysis, close processes, customer management, and quarterly reviews. sosai-superpowers is what ensures financial assumptions are examined before decisions are made on them, and anything sent to customers, advisors, or regulators is verified before it goes out.

---

## Quick Reference: Which sosai-superpowers skill wraps which small-business stage

| Stage | sosai-superpowers skill | Why |
|---|---|---|
| Starting any ambiguous business task | `brainstorming` | Surface the real situation before reaching for a tool |
| Before financial forecasts or planning | `outcome-first-thinking` | Define what good looks like before generating numbers |
| Before quarterly review or major business decision | `research-before-acting` | Understand where the business actually stands before drawing conclusions |
| Any output with financial figures, customer data, or statistics | `source-before-claiming` | Every number in a report or communication must trace to a source |
| Multi-step business process (close month, quarterly review) | `writing-plans` | Structure the process before executing; prevent close errors |
| After any cash flow forecast or financial model | `model-assumptions-audit` | Examine the assumptions behind the numbers before making decisions on them |
| Before sending to a customer, lender, advisor, or regulator | `verification-before-completion` | Check accuracy and completeness before anything leaves the business |
| Before a significant business communication | `requesting-peer-review` | Have a human review before the communication is sent |
| After receiving feedback on a business deliverable | `receiving-peer-review` | Process feedback systematically |
| Switching between business entities or accounts | `context-isolation` | Prevent Entity A's figures from contaminating Entity B's close |
| Operational problem with no obvious cause | `systematic-problem-solving` | Root cause before any fix attempt |

---

## When to use sosai-superpowers — and when to skip it

### The small-business reality

Small business owners face a particular challenge: most decisions are urgent, most capacity is consumed by operations, and the cost of a bad decision (hiring, pricing, cash commitment) is immediate and personal. The value of process discipline is highest when the pressure to skip it is highest.

`brainstorming` is most valuable when the owner is stressed and about to act on instinct. `model-assumptions-audit` is most valuable when the cash flow forecast looks good and the owner is about to commit to payroll. `verification-before-completion` is most valuable before a contract goes to a customer.

### Use sosai-superpowers when the stakes are high or the situation is unclear

| Situation | Use sosai-superpowers | Why |
|---|---|---|
| Cash concern + upcoming payroll | `outcome-first-thinking` + `model-assumptions-audit` | The forecast is only as good as its assumptions |
| Major hiring or investment decision | `brainstorming` + `outcome-first-thinking` | Define the decision criteria before the numbers come in |
| Contract with ambiguous or contested terms | `brainstorming` + `verification-before-completion` | Understand what needs to be protected before reviewing terms |
| Quarterly review before a strategic decision | `research-before-acting` + `source-before-claiming` | Understand the actual business position before drawing conclusions |
| Recurring problem that has been "fixed" before | `systematic-problem-solving` | Quick fixes that recur indicate root cause was not found |
| Any external communication with financial figures | `source-before-claiming` + `verification-before-completion` | Accuracy and credibility |

### Skip sosai-superpowers when the task is routine

| Situation | Just use the domain skill | Why |
|---|---|---|
| Sending a standard invoice with known figures | `invoice-chase` directly | Defined task, no scope ambiguity |
| Pulling a quick Friday brief | `friday-brief` directly | Routine operational summary |
| Scheduling a regular payroll run with no cash concern | `plan-payroll` directly | Mechanical task, domain skill handles it |
| Updating CRM after a customer call | `crm-maintenance` directly | Operational record-keeping |

---

## The cash flow assumptions problem

Cash flow snapshots and 30/60/90-day forecasts are the most consequential outputs the small-business plugin produces. They drive decisions about payroll, hiring, inventory, and financing. The plugin handles the mechanics of the forecast well. The assumptions are where risk lives:

**Payment timing assumptions**
- Does the 30-day forecast assume customers pay on time?
- What is the actual payment pattern for the top 5 customers?
- Is there a customer who always pays 45 days late being treated as a 30-day payer?

**Fixed cost assumptions**
- Are all fixed costs included? (lease, SaaS subscriptions, recurring services)
- Are there seasonal or irregular costs in the 60-90 day window?
- Is payroll calculated on current headcount or planned headcount?

**Revenue assumptions**
- Is the forecast based on confirmed orders or typical volume?
- What happens to the forecast if the one large customer delays an invoice?

`model-assumptions-audit` asks these questions explicitly before any forecast is used to make a financial commitment. Run it after every `cash-flow-snapshot` or `plan-payroll` that will drive a decision.

---

## Before anything leaves the business

The rule: `verification-before-completion` before every external communication with financial figures, legal terms, or operational commitments.

This includes:
- Invoices to customers
- Contracts to suppliers or customers
- Reports or summaries to lenders
- Communications to accountants or advisors
- Regulatory or compliance filings

These documents are harder to correct after they have been sent. The verification step takes minutes. Missing figures and errors in external documents have costs that are immediate, often irreversible, and disproportionate for a small business.

---

## Contracts and legal communications

The `contract-review` and `review-contract` skills analyze contract terms. `brainstorming` adds the upstream framing: what needs to be protected, what is the owner's leverage, what is the acceptable minimum? Without this framing, contract review optimizes for the wrong things.

Before sending any response to a counterparty about contract terms:
```
brainstorming → contract-review → source-before-claiming (on any cited standards)
→ verification-before-completion → requesting-peer-review → [send]
```

---

## Month-end close with an advisor

Close processes that will be reviewed by an accountant or advisor benefit from `requesting-peer-review` before handoff. This is not asking the advisor to do the work — it is briefing them on what was unusual in the period, what judgment calls were made, and what they should focus their review on. A well-briefed advisor review catches more and takes less time.

---

## Switching between entities

If the business operates under multiple entities (e.g., operating company + holding company, or multiple independent businesses), run `context-isolation` explicitly when switching between them. Payroll, tax obligations, customer AR/AP, and revenue figures from Entity A should never appear in Entity B's close or forecast.

---

## High value

**Cash flow decisions under pressure** — Payroll, inventory, hiring commitments. `model-assumptions-audit` before any commitment based on a forecast. The pressure to skip it is highest here; the cost of getting it wrong is highest here.

**External documents** — Contracts, lender reports, customer invoices with unusual terms. `verification-before-completion` + `requesting-peer-review` before sending.

**Quarterly reviews driving strategic decisions** — Pricing changes, hiring decisions, market entry. `research-before-acting` + `source-before-claiming` before drawing conclusions.

**Recurring operational problems** — Cash flow consistently tighter than forecast, customers consistently late, margin consistently below expectation. `systematic-problem-solving` to find root cause before any operational change.

## Low value

**Routine operations** — Standard invoices, CRM updates, weekly brief. Domain skill directly.

**Well-understood mechanical tasks** — Payroll with no cash concern, standard close with no unusual items, regular status update. The small-business plugin handles these end to end.
