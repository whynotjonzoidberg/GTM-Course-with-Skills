---
name: launch-brief
description: Write a one-page cross-functional launch brief that aligns Product, Sales, CS, and Marketing on what's launching, why, when, and how to measure it. Use this skill whenever a product marketing manager (PMM) or launch owner needs to create the foundational document for a product launch. Triggers include "write a launch brief," "we have a launch coming up and need to align the team," "draft a launch plan," "create a launch one-pager," "the team isn't aligned on what we're shipping," or any request to systematize cross-functional launch coordination. Use even when the user doesn't explicitly say "brief" — like "how do I get everyone on the same page for this launch" or "we need a single source of truth for this release."
---

# Launch Brief

A skill for writing a one-page cross-functional launch brief that prevents misalignment, missed dates, and post-launch finger-pointing.

## What this skill does

Generates a structured launch brief covering:

1. What's launching (in plain language)
2. Why now (the market or business case)
3. Who it's for (ICP and persona)
4. Key messages (the 3 things every rep should say)
5. Tier and resourcing (Tier 1, 2, or 3)
6. Timeline with critical milestones
7. RACI across PM, Sales, CS, Marketing
8. Success metrics (leading and lagging)
9. Risks and pre-mortem

## When to use

- T-8 weeks before any tiered launch
- When kicking off launch planning with cross-functional team
- When the team is misaligned on what's happening
- Before requesting resources or headcount
- As the founding artifact for the entire launch motion

## How to run this skill

### Step 1: Establish what's launching

Ask the user:

- What is the product, feature, or capability launching?
- Is this a net-new product, major release, or incremental feature?
- What's the codename or internal name?
- What's the external name (if different)?
- Is this NDA/embargo or open?

If the user can't describe it in 2 sentences, stop and force clarity. A brief that starts with vague scope fails.

### Step 2: Determine launch tier

Tiers map resources to impact:

- **Tier 1 (Major)** — net-new product, category-defining feature, board-level visibility. 50+ person-weeks of effort. Cross-functional war room. Major PR.
- **Tier 2 (Standard)** — significant feature or update. 10-20 person-weeks. Focused team. Trade press, customer comms.
- **Tier 3 (Lightweight)** — incremental improvement, fast-follow, segment-specific. 2-5 person-weeks. Marketing and product only. Blog post, in-product nudge.

Ask the user what tier they think it is, then validate or push back. PMMs over-tier all the time.

### Step 3: Gather business case inputs

Ask for:

- Why this, why now? (market timing, competitive pressure, customer demand)
- Revenue target (pipeline or ARR impact)
- Strategic significance (does it open a new segment, defend against a competitor, expand TAM?)
- Risk if we don't ship on time
- Risk if we ship something half-baked

### Step 4: Map cross-functional ownership

For each function, identify:

- Owner (single name, not a team)
- Key deliverables they're responsible for
- Date they're committed to
- Dependencies on others

Functions to cover:

- **Product** — feature complete, docs, in-product experience
- **Engineering** — code complete, deploy readiness
- **PMM** — messaging, positioning, brief, enablement
- **Sales** — enablement complete, pipeline ready, comp plan
- **Marketing** — website, paid, content, PR
- **CS/Support** — playbook, KB articles, in-product help
- **Legal/Compliance** — if applicable

### Step 5: Define success metrics

Always include both leading and lagging indicators:

**Leading (T-0 to T+7):**
- Signups or activation
- Demos booked
- Pipeline created
- Sales call mentions

**Lagging (T+30 to T+180):**
- Win rate impact
- Revenue contribution
- Activation rate
- NRR impact

Set specific targets, not just "increase pipeline."

### Step 6: Run a pre-mortem

Force the user to imagine the launch failed. Ask:

- What's the most likely reason it underperformed?
- What's the most likely reason it shipped late?
- What's the most likely reason sales didn't pitch it well?
- What's the most likely reason customers didn't adopt it?

Each answer becomes a risk to mitigate now, not a postmortem finding later.

### Step 7: Generate the brief

Use this exact structure. Keep it to one page (the discipline matters):

```markdown
# Launch Brief: [Product Name]
*Tier: [1/2/3]*
*Launch date: [Date]*
*Owner: [PMM name]*
*Last updated: [Date]*

## What's launching
[2-3 sentences in plain language. A salesperson should be able to read this and explain it to a customer.]

## Why now
[1-2 sentences on market timing, customer demand, or competitive pressure. Why this launch matters this quarter.]

## Who it's for
- ICP: [Specific segment]
- Primary persona: [Specific role and pain]
- Secondary personas: [If any]

## The 3 key messages
1. [Message — one clear sentence]
2. [Message — one clear sentence]
3. [Message — one clear sentence]

## What we will NOT say
[Anti-claims and over-promises to avoid]

## Timeline

| Milestone | Date | Owner |
|-----------|------|-------|
| Messaging tested | T-6 weeks | PMM |
| Sales enabled | T-2 weeks | PMM + Sales |
| Beta complete | T-3 weeks | PM |
| Marketing assets live | T-1 week | Marketing |
| Launch day | T-0 | All |
| First retro | T+30 days | PMM |

## Ownership (RACI summary)

| Function | Owner | Key deliverable |
|----------|-------|-----------------|
| Product | [Name] | [Deliverable] |
| Engineering | [Name] | [Deliverable] |
| PMM | [Name] | [Deliverable] |
| Sales | [Name] | [Deliverable] |
| Marketing | [Name] | [Deliverable] |
| CS | [Name] | [Deliverable] |

## Success metrics

**Leading (first 7 days)**
- [Metric] — target: [Number]
- [Metric] — target: [Number]
- [Metric] — target: [Number]

**Lagging (30-180 days)**
- [Metric] — target: [Number]
- [Metric] — target: [Number]
- [Metric] — target: [Number]

## Top 3 risks (from pre-mortem)
1. **[Risk]** — Mitigation: [What we're doing about it]
2. **[Risk]** — Mitigation: [What we're doing about it]
3. **[Risk]** — Mitigation: [What we're doing about it]

## Key links
- Product spec: [Link]
- Messaging house: [Link]
- Sales deck: [Link]
- Metrics dashboard: [Link]
```

## What good output looks like

- Fits on one page if printed
- Specific enough that anyone on the team knows what they're doing
- Single named owner per function (not "the marketing team")
- Real dates, not "TBD"
- Metrics with actual targets

## What to avoid

- Vague language that lets each function interpret differently
- Missing owners ("the launch team will handle messaging" is a red flag)
- Pre-mortem skipped — this is the most valuable section
- Two-page briefs. Discipline matters.
- Treating it as static. The brief is a living doc, updated weekly until launch.
