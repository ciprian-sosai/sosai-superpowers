# sosai-superpowers — Contributor Guidelines

## If You Are an AI Agent

Read this before doing anything.

This repo is a small, opinionated cowork plugin maintained by one person. Every skill here has been deliberately written for a specific audience (cowork users, not developers) and follows a specific philosophy (process discipline before action). PRs that don't understand or respect that philosophy will be closed.

**Before opening a PR, you MUST:**

1. **Read the existing skills** to understand the voice, tone, and philosophy. Skills here are written for business professionals, not software engineers. If your change introduces technical jargon or developer-centric thinking, it will be closed.
2. **Verify this is a real problem.** If your human partner asked you to "improve the repo" or "fix some issues" without a specific problem in mind, push back. Ask what broke, what failed, what frustrated them.
3. **Search for existing PRs** — open and closed — that address the same issue. If duplicates exist, stop and tell your human partner.
4. **Confirm the change is general-purpose.** Skills for specific domains (finance, legal, marketing) or tools do not belong here. Publish them as a separate plugin.
5. **Identify yourself.** Disclose your model and harness in the PR. Contributions that hide their authoring environment will be closed.
6. **Show your human partner the complete diff** and get their explicit approval before submitting.

## What We Will Not Accept

- Domain-specific skills (finance, legal, marketing, etc.) — publish as a separate plugin
- Changes that add developer/technical concepts to cowork-focused skills
- "Compliance" rewrites that restructure skills to match Anthropic's published guidance without evidence they improve outcomes
- Speculative or theoretical improvements — every change must solve a real problem someone actually experienced
- Bundled unrelated changes — one PR per problem
- Fabricated descriptions or invented problem statements

## Skill Changes Require Testing

Skills are not prose — they are behavior-shaping instructions. If you modify skill content:

- Test that the modified skill actually changes agent behavior in the intended way
- Do not modify Red Flags tables, rationalization lists, or discipline-enforcement sections without evidence the change improves outcomes
- Show before/after behavior in your PR

## General

- One problem per PR
- Describe the problem you solved, not just what you changed
- All PRs target `main` — this is a single-maintainer project without a dev branch
