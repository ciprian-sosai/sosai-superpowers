# Integration Guide: sosai-superpowers + legal

sosai-superpowers governs **how** to work. The legal plugin governs **what** to do in legal workflows. They operate at different layers and compose cleanly.

**The pattern:**
```
sosai-superpowers  →  clarify scope, define the decision, plan the workflow
legal              →  execute the legal workflow
sosai-superpowers  →  verify before signing, distributing, or closing
```

---

## Quick Reference: Which sosai-superpowers skill wraps which legal workflow stage

| Legal workflow stage | sosai-superpowers skill | Why |
|---|---|---|
| Starting any risk assessment, contract review, or compliance check | `outcome-first-thinking` | Define the decision to be made before generating a risk matrix or flagging deviations |
| Before any background or regulatory research | `research-before-acting` | Understand applicable jurisdiction, existing agreements, and prior treatment before producing analysis |
| Any output containing regulatory or legal claims | `source-before-claiming` | Every claim about a legal requirement, regulatory exposure, or contract interpretation needs a citation, not inference |
| Multi-step legal workflow (NDA program, vendor onboarding) | `writing-plans` | Structure the workflow before executing it; catch sequencing gaps early |
| Multi-jurisdiction compliance work | `dispatching-parallel-agents` | Run the same compliance question against different regulatory frameworks in parallel |
| Compliance violation or contract red flag | `systematic-problem-solving` | Root cause investigation before remediation — not immediate patching |
| Before any document goes to signature | `verification-before-completion` | Once signed, the document is binding — the pre-signature gate is irreversible |
| Before legal counsel or counterparty review | `requesting-peer-review` | Brief the reviewer on judgment calls, not just hand over a document |
| After receiving legal review feedback | `receiving-peer-review` | Process all feedback systematically |

---

## When to use sosai-superpowers — and when to skip it

### The redundancy question

The legal plugin already asks clarifying questions. `/triage-nda` asks for the NDA type and counterparty context. `/review-contract` asks which playbook to apply. If sosai-superpowers also runs `outcome-first-thinking` first, you may answer overlapping questions twice. That is friction, not value.

**The distinction:** domain plugin questions ask *what* (which document type, which counterparty, which playbook). sosai-superpowers questions ask *whether* and *why* (is this the right instrument for this situation, have we confirmed the governing jurisdiction, are we solving the right problem). They are not the same question.

### The handoff question

In the same cowork session, context is shared — it is the conversation thread. If you run `outcome-first-thinking` and surface "this contract review is for a regulated market entry, not a standard vendor engagement," that is in context when `/review-contract` runs. There is no formal structured handoff, but the information is there.

For subagents (if using `dispatching-parallel-agents`): subagents do not inherit session context. Key findings — the governing jurisdiction, the decision owner, the materiality threshold — must be explicitly included in the subagent prompt. They do not transfer automatically.

### Use sosai-superpowers when the task is ambiguous, high-stakes, or already failing

| Situation | Use sosai-superpowers | Why |
|---|---|---|
| Contract with non-standard or unusual terms | `outcome-first-thinking` + `source-before-claiming` | Confirm the decision context and ensure every risk flag traces to a clause, not to inference |
| Compliance check surfacing a potential violation | `systematic-problem-solving` | Root cause investigation before remediation — is this a policy gap, a process gap, or an isolated incident? |
| Multi-jurisdiction regulatory question | `dispatching-parallel-agents` | Same question, different regulatory frameworks — run in parallel |
| Document approaching signature with unresolved RED flags | `verification-before-completion` | Binding once signed — confirm all open issues are resolved or explicitly accepted |
| Second or third pass on a failed compliance check | `systematic-problem-solving` | Multiple failures signal a structural gap, not a one-off issue |
| Risk assessment where the decision is unclear | `outcome-first-thinking` | Define the decision first — the risk matrix serves the decision, not the reverse |

### Skip sosai-superpowers when the task is routine and well-defined

| Situation | Just use the domain skill | Why |
|---|---|---|
| Incoming NDA with standard mutual terms | `/triage-nda` directly | Domain skill handles GREEN classification without process overhead |
| Standard legal response to a known inquiry type (DSR, discovery hold) | `/legal-response` directly | Template-driven, deterministic — no judgment ambiguity |
| Pulling the daily legal brief | `/brief` directly | Informational — no decision or output requiring verification |
| Vendor agreement with no prior deviations | `/vendor-check` directly | Routine status check, domain skill handles it end to end |

### High value

**Contract review for non-standard or regulated agreements** — `/review-contract` applies the playbook and flags deviations as GREEN/YELLOW/RED. `source-before-claiming` ensures every flagged deviation cites the specific clause and the specific playbook rule it violates — not an inference about what the clause "suggests." `outcome-first-thinking` before the review confirms what decision the review is meant to support (sign as-is, negotiate, escalate, reject) so the redlines serve a clear purpose.

**Compliance check when a violation is suspected** — `/compliance-check` surfaces applicable regulations and flags the gap. `systematic-problem-solving` is what happens next: is this a design gap in the policy, an operating effectiveness failure, or an isolated incident? The response to each is different. Jumping directly to remediation without root cause analysis risks patching the symptom and leaving the structural problem in place.

**Pre-signature document review** — `verification-before-completion` before `/signature-request` is the irreversible gate. Once executed, a contract is binding. The check confirms all open RED flags are resolved or formally accepted, the signing order is correct, the governing law and counterparty details are accurate, and the right approver is in the routing.

### Low value

**Routine NDA triage** — Standard incoming NDAs with mutual, time-limited, purpose-limited terms. The `/triage-nda` GREEN classification is deterministic. Adding `outcome-first-thinking` or `verification-before-completion` here creates overhead without reducing risk.

**Standard legal response templates** — DSR acknowledgment, litigation hold notice, standard NDA response. These are template-driven. The domain skill handles them end to end.

---

## The three most important pairings

### 1. `source-before-claiming` + `review-contract` / `triage-nda`

Legal instruments require traceable sourcing. A claim that a contract clause creates regulatory exposure, violates a playbook rule, or conflicts with applicable law must cite the specific clause, the specific regulation or playbook section, and the reasoning. Inference — "this seems to suggest liability" — is not acceptable in a legal risk output.

`source-before-claiming` enforces this discipline before any contract review or NDA triage output is used for a decision. The risk of unsourced claims:
- Flagging a deviation that does not actually exist
- Missing a real deviation because inference substituted for close reading
- Creating a redline that cannot be defended in negotiation

**The pattern:**
```
source-before-claiming  →  confirm every deviation flag cites clause + playbook rule
review-contract / triage-nda  →  execute the review with sourced findings
source-before-claiming  →  verify before distributing to counsel or counterparty
```

### 2. `systematic-problem-solving` + `compliance-check`

When a compliance check surfaces a violation, the instinct is to remediate immediately. That is the wrong first move. The root cause question matters: is this a policy that was never written, a process that exists but is not followed, or an isolated incident that falls outside normal operations? Each has a different response.

Patching an isolated incident when the real problem is a missing policy creates a false sense of compliance. Running `systematic-problem-solving` before deciding on remediation routes the response correctly.

**The pattern:**
```
compliance-check        →  surface the violation and applicable regulation
systematic-problem-solving  →  root cause: policy gap, process gap, or isolated incident?
[targeted remediation based on root cause]
verification-before-completion  →  confirm the remediation addresses the root cause, not just the symptom
```

### 3. `verification-before-completion` before `signature-request`

The `/signature-request` skill prepares and routes a document for execution. Execution is irreversible. `verification-before-completion` is the gate that confirms:
- All open RED flags from contract review are resolved or formally accepted with documented rationale
- The counterparty name, governing law, and effective date are accurate
- The signing order is correct and all required approvers are in the routing
- The correct document version is being sent (not a draft with tracked changes)
- The approval level matches the contract value or commitment threshold
- Supporting documentation referenced in the contract exists and is retrievable

A signature on the wrong version, with the wrong counterparty name, or without required internal approval is more expensive to unwind than the verification check that catches it.

---

## End-to-End Workflow Patterns

### Pattern A: Contract Review and Execution

```
sosai-superpowers:outcome-first-thinking
  → Define: what decision does this review support (sign / negotiate / escalate / reject)?
    Who is the decision owner? What is the materiality threshold?

sosai-superpowers:research-before-acting
  → Gather: existing relationship context, prior agreements, known regulatory constraints,
    applicable playbook version

legal:review-contract
  → Apply playbook: flag deviations GREEN / YELLOW / RED, generate redlines

sosai-superpowers:source-before-claiming
  → Verify: every flagged deviation cites the specific clause and playbook rule

[If RED flags:]
sosai-superpowers:systematic-problem-solving
  → Root cause: is this a drafting error, a non-standard ask, or a non-negotiable ask?

sosai-superpowers:requesting-peer-review
  → Brief legal counsel on judgment calls (RED flags, escalation rationale)

[NEGOTIATION / RESOLUTION]

sosai-superpowers:verification-before-completion
  → Confirm: all open items resolved or accepted, correct version, correct counterparty details

legal:signature-request
  → Configure signing order, route for execution

[EXECUTION]

sosai-superpowers:finishing-a-task
  → File executed agreement, update CLM, notify stakeholders
```

---

### Pattern B: Multi-Jurisdiction Compliance Check

```
sosai-superpowers:outcome-first-thinking
  → Define: what action or feature is being assessed, which jurisdictions are in scope,
    what decision follows the check (proceed / modify / block)?

sosai-superpowers:dispatching-parallel-agents
  → Dispatch one subagent per jurisdiction, each running:
      legal:compliance-check [jurisdiction-specific regulatory framework]
  → Collect and consolidate findings

[If violation found in any jurisdiction:]
sosai-superpowers:systematic-problem-solving
  → Root cause per jurisdiction: policy gap, process gap, or isolated incident?

sosai-superpowers:source-before-claiming
  → Verify: every regulatory citation is accurate and traceable

sosai-superpowers:verification-before-completion
  → Confirm: all jurisdictions addressed, decision owner briefed, escalation path documented

sosai-superpowers:requesting-peer-review
  → Brief legal lead on cross-jurisdiction conflicts or gaps before advising the business

[DECISION: PROCEED / MODIFY / BLOCK]
```

---

### Pattern C: Vendor Onboarding and Agreement Execution

```
sosai-superpowers:outcome-first-thinking
  → Define: vendor category, data access level, contract type, approval threshold

legal:vendor-check
  → Check vendor agreement status: CLM, CRM, email, documents — gap analysis

[If gaps found:]
sosai-superpowers:writing-plans
  → Structure remediation: which agreements are needed, in what order, with what deadlines

legal:review-contract [for each required agreement]
  → Apply playbook, flag deviations

sosai-superpowers:source-before-claiming
  → Verify all deviation flags are sourced before routing for negotiation

[NEGOTIATION / RESOLUTION]

sosai-superpowers:verification-before-completion
  → Confirm: all required agreements in place, no unresolved RED flags, correct versions

legal:signature-request [for each agreement]
  → Route for execution in dependency order

[VENDOR ONBOARDED]
```

---

## Gaps: What neither plugin covers

**1. Regulatory change monitoring**
Neither plugin monitors for changes to the regulatory frameworks underlying a compliance check. A compliance assessment that was accurate when conducted may become stale when a regulation is amended. A skill that flags when source regulations were last verified against current law would fill this gap.

**2. Contract obligation tracking**
The `review-contract` skill reviews and redlines agreements. Neither plugin covers the downstream obligation: what commitments did we make in this contract, when are they due, and who owns them? Executed contracts create ongoing obligations that are separate from the review workflow.

**3. Privilege documentation**
Neither plugin addresses legal privilege for communications. When a compliance investigation involves counsel, which communications are privileged and how to document that privilege is a gap that affects both the legal response and the compliance check workflows.

---

## Installation

Install both plugins in your Claude cowork settings:

```
https://github.com/ciprian-sosai/sosai-superpowers
https://github.com/anthropics/knowledge-work-plugins/tree/main/legal
```

---

*For the process-layer companion skill that guides this integration at runtime, see `sosai-superpowers:working-with-legal`.*
