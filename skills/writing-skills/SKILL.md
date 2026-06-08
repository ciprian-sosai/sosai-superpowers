---
name: writing-skills
description: Use when creating a new cowork skill or editing an existing one — to write skills that are discoverable, concise, and actually followed
---

# Writing Skills

## Overview

A skill is a reference guide for a proven discipline or technique. It tells future Claude instances what to do in a specific situation. Skills that are too long, too vague, or poorly described get skipped.

## Skill File Structure

Save to: `~/.claude/skills/<plugin-name>/skills/<skill-name>/SKILL.md`

```
---
name: skill-name-with-hyphens
description: Use when [specific triggering conditions]
---

# Skill Name

## Overview
Core principle in 1-2 sentences.

## Process
Numbered or checklist steps.

## Red Flags
Table of rationalizations and counters.
```

## Description Rules (Critical)

- Start with "Use when..."
- Describe ONLY when to use it — never summarize what it does
- Under 500 characters
- Written in third person
- No workflow summary (agents will follow the description and skip the skill body)

## Token Budget

- Session-start skills: under 150 words
- All other skills: under 500 words
- Use tables and checklists over prose

## Quality Check Before Deploying

- [ ] Description starts with "Use when..." and contains no workflow summary
- [ ] All steps are actionable — no "handle appropriately" or "as needed"
- [ ] Red flags table covers the most common ways to rationalize skipping the skill
- [ ] Under word budget
