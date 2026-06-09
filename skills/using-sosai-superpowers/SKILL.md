---
name: using-sosai-superpowers
description: Establishes process discipline for any cowork session by mapping tasks to the correct sosai-superpowers skill and enforcing skill invocation before any response or action. Use when starting any cowork session — requires Skill tool invocation before ANY response including clarifying questions.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
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

## Examples

**Example 1: Quarterly board report**
User: "Help me put together the Q2 board update."
Applied: The skill identifies that work has a deliverable output, flags `outcome-first-thinking` and `writing-plans` as required before any drafting begins.
Result: Claude invokes both skills first, establishing the expected output format and a written plan before touching any content.

**Example 2: Contract redline review**
User: "Can you review this vendor contract and flag any issues?"
Applied: The skill maps this to `research-before-acting` (read before opining) and `working-with-legal`, then invokes both.
Result: Claude reads the full contract before stating any findings, and applies legal-plugin discipline alongside process checks.

**Example 3: Marketing campaign gone wrong**
User: "Our email open rates dropped 40% this month — can you figure out why?"
Applied: The skill routes this to `systematic-problem-solving` before any hypothesis is stated, preventing premature conclusions.
Result: Claude works through a structured diagnostic rather than jumping to a single cause, surfacing multiple factors for the user to evaluate.

## Troubleshooting

**Claude answered a clarifying question before invoking any skill.**
This violates the core rule. Skill check must happen before any response — including clarifying questions. Restart the turn and invoke the relevant skill first.

**No skill in the table seems to match the task.**
Default to `brainstorming` for any new task. If output will be delivered to a human, also invoke `verification-before-completion` before finishing.

**Claude invoked the domain plugin (e.g. finance) but skipped sosai-superpowers.**
Domain plugins cover what to do, not how to work. Always layer the appropriate sosai-superpowers process skill on top — they do not conflict.

**The skill was invoked but Claude immediately proceeded as if it hadn't.**
The skill content must actually govern the response. If the skill requires a plan before execution, that plan must appear before any task output.

**Multiple skills seem to apply and Claude only invoked one.**
Invoke all that apply — sequentially if they have an order (e.g. brainstorming before writing-plans before executing-plans), or together if they are independent.

## Red Flags — You Are Rationalizing

| Thought | Reality |
|---|---|
| "This is too simple for a skill" | Simple tasks have the most unexamined assumptions. Check. |
| "I need more context first" | Skill check comes BEFORE gathering context. |
| "I already know what to do" | Skills prevent the failure modes you don't see coming. |
| "This doesn't feel like a formal task" | Any action = check for skills. |
| "The specialized plugin covers this" | It covers the domain. sosai-superpowers covers the process. Use both. |
