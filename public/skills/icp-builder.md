---
name: icp-builder
description: Build a structured Ideal Customer Profile (ICP) from customer research, sales data, and market analysis. Use this skill whenever a product marketing manager (PMM), founder, or GTM lead needs to define, refine, or validate their ICP. Triggers include phrases like "build my ICP," "who should we target," "define our ideal customer," "I have a bunch of customer interviews and need to find patterns," "we're getting unqualified leads and need to tighten our targeting," or any request to synthesize firmographic and behavioral patterns into a sharp targeting document. Use this even when the user hasn't explicitly said "ICP" but is describing the problem of unfocused targeting or messy customer data.
---

# ICP Builder

A skill for turning raw customer research and sales data into a sharp, defensible Ideal Customer Profile.

## What this skill does

Synthesizes inputs (customer interviews, closed-won/closed-lost data, win rates by segment, product usage patterns) into a structured ICP document with:

1. Firmographic profile (company size, industry, geography, revenue band)
2. Technographic profile (tech stack, tools, integrations)
3. Behavioral signals (trigger events, buying patterns)
4. Disqualifiers (who NOT to target and why)
5. Confidence assessment (where the data is strong vs. where assumptions are pulling weight)

## When to use

Use whenever the user is trying to define or refine who they sell to. Specifically:

- Pre-launch GTM strategy work
- Re-evaluating ICP after 12+ months of selling
- Diagnosing why pipeline is weak or unqualified
- Justifying a segment focus to leadership
- Building handoff docs between marketing and sales

## How to run this skill

### Step 1: Gather inputs from the user

Ask for whichever of these the user has. Don't require all of them, but the more sources, the stronger the ICP.

- Customer interview notes (raw or summarized)
- Closed-won deal list with company attributes
- Closed-lost deal list with company attributes
- Current customer list with usage data
- Sales team's anecdotal pattern recognition
- Competitive losses (who beat them and where)

If they have none of these and just have intuition, that's fine — flag it clearly in the final output as "hypothesized" rather than "validated."

### Step 2: Pattern-match across sources

Look for repeating patterns across multiple sources, not single anecdotes. The strongest ICP signals appear in three or more independent inputs.

Specifically look for:

- Industry concentrations in closed-won
- Company size sweet spots (revenue, employee count, funding stage)
- Tech stack overlaps (especially adjacent or complementary tools)
- Trigger events that preceded buying (new exec hire, funding round, new compliance requirement)
- Disqualifying patterns in closed-lost (consistent reasons they walked)

### Step 3: Generate the ICP document

Use this exact structure. Do not add or skip sections:

```markdown
# Ideal Customer Profile: [Company/Product]
*Last updated: [Date]*
*Confidence: High / Medium / Low — based on [N customer interviews, N closed-won deals, etc.]*

## One-line ICP
[A single sentence: "Companies that are X, doing Y, struggling with Z."]

## Firmographics
- Industry: [Primary + secondary]
- Company size: [Employee range, revenue range]
- Geography: [Primary regions]
- Stage: [Funding stage or maturity]

## Technographics
- Required: [Tools/systems they must use]
- Common: [Tools/systems most use]
- Disqualifying: [Tools/systems that mean we're a poor fit]

## Behavioral signals
- Trigger events: [What's typically happening when they buy]
- Buying committee: [Who's involved, who decides]
- Time-to-decision: [Typical cycle length]

## The pain we solve for them
- Primary pain: [In their words, not ours]
- Cost of inaction: [What happens if they don't solve it]
- Current workarounds: [What they do today that we replace]

## Disqualifiers (who NOT to target)
- [Pattern 1 with reason]
- [Pattern 2 with reason]
- [Pattern 3 with reason]

## Evidence
- N customer interviews: [link or summary]
- N closed-won deals: [link or summary]
- N closed-lost deals: [link or summary]
- Confidence notes: [Where data is thin and we're hypothesizing]

## Open questions to validate
- [Question 1]
- [Question 2]
- [Question 3]
```

### Step 4: Be honest about confidence

Never present hypothesized patterns as validated truth. If the user has only intuition and no data, the entire ICP gets a "Low" confidence and every section gets flagged as hypothesized. Suggest 5+ specific customer interviews to validate.

If the user has 15+ customer interviews and clean CRM data, confidence is "High" — say so.

### Step 5: Recommend next steps

Always close with 3-5 concrete next steps. Examples:

- "Run 5 interviews with closed-lost customers from [segment] to validate the disqualifier hypothesis"
- "Pull a Gong report on first-touch conversations from the last quarter and look for trigger event patterns"
- "Test the one-line ICP with sales — can they recite it back? If not, it's not sharp enough"

## What good output looks like

- Specific firmographics, not generic ("Series B SaaS companies with 50-200 employees" not "growing companies")
- Disqualifiers that are surprising — if every disqualifier is obvious, you haven't done the work
- Customer language quoted directly when describing pain
- Confidence calibrated honestly — "we don't know yet" is a valid answer
- One-line ICP that a salesperson could repeat from memory

## What to avoid

- Generic personas that could apply to any company ("we sell to forward-thinking enterprises")
- Listing 8+ industries — that's not focus, that's a wish list
- Conflating ICP (company-level) with persona (individual-level). This skill is for ICP only. For personas, suggest the persona-generator skill.
- Recommending the user "expand" their ICP. Almost every PMM needs to narrow, not expand.
