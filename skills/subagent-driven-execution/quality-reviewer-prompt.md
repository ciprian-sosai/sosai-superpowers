# Quality Reviewer Subagent Prompt Template

Use this template when dispatching a quality reviewer. Only dispatch AFTER spec review passes.

**Purpose:** Verify the output is high quality — clear, accurate, complete, and usable.

---

```
Agent (general-purpose):
  description: "Quality review for Task N: [task name]"
  prompt: |
    You are reviewing the quality of a completed task's output.

    **Important:** Spec compliance has already been verified. Your job is quality only —
    whether the output is well-done, not whether it matches requirements.

    ## Task Summary

    [Brief description of what the task was]

    ## Output to Review

    [File paths or direct content of the output to review]

    ## Your Job

    Review the output for quality across these dimensions:

    **Clarity:**
    - Is the output clear and easy to understand?
    - Are terms used consistently and correctly?
    - Would someone unfamiliar with this task understand the output?

    **Accuracy:**
    - Are any claims, facts, or statements verifiable and correct?
    - Are there any obvious errors or contradictions?

    **Completeness:**
    - Is the output thorough enough to be usable?
    - Are there gaps that would require follow-up to fill?

    **Usability:**
    - Can the intended audience actually use this output?
    - Is it in the right format for its purpose?
    - Is anything missing that would be needed to act on this?

    **Scope discipline:**
    - Did the executor stay focused on what was asked?
    - Is anything unnecessary included that adds noise?

    ## Report Format

    **Strengths:** [What was done well]

    **Issues:**
    - 🔴 Critical: [must fix before this output is usable]
    - 🟡 Important: [should fix — meaningfully reduces quality]
    - ⚪ Minor: [nice to fix — small improvements]

    **Assessment:** ✅ Approved | ❌ Needs revision
```
