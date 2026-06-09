---
name: research-before-acting
description: Enforces a research-first discipline by prompting explicit knowledge assessment, source identification, and confidence rating before any output is produced. Use when starting any research, analysis, or information-gathering task — before producing output — to understand the situation fully first.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Research Before Acting

## Overview

Output produced without sufficient research is fast but wrong. The cost of research upfront is always less than the cost of correcting bad output.

## Before Producing Any Output

- [ ] What do you already know about this topic? (State it explicitly)
- [ ] What do you need to know that you don't know yet?
- [ ] What sources are available to you?
- [ ] What is the minimum research needed to answer confidently?

Research first. Output second.

## Research Checklist

- [ ] Primary sources consulted (not just summaries)
- [ ] Conflicting information identified and resolved
- [ ] Gaps in knowledge stated explicitly
- [ ] Confidence level assessed: high / medium / low

## Stating Confidence

Always include a confidence statement with significant output:
- **High:** All key claims sourced and cross-checked
- **Medium:** Main claims sourced; some details inferred
- **Low:** Limited sources; significant uncertainty — flag for verification

## Examples

**Example 1: Competitive pricing analysis**
User: "Give me a pricing recommendation for our new service tier."
Applied: The skill prompts explicit statement of what is already known about competitor pricing, identifies missing market data, and requires sourcing before any recommendation is written.
Result: Output includes a sourced pricing range with a stated confidence level and flagged assumptions, rather than an unsupported number.

**Example 2: Legal compliance question**
User: "Are we allowed to send marketing emails to our EU customer list?"
Applied: The skill surfaces gaps in knowledge (e.g., consent records, GDPR Article 6 basis) and requires those to be resolved before answering yes or no.
Result: Response identifies the specific consent conditions that must be confirmed, rather than giving a confident answer that could expose the business to risk.

**Example 3: Vendor evaluation**
User: "Which of these three logistics vendors should we go with?"
Applied: The skill requires primary source review (contracts, SLA terms, references) and explicit identification of conflicting information before a recommendation is made.
Result: Recommendation includes a confidence level and a short list of unresolved gaps the decision-maker should verify before signing.

## Troubleshooting

**Research step completed but confidence level omitted from output**
Always include the confidence statement (High / Medium / Low) in the final output. If you skipped it, add it before sharing results.

**Known information stated but gaps never checked**
Listing what you know is only step one. Explicitly ask what you do not know and whether available sources can fill those gaps before writing output.

**Sources consulted were all secondary (summaries, recaps, hearsay)**
Summaries inherit others' errors. Trace at least the key claims back to a primary source — a contract, a report, a regulatory text — before committing to a conclusion.

**Conflicting information found but not resolved — output written anyway**
Conflicting signals must be reconciled or explicitly flagged, not silently ignored. If you cannot resolve the conflict, state it and lower your confidence level accordingly.

**Skill invoked but skipped because the question "seemed simple"**
Simple-seeming questions are the most common source of confident wrong answers. Run the checklist regardless of perceived difficulty.

## Red Flags

| Thought | Reality |
|---|---|
| "I know enough to answer this" | State what you know, then check what you don't. |
| "Research will take too long" | Bad output takes longer to fix than research takes. |
| "I'll note the gaps at the end" | Research first, then write. Not the other way around. |
