---
name: working-with-engineering
description: Maps sosai-superpowers process skills to each stage of a software engineering workflow — clarifying the problem, planning the work, debugging systematically, and verifying before delivery — in the correct sequence. Use when working with the Anthropic engineering plugin to know which sosai-superpowers skills wrap each stage of a software engineering workflow and in what order.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Working with engineering

## Overview

sosai-superpowers and engineering operate at different layers and compose cleanly. The engineering plugin provides structured protocols for debugging, architecture decisions, code review, deployments, and incident response. sosai-superpowers ensures the problem is understood before investigation begins, the design is scoped before implementation starts, and every change is verified before it ships.

**The pattern:**
```
sosai-superpowers  →  clarify problem, define outcome, plan work     (before engineering work)
engineering        →  debug, design, review, deploy                  (the engineering work)
sosai-superpowers  →  verify completeness before shipping            (before human review)
[HUMAN REVIEW GATE]
```

## Which skill wraps which stage

| When | sosai-superpowers skill |
|---|---|
| Starting any ambiguous engineering task | `brainstorming` |
| Before any debugging or investigation | `systematic-problem-solving` |
| Before architecture or system-design work | `outcome-first-thinking` |
| Before any research into tech options | `research-before-acting` |
| Any benchmark, performance claim, or technical statistic | `source-before-claiming` |
| Multi-step implementation or migration | `writing-plans` |
| Independent work streams (e.g. services in parallel) | `dispatching-parallel-agents` |
| Before claiming a fix or feature is complete | `verification-before-completion` |
| Before code review, architecture review, or deploy | `requesting-peer-review` |
| After receiving review feedback | `receiving-peer-review` |
| Switching between unrelated problems in a session | `context-isolation` |

## Four workflow patterns

### Incident Response
```
systematic-problem-solving → incident-response
→ [root cause confirmed] → fix → testing-strategy
→ verification-before-completion → deploy-checklist
→ [INCIDENT REVIEW] → finishing-a-task
```

### Architecture Decision (ADR)
```
brainstorming → outcome-first-thinking → research-before-acting
→ source-before-claiming → architecture
→ verification-before-completion → requesting-peer-review
→ [ARCHITECTURE REVIEW] → receiving-peer-review → finishing-a-task
```

### Feature Implementation
```
brainstorming → outcome-first-thinking → writing-plans
→ [parallel: component-A + component-B] → code-review
→ testing-strategy → documentation
→ verification-before-completion → deploy-checklist
→ [CODE REVIEW] → receiving-peer-review → finishing-a-task
```

### Tech Debt Reduction
```
outcome-first-thinking → brainstorming → writing-plans
→ tech-debt → [parallel: refactors per module]
→ code-review → testing-strategy
→ verification-before-completion → requesting-peer-review
→ [REVIEW] → finishing-a-task
```

## The three most critical pairings

**1. `systematic-problem-solving` before `debug` or `incident-response`**
The engineering plugin's `debug` skill is thorough — reproduce, isolate, diagnose, fix. But it doesn't enforce the discipline of root cause identification before action. `systematic-problem-solving` adds this: define the problem precisely, state hypotheses before testing them, avoid jumping to the most plausible cause. In incidents, this distinction matters more than anywhere.

**2. `outcome-first-thinking` before `architecture` or `system-design`**
Architecture decisions have long lifetimes. Before evaluating trade-offs between Kafka and SQS, or designing a notification system, be explicit about what success looks like, what constraints are fixed, and who the decision serves. The engineering plugin asks about requirements; sosai-superpowers asks whether you have the right requirements.

**3. `verification-before-completion` before `deploy-checklist`**
The deploy checklist verifies that deployment steps are complete. `verification-before-completion` verifies that the work itself — the fix, the feature, the migration — matches the original brief. They are complementary checks at different levels. Run both, in that order.

## Debugging vs. problem-solving: when to use which

`systematic-problem-solving` is the upstream framing step. `debug` is the execution protocol.

Use `systematic-problem-solving` first when:
- The problem is ambiguous ("something broke in production")
- A previous fix attempt made things worse or didn't work
- Multiple systems could be the source
- The scope is unclear (one user? all users? one environment?)

Use `debug` directly when:
- The problem is well-scoped (exact error message, known reproduction path)
- You know which component is failing

## Architecture decisions and benchmarks

Architecture Decision Records (ADRs) often cite performance benchmarks, throughput numbers, or latency figures to justify technology choices. Every technical claim in an ADR that will be reviewed or shared must pass `source-before-claiming` — benchmarks are frequently outdated, context-specific, or cherry-picked.

## Examples

**Example 1: Production incident with unknown scope**
User: "Something is broken in production — users are reporting payment failures."
Applied: systematic-problem-solving is invoked first to define the scope (which users, which payment paths, when it started). incident-response then runs the structured investigation. verification-before-completion checks the fix before deploy-checklist.
Result: Root cause identified (third-party gateway timeout, not application code) before any code was changed.

**Example 2: Architecture decision for a message queue**
User: "Should we use Kafka or SQS for our event bus?"
Applied: outcome-first-thinking defines what the event bus needs to accomplish and what trade-offs are acceptable. research-before-acting ensures both options are understood in context. source-before-claiming is applied to any throughput or latency claims in the ADR.
Result: Decision is scoped to actual requirements, not theoretical maximums, and every benchmark is attributed.

**Example 3: Large refactor across multiple services**
User: "We need to refactor the auth layer across five services."
Applied: brainstorming surfaces scope questions (all at once or incrementally?). writing-plans structures the work into service-by-service tasks. dispatching-parallel-agents fans out independent services. verification-before-completion runs against the original refactor brief before the code review gate.
Result: Five services refactored in parallel with consistent approach, verified against the original brief before review.

## Troubleshooting

**Debug was run before the problem was scoped.**
Stop. Run systematic-problem-solving first. Jumping to reproduction steps before defining the problem precisely leads to fixing symptoms rather than root cause.

**Architecture was decided without defining success criteria first.**
Re-run outcome-first-thinking. An ADR without clear success criteria cannot be evaluated — reviewers have no basis for approval or rejection.

**Benchmarks or performance claims in an ADR are not attributed.**
Run source-before-claiming on the ADR before sending for architecture review. Unattributed technical claims are a leading cause of ADR rejection.

**A fix was deployed without verification-before-completion.**
Check whether the fix actually addressed the original brief, not just the symptom. Run verification-before-completion now as a retrospective check before closing the incident.

## Red Flags

| Situation | Action |
|---|---|
| About to `debug` without knowing the scope | Stop — run `systematic-problem-solving` first |
| About to design an architecture without defined success criteria | Stop — run `outcome-first-thinking` first |
| ADR or technical doc contains benchmarks without sources | Run `source-before-claiming` before review |
| About to claim a fix or feature is done | Run `verification-before-completion` first |
| Fix attempt already failed once | Run `systematic-problem-solving` before trying again |
| Working on multiple unrelated services simultaneously | Run `context-isolation` when switching |

## Full integration reference

See `docs/integration/engineering.md` for complete workflow patterns, gap analysis, and pairing rationale.
