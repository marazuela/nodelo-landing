# Nodelo — Web Content Guideline

> A strategic blueprint for building the Nodelo website. This document defines the site architecture, page-by-page content, copy direction, narrative strategy, and persuasion framework. Designed to be implemented in Cursor — you handle design and features, this handles what to say and where.

---

## Table of Contents

1. [Strategic Foundation](#1-strategic-foundation)
2. [Site Architecture](#2-site-architecture)
3. [Homepage — The Conversion Machine](#3-homepage)
4. [Product Page — The Deep Dive](#4-product-page)
5. [Pricing Page](#5-pricing-page)
6. [Docs / Getting Started](#6-docs)
7. [Design Language Notes](#7-design-language)
8. [Appendix: Copy Bank](#8-copy-bank)

---

## 1. Strategic Foundation

### The Core Insight

After studying Linear, Vercel, Stripe, Retool, Notion, and Loom — every high-converting SaaS homepage follows the same pattern: **emotional hook + visual proof + one clear CTA**. They sell the dream on the homepage and push mechanics, pricing, and technical depth to secondary pages.

The current Nodelo page tries to do everything at once: problem framing, technical architecture, pricing breakdown, comparison tables, FAQ. That's a product page pretending to be a homepage. We need to split.

### What Changes

| Currently on Homepage | Move To |
|---|---|
| Architecture diagram (MCP sources → Agent → Graph) | Product page |
| Comparison table (Nodelo vs. ETL vs. RAG vs. Manual) | Product page |
| Pricing ($70K breakdown with phases) | Pricing page |
| FAQ accordion (7 questions) | Product page (bottom) |
| Tech stack badges (Instructor, LiteLLM, pgvector...) | Product page |
| Storage options (Neo4j / Postgres / SQLite) | Product page |
| 6-step feature list (Connect, Discover, Extract...) | Product page (simplified to 3 on homepage) |

| Stays on Homepage (Simplified) |
|---|
| Hero with emotional hook |
| Problem framing (shorter, punchier) |
| "How it works" (3 steps, not 6) |
| Visual product demonstration |
| Social proof / trust signals |
| Use cases (outcomes, not features) |
| Single CTA section |

### The Narrative Arc

The homepage tells a 60-second story:

1. **Hook** — "Your AI agents don't know your business" (2 seconds)
2. **Pain** — Quick visual showing the mess (5 seconds)
3. **Pivot** — "What if they could?" (2 seconds)
4. **Solution** — Nodelo, in one sentence (5 seconds)
5. **Proof** — Show it working (10 seconds)
6. **Outcomes** — What becomes possible (10 seconds)
7. **Trust** — Who uses it / who built it (5 seconds)
8. **Action** — One clear next step (2 seconds)

Total cognitive load: under 60 seconds to understand the value. Everything else lives on secondary pages for people who want to go deeper.

### Target Audience Hierarchy

**Primary:** Operations leaders, RevOps, heads of business systems at companies already deploying AI agents (Claude, GPT, etc.). Non-technical. They feel the pain daily — agents that don't know the business. They don't want to write code. They want a solution.

**Secondary:** Technical founders and CTOs at AI-forward startups. They've tried building knowledge pipelines. They know the pain of custom ETL. They want to evaluate the architecture.

**Tertiary:** Individual power users running Claude Desktop who want it to know their work context.

The homepage speaks to Primary. The product page speaks to Secondary. Docs speak to Tertiary.

---

## 2. Site Architecture

```
nodelo.ai/
├── /                     ← Homepage (conversion)
├── /product              ← Product deep dive (evaluation)
├── /pricing              ← Pricing + ROI (decision)
├── /docs                 ← Getting started + API reference (adoption)
├── /blog                 ← Future: thought leadership, case studies
└── /about                ← Future: Solutz team, mission
```

### Navigation

```
[Nodelo logo]     Product    Pricing    Docs    GitHub    [Request Demo]
```

- Logo: Links to homepage
- "Product" links to /product
- "Pricing" links to /pricing
- "Docs" links to /docs (or external docs site)
- "GitHub" links to repo (opens new tab)
- "Request Demo" is the primary CTA button — always visible, always blue

### Sticky Header

Header appears after scrolling past the hero section. On mobile, collapse to hamburger. The "Request Demo" button is always visible in the header, even on mobile.

---

## 3. Homepage — The Conversion Machine

The homepage has ONE job: make the visitor say "I need to learn more" and click "Request Demo" or "See Product."

### Section 1: Hero

**Purpose:** Emotional hook in under 3 seconds. Visitor must feel seen.

**Headline:**
> Your AI agents can reason. They just don't know your business.

**Subheadline:**
> Business context lives scattered across your CRM, email, docs, and chat. None of it is structured for AI consumption. Nodelo fixes that — automatically.

**CTAs:**
- Primary: `Request a Demo` (blue, prominent)
- Secondary: `See How It Works →` (text link with arrow, scrolls to Section 4)

**Trust line (small, below CTAs):**
> Open-source · MCP-native · 19,400+ integrations

**Visual treatment:**
- Dark gradient background with subtle animated grid (like Vercel/Linear)
- Optional: floating/pulsing node particles suggesting a knowledge graph forming
- Headline uses gradient text effect (white → blue)
- Generous whitespace. Let the words breathe.

**What NOT to include in the hero:**
- No feature lists
- No "how it works" steps
- No technical jargon (MCP, ontology, bi-temporal)
- No pricing
- No logos yet

---

### Section 2: Social Proof Strip

**Purpose:** Establish credibility immediately after the hook. This is where logos go.

**Format:** A single horizontal strip below the hero. Muted/grayscale logos. No background change — feels like part of the hero.

**Copy (above logos):**
> Trusted by teams building with AI

**Content:**
- If you have customer logos: show 4-6 logos
- If pre-launch: show partner/tech logos instead: `Anthropic MCP` | `Claude` | `HubSpot` | `Salesforce` | `Slack` | `Google`
- Alternatively, use a metric: "Connects to 19,400+ business systems via MCP"

**Notes:**
- This section should be visually minimal — one line, grayscale
- Don't skip it. Every top SaaS site puts social proof within the first scroll

---

### Section 3: The Problem (Short)

**Purpose:** Build 10 seconds of emotional resonance. The visitor should think: "That's exactly my problem."

**Headline:**
> Your business data is a mess. Your AI agents pay the price.

**Format:** Three short cards, each one sentence + one visual metaphor. NOT the detailed comparison table (that moves to /product).

**Card 1: Scattered Context**
- Icon: scattered/disconnected dots
- Text: "Customer history in HubSpot. Contracts in Drive. Conversations in Slack. Support tickets in Zendesk. None of it connected."

**Card 2: Engineering Bottleneck**
- Icon: clock/hourglass
- Text: "Building custom data pipelines takes months and breaks with every API change. Your ops team is waiting on engineering."

**Card 3: Blind Agents**
- Icon: blindfold / question mark
- Text: "Without structured context, your AI agents guess. They hallucinate. They give generic answers that don't reflect your business reality."

**Closer (centered text below cards):**
> There's a better way.

**Design notes:**
- Cards should feel light — not heavy problem-card blocks
- Use subtle icons, not emojis
- Muted background, clean typography
- The "There's a better way" line acts as a narrative bridge to the solution

---

### Section 4: The Solution (One Sentence + Visual)

**Purpose:** Introduce Nodelo clearly in one breath. This is the "aha" moment.

**Headline:**
> Meet Nodelo

**One-liner:**
> An AI agent that connects to your business systems, reads your data, and builds a knowledge graph your other agents can query. Automatically. No engineering required.

**Visual:** This is where you SHOW, don't tell. Options:

- **Option A (Best):** A short animated sequence or illustration showing the flow: Source systems (icons) → Nodelo (center, glowing) → Knowledge graph (connected nodes) → Downstream agents (using the graph). This should feel like a 5-second visual story, not a static architecture diagram.

- **Option B:** A screenshot or mockup of a Claude Desktop conversation where the user asks a business question and gets a structured, context-rich answer powered by Nodelo (showing the "Last scanned: 6 hours ago. Confidence: 94%." type output).

- **Option C:** An SVG knowledge graph that's alive — nodes connecting, pulsing, with labels like "Customers," "Deals," "Contracts." Not a technical diagram. An abstract, beautiful representation of structured business knowledge.

**Key stat row (below visual):**

| 19,400+ | 15 min | Zero |
|---|---|---|
| Connected systems via MCP | Setup time | Engineering required |

**Design notes:**
- This section should feel like a reveal moment — visual weight shifts from text to image
- Background can have a subtle gradient shift (darker → slightly lighter blue tint) to signal the pivot from problem to solution
- Stats should be large, bold, with enough spacing to feel impactful
- Do NOT list features here. Just the concept + the "wow" visual

---

### Section 5: How It Works (Simplified — 3 Steps)

**Purpose:** Make the process feel inevitable and effortless. "That's it?"

**Headline:**
> Three steps. Fifteen minutes.

**Step 1: Connect**
- Visual: Icons of tools (HubSpot, Gmail, Slack, etc.) connecting to a central point
- Text: "Point Nodelo at your existing tools. It connects via MCP — the same protocol Claude uses. One click per system."

**Step 2: Talk**
- Visual: Chat bubble / conversation interface
- Text: "Have a 15-minute conversation with the agent. It learns your business structure, your key entities, your relationships. No forms. No configuration files. Just a conversation."

**Step 3: Done**
- Visual: Knowledge graph coming alive / green checkmark
- Text: "Nodelo builds your knowledge graph. It stays current with nightly scans. Every AI agent in your stack can now query it."

**Design notes:**
- Horizontal layout on desktop (1 → 2 → 3 with connecting lines)
- Vertical stack on mobile
- Each step has a subtle animation on scroll (fade in + slide up, staggered)
- Step numbers should be prominent (large, colored circles)
- Keep text short — 2 sentences max per step
- Do NOT include: extraction details, deduplication, bi-temporal tracking, confidence scores, storage options. All of that is /product territory.

---

### Section 6: What Becomes Possible (Outcomes)

**Purpose:** Paint the future. Make the visitor want this future for their company.

**Headline:**
> When your AI agents actually know your business

**Format:** 2x2 grid of outcome cards. Each card is an outcome, not a feature.

**Card 1: Sales that close themselves**
> Your sales agent knows every customer, every deal, every past conversation. It identifies upsell opportunities you'd miss. It drafts outreach with real context.

**Card 2: Support that resolves, not deflects**
> Your support agent has full customer history — tickets, contracts, product usage, billing. It resolves issues on first contact because it understands the relationship.

**Card 3: Operations that run overnight**
> Your ops agent monitors your business in real time. It detects process bottlenecks, flags anomalies, and recommends actions based on actual business structure.

**Card 4: Any agent, any domain**
> Recruiting, finance, legal, product — build domain-specific agents that reason over your actual business graph. Nodelo gives them the context they need.

**Design notes:**
- Cards should feel aspirational, not technical
- Subtle hover effect (lift + glow)
- Icons or small illustrations for each card
- No "Learn more" links on these cards — they're narrative, not navigational

---

### Section 7: Final CTA

**Purpose:** One clear call to action. No friction.

**Headline:**
> Ready to make your AI agents actually useful?

**Subtext:**
> See Nodelo in action. A 30-minute demo with a Solutz engineer — no pitch, just a walkthrough of what your knowledge graph would look like.

**CTAs:**
- Primary: `Request a Demo` (large blue button)
- Secondary: `Explore the Product →` (text link to /product)

**Soft urgency (optional, small text):**
> Limited implementation slots for Q2 2026.

**Design notes:**
- This section has a different background treatment (subtle gradient, slight glow) to feel like a "moment"
- Generous padding — it should feel like a destination, not just another section
- No form fields on the homepage. The CTA links to a Calendly or contact form.

---

### Section 8: Footer

**Content:**
- Left: Nodelo logo + "Built by Solutz"
- Center: Navigation links (Product, Pricing, Docs, GitHub, Contact)
- Right: "Open-source · MCP-native"
- Bottom: "© 2026 Solutz. All rights reserved."

**Design notes:**
- Minimal, clean, dark background
- No newsletter signup (yet)
- No social media icons (unless active accounts exist)

---

### Homepage: What's Deliberately Absent

This list is as important as what's included:

- **No pricing.** Not even a hint. Visitor isn't ready. → /pricing
- **No comparison tables.** They're evaluative, not emotional. → /product
- **No FAQ.** Questions mean objections. Handle them after showing value. → /product
- **No architecture diagrams.** Technical buyers go to /product.
- **No tech stack badges.** (Instructor, LiteLLM, pgvector) → /product
- **No storage options.** (Neo4j vs Postgres vs SQLite) → /product
- **No code snippets.** → /docs
- **No detailed feature list.** Six features (Connect, Discover, Extract, Structure, Serve, Automate) → simplified to 3 steps on homepage, full breakdown on /product
- **No long-form copy.** Every section is under 50 words of body text.

---

## 4. Product Page — The Deep Dive

The product page is for people who clicked "Learn more" or "Explore the Product" from the homepage. They're interested. Now they want to evaluate. This is where technical depth lives.

### Product Page Structure

**Section P1: Hero (Lighter)**
- Headline: "How Nodelo Works"
- Sub: "The knowledge structuring agent that gives your AI real business context."
- No CTA in hero — they're already here to learn.

**Section P2: The Full Pipeline (5 Steps)**

Now we can show the complete flow with technical detail:

**Step 1: Connect**
- Nodelo connects to your business tools via MCP (Model Context Protocol)
- Supports 19,400+ MCP servers: HubSpot, Salesforce, Gmail, Slack, Google Drive, Notion, Jira, Zendesk, Shopify, GitHub, and thousands more
- One-click installation per source system
- No custom connectors needed — ever

**Step 2: Discover**
- 15-minute conversational onboarding
- The agent interviews you about your business: what entities matter, what relationships exist, what terminology you use
- Simultaneously inspects your connected MCP sources — reads schemas, object types, field names
- Proposes a custom ontology (entity types + relationship types) based on conversation + source inspection + industry templates
- You review and confirm. Done.

**Step 3: Extract**
- Reads documents, emails, CRM records, Slack messages, support tickets
- LLM-powered entity and relationship extraction using structured output (Instructor + Pydantic)
- Handles PDFs, DOCX, PPTX, HTML, plain text
- Assigns confidence scores to every extracted fact

**Step 4: Structure**
- Builds a knowledge graph with:
  - **Entities** — typed, with properties, embeddings, and source tracking
  - **Relationships** — typed, weighted, with bi-temporal validity tracking
  - **Cross-source deduplication** — 3-tier matching: exact → fuzzy embedding (cosine > 0.85) → LLM judgment
  - **Conflict detection** — flags contradictions across sources (e.g., HubSpot says deal is $310K, contract says $285K)
  - **Confidence decay** — facts lose confidence over time if not re-confirmed

**Step 5: Serve**
- Exposes the graph as an MCP server with 7 tools:
  - `get_context(entity)` — Structured context bundle + timeline + conflicts
  - `search_entities(query)` — Semantic + keyword search
  - `get_relationships(entity, type)` — Relationships with temporal validity
  - `get_timeline(entity)` — Chronological view of facts
  - `get_conflicts()` — Facts that contradict across sources
  - `trigger_scan(source)` — Manually trigger a re-scan
  - `get_schema()` — Current ontology definition
- Any downstream AI agent can call these tools — sales agents, support agents, custom agents
- Nightly incremental scans keep the graph current automatically

---

**Section P3: Architecture Diagram**

Now we can show the full technical architecture:

```
┌─────────────────────────────────────────────────┐
│                 SOURCE SYSTEMS                    │
│  HubSpot  Gmail  Salesforce  Slack  Drive  ...  │
│           (via MCP servers)                       │
└──────────────────┬──────────────────────────────┘
                   │
          ┌────────▼────────┐
          │  NODELO AGENT   │
          │                 │
          │  Discovery      │
          │  Scanning       │
          │  Extraction     │
          │  Deduplication  │
          │  Graph Writing  │
          └────────┬────────┘
                   │
     ┌─────────────▼─────────────┐
     │     KNOWLEDGE GRAPH       │
     │  Neo4j / Postgres / SQLite│
     │                           │
     │  Entities · Relationships │
     │  Confidence · Temporal    │
     └─────────────┬─────────────┘
                   │
          ┌────────▼────────┐
          │  NODELO MCP     │
          │  SERVER          │
          │  (7 query tools) │
          └────────┬────────┘
                   │
     ┌─────────────▼─────────────┐
     │    DOWNSTREAM AGENTS      │
     │                           │
     │  Sales · Support · Ops    │
     │  Finance · Custom         │
     └───────────────────────────┘
```

Design this as a clean, visual, CSS/SVG diagram — not ASCII art. Animate the data flow with subtle movement from top to bottom.

---

**Section P4: Storage Flexibility**

Show the three storage options as a selector or tabs:

| | Neo4j | PostgreSQL | SQLite |
|---|---|---|---|
| **Best for** | Large graphs, complex traversals | Most businesses, existing infra | Local dev, prototyping, small teams |
| **Vector search** | Native | pgvector | sqlite-vec |
| **Setup** | Requires Neo4j instance | Use existing Postgres | Zero setup, single file |
| **Graph traversal** | Cypher (native, fast) | Recursive CTEs (good enough) | Recursive CTEs |

**Message:** "Use what you already have. No new infrastructure required."

---

**Section P5: Comparison Table**

The detailed comparison that was on the old homepage. Now it lives here, in context.

| | Nodelo | Custom ETL | RAG / Vector | Manual KB | Build In-House |
|---|---|---|---|---|---|
| **Setup time** | 15 minutes | 3-6 months | 1-2 weeks | 1-2 weeks | 6+ months |
| **Maintenance** | Automated (nightly scans) | Constant (breaks with API changes) | Moderate | Very high (human bottleneck) | Very high |
| **Output structure** | Entities + relationships + temporal | Custom (whatever you build) | Text chunks | Unstructured text | Custom |
| **Freshness** | Nightly incremental + confidence decay | Reactive | Manual refresh | Stale immediately | Reactive |
| **Cost** | $70K implementation | $240K+ (3-4 engineers × 6 months) | $20-50K | $15-30K + ongoing FTE | $500K+ |
| **Engineering required** | Zero | 3-4 FTE | 1-2 FTE | 1 FTE (ongoing) | 3-4 FTE (ongoing) |
| **Cross-source dedup** | Built-in (3-tier) | Custom build | None | None | Custom build |
| **Conflict detection** | Built-in | Custom build | None | None | Custom build |

---

**Section P6: Open-Source Foundation**

**Headline:** Built on giants. Not reinvented from scratch.

**Message:** "80% battle-tested open-source. 20% Nodelo intelligence. Less code means fewer bugs, faster delivery, and full auditability."

**Stack display (badges or grid):**
- Instructor — Structured LLM output
- LiteLLM — Multi-provider LLM access
- pgvector — Postgres vector search
- sqlite-vec — SQLite vector search
- MCP Python SDK — Anthropic's official SDK
- Pydantic — Data validation
- APScheduler — Task scheduling
- Docling — Document parsing

**What Nodelo builds (the 20%):**
- MCP discovery + orchestration
- Conversational ontology builder
- Cross-source entity resolution
- Postgres/SQLite graph adapter
- Nodelo MCP server (7 tools)
- Maintenance agent loop

**Open source claim:** "~3,000 lines of Python. Inspect the code. Fork it. Run it yourself."

---

**Section P7: FAQ (Moved from Homepage)**

Accordion-style, expandable. These are the evaluation-stage questions:

**Q: Does it work with our systems?**
A: If there's an MCP server for it — yes. That's 19,400+ systems and counting: HubSpot, Salesforce, Gmail, Slack, Google Drive, Notion, Jira, Zendesk, Shopify, GitHub, Linear, Asana, Monday.com, and thousands more. If your system doesn't have an MCP server yet, we can build a custom one during Phase 2 of the engagement.

**Q: Where does our data live?**
A: In YOUR database. Neo4j, PostgreSQL, or SQLite — you choose based on your existing infrastructure. Nodelo never stores your data. The knowledge graph runs entirely in your environment. Full data sovereignty.

**Q: What about security?**
A: Nodelo runs locally on your machine (or self-hosted in your infrastructure). Text chunks are sent to the Claude API for extraction — same trust boundary as using Claude for anything else. Anthropic's API is SOC2, HIPAA, and ISO27001 compliant. For maximum privacy, use a local LLM (Ollama + Llama 3 or Mistral). Ontology telemetry is opt-in and contains zero content, names, or PII.

**Q: How much does it cost to run after implementation?**
A: Claude API usage for extraction (scales with data volume, typically $500-2,000/month) plus your database costs. No per-query fees. No licensing fees. No subscription. You own the graph.

**Q: What if we add new systems later?**
A: Install the MCP server for that system. Nodelo auto-discovers it on the next scan. No re-implementation. No re-architecture. 15 minutes.

**Q: Can we run it on-premise?**
A: Yes. Nodelo ships as a pip package, Docker image, or Claude Desktop Extension. Runs anywhere: your laptop, your VPC, Kubernetes, bare metal. Data never leaves your infrastructure unless you choose to use Claude's API for extraction (which you can replace with a local LLM).

**Q: Is the code really open source?**
A: The core is open source (~3,000 lines of Python). Deploy it. Self-host it. Modify it. The $70K engagement covers implementation, integration, custom connectors, training, and 4 weeks of on-site field engineering. You're paying for expertise, not a license.

**Q: How long until we see results?**
A: First knowledge graph within 48 hours of kickoff. Full implementation in 4 weeks (remote). On-site field engineering and training in weeks 5-8.

**Q: What's the ROI?**
A: The comparable in-house build costs $240K+ (3-4 engineers × 6 months) before accounting for opportunity cost. Nodelo delivers in 8 weeks at $70K. Most clients report 3-5x return within the first quarter through agent productivity gains and eliminated engineering overhead.

---

**Section P8: CTA (Product Page)**

**Headline:** "See it in action"

**CTAs:**
- Primary: `Request a Demo`
- Secondary: `View Pricing` (links to /pricing)
- Tertiary: `Read the Docs` (links to /docs)

---

## 5. Pricing Page

### Pricing Page Structure

**Section $1: Hero**

**Headline:** "Simple, transparent pricing"
**Sub:** "One engagement. Everything included. No hidden costs."

**Section $2: The Single Package**

Present ONE pricing card (not tiers — there's one offering):

```
┌─────────────────────────────────────────┐
│                                         │
│     Complete Implementation             │
│                                         │
│              $70,000                     │
│                                         │
│  Full Nodelo deployment + 4 weeks       │
│  of on-site field engineering           │
│                                         │
│  ─────────────────────────────          │
│                                         │
│  Phase 1: Remote Implementation  $28K   │
│  4 weeks — Deployment, configuration,   │
│  data ingestion, knowledge graph,       │
│  MCP server, nightly automation         │
│                                         │
│  Phase 2: On-Site FDE            $36K   │
│  4 weeks — Custom integrations,         │
│  team training, workflow embedding,     │
│  knowledge transfer, runbooks           │
│                                         │
│  Travel & Expenses               ~$6K   │
│                                         │
│  ─────────────────────────────          │
│                                         │
│  ✓ Up to 10 data source integrations    │
│  ✓ Custom ontology design               │
│  ✓ Nightly automated scans              │
│  ✓ Full team training                   │
│  ✓ Runbooks and documentation           │
│  ✓ You own everything — code & data     │
│                                         │
│         [Request a Proposal]            │
│                                         │
└─────────────────────────────────────────┘
```

**Section $3: ROI Comparison**

Side-by-side with "building it yourself":

| | Nodelo | Build In-House |
|---|---|---|
| **Timeline** | 8 weeks | 6+ months |
| **Engineering cost** | $0 (we do it) | $240K+ (3-4 engineers) |
| **Ongoing maintenance** | Automated | 1-2 FTE |
| **Total first-year cost** | ~$76K (implementation + ~$6K/yr running) | $500K+ |

**Key message:** "You're not paying for software. You're paying for 8 weeks of expert implementation and a team that walks away fully enabled. You own everything."

**Section $4: Payment Schedule**

| Milestone | Timing | Amount |
|---|---|---|
| Deposit | Upon signing | $21,000 (30%) |
| Phase 1 completion | End of Week 4 | $21,000 (30%) |
| Phase 2 mid-point | End of Week 6 | $14,000 (20%) |
| Final delivery | End of Week 8 | $14,000 (20%) |

**Section $5: Running Costs (Post-Implementation)**

Be transparent:
- Claude API for extraction: $500-2,000/month (scales with data volume and scan frequency)
- Database: Your existing infrastructure (Postgres is typically $50-200/month)
- No Nodelo licensing fees. No per-query charges. No subscription.

**Section $6: CTA**

`Request a Proposal` → Contact form or Calendly link

---

## 6. Docs / Getting Started

This is a separate concern from the marketing site, but the marketing site should link to it. The docs site should cover:

**Getting Started Guide:**
1. Install Nodelo (pip, Docker, or Claude Desktop Extension)
2. Connect your first MCP source
3. Run the onboarding conversation
4. Trigger your first scan
5. Query the graph

**API Reference:**
- The 7 MCP tools: get_context, search_entities, get_relationships, get_timeline, get_conflicts, trigger_scan, get_schema
- Parameters, return types, examples

**Storage Guide:**
- Postgres setup
- SQLite setup
- Neo4j setup

**Ontology Guide:**
- How ontology generation works
- Industry templates (B2B SaaS, Agency, E-commerce)
- Customizing your ontology

**Architecture Overview:**
- Full technical architecture for developers
- Codebase structure
- Contributing guide

---

## 7. Design Language Notes

These are directional notes — you'll implement the specifics in Cursor.

### Color Palette

```
--primary-dark:   #0d1117     (backgrounds)
--surface:        #161b22     (card backgrounds)
--surface-2:      #1c2333     (elevated surfaces)
--border:         #30363d     (dividers, card borders)
--text:           #e6edf3     (primary text)
--muted:          #8b949e     (secondary text, captions)
--accent-blue:    #58a6ff     (CTAs, links, highlights)
--green:          #3fb950     (success, positive)
--orange:         #d29922     (warnings, attention)
--purple:         #bc8cff     (secondary accent)
```

### Typography

- **Font:** Inter (Google Fonts)
- **Headlines:** 700-800 weight, 32-56px
- **Subheadlines:** 500-600 weight, 18-24px
- **Body:** 400 weight, 15-16px, line-height 1.6-1.7
- **Captions/small:** 400 weight, 12-13px
- **Gradient text on hero headline:** white → accent-blue

### Animation Principles

- Scroll-triggered fade-in + slide-up (Intersection Observer, 300-600ms, staggered 100ms between siblings)
- Hover effects on cards: translateY(-4px) + subtle border glow
- Hero: subtle animated gradient background + floating particles
- Knowledge graph: pulsing nodes with flowing connection lines
- Keep everything smooth and purposeful — no gratuitous motion
- 60fps or don't animate

### Spacing Philosophy

- Sections: 80-120px vertical padding
- Between elements: 24-48px
- Cards: 24px gap in grids
- Generous whitespace everywhere — the content should breathe
- Max content width: 1200-1280px, centered

### Responsive Breakpoints

- Desktop: > 1024px (full layout)
- Tablet: 768-1024px (stack some columns)
- Mobile: < 768px (single column, full-width CTAs)

### Key Design References

Study these for the feel:
- **Linear.app** — Monochrome restraint, emotional copy, typographic power
- **Vercel.com** — Dark mode, grid backgrounds, technical elegance
- **Stripe.com** — Color discipline, whitespace, code-as-proof
- **Raycast.com** — Dark, fast, utility-focused but beautiful

---

## 8. Appendix: Copy Bank

Pre-written copy options for key moments. Pick the best fit or mix.

### Hero Headlines (Pick One)

1. "Your AI agents can reason. They just don't know your business."
2. "AI agents without business context are just expensive guessing machines."
3. "Your AI is smart. Your data is a mess. Nodelo bridges the gap."
4. "Every AI agent in your stack is missing the same thing: your business."
5. "What if your AI agents knew your business like a 10-year employee?"

### Hero Subheadlines

1. "Business context lives scattered across your CRM, email, docs, and chat. Nodelo structures it into a knowledge graph any agent can query — automatically, in 15 minutes, with zero engineering."
2. "Nodelo connects to your systems, reads your data, and builds a structured knowledge graph. Your AI agents go from generic to genuinely useful."
3. "Stop building custom data pipelines. Nodelo is an AI agent that structures your business knowledge for every other agent in your stack."

### One-Liners (For Product Section)

1. "An AI agent that turns your scattered business data into a queryable knowledge graph."
2. "Connect your tools. Have a conversation. Get a knowledge graph. That's it."
3. "The invisible infrastructure that makes every AI agent in your stack smarter."
4. "Nodelo reads your business so your AI agents don't have to guess."

### CTA Copy Options

- "Request a Demo" (standard, clear)
- "See It In Action" (lower commitment feel)
- "Talk to an Engineer" (authority + human)
- "Get a Walkthrough" (exploratory feel)
- "Request a Proposal" (for pricing page — implies custom)
- "Start Building" (for docs — action-oriented)

### Taglines

- "Built by operators, for operators."
- "Knowledge structuring for the AI era."
- "The agent your agents need."
- "Structure once. Query everywhere."

### Urgency Messaging (Use Sparingly)

- "Limited implementation slots for Q2 2026."
- "Next cohort starts [date]."
- "Currently accepting 3 new implementations per quarter."

---

## Implementation Notes for Cursor

### Page Priority

Build in this order:
1. **Homepage** — This is the first impression and conversion engine
2. **Product page** — Where interested visitors go to evaluate
3. **Pricing page** — Where serious buyers go to decide
4. **Docs** — Can be a separate site/repo (GitBook, Mintlify, Docusaurus)

### Tech Stack Suggestions

- **Framework:** Next.js (for SSR/SSG, good for SEO) or Astro (static, fast)
- **Styling:** Tailwind CSS (utility-first, fast iteration)
- **Animations:** Framer Motion (React) or vanilla Intersection Observer
- **Fonts:** Inter from Google Fonts
- **Hosting:** Vercel (if Next.js) or Cloudflare Pages
- **Analytics:** Plausible or PostHog (privacy-friendly)
- **Forms:** Cal.com embed or Typeform for demo requests

### SEO Considerations

- Title: "Nodelo — AI Agents That Know Your Business"
- Meta description: "Nodelo is a knowledge structuring agent that connects to your business systems via MCP and builds a queryable knowledge graph for your AI agents. No engineering required."
- Open Graph image: Dark branded card with headline + Nodelo logo
- Target keywords: "knowledge graph for AI agents," "MCP knowledge base," "structured business context for AI," "AI agent business data"

---

*This guideline is the single source of truth for Nodelo web content. Design, features, and implementation are in your hands. The words, structure, and strategy are here.*
