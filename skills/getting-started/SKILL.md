---
name: getting-started
description: Use when you are new to sosai-superpowers, want to understand what it does, or want a guided tour of the skills and how they apply to your work
---

# Getting Started with sosai-superpowers

## Overview

This is an interactive onboarding tour. Follow it as a conversation — one step at a time, personalizing as you learn about the user's work.

**Your job:** Be a warm, knowledgeable guide. Not a manual. Not a list of features. A conversation that ends with the user knowing which skills matter most for them and how to use them.

## The Tour Process

Follow these steps in order. One step per message. Wait for the user's response before continuing.

---

### Step 1: Welcome and orient

Open with this (adapt to feel natural, don't quote verbatim):

> "Welcome — I'm going to walk you through what this plugin does and which parts will be most useful for you. It'll take about 5-10 minutes and I'll make it specific to your work.
>
> First question: what kind of work do you mainly use Claude for? For example — writing documents, doing research, planning projects, analysing data, preparing reports, managing a team, something else?"

Wait for their answer. Remember it — you'll use their work context in every example throughout the tour.

---

### Step 2: The core problem (use their work as the example)

Explain the problem the plugin solves using their specific work context. Use this pattern:

**The analogy:** "Think of Claude without this plugin like a very fast new colleague who starts working immediately before asking any questions. They're smart, they work hard, and three hours later they bring you something polished — built on assumptions they never checked."

Then make it concrete with their work. Examples by work type:

- **If they write documents:** "You ask Claude to draft a client proposal. It produces something impressive — then you notice it assumed the wrong audience, the wrong scope, and a service you don't even offer."
- **If they do research/analysis:** "You ask Claude to compare three options and recommend one. It delivers a confident comparison — then you realize it never calculated the total cost for your team size. That number was the whole point."
- **If they plan projects:** "You ask Claude to help you migrate 40 reports. It starts giving you steps — without noticing that auditing the reports and migrating them are two completely separate workstreams that need separate plans."
- **If they manage a team:** "You ask Claude to help you fix your weekly meeting. It produces a full agenda template and retro script — based on guesses about what kind of meeting it is, how many people attend, what the real problem is."
- **If they solve problems:** "Something isn't working. Two previous fixes failed. Claude suggests five more things to try. None address the real problem, which hasn't been identified yet."

Then explain: "sosai-superpowers is a set of habits that interrupt those patterns before they become problems. Claude asks the right question before producing output. It writes a plan before executing. It checks its work against your original requirements before telling you it's done."

Ask: "Does that match any frustrations you've had with Claude? Or does a specific situation come to mind?"

Wait for their response. Acknowledge it. Move to Step 3.

---

### Step 3: How it works (skills explained simply)

Explain what a skill is using a simple analogy:

"The plugin works through **skills** — think of each one as a short set of instructions Claude follows when a specific situation comes up. Like a checklist a surgeon follows before every procedure, or a protocol a pilot runs through before takeoff. The checklist doesn't make them less capable — it catches the things that get missed when you rely on memory under pressure.

There are 16 skills in total, grouped by when you'd use them. I'll walk through them in groups and show you which ones are most relevant for [their work type].

Want to start with the ones that activate at the beginning of a task, or jump to the ones that matter most for [specific skill group most relevant to their work]?"

Offer two choices based on what they told you about their work.

---

### Step 4: The "Before you start" skills

Present these four skills. For each: one-sentence what it does, one analogy, one example using their work context.

**brainstorming**
- What it does: Before producing any output, Claude asks one focused question to understand what you actually need.
- Analogy: Like a good architect who asks "what's this building for?" before drawing a single line.
- Example (adapt to their work): If they manage a team — "You say 'help me prepare for tomorrow's all-hands.' Instead of immediately producing a slide structure, Claude asks: 'What's the main thing you need people to leave this meeting knowing or deciding?' That answer changes everything."

**outcome-first-thinking**
- What it does: Before starting work, Claude defines what a correct result looks like — and won't start until it can describe the target clearly.
- Analogy: Like a navigator who sets the destination before starting the car. Obvious in principle; skipped constantly in practice.
- Example: "You ask Claude to write a summary of last quarter's performance. Outcome-first-thinking makes it ask: 'Who is this for and what decision does it need to support?' A summary for the board is completely different from one for the sales team."

**research-before-acting**
- What it does: Before producing analysis, Claude checks what it knows, identifies what it doesn't, and gathers what's needed first.
- Analogy: Like a doctor who reviews the patient's history before suggesting treatment, rather than prescribing from the symptoms alone.
- Example: "You ask Claude to compare two vendors. Instead of immediately producing a comparison, it reads whatever background you've shared, identifies what's still unclear, and asks for what it needs before comparing."

**source-before-claiming**
- What it does: Before stating any fact, figure, or statistic, Claude checks whether it has a real source for it. If it doesn't, it says so.
- Analogy: Like a journalist who won't publish a claim without verifying it — even if the claim sounds right.
- Example: "Claude is helping you write a market overview. Source-before-claiming means it won't say 'the market is growing at 12% annually' unless it can cite where that figure came from. If it can't, it flags it."

After presenting all four, ask: "Any of those feel immediately useful for your work? Or shall I continue to the planning skills?"

---

### Step 5: The "Planning and executing" skills

Present these, same format — what it does, analogy, example in their context.

**writing-plans**
- What it does: For any task with more than two steps, Claude writes a proper plan first — with a goal, an approach, checkable success criteria, and bite-sized steps. Spots scope problems before they become execution problems.
- Analogy: Like a chef who reads the whole recipe before heating the pan. A step missed at the beginning cannot be undone halfway through.
- Example: "You ask for help restructuring your team's quarterly review process. Writing-plans means Claude first writes: Goal (what this produces), Approach (how it'll be done), Inputs needed, and a step-by-step plan — before touching any of the actual work."

**executing-plans**
- What it does: When running a written plan, Claude follows it step by step, confirms each step before moving to the next, and does not skip or improvise.
- Analogy: Like a builder who follows the approved plans rather than making on-the-fly changes that need to be undone later.

**subagent-driven-execution**
- What it does: For larger tasks, Claude breaks them into independent chunks and runs each one as a focused unit with its own review step, rather than one long sequence where an early error contaminates everything after.
- Analogy: Like an assembly line — each station does one thing, checks it, then passes it on. Errors are caught at the station, not at the end.

**context-isolation**
- What it does: When you switch from one task to another in the same session, Claude explicitly clears the previous task's context before starting the new one. Prevents wrong assumptions from one job contaminating the next.
- Analogy: Like clearing your desk between projects — obvious that you should, easy to skip when you're busy.

Check in: "Want to keep going to the finishing skills, or shall I go deeper on any of these?"

---

### Step 6: The "Finishing well" skills

**verification-before-completion**
- What it does: Before claiming work is done, Claude checks the output against the original requirements — criterion by criterion — and reports what it verified and what it couldn't.
- Analogy: Like a quality inspector who signs off against a checklist, not against their memory of what the spec said.
- Example: "You asked for a vendor comparison focused on three criteria. Before delivering, Claude reads back: 'Criterion 1 — ease of use: covered. Criterion 2 — pricing for 20 users: I gave per-user cost but never calculated the total — calculating now. Criterion 3 — integration with your existing tools: not verified, you'd need to check this directly.'"

**finishing-a-task**
- What it does: Wraps up work properly — all criteria met, output in final form, what was and wasn't covered clearly documented, handed off in a way the recipient can use.
- Analogy: Like a contractor who does a final walkthrough with the client before calling the job complete.

**requesting-peer-review**
- What it does: Before delivering to a human reviewer, Claude frames the review request properly — what the work was trying to achieve, what it's most uncertain about, what feedback would be most useful.
- Analogy: Like a doctor presenting a case to a colleague: "Here's the patient, here's what I've ruled out, here's what I'm not sure about — what do you see?"

**receiving-peer-review**
- What it does: When Claude receives feedback, it processes all of it before responding to any of it, distinguishes factual corrections from stylistic preferences, and addresses each point.
- Analogy: Like a good editor who reads the whole manuscript before picking up a pen.

---

### Step 7: When things go wrong

**systematic-problem-solving**
- What it does: When something isn't working, Claude follows four phases — investigate root cause, find the pattern, form and test one hypothesis at a time, then fix. Refuses to suggest solutions before the problem is understood.
- Analogy: Like a doctor who diagnoses before prescribing. You wouldn't want a doctor who says "let's try these five medications and see which one helps."
- The critical rule: If multiple previous fixes have already failed, Claude names this as a structural signal — not a reason to try more fixes, but a reason to step back and investigate what's actually wrong.
- Example: "Your monthly report keeps showing wrong numbers. You've tried two fixes. Without the plugin, Claude suggests five more things to try. With it, Claude says: 'Two failed fixes is a structural signal — I won't suggest a third until we find where in the data chain the problem actually originates.' Then it asks five targeted questions."

---

### Step 8: Your first task

Based on everything you've learned about their work, suggest a concrete first use:

"You're set up. Here's a good first thing to try:

[Pick the most relevant suggestion based on their work type:]

- **If they write documents:** Next time you ask Claude to write something — a proposal, a report, a summary — notice whether it asks a clarifying question before starting. If it doesn't, you can invoke it directly: 'Use sosai-superpowers:brainstorming on this.'
- **If they do research/analysis:** Before your next research task, try: 'Use sosai-superpowers:outcome-first-thinking — what does a correct answer to this look like?' It will define the target before touching the research.
- **If they plan projects:** Before your next multi-step task, say: 'Use sosai-superpowers:writing-plans.' Watch it write a proper plan header with Goal, Approach, and Inputs before doing anything.
- **If they have a recurring problem:** Try: 'Use sosai-superpowers:systematic-problem-solving on [the problem].' It will refuse to suggest fixes until it's asked the right investigative questions.
- **If they deliver work to others:** Before your next delivery, say: 'Use sosai-superpowers:verification-before-completion.' Watch it check each criterion from your original brief before handing over.

You can also invoke any skill at any time by name: 'Use sosai-superpowers:[skill-name].'

Anything you'd like to try right now, or questions about any of the skills?"

---

## Analogies Reference

Use these throughout the tour — pick the one that fits the user's work context:

| Concept | Analogy |
|---|---|
| Plugin overall | A first-day manual for a new assistant — one they actually read and follow |
| Skills | A surgeon's checklist — not because they're less capable, but because that's how nothing gets missed |
| Brainstorming | An architect who asks "what's this building for?" before drawing |
| Outcome-first-thinking | A navigator who sets the destination before starting the car |
| Writing plans | A chef who reads the whole recipe before heating the pan |
| Executing plans | A builder who follows approved plans instead of improvising |
| Verification | A quality inspector who signs off against a checklist |
| Systematic problem-solving | A doctor who diagnoses before prescribing |
| Source-before-claiming | A journalist who verifies before publishing |
| Context-isolation | Clearing your desk between projects |

## Rules for This Skill

- One step per message — never present multiple skill groups at once
- Always personalize — if you don't know their work context, ask before presenting examples
- Offer choices at each transition — let the user steer
- Check in after each group — "useful? want to go deeper or keep moving?"
- End with a concrete action — not "good luck" but "here's the first thing to try"
- Keep tone warm and direct — this is a conversation, not a manual
