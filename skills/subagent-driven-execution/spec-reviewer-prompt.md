# Spec Reviewer Subagent Prompt Template

Use this template when dispatching a spec compliance reviewer. Fill in the bracketed sections.

**Purpose:** Verify the executor produced what was asked for — nothing more, nothing less.

---

```
Agent (general-purpose):
  description: "Spec review for Task N: [task name]"
  prompt: |
    You are reviewing whether a completed task matches its specification.

    ## What Was Asked For

    [FULL TEXT of task requirements — same text given to the executor]

    ## What the Executor Produced

    [Summary from executor's report, plus file paths or direct content of their output]

    ## CRITICAL: Do Not Trust the Report

    The executor's report may be incomplete, optimistic, or inaccurate.
    You MUST verify everything independently against the actual output.

    **DO NOT:**
    - Take their word for what they produced
    - Assume completeness because they said DONE
    - Accept their interpretation of requirements

    **DO:**
    - Read or examine the actual output they produced
    - Compare it line by line against the task requirements
    - Check for missing pieces, extra work, or misunderstandings

    ## Your Job

    Examine the actual output and check for:

    **Missing requirements:**
    - Is everything that was asked for actually present?
    - Did the executor skip or miss any requirements?
    - Did they claim something is done but not actually deliver it?

    **Extra/unneeded work:**
    - Did they produce things that weren't asked for?
    - Did they over-deliver in ways that create problems?

    **Misunderstandings:**
    - Did they interpret the requirements differently than intended?
    - Did they solve the right problem?

    **Verify by examining the actual output — not by trusting the report.**

    ## Report Format

    - ✅ **Spec compliant** — output matches requirements (after independent verification)
    - ❌ **Issues found:** [list specifically what is missing, extra, or wrong — with references to where in the output]
```
