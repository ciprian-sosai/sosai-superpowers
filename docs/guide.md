# The Complete Guide to sosai-superpowers

Welcome. This guide will tell you everything you need to know about a small tool that makes Claude significantly more useful for real work — even if you have never heard of a "plugin" before.

---

## 1. What is this?

sosai-superpowers is an add-on for Claude cowork (the Claude.ai workspace). It gives Claude a set of habits — rules it follows about *how* to work, not just *what* to produce. When you install it, Claude will ask clarifying questions before diving in, write a plan before executing complicated tasks, check its work before telling you it's done, and investigate root causes before suggesting fixes. None of this requires you to remember to ask for it. It happens automatically.

If you have never used a plugin before: a plugin is simply a set of instructions that gets loaded alongside Claude at the start of your session. Think of it like giving a new assistant a short manual on the first day — one they actually read and follow.

---

## 2. The problem it solves

Claude is fast. Impressively, sometimes alarmingly fast. You describe a task and within seconds you have a full draft, a structured plan, a list of recommendations. That speed is genuinely useful.

But speed has a cost when it outruns understanding.

Without this plugin, Claude tends to:

- **Assume rather than ask.** You say "help me prepare for tomorrow's meeting" and Claude produces an agenda, a set of discussion questions, a summary template, and a closing script — all based on guesses about what kind of meeting it is, who will be there, and what you need out of it. Some of those guesses will be wrong.

- **Start before it understands scope.** You ask for help migrating 40 reports from one system to another and Claude starts giving you instructions — without first noticing that the audit work and the migration work are two completely separate workstreams that need separate plans.

- **Deliver confidently without checking.** Claude hands you a finished comparison of three software tools, looking thorough and complete. You share it with your manager. Someone asks about total cost for your team size and you realize Claude never calculated that number. It was the whole point.

- **Suggest more fixes instead of finding root causes.** Your revenue numbers are wrong. You tried two things, neither worked. Claude suggests five more things to try. None of them address the real problem.

These are not rare edge cases. They are the default behavior of a tool built to respond helpfully and immediately. The result is work that looks complete but has invisible gaps — and the gaps surface at the worst possible moments: in meetings, in deliverables, in decisions.

sosai-superpowers interrupts those patterns before they become problems.

---

## 3. Who should use it

This plugin is most valuable if you recognize yourself in any of the following:

- You use Claude regularly for real work — writing, analysis, research, planning — and you have started to notice that the first draft is often close but missing something important
- You are doing work where mistakes have real consequences: documents going to clients, numbers going into reports, plans that others will execute
- You work on multi-step tasks where the details matter and gaps are expensive to discover late
- You sometimes feel like Claude is confidently wrong — it sounds authoritative but got something wrong that you had to catch
- You want Claude to be a rigorous thinking partner, not just a fast output machine

You do not need to be technical to use this. You do not need to understand how it works under the hood. You just need to install it once, and then use Claude as you normally would.

---

## 4. How it works

The plugin is made up of **skills**. A skill is a set of instructions Claude follows when a certain kind of situation comes up. When you ask Claude to help you plan something, the planning skill activates and Claude follows its rules: write a proper plan header, check for scope problems, ask clarifying questions before proceeding. When you ask Claude to tell you whether something is done, the verification skill activates and Claude runs through a checklist before claiming the work is complete.

You do not trigger these manually. Claude recognizes the situations and uses the appropriate skill on its own.

There is also one skill — `using-sosai-superpowers` — that loads at the very start of every session. It is the plugin's "always on" instruction: it tells Claude to check whether any of the other skills apply before responding to anything. Think of it as the gate that ensures the habits actually get used, not just known about.

---

## 5. The skills — what each one does

### Before you start

These skills activate early in a task, before Claude produces any output.

**brainstorming**
Activates when you give Claude any new task. Instead of immediately producing output, Claude asks one focused question to understand what you actually need — the purpose, the constraints, who it's for. It won't produce anything until the intent is clear. One question at a time, not a questionnaire.

**outcome-first-thinking**
Before Claude starts writing or researching, it defines what a correct result would look like. If Claude cannot describe what "done" looks like, it is not ready to start. This prevents work that drifts because no one agreed on the target.

**research-before-acting**
Before producing analysis or output on a topic, Claude checks what it already knows, identifies what it still needs to know, and gathers the necessary background first. Fast output produced without adequate research is just fast guessing.

**source-before-claiming**
Before stating any fact, figure, date, or statistic, Claude checks whether it has a real source for the claim. If it cannot identify where a fact comes from, it will say so rather than state it with false confidence. In work contexts, unsourced claims lead to decisions made on wrong information.

---

### Planning and executing

These skills shape how Claude approaches multi-step work.

**writing-plans**
When a task has more than a couple of steps, Claude writes a proper plan before doing anything. The plan has a clear goal, an approach, a list of what's needed to start, and checkable success criteria for each step. If the task actually contains two separate workstreams, Claude spots that and proposes splitting the plan rather than tangling them together.

**executing-plans**
When Claude is running a written plan, it follows the plan step by step, checks each step is complete before moving to the next, and does not skip or improvise. It treats the plan as the authority, not a starting suggestion.

**subagent-driven-execution**
For larger tasks that can be broken into independent chunks, Claude runs each chunk as a separate focused unit with its own review step, rather than running everything in one long sequence where an error in the middle poisons the rest.

**dispatching-parallel-agents**
When you have a task that consists of multiple independent research questions or workstreams that do not depend on each other, Claude fans them out in parallel and then synthesizes the results. Faster and less likely to mix up context between threads.

**context-isolation**
When you switch from one task to a different one in the same session, Claude explicitly clears the context from the previous task rather than letting it bleed into the new one. Prevents the wrong assumptions from one job contaminating the next.

---

### Finishing well

These skills govern the end of a task — the moment between "I think I'm done" and "I will tell you I'm done."

**verification-before-completion**
Before Claude says "done," "complete," "fixed," or "ready," it checks the work against the original requirements. For each criterion, it records how it checked and what the result was. If something could not be verified, it says so explicitly rather than letting it hide in a confident summary. "It looks good" is not verification.

**finishing-a-task**
Wraps up work properly: confirms all success criteria are met, makes sure the output is in its final form and not an accidental draft, documents what was done and what was not covered, and hands off in a way the recipient can actually use.

**requesting-peer-review**
Before delivering to a human, Claude requests a structured review — framing what the work was trying to accomplish, what it is most uncertain about, and what it would most like reviewed. This produces better feedback than just handing something over and asking "what do you think?"

**receiving-peer-review**
When Claude receives feedback or critique, it processes it systematically: reads all of it before responding to any of it, distinguishes between factual corrections and stylistic preferences, and responds to each point rather than defending its original output or making changes without acknowledgment.

---

### When things go wrong

**systematic-problem-solving**
When something is not working — a process producing wrong results, a deliverable that missed the mark, a number that doesn't add up — Claude refuses to suggest fixes until it has investigated the root cause. It follows four phases: investigate first, find the pattern, form and test a single hypothesis, then fix. If multiple fixes have already failed, Claude names the structural signal directly rather than suggesting another attempt.

---

### Meta

**using-sosai-superpowers**
The always-on skill. Tells Claude to check whether any other skill applies before responding to anything. This is what ensures the other skills actually get used rather than being present but ignored.

**writing-skills**
For when you want to create your own skills to add to this plugin or build a new one. Guides the process of writing skill instructions that actually change Claude's behavior in reliable, testable ways.

---

## 6. How to install

Installation requires pasting one command into a terminal. If you have never done this before, the steps below will walk you through it.

### What you need before starting

- A computer with internet access
- A Claude cowork account (claude.ai)
- Git installed on your computer. If you are not sure whether you have it, skip to the "Check if you have Git" step below.

### Check if you have Git

Git is a tool that copies files from the internet onto your computer. Many computers already have it.

**On Mac:** Open Terminal (press Cmd + Space, type "Terminal", press Enter). Type `git --version` and press Enter. If you see a version number, you have Git. If you see an error, download Git from [git-scm.com](https://git-scm.com/downloads) and install it.

**On Windows:** Open Command Prompt (press Windows key, type "cmd", press Enter). Type `git --version` and press Enter. Same logic applies.

### Install the plugin

Once you have Git, paste this command into your terminal and press Enter:

```
git clone https://github.com/ciprian-sosai/sosai-superpowers ~/.claude/skills/sosai-superpowers
```

What this does: it copies the plugin files from GitHub (a public file-hosting service) into a specific folder on your computer where Claude cowork looks for plugins.

### Activate it

Close and reopen Claude cowork. The plugin loads automatically when Claude starts.

That is the entire installation. You do not need to configure anything, enable skills individually, or tell Claude about it. It is active from the moment you restart.

### Keeping it up to date

When the plugin is updated, you can get the latest version by opening a terminal and running:

```
cd ~/.claude/skills/sosai-superpowers && git pull
```

Then restart Claude cowork.

---

## 7. Using it day-to-day

### You do not have to do anything differently

The plugin is designed to be invisible when it's working well. You describe your task to Claude as you normally would. The appropriate skills activate automatically. You will notice Claude pausing to ask a question where it would previously have charged ahead, or pausing to write a plan before starting work, or checking criteria before telling you something is done.

### What to expect when a skill activates

When a skill activates, Claude will typically:

- Briefly acknowledge what kind of task this is
- Ask a targeted question, or lay out a plan, or run a checklist — depending on which skill is active
- Wait for your input before proceeding

You may find this slightly slower at first. It is slower. That is the point. The time spent up front is almost always less than the time spent fixing a confident mistake later.

### Invoking a skill directly

You can also call a skill by name if you want to use it deliberately. For example:

- "Use sosai-superpowers:verification-before-completion on what you just produced"
- "Let's do sosai-superpowers:systematic-problem-solving on this"

This is useful when you already know the situation calls for a specific approach, or when you want to run a skill on existing output rather than at the start of a task.

### When you're in a hurry

If you need Claude to move quickly and you are confident enough about the task, you can tell it so. "I understand the scope, skip the clarifying questions and proceed" is a valid instruction. The plugin enforces discipline by default, but it does not override your explicit judgment about when that discipline is or isn't needed.

---

## 8. Real examples

These are four situations taken directly from testing this plugin. Each shows what Claude did without it versus what it did with it — and why the difference matters.

---

### Example 1: Preparing for a meeting

**The situation:** A manager needed help preparing for a meeting retro. Time pressure — needed it in 20 minutes.

**Without the plugin:** Claude immediately produced a complete meeting format, a full agenda template, three retro questions, and a closing script. It looked thorough. It was all based on assumptions Claude never verified — about what kind of meeting it was, what had gone wrong, who would be in the room.

**With the plugin:** Claude asked one question before producing anything: "Is this a status meeting or a decision meeting?" Then it waited.

**Why it matters:** The difference between a status meeting retro and a decision meeting retro is significant — the questions you ask, the format you use, the goal you're working toward. An agenda built on the wrong assumption would have been polished, confidently wrong, and either quietly set aside or used badly. One question first costs 30 seconds and produces something usable.

---

### Example 2: Migrating 40 reports

**The situation:** A team needed to migrate 40 Excel reports to a new system. The manager wanted it done quickly.

**Without the plugin:** Claude started giving instructions for how to do the migration. It did not notice — and never asked — whether there were actually two separate workstreams involved.

**With the plugin:** Claude spotted the scope split — audit work and migration work are independent and should not be tangled in the same plan. It wrote a proper plan header (Goal, Approach, Inputs), asked four targeted questions before proceeding, and said directly: "Starting without a plan on 40 reports is how you create inconsistencies that take longer to fix than the 20 minutes this plan would take."

**Why it matters:** Starting a 40-report migration without a written plan risks producing inconsistent results across reports, making it impossible to hand off work to another person mid-process, and discovering scope problems halfway through when they are expensive. Twenty minutes of planning is not overhead — it is the work.

---

### Example 3: Delivering a CRM comparison

**The situation:** Someone asked Claude to research and compare CRM tools for a 12-person team.

**Without the plugin:** Claude delivered the comparison confidently — a well-structured table with feature comparisons across several tools. It never checked against the original brief. It never calculated the total monthly cost for 12 users. That number — $900 versus $240 — was the most decisive figure in the whole comparison, and it was missing.

**With the plugin:** Claude checked each criterion from the original brief, noticed the total cost had never been calculated, did the math, and flagged that pricing had not been verified against live sources (which can change).

**Why it matters:** A CRM comparison that looks complete but omits the key number is worse than an incomplete comparison, because it creates false confidence. Someone makes a decision based on it. The real number surfaces later, after the decision is made, or not at all. The plugin turns "confident but incomplete" into "thorough with known gaps."

---

### Example 4: Wrong revenue numbers, board meeting tomorrow

**The situation:** Revenue numbers in a report were wrong. Two previous fixes had been tried. Neither held. The board meeting was tomorrow.

**Without the plugin:** Claude suggested five more things to try. All reasonable ideas. None of them addressed the actual problem, which had not been identified yet. This would have added to the pile of failed attempts and consumed time that was now scarce.

**With the plugin:** Claude refused to suggest another fix. It named the structural signal directly: "Two failed fixes means this is a structural problem, not a formula problem." It then asked five targeted investigation questions to understand where in the data chain the error was actually originating.

**Why it matters:** When two attempts to fix a problem have failed, suggesting a third (and fourth, and fifth) is not helpful — it is noise. The signal from repeated failures is that the problem has not been correctly identified. That identification is the work that needs to happen, and it requires questions, not suggestions. The plugin understands that distinction and acts on it.

---

## 9. FAQ

**Do I have to use all the skills?**

No. The plugin comes with all skills active, but you are not required to follow every prompt or answer every question. You can tell Claude "I know what I need, let's skip the clarifying step" and it will proceed. The skills are habits Claude brings to the table — you decide whether they apply to this particular situation.

**What if I'm in a hurry and don't want to answer questions?**

Tell Claude that. "I don't have time for the full planning process — here's what I need, please proceed" is a valid instruction. Claude will work with the constraints you give it. The plugin's default is to enforce process discipline; your explicit instruction overrides the default. What it will not do is pretend you asked for thoroughness when you told it not to bother.

**Will this slow me down?**

For quick, genuinely simple tasks — yes, slightly. For work with real stakes, multiple steps, or any complexity — no. It will save you time that would otherwise be spent fixing confident mistakes, backtracking from wrong assumptions, or untangling a plan that was never properly written. The overhead of a clarifying question is 30 seconds. The overhead of discovering a wrong assumption three hours in is much larger.

**Does it work with other plugins?**

Yes. sosai-superpowers governs *how* Claude works — the discipline and process layer. Other plugins govern specific domains: finance work, legal documents, marketing copy. They operate at different levels and do not conflict. The recommended approach is: use sosai-superpowers:brainstorming to clarify the scope, use your domain plugin to do the work, use sosai-superpowers:verification-before-completion to check the output before delivering.

**Can I add my own skills?**

Yes. The `writing-skills` skill guides the process of creating new skills. If you have a recurring pattern in your work — a type of task you do regularly that would benefit from its own set of guardrails — you can write a skill for it following the same format as the existing ones. It does not require technical knowledge, just clear thinking about what the skill should enforce.

**What's the difference between this and just asking Claude to be more careful?**

Asking Claude to "be more careful" is an instruction Claude receives and then interprets in the moment. It has no structure, no defined process, and no mechanism for catching specific failure modes. A skill is different: it is a written, specific set of rules that Claude follows for a particular type of situation. It defines exactly what "careful" means for planning tasks, for verification tasks, for problem-solving tasks — and enforces those definitions consistently, not just when Claude remembers to.

Asking Claude to be careful is like telling someone to "do a good job." Skills are checklists, processes, and rules that define what a good job actually looks like.

---

## 10. Credits

This plugin was inspired by [superpowers](https://github.com/obra/superpowers) by Jesse Vincent — the original cowork skills framework that demonstrated what process-enforcing skills could do and established the patterns this plugin builds on.

sosai-superpowers was written for the cowork context by Ciprian Sosai, adapting and extending the superpowers philosophy for business professionals using Claude for real work.

---

*MIT License. For issues, feedback, or contributions, see the repository.*
