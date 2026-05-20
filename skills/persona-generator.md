---
name: persona-generator
description: Turn raw customer interview notes, call transcripts, or survey data into structured B2B personas with real quotes, pain points, and channel maps. Use this skill whenever a product marketing manager (PMM) or GTM lead needs to build, refine, or validate buyer personas. Triggers include "build a persona for X," "synthesize these interviews into a persona," "I have a bunch of customer calls and need to find the patterns," "create a champion persona," "we need to understand the economic buyer better," or any request to systematize qualitative research into actionable persona docs. Use even when the user describes the problem without using the word "persona" — like "help me figure out who's actually buying this" or "what does our buyer care about."
---

# Persona Generator

A skill for synthesizing raw customer research into structured B2B personas that sales and marketing can actually use.

## What this skill does

Takes raw inputs (interview notes, call transcripts, survey responses, even rough notes) and produces a structured persona document covering:

1. Identity (name, role, company context)
2. Goals and success metrics
3. Pains and frustrations (in their own words)
4. Buying behavior and decision criteria
5. Channels and watering holes
6. Direct quotes that can be lifted into messaging
7. Objections and concerns

## When to use

- After completing 5+ customer interviews and needing to synthesize
- When sales is asking for a clearer picture of who they're selling to
- Before writing messaging, copy, or sales decks
- When building a multi-persona GTM motion (champion + economic buyer + end user)
- Refreshing existing personas after 6+ months

## How to run this skill

### Step 1: Clarify which persona type

B2B sales involves multiple personas. Ask the user which they need:

- **Economic Buyer** — signs the check, cares about ROI and risk
- **Champion** — internal driver of the deal, cares about career outcomes
- **End User** — uses the product daily, cares about workflow and time savings
- **Procurement/IT** — gatekeeper, cares about security and compliance

If the user says "all of them," build them as separate personas. Don't conflate.

### Step 2: Gather inputs

Ask for:

- Customer interview notes or transcripts (paste raw is fine, the messier the better — direct language is gold)
- Survey responses if they have them
- Sales call recordings or Gong snippets
- Any existing thin persona docs they want to upgrade

Minimum threshold: 5 distinct customer voices to build a real persona. Below that, flag it as "preliminary."

### Step 3: Extract patterns

Read through the inputs and pull out:

- **Repeated phrases** — exact wording multiple customers use ("we're drowning in spreadsheets" said three different ways = a real theme)
- **Emotional language** — frustration, excitement, fear. Emotional moments are the truest signal
- **Specific examples** — not "we have issues with reporting" but "I spent 4 hours last Friday rebuilding a report that broke when the data model changed"
- **Triggers** — what was happening when they started looking for a solution
- **Decision factors** — what almost stopped them, what closed them

### Step 4: Generate the persona

Use this exact structure:

```markdown
# Persona: [Name]
*Type: Champion / Economic Buyer / End User / Procurement*
*Last updated: [Date]*
*Built from: [N interviews, N call transcripts, etc.]*

## Snapshot
- Name: [Realistic persona name, not "Marketing Mary"]
- Title: [Specific job title, not "marketer"]
- Company context: [Stage, size, industry where they typically work]
- Reports to: [Who]
- Team size: [If relevant]

## What success looks like for them
[3-5 bullets, specific outcomes they're measured on]

## Their day-to-day reality
[2-3 sentences capturing what their work actually looks like, what wakes them up at night, what their last bad week looked like]

## Top pains (in their words)
1. **[Pain name]** — "[Direct quote]" — [N customers expressed this]
2. **[Pain name]** — "[Direct quote]" — [N customers expressed this]
3. **[Pain name]** — "[Direct quote]" — [N customers expressed this]

## What they've already tried
[Workarounds, alternatives, why those failed]

## What triggers them to look for a solution
[Specific events: new exec hire, missed quarter, compliance deadline, etc.]

## How they buy
- Research approach: [Where they look, who they ask]
- Evaluation criteria (in priority order):
  1. [Criterion]
  2. [Criterion]
  3. [Criterion]
- Likely objections:
  - [Objection] — [How to address]
  - [Objection] — [How to address]
- Decision timeline: [Typical cycle]

## Where to find them
- Channels they trust: [Specific publications, podcasts, communities]
- Slack/Discord communities: [If known]
- Conferences/events: [If relevant]
- People they follow: [If known]

## Messaging hooks that work
- [Hook 1 with reasoning]
- [Hook 2 with reasoning]
- [Hook 3 with reasoning]

## Messaging traps to avoid
- [Trap 1 — why it backfires for this persona]
- [Trap 2 — why it backfires for this persona]

## Quote bank (lift these directly into copy)
- "[Powerful quote 1]"
- "[Powerful quote 2]"
- "[Powerful quote 3]"
```

### Step 5: Flag confidence and gaps

At the bottom of the persona, add a confidence assessment:

- **High confidence** if 10+ interviews, multiple data sources, patterns repeated by different customer types
- **Medium confidence** if 5-9 interviews with consistent patterns
- **Preliminary** if fewer than 5 interviews or thin data — recommend 5 more specific interviews to validate

Always end with 2-3 open questions the user should validate next.

## What good output looks like

- Realistic, specific persona name and title (not "Marketing Mary")
- Direct customer quotes throughout, not paraphrases
- Pains include emotional and specific examples, not just functional needs
- Channel map points to specific places (not "LinkedIn" but "the MarketingOps Slack community of 12K members")
- The persona reads like a real human you'd meet at a conference, not a stock photo

## What to avoid

- Alliterative cute names (Marketing Mary, Sales Sam) — they signal a fake persona
- Generic pains that could apply to anyone in any role
- Listing every possible characteristic — focus on what differentiates this persona from others
- Confidence inflation — don't claim "high" when the data is thin
- Building a persona from secondhand assumptions instead of primary research. If the user doesn't have interview data, push back and suggest they run 5 interviews first.
