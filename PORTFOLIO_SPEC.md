# Portfolio Build Brief — for Claude Code

Use this document as the full specification for building this project. Follow it
exactly for structure and content; use your own judgment for implementation details
not specified here (component breakdown, file organization, exact Tailwind classes).

Build **incrementally and check in after each major step** (scaffold → design system →
each page → deploy). Don't build the entire site in one pass — confirm the hero/design
system looks right before building out all pages, since the whole site depends on it.

---

## 1. Tech stack (decided — do not change)

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (free tier)
- **Language:** TypeScript preferred if it's no extra friction; plain JS is fine otherwise
- **No backend, no database.** This is a fully static portfolio site.

---

## 2. Site structure — Core 4 pages

```
/                       Home
/projects               All projects (STAR summaries, cards)
/projects/[slug]        Individual project case study pages (3 total)
/about                  About + skills
/contact                Contact form (client-side only — opens mailto:, no backend)
```

Shared layout: persistent header (logo + nav links + "Get in touch" CTA) and footer
(contact links) across all pages.

---

## 3. Design system (decided — do not change)

### Theme: Dark

- Background: deep ink navy, not pure black — around `#0F1420` to `#131A26`
- Surface/card background: slightly lighter than base, e.g. `#1A2230`
- Text primary: warm off-white, e.g. `#F2F0EA`
- Text muted: soft gray-blue, e.g. `#8B93A3`
- **Accent color: amber/gold**, around `#E8A33D` — used sparingly for links, highlights,
  CTAs, chart/graph elements. This is the signature color of the whole site.
- Border/divider color: low-contrast, e.g. `#242C3A`

### Typography — exactly 2 font families

- **Display/headline font:** a geometric sans with real character (e.g. Space Grotesk,
  or similar via Google Fonts) — used for h1/h2/logo
- **Body font:** a clean, highly readable sans (e.g. Inter) — used for all paragraph
  text, nav, buttons
- Monospace (e.g. JetBrains Mono) may be used sparingly as **accent styling only**
  (tags, stat labels, code-like details) — not a full third typographic voice

### Signature visual: animated hero graphic

- An animated node/network graph in the hero section — nodes (dots) connected by
  lines, subtly animating/drifting, evoking a live data/network visualization
- Should feel alive but not distracting — low-key motion, not flashy
- Respect `prefers-reduced-motion` — disable/simplify animation for users who have
  that setting on

### Motion: moderate

- Animated hero graphic: yes (see above)
- Elsewhere: subtle fade/slide-in on scroll for sections (e.g. using Framer Motion or
  CSS `IntersectionObserver`-triggered classes) — keep it minimal, not a scroll effect
  on every single element

### Design constraints carried from research

- **No skill bars or percentage-based skill indicators anywhere** — use text-based
  framing instead (years of experience, number of projects)
- Minimum 4.5:1 text contrast ratio (WCAG 2.2 AA) — verify amber accent text on dark
  background meets this for any text use, not just decorative use
- Site must be fast — no heavy unoptimized images, lazy-load where sensible

---

## 4. Page-by-page content spec

### Home (`/`)

**Hero (above the fold — no scrolling required to see this):**
- Name: **Snehan**
- Title: **Data Scientist & Analytics Engineer**
- Headline: "MSc Data Science & Analytics. I turn messy, real-world data — job
  postings, tourism GPS records, crop imagery — into models and dashboards people can
  actually act on."
- Tech stack line (small tags): Python, R, SQL, PostgreSQL / PostGIS, Scikit-learn,
  Streamlit, Power BI
- CTAs: "View projects" (primary, → /projects), GitHub link, LinkedIn link
- Animated network-graph visual alongside/behind the hero text

**Featured projects section** (directly below hero, before any About content):
- Cards for all 3 projects (see Section 5), each linking to its full case study page
- Card order: **strongest project first / top-left** — order should be:
  1. AI-Powered Job Market Intelligence & Skill Gap Analyzer
  2. Tourism Infrastructure Spatial Analysis
  3. Explainable AI for Precision Agriculture

**Footer CTA:** "Let's talk" + short line about being open to Data Analyst / Data
Scientist / ML Engineer roles across Ireland, + contact links

### Projects (`/projects`)

- Same 3 project cards as home, but with full STAR summaries visible directly on
  this page (Situation/Task/Action/Result, Action given the most visual weight),
  plus a "Full case study →" link to the detail page for each
- Include the quantitative result metrics as small stat chips under each project
  (see Section 5 for exact numbers)

### Project detail pages (`/projects/job-market-analyzer`,
`/projects/tourism-spatial-analysis`, `/projects/explainable-ai-agriculture`)

- Full STAR case study per project (see Section 5 for full text) — Action section
  should be visually the largest/most detailed block per project
- Tags/tech stack for that specific project at the top
- Source code link (and live demo link where noted)
- "← Back to all projects" link

### About (`/about`)

- First-person bio (see Section 5 for exact text)
- Hobby tags: Indian classical dance, Group travel planning, Building side projects
- Skills section below bio, grouped into 4 categories (see Section 5) — chip/tag
  style, **no percentage bars**

### Contact (`/contact`)

- Simple form: Name, Email, Message
- **GDPR-compliant consent checkbox — must be un-ticked by default**, with label
  explaining no data is stored, the form only opens the user's email client
- On submit: construct a `mailto:` link with subject/body pre-filled and redirect —
  no backend, no data storage anywhere
- Direct contact links (email, LinkedIn, GitHub) also shown below the form

---

## 5. Exact content to use

### Bio (About page, first-person)

> I'm an MSc Data Science & Analytics student at Maynooth University, originally
> from Bangalore and now based in Dublin. I like problems where the data is messy
> before it's useful — cleaning, modelling, and turning it into something a
> non-technical person can actually act on.
>
> My background combines computer science engineering with applied data science —
> I studied Machine Learning, Bayesian Data Analysis, Spatial Databases, and Deep
> Learning at Maynooth, on top of a BEng in Computer Science & Engineering. Along the
> way I've worked across recommendation systems, spatial analysis, and explainable AI.
>
> Alongside my studies I teach Indian classical dance, which is where most of my
> patience for repetition and detail comes from. I'm currently job-hunting across
> Data Analyst, Data Scientist, and ML Engineer roles in Ireland — Dublin, Cork,
> Limerick, or remote/hybrid.

### Skills (4 groups, chip style, no bars)

- **Data & Analysis:** Python, R, SQL, Power BI, Data Cleaning
- **ML & AI:** Scikit-learn, Deep Learning, Explainable AI, Statistical Modelling
- **Databases & Geo:** PostgreSQL, PostGIS, QGIS, Data Modelling
- **Engineering:** Streamlit, Java, C++, HTML/CSS/JS

### Project 1: AI-Powered Job Market Intelligence & Skill Gap Analyzer

Tags: Python, Streamlit, NLP, Pandas
Links: GitHub source, live demo (both currently placeholder — see Section 6)

- **Situation:** Job postings for AI/data roles list dozens of tools and skills, but
  it's hard to tell which ones actually matter versus which are boilerplate. Built
  to quantify real demand across roles, rather than relying on anecdotal advice.
- **Task:** Build a system that could ingest a large set of job postings, extract
  mentioned skills reliably, rank them by frequency and role, and let an individual
  compare their own skill set against real demand data.
- **Action:** Collected and cleaned over 7,800 AI job skill signals spanning 3
  distinct roles. Built a deduplication and normalization pipeline to handle 2,700+
  duplicate records from postings scraped across multiple boards before any analysis
  could be trusted. Designed skill-extraction logic to pull the top 20 in-demand
  skills per role from free-text listings, and built the ranking layer on top.
  Built an interactive Streamlit dashboard (not a static notebook) so a user could
  input their own skill profile and get a personalized gap analysis — detecting up
  to 17 missing high-demand skills and generating prioritized learning
  recommendations.
- **Result:** Identified SQL as the single highest-frequency skill across roles,
  with 333 mentions. The deduplication pipeline turned an unreliable 7,800-record
  dataset into a clean, trustworthy one.
- **Metrics:** 7,800+ signals analyzed · 2,700+ duplicates cleaned · 333 mentions
  (top skill: SQL) · 17 skill gaps detected per profile

### Project 2: Tourism Infrastructure Spatial Analysis

Tags: PostgreSQL, PostGIS, QGIS, Spatial SQL
Links: GitHub source only

- **Situation:** University project (Spatial Databases coursework) framed around a
  real question: how evenly is tourism infrastructure actually distributed across a
  region, versus how it's assumed to be distributed?
- **Task:** Quantify infrastructure concentration and proximity patterns across
  Karnataka's 30 districts using real geospatial data, in a way that could support
  an actual policy/investment argument.
- **Action:** Modelled over 8,000 tourism facility records in PostgreSQL 18 using
  the PostGIS 3.6 extension, structuring the schema for efficient district-scale
  spatial queries. Wrote the core analysis using PostGIS functions — ST_Intersects
  for containment checks, ST_DWithin for proximity thresholds, ST_Distance for
  buffer-zone calculations — to quantify facility clustering around urban vs. rural
  areas. Built choropleth visualizations in QGIS to communicate the pattern
  visually to a non-technical audience.
- **Result:** Revealed that 63% of tourism infrastructure is concentrated in urban
  areas — a clear, quantified rural investment gap.
- **Metrics:** 8,000+ facilities mapped · 30 districts analyzed · 63% urban
  concentration found

### Project 3: Explainable AI for Precision Agriculture

Tags: Deep Learning, Grad-CAM, LIME, Computer Vision
Links: GitHub source only

- **Situation:** Deep learning models for crop disease detection can be highly
  accurate but are usually black boxes — no indication of *why* a prediction was
  made, making it hard to trust or verify.
- **Task:** Build a disease detection system where every prediction comes with an
  explanation an agronomist could inspect and verify against their own knowledge.
- **Action:** Trained a deep learning classifier for crop disease detection using
  image data, then integrated Grad-CAM (heatmaps showing which image regions most
  influenced the decision) and LIME (locally-interpretable explanation per
  prediction). Built a web dashboard where a user uploads an image and sees the
  prediction alongside its Grad-CAM/LIME visualization in the same view, framed for
  agricultural decision-making.
- **Result:** A decision-support tool, not just a classifier — every prediction
  ships with a visual rationale an agronomist can check against expected disease
  patterns.

---

## 6. Placeholders to flag clearly in the code (do not invent real values)

- GitHub profile URL — use `https://github.com/Snehan` as a placeholder, comment it
  clearly as **"REPLACE WITH REAL GITHUB URL"**
- LinkedIn profile URL — use `https://linkedin.com/in/Snehan` as a placeholder,
  comment it clearly as **"REPLACE WITH REAL LINKEDIN URL"**
- Live demo link for Project 1 — placeholder only, comment as **"REPLACE WITH REAL
  DEMO URL IF HOSTED (e.g. Streamlit Cloud), OR REMOVE THIS LINK"**
- Email is real and correct: `snehandhanraj@gmail.com` — safe to use as-is

---

## 7. Deployment

- Set up for one-command deploy to Vercel (`vercel` CLI or GitHub integration)
- Confirm the production build (`next build`) runs clean with no errors before
  considering any step "done"
- After deploying, verify all internal links (nav, project cards → detail pages,
  back links) work in the deployed version, not just localhost

---

## 8. Working style for this build

- Build incrementally: scaffold project → build design system/shared layout →
  Home page → Projects + detail pages → About → Contact → deploy
- After each step, summarize what was built and flag anything that needs a decision
  before continuing
- Don't add pages, sections, or features not specified in this brief without
  flagging it as a suggestion first
