---
name: gtm-motion-diagnostic
description: Diagnose whether a product should run a Product-Led Growth (PLG), Sales-Led Growth (SLG), Hybrid, or Partner-Led motion based on ACV, ICP, buying behavior, and operational readiness. Use this skill whenever a product marketing manager (PMM), founder, or GTM leader is making or revisiting the strategic motion choice. Triggers include "should we be PLG or SLG," "we're stuck between motions," "is hybrid the right move for us," "our PLG isn't converting," "diagnose our GTM motion," "we copied [Company]'s motion and it isn't working," or any request to evaluate motion fit. Use even when the framing is vague — like "our funnel feels off" or "we don't know how to sell this."
---

# GTM Motion Diagnostic

A skill for evaluating which GTM motion fits a product and identifying the cross-functional changes required to make it work.

## What this skill does

Evaluates the user's product against PLG, SLG, Hybrid, and Partner-Led motion criteria, then:

1. Recommends a primary motion with reasoning
2. Flags red flags or misalignments in the current setup
3. Maps the cross-functional changes required (Product, Sales, Marketing, CS)
4. Suggests a 90-day plan to migrate to the recommended motion
5. Calls out which motions are NOT a fit and why

## When to use

- Pre-launch motion decision
- After 12+ months when current motion isn't working
- After moving upmarket or downmarket
- When sales and marketing keep blaming each other
- When a board or exec is questioning GTM strategy

## How to run this skill

### Step 1: Gather operating data

Ask the user for whichever of these they have:

**Product / pricing:**
- Average Contract Value (ACV) — actual, not aspirational
- Time-to-value (signup to first meaningful outcome)
- Pricing model (per-seat, usage, flat, custom)
- Free tier or trial available?
- Self-serve onboarding complete?

**Customer / buying:**
- Primary ICP (size, segment)
- Buying committee size (single buyer or 5+ stakeholders)
- Sales cycle length (median, not best case)
- Procurement complexity (legal, security, SOC 2)

**Team / motion:**
- Current sales motion (inside sales, field sales, self-serve)
- Marketing channels (paid, content, events, community)
- CS model (high-touch, tech-touch, hybrid)
- Comp plan (quota, MBO, usage-based)

### Step 2: Apply the motion fit framework

Use these criteria. Don't apply them mechanically — judgment matters.

**Product-Led Growth (PLG) fits when:**
- ACV under $5,000
- Time-to-value under 1 hour
- End user can adopt without IT approval
- Product has a viral or expansion loop built in
- Buying committee is small (often single user)
- Self-serve onboarding is excellent

**Sales-Led Growth (SLG) fits when:**
- ACV $50,000+
- Time-to-value involves implementation
- Procurement, legal, security review required
- Buying committee is 5+ stakeholders
- Product solves a complex, custom problem
- Customers expect a relationship, not a self-serve experience

**Hybrid (PLG + SLG) fits when:**
- ACV $5,000-$50,000
- Self-serve gets customers to value, but expansion requires sales
- Two distinct buyer segments (SMB self-serve + Enterprise sales)
- Clear PQL signals exist or can be built
- Both motions can coexist without sales swooping in too early

**Partner-Led (PaLG) fits when:**
- Product is best discovered through ecosystem (integrations, marketplaces, agencies)
- ACV varies widely by partner channel
- Direct sales motion is too expensive for the customer profile
- Partner economics make sense (margin sharing, co-marketing value)
- A dedicated partner team exists or will be funded

### Step 3: Identify red flags

Common motion misalignments to flag:

**PLG red flags:**
- ACV under $5K but sales team is full quota-carrying AEs (CAC kills you)
- Self-serve signup but the product requires a sales call to set up
- Marketing optimizing for MQLs in a PLG motion (wrong metric)
- No PQL definition

**SLG red flags:**
- $50K+ ACV but no field sales motion
- Marketing optimizing for top-of-funnel volume in an enterprise motion
- 30-day sales cycle expectation when the segment averages 9 months
- No discovery process before demos

**Hybrid red flags:**
- Sales reaching out to every signup (kills PLG conversion)
- No defined PQL — sales pursues by gut
- Comp plan pays only on net-new logos (no expansion incentive)
- Product and Sales not co-owning the handoff moment

**Partner-Led red flags:**
- Partner enablement is "build it and they will come"
- Margin sharing not aligned with partner economics
- No dedicated partner team
- Direct sales gets credit for partner-sourced deals (kills the channel)

### Step 4: Generate the diagnostic

Use this structure:

```markdown
# GTM Motion Diagnostic: [Product]
*Date: [Date]*
*Run by: [Name]*

## Current state snapshot
- ACV: [Number]
- Primary ICP: [Description]
- Time-to-value: [Time]
- Sales motion: [Current]
- Marketing focus: [Current]

## Recommended motion: [PLG / SLG / Hybrid / Partner-Led]

### Why this fits
[3-4 specific reasons tied to the data the user shared]

### Why other motions don't fit
- [Motion]: [Reason it doesn't fit]
- [Motion]: [Reason it doesn't fit]

## Current red flags

### Critical (fix in 30 days)
1. [Specific misalignment with specific consequence]
2. [Specific misalignment with specific consequence]

### Important (fix in 90 days)
1. [Specific misalignment with specific consequence]
2. [Specific misalignment with specific consequence]

## Cross-functional changes required

### Product
- [Specific change]
- [Specific change]

### Sales
- [Specific change]
- [Specific change]

### Marketing
- [Specific change]
- [Specific change]

### Customer Success
- [Specific change]
- [Specific change]

## 90-day migration plan

### Days 1-30
- [Specific action with owner]
- [Specific action with owner]
- [Specific action with owner]

### Days 31-60
- [Specific action with owner]
- [Specific action with owner]
- [Specific action with owner]

### Days 61-90
- [Specific action with owner]
- [Specific action with owner]
- [Specific action with owner]

## Metrics to watch during migration
- [Leading indicator]
- [Leading indicator]
- [Lagging indicator]

## What success looks like in 6 months
[2-3 sentences describing the operating state if migration succeeds]
```

### Step 5: Push back on copycat strategies

If the user says "we want to do PLG like Notion" or "we want to be the Salesforce of X," push back:

- Notion's PLG worked because of viral collaboration and a 5-year head start on freemium
- Salesforce's SLG worked because of enterprise data infrastructure timing
- Most copycat motions fail because the underlying conditions are different

Don't let them copy the motion of a company in a different category, market, or stage.

### Step 6: Calibrate to readiness

A great motion fit on paper means nothing if the team can't execute it. Always ask:

- Does the team have the muscle to run this motion? (PLG requires product UX investment; SLG requires AE experience)
- Is leadership willing to fund the migration?
- Is the comp plan aligned to the new motion?

If readiness is low, recommend a phased approach rather than a clean cutover.

## What good output looks like

- A clear recommendation with specific reasoning
- Honest about what's not working today
- Concrete 90-day plan with named actions, not vague principles
- Pushback on copycat motions when the underlying conditions don't match
- Calibrated to operational readiness, not just strategic fit

## What to avoid

- Generic recommendations ("you should be hybrid") without reasoning
- Recommending PLG just because it's trendy
- Recommending SLG just because the founder used to work at Salesforce
- Skipping the readiness check
- A migration plan that requires 18 months. The plan should produce real changes in 30, 60, and 90 days.
