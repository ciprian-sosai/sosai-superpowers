# Integration Guide: sosai-superpowers + operations

sosai-superpowers governs **how** to work. The operations plugin governs **what** to do in operational planning, risk management, and process work. They operate at different layers and compose cleanly.

**The pattern:**
```
sosai-superpowers  →  clarify scope, define the decision, plan the work
operations         →  execute the operational workflow
sosai-superpowers  →  verify before submitting, routing, or distributing
```

---

## When to use sosai-superpowers — and when to skip it

### The redundancy question

The operations plugin already asks clarifying questions. `/change-request` asks which system, which change type, what the impact window is. `/vendor-review` asks which vendor, which contract, what the renewal date is. If sosai-superpowers also runs `brainstorming` or `outcome-first-thinking` first, you answer overlapping questions twice. That is friction, not value.

**The distinction:** domain plugin questions ask *what* (which process, which vendor, which system). sosai-superpowers questions ask *whether* and *why* (is this the right framing, have we defined the decision this output supports, are we solving the right problem). They are not the same question.

### The handoff question

In the same cowork session, context is shared — it is the conversation thread. If you run `outcome-first-thinking` and surface "this risk register is for a go/no-go decision on a vendor, not a general audit," that is in context when `risk-assessment` runs. There is no formal structured handoff, but the information is there.

For subagents (if using `dispatching-parallel-agents`): subagents do not inherit session context. Key findings from brainstorming must be explicitly included in the subagent prompt — they do not transfer automatically.

### Use sosai-superpowers when the task is ambiguous, high-stakes, or already failing

| Situation | Use sosai-superpowers | Why |
|---|---|---|
| Process improvement with unclear root cause | `systematic-problem-solving` | Root cause before redesign — the domain skill designs the future state but does not enforce problem framing |
| Risk assessment to support a specific decision | `outcome-first-thinking` | Define the decision the risk register supports before generating risk categories |
| Change request ready to route for approval | `verification-before-completion` | A change request is a commitment — confirm impact analysis, rollback plan, and approvals are complete |
| Status report going to leadership | `source-before-claiming` | Every metric, milestone claim, and risk rating must trace to a source |
| SOP covering multiple independent sub-processes | `writing-plans` | Plan what the SOP covers before writing it — if sub-processes are independent, document them separately |
| Second or third attempt to fix the same process failure | `systematic-problem-solving` | Multiple failed fixes signal a structural problem, not a surface issue |

### Skip sosai-superpowers when the task is routine and well-defined

| Situation | Just use the domain skill | Why |
|---|---|---|
| Routine weekly status report with known inputs | `/status-report` directly | Deterministic, no judgment required on framing or sourcing |
| Standard runbook for a well-understood procedure | `/runbook` directly | Established process, no ambiguity in scope or ownership |
| Straightforward vendor renewal with clear TCO | `/vendor-review` directly | Known vendor, known costs, no structural decision required |
| Capacity plan for a stable, well-measured workload | `/capacity-plan` directly | Sufficient historical data, no scope ambiguity |

### High value

**Process optimization with unknown root cause** — `process-optimization` without root cause analysis produces solutions to the wrong problem. If the process is slow but no one knows why, `systematic-problem-solving` first enforces understanding WHY before redesigning. The domain skill designs the future state; it does not enforce problem framing.

**Risk assessment for a specific decision** — `risk-assessment` produces a comprehensive risk register across six categories. Without decision context, that register is complete but un-actionable. `outcome-first-thinking` first defines whether this is a go/no-go on a vendor, approval for a change, or a board-level disclosure decision. The risk register is then scoped to support that decision.

**Change requests before routing** — A change request is a commitment. Once routed, it enters an approval workflow with real dependencies. `verification-before-completion` confirms that the impact analysis is complete, the rollback plan is specific, and required approvals are identified — before routing, not after.

### Low value

**Routine status reporting** — A recurring status report with a stable set of inputs (known project milestones, known KPIs, known owners) does not benefit from `outcome-first-thinking` or `writing-plans`. The domain skill handles it end to end.

**Standard runbook creation** — A runbook for a well-understood, recurring operational procedure. The domain skill guides structure and content.

---

## Quick Reference: Which sosai-superpowers skill wraps which operations workflow

| Operations workflow stage | sosai-superpowers skill | Why |
|---|---|---|
| Starting any process improvement or optimization task | `systematic-problem-solving` | Root cause before redesign — understand why the process fails before designing the future state |
| Before generating a risk register | `outcome-first-thinking` | Define the decision the risk register supports — go/no-go, approval, disclosure |
| Before submitting a change request | `verification-before-completion` | A change request is a commitment — confirm impact analysis, rollback plan, and approvals are complete |
| Any output distributed to leadership | `source-before-claiming` | Every metric, milestone, and risk rating in a status report or vendor review must trace to a source |
| Before writing an SOP or process doc | `writing-plans` | Plan what the SOP covers; if sub-processes are independent, document them separately |
| Before research or background gathering | `research-before-acting` | Understand the current state before proposing changes |
| Multi-workstream operational initiative | `context-isolation` | Prevent context from one workstream bleeding into another |
| Before delivering any operational output | `verification-before-completion` | Confirm completeness before routing for approval or distribution |
| Before peer or stakeholder sign-off | `requesting-peer-review` | Brief the reviewer on judgment calls, not just hand over a document |
| After receiving review feedback | `receiving-peer-review` | Process all feedback systematically |

---

## The three most important pairings

### 1. `systematic-problem-solving` + `process-optimization`

Process optimization without root cause analysis produces solutions to the wrong problem. If a process is slow, that slowness could be caused by handoff delays, tool friction, unclear ownership, or upstream dependency failures — and each root cause calls for a different redesign.

`process-optimization` is designed to analyze a process and recommend improvements. It does not enforce "understand WHY before redesigning." `systematic-problem-solving` does. Running it first forces explicit problem framing — state the observed failure, map the chain, identify the actual constraint — before the future-state design begins.

**The pattern:**
```
systematic-problem-solving  →  state the observed failure precisely, map the causal chain
research-before-acting      →  gather current-state data (cycle times, handoff counts, error rates)
process-optimization        →  analyze the confirmed root causes, design the future state
verification-before-completion  →  confirm improvement targets are measurable and owners are assigned
```

Skipping `systematic-problem-solving` here is the most common failure mode in process work: a beautifully designed future state that solves a problem no one actually has.

### 2. `outcome-first-thinking` before `risk-assessment`

`risk-assessment` produces a structured risk register across six categories (strategic, operational, financial, compliance, reputational, technical). Without decision context, a comprehensive risk register is complete but un-actionable: it identifies everything, prioritizes nothing relative to the actual decision.

Define the decision first. Is this a go/no-go on a vendor contract? Approval for a system change? A board-level disclosure decision? The risk register then scopes to support that decision — which categories matter, what risk tolerance applies, what the threshold for "unacceptable" is.

**The pattern:**
```
outcome-first-thinking  →  define the decision, the decision-maker, and the risk tolerance
risk-assessment         →  generate scoped risk register with prioritization tied to the decision
verification-before-completion  →  confirm each high-priority risk has a mitigation owner and timeline
```

### 3. `verification-before-completion` before `change-request` is submitted

A change request enters an approval workflow the moment it is routed. Errors caught after routing — an incomplete rollback plan, a missing approver, an impact analysis that covers the wrong system boundary — require the request to be recalled, revised, and re-routed.

`verification-before-completion` before submission confirms: impact analysis is complete and covers all affected systems, rollback plan is specific and actionable (not "revert if needed"), required approvals are identified, and the change window is confirmed with the operations team. This check takes minutes; rework after routing takes days.

**The pattern:**
```
change-request              →  draft the change request with impact analysis and rollback plan
verification-before-completion  →  check completeness: impact scope, rollback specificity, approval chain
[ROUTE FOR APPROVAL]
```

---

## End-to-End Workflow Patterns

### Pattern A: Process Improvement Initiative

```
sosai-superpowers:outcome-first-thinking
  → Define: improvement goal, success metric, decision-maker, scope boundary

sosai-superpowers:research-before-acting
  → Gather: current-state data (cycle times, error rates, handoff counts, owner interviews)

sosai-superpowers:systematic-problem-solving
  → Diagnose: state the observed failure, map the causal chain, identify root constraint

operations:process-optimization
  → Analyze confirmed root causes; design future state with waste identification

sosai-superpowers:writing-plans
  → Structure: implementation plan by dependency level, owners, milestones

[If sub-processes are independent:]
sosai-superpowers:context-isolation
  → Separate each sub-process workstream explicitly

operations:process-doc
  → Document the redesigned process as a complete SOP with flowcharts and RACI

sosai-superpowers:verification-before-completion
  → Confirm: improvement targets are measurable, owners are assigned, rollback approach exists

sosai-superpowers:requesting-peer-review
  → Brief process owner on judgment calls before sign-off

[PROCESS OWNER SIGN-OFF]

sosai-superpowers:finishing-a-task
  → Implementation handoff, change log, measurement baseline
```

---

### Pattern B: Change Management (System or Process Change)

```
sosai-superpowers:outcome-first-thinking
  → Define: what is changing, who is affected, what approval chain applies, what success looks like

sosai-superpowers:research-before-acting
  → Gather: current system state, dependencies, prior change history for this system

operations:risk-assessment
  → Identify operational risks scoped to this change

sosai-superpowers:outcome-first-thinking (for risk register)
  → Confirm risk register is scoped to the approval decision, not a general risk survey

operations:change-request
  → Draft change request: impact analysis, rollback plan, testing approach, approval chain

sosai-superpowers:verification-before-completion
  → Check: impact scope complete, rollback plan specific, approvals identified, change window confirmed

[ROUTE FOR APPROVAL]

sosai-superpowers:requesting-peer-review
  → Brief change advisory board on judgment calls before final approval

operations:runbook
  → Create or update operational runbook for the change execution procedure

[APPROVED — EXECUTE]

sosai-superpowers:finishing-a-task
  → Post-implementation review, change log, runbook update
```

---

## Gaps: What neither plugin covers

**1. Root cause enforcement in process optimization**
The `process-optimization` skill analyzes a process and recommends improvements but does not require evidence that the root cause is understood before redesign begins. Organizations routinely redesign processes that are failing for a reason the redesign does not address. A structured root cause gate before future-state design would fill this gap — currently covered only if `systematic-problem-solving` is applied manually first.

**2. Risk register decision traceability**
The `risk-assessment` skill generates a comprehensive risk register. Neither plugin tracks which decision each risk entry was generated to support, or confirms that the risk register was actually used in the decision it was created for. Risk registers are frequently created, filed, and never consulted in the approval meeting they were designed for.

**3. Change request post-implementation tracking**
The `change-request` skill creates a structured change request with rollback plan. Neither plugin covers post-implementation validation — confirming the change was implemented as specified, the rollback plan was not needed, and the change is closed out. This is a known gap in change management workflows.

---

## Installation

Install both plugins in your Claude cowork settings:

```
https://github.com/ciprian-sosai/sosai-superpowers
https://github.com/anthropics/knowledge-work-plugins/tree/main/operations
```

---

*For the process-layer companion skill that guides this integration at runtime, see `sosai-superpowers:working-with-operations`.*
