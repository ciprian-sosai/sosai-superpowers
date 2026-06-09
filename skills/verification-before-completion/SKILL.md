---
name: verification-before-completion
description: Enforces evidence-based completion checks before any work is declared done, fixed, or ready. Use before claiming any work is done, complete, fixed, or ready — requires evidence before assertions.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Verification Before Completion

## Overview

Never claim work is done until you have checked it. "It should work" and "I believe it's correct" are not verification.

**Rule:** Evidence before assertions. Always.

## Verification Checklist

Before saying "done", "complete", "fixed", or "ready":

- [ ] Check each success criterion defined at the start of the task
- [ ] Confirm the actual output — not what you intended to produce
- [ ] Identify anything that was not explicitly verified
- [ ] State what you checked and what you did not check

## How to Report Completion

```
Done. Here's what I verified:
- [criterion 1]: checked by [method] — ✓
- [criterion 2]: checked by [method] — ✓

Not verified:
- [anything you could not check]
```

## Examples

**Example 1: Financial report sign-off**
User: "Is the Q3 variance analysis ready to send to the CFO?"
Applied: The skill requires checking each success criterion — figures reconciled, prior period comparison present, commentary complete — before declaring ready.
Result: A completion report listing what was verified (figures tied to source), what was not (CFO formatting preferences), rather than a bare "yes, it's ready."

**Example 2: Vendor contract review**
User: "We're done with the vendor contract review, right?"
Applied: The skill flags that "looks good" is not verification. It prompts checking each negotiated clause, redline acceptance, and legal sign-off status.
Result: A structured summary confirming which clauses were verified against the agreed terms and which items (indemnity cap, SLA penalties) still need legal confirmation.

**Example 3: Marketing campaign launch**
User: "The email campaign is set up and ready to go."
Applied: The skill requires confirming each launch criterion — list segmentation, send time, subject line approval, unsubscribe link — rather than accepting the assertion.
Result: A checklist-style completion note showing confirmed items and flagging that legal approval for the promotional offer was not yet verified.

## Troubleshooting

**The skill is invoked but the response still says "this should work" or "looks correct."**
The rule was not enforced. Reject the response and ask Claude to state specifically what was checked and by what method before repeating the completion claim.

**The verified/not-verified report is vague — lists "checked content" with no method stated.**
Ask Claude to name the exact method for each item (e.g., "compared against source document," "confirmed in system," "reviewed approval email") — "checked" alone is not acceptable.

**Claude marks something verified that it could not actually check (e.g., a live system, a file it cannot read).**
This is a false positive. Ask Claude to move any item it cannot directly access into the "not verified" section and note what access is needed.

**The skill is triggered on low-stakes tasks where a full checklist is overkill.**
Still require at minimum a one-line statement of what was confirmed and what was not — the format can be brief but the discipline applies regardless of task size.

**Success criteria were never defined at the start, so there is nothing to check against.**
Ask Claude to first state what "done" means for this task, then verify against that definition before claiming completion.

## Red Flags

| Phrase | Problem |
|---|---|
| "This should work" | Should ≠ does. Check it. |
| "I believe it's correct" | Belief ≠ evidence. Check it. |
| "It looks good" | Looking ≠ verifying. Check it. |
| "I tested it mentally" | Mental testing is not testing. Check it. |
