# sosai-superpowers Design Spec
**Date:** 2026-06-08  
**Author:** Ciprian Sosai  
**Status:** Approved

---

## Overview

`sosai-superpowers` is an original Claude cowork plugin inspired by the [superpowers](https://github.com/obra/superpowers) plugin by Jesse Vincent. It brings the same philosophy — enforce discipline before action — to cowork tasks. All skill content is written from scratch for the cowork context. The 1-to-1 mapping with superpowers is a structural guide, not a copy.

It is designed for personal use and public sharing via GitHub, targeting generic cowork users regardless of domain — not specific to finance, marketing, or any other vertical.

---

## Goals

- Enforce discipline before action in cowork tasks (clarify, plan, verify)
- Provide original skills inspired by superpowers, written from scratch for cowork
- Be generic — useful to any cowork user, not tied to a specific domain
- Be installable by anyone via `git clone`
- Be accessible to non-technical users (no assumed coding knowledge)
- Credit superpowers by Jesse Vincent as the inspiration in the README

---

## Repository

- **Name:** `sosai-superpowers`
- **URL:** https://github.com/ciprian-sosai/sosai-superpowers
- **License:** MIT
- **Author:** Ciprian Sosai <ciprian@sosai.ro>

---

## Plugin Structure

```
sosai-superpowers/
  .claude-plugin/
    plugin.json
  skills/
    using-sosai-superpowers/
      SKILL.md
    brainstorming/
      SKILL.md
    writing-plans/
      SKILL.md
    executing-plans/
      SKILL.md
    outcome-first-thinking/
      SKILL.md
    systematic-problem-solving/
      SKILL.md
    subagent-driven-execution/
      SKILL.md
    writing-skills/
      SKILL.md
    verification-before-completion/
      SKILL.md
    finishing-a-task/
      SKILL.md
    requesting-peer-review/
      SKILL.md
    receiving-peer-review/
      SKILL.md
    dispatching-parallel-agents/
      SKILL.md
    context-isolation/
      SKILL.md
    source-before-claiming/
      SKILL.md
    research-before-acting/
      SKILL.md
  hooks/
    hooks.json
    session-start
  README.md
```

---

## Plugin Metadata (`plugin.json`)

```json
{
  "name": "sosai-superpowers",
  "description": "Cowork discipline skills: outcome-first thinking, systematic problem-solving, and proven workflow patterns",
  "version": "1.0.0",
  "author": {
    "name": "Ciprian Sosai",
    "email": "ciprian@sosai.ro"
  },
  "homepage": "https://github.com/ciprian-sosai/sosai-superpowers",
  "repository": "https://github.com/ciprian-sosai/sosai-superpowers",
  "license": "MIT"
}
```

---

## Hooks

A `session-start` hook injects `using-sosai-superpowers` at the start of every cowork session, enforcing the "check for skills first" discipline — mirroring how superpowers hooks work.

---

## Skill Inventory

### Skills that mirror superpowers (same discipline, cowork-adapted examples)

| Skill | Superpowers equivalent | Notes |
|---|---|---|
| `using-sosai-superpowers` | `using-superpowers` | Meta-skill; enforces checking for skills before any action |
| `brainstorming` | `brainstorming` | Same discipline; examples use business tasks not code |
| `writing-plans` | `writing-plans` | Plans for campaigns/projects/ops, not code |
| `executing-plans` | `executing-plans` | Same; cowork examples |
| `verification-before-completion` | `verification-before-completion` | Same discipline; different verification actions |
| `writing-skills` | `writing-skills` | Meta-skill for creating new skills |
| `dispatching-parallel-agents` | `dispatching-parallel-agents` | Same concept; cowork use cases |
| `subagent-driven-execution` | `subagent-driven-development` | Parallel task execution for business work |

### Skills requiring meaningful translation

| Skill | Superpowers equivalent | Key difference |
|---|---|---|
| `outcome-first-thinking` | `test-driven-development` | Define what success looks like *before* starting any task — a report, campaign, vendor review, analysis |
| `systematic-problem-solving` | `systematic-debugging` | When a workflow/process/result isn't working — root cause before jumping to fixes |
| `finishing-a-task` | `finishing-a-development-branch` | Checklist for wrapping up cowork tasks: review, deliver, document, close |
| `requesting-peer-review` | `requesting-code-review` | Ask a human or second agent to review before delivering work |
| `receiving-peer-review` | `receiving-code-review` | Handle feedback critically and rigorously, not performatively |
| `context-isolation` | `using-git-worktrees` | Keep tasks scoped — prevent context from one task bleeding into another |

### Cowork-native skills (no superpowers equivalent)

| Skill | Purpose |
|---|---|
| `source-before-claiming` | Never state a fact without knowing its source — critical discipline for business work |
| `research-before-acting` | Understand the situation fully before producing any output |

---

## Skill Authoring Principles

1. **Original content only** — all skill text written from scratch; superpowers credited as inspiration in README, not inline
2. **Generic cowork examples** — tasks any cowork user might do (research, planning, reviewing, reporting) — not domain-specific
3. **Audience-aware writing** — accessible to non-technical business professionals; no assumed knowledge of TDD, git, or software concepts
4. **Stay concise** — follow the same token-efficiency rules as superpowers (`<150 words` for session-start skills, `<500 words` for others)
5. **CSO (Claude Search Optimization)** — descriptions start with "Use when...", trigger conditions only, no workflow summary

---

## Audience

- **Cowork power users** — people using Claude cowork heavily who want disciplined workflows
- **Business professionals** — non-technical people using cowork for ops, marketing, sales, etc.
- **Claude Code developers** — people using both superpowers and cowork who want parity

---

## Interaction with Specialized Plugins

sosai-superpowers operates at the **process layer** — it governs how to work (clarify, plan, verify). Domain-specific plugins (finance, legal, marketing, etc.) operate at the **domain layer** — they govern what to do in a specific area.

They are complementary and do not conflict:
- sosai-superpowers skills wrap around domain tasks (before and after)
- Domain skills handle the substance of the task itself
- Users with both installed get process discipline + domain expertise

The `using-sosai-superpowers` meta-skill explicitly communicates this to the agent.

---

## Out of Scope (v1)

- A unified plugin working in both Claude Code and cowork simultaneously (v2 candidate)
- Domain-specific vertical skills (marketing-specific, sales-specific, etc.)
- GUI or web-based skill browser
