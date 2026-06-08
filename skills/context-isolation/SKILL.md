---
name: context-isolation
description: Use when switching between tasks, starting a fresh task in an active session, or when context from a previous task might affect the current one
---

# Context Isolation

## Overview

Context from one task bleeds into the next. Assumptions formed during Task A contaminate Task B. Explicitly resetting context prevents this.

## When Switching Tasks

- [ ] State the new task explicitly — do not carry forward the frame of the previous task
- [ ] Identify any assumptions from the previous task that might not apply
- [ ] If the new task requires different data, fetch it fresh — do not rely on what's already loaded
- [ ] If you are unsure whether context is still valid: treat it as invalid and re-verify

## When Starting Fresh in an Active Session

- [ ] Confirm: does anything from earlier in this session apply to this task?
- [ ] If yes: state explicitly what carries over and why
- [ ] If no: proceed as if starting a new session

## Signs of Context Bleed

- Applying a constraint from a previous task to a new one without checking
- Reusing data or research without confirming it's still relevant
- Answering the previous task's question instead of the current one
