---
name: working-with-legal
description: Maps sosai-superpowers process skills to each stage of a legal workflow — clarify, plan, execute, verify, and sign-off — so the right discipline is applied in the right order. Use when working with the Anthropic legal plugin to know which sosai-superpowers skills wrap each stage of a legal workflow and in what order.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Working with the legal plugin

## Overview

sosai-superpowers and the legal plugin operate at different layers. This skill tells you which process skills to apply before, during, and after each legal workflow stage.

**The pattern:**
```
sosai-superpowers  →  clarify + plan         (before the legal work)
legal              →  execute the workflow   (the legal work itself)
sosai-superpowers  →  verify + review        (before signing, distributing, or closing)
[SIGN-OFF / EXECUTION / DISTRIBUTION]
```

## Which skill wraps which stage

| When | sosai-superpowers skill |
|---|---|
| Starting any risk assessment, contract review, or compliance check | `outcome-first-thinking` |
| Before any background or regulatory research | `research-before-acting` |
| Any output containing regulatory or legal claims | `source-before-claiming` |
| Multi-step legal workflow (NDA program, vendor onboarding) | `writing-plans` |
| Multi-jurisdiction compliance work | `dispatching-parallel-agents` |
| Compliance violation or contract RED flag found | `systematic-problem-solving` |
| Before any document goes to signature | `verification-before-completion` |
| Before legal counsel or counterparty review | `requesting-peer-review` |
| After receiving legal review feedback | `receiving-peer-review` |

## Three workflow patterns

### Contract Review and Execution
```
outcome-first-thinking → research-before-acting
→ review-contract → source-before-claiming
→ [RED flags: systematic-problem-solving]
→ requesting-peer-review → [NEGOTIATION]
→ verification-before-completion → signature-request
→ [EXECUTION] → finishing-a-task
```

### Multi-Jurisdiction Compliance Check
```
outcome-first-thinking
→ dispatching-parallel-agents [one per jurisdiction: compliance-check]
→ [violation found: systematic-problem-solving]
→ source-before-claiming → verification-before-completion
→ requesting-peer-review → [DECISION: PROCEED / MODIFY / BLOCK]
```

### Vendor Onboarding
```
outcome-first-thinking → vendor-check
→ [gaps found: writing-plans]
→ review-contract [per agreement] → source-before-claiming
→ [NEGOTIATION] → verification-before-completion
→ signature-request [per agreement] → [VENDOR ONBOARDED]
```

## The three most critical pairings

**1. `source-before-claiming` before `review-contract` / `triage-nda` distribution**
Every flagged deviation must cite the specific clause and the specific playbook rule it violates — not an inference about what the clause "suggests." Legal instruments require traceable sourcing. An unsourced flag cannot be defended in negotiation and risks missing real deviations where inference substituted for close reading.

**2. `systematic-problem-solving` after `compliance-check` surfaces a violation**
The wrong response to a compliance violation is immediate remediation. Root cause investigation comes first: is this a policy gap, a process gap, or an isolated incident? Each requires a different response. Patching an isolated incident when the real problem is a missing policy creates a false sense of compliance.

**3. `verification-before-completion` before `signature-request`**
Execution is irreversible. Before routing for signature: confirm all open RED flags are resolved or formally accepted with documented rationale, the correct document version is being sent, the signing order is correct, the counterparty details are accurate, and the approval level matches the commitment threshold. A signature on the wrong version or without required approvals is more expensive to unwind than the verification check that catches it.

## Examples

**Example 1: Contract review before counterparty distribution**
User: "We need to review this vendor MSA and send our redlines to their counsel by Friday."
Applied: The skill routes through `outcome-first-thinking` to define the review goal, then `review-contract`, then requires `source-before-claiming` before any redline goes out so every flagged deviation cites the specific clause and playbook rule.
Result: Counsel receives a redline package where every flag is traceable — no unsourced inferences that could unravel in negotiation.

**Example 2: Multi-jurisdiction compliance check**
User: "We're launching in the EU and California — confirm we're compliant with data residency rules in both."
Applied: The skill triggers `dispatching-parallel-agents` to run a separate `compliance-check` per jurisdiction, preventing regulatory frameworks from being conflated in a single thread.
Result: Two independent compliance summaries with clear pass/fail per jurisdiction, ready for `verification-before-completion` before the launch decision.

**Example 3: Repeated compliance failure during vendor onboarding**
User: "This is the third vendor in a row that failed our data processing agreement review at the same clause."
Applied: The skill flags this as a structural signal and routes to `systematic-problem-solving` before any remediation — root cause first to determine if the gap is in the playbook, the template, or the review process.
Result: Root cause identified as a missing standard clause in the template, not isolated vendor failures — one fix closes the recurring gap.

## Troubleshooting

**Routed straight to `review-contract` without running `outcome-first-thinking` first**
Go back. Define the review goal and decision threshold before generating findings. A contract review without a clear outcome statement produces flags that cannot be prioritized by business risk.

**Ran `source-before-claiming` after sending redlines to counsel, not before**
Sourcing must happen before distribution. If unsourced flags have already been sent, flag the gap to counsel explicitly and resend a corrected version with full clause citations before negotiation begins.

**Used `systematic-problem-solving` after a one-off violation before checking for recurrence**
Check whether the same violation has appeared in prior reviews first. A single isolated incident requires a different response than a pattern. Run the pattern check before scoping the problem statement.

**Passed `dispatching-parallel-agents` output directly to `signature-request` without `verification-before-completion`**
Multi-jurisdiction outputs must be consolidated and verified before any execution step. Ensure all jurisdiction findings are resolved or formally accepted with documented rationale before routing for signature.

**Skipped `requesting-peer-review` before sending to counterparty because the contract looked clean**
A clean-looking contract is not a reviewed contract. Any document going to a counterparty or legal counsel requires peer review — route through `requesting-peer-review` regardless of apparent simplicity.

## Red Flags

| Situation | Action |
|---|---|
| About to route a document for signature | Stop — run `verification-before-completion` first |
| Compliance check returns a violation | Stop — run `systematic-problem-solving` before deciding on remediation |
| Contract review output going to counsel or counterparty | Run `source-before-claiming` — every deviation flag must cite clause and playbook rule |
| Same compliance check failing repeatedly | Run `systematic-problem-solving` — multiple failures signal a structural gap |
| Risk assessment where the decision is unclear | Run `outcome-first-thinking` first — define the decision before generating the risk matrix |
| Multi-jurisdiction question | Use `dispatching-parallel-agents` — do not conflate regulatory frameworks in a single thread |

## Full integration reference

See `docs/integration/legal.md` for complete workflow patterns, pairing rationale, and gap analysis.
