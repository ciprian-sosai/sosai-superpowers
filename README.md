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
| `working-with-legal` | When using the Anthropic legal plugin |
| `working-with-data` | When using the Anthropic data plugin |
| `working-with-sales` | When using the Anthropic sales plugin |
| `working-with-product-management` | When using the Anthropic product-management plugin |
| `working-with-operations` | When using the Anthropic operations plugin |
| `working-with-marketing` | When using the Anthropic marketing plugin |
| `working-with-daloopa` | When using the Anthropic daloopa plugin |
| `working-with-engineering` | When using the Anthropic engineering plugin |
| `working-with-enterprise-search` | When using the Anthropic enterprise-search plugin |
| `working-with-small-business` | When using the Anthropic small-business plugin |
| `model-assumptions-audit` | After building any financial model — verify assumptions and plausibility |

---

## Using alongside superpowers

This plugin is inspired by Jesse Vincent's [superpowers](https://github.com/obra/superpowers). Both can be installed simultaneously — they use separate namespaces (`superpowers:*` vs `sosai-superpowers:*`) and don't conflict at a system level.

**The distinction:** superpowers is developer-focused — TDD, git worktrees, code review, systematic debugging. sosai-superpowers is business-professional focused — domain plugin integrations, source discipline, outcome framing, financial model auditing. If you do both kinds of work, install both.

**Six skills exist in both plugins** with different content: `brainstorming`, `writing-plans`, `executing-plans`, `dispatching-parallel-agents`, `verification-before-completion`, `writing-skills`. The superpowers versions reference commits, tests, and code. The sosai-superpowers versions are for business tasks with no code context. Both session-start skills load when both plugins are installed — this adds some token overhead but causes no behavioural conflict.

**The one real tension:** if both `writing-skills` skills are active and you create a new cowork skill, Claude may follow either plugin's conventions. Invoke `sosai-superpowers:writing-skills` explicitly if you want this plugin's conventions applied.

---

## Philosophy

These skills enforce one principle: **discipline before action**. Each skill is a lightweight guardrail that prevents the most common failure modes in cowork tasks — acting without clarity, delivering without verification, stating without sources.

---

## Testing

Discipline skills are verified through behavioral pressure tests — each skill is run against scenarios designed to trigger the rationalizations it is meant to prevent. Tests compare agent behavior with and without the skill loaded.

📋 **Test results and scenarios:** [docs/tests/behavioral-tests.md](docs/tests/behavioral-tests.md)

Contributors modifying discipline skills must re-run the relevant scenarios before submitting. See [CLAUDE.md](CLAUDE.md) for the full contribution policy.

---

## License

MIT © Ciprian Sosai <ciprian@sosai.ro>
