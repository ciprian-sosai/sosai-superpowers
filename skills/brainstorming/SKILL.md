---
name: brainstorming
description: Use when starting any task — before researching, writing, planning, or acting — to clarify intent, constraints, and success criteria
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

**If they accept:** Read `skills/brainstorming/visual-companion.md` for the full guide before starting the server.

**Per-question decision:** Even after acceptance, use the browser only for content that IS visual. A question about trade-offs is a text question. A question about which process flow works better is a visual question.

## Red Flags

| Thought | Reality |
|---|---|
| "This is too simple to need clarification" | Simple tasks hide the most assumptions. Ask. |
| "I can figure out what they want" | You cannot. Ask. |
| "Let me just start and adjust" | Starting wrong wastes more time than asking. |
