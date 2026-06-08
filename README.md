# sosai-superpowers

Discipline skills for Claude cowork — clarify before acting, plan before executing, verify before delivering.

Inspired by [superpowers](https://github.com/obra/superpowers) by Jesse Vincent. Original content written for the cowork context.

---

## Installation

```bash
git clone https://github.com/ciprian-sosai/sosai-superpowers ~/.claude/skills/sosai-superpowers
```

Restart Claude cowork. Skills are available immediately as `sosai-superpowers:<skill-name>`.

📖 **New to cowork or this plugin?** Read the [Complete Beginner's Guide](docs/guide.md).

---

## Skills

| Skill | When to use |
|---|---|
| `using-sosai-superpowers` | Auto-loaded at session start |
| `getting-started` | When you're new to the plugin — interactive tour of all skills |
| `brainstorming` | Before acting on any task — clarify intent first |
| `writing-plans` | Before executing — plan the work |
| `executing-plans` | When running a written plan |
| `outcome-first-thinking` | Before starting any task — define what success looks like |
| `systematic-problem-solving` | When something isn't working — find root cause |
| `subagent-driven-execution` | When tasks can run in parallel |
| `writing-skills` | When creating new cowork skills |
| `verification-before-completion` | Before claiming work is done |
| `finishing-a-task` | When wrapping up and delivering work |
| `requesting-peer-review` | Before delivering — ask for a review |
| `receiving-peer-review` | When handling review feedback |
| `dispatching-parallel-agents` | When fanning out independent research or tasks |
| `context-isolation` | When switching tasks — avoid context bleed |
| `source-before-claiming` | Before stating any fact — know your source |
| `research-before-acting` | Before producing output — understand the situation |
| `working-with-financial-services` | When using the Anthropic financial-services plugin |
| `working-with-finance` | When using the Anthropic finance (accounting) plugin |
| `model-assumptions-audit` | After building any financial model — verify assumptions and plausibility |

---

## Philosophy

These skills enforce one principle: **discipline before action**. Each skill is a lightweight guardrail that prevents the most common failure modes in cowork tasks — acting without clarity, delivering without verification, stating without sources.

---

## License

MIT © Ciprian Sosai <ciprian@sosai.ro>
