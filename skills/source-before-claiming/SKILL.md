---
name: source-before-claiming
description: Enforces sourced assertions by requiring a statable origin for every fact, figure, date, name, or claim before it is made. Use before stating any fact, figure, date, name, or claim — to ensure every assertion has a known and statable source.
license: MIT
metadata:
  author: Ciprian Sosai <ciprian@sosai.ro>
  version: "1.0"
---

# Source Before Claiming

## Overview

Every factual claim needs a source. Stating facts without sources produces plausible-sounding content that may be wrong. In business contexts, unsourced claims cause decisions to be made on false information.

**Rule:** If you cannot state where a fact comes from, do not state the fact.

## Before Making Any Factual Claim

- [ ] Where does this fact come from?
- [ ] Is that source reliable and current?
- [ ] Can you state the source explicitly?

If you cannot answer all three: do not make the claim. Instead:
- Say "I don't know" and offer to research
- Say "I believe X but cannot confirm the source — please verify"
- Ask the user to provide the source

## How to Cite

Inline: "According to [source], X is Y."
Footnote: State the fact, add "[Source: X]" immediately after.

## What Counts as a Source

✓ A document you have read in this session
✓ A specific URL you have fetched
✓ A file the user provided
✗ General knowledge
✗ "I recall reading..."
✗ Plausible inference

## Examples

**Example 1: Market size figure in a strategy deck**
User: "What is the current global cybersecurity market size?"
Applied: The skill blocks stating a figure from general knowledge. Claude flags that no fetched source exists and offers to research or asks the user to provide a report.
Result: The deck cites a specific analyst report rather than a hallucinated number.

**Example 2: Legal deadline in a contract summary**
User: "Summarize the notice period in this vendor contract."
Applied: The skill requires the answer to cite the exact clause in the uploaded document, not paraphrase from memory.
Result: The summary reads "Per Section 12.3 of the agreement, the notice period is 30 days [Source: uploaded contract]."

**Example 3: Financial figure in an investor update**
User: "What was our Q1 revenue growth rate?"
Applied: No file has been provided in the session. The skill instructs Claude to say it cannot confirm the figure and ask the user to share the Q1 report.
Result: The update is drafted only after the user uploads the source, eliminating the risk of a wrong figure reaching investors.

## Troubleshooting

**Claude cites "general knowledge" as a source**
General knowledge does not qualify. Redirect: ask Claude to fetch a specific URL, reference an uploaded file, or state "I cannot confirm this — please provide a source."

**Claude hedges with "I believe X" instead of stopping**
"I believe" without a source still violates the rule. Instruct Claude to choose between stating a verifiable source or withholding the claim entirely.

**The skill was invoked but Claude still stated an unsourced figure**
This is a rule violation. Restart the response and explicitly say: "Do not state this fact — you have not provided a source. Either fetch one or say you don't know."

**A document was provided but Claude did not cite the section**
Vague document attribution is insufficient. Require Claude to name the document and the specific section or page number for every cited fact.

**The skill slows down responses with excessive hedging on obvious facts**
The rule applies to facts that could be wrong or outdated. For truly stable facts (e.g., a country's capital), brief inline attribution ("well-established public record") is acceptable if the user explicitly allows it.
