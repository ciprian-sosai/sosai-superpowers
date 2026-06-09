---
name: brainstorming
description: Guides the user through structured intent clarification before any work begins — surfacing assumptions, exploring trade-offs, and locking in a design. Use when starting any task — before researching, writing, planning, or acting — to clarify intent, constraints, and success criteria.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Brainstorming

## Overview

Clarify what you're actually building before you build it. Unexamined assumptions cause more wasted work than technical mistakes.

**Hard gate:** Do NOT produce any output, start any research, or take any action until you have presented a design and the user has approved it.

## Process

1. **Understand context** — review any relevant files, previous work, or background
2. **Ask clarifying questions** — one at a time, until you understand purpose, constraints, and success criteria
3. **Propose 2-3 approaches** — with trade-offs and your recommendation
4. **Present design** — get approval before proceeding
5. **Write a brief spec** — save to `docs/specs/YYYY-MM-DD-<topic>.md`

## Rules

- One question per message — never bundle multiple questions
- Prefer multiple choice over open-ended when possible
- YAGNI — remove anything not explicitly needed
- No implementation until design is approved

## Visual Companion

A browser-based companion for showing mockups, diagrams, and visual options during brainstorming. Available as a tool — not required. Requires Node.js (no npm install needed).

**Offering the companion:** When you anticipate visual questions ahead (process flows, comparisons, decision trees, stakeholder maps), offer it once in its own message — no other content:

> "Some of what we're working through might be clearer if I can show it to you in a browser — process flows, comparison tables, diagrams. Want to try it? (Requires opening a local URL in your browser)"

Wait for the user's response. If they decline, continue text-only.

**If they accept:** Read `skills/brainstorming/references/visual-companion.md` for the full guide before starting the server.

**Per-question decision:** Even after acceptance, use the browser only for content that IS visual. A question about trade-offs is a text question. A question about which process flow works better is a visual question.

## Examples

**Example 1: Marketing campaign planning**
User: "Help me plan a Q3 email campaign for our new product launch."
Applied: The skill asks one question at a time to uncover audience, goal, timeline, and budget constraints before proposing any campaign structure.
Result: Three campaign approaches are presented with trade-offs; the user picks one and a brief spec is saved before any content is drafted.

**Example 2: Operations process redesign**
User: "We need to fix our vendor onboarding process — it takes too long."
Applied: The skill surfaces what "too long" means, who is affected, and what constraints exist before proposing redesign options.
Result: Two approaches (lightweight patch vs. full redesign) are compared and a recommended path is approved before any process documentation is written.

**Example 3: Financial report build**
User: "Put together a monthly exec summary for the CFO."
Applied: The skill clarifies audience, data sources, key metrics to highlight, and format preferences before any structure is proposed.
Result: A one-page spec capturing scope and success criteria is approved, preventing rework when the CFO's actual priorities differ from assumptions.

## Troubleshooting

**Claude started drafting content before the design was approved**
Interrupt and invoke the skill explicitly. Remind Claude the hard gate rule applies: no output until a design is proposed and approved by you.

**Claude asked three questions at once instead of one at a time**
Tell Claude to pause, pick the single most important unknown, and ask only that. The one-question rule is strict — bundling questions skips the clarification discipline.

**Claude proposed only one approach instead of 2-3**
Ask Claude to generate at least one alternative with a different trade-off profile. Single-option proposals often reflect an unexamined assumption about what you want.

**The spec was saved but doesn't match what was actually agreed**
Re-read the spec aloud against your conversation. If it drifts, correct it before any work starts — the spec is the contract.

**Claude skipped clarifying questions because the task seemed simple**
This is the most common failure mode. Prompt Claude with: "Before you proceed, what assumptions are you making?" Simple tasks often hide the most consequential ones.

## Red Flags

| Thought | Reality |
|---|---|
| "This is too simple to need clarification" | Simple tasks hide the most assumptions. Ask. |
| "I can figure out what they want" | You cannot. Ask. |
| "Let me just start and adjust" | Starting wrong wastes more time than asking. |
