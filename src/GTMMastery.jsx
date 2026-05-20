import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, X, Check, Search, Target, MessageSquare, Settings, Radio, Users, ArrowRight, CheckCircle2, Circle, Copy, ExternalLink, FileText, Wand2, Layers, Link2, Download, Package, Compass, Megaphone, Swords, Rocket, Presentation, Mic, GitBranch } from 'lucide-react';

const safeStorage = {
  async get(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const value = window.localStorage.getItem(key);
        if (value !== null) return { key, value };
      }
    } catch (e) {}
    return null;
  },
  async set(key, value) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return { key, value };
      }
    } catch (e) {}
    return null;
  },
  async delete(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return { key, deleted: true };
      }
    } catch (e) {}
    return null;
  }
};

export default function GTMMastery() {
  const [activeModal, setActiveModal] = useState(null);
  const [checklistState, setChecklistState] = useState({});
  const [toolFilter, setToolFilter] = useState('All');
  const [toolTierFilter, setToolTierFilter] = useState('All');
  const [toolSearch, setToolSearch] = useState('');
  const [activeElement, setActiveElement] = useState(0);
  const [activeMotion, setActiveMotion] = useState('PLG');
  const [storageReady, setStorageReady] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [skillContent, setSkillContent] = useState({});
  const [skillLoading, setSkillLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await safeStorage.get('gtm-checklist');
      if (result?.value) { try { setChecklistState(JSON.parse(result.value)); } catch (e) {} }
      setStorageReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    safeStorage.set('gtm-checklist', JSON.stringify(checklistState));
  }, [checklistState, storageReady]);

  useEffect(() => {
    if (activeModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

  useEffect(() => {
    if (typeof activeModal === 'object' && activeModal?.type === 'skill' && activeModal.skill?.id) {
      const id = activeModal.skill.id;
      if (!skillContent[id]) {
        setSkillLoading(true);
        fetch(`/skills/${id}.md`)
          .then(r => r.ok ? r.text() : Promise.reject('not found'))
          .then(text => {
            setSkillContent(prev => ({ ...prev, [id]: text }));
            setSkillLoading(false);
          })
          .catch(() => {
            setSkillContent(prev => ({ ...prev, [id]: '## Preview unavailable\n\nDownload the skill below to see the full content.' }));
            setSkillLoading(false);
          });
      }
    }
  }, [activeModal, skillContent]);

  const toggleCheck = (id) => setChecklistState(prev => ({ ...prev, [id]: !prev[id] }));
  const resetChecklist = async () => { setChecklistState({}); await safeStorage.delete('gtm-checklist'); };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {}
  };

  // ============ ELEMENTS (with deep-dive content) ============
  const elements = [
    {
      icon: Target, number: '01', title: 'ICP & Personas', tagline: "Know exactly who you're targeting", color: '#FF5C39',
      detail: 'The Ideal Customer Profile (ICP) defines the company-level fit. Personas define the human-level fit. Treat them as two different documents that work together.',
      tips: [
        'Use firmographic data (industry, size, tech stack) for ICP',
        'Conduct 15+ customer interviews before finalizing personas',
        "Identify the economic buyer vs. the end user, they're often different people",
        'Update personas every 6 months as market evolves'
      ],
      tool: 'Notion + Dovetail for research synthesis',
      example: 'Figma interviewed 50+ designers before launch and discovered the real demand was for a browser-based tool, not another desktop app.',
      compare: {
        title: 'ICP vs. Persona',
        rows: [
          ['Level', 'Company / account', 'Individual human'],
          ['Defines', 'Who you sell to', 'Who you talk to'],
          ['Built from', 'Firmographics, tech stack, deal data', 'Interviews, jobs-to-be-done, behavior'],
          ['Updated', 'Annually', 'Every 6 months'],
          ['Used for', 'Targeting, scoring, TAM', 'Messaging, content, sales scripts'],
        ],
        leftLabel: 'ICP', rightLabel: 'Persona'
      },
      template: {
        title: 'Customer Interview Question Bank',
        intro: 'Use 15-20 of these in a 45-minute conversation. Listen for emotional language and exact phrasing you can lift into messaging.',
        sections: [
          { name: 'Context', items: ['Walk me through your role and what a typical week looks like', 'What does success look like for you this quarter?', "What's the most painful part of [workflow] today?"] },
          { name: 'Trigger', items: ['What made you start looking for a solution?', 'What were you using before? Why did you stop?', "What would have happened if you didn't solve this?"] },
          { name: 'Decision', items: ['Walk me through who else was involved in the decision', 'What almost stopped you from buying?', 'How did you justify the spend internally?'] },
          { name: 'Value', items: ['What does it let you do that you couldn\'t do before?', 'If we took it away tomorrow, what would you do?', 'How would you describe it to a peer?'] },
        ]
      },
      sources: 'Pull from three places: customer interviews (qualitative truth), Gong call recordings (real objection language), and closed-won/closed-lost CRM data (patterns at scale). Triangulate, don\'t trust any single source.',
      prompt: `Act as a B2B product marketing manager. I'm building an ICP and persona for [PRODUCT]. My closed-won customers tend to share these traits: [LIST]. My best users are typically [ROLE] who care about [OUTCOME]. Help me draft: (1) an ICP with firmographics and disqualifiers, (2) a primary persona with goals, pains, watering holes, and exact phrases they use, (3) the top 5 interview questions I should ask next to validate this.`,
      resources: [
        { label: "Lenny's Newsletter: ICP frameworks", url: 'https://www.lennysnewsletter.com' },
        { label: 'April Dunford on customer interviews', url: 'https://www.aprildunford.com' },
        { label: 'Dovetail customer research templates', url: 'https://dovetail.com/templates/' },
      ]
    },
    {
      icon: MessageSquare, number: '02', title: 'Positioning & Messaging', tagline: "Own a clear space in the buyer's mind", color: '#7B5CFF',
      detail: 'Positioning is the strategic choice of where you compete and what you stand for. Messaging is how you communicate that choice to specific audiences. Different personas, different GTM players, different messages, same core positioning.',
      tips: [
        'Write a one-sentence value prop a 10-year-old can understand',
        'Test messaging with real buyers before publishing anywhere',
        'Build a messaging house: core promise, three pillars, proof points',
        'Tailor messaging per persona AND per GTM channel (sales, web, in-product)'
      ],
      tool: 'Wynter for B2B message testing with real buyers',
      example: 'HubSpot tested 5 value prop angles with 100+ buyers. "Free CRM" beat "inbound marketing platform" by 3x.',
      compare: {
        title: 'Positioning vs. Messaging',
        rows: [
          ['Time horizon', 'Years', 'Quarters'],
          ['Audience', 'Internal alignment', 'External buyers'],
          ['Owned by', 'Exec team + PMM', 'PMM + Content'],
          ['Output', 'One foundational doc', 'Many channel-specific assets'],
          ['Changes when', 'Strategy shifts', 'New persona or proof emerges'],
        ],
        leftLabel: 'Positioning', rightLabel: 'Messaging'
      },
      template: {
        title: 'Messaging House Template',
        intro: 'The one doc every PMM should maintain. Print it on the wall.',
        sections: [
          { name: 'Core Promise', items: ['One sentence. The single most important thing you do for your ICP. If a customer can only remember one thing, this is it.'] },
          { name: 'Three Pillars', items: ['Pillar 1: [Capability that delivers the promise]', 'Pillar 2: [Capability that delivers the promise]', 'Pillar 3: [Capability that delivers the promise]'] },
          { name: 'Proof Points (per pillar)', items: ['Quantitative: metric or stat', 'Qualitative: customer quote', 'Demonstrable: feature or screenshot'] },
          { name: 'Persona Variations', items: ['Economic buyer: emphasize ROI and risk reduction', 'End user: emphasize ease and time savings', 'Champion: emphasize career-making outcomes'] },
        ]
      },
      sources: "Use April Dunford's Obviously Awesome framework for positioning. Use the Messaging House for daily work. Use Wynter to test before publishing — never assume your copy resonates.",
      prompt: `Act as a B2B positioning expert in the style of April Dunford. Help me position [PRODUCT]. My alternatives are [LIST]. My unique attributes are [LIST]. The value those attributes deliver is [OUTCOMES]. The customers who care most are [SEGMENT]. Now draft: (1) a positioning statement, (2) a messaging house with one promise and three pillars, (3) three persona-specific message variations, (4) the top 3 messages I should A/B test on Wynter first.`,
      resources: [
        { label: 'April Dunford: Obviously Awesome', url: 'https://www.aprildunford.com/book' },
        { label: 'Wynter message testing', url: 'https://wynter.com' },
        { label: 'Emily Kramer (MKT1) on messaging', url: 'https://mkt1.co/newsletter' },
      ]
    },
    {
      icon: Settings, number: '03', title: 'GTM Motion', tagline: "Choose how you'll reach and convert buyers", color: '#00B86B',
      detail: 'The GTM motion is the most strategic decision you make. It shapes pricing, team structure, marketing channels, and product priorities for years. Aligning the entire org behind one motion is harder than picking it.',
      tips: [
        'Match motion to ACV: PLG under $5K, hybrid $5K-$50K, SLG above $50K',
        "Don't copy what worked for another company in another category",
        'Align comp plans, product priorities, and content strategy to the motion',
        'Plan for motion evolution as you move upmarket'
      ],
      tool: 'See the GTM Motions module below for a full breakdown',
      example: 'Slack rode PLG to $1B ARR in 7 years. Salesforce built the SLG playbook. Figma combined both.',
      compare: {
        title: 'Right Motion vs. Wrong Motion',
        rows: [
          ['Pricing', 'Self-serve transparent', 'Custom enterprise quotes'],
          ['Marketing', 'Activation funnels', 'Account-based plays'],
          ['Sales role', 'Closer for high-intent PQLs', 'Driver of every deal'],
          ['Product priority', 'Time-to-value', 'Security + admin controls'],
          ['Comp plan', 'Usage-based incentives', 'Quota-based commission'],
        ],
        leftLabel: 'PLG-fit', rightLabel: 'SLG-fit'
      },
      template: {
        title: 'Cross-Functional Motion Alignment Worksheet',
        intro: 'Run this with PM, Sales, CS, and Marketing leads. Everyone has to agree on each row.',
        sections: [
          { name: 'Product (PM owns)', items: ['What\'s our time-to-first-value target?', 'Are we building self-serve onboarding or sales-assisted demos?', 'Where do we gate features: free, paid, enterprise?'] },
          { name: 'Sales (CRO owns)', items: ['Do we lead with PQLs or outbound?', 'What\'s the SDR role: qualifier or hunter?', 'When does an AE get involved?'] },
          { name: 'Marketing (CMO owns)', items: ['Where do we invest: SEO, paid, events, community?', 'What content do we owe sales vs. self-serve users?', 'How do we measure attribution across the motion?'] },
          { name: 'CS (CCO owns)', items: ['Are we high-touch or tech-touch?', 'What triggers expansion conversations?', "How fast do we move customers from onboarding to value?"] },
        ]
      },
      sources: 'Align across departments by writing a one-page motion brief and getting sign-off from each functional leader. If even one function disagrees, the motion will not work.',
      prompt: `Act as a head of GTM strategy. I'm running [PRODUCT] with ACV around [X], serving [ICP]. Help me: (1) recommend a primary motion (PLG, SLG, hybrid, or partner-led) with reasoning, (2) write a one-page motion brief covering pricing, sales role, marketing channels, and CS model, (3) flag the top 3 cross-functional decisions we need leadership alignment on before we execute.`,
      resources: [
        { label: 'OpenView PLG resources', url: 'https://openviewpartners.com/product-led-growth' },
        { label: 'Kyle Poyar on PLG benchmarks', url: 'https://www.growthunhinged.com' },
        { label: 'The Sales-Led Growth playbook', url: 'https://www.lennysnewsletter.com' },
      ]
    },
    {
      icon: Radio, number: '04', title: 'Channels & Content', tagline: 'Reach buyers where they actually are', color: '#FFB627',
      detail: "Pick the 2-3 channels where your ICP already pays attention. Then go deeper than your competitors are willing to. Don't forget that B2B buying involves 5-7 stakeholders, each of whom lives in different channels.",
      tips: [
        'Audit where your top 20 customers actually came from',
        'Beat one channel before adding the next',
        'Match content depth to buyer stage (TOFU, MOFU, BOFU)',
        'Build a multi-persona channel map: champion on LinkedIn, finance in RFP docs, end user in community'
      ],
      tool: 'Ahrefs and Semrush for content intelligence',
      example: 'Drift built their entire pipeline on LinkedIn and podcasts when everyone else was chasing Google Ads.',
      compare: {
        title: 'Channels: Obvious vs. Overlooked',
        rows: [
          ['Discovery', 'Google search, paid ads', 'Slack/Discord communities, Reddit'],
          ['Trust building', 'Webinars, whitepapers', 'Podcasts, executive newsletters'],
          ['Peer validation', 'Customer logos', 'G2 reviews, peer Slack groups'],
          ['Education', 'Blog posts, ebooks', 'YouTube tutorials, in-product nudges'],
          ['Direct outreach', 'Cold email, LinkedIn DMs', 'Warm intros via mutual customers'],
        ],
        leftLabel: 'Most teams', rightLabel: 'Underused'
      },
      template: {
        title: 'Multi-Persona Channel Map',
        intro: 'B2B sales involve at least 5 stakeholders. Map each one to where they actually consume info.',
        sections: [
          { name: 'Economic Buyer (signs the check)', items: ['LinkedIn thought leadership from your CEO', 'Industry analyst reports', 'Peer CXO communities and dinners', 'Board-friendly ROI calculators'] },
          { name: 'Champion (drives the deal internally)', items: ['Practitioner podcasts', 'Career-defining case studies', 'Templates and frameworks they can share', 'Slack/Discord communities for their role'] },
          { name: 'End User (uses the product daily)', items: ['Product-led tutorials and changelogs', 'YouTube how-tos', 'In-product onboarding nudges', 'Community forums'] },
          { name: 'Procurement & IT (gatekeepers)', items: ['Security/compliance docs (SOC 2, GDPR)', 'Integration documentation', 'Reference customers in their industry', 'Trust center pages'] },
        ]
      },
      sources: 'Talk to your top 20 closed-won customers and ask exactly where they first heard about you, what made them pay attention, and what almost killed the deal. Pattern-match.',
      prompt: `Act as a B2B demand gen strategist. My product is [PRODUCT] sold to [ICP]. My champion persona is [ROLE], economic buyer is [ROLE], end user is [ROLE]. Help me: (1) map each persona to 3 channels they actually use, (2) recommend one TOFU, one MOFU, and one BOFU content piece per persona, (3) identify 2 underused channels my competitors are ignoring.`,
      resources: [
        { label: 'MKT1 channel strategy guide', url: 'https://mkt1.co' },
        { label: 'Demand Curve playbooks', url: 'https://www.demandcurve.com' },
        { label: 'Refine Labs on B2B distribution', url: 'https://www.refinelabs.com' },
      ]
    },
    {
      icon: Users, number: '05', title: 'Sales Enablement', tagline: 'Arm your revenue team to win', color: '#FF3E7F',
      detail: "Your sellers and CSMs are the last mile of GTM. If they can't articulate the value, no campaign or content will save you. Equally important: make sure every GTM team member knows where to find what they need.",
      tips: [
        'Enable sales at least 2 weeks before any major launch',
        'Build battlecards for top 3 competitors per market segment (startup vs. enterprise)',
        'Build one home for all GTM assets so reps stop asking in Slack',
        "Certify reps on new positioning, don't just train them"
      ],
      tool: 'Gong for call intelligence, Highspot for content',
      example: 'Salesforce starts sales training 3 weeks pre-launch. Result: 40% faster ramp to quota.',
      compare: {
        title: 'Trained vs. Truly Enabled',
        rows: [
          ['Pre-launch time', 'Day-of email', '2-3 weeks of practice'],
          ['Format', 'One-time deck review', 'Live role-play + certification'],
          ['Battlecards', 'One per competitor', 'One per competitor PER segment'],
          ['Resource access', 'Scattered in Slack', 'Single source of truth (Highspot, Notion)'],
          ['Feedback loop', 'None', 'Win/loss reviews fed back monthly'],
        ],
        leftLabel: 'Trained', rightLabel: 'Enabled'
      },
      template: {
        title: 'Battlecard Template (per competitor per segment)',
        intro: 'Build one card per competitor for each segment you sell into. The enterprise card looks different from the startup card.',
        sections: [
          { name: 'Why we win', items: ['Top 3 wedges specific to this segment', 'Customer proof quotes from this segment', 'Demo moments that close them'] },
          { name: 'Why we lose', items: ['Honest gaps where they beat us', 'Workarounds and roadmap commitments', 'When to disqualify and walk'] },
          { name: 'Objection handlers', items: ['"You\'re more expensive" → reframe to value', '"They have feature X" → reframe scope', '"We\'re already evaluating them" → land-and-replace play'] },
          { name: 'Trap questions', items: ['Questions only we can answer well', "Questions that expose their weaknesses without naming them"] },
        ]
      },
      sources: "Pull battlecard inputs from Gong calls (real objections), Crayon or Klue (competitor moves), and your CRM closed-lost reasons. Update monthly.",
      prompt: `Act as a sales enablement lead. We sell [PRODUCT] against [COMPETITOR] in the [SEGMENT] segment. Help me build: (1) a battlecard with why-we-win, why-we-lose, and 5 objection handlers specific to this segment, (2) a 30-minute enablement script reps can use to practice in pairs, (3) the top 3 trap questions reps should ask to expose the competitor's weakness.`,
      resources: [
        { label: 'Klue battlecard examples', url: 'https://klue.com/resources' },
        { label: 'Gong sales call analysis', url: 'https://www.gong.io/resources' },
        { label: 'Highspot enablement library', url: 'https://www.highspot.com/resources/' },
      ]
    },
  ];

  // ============ MOTIONS ============
  const motions = {
    'PLG': { name: 'Product-Led Growth', acv: '< $5K ACV', color: '#7B5CFF', summary: 'The product itself is the primary acquisition, conversion, and expansion channel. Users discover value before ever talking to sales.', examples: 'Slack, Figma, Notion, Calendly, Canva', realExample: 'Slack: Free tier with 10K message history drove 500K+ signups. Freemium led to $1B+ ARR in 7 years.', strengths: ['Viral loops drive organic growth', 'Lower CAC', 'High scalability', 'Data-rich user behavior'], challenges: ['Requires strong product UX', 'Complex attribution', 'Harder to monetize enterprise'], pmmRole: 'Build in-product messaging, onboarding flows, upgrade prompts, and usage-based triggers.', alignment: 'Product owns activation. Marketing owns top-of-funnel and PQL signals. Sales activates only on high-intent product signals. CS focuses on adoption depth. All four agree on what defines a PQL.' },
    'SLG': { name: 'Sales-Led Growth', acv: '$50K+ ACV', color: '#FF5C39', summary: 'Sales reps drive the buying conversation from first touch through close. High-touch, high-consideration purchases.', examples: 'Salesforce, Workday, SAP, Snowflake (enterprise)', realExample: 'Salesforce built the SLG playbook: SDRs, AEs, and field sales drove them from startup to $30B+ revenue.', strengths: ['Higher ACVs', 'Strong customer relationships', 'Predictable revenue', 'Complex deals possible'], challenges: ['High CAC', 'Long sales cycles', 'Requires strong sales org', 'Slower to scale'], pmmRole: 'Build sales decks, battlecards, ROI calculators, and arm AEs with category-defining narratives.', alignment: 'Sales owns the pipeline number. Marketing owns the MQL number and feeds sales. Product builds for the customers sales closes. CS owns NRR and feeds back stories that close the next deal.' },
    'Hybrid': { name: 'Hybrid Motion', acv: '$5K - $50K ACV', color: '#00B86B', summary: 'Product drives top-of-funnel and SMB conversion. Sales takes over for mid-market and enterprise expansion.', examples: 'Figma, Notion, HubSpot, Atlassian', realExample: 'HubSpot: Free CRM drove 500K+ signups. Sales converted high-intent users to paid tiers. $1.5B+ market cap.', strengths: ['Best of both worlds', 'Multiple revenue paths', 'Lower blended CAC', 'Land-and-expand built in'], challenges: ['Complex to operationalize', 'Sales/product tension', 'Requires sophisticated PQL scoring'], pmmRole: 'Define PQL criteria, build handoff playbooks, design upgrade prompts for self-serve to sales-assisted.', alignment: 'The hardest motion to align. Product, Sales, and Marketing must co-own the PQL definition and the handoff moment. If sales swoops in too early, you kill PLG; too late and you leave money on the table.' },
    'Partner': { name: 'Partner-Led Growth', acv: 'Varies', color: '#FFB627', summary: 'Channel partners, integrations, and ecosystems drive the majority of new customer acquisition.', examples: 'Shopify, AWS Marketplace, Stripe', realExample: "Shopify's app ecosystem and agency partners drive more than half of merchant acquisition and retention.", strengths: ['Scalable distribution', 'Lower direct CAC', 'Geographic expansion', 'Implicit endorsement'], challenges: ['Less control over experience', 'Partner enablement is heavy', 'Margin sharing'], pmmRole: 'Build partner enablement, co-marketing campaigns, and incentive programs that align partner economics.', alignment: 'A dedicated partnerships function owns the channel. Marketing produces co-brandable assets. Product builds partner APIs and SDKs. Sales gets credit for partner-sourced deals or the motion collapses.' }
  };

  // ============ TOOLS (with how-to-use) ============
  const tools = [
    { name: 'Dovetail', category: 'Research', tier: 'Essential', desc: 'Customer research repository & synthesis', stat: '2K+ teams', cost: 100, howTo: 'Record every customer interview, tag insights by theme (pain, gain, language), and link clips to your messaging house. The unfair advantage: when you write copy, you quote real customers verbatim.', url: 'https://dovetail.com' },
    { name: 'Wynter', category: 'Messaging', tier: 'Essential', desc: 'B2B message testing with real buyers', stat: '500+ tests/month', cost: 200, howTo: 'Test homepage hero, pricing page positioning, and email subject lines BEFORE you publish. Aim for 70%+ message-resonance scores. Anything below 50% means rewrite.', url: 'https://wynter.com' },
    { name: 'Gong', category: 'Analytics', tier: 'Essential', desc: 'Sales call intelligence & win/loss insights', stat: '10K+ customers', cost: 150, howTo: 'Search calls for competitor names, objection patterns, and exact customer phrases. Build a Gong tracker for every new launch to monitor how sales is actually pitching it.', url: 'https://www.gong.io' },
    { name: 'Notion', category: 'Collaboration', tier: 'Essential', desc: 'GTM docs, messaging house, launch briefs', stat: '10M+ users', cost: 20, howTo: 'Build a single GTM home: messaging house, launch tier system, persona library, and competitive intel. One link in your bio, every rep bookmarks it.', url: 'https://notion.so' },
    { name: 'Highspot', category: 'Enablement', tier: 'Advanced', desc: 'Sales enablement & content management', stat: 'Enterprise-focused', cost: 400, howTo: 'Replace "asset request" Slack threads. Tag every asset by stage, persona, and segment. Track which content reps actually use vs. ignore.', url: 'https://www.highspot.com' },
    { name: 'Seismic', category: 'Enablement', tier: 'Advanced', desc: 'Enterprise sales enablement platform', stat: '$500M+ ARR', cost: 500, howTo: 'For enterprise teams, Seismic lets you auto-customize pitch decks per opportunity. Worth it once you have 50+ reps.', url: 'https://seismic.com' },
    { name: 'Ahrefs', category: 'Research', tier: 'Essential', desc: 'SEO and competitive content analysis', stat: '1M+ users', cost: 200, howTo: 'Reverse-engineer what content your competitors rank for. Find their top pages, identify gaps, and out-build them on the highest-intent keywords.', url: 'https://ahrefs.com' },
    { name: 'Semrush', category: 'Research', tier: 'Essential', desc: 'Market intelligence & keyword research', stat: '10M+ users', cost: 130, howTo: 'Track keyword movements over time. Spot a competitor losing rankings? Investigate why and steal the position.', url: 'https://semrush.com' },
    { name: 'Crayon', category: 'Research', tier: 'Advanced', desc: 'Competitive intelligence tracking', stat: '500+ enterprise customers', cost: 300, howTo: 'Set up alerts for competitor pricing pages, product launches, and exec hires. Feed insights into monthly battlecard updates.', url: 'https://www.crayon.co' },
    { name: 'Klue', category: 'Research', tier: 'Advanced', desc: 'Competitive battlecard management', stat: '300+ customers', cost: 250, howTo: 'Live battlecards that update automatically. Reps can pull a card mid-call without leaving Salesforce. Game-changer for high-velocity sales teams.', url: 'https://klue.com' },
    { name: 'HubSpot', category: 'Analytics', tier: 'Essential', desc: 'CRM, email marketing, pipeline tracking', stat: '200K+ customers', cost: 100, howTo: 'For SMB and mid-market, HubSpot is the easiest way to connect marketing campaigns to pipeline. Set up campaign attribution from day one.', url: 'https://hubspot.com' },
    { name: 'Salesforce', category: 'Analytics', tier: 'Advanced', desc: 'Enterprise CRM & revenue operations', stat: '$35B+ market cap', cost: 300, howTo: 'For enterprise. Partner with RevOps to build dashboards showing pipeline by campaign, segment, and persona. PMM lives in Salesforce reports.', url: 'https://salesforce.com' },
    { name: 'Figma', category: 'Collaboration', tier: 'Essential', desc: 'Visual assets, decks, design collaboration', stat: '4M+ users', cost: 15, howTo: 'Build your master deck once in Figma, then duplicate per launch. FigJam for workshops with sales and product on messaging.', url: 'https://figma.com' },
    { name: 'Loom', category: 'Enablement', tier: 'Essential', desc: 'Async video for sales training', stat: '25M+ users', cost: 15, howTo: 'Record 5-minute Loom walkthroughs of new messaging instead of scheduling another meeting. Reps watch on 1.5x speed and retain more.', url: 'https://loom.com' },
    { name: 'Miro', category: 'Collaboration', tier: 'Essential', desc: 'Collaborative GTM planning & workshops', stat: '50M+ users', cost: 16, howTo: 'Use for launch retros, customer journey mapping, and cross-functional alignment workshops. Templates save hours.', url: 'https://miro.com' },
    { name: 'Amplitude', category: 'Analytics', tier: 'Advanced', desc: 'Product analytics & user behavior', stat: '5K+ customers', cost: 250, howTo: 'For PLG motions, Amplitude shows you which features drive activation and upgrade. PMM partners with product on aha-moment definition.', url: 'https://amplitude.com' },
  ];

  const categories = ['All', 'Research', 'Messaging', 'Enablement', 'Analytics', 'Collaboration'];
  const tiers = ['All', 'Essential', 'Advanced'];

  const filteredTools = useMemo(() => {
    return tools.filter(t => {
      const matchCat = toolFilter === 'All' || t.category === toolFilter;
      const matchTier = toolTierFilter === 'All' || t.tier === toolTierFilter;
      const matchSearch = !toolSearch || t.name.toLowerCase().includes(toolSearch.toLowerCase()) || t.desc.toLowerCase().includes(toolSearch.toLowerCase());
      return matchCat && matchTier && matchSearch;
    });
  }, [toolFilter, toolTierFilter, toolSearch]);

  const totalCost = filteredTools.reduce((sum, t) => sum + t.cost, 0);

  const dos = [
    { title: 'Start with deep customer research', body: 'Validate pain, not just interest. Talk to 15+ customers before writing a single line of copy.', proof: 'Figma conducted 50+ design interviews before launch and discovered designers wanted a browser-based tool.' },
    { title: 'Build a cross-functional GTM team', body: 'Define a RACI with PM, Sales, CS, and Marketing before the launch brief is written.', proof: 'Slack runs weekly GTM syncs that prevent launch delays and messaging conflicts.' },
    { title: 'Test messaging before publishing', body: 'Use Wynter or similar tools to test with real buyers. Never assume your copy resonates.', proof: 'HubSpot tested 5 value prop angles. "Free CRM" beat "inbound marketing platform" by 3x.' },
    { title: 'Define launch tiers upfront', body: 'Tier 1 (all hands), Tier 2 (core team), Tier 3 (lightweight). Match resources to impact.', proof: 'Notion Tier 1 launches get 50+ person-weeks. Tier 3 launches get 5. No over-investment.' },
    { title: 'Enable sales 2+ weeks before launch', body: "Sales needs time to internalize, practice, and ask questions. Day-of training doesn't work.", proof: 'Salesforce starts sales training 3 weeks pre-launch. Result: 40% faster ramp to quota.' },
    { title: 'Set leading AND lagging indicators', body: 'Leading: pipeline, demos. Lagging: win rate, NRR. Both are required for a complete picture.', proof: 'Datadog tracks pipeline velocity and CAC payback together, adjusting tactics weekly.' },
    { title: 'Run a pre-mortem', body: 'Ask: "Imagine this launch failed. What went wrong?" It surfaces risks you would otherwise miss.', proof: "Stripe's pre-mortem caught incomplete developer docs, delaying launch by 2 weeks but avoiding post-launch chaos." },
    { title: 'Conduct a post-launch retrospective', body: "Schedule it within 30 days. Document what worked, what didn't, and what to change next time.", proof: 'Twilio post-launch retros led to earlier sales training, better competitive analysis, and improved dashboards.' },
  ];

  const donts = [
    { title: 'Launch without a tested value prop', body: "If you can't explain the value in one sentence that a buyer immediately gets, you're not ready.", proof: '"Unified platform for enterprise data" got blank stares. "Cut data pipeline costs by 60%" got 3x better response.' },
    { title: 'Treat GTM as a marketing-only activity', body: 'GTM is a company-wide motion. If only marketing is involved, it will fail.', proof: 'A real launch lost 40% of inbound deals because sales had no battlecards.' },
    { title: 'Lead with features, not outcomes', body: "Buyers don't care about features, they care about outcomes.", proof: 'Bad: "AI-powered anomaly detection." Good: "Detect issues 10x faster, reduce MTTR by 80%."' },
    { title: 'Skip competitive analysis', body: "You need to know your enemy. If you don't know why you win and lose, you can't improve.", proof: 'Notion positioned against Confluence as "beautiful, fast, intuitive" and won 2x more design team deals.' },
    { title: 'Measure only vanity metrics', body: "Impressions, views, and followers don't pay salaries. Tie every metric to pipeline or revenue.", proof: 'Reframe: not "100K impressions" but "$2M in pipeline with 15% MQL-to-SQL conversion."' },
    { title: 'Treat GTM as a one-time event', body: 'GTM is a continuous motion. Launch day is just the beginning of the market conversation.', proof: 'Best practice: T+30 first iteration, T+90 messaging refresh, T+180 new segment positioning.' },
    { title: 'Build in silos', body: 'Misalignment between PMM, Sales, and Product is the #1 reason launches underperform.', proof: 'PMM positioned "enterprise solution" while Product built SMB features. Sales confused, pipeline weak.' },
    { title: 'Neglect internal enablement', body: "Your sales and CS teams are your army. If they can't articulate the value, no one can.", proof: 'Gong data: Sales teams with 90%+ messaging certification close 2x more deals.' },
  ];

  // ============ CHECKLIST (with AI prompts per item) ============
  const checklist = [
    { phase: 'T-8 WEEKS', title: 'Strategy & Research', color: '#7B5CFF', items: [
      { text: 'ICP & personas defined and validated with customer interviews', prompt: "Help me build an ICP and primary persona for [PRODUCT]. I've talked to [N] customers. Here's the raw notes: [PASTE]. Synthesize: firmographics, top 3 pains in their words, top 3 outcomes they care about, and the 5 most quoted phrases I should lift into messaging." },
      { text: 'Competitive landscape mapped (top 3-5 competitors per segment)', prompt: 'I compete with [LIST]. For each, summarize: positioning angle, target ICP, pricing model, key strengths, key weaknesses. Then give me a positioning gap I could own that none of them are claiming.' },
      { text: 'Positioning & messaging drafted', prompt: "Using April Dunford's framework, help me position [PRODUCT]. Alternatives: [LIST]. Unique attributes: [LIST]. Value delivered: [OUTCOMES]. Target segment: [ICP]. Draft a one-paragraph positioning statement and a one-sentence value prop a 10-year-old would understand." },
      { text: 'Launch tier determined (Tier 1/2/3)', prompt: 'I have [N] launches coming up: [LIST WITH BRIEF]. Help me classify each as Tier 1 (all-hands), Tier 2 (core team), or Tier 3 (lightweight). For each, recommend the resource allocation in person-weeks.' },
      { text: 'GTM team assembled with RACI defined', prompt: 'Draft a RACI matrix for a Tier 1 launch covering: messaging house, sales enablement, demo script, website copy, PR, customer comms, metrics dashboard. Roles available: PMM, PM, Sales Lead, CS Lead, Content, Designer, RevOps.' },
    ]},
    { phase: 'T-4 WEEKS', title: 'Content & Enablement', color: '#FF5C39', items: [
      { text: 'Launch brief distributed to all stakeholders', prompt: 'Write a one-page launch brief for [PRODUCT/FEATURE]. Audience: cross-functional GTM team. Include: what it is, why now, target persona, key message, success metrics, timeline, and the top 3 risks. Tone: punchy and clear.' },
      { text: 'Sales deck & battlecard created', prompt: 'Draft a 10-slide sales deck for [PRODUCT] selling into [ICP]. Structure: hook, problem, current alternatives, our approach, proof points, pricing/packaging, next steps. Then build a battlecard against [TOP COMPETITOR] for the [SEGMENT] segment.' },
      { text: 'Website copy written and in staging', prompt: 'Write a homepage hero, three-pillar section, social proof section, and CTA for [PRODUCT]. Target persona: [ROLE]. Core message: [MESSAGE]. Tone: confident, specific, no jargon. Provide 3 alternative hero headlines I can A/B test.' },
      { text: 'Email sequences drafted and reviewed', prompt: 'Draft a 5-email sequence for [PERSONA] who signed up but hasn\'t activated. Goals: drive them to the aha moment of [FEATURE]. Tone: helpful, brief, one CTA per email. Include subject lines and a one-sentence summary of each.' },
      { text: 'Blog post and social content ready', prompt: 'Write a 1,200-word launch announcement blog for [PRODUCT]. Structure: hook (a customer story), problem context, our solution, how it works, what\'s next. Then draft 5 LinkedIn posts and 3 tweets to amplify it.' },
      { text: 'Demo script updated with new messaging', prompt: 'Update our demo script for [PRODUCT] to lead with [NEW MESSAGE]. Structure: discovery questions (3), demo flow (in order of "wow"), objection handlers (3), close. Keep total demo to 25 minutes with time for questions.' },
    ]},
    { phase: 'T-2 WEEKS', title: 'Internal Readiness', color: '#FFB627', items: [
      { text: 'Sales team trained and certified on new messaging', prompt: 'Design a 60-minute sales enablement session for [PRODUCT]. Include: positioning recap (10 min), live demo (15 min), role-play scenarios (20 min), Q&A (15 min). End with a 5-question certification quiz reps must pass before pitching.' },
      { text: 'CS team briefed on FAQs and objection handling', prompt: 'Build a CS playbook for [PRODUCT]. Include: top 10 expected questions with answers, top 5 expansion conversation triggers, top 3 churn risks and how to address them, and a one-pager CSMs can share with customers.' },
      { text: 'Support knowledge base articles updated', prompt: "Draft 5 support articles for [PRODUCT]: getting started, troubleshooting [common issue], best practices, integration with [TOOL], and FAQ. Each article: 300-500 words, scannable with H2s and bullet points." },
      { text: 'PR embargo scheduled with media contacts', prompt: 'Write a press release for [PRODUCT] launch. Include: headline, dateline, lead paragraph with the news hook, supporting paragraphs with customer quotes, boilerplate. Then draft a 3-bullet pitch email I can send to journalists.' },
      { text: 'Go/No-go review meeting completed', prompt: 'Design a 30-minute go/no-go review agenda. Decisions needed: (1) is messaging tested and ready? (2) is sales enabled? (3) are metrics dashboards live? (4) any blocking risks? Each owner reports red/yellow/green with a one-line justification.' },
      { text: 'Metrics dashboard set up and tracking', prompt: 'Help me design a launch metrics dashboard. Leading indicators: signups, demos booked, pipeline created. Lagging: win rate, activation rate, NRR. Recommend the queries or filters I need in [Salesforce/HubSpot/Amplitude].' },
    ]},
    { phase: 'T-0 LAUNCH', title: 'Launch Day', color: '#00B86B', items: [
      { text: 'All content published live', prompt: 'Give me a launch day checklist for content publishing. Sequence: homepage update, blog post live, in-product banner active, email sequence triggered, social posts scheduled. Include a verification step for each.' },
      { text: 'War Room Slack channel active', prompt: 'Draft a War Room Slack channel intro post. Include: who is in the room and why, what we monitor in real-time, escalation paths for issues, and the cadence of status updates.' },
      { text: 'Metrics dashboard monitoring in real-time', prompt: 'What anomalies should I watch for in the first 24 hours of launch? Help me set thresholds for: signup velocity, error rates, sales pipeline creation, social sentiment. Define what triggers an escalation.' },
      { text: 'Executive comms sent to company', prompt: 'Write an internal launch announcement from the CEO to the whole company. 200 words. Include: what we launched, why it matters, who deserves credit, and what we are asking employees to do today.' },
      { text: 'Social posts scheduled and live', prompt: 'Write 10 LinkedIn posts I can stagger across launch day: from CEO, head of product, PMM, and sales reps. Each post: different angle (vision, customer story, behind-the-scenes, technical depth, ask for feedback). 80-150 words each.' },
      { text: 'Customer-facing team on standby', prompt: 'Brief our customer-facing team for launch day. Include: what to say if a customer asks, how to escalate bugs vs. feature requests, suggested talking points, and the one thing we want every conversation to end with.' },
    ]},
    { phase: 'T+30 DAYS', title: 'Post-Launch', color: '#FF3E7F', items: [
      { text: 'Win/loss analysis initiated', prompt: 'Design a win/loss interview protocol for the first 10 deals post-launch. Include: 8 questions for closed-won customers, 8 for closed-lost, how to recruit interviewees, how to synthesize patterns, and how to feed insights back to product and sales.' },
      { text: 'Customer feedback collected (NPS/CSAT)', prompt: 'Build an NPS survey for users 30 days into [PRODUCT]. Include the NPS question, 3 follow-up questions for promoters, 3 for detractors, and one open-ended question for everyone. Plus the email copy to drive 25%+ response rate.' },
      { text: 'Retrospective meeting scheduled', prompt: 'Design a 90-minute launch retrospective agenda. Sections: metrics review, what worked (each function shares one), what did not work (each function shares one), what to change next launch (vote on top 3). End with owners and dates.' },
      { text: 'Messaging iteration plan documented', prompt: 'Based on Gong calls, Wynter tests, and customer feedback in the first 30 days, what messaging changes should we make? Help me build a messaging v2 brief: what is staying, what is changing, why, and the test plan.' },
      { text: 'Sales enablement materials updated based on feedback', prompt: 'Reps have given me feedback on [PRODUCT] enablement: [PASTE]. Help me prioritize: what to fix in the deck, what to add to the battlecard, what new objection handlers we need, and what training session would close the biggest gap.' },
    ]},
  ];

  const totalItems = checklist.reduce((sum, p) => sum + p.items.length, 0);
  const completedItems = Object.values(checklistState).filter(Boolean).length;
  const progressPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // ============ CROSS-FUNCTIONAL ALIGNMENT (new section) ============
  const alignmentRoles = [
    { role: 'Product Manager', color: '#7B5CFF', owns: 'What we build and when', pmmRelationship: 'PMM is PM\'s closest partner. PMM brings the market truth, PM brings the build reality.', alignmentMoves: ['Weekly sync on roadmap and messaging', 'Co-own the launch tier classification', 'Share customer interview notes in real-time', 'Joint Gong call reviews monthly'], friction: 'PM wants to ship more features. PMM wants to nail positioning before shipping. Resolve by tying features to messaging pillars upfront.' },
    { role: 'Sales / CRO', color: '#FF5C39', owns: 'Pipeline and revenue', pmmRelationship: 'PMM\'s most important customer. If sales can\'t pitch it, it didn\'t launch.', alignmentMoves: ['Enable 2+ weeks before launch with role-play', 'Live in Gong: listen to 5 calls/week minimum', 'Office hours weekly for deal support', 'Co-own win/loss analysis'], friction: 'Sales wants more leads. PMM wants better-qualified leads. Resolve by jointly defining the MQL/SQL definition every quarter.' },
    { role: 'Customer Success', color: '#00B86B', owns: 'Retention and expansion', pmmRelationship: 'The early warning system for messaging gaps and the source of expansion stories.', alignmentMoves: ['Monthly CS-to-PMM insight syncs', 'CS feeds case studies for messaging', 'PMM trains CS on expansion talking points', 'Co-own NPS analysis'], friction: 'CS gets blamed for churn caused by misaligned positioning. Resolve by including CS in messaging reviews before launch.' },
    { role: 'Marketing / CMO', color: '#FFB627', owns: 'Demand and brand', pmmRelationship: 'Marketing executes the demand engine. PMM owns the message that engine carries.', alignmentMoves: ['Co-own the messaging house', 'PMM briefs every campaign with persona and message angle', 'Joint review of paid creative before launch', 'Quarterly content calendar alignment'], friction: 'Marketing optimizes for clicks. PMM optimizes for pipeline. Resolve by tying every campaign metric to a pipeline outcome.' },
    { role: 'Executive Team', color: '#FF3E7F', owns: 'Strategy and resourcing', pmmRelationship: 'PMM is the strategic narrator for the company. Exec team needs PMM\'s market view.', alignmentMoves: ['Monthly market briefing to leadership', 'Quarterly category positioning review', 'Bring competitive intel to board meetings', 'Own the company narrative arc'], friction: 'Exec team wants growth at all costs. PMM knows positioning shifts take time. Resolve by setting messaging maturity milestones, not just revenue targets.' },
  ];

  const principles = [
    { num: '01', title: 'Customer Obsession First', body: "Every GTM decision starts with the customer. Not the product, not the roadmap, not the CEO's opinion." },
    { num: '02', title: 'Clarity Over Cleverness', body: 'A clear message a 10-year-old understands will always outperform a clever tagline that requires explanation.' },
    { num: '03', title: 'Alignment Is the Strategy', body: 'The best positioning in the world fails without cross-functional alignment. Be the connective tissue.' },
    { num: '04', title: 'Measure to Learn, Not to Report', body: "If a metric isn't changing your behavior, it's not worth tracking." },
    { num: '05', title: 'Iterate Relentlessly', body: 'No GTM strategy survives first contact with the market unchanged. Every launch is a learning experiment.' },
  ];

  // ============ SKILLS LIBRARY ============
  const skills = [
    { id: 'icp-builder', icon: Compass, title: 'ICP Builder', tagline: 'Turn research into a sharp Ideal Customer Profile', color: '#FF5C39', element: 'ICP & Personas',
      input: 'Customer interviews, closed-won/lost data, sales intuition',
      output: 'A structured ICP doc with firmographics, technographics, disqualifiers, and confidence calibration',
      whenToUse: 'Pre-launch planning, refining ICP after a year of selling, diagnosing weak pipeline' },
    { id: 'persona-generator', icon: Users, title: 'Persona Generator', tagline: 'Synthesize interviews into actionable personas', color: '#7B5CFF', element: 'ICP & Personas',
      input: '5+ customer interview notes or transcripts',
      output: 'A structured B2B persona with goals, pains in their own words, channels, and a quote bank',
      whenToUse: 'After completing customer research, before writing copy, when building multi-persona GTM motions' },
    { id: 'messaging-house', icon: Megaphone, title: 'Messaging House', tagline: 'Build promise + 3 pillars + proof points', color: '#00B86B', element: 'Positioning & Messaging',
      input: 'Positioning statement, persona, top 3 alternatives, customer outcomes',
      output: 'A complete messaging architecture with persona and channel variations, plus a test plan',
      whenToUse: 'Pre-launch messaging development, annual refresh, when sales and marketing diverge' },
    { id: 'battlecard-builder', icon: Swords, title: 'Battlecard Builder', tagline: 'Segment-specific competitive battlecards', color: '#FFB627', element: 'Sales Enablement',
      input: 'Closed-lost data, Gong call snippets, competitor public materials',
      output: 'A battlecard with wedges, honest gaps, objection handlers, and trap questions',
      whenToUse: 'Pre-launch, after a string of losses, segment expansion, quarterly refresh' },
    { id: 'launch-brief', icon: Rocket, title: 'Launch Brief Writer', tagline: 'One-page cross-functional alignment doc', color: '#FF3E7F', element: 'Cross-Functional',
      input: 'Product details, launch tier, target persona, business case',
      output: 'A complete launch brief with RACI, metrics, pre-mortem, and key dates',
      whenToUse: 'T-8 weeks before any tiered launch, when cross-functional team is misaligned' },
    { id: 'sales-deck', icon: Presentation, title: 'Sales Deck Drafter', tagline: '10-slide narrative-led pitch deck', color: '#7B5CFF', element: 'Sales Enablement',
      input: 'Positioning, persona, top customer logos, outcomes with metrics',
      output: 'A 10-slide deck following the proven "story-led selling" arc with speaker notes',
      whenToUse: 'New launch, positioning shift, segment-specific deck needs, weak current pitch' },
    { id: 'win-loss-interview', icon: Mic, title: 'Win/Loss Interviewer', tagline: 'Structured post-deal analysis', color: '#00B86B', element: 'Cross-Functional',
      input: 'List of recent closed-won and closed-lost deals, customer contacts',
      output: 'Interview questionnaires, recruitment templates, synthesis framework, and action recs',
      whenToUse: 'T+30 post-launch, quarterly as a standing program, after losses to specific competitor' },
    { id: 'gtm-motion-diagnostic', icon: GitBranch, title: 'GTM Motion Diagnostic', tagline: 'PLG vs. SLG vs. Hybrid vs. Partner fit', color: '#FF5C39', element: 'GTM Motion',
      input: 'ACV, ICP, sales cycle, current motion, team setup',
      output: 'Motion recommendation, red flags, cross-functional changes needed, 90-day plan',
      whenToUse: 'Pre-launch strategy, current motion not working, after moving up or down market' },
  ];

  const navItems = [
    { id: 'intro', label: 'What is GTM' },
    { id: 'elements', label: '5 Elements' },
    { id: 'motions', label: 'Motions' },
    { id: 'alignment', label: 'Alignment' },
    { id: 'toolkit', label: 'Toolkit' },
    { id: 'skills', label: 'Skills' },
    { id: 'dosdonts', label: "Do's & Don'ts" },
    { id: 'metrics', label: 'Metrics' },
    { id: 'checklist', label: 'Checklist' },
    { id: 'manifesto', label: 'Manifesto' },
  ];

  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <div className="min-h-screen bg-[#FFFAF0] text-[#1A1A1A]" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800;9..144,900&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; letter-spacing: -0.02em; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease-out forwards; }
        .text-outline { -webkit-text-stroke: 2px #1A1A1A; color: #FFFAF0; }
        @keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-inner { display: inline-flex; animation: marquee-scroll 40s linear infinite; white-space: nowrap; }
        .neo-shadow { box-shadow: 8px 8px 0px 0px #1A1A1A; }
        .neo-card { transition: all 0.15s ease; box-shadow: 0px 0px 0px 0px #1A1A1A; }
        .neo-card:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0px 0px #1A1A1A; }
      `}</style>

      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-[#FFFAF0] border-b-2 border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#FF5C39] rounded-lg flex items-center justify-center font-display font-black text-white text-lg">G</div>
            <span className="font-display font-black text-xl">GTM Mastery</span>
          </div>
          <div className="hidden xl:flex items-center gap-1 text-sm font-semibold">
            {navItems.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="px-3 py-2 rounded-lg hover:bg-[#1A1A1A] hover:text-[#FFFAF0] transition-colors">
                {n.label}
              </button>
            ))}
          </div>
          <button onClick={() => scrollTo('checklist')} className="bg-[#1A1A1A] text-[#FFFAF0] px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#FF5C39] transition-colors flex-shrink-0">
            Checklist →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-[#1A1A1A]">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF5C39] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#7B5CFF] rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-1/3 w-64 h-64 bg-[#FFB627] rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="px-3 py-1 bg-[#1A1A1A] text-[#FFFAF0] rounded-full text-xs font-bold tracking-wider">PMM ACADEMY</div>
            <div className="text-sm font-medium text-[#1A1A1A]/60">Go-to-Market Series</div>
          </div>
          <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-8">
            Launch products<br/>
            that <span className="italic" style={{ color: '#FF5C39' }}>actually</span><br/>
            <span className="text-outline">win.</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-10 text-[#1A1A1A]/70 leading-relaxed">
            The complete playbook for Product Marketing Managers. Frameworks, tools, do's and don'ts, AI prompts, and the metrics that move the business.
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <button onClick={() => scrollTo('intro')} className="bg-[#1A1A1A] text-[#FFFAF0] px-8 py-4 rounded-full font-semibold hover:bg-[#FF5C39] transition-colors flex items-center gap-2">
              Start Learning <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => scrollTo('checklist')} className="bg-transparent border-2 border-[#1A1A1A] px-8 py-4 rounded-full font-semibold hover:bg-[#1A1A1A] hover:text-[#FFFAF0] transition-colors">
              Jump to Checklist
            </button>
          </div>

          {/* New stats: WHY launches fail, not just THAT they fail */}
          <div className="mb-4 text-xs font-bold tracking-wider opacity-60">WHY MOST LAUNCHES UNDERPERFORM</div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: '50%', label: "of launches don't hit their targets", src: 'McKinsey, 2017' },
              { stat: '45%', label: 'of product launches underperform expectations', src: 'McKinsey, 2023' },
              { stat: '3x', label: 'higher revenue impact with GTM aligned to roadmap', src: 'Gartner, 2023' },
            ].map((s, i) => (
              <div key={i} className="bg-[#1A1A1A] text-[#FFFAF0] p-6 rounded-2xl border-2 border-[#1A1A1A]">
                <div className="font-display font-black text-6xl mb-2" style={{ color: ['#FF5C39','#7B5CFF','#FFB627'][i] }}>{s.stat}</div>
                <div className="text-sm leading-snug mb-2">{s.label}</div>
                <div className="text-xs text-[#FFFAF0]/50">{s.src}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#1A1A1A] text-[#FFFAF0] py-4 overflow-hidden border-b-2 border-[#1A1A1A]">
        <div className="marquee-inner font-display font-black text-3xl">
          {Array(4).fill(0).map((_, idx) => (
            <span key={idx} className="px-6 inline-flex items-center gap-6">
              <span>POSITIONING</span><span className="text-[#FF5C39]">✦</span>
              <span>MESSAGING</span><span className="text-[#FF5C39]">✦</span>
              <span>PRICING</span><span className="text-[#FF5C39]">✦</span>
              <span>CHANNELS</span><span className="text-[#FF5C39]">✦</span>
              <span>ENABLEMENT</span><span className="text-[#FF5C39]">✦</span>
              <span>METRICS</span><span className="text-[#FF5C39]">✦</span>
              <span>ICP</span><span className="text-[#FF5C39]">✦</span>
              <span>LAUNCH</span><span className="text-[#FF5C39]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* MODULE 01 - INTRO */}
      <section id="intro" className="max-w-7xl mx-auto px-6 py-24">
        <ModuleHeader num="01" label="The Foundation" title="What is a GTM Strategy?" subtitle="Not a launch plan. Not a marketing campaign. A complete system." />
        <div className="grid md:grid-cols-2 gap-12 items-start mt-16">
          <div>
            <p className="text-lg leading-relaxed mb-6">A Go-to-Market strategy is the plan an organization uses to bring a product to market, reach its target customers, and achieve a competitive advantage.</p>
            <p className="text-lg leading-relaxed mb-6">It's not just about launch day. A GTM strategy is a living system that defines <strong>who</strong> you're targeting, <strong>what</strong> problem you're solving, <strong>how</strong> you'll reach them, and <strong>why</strong> they should choose you over the competition.</p>
            <p className="text-lg leading-relaxed">For PMMs, GTM is the core craft. Where positioning meets pipeline, messaging meets market reality, and strategy meets execution.</p>
            <button onClick={() => setActiveModal('realgtm')} className="mt-8 inline-flex items-center gap-2 font-semibold border-b-2 border-[#1A1A1A] pb-1 hover:text-[#FF5C39] hover:border-[#FF5C39] transition-colors">
              See real GTM in action <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white border-2 border-[#1A1A1A] rounded-3xl p-8 neo-shadow">
            <div className="font-display font-bold text-2xl mb-2">GTM Strategy vs. Product Launch</div>
            <div className="grid grid-cols-3 gap-3 pb-3 mb-3 border-b-2 border-[#1A1A1A]">
              <div className="text-xs font-bold tracking-wider opacity-50"></div>
              <div className="text-xs font-bold tracking-wider text-[#FF5C39]">GTM STRATEGY</div>
              <div className="text-xs font-bold tracking-wider opacity-50">PRODUCT LAUNCH</div>
            </div>
            <div className="space-y-4">
              {[
                ['Scope', 'Full GTM motion', 'Single release event'],
                ['Duration', 'Ongoing, iterative', 'Point-in-time'],
                ['Owner', 'PMM cross-functional', 'Often PM-led'],
                ['Focus', 'Market fit + revenue', 'Feature availability'],
                ['Metrics', 'Pipeline, win rate, NRR', 'Signups, press'],
              ].map(([label, gtm, launch], i) => (
                <div key={i} className="grid grid-cols-3 gap-3 pb-3 border-b border-[#1A1A1A]/10 last:border-0">
                  <div className="font-bold text-sm">{label}</div>
                  <div className="text-sm text-[#FF5C39] font-medium">{gtm}</div>
                  <div className="text-sm text-[#1A1A1A]/50">{launch}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 02 - ELEMENTS */}
      <section id="elements" className="bg-[#1A1A1A] text-[#FFFAF0] py-24 border-y-2 border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <ModuleHeader num="02" label="The System" title="The 5 Elements of GTM" subtitle="Every successful GTM has these five components working together." dark />
          <div className="grid lg:grid-cols-12 gap-8 mt-16 items-start">
            <div className="lg:col-span-5 space-y-3">
              {elements.map((el, i) => {
                const Icon = el.icon;
                const active = activeElement === i;
                return (
                  <button key={i} onClick={() => setActiveElement(i)} className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${active ? 'border-[#FFFAF0] bg-[#FFFAF0]/5' : 'border-[#FFFAF0]/20 hover:border-[#FFFAF0]/50'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: active ? el.color : 'transparent', border: `2px solid ${el.color}` }}>
                        <Icon className="w-5 h-5" style={{ color: active ? '#1A1A1A' : el.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold tracking-wider opacity-50">{el.number}</div>
                        <div className="font-display font-bold text-xl">{el.title}</div>
                        <div className="text-sm opacity-70">{el.tagline}</div>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform flex-shrink-0 ${active ? 'rotate-90' : ''}`} />
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="lg:col-span-7">
              <div className="bg-[#FFFAF0] text-[#1A1A1A] rounded-3xl p-8 md:p-10 border-2 border-[#FFFAF0]" key={activeElement}>
                <div className="fade-up">
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: elements[activeElement].color, color: '#1A1A1A' }}>
                      ELEMENT {elements[activeElement].number}
                    </div>
                  </div>
                  <h3 className="font-display font-black text-4xl mb-4">{elements[activeElement].title}</h3>
                  <p className="text-lg mb-6 leading-relaxed">{elements[activeElement].detail}</p>

                  {/* Comparison table */}
                  <div className="bg-[#FFFAF0] border-2 border-[#1A1A1A] rounded-2xl p-5 mb-6">
                    <div className="font-display font-bold text-lg mb-3">{elements[activeElement].compare.title}</div>
                    <div className="grid grid-cols-3 gap-2 pb-2 mb-2 border-b-2 border-[#1A1A1A]">
                      <div className="text-xs font-bold tracking-wider opacity-50"></div>
                      <div className="text-xs font-bold tracking-wider" style={{ color: elements[activeElement].color }}>{elements[activeElement].compare.leftLabel}</div>
                      <div className="text-xs font-bold tracking-wider opacity-50">{elements[activeElement].compare.rightLabel}</div>
                    </div>
                    {elements[activeElement].compare.rows.map((row, ri) => (
                      <div key={ri} className="grid grid-cols-3 gap-2 py-2 border-b border-[#1A1A1A]/10 last:border-0">
                        <div className="text-xs font-bold">{row[0]}</div>
                        <div className="text-xs font-medium" style={{ color: elements[activeElement].color }}>{row[1]}</div>
                        <div className="text-xs opacity-60">{row[2]}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <div className="font-bold mb-3 text-sm tracking-wider opacity-60">KEY TIPS</div>
                    <ul className="space-y-2">
                      {elements[activeElement].tips.map((tip, ti) => (
                        <li key={ti} className="flex gap-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: elements[activeElement].color }}>
                            <Check className="w-3 h-3 text-[#1A1A1A]" strokeWidth={3} />
                          </div>
                          <span className="text-sm leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#1A1A1A] text-[#FFFAF0] rounded-2xl p-5 mb-6">
                    <div className="text-xs font-bold tracking-wider opacity-50 mb-2">REAL EXAMPLE</div>
                    <p className="text-sm">{elements[activeElement].example}</p>
                  </div>

                  {/* Drill-down button */}
                  <button onClick={() => setActiveModal({ type: 'element', element: elements[activeElement] })} className="w-full bg-[#1A1A1A] text-[#FFFAF0] rounded-2xl p-4 flex items-center justify-between hover:bg-[#FF5C39] transition-colors">
                    <div className="flex items-center gap-3">
                      <Layers className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">Deep dive: templates, interviews, AI prompts</div>
                        <div className="text-xs opacity-60">Everything you need to execute this element</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 03 - MOTIONS */}
      <section id="motions" className="max-w-7xl mx-auto px-6 py-24">
        <ModuleHeader num="03" label="The Strategic Choice" title="GTM Motions" subtitle="Choosing the right motion is the most strategic decision in GTM. It shapes everything else." />
        <div className="flex flex-wrap gap-2 mt-12 mb-8">
          {Object.keys(motions).map(m => (
            <button key={m} onClick={() => setActiveMotion(m)} className={`px-6 py-3 rounded-full font-semibold transition-all border-2 ${activeMotion === m ? 'bg-[#1A1A1A] text-[#FFFAF0] border-[#1A1A1A]' : 'bg-transparent border-[#1A1A1A]/20 hover:border-[#1A1A1A]'}`}>
              {m}
            </button>
          ))}
        </div>
        <div key={activeMotion} className="fade-up bg-white border-2 border-[#1A1A1A] rounded-3xl overflow-hidden neo-shadow">
          <div className="p-8 md:p-12" style={{ backgroundColor: motions[activeMotion].color }}>
            <div className="flex items-baseline justify-between flex-wrap gap-4">
              <div>
                <div className="text-sm font-bold opacity-70 mb-2">{activeMotion}</div>
                <h3 className="font-display font-black text-5xl md:text-6xl">{motions[activeMotion].name}</h3>
              </div>
              <div className="bg-[#1A1A1A] text-[#FFFAF0] px-5 py-2 rounded-full font-mono text-sm">{motions[activeMotion].acv}</div>
            </div>
            <p className="text-lg mt-6 max-w-3xl">{motions[activeMotion].summary}</p>
          </div>
          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-bold tracking-wider opacity-50 mb-3">EXAMPLES</div>
              <p className="text-lg mb-6">{motions[activeMotion].examples}</p>
              <div className="text-xs font-bold tracking-wider opacity-50 mb-3">CASE STUDY</div>
              <div className="bg-[#FFFAF0] p-4 rounded-xl border border-[#1A1A1A]/10 mb-6">
                <p className="text-sm leading-relaxed">{motions[activeMotion].realExample}</p>
              </div>
              <div className="text-xs font-bold tracking-wider opacity-50 mb-3">THE PMM'S ROLE</div>
              <p className="text-sm leading-relaxed mb-6">{motions[activeMotion].pmmRole}</p>
              <div className="bg-[#1A1A1A] text-[#FFFAF0] p-4 rounded-xl">
                <div className="text-xs font-bold tracking-wider opacity-50 mb-2">HOW TO ALIGN ACROSS DEPARTMENTS</div>
                <p className="text-sm leading-relaxed">{motions[activeMotion].alignment}</p>
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <div className="text-xs font-bold tracking-wider mb-3 text-[#00B86B]">STRENGTHS</div>
                <ul className="space-y-2">
                  {motions[activeMotion].strengths.map((s, i) => (
                    <li key={i} className="flex gap-2 text-sm"><Check className="w-4 h-4 text-[#00B86B] flex-shrink-0 mt-0.5" strokeWidth={3} />{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-bold tracking-wider mb-3 text-[#FF3E7F]">CHALLENGES</div>
                <ul className="space-y-2">
                  {motions[activeMotion].challenges.map((c, i) => (
                    <li key={i} className="flex gap-2 text-sm"><X className="w-4 h-4 text-[#FF3E7F] flex-shrink-0 mt-0.5" strokeWidth={3} />{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 04 - CROSS-FUNCTIONAL ALIGNMENT (new) */}
      <section id="alignment" className="bg-[#7B5CFF] text-[#FFFAF0] py-24 border-y-2 border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <ModuleHeader num="04" label="The Hardest Part" title="Cross-Functional Alignment" subtitle="The best PMMs are the connective tissue. Here's how to align every function around your GTM." dark />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
            {alignmentRoles.map((r, i) => (
              <div key={i} className="bg-[#1A1A1A] border-2 border-[#1A1A1A] rounded-3xl p-6 flex flex-col">
                <div className="px-3 py-1 inline-block rounded-full text-xs font-bold mb-4 self-start" style={{ backgroundColor: r.color, color: '#1A1A1A' }}>{r.role}</div>
                <div className="text-xs font-bold tracking-wider opacity-50 mb-1">THEY OWN</div>
                <div className="font-display font-bold text-lg mb-4">{r.owns}</div>
                <div className="text-xs font-bold tracking-wider opacity-50 mb-1">THE PMM RELATIONSHIP</div>
                <p className="text-sm mb-4 opacity-80">{r.pmmRelationship}</p>
                <div className="text-xs font-bold tracking-wider opacity-50 mb-2">ALIGNMENT MOVES</div>
                <ul className="space-y-1 mb-4">
                  {r.alignmentMoves.map((m, mi) => (
                    <li key={mi} className="flex gap-2 text-xs"><Check className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: r.color }} strokeWidth={3} />{m}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-4 border-t border-[#FFFAF0]/10">
                  <div className="text-xs font-bold tracking-wider opacity-50 mb-1">WHERE FRICTION SHOWS UP</div>
                  <p className="text-xs opacity-70">{r.friction}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-[#1A1A1A] rounded-3xl p-8 border-2 border-[#1A1A1A]">
            <div className="font-display font-black text-2xl mb-3">The PMM's secret weapon: the GTM operating cadence</div>
            <p className="opacity-80 mb-6">Alignment is not a one-time meeting. It's a ritual. The best PMMs run a weekly GTM sync (60 min), a monthly market briefing (30 min), and a quarterly category review (half day). Show up consistently and you become the room where decisions get made.</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#FFFAF0]/5 rounded-2xl p-5">
                <div className="text-xs font-bold tracking-wider opacity-50 mb-2">WEEKLY</div>
                <div className="font-display font-bold text-lg mb-2">GTM Sync</div>
                <p className="text-sm opacity-70">60 min. PM, Sales lead, CS lead, Marketing lead. Status on active launches, blockers, decisions needed.</p>
              </div>
              <div className="bg-[#FFFAF0]/5 rounded-2xl p-5">
                <div className="text-xs font-bold tracking-wider opacity-50 mb-2">MONTHLY</div>
                <div className="font-display font-bold text-lg mb-2">Market Briefing</div>
                <p className="text-sm opacity-70">30 min to leadership. Competitive moves, win/loss patterns, customer signals, recommended shifts.</p>
              </div>
              <div className="bg-[#FFFAF0]/5 rounded-2xl p-5">
                <div className="text-xs font-bold tracking-wider opacity-50 mb-2">QUARTERLY</div>
                <div className="font-display font-bold text-lg mb-2">Category Review</div>
                <p className="text-sm opacity-70">Half day. Revisit positioning, ICP, motion fit. The strategic reset that keeps the whole company aligned.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 05 - TOOLKIT */}
      <section id="toolkit" className="bg-[#FFB627] py-24 border-y-2 border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <ModuleHeader num="05" label="The Stack" title="The GTM Toolkit" subtitle="Filter, search, and click any tool to see exactly how PMMs get the most out of it." />
          <div className="mt-12 bg-[#FFFAF0] border-2 border-[#1A1A1A] rounded-3xl p-6 md:p-8">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 pointer-events-none" />
                <input type="text" placeholder="Search tools..." value={toolSearch} onChange={e => setToolSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 border-2 border-[#1A1A1A] rounded-full focus:outline-none font-medium bg-white" />
              </div>
            </div>
            <div className="mb-4">
              <div className="text-xs font-bold tracking-wider opacity-50 mb-2">CATEGORY</div>
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button key={c} onClick={() => setToolFilter(c)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border-2 ${toolFilter === c ? 'bg-[#1A1A1A] text-[#FFFAF0] border-[#1A1A1A]' : 'border-[#1A1A1A]/20 hover:border-[#1A1A1A] bg-white'}`}>{c}</button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <div className="text-xs font-bold tracking-wider opacity-50 mb-2">TIER</div>
              <div className="flex flex-wrap gap-2">
                {tiers.map(t => (
                  <button key={t} onClick={() => setToolTierFilter(t)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border-2 ${toolTierFilter === t ? 'bg-[#1A1A1A] text-[#FFFAF0] border-[#1A1A1A]' : 'border-[#1A1A1A]/20 hover:border-[#1A1A1A] bg-white'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#1A1A1A] text-[#FFFAF0] rounded-2xl mb-6">
              <div>
                <div className="text-xs opacity-50 font-bold tracking-wider">SHOWING</div>
                <div className="font-display font-black text-2xl">{filteredTools.length} tools</div>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-50 font-bold tracking-wider">EST. MONTHLY COST</div>
                <div className="font-display font-black text-2xl text-[#FFB627]">${totalCost.toLocaleString()}<span className="text-sm opacity-50">/mo</span></div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map(t => (
                <button key={t.name} onClick={() => setActiveModal({ type: 'tool', tool: t })} className="neo-card text-left border-2 border-[#1A1A1A] rounded-2xl p-5 bg-white hover:bg-[#FFB627]/20">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <div className="font-display font-black text-xl">{t.name}</div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${t.tier === 'Essential' ? 'bg-[#00B86B] text-[#1A1A1A]' : 'bg-[#7B5CFF] text-[#FFFAF0]'}`}>{t.tier}</span>
                  </div>
                  <div className="text-xs font-semibold text-[#FF5C39] mb-2">{t.category}</div>
                  <p className="text-sm mb-4 text-[#1A1A1A]/70 leading-snug">{t.desc}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#1A1A1A]/10">
                    <div className="text-xs opacity-60">{t.stat}</div>
                    <div className="text-xs font-mono">~${t.cost}/mo</div>
                  </div>
                </button>
              ))}
            </div>
            {filteredTools.length === 0 && (
              <div className="text-center py-12 opacity-50">No tools match your filters. Try broadening the search.</div>
            )}
            <button onClick={() => setActiveModal('toolkit-tip')} className="mt-8 inline-flex items-center gap-2 font-semibold border-b-2 border-[#1A1A1A] pb-1 hover:text-[#FF5C39] hover:border-[#FF5C39]">
              PMM pro tip: where to start <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* MODULE 06 - SKILLS LIBRARY */}
      <section id="skills" className="bg-[#1A1A1A] text-[#FFFAF0] py-24 border-y-2 border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <ModuleHeader num="06" label="AI-Powered Workflows" title="Skills Library" subtitle="Eight Claude Skills that turn this playbook into repeatable AI workflows. Install once, run forever." dark />

          {/* Bulk download card */}
          <div className="mt-12 bg-gradient-to-br from-[#7B5CFF] to-[#FF5C39] rounded-3xl p-8 md:p-10 border-2 border-[#FFFAF0]">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-6 h-6" />
                  <div className="font-mono text-xs font-bold tracking-widest">BUNDLE</div>
                </div>
                <h3 className="font-display font-black text-3xl mb-3">Get all 8 skills as a bundle</h3>
                <p className="text-base mb-1 opacity-90">Download once. Drop into Claude.ai Projects or Claude Code. Triggers automatically when you describe a relevant task.</p>
              </div>
              <div className="md:text-right">
                <a href="/skills/pmm-gtm-skills-bundle.zip" download className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#FFFAF0] px-6 py-4 rounded-full font-semibold hover:bg-[#FFFAF0] hover:text-[#1A1A1A] transition-colors">
                  <Download className="w-4 h-4" />
                  Download all (.zip)
                </a>
              </div>
            </div>
          </div>

          {/* Skills grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {skills.map((s) => {
              const Icon = s.icon;
              return (
                <button key={s.id} onClick={() => setActiveModal({ type: 'skill', skill: s })} className="text-left bg-[#FFFAF0]/5 border-2 border-[#FFFAF0]/10 rounded-2xl p-5 hover:bg-[#FFFAF0]/10 hover:border-[#FFFAF0]/30 transition-all flex flex-col">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: s.color }}>
                    <Icon className="w-6 h-6 text-[#1A1A1A]" />
                  </div>
                  <div className="text-xs font-bold tracking-wider mb-1" style={{ color: s.color }}>{s.element.toUpperCase()}</div>
                  <div className="font-display font-black text-xl mb-2">{s.title}</div>
                  <p className="text-sm opacity-70 leading-snug mb-4 flex-1">{s.tagline}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold mt-auto pt-3 border-t border-[#FFFAF0]/10">
                    Preview & download <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* How to use callout */}
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            <div className="bg-[#FFFAF0]/5 rounded-2xl p-5 border-2 border-[#FFFAF0]/10">
              <div className="text-xs font-bold tracking-wider text-[#FFB627] mb-2">STEP 1</div>
              <div className="font-display font-bold text-lg mb-2">Download</div>
              <p className="text-sm opacity-70">Grab the bundle above or download individual skills you want.</p>
            </div>
            <div className="bg-[#FFFAF0]/5 rounded-2xl p-5 border-2 border-[#FFFAF0]/10">
              <div className="text-xs font-bold tracking-wider text-[#FFB627] mb-2">STEP 2</div>
              <div className="font-display font-bold text-lg mb-2">Install in Claude</div>
              <p className="text-sm opacity-70">Upload to a Claude.ai Project, or drop into ~/.claude/skills/ for Claude Code.</p>
            </div>
            <div className="bg-[#FFFAF0]/5 rounded-2xl p-5 border-2 border-[#FFFAF0]/10">
              <div className="text-xs font-bold tracking-wider text-[#FFB627] mb-2">STEP 3</div>
              <div className="font-display font-bold text-lg mb-2">Describe your task</div>
              <p className="text-sm opacity-70">Skills trigger automatically. Say "build me an ICP" or "draft a launch brief" and Claude takes it from there.</p>
            </div>
          </div>
        </div>
      </section>


      {/* MODULE 07 - DO'S & DON'TS */}
      <section id="dosdonts" className="max-w-7xl mx-auto px-6 py-24">
        <ModuleHeader num="07" label="Hard-Won Wisdom" title="Do's & Don'ts" subtitle="Click any card for the deeper story and the lesson behind it." />
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#00B86B] flex items-center justify-center"><Check className="w-5 h-5 text-[#1A1A1A]" strokeWidth={3} /></div>
              <h3 className="font-display font-black text-3xl">Execute these</h3>
            </div>
            <div className="space-y-3">
              {dos.map((d, i) => <DosDontsCard key={i} item={d} onClick={() => setActiveModal({ type: 'do', item: d })} />)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#FF3E7F] flex items-center justify-center"><X className="w-5 h-5 text-[#FFFAF0]" strokeWidth={3} /></div>
              <h3 className="font-display font-black text-3xl">Avoid these</h3>
            </div>
            <div className="space-y-3">
              {donts.map((d, i) => <DosDontsCard key={i} item={d} onClick={() => setActiveModal({ type: 'dont', item: d })} />)}
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 09 - METRICS */}
      <section id="metrics" className="bg-[#1A1A1A] text-[#FFFAF0] py-24 border-y-2 border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <ModuleHeader num="09" label="What Counts" title="Metrics That Matter" subtitle="Measure what moves the business, not what looks good in a deck." dark />
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { phase: 'Pre-Launch', timing: 'T-8 to T-0', color: '#FFB627', metrics: [['ICP Definition Score', 'Are you targeting the right buyers?'],['Message Resonance %', 'Wynter test score >70% = green light'],['Sales Enablement Readiness', '% of reps certified on messaging'],['Launch Checklist Completion', '100% = launch-ready']] },
              { phase: 'Launch', timing: 'T-0 to T+7', color: '#FF5C39', metrics: [['Pipeline Generated', 'New qualified opportunities created'],['Demo Requests', 'High-intent signals from the market'],['Sales Cycle Velocity', 'Days from first touch to close'],['Activation Rate', '% of new signups reaching aha moment']] },
              { phase: 'Post-Launch', timing: 'T+30 to T+180', color: '#00B86B', metrics: [['Win Rate', 'Closed-won / total opportunities'],['Customer NPS / CSAT', 'Are customers actually getting value?'],['Net Revenue Retention', 'The truest measure of GTM health'],['CAC Payback Period', 'Months to recover acquisition cost']] },
            ].map((p, i) => (
              <div key={i} className="bg-[#FFFAF0]/5 border-2 border-[#FFFAF0]/10 rounded-2xl p-6">
                <div className="px-3 py-1 inline-block rounded-full text-xs font-bold mb-3" style={{ backgroundColor: p.color, color: '#1A1A1A' }}>{p.phase}</div>
                <div className="text-xs opacity-50 font-mono mb-4">{p.timing}</div>
                <div className="space-y-3">
                  {p.metrics.map(([n, d], j) => (
                    <div key={j} className="pb-3 border-b border-[#FFFAF0]/10 last:border-0">
                      <div className="font-semibold text-sm">{n}</div>
                      <div className="text-xs opacity-60 mt-0.5">{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 bg-[#FFFAF0]/5 rounded-3xl p-6 md:p-8 border-2 border-[#FFFAF0]/10">
            <h4 className="font-display font-black text-2xl md:text-3xl mb-2">Impact: Without vs. With a Structured GTM</h4>
            <p className="text-sm opacity-60 mb-2">Industry benchmarks comparing teams without a defined GTM system vs. teams running this playbook.</p>
            <p className="text-xs opacity-50 mb-8 font-mono">Sources: Forrester (2024), Gong (2024), OpenView PLG benchmarks (2024)</p>
            <div className="space-y-8">
              {[
                { name: 'Win Rate', without: 18, with: 32, unit: '%', max: 100, context: 'A 14-point lift means almost doubling closed-won deals from the same pipeline.' },
                { name: 'Sales Cycle', without: 95, with: 58, unit: ' days', max: 120, invert: true, context: '37 days faster means more deals per rep per year, same headcount.' },
                { name: 'Pipeline Coverage', without: 2.1, with: 3.8, unit: 'x', max: 5, context: 'Coverage ratio above 3x is the threshold most boards expect for predictable revenue.' },
                { name: 'Activation Rate', without: 24, with: 51, unit: '%', max: 100, context: 'Activation drives every downstream metric: retention, expansion, advocacy.' },
                { name: 'Net Revenue Retention', without: 95, with: 118, unit: '%', max: 150, context: 'NRR above 110% means you grow even if you stop acquiring new logos.' },
              ].map((m, i) => {
                const delta = m.invert ? `${Math.round(((m.without - m.with) / m.without) * 100)}% faster` : `+${Math.round(((m.with - m.without) / m.without) * 100)}%`;
                const positive = m.invert ? m.with < m.without : m.with > m.without;
                return (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-semibold">{m.name}</span>
                      <span className="text-sm font-bold" style={{ color: positive ? '#00B86B' : '#FF3E7F' }}>{delta}</span>
                    </div>
                    <div className="space-y-2 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-20 text-xs opacity-60 flex-shrink-0">Without</div>
                        <div className="flex-1 h-7 bg-[#FFFAF0]/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#FF3E7F] rounded-full flex items-center justify-end pr-3 transition-all" style={{ width: `${Math.min((m.without / m.max) * 100, 100)}%` }}>
                            <span className="text-xs font-bold">{m.without}{m.unit}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 text-xs opacity-60 flex-shrink-0">With GTM</div>
                        <div className="flex-1 h-7 bg-[#FFFAF0]/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#00B86B] rounded-full flex items-center justify-end pr-3 transition-all" style={{ width: `${Math.min((m.with / m.max) * 100, 100)}%` }}>
                            <span className="text-xs font-bold text-[#1A1A1A]">{m.with}{m.unit}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs opacity-60 italic pl-23">{m.context}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 10 - CHECKLIST */}
      <section id="checklist" className="max-w-7xl mx-auto px-6 py-24">
        <ModuleHeader num="10" label="Pre-Flight Routine" title="The GTM Launch Checklist" subtitle="Click any item for an AI prompt you can paste into Claude to personalize it to your launch. Progress saves automatically." />
        <div className="grid lg:grid-cols-12 gap-8 mt-16 items-start">
          <div className="lg:col-span-4">
            <div className="bg-[#1A1A1A] text-[#FFFAF0] rounded-3xl p-8 border-2 border-[#1A1A1A]">
              <div className="text-xs font-bold tracking-wider opacity-50 mb-2">LAUNCH READINESS</div>
              <div className="font-display font-black text-7xl mb-4" style={{ color: progressPct === 100 ? '#00B86B' : '#FF5C39' }}>
                {progressPct}<span className="text-3xl">%</span>
              </div>
              <div className="h-3 bg-[#FFFAF0]/10 rounded-full overflow-hidden mb-3">
                <div className="h-full transition-all duration-500" style={{ width: `${progressPct}%`, backgroundColor: progressPct === 100 ? '#00B86B' : '#FF5C39' }}></div>
              </div>
              <div className="text-sm opacity-60 mb-6">{completedItems} of {totalItems} items complete</div>
              <div className="space-y-2 mb-6">
                {checklist.map((phase, i) => {
                  const phaseItems = phase.items.length;
                  const phaseDone = phase.items.filter((_, j) => checklistState[`${i}-${j}`]).length;
                  return (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.color }}></div>
                        <span className="opacity-80">{phase.phase}</span>
                      </div>
                      <span className="font-mono text-xs opacity-60">{phaseDone}/{phaseItems}</span>
                    </div>
                  );
                })}
              </div>
              {progressPct === 100 && (
                <div className="bg-[#00B86B] text-[#1A1A1A] p-4 rounded-2xl mb-4 fade-up">
                  <div className="font-display font-black text-xl mb-1">🚀 Launch ready!</div>
                  <div className="text-sm">Every box is checked. Go make it happen.</div>
                </div>
              )}
              <div className="bg-[#FFFAF0]/5 rounded-2xl p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Wand2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#FFB627]" />
                  <div className="text-xs opacity-80 leading-relaxed">Every item has a Claude prompt. Click to expand, copy, paste into a Claude chat with your context, get a draft in 30 seconds.</div>
                </div>
              </div>
              <button onClick={resetChecklist} className="w-full text-xs font-semibold opacity-50 hover:opacity-100 transition-opacity py-2">Reset checklist</button>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-6">
            {checklist.map((phase, i) => (
              <div key={i} className="bg-white border-2 border-[#1A1A1A] rounded-3xl overflow-hidden">
                <div className="px-6 py-4 flex items-center justify-between border-b-2 border-[#1A1A1A]" style={{ backgroundColor: phase.color }}>
                  <div>
                    <div className="font-mono text-xs font-bold opacity-70">{phase.phase}</div>
                    <div className="font-display font-black text-2xl">{phase.title}</div>
                  </div>
                  <div className="font-mono text-sm font-bold">{phase.items.filter((_, j) => checklistState[`${i}-${j}`]).length}/{phase.items.length}</div>
                </div>
                <div className="p-2">
                  {phase.items.map((item, j) => {
                    const id = `${i}-${j}`;
                    const done = checklistState[id];
                    const promptId = `prompt-${i}-${j}`;
                    return (
                      <div key={j} className="rounded-2xl hover:bg-[#FFFAF0] transition-colors">
                        <div className="flex items-start gap-4 p-4">
                          <button onClick={() => toggleCheck(id)} className="flex-shrink-0 mt-0.5">
                            {done ? <CheckCircle2 className="w-6 h-6" style={{ color: phase.color }} strokeWidth={2.5} fill={phase.color} /> : <Circle className="w-6 h-6 opacity-40" strokeWidth={2} />}
                          </button>
                          <div className="flex-1">
                            <span className={`text-base ${done ? 'line-through opacity-50' : ''}`}>{item.text}</span>
                            <button onClick={() => setActiveModal({ type: 'prompt', item, phase })} className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-[#7B5CFF] hover:text-[#FF5C39] transition-colors">
                              <Wand2 className="w-3 h-3" />
                              AI prompt
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="bg-[#FFB627] border-2 border-[#1A1A1A] rounded-3xl p-6 flex items-start gap-4">
              <div className="text-3xl">📌</div>
              <div>
                <div className="font-display font-black text-xl mb-1">Pro tip</div>
                <div className="text-sm">Print this checklist and pin it to your wall for every launch. The items you skip are almost always the ones that come back to bite you.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 11 - MANIFESTO */}
      <section id="manifesto" className="bg-[#1A1A1A] text-[#FFFAF0] py-24 border-t-2 border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <ModuleHeader num="11" label="The Principles" title="Your GTM North Star" subtitle="The principles that guide the best PMMs in the world." dark />
          <div className="grid md:grid-cols-2 gap-4 mt-16">
            {principles.map((p, i) => (
              <div key={i} className="bg-[#FFFAF0]/5 border-2 border-[#FFFAF0]/10 rounded-2xl p-6 hover:bg-[#FFFAF0]/10 transition-colors">
                <div className="font-display font-black text-6xl mb-2" style={{ color: ['#FF5C39','#7B5CFF','#FFB627','#00B86B','#FF3E7F'][i] }}>{p.num}</div>
                <div className="font-display font-black text-2xl mb-3">{p.title}</div>
                <p className="opacity-70 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 p-10 md:p-16 rounded-3xl text-center" style={{ background: 'linear-gradient(135deg, #FF5C39, #FF3E7F, #7B5CFF)' }}>
            <div className="font-display italic text-2xl md:text-4xl lg:text-5xl leading-tight max-w-4xl mx-auto mb-6">
              "The PMM who owns GTM doesn't just launch products. They build the bridge between what the product does and why the market cares. That bridge is everything."
            </div>
            <div className="font-mono text-xs tracking-widest opacity-70">— PMM ACADEMY MANIFESTO</div>
          </div>
          <div className="text-center mt-16 pt-12 border-t border-[#FFFAF0]/10">
            <div className="font-display font-black text-lg mb-2">© 2026 PMM Academy</div>
            <div className="text-sm opacity-50">GTM Mastery Series — Built for PMMs who want to win</div>
          </div>
        </div>
      </section>

      {/* MODALS */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 bg-[#1A1A1A]/70 backdrop-blur-sm" onClick={() => setActiveModal(null)}>
          <div className="bg-[#FFFAF0] border-2 border-[#1A1A1A] rounded-t-3xl md:rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto fade-up" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#FFFAF0] border-b-2 border-[#1A1A1A] px-6 py-4 flex items-center justify-between z-10">
              <div className="font-display font-black text-lg">
                {activeModal === 'realgtm' && 'GTM in the Wild'}
                {activeModal === 'toolkit-tip' && 'PMM Pro Tip'}
                {typeof activeModal === 'object' && activeModal?.type === 'do' && '✓ Do this'}
                {typeof activeModal === 'object' && activeModal?.type === 'dont' && '✗ Avoid this'}
                {typeof activeModal === 'object' && activeModal?.type === 'element' && `Deep Dive: ${activeModal.element.title}`}
                {typeof activeModal === 'object' && activeModal?.type === 'tool' && `${activeModal.tool.name} — How PMMs use it`}
                {typeof activeModal === 'object' && activeModal?.type === 'prompt' && 'AI Prompt'}
                {typeof activeModal === 'object' && activeModal?.type === 'skill' && `Skill: ${activeModal.skill.title}`}
              </div>
              <button onClick={() => setActiveModal(null)} className="w-9 h-9 rounded-full bg-[#1A1A1A] text-[#FFFAF0] flex items-center justify-center hover:bg-[#FF5C39] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 md:p-8">
              {activeModal === 'realgtm' && (
                <div className="space-y-5">
                  {[
                    { name: 'Slack', motion: 'PLG motion', body: 'Free tier into viral adoption into enterprise sales. Result: $1B+ ARR in 7 years.' },
                    { name: 'Figma', motion: 'PLG + community focus', body: 'Positioned as "the browser-based design tool." Result: $10B valuation in 2022.' },
                    { name: 'HubSpot', motion: 'Hybrid motion', body: 'Inbound marketing + sales. Free CRM tier drove 500K+ signups. Result: $1.5B+ market cap.' },
                  ].map((c, i) => (
                    <div key={i} className="border-l-4 pl-4" style={{ borderColor: ['#FF5C39','#7B5CFF','#FFB627'][i] }}>
                      <div className="font-display font-black text-2xl text-[#1A1A1A]">{c.name}</div>
                      <div className="text-xs font-bold tracking-wider mb-2" style={{ color: ['#FF5C39','#7B5CFF','#FFB627'][i] }}>{c.motion}</div>
                      <p className="text-sm leading-relaxed text-[#1A1A1A]">{c.body}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeModal === 'toolkit-tip' && (
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-[#1A1A1A]">Don't try to use all these tools at once. Start with three that cover the highest-leverage parts of the job:</p>
                  <ul className="space-y-2">
                    <li className="flex gap-3"><span className="font-bold w-24 text-[#1A1A1A]">Dovetail</span><span className="text-sm text-[#1A1A1A]/70">customer research</span></li>
                    <li className="flex gap-3"><span className="font-bold w-24 text-[#1A1A1A]">Wynter</span><span className="text-sm text-[#1A1A1A]/70">message testing</span></li>
                    <li className="flex gap-3"><span className="font-bold w-24 text-[#1A1A1A]">Gong</span><span className="text-sm text-[#1A1A1A]/70">sales intelligence</span></li>
                  </ul>
                  <p className="text-sm leading-relaxed text-[#1A1A1A]">These three alone will transform your GTM quality. Add others as your team scales.</p>
                  <div className="bg-[#1A1A1A] text-[#FFFAF0] p-4 rounded-xl mt-4">
                    <div className="text-xs font-bold tracking-wider text-[#FFB627] mb-1">INVESTMENT</div>
                    <div className="font-display font-black text-xl">~$500 to $1K/month</div>
                    <div className="text-sm text-[#FFFAF0]/80">for the essential stack. ROI: 10x+ if you actually use them.</div>
                  </div>
                </div>
              )}
              {typeof activeModal === 'object' && activeModal?.type === 'do' && (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00B86B] text-[#1A1A1A] font-bold text-xs tracking-wider mb-5">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    DO THIS
                  </div>
                  <h3 className="font-display font-black text-3xl mb-5 text-[#1A1A1A] leading-tight">{activeModal.item.title}</h3>
                  <p className="text-lg leading-relaxed mb-6 text-[#1A1A1A] font-medium">{activeModal.item.body}</p>
                  <div className="bg-[#00B86B] text-[#1A1A1A] p-5 rounded-2xl border-2 border-[#1A1A1A]">
                    <div className="text-xs font-black tracking-widest mb-2">REAL EXAMPLE</div>
                    <p className="text-base leading-relaxed font-medium">{activeModal.item.proof}</p>
                  </div>
                </div>
              )}
              {typeof activeModal === 'object' && activeModal?.type === 'dont' && (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF3E7F] text-[#FFFAF0] font-bold text-xs tracking-wider mb-5">
                    <X className="w-3.5 h-3.5" strokeWidth={3} />
                    AVOID THIS
                  </div>
                  <h3 className="font-display font-black text-3xl mb-5 text-[#1A1A1A] leading-tight">{activeModal.item.title}</h3>
                  <p className="text-lg leading-relaxed mb-6 text-[#1A1A1A] font-medium">{activeModal.item.body}</p>
                  <div className="bg-[#FF3E7F] text-[#FFFAF0] p-5 rounded-2xl border-2 border-[#1A1A1A]">
                    <div className="text-xs font-black tracking-widest mb-2">WHAT HAPPENS WHEN YOU DON'T</div>
                    <p className="text-base leading-relaxed font-medium">{activeModal.item.proof}</p>
                  </div>
                </div>
              )}
              {typeof activeModal === 'object' && activeModal?.type === 'tool' && (
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeModal.tool.tier === 'Essential' ? 'bg-[#00B86B] text-[#1A1A1A]' : 'bg-[#7B5CFF] text-[#FFFAF0]'}`}>{activeModal.tool.tier}</span>
                      <span className="text-xs font-semibold text-[#FF5C39]">{activeModal.tool.category}</span>
                    </div>
                    <p className="text-base text-[#1A1A1A]">{activeModal.tool.desc}</p>
                  </div>
                  <div className="bg-[#1A1A1A] text-[#FFFAF0] p-5 rounded-2xl">
                    <div className="text-xs font-bold tracking-wider text-[#FFB627] mb-2">HOW PMMs GET THE MOST OUT OF IT</div>
                    <p className="text-sm leading-relaxed">{activeModal.tool.howTo}</p>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFB627] p-4 rounded-2xl border-2 border-[#1A1A1A]">
                    <div>
                      <div className="text-xs font-bold tracking-wider text-[#1A1A1A]">EST. COST</div>
                      <div className="font-display font-black text-xl">${activeModal.tool.cost}/mo</div>
                    </div>
                    <a href={activeModal.tool.url} target="_blank" rel="noopener noreferrer" className="bg-[#1A1A1A] text-[#FFFAF0] px-4 py-2 rounded-full font-semibold text-sm hover:bg-[#FF5C39] transition-colors inline-flex items-center gap-2">
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
              {typeof activeModal === 'object' && activeModal?.type === 'element' && (
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-bold tracking-wider mb-2" style={{ color: activeModal.element.color }}>ELEMENT {activeModal.element.number}</div>
                    <h3 className="font-display font-black text-3xl mb-3">{activeModal.element.title}</h3>
                  </div>

                  {/* Template */}
                  <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-5 h-5" style={{ color: activeModal.element.color }} />
                      <div className="font-display font-bold text-lg">{activeModal.element.template.title}</div>
                    </div>
                    <p className="text-sm mb-4 text-[#1A1A1A]/80">{activeModal.element.template.intro}</p>
                    <div className="space-y-4">
                      {activeModal.element.template.sections.map((s, si) => (
                        <div key={si}>
                          <div className="text-xs font-bold tracking-wider mb-2" style={{ color: activeModal.element.color }}>{s.name}</div>
                          <ul className="space-y-1">
                            {s.items.map((it, ii) => (
                              <li key={ii} className="text-sm pl-3 border-l-2 text-[#1A1A1A]" style={{ borderColor: activeModal.element.color }}>{it}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Where to get data */}
                  <div className="bg-[#1A1A1A] text-[#FFFAF0] p-5 rounded-2xl">
                    <div className="text-xs font-bold tracking-wider text-[#FFB627] mb-2">WHERE TO GET THE DATA</div>
                    <p className="text-sm leading-relaxed">{activeModal.element.sources}</p>
                  </div>

                  {/* AI Prompt */}
                  <div className="border-2 border-[#7B5CFF] rounded-2xl p-5 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Wand2 className="w-5 h-5 text-[#7B5CFF]" />
                        <div className="font-display font-bold text-lg text-[#1A1A1A]">Claude prompt</div>
                      </div>
                      <button onClick={() => copyToClipboard(activeModal.element.prompt, `el-${activeModal.element.number}`)} className="text-xs font-semibold bg-[#7B5CFF] text-white px-3 py-1.5 rounded-full hover:bg-[#FF5C39] transition-colors inline-flex items-center gap-1">
                        <Copy className="w-3 h-3" />
                        {copiedId === `el-${activeModal.element.number}` ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap bg-[#1A1A1A] text-[#FFFAF0] p-4 rounded-lg">{activeModal.element.prompt}</pre>
                  </div>

                  {/* Resources */}
                  <div>
                    <div className="text-xs font-bold tracking-wider text-[#1A1A1A] mb-3">GO DEEPER</div>
                    <div className="space-y-2">
                      {activeModal.element.resources.map((r, ri) => (
                        <a key={ri} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl border-2 border-[#1A1A1A] hover:bg-[#FFB627] transition-colors text-sm font-medium text-[#1A1A1A]">
                          <Link2 className="w-4 h-4 flex-shrink-0" style={{ color: activeModal.element.color }} />
                          <span className="flex-1">{r.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {typeof activeModal === 'object' && activeModal?.type === 'prompt' && (
                <div className="space-y-5">
                  <div>
                    <div className="text-xs font-bold tracking-wider mb-1" style={{ color: activeModal.phase.color }}>{activeModal.phase.phase} · {activeModal.phase.title}</div>
                    <h3 className="font-display font-bold text-xl text-[#1A1A1A]">{activeModal.item.text}</h3>
                  </div>
                  <div className="bg-white border-2 border-[#7B5CFF] rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Wand2 className="w-5 h-5 text-[#7B5CFF]" />
                        <div className="font-display font-bold text-base text-[#1A1A1A]">Paste this into Claude</div>
                      </div>
                      <button onClick={() => copyToClipboard(activeModal.item.prompt, 'checklist-prompt')} className="text-xs font-semibold bg-[#7B5CFF] text-white px-3 py-1.5 rounded-full hover:bg-[#FF5C39] transition-colors inline-flex items-center gap-1">
                        <Copy className="w-3 h-3" />
                        {copiedId === 'checklist-prompt' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap bg-[#1A1A1A] text-[#FFFAF0] p-4 rounded-lg">{activeModal.item.prompt}</pre>
                  </div>
                  <div className="bg-[#FFB627] p-4 rounded-2xl border-2 border-[#1A1A1A]">
                    <div className="text-xs font-bold tracking-wider text-[#1A1A1A] mb-1">HOW TO USE</div>
                    <p className="text-sm text-[#1A1A1A]">Replace the bracketed parts with your real context. The more specific the inputs, the more useful the output. Then iterate with Claude until the draft is launch-ready.</p>
                  </div>
                </div>
              )}
              {typeof activeModal === 'object' && activeModal?.type === 'skill' && (
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: activeModal.skill.color }}>
                      {React.createElement(activeModal.skill.icon, { className: "w-7 h-7 text-[#1A1A1A]" })}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold tracking-wider mb-1" style={{ color: activeModal.skill.color }}>{activeModal.skill.element.toUpperCase()}</div>
                      <h3 className="font-display font-black text-2xl text-[#1A1A1A] mb-1">{activeModal.skill.title}</h3>
                      <p className="text-sm text-[#1A1A1A]/80">{activeModal.skill.tagline}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-4">
                      <div className="text-xs font-bold tracking-wider mb-2" style={{ color: activeModal.skill.color }}>WHAT YOU PROVIDE</div>
                      <p className="text-sm text-[#1A1A1A] leading-relaxed">{activeModal.skill.input}</p>
                    </div>
                    <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-4">
                      <div className="text-xs font-bold tracking-wider mb-2" style={{ color: activeModal.skill.color }}>WHAT YOU GET</div>
                      <p className="text-sm text-[#1A1A1A] leading-relaxed">{activeModal.skill.output}</p>
                    </div>
                    <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-4">
                      <div className="text-xs font-bold tracking-wider mb-2" style={{ color: activeModal.skill.color }}>WHEN TO USE</div>
                      <p className="text-sm text-[#1A1A1A] leading-relaxed">{activeModal.skill.whenToUse}</p>
                    </div>
                  </div>

                  <div className="bg-[#1A1A1A] text-[#FFFAF0] rounded-2xl p-5">
                    <div className="text-xs font-bold tracking-wider text-[#FFB627] mb-3">QUICK INSTALL</div>
                    <ol className="space-y-2 text-sm">
                      <li className="flex gap-3">
                        <span className="font-mono font-bold text-[#FFB627] flex-shrink-0">1.</span>
                        <span>Download the .md file using the button below</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-mono font-bold text-[#FFB627] flex-shrink-0">2.</span>
                        <span>In Claude.ai: create a Project → add file to Project Knowledge. Or in Claude Code: drop it in <code className="font-mono text-xs bg-[#FFFAF0]/10 px-1 py-0.5 rounded">~/.claude/skills/</code></span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-mono font-bold text-[#FFB627] flex-shrink-0">3.</span>
                        <span>Start a chat with your context (interviews, data, the brief) and Claude triggers the skill automatically</span>
                      </li>
                    </ol>
                  </div>

                  <a href={`/skills/${activeModal.skill.id}.md`} download className="w-full bg-[#1A1A1A] text-[#FFFAF0] rounded-2xl p-4 flex items-center justify-between hover:bg-[#FF5C39] transition-colors">
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">Download {activeModal.skill.id}.md</div>
                        <div className="text-xs opacity-70">Drop into Claude and you're ready to go</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </a>

                  <div className="bg-[#FFB627] p-4 rounded-2xl border-2 border-[#1A1A1A]">
                    <div className="text-xs font-bold tracking-wider text-[#1A1A1A] mb-1">TIP</div>
                    <p className="text-sm text-[#1A1A1A]">Skills work best when you've gathered your raw inputs first. Don't ask the skill to do strategy AND tactical drafting in one shot. Use it for the tactical conversion.</p>
                  </div>
                </div>
              )}
              {typeof activeModal === 'object' && activeModal?.type === 'skill' && (
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: activeModal.skill.color }}>
                        {React.createElement(activeModal.skill.icon, { className: "w-6 h-6 text-[#1A1A1A]" })}
                      </div>
                      <div>
                        <div className="text-xs font-bold tracking-wider" style={{ color: activeModal.skill.color }}>{activeModal.skill.element.toUpperCase()}</div>
                        <h3 className="font-display font-black text-2xl text-[#1A1A1A]">{activeModal.skill.title}</h3>
                      </div>
                    </div>
                    <p className="text-base text-[#1A1A1A] font-medium">{activeModal.skill.tagline}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-4">
                      <div className="text-xs font-bold tracking-wider mb-1" style={{ color: activeModal.skill.color }}>WHAT YOU PUT IN</div>
                      <p className="text-sm text-[#1A1A1A]">{activeModal.skill.input}</p>
                    </div>
                    <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-4">
                      <div className="text-xs font-bold tracking-wider mb-1" style={{ color: activeModal.skill.color }}>WHAT YOU GET OUT</div>
                      <p className="text-sm text-[#1A1A1A]">{activeModal.skill.output}</p>
                    </div>
                    <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-4">
                      <div className="text-xs font-bold tracking-wider mb-1" style={{ color: activeModal.skill.color }}>WHEN TO USE</div>
                      <p className="text-sm text-[#1A1A1A]">{activeModal.skill.whenToUse}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={`/skills/${activeModal.skill.id}.md`} download={`${activeModal.skill.id}.md`} className="flex-1 bg-[#1A1A1A] text-[#FFFAF0] px-5 py-3 rounded-full font-semibold text-center hover:bg-[#FF5C39] transition-colors inline-flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download skill (.md)
                    </a>
                    <a href="/skills/pmm-gtm-skills-bundle.zip" download className="flex-1 bg-[#FFB627] text-[#1A1A1A] border-2 border-[#1A1A1A] px-5 py-3 rounded-full font-semibold text-center hover:bg-[#1A1A1A] hover:text-[#FFFAF0] transition-colors inline-flex items-center justify-center gap-2">
                      <Package className="w-4 h-4" />
                      Get all 8 (.zip)
                    </a>
                  </div>

                  <div>
                    <div className="text-xs font-bold tracking-wider text-[#1A1A1A] mb-2">PREVIEW</div>
                    <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap bg-[#1A1A1A] text-[#FFFAF0] p-4 rounded-lg max-h-96 overflow-y-auto">{skillLoading ? 'Loading...' : (skillContent[activeModal.skill.id] || 'Click download to see the full skill.')}</pre>
                  </div>

                  <div className="bg-[#FFB627] p-4 rounded-2xl border-2 border-[#1A1A1A]">
                    <div className="text-xs font-bold tracking-wider text-[#1A1A1A] mb-1">HOW TO INSTALL</div>
                    <p className="text-sm text-[#1A1A1A] mb-2"><strong>Claude.ai:</strong> Create a Project, upload the .md file to its knowledge.</p>
                    <p className="text-sm text-[#1A1A1A]"><strong>Claude Code:</strong> Put the folder in <code className="bg-[#1A1A1A] text-[#FFFAF0] px-1.5 py-0.5 rounded text-xs">~/.claude/skills/</code></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModuleHeader({ num, label, title, subtitle, dark }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className={`font-mono text-xs font-bold tracking-widest px-3 py-1 rounded-full ${dark ? 'bg-[#FFFAF0]/10' : 'bg-[#1A1A1A] text-[#FFFAF0]'}`}>MODULE {num}</div>
        <div className={`text-xs font-bold tracking-wider ${dark ? 'opacity-50' : 'opacity-40'}`}>{label}</div>
      </div>
      <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-4">{title}</h2>
      <p className={`text-xl max-w-2xl ${dark ? 'opacity-70' : 'opacity-60'}`}>{subtitle}</p>
    </div>
  );
}

function DosDontsCard({ item, onClick }) {
  return (
    <button onClick={onClick} className="neo-card w-full text-left p-5 rounded-2xl border-2 border-[#1A1A1A] bg-white">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="font-display font-bold text-lg leading-snug">{item.title}</div>
        <ChevronRight className="w-5 h-5 flex-shrink-0 opacity-40 mt-1" />
      </div>
      <p className="text-sm opacity-70 leading-relaxed">{item.body}</p>
    </button>
  );
}
