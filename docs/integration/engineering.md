# Integration Guide: sosai-superpowers + engineering

sosai-superpowers governs **how** to work. engineering governs **what** to do in software development. They operate at different layers and compose cleanly — one wraps the other.

**The core pattern:**
```
sosai-superpowers  →  clarify problem, define outcome, plan work
engineering        →  debug, design, review, deploy
sosai-superpowers  →  verify completeness before shipping
```

The engineering plugin provides structured protocols for the day-to-day work of software development — debugging, architecture decisions, code review, incident response, documentation, deployment, and managing technical debt. sosai-superpowers is what ensures the problem is understood before investigation begins, the design is scoped before implementation starts, and every change is verified before it ships.

---

## Quick Reference: Which sosai-superpowers skill wraps which engineering stage

| Stage | sosai-superpowers skill | Why |
|---|---|---|
| Starting any ambiguous engineering task | `brainstorming` | Surface scope, constraints, and success criteria before committing to an approach |
| Before any debugging or incident investigation | `systematic-problem-solving` | Define the problem precisely before trying to reproduce or fix it |
| Before architecture or system-design work | `outcome-first-thinking` | Define success criteria and constraints before evaluating technology options |
| Before researching tech options | `research-before-acting` | Understand the landscape before committing to a direction |
| Benchmarks, performance claims, or technical statistics in ADRs | `source-before-claiming` | Unattributed benchmarks are a leading cause of ADR rejection |
| Multi-step implementation or migration | `writing-plans` | Structure the work before executing; prevent mid-implementation scope changes |
| Independent implementation streams (parallel services) | `dispatching-parallel-agents` | Fan out independent work with consistent brief per agent |
| Before claiming a fix or feature is complete | `verification-before-completion` | Check against the original brief, not just the tests |
| Before code review, architecture review, or deploy | `requesting-peer-review` | Brief the reviewer on design decisions and trade-offs, not just hand over a diff |
| After receiving review feedback | `receiving-peer-review` | Process all feedback systematically |
| Switching between unrelated problems in a session | `context-isolation` | Prevent one problem's assumptions from contaminating another |

---

## When to use sosai-superpowers — and when to skip it

### The overlap question

The engineering plugin's skills already include structured process steps. `debug` includes a reproduce → isolate → diagnose → fix protocol. `incident-response` includes scope assessment. If sosai-superpowers adds `systematic-problem-solving` before `debug`, is that redundancy?

**The distinction:** engineering skills ask *how* to execute (what are the reproduction steps, what does the stack trace show). sosai-superpowers asks *what* is being solved and *why* (have we defined the problem precisely, are we investigating the right component, is this a symptom of a deeper issue). They are different levels of the same investigation.

### Use sosai-superpowers when the task is ambiguous, high-stakes, or already failing

| Situation | Use sosai-superpowers | Why |
|---|---|---|
| Production incident with unclear scope | `systematic-problem-solving` | Define scope (which users, which paths, when it started) before investigating |
| A previous fix attempt didn't work or made things worse | `systematic-problem-solving` | Root cause analysis before another attempt — fix loops indicate wrong diagnosis |
| Architecture decision for a major component | `outcome-first-thinking` + `research-before-acting` | Define success criteria before evaluating options |
| ADR with performance benchmarks | `source-before-claiming` | Every technical claim that will be reviewed must be attributed |
| Multi-service implementation or migration | `writing-plans` | Structure prevents mid-implementation drift |
| Large refactor across multiple components | `dispatching-parallel-agents` + `writing-plans` | Consistency requires coordination |

### Skip sosai-superpowers when the task is routine and well-defined

| Situation | Just use the domain skill | Why |
|---|---|---|
| Bug with a clear stack trace and known reproduction path | `debug` directly | Scope is clear, protocol is sufficient |
| Routine standup summary | `standup` directly | Mechanical task, no scope ambiguity |
| Adding documentation for a known function | `documentation` directly | Defined task, domain skill handles it |
| Minor config change with a known deployment path | `deploy-checklist` directly | Known inputs, checklist sufficient |

---

## Debugging vs. systematic-problem-solving: what each does

`systematic-problem-solving` is the upstream framing step. `debug` is the execution protocol. They are sequential, not alternatives.

**`systematic-problem-solving` asks:**
- What is the precise problem statement (not the symptom)?
- What do we know and not know?
- What hypotheses are we testing, and in what order?
- When did this start, and what changed?

**`debug` asks:**
- What are the exact reproduction steps?
- What does the stack trace, log, or error message show?
- Which component, service, or code path is failing?
- What is the minimal fix?

**When to use `systematic-problem-solving` first:**
- Problem is ambiguous or has multiple potential causes
- A previous fix attempt failed
- Multiple teams or services may be involved
- The incident scope is unclear

**When to skip to `debug` directly:**
- Problem is specific and well-scoped
- Exact error message and reproduction path are known
- The component is known

---

## Architecture decisions and the assumptions problem

Architecture Decision Records will be reviewed — by peers, senior engineers, and future maintainers. The most common rejection reason is benchmarks or performance claims that are not attributed, outdated, or context-specific.

The discipline before any ADR review:
1. Every benchmark cites a source, environment, and date
2. Every performance claim is scoped (latency at what percentile, under what load)
3. Claims like "Kafka is faster than SQS" require: faster at what, at what scale, in what environment, measured by whom

`source-before-claiming` before any ADR review gate.

---

## Verification before deploy

The engineering plugin's `deploy-checklist` verifies that deployment steps are complete. `verification-before-completion` verifies that the work itself matches the original brief. They are different checks:

- `verification-before-completion`: Does this fix/feature address what was actually asked? Is the scope complete? Is anything missing from the brief?
- `deploy-checklist`: Are the deployment steps in the correct order? Are the pre-deploy checks complete?

Run both, in that order:
```
feature complete → verification-before-completion → deploy-checklist → deploy
```

---

## High value

**Production incidents** — `systematic-problem-solving` before `incident-response` when the scope is unclear. Fix loops (same incident recurring) almost always indicate a diagnosis problem, not an implementation problem.

**Architecture decisions for major components** — Long-lifetime decisions with compliance-relevant technical claims. `outcome-first-thinking` before `architecture` + `source-before-claiming` on the resulting ADR.

**Large multi-service implementations** — `writing-plans` + `dispatching-parallel-agents` for work that would otherwise drift in scope or produce inconsistent patterns across services.

## Low value

**Well-scoped bugs** — Clear reproduction path and known component. `debug` directly.

**Routine operational tasks** — Standups, documentation for known functions, minor config changes. Engineering plugin directly.

**Greenfield spikes** — Early exploration where the outcome is discovery, not a deliverable. Brainstorming applies when transitioning to design; not during exploration.
