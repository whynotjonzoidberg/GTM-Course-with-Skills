---
name: battlecard-builder
description: Build a segment-specific competitive battlecard for sales teams covering positioning, objection handlers, trap questions, and win/loss patterns. Use this skill whenever a product marketing manager (PMM), sales enablement lead, or competitive intel manager needs to create or update a battlecard. Triggers include "build a battlecard for [competitor]," "sales keeps losing to [competitor]," "I need to arm reps against X," "we keep hearing the same objections about [competitor]," "create competitive positioning for the [segment] market," or any request to systematize how the team competes against a specific rival. Use even when the user describes the symptom rather than the solution — like "we're losing too many deals to X" or "sales doesn't know how to handle X in calls."
---

# Battlecard Builder

A skill for building competitive battlecards that sales reps actually use mid-call.

## What this skill does

Creates a segment-specific competitive battlecard with:

1. Why we win (top wedges with proof)
2. Why we lose (honest weaknesses with workarounds)
3. Objection handlers (the 5 most common, with proven responses)
4. Trap questions (questions only we can answer well)
5. Reframe playbook (turning competitor strengths into weaknesses)
6. Win/loss data and recent intel

## When to use

- Pre-launch when a competitor is positioning to block us
- After a string of losses to a specific competitor
- New segment expansion where competitive dynamics differ
- Quarterly battlecard refresh
- New rep onboarding

## How to run this skill

### Step 1: Establish scope

Critical: a single battlecard cannot cover all segments. Ask:

- Which competitor specifically?
- Which segment? (Startup vs. mid-market vs. enterprise vs. self-serve)
- Which buyer? (Champion, economic buyer, end user)

If the user wants "a battlecard for all segments," push back. Build one card per segment-competitor pair. The enterprise battlecard against Salesforce looks nothing like the startup battlecard against HubSpot.

### Step 2: Gather intel

Ask for whichever the user has:

- Closed-lost deals against this competitor (with reasons)
- Closed-won deals against this competitor (with reasons)
- Gong call snippets where the competitor came up
- Competitor's pricing page, product page, recent launches
- Win/loss interview transcripts
- Sales team's anecdotal patterns

If the user has none of this, the battlecard will be hypothetical. Flag this and recommend at least 3 closed-lost interviews before publishing.

### Step 3: Map why we win (specific to this segment)

For each "why we win" wedge:

- Make it specific, not generic ("better security" is generic; "SOC 2 Type II out of the box vs. their 6-month implementation" is specific)
- Tie to a real product capability or business outcome
- Include a customer quote or proof point
- Make sure it actually matters to this segment

Typical wedges by segment:

**Startup segment:** speed of setup, pricing transparency, no enterprise sales BS, ease of use
**Mid-market:** integration depth, customization, support responsiveness
**Enterprise:** security/compliance, scalability proof, dedicated CSM, custom contract terms

### Step 4: Map why we lose (honestly)

The hardest part. Reps need to know our real gaps:

- What does the competitor genuinely do better in this segment?
- Where do we lack maturity?
- What feature gaps come up repeatedly?

For each "why we lose":

- Acknowledge the gap honestly
- Provide a workaround if one exists
- Note any roadmap commitment (with timeline)
- Suggest when to disqualify and walk

Reps trust battlecards that acknowledge weaknesses. Battlecards that pretend we win everything get ignored.

### Step 5: Build objection handlers

For each of the 5 most common objections, write:

- The objection (in customer language)
- The wrong way to respond (defensive, dismissive, or feature-comparing)
- The right way to respond (reframe to outcomes, return to discovery)
- A proof point that closes it (customer quote, data, demo moment)

Test each handler with a rep before finalizing. If a rep can't deliver it naturally, rewrite it.

### Step 6: Generate trap questions

Trap questions are questions reps ask that:

- We can answer easily and well
- The competitor cannot answer or answers badly
- Expose the competitor's weakness without naming them

Example: If the competitor lacks real-time data, the trap question is "How important is it to see data within 60 seconds of an event?"

Build 3-5 trap questions per battlecard.

### Step 7: Generate the battlecard

Use this structure:

```markdown
# Battlecard: [Us] vs. [Competitor] — [Segment]
*Last updated: [Date]*
*Owner: [PMM name]*
*Confidence: High / Medium / Low*

## Quick reference (for in-call use)

### Our 3 strongest wedges
1. [Wedge in one phrase] — [proof point]
2. [Wedge in one phrase] — [proof point]
3. [Wedge in one phrase] — [proof point]

### Where they beat us
- [Honest gap 1] — [workaround or roadmap]
- [Honest gap 2] — [workaround or roadmap]

### When to walk away
[Specific scenarios where we should disqualify and not compete]

---

## Why we win (this segment)

### Wedge 1: [Name]
**What it is:** [Specific capability or outcome]
**Why it matters to this buyer:** [Tied to their goals]
**Proof:** "[Customer quote]" — [Customer name, if shareable]
**Demo moment:** [What to show to drive it home]

### Wedge 2: [Name]
[Same structure]

### Wedge 3: [Name]
[Same structure]

---

## Why we lose (this segment)

### Gap 1: [Name]
**What they do better:** [Honest assessment]
**Workaround:** [How to address in the deal]
**Roadmap:** [What's coming and when, if anything]

### Gap 2: [Name]
[Same structure]

---

## Objection handlers

### "You're more expensive than [Competitor]"
- **Wrong response:** "But we have more features."
- **Right response:** [Reframe to TCO or outcomes]
- **Proof:** [Customer quote or ROI data]

### "[Competitor] has [Feature X]"
- **Wrong response:** [Defensive comparison]
- **Right response:** [Reframe scope or relevance]
- **Proof:** [Customer story]

[Repeat for 3-5 more]

---

## Trap questions

1. **[Question]** — [Why this exposes their weakness]
2. **[Question]** — [Why this exposes their weakness]
3. **[Question]** — [Why this exposes their weakness]

---

## Recent intel

### Their latest moves
- [Recent launch, pricing change, exec hire]
- [Recent launch, pricing change, exec hire]

### What's working in deals
- [Pattern from recent wins]

### What's not working
- [Pattern from recent losses]

---

## Sources
- N closed-lost interviews
- N closed-won interviews
- Gong calls analyzed: [Search criteria]
- Their public materials: [Last reviewed date]
- Next refresh: [Date]
```

## What good output looks like

- Specific to one segment, not generic
- Honest about weaknesses
- Objection handlers that sound natural when spoken aloud
- Trap questions that genuinely expose competitor gaps
- Recent intel that's actually recent (within 30-60 days)

## What to avoid

- Generic "we're more flexible" claims with no proof
- Pretending we win everything (kills rep trust)
- Objection handlers full of jargon reps wouldn't say naturally
- Trap questions that are obvious (any salesperson would ask them anyway)
- Skipping the segment specification. One card per segment-competitor pair.
- Building from secondhand assumptions. Always recommend 3+ closed-lost interviews to validate.
