---
name: requesting-peer-review
description: Structures review requests with context, specific questions, and scope limits that produce actionable feedback from human or agent reviewers. Use before delivering any significant output — to ask for a review in a way that produces useful feedback.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Requesting Peer Review

## Overview

A review request is only as good as the context you provide. "Let me know what you think" produces vague feedback. Specific questions produce actionable feedback.

**Two modes:**
- **Human reviewer** — use the request template below
- **Agent reviewer** — use `references/peer-reviewer.md` to dispatch a review subagent

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

To dispatch a review subagent, use the template in `references/peer-reviewer.md`.

Use an agent reviewer when:
- You want structured, consistent feedback across defined dimensions
- The reviewer is checking against a specific brief or spec
- You want tiered feedback (critical / important / minor)

Use a human reviewer when:
- You need judgment calls that require domain expertise
- The work involves sensitive information
- Stakeholder relationships matter to the feedback

## Examples

**Example 1: Marketing campaign brief review**
User: "I've finished the Q3 campaign brief. Can you help me request feedback from the marketing director?"
Applied: The skill prompts for the brief's goal, specific dimensions to check (audience targeting, budget allocation, channel mix), uncertain sections, and what is out of scope for this review.
Result: A structured request that gets targeted feedback on strategy rather than vague impressions.

**Example 2: Financial analysis peer review**
User: "I need a colleague to review this variance analysis before I send it to the CFO."
Applied: The skill surfaces specific questions — whether the narrative matches the numbers, whether assumptions are visible, and whether the recommendation is actionable — and flags the sections the author is least confident about.
Result: The reviewer can respond precisely without asking clarifying questions, saving a back-and-forth cycle.

**Example 3: Legal contract summary review via agent**
User: "I've drafted a contract summary for a vendor agreement. Should I use an agent or a human to review it?"
Applied: The skill distinguishes the two modes: an agent reviewer for structured, spec-based checks; a human reviewer when sensitive commercial terms or relationship judgment is needed.
Result: The user selects a human reviewer and sends a request scoped to commercial terms only, not boilerplate clauses.

## Troubleshooting

**Reviewer gives vague feedback despite the structured request**
Your "What I'd like feedback on" questions are still too broad. Replace each question with one that has a yes/no or short answer — for example, "Is the recommendation specific enough to act on without calling me?" instead of "Is the recommendation clear?"

**You sent the review request before finishing the work**
The self-review checklist must be completed first. Go back, fix the known gaps, then send. Reviewers should not be triaging incomplete work.

**Agent reviewer returns feedback that misses the point**
The brief or spec reference was missing or vague. Re-run with a direct link or quoted excerpt of the original success criteria so the agent checks against the right standard.

**You filled in every field but still got off-topic feedback**
The "What I'm NOT looking for" field was left blank. Explicitly scope out the dimensions you do not want reviewed — format, grammar, or areas already signed off — to prevent reviewers from spending time there.

**Unsure whether to use a human or agent reviewer**
Default to human when the work involves judgment calls, sensitive information, or stakeholder relationships. Use the agent when you want consistent, tiered feedback against a defined spec.
