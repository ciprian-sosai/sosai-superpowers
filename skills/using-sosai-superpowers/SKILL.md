---
name: using-sosai-superpowers
description: Use when starting any cowork session — establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions
---

---
**CRITICAL RULE**

If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

**IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.**

---

# Using sosai-superpowers

## The Rule

**Invoke relevant skills BEFORE any response or action.** Even a 1% chance a skill might apply means invoke it first.

## How to Use Skills

Use the `Skill` tool with the skill name: `sosai-superpowers:<skill-name>`

## When to Invoke Which Skill

| Situation | Skill to invoke |
|---|---|
| User is new to the plugin or asks how it works | `getting-started` |
| Starting any task — even a "simple" one | `brainstorming` |
| About to execute multi-step work | `writing-plans` |
| Running a written plan | `executing-plans` |
| Starting any task with deliverable output | `outcome-first-thinking` |
| Something isn't working | `systematic-problem-solving` |
| Tasks can be done independently | `dispatching-parallel-agents` |
| About to claim work is complete | `verification-before-completion` |
| Wrapping up and delivering | `finishing-a-task` |
| About to deliver to a human | `requesting-peer-review` |
| Received feedback on your work | `receiving-peer-review` |
| Switching between tasks | `context-isolation` |
| About to state a fact | `source-before-claiming` |
| Starting research or analysis | `research-before-acting` |
| Creating a new skill | `writing-skills` |
| Working with the financial-services plugin | `working-with-financial-services` |
| Working with the finance (accounting) plugin | `working-with-finance` |
| Working with the legal plugin | `working-with-legal` |
| Working with the data plugin | `working-with-data` |
| Working with the sales plugin | `working-with-sales` |
| Working with the product-management plugin | `working-with-product-management` |
| Working with the operations plugin | `working-with-operations` |
| Working with the marketing plugin | `working-with-marketing` |
| After building any financial model or analysis | `model-assumptions-audit` |

## Relationship with Specialized Plugins

sosai-superpowers governs **process discipline** — how to work. It does not replace domain-specific plugins (finance, legal, marketing, etc.) — those govern **what to do** in a specific domain.

Use both together:
1. `sosai-superpowers:brainstorming` → clarify scope
2. `finance:journal-entry` (or whichever domain skill applies) → do the domain task
3. `sosai-superpowers:verification-before-completion` → verify before delivering

If a specialized plugin and a sosai-superpowers skill both seem to apply, use both — they operate at different levels and do not conflict.

## Red Flags — You Are Rationalizing

| Thought | Reality |
|---|---|
| "This is too simple for a skill" | Simple tasks have the most unexamined assumptions. Check. |
| "I need more context first" | Skill check comes BEFORE gathering context. |
| "I already know what to do" | Skills prevent the failure modes you don't see coming. |
| "This doesn't feel like a formal task" | Any action = check for skills. |
| "The specialized plugin covers this" | It covers the domain. sosai-superpowers covers the process. Use both. |
