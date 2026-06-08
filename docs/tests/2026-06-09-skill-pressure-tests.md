# sosai-superpowers — Skill Pressure Tests
**Date:** 2026-06-09
**Method:** Subagent simulation — same prompt dispatched to two agents: one with no skill loaded (baseline), one with the skill injected into context. Both received identical pressure scenarios.
**Purpose:** Verify that discipline skills hold under realistic pressure — not just on cooperative prompts.

---

## Methodology

### Why pressure scenarios?

A discipline skill that only works when the user is patient and cooperative isn't useful. The whole point of sosai-superpowers is to hold the process when context is pushing toward shortcuts. Each test prompt included at least one real-world pressure:

- Time urgency ("in 20 minutes", "board meeting tomorrow")
- Authority pressure ("my manager wants to start today", "my director is furious")
- Sunk cost ("we've already tried twice")
- Implicit pressure to just deliver ("I need something concrete right now")

### Test structure

For each scenario:
1. Same prompt given to both agents
2. Baseline: no skill loaded — pure model behavior
3. With plugin: full SKILL.md injected into agent context
4. Observed: does the skill change the behavior in the intended direction?

### Pass criteria

- Skill enforces its hard gate / iron law under pressure
- Skill handles the pressure explicitly (names it, doesn't just ignore it)
- Skill produces meaningfully different behavior from the baseline

---

## Scenario 1 — Brainstorming Under Time Pressure

**Skill tested:** `brainstorming`
**Pressure:** "We're doing a retrospective today at 3pm, in 20 minutes, I need something concrete right now."

**Prompt:**
> "Our weekly team meeting is a disaster — people show up late, we go off-topic, nothing gets decided. I need you to help me fix it. We're doing a retrospective on the meeting format today at 3pm, which is in 20 minutes, so I need something concrete I can bring to the team right now."

### ❌ Baseline (no skill)

Immediately produced a complete "Fix Your Weekly Team Meeting — Retro Kit" with:
- A full 45-minute agenda template
- 4 structural rules
- 3 retro questions
- A closing script

**Assumptions made without asking:**
- That a structured format is what's needed (vs. the team deciding their own format)
- That the meeting is 45 minutes
- That this is a standing team meeting (not project-based or cross-functional)
- That the user is running the retro (not just a participant)
- That the problem is structure (vs. culture, attendance, or wrong attendees)

The output was confident, well-formatted, and built entirely on unverified assumptions.

### ✅ With plugin

> *"I can help you fix this fast. One quick question before I put something together: What's the meeting's primary purpose — and roughly how many people attend? A) Status updates / information sharing (5–15 people), B) Decision-making / problem-solving (3–8 people), C) A mix of both. Answer in one word if you need to — I'll build the rest around it."*

**What the skill enforced:**
- Hard gate: no output until one question is answered
- Respected urgency without abandoning discipline ("answer in one word")
- Multiple choice to minimize friction
- The answer to this single question completely changes the recommendation

### Results

| Dimension | Baseline | With plugin |
|---|---|---|
| Speed to output | Instant | One question first |
| Assumption risk | High — 5+ unverified | Low — 1 question eliminates the biggest one |
| Urgency handling | Caved immediately | Held discipline, reduced friction |
| Output quality | Good IF assumptions right | Better once answered |

**Verdict: ✅ PASS** — held the hard gate under 20-minute time pressure.

---

## Scenario 2 — Writing Plans Under Manager Pressure

**Skill tested:** `writing-plans`
**Pressure:** "My manager wants to start today."

**Prompt:**
> "We need to migrate all our client reports from the old Excel template to the new branded one. There are about 40 reports across 12 clients. My manager wants to start today — can you help me get this done?"

### ❌ Baseline (no skill)

Produced a helpful 4-step guide covering:
- Gather what you need (5 minutes)
- Create a tracking sheet
- Migrate client by client
- Consider automation (VBA macro or Power Query)

Ended with 3 clarifying questions — but after the guide, not before. By the time the user reads them, they've already mentally committed to the suggested approach.

**Risks introduced:**
- No scope split flagged (audit and migration are independent workstreams)
- No definition of "done" or sign-off criteria
- Jumped to automation suggestion before knowing if reports are structurally similar
- Started executing, then asked questions

### ✅ With plugin

1. **Wrote the plan header first** — Goal, Approach, Inputs — forcing articulation of what "done" means before any steps
2. **Caught a scope problem immediately** — flagged that Setup & Audit and Migration & QA are two independent workstreams that should potentially be split (invisible without a planning pass)
3. **Asked 4 targeted inputs questions** — file location, definition of "migrate", who reviews, structural variation — before writing any steps
4. **Addressed the manager pressure directly:**
   > *"On the 'manager wants to start today' pressure: I hear you, and we will start today. But starting without a field mapping document on 40 reports across 12 clients is exactly how you create inconsistencies that take longer to fix than the 20 minutes this plan will take. The first task (audit + mapping) is starting — it just makes every step after it faster and checkable."*

### Results

| Dimension | Baseline | With plugin |
|---|---|---|
| Scope problem detected | ❌ Not noticed | ✅ Flagged immediately |
| Started executing | Immediately | Refused until inputs confirmed |
| Questions timing | After output | Before output |
| Manager pressure handled | Caved silently | Addressed with explicit reasoning |
| Plan structure | Ad-hoc guide | Structured header + success criteria |

**Verdict: ✅ PASS** — caught a real scope issue the baseline missed entirely, held the plan-before-execution gate under manager pressure.

---

## Scenario 3 — Verification Before Completion

**Skill tested:** `verification-before-completion`
**Pressure:** Implicit — research is complete, natural next step is to deliver.

**Setup:** Research on 3 CRM tools (Salesforce, HubSpot, Pipedrive) completed. Original brief: compare on ease of use, pricing for 12 users, Gmail integration. Deliver findings.

### ❌ Baseline (no skill)

Delivered a clean, well-structured comparison with a clear recommendation. Ended with:
> *"Let me know if you want a deeper dive on any of these, or help thinking through the rollout."*

No verification step. No acknowledgment of what was and wasn't confirmed.

**What the user couldn't know:**
- Whether pricing was checked against live sources or estimated
- Whether the 12-user monthly total was calculated (it wasn't — $900 vs $240 is a compelling number that was left out)
- Whether the recommendation mapped to the original criteria

The output looked complete. That's the danger — confident presentation with unverified claims.

### ✅ With plugin

Before presenting anything, ran a verification pass:

```
✓ All three tools compared
✓ Ease of use: covered for all three
⚠ Pricing for 12 users: per-user given but 12-user totals not calculated — adding now
✓ Gmail integration: covered for all three
✓ Recommendation with reasoning: provided

Not verified:
- Pricing not confirmed against live vendor pages — treat as directional estimates
```

Then delivered the full comparison with the gap filled (added $900/mo vs $240/mo totals) and an explicit caveat on pricing accuracy.

### Results

| Dimension | Baseline | With plugin |
|---|---|---|
| Verification step | ❌ Skipped | ✅ Ran against original criteria |
| Gap detected | ❌ 12-user totals missing | ✅ Caught and filled |
| Pricing caveat | ❌ None | ✅ Explicit |
| Confidence language | "Here are the findings" | "Here's what I verified / not verified" |
| User trust | High confidence, unknown accuracy | Calibrated confidence |

**Verdict: ✅ PASS** — caught a real gap, filled it, and reported honestly what was and wasn't verified. Baseline delivered the same answer with more confidence and less honesty.

---

## Scenario 4 — Systematic Problem Solving Under Board Meeting Pressure

**Skill tested:** `systematic-problem-solving`
**Pressure:** "Board meeting tomorrow", "director is furious", "we've already tried twice."

**Prompt:**
> "Our monthly sales report keeps showing wrong revenue numbers. It's been happening for 3 months and my director is furious. We've already tried updating the formula twice and rechecking the data source but it keeps coming back wrong. I need this fixed before tomorrow's board meeting. What should I do?"

### ❌ Baseline (no skill)

Produced a 5-step diagnosis guide with specific suggestions:
- Check for duplicate rows in the source data
- Audit date filters and period bleed
- Verify CRM connection isn't pointing to staging environment
- Manual spot-check one data slice
- Prepare a backup figure for the director tonight

Genuinely reasonable advice — but it added 5 more things to try on a problem where 2 previous fixes already failed. The user is now looking at attempt #3 through #7, with no guarantee any will hold. The 2-failure pattern was not named or acted on.

### ✅ With plugin

Opened with a structural diagnosis before any suggestions:

> *"This is a structural problem. Two failed fixes are a clear signal — I cannot propose another fix until we find the root cause. Jumping to a third attempt will likely waste the time you don't have before tomorrow's board meeting."*

Then ran Phase 1 with 5 targeted investigation questions:

1. **Precise problem statement** — consistent error or variable? which revenue lines affected?
2. **How "wrong" is measured** — what are they comparing against to know it's wrong?
3. **What changed 3 months ago** — new CRM, new product category, new person, fiscal rollover?
4. **Full data chain trace** — where does data originate, who touches it, what was "rechecked"?
5. **What the 2 failed fixes actually did** — what did each expect to fix, what happened instead?

### Results

| Dimension | Baseline | With plugin |
|---|---|---|
| Proposed new fixes immediately | ✅ 5 suggestions | ❌ Refused — investigation first |
| Recognized 2-failure structural signal | ❌ Ignored | ✅ Named explicitly |
| Board meeting pressure | Gave more things to try | Reframed urgency correctly |
| Questions | After suggestions, optional | Required before anything |
| Risk of fix #3 also failing | High | Eliminated until root cause found |

**Verdict: ✅ PASS** — refused to propose a third fix on a problem with two failed fixes, named the structural signal, and ran a proper investigation sequence.

---

## Overall Results

| # | Scenario | Skill | Pressure | Verdict |
|---|---|---|---|---|
| 1 | Team meeting retro | `brainstorming` | 20-minute deadline | ✅ PASS |
| 2 | Excel report migration | `writing-plans` | Manager wants to start today | ✅ PASS |
| 3 | CRM tool comparison | `verification-before-completion` | Implicit delivery pressure | ✅ PASS |
| 4 | Wrong revenue numbers | `systematic-problem-solving` | Board meeting tomorrow + 2 prior failed fixes | ✅ PASS |

**All 4 skills passed under pressure.**

---

## Key Observations

**1. The skills handle urgency, not just cooperative prompts.**
Every baseline response was reasonable under normal circumstances. The plugin's value shows specifically when pressure is applied — that's when unguided models take shortcuts, and that's exactly when the skills hold.

**2. The skills surface hidden problems.**
- Scenario 2: scope split between audit and migration — invisible without a planning pass
- Scenario 3: missing 12-user totals — a compelling number left out of the baseline
- Scenario 4: structural failure signal from 2 prior fixes — baseline added more fixes without recognizing the pattern

**3. The skills address pressure explicitly.**
Rather than ignoring urgency, the with-plugin responses named it and reframed it:
- "Answer in one word if you need to" (Scenario 1)
- "Starting without a plan is how you create inconsistencies that take longer to fix than the plan" (Scenario 2)
- "Jumping to a third attempt will waste the time you don't have" (Scenario 4)

**4. Baseline outputs look good. That's the risk.**
In every scenario, the baseline response was polished, confident, and easy to act on. The problem isn't that unguided models produce bad outputs — it's that they produce outputs that look complete while hiding unverified assumptions, missed scope, and structural signals. The plugin makes those visible.

---

## How to Re-run These Tests

Each test can be re-run by dispatching two subagents with identical prompts:

1. **Baseline agent:** system prompt = "You are a helpful AI assistant for business professionals." No skill content.
2. **With-plugin agent:** same system prompt + full SKILL.md content injected.

Compare responses for:
- Does the baseline take the shortcut the skill is designed to prevent?
- Does the with-plugin version enforce the discipline gate?
- Does the with-plugin version address the pressure explicitly?
- Does the with-plugin version surface anything the baseline missed?
