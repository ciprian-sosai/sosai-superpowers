---
name: requesting-peer-review
description: Use before delivering any significant output — to ask for a review in a way that produces useful feedback
---

# Requesting Peer Review

## Overview

A review request is only as good as the context you provide. "Let me know what you think" produces vague feedback. Specific questions produce actionable feedback.

**Two modes:**
- **Human reviewer** — use the request template below
- **Agent reviewer** — use `peer-reviewer.md` to dispatch a review subagent

## Self-Review First

Before requesting any review, check your own work:
- [ ] Does this meet all success criteria from the brief?
- [ ] Is anything missing that you know should be there?
- [ ] Are there any parts you are unsure about? (Flag these explicitly in the request)

Do not send work for review that you know is incomplete. Fix what you can first.

## Request Template (Human Reviewer)

```
**Reviewing:** [What this is — document, analysis, plan, recommendation, etc.]
**Goal:** [What it was trying to achieve]
**Brief/spec:** [Link or reference to the original brief]
**What I'd like feedback on:** [Specific questions — the more specific, the better]
**What I'm NOT looking for:** [Scope limits, if any — saves reviewer time]
**Uncertain sections:** [Flag anything you're not confident about]
**Where it lives:** [Link or file path]
```

## Specific Questions Beat Vague Asks

| ❌ Vague | ✅ Specific |
|---|---|
| "Is this good?" | "Is the recommendation clear enough to act on without calling me?" |
| "Does this make sense?" | "Does the executive summary accurately represent what's in section 3?" |
| "Any feedback?" | "Is the tone appropriate for a board-level audience?" |
| "Let me know what you think" | "Are the three options genuinely distinct, or do they overlap too much?" |

## Agent Reviewer

To dispatch a review subagent, use the template in `peer-reviewer.md`.

Use an agent reviewer when:
- You want structured, consistent feedback across defined dimensions
- The reviewer is checking against a specific brief or spec
- You want tiered feedback (critical / important / minor)

Use a human reviewer when:
- You need judgment calls that require domain expertise
- The work involves sensitive information
- Stakeholder relationships matter to the feedback
