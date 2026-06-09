# Using sosai-superpowers — Extended Guide

## Examples

**Example 1: Quarterly board report**
User: "Help me put together the Q2 board update."
Applied: The skill identifies that work has a deliverable output, flags `outcome-first-thinking` and `writing-plans` as required before any drafting begins.
Result: Claude invokes both skills first, establishing the expected output format and a written plan before touching any content.

**Example 2: Contract redline review**
User: "Can you review this vendor contract and flag any issues?"
Applied: The skill maps this to `research-before-acting` (read before opining) and `working-with-legal`, then invokes both.
Result: Claude reads the full contract before stating any findings, and applies legal-plugin discipline alongside process checks.

**Example 3: Marketing campaign gone wrong**
User: "Our email open rates dropped 40% this month — can you figure out why?"
Applied: The skill routes this to `systematic-problem-solving` before any hypothesis is stated, preventing premature conclusions.
Result: Claude works through a structured diagnostic rather than jumping to a single cause, surfacing multiple factors for the user to evaluate.

## Troubleshooting

**Claude answered a clarifying question before invoking any skill.**
This violates the core rule. Skill check must happen before any response — including clarifying questions. Restart the turn and invoke the relevant skill first.

**No skill in the table seems to match the task.**
Default to `brainstorming` for any new task. If output will be delivered to a human, also invoke `verification-before-completion` before finishing.

**Claude invoked the domain plugin (e.g. finance) but skipped sosai-superpowers.**
Domain plugins cover what to do, not how to work. Always layer the appropriate sosai-superpowers process skill on top — they do not conflict.

**The skill was invoked but Claude immediately proceeded as if it hadn't.**
The skill content must actually govern the response. If the skill requires a plan before execution, that plan must appear before any task output.

**Multiple skills seem to apply and Claude only invoked one.**
Invoke all that apply — sequentially if they have an order (e.g. brainstorming before writing-plans before executing-plans), or together if they are independent.
