# Project Data Update — replaces Section 5 of PORTFOLIO_SPEC.md

This document supersedes the original 3-project list in PORTFOLIO_SPEC.md Section 5.
The site now has **6 real projects**, all with confirmed GitHub links. The
"Explainable AI for Precision Agriculture" project from the original spec has been
**dropped** — no real repo exists for it, and it must not appear on the live site.

---

## Featured order (Home page — 3 cards, in this order, strongest/top-left first)

1. Graduate Job & Internship Tracker
2. E-Commerce Customer Churn Analysis
3. AI-Powered Job Market Intelligence & Skill Gap Analyzer

## Full list (`/projects` page — all 6, same order as above then the remaining 3)

1. Graduate Job & Internship Tracker
2. E-Commerce Customer Churn Analysis
3. AI-Powered Job Market Intelligence & Skill Gap Analyzer
4. Tourism Infrastructure Spatial Analysis
5. Global Health Indicators Analysis
6. Ironman Ireland 2022: Performance Analysis

Each of the 6 needs its own detail page at `/projects/[slug]`, same pattern as
before (full STAR case study, Action-weighted).

---

## 1. Graduate Job & Internship Tracker

**Repo:** `https://github.com/SnehanSnehan/graduate-job-internship-tracker`
**Tags:** MERN, Docker, JWT Auth, REST APIs

- **Situation:** A team project (3-person) for Maynooth University's Internet
  Solutions Engineering module — university students often lose track of job/
  internship applications, deadlines, and statuses across multiple platforms.
- **Task:** Build a full-stack web app with real authentication, multi-user
  support, external API integration, and a containerized deployment — meeting
  academic requirements for layered architecture and design patterns.
- **Action:** I served as Backend Lead and Team Lead. I built the Express.js
  server, JWT authentication system, all API route handlers, and the external API
  integrations with RemoteOK (live remote job listings) and RestCountries
  (location data). I implemented the middleware chain (helmet, morgan, cors, JWT
  auth guard) and structured the backend around MVC, Repository, and Singleton
  patterns. I coordinated the team's GitLab branching strategy and repository
  setup. The frontend (React/Vite, Recharts analytics dashboard, React Context for
  auth state) and database/Docker orchestration were built by my teammates, with
  me integrating my backend work against their schemas and containers.
- **Result:** A fully working multi-user application — users register, log in with
  JWT auth, track applications through a full pipeline (Applied → Interview →
  Offer → Accepted/Rejected), pull live job listings from an external API, and
  view analytics on their application activity. Deployable end-to-end via a single
  `docker compose up` from a clean clone, with a full CI/CD pipeline on GitLab.
- **Metrics:** 2 external API integrations · 5 design patterns implemented ·
  full Docker + CI/CD deployment · multi-user with role-based (admin/user) access

---

## 2. E-Commerce Customer Churn Analysis

**Repo:** `https://github.com/SnehanSnehan/ecommerce-churn-analysis`
**Tags:** R, RFM Segmentation, Predictive Modeling

- **Situation:** E-commerce businesses often don't know which customers are about
  to churn until it's too late — most analysis is reactive rather than predictive.
- **Task:** Analyze real transaction data from a Brazilian e-commerce marketplace
  to understand churn drivers and produce concrete, data-backed retention
  recommendations, not just descriptive statistics.
- **Action:** I worked with 99,441 real transactions across 93,358 customers
  (Olist/Kaggle dataset, Sep 2016–Oct 2018). I built an RFM (Recency, Frequency,
  Monetary) segmentation model to split customers into 5 distinct groups —
  Champions, Loyal, Potential Loyalists, At Risk, and Lost — then trained a
  logistic regression model to identify customers at risk of churning before they
  actually left. I translated the statistical output into a 3-tier business
  strategy (immediate/medium-term/long-term actions) with recommended actions for each tier.
- **Result:** Identified a 70.7% baseline churn rate and 12,298 "at-risk"
  customers for immediate re-engagement. Illustrative scenario: if 10% of At Risk
  customers (about 1,230) moved up to Loyal-level spend (R$215 vs R$69 average),
  that is roughly R$180K in revenue.
- **Metrics:** 99,441 transactions analyzed · 5 customer segments identified ·
  70.7% churn rate diagnosed
- **Segments** (customers / churn rate / average spend):

  | Segment | Customers | Churn | Avg spend |
  |---|---|---|---|
  | Champions | 8,011 | 27.5% | R$334 |
  | Loyal Customers | 31,473 | 56.7% | R$215 |
  | Potential Loyalists | 38,408 | 80.1% | R$130 |
  | At Risk | 12,298 | 97.4% | R$69 |
  | Lost | 3,168 | 100% | R$48 |

  Source of truth: customer_summary_with_segments.csv in the
  ecommerce-churn-analysis repo. The README segment table is out of date.

---

## 3. AI-Powered Job Market Intelligence & Skill Gap Analyzer

**Repo:** `https://github.com/SnehanSnehan/ai_job_market_intelligence`
**Tags:** Python, Streamlit, Pandas, NLP
**Live demo:** deployable via Streamlit Community Cloud (not yet deployed — see
note in Section 6 below)

- **Situation:** Job postings for AI/data roles list dozens of tools and skills,
  but it's hard to tell which ones actually matter versus which are boilerplate.
- **Task:** Build a system to extract and rank in-demand skills from real job
  postings, then let a user compare their own skill set against actual market demand.
- **Action:** I built a Python pipeline (Pandas/NumPy) to clean and process real
  job posting data, extracting and ranking the top in-demand skills per role. I
  built an interactive Streamlit dashboard where a user selects a role, sees the
  top skills ranked by frequency, and gets a personalized skill-gap analysis
  against their own profile with tailored learning recommendations, backed by
  Seaborn/Matplotlib visualizations of demand trends.
- **Result:** A working, runnable dashboard (`streamlit run src/app.py`) that
  turns raw job posting data into a personalized, actionable skill roadmap rather
  than a static report.
- **Metrics:** role-based skill ranking · personalized gap analysis · interactive
  Streamlit dashboard

---

## 4. Tourism Infrastructure Spatial Analysis

**Repo:** `https://github.com/SnehanSnehan/karnataka-tourism-spatial-analysis`
**Tags:** PostgreSQL, PostGIS, QGIS, Spatial SQL

- **Situation:** University project (CS621C – Spatial Databases, Maynooth
  University) examining how tourism infrastructure is actually distributed across
  Karnataka's districts, versus how it's assumed to be distributed.
- **Task:** Quantify infrastructure concentration and accessibility using real
  geospatial data at district scale, in a way that could support an actual
  investment/policy argument.
- **Action:** I modelled 691 tourist attractions, 1,499 hotels, and 5,854
  restaurants (OpenStreetMap + DataMeet district boundary data) in PostgreSQL 18
  with the PostGIS 3.6 extension. I wrote spatial queries using ST_Intersects
  (assigning points to districts), ST_DWithin (2km proximity/buffer analysis), and
  ST_Distance (nearest-neighbor calculations using the geography type for accurate
  meter-based distance) — plus materialized views and GIST indexes for query
  performance. I built choropleth maps in QGIS to visualize concentration by
  district.
- **Result:** Found that Bangalore alone holds 4,937 of the 8,044 facilities in the
  dataset, while rural districts like Haveri have only 12 facilities total. Also
  surfaced that rural heritage sites can be 20+ km from the nearest hotel, versus
  200-500m in urban areas.
- **Metrics:** 8,000+ facilities analyzed · 30 districts covered · 4,937 of 8,044
  facilities in Bangalore · Bangalore has 14x Mysore's facilities

---

## 5. Global Health Indicators Analysis

**Repo:** `https://github.com/SnehanSnehan/global-health-indicators-analysis`
**Tags:** R, ggplot2, Statistical Analysis

- **Situation:** Understanding what actually drives population health outcomes
  globally requires looking past single-country statistics to real cross-country
  patterns in spending, mortality, and life expectancy.
- **Task:** Analyze WHO/World Bank/UN health indicator data (1999–2022) to test
  specific hypotheses about healthcare spending, life expectancy, and mortality.
- **Action:** I cleaned and standardized country-level health data spanning over
  two decades, handling missing values and building regional groupings for
  comparison. I used R (dplyr, ggplot2, tidyr) to analyze the relationship between
  per-capita healthcare spending and life expectancy, regional disparities in
  child mortality, and the relationship between spending and maternal mortality,
  producing a full reproducible R Markdown report with supporting visualizations.
- **Result:** Found a strong positive correlation between healthcare spending and
  life expectancy — with diminishing returns above roughly $2,000 per-capita
  spend — and a strong inverse correlation between spending and maternal
  mortality, with Sub-Saharan Africa and South Asia showing the highest child/
  maternal mortality rates.
- **Metrics:** data spanning 1999–2022 · 4 major visualizations produced ·
  cross-country regional comparison

---

## 6. Ironman Ireland 2022: Performance Analysis

**Repo:** `https://github.com/SnehanSnehan/ironman-ireland-2022-analysis`
**Tags:** R, Statistical Analysis, Sports Analytics

- **Situation:** Endurance race performance is often discussed anecdotally —
  this project set out to quantify what actually drives finishing time using real
  competition data.
- **Task:** Analyze race data from Ironman Ireland 2022 to identify which factors
  (age, gender, race segment) most affect overall performance.
- **Action:** I processed race data from 1,045 athletes, converting race times
  from HH:MM:SS into numeric hours, extracting age from age-group categories, and
  reshaping the data for segment-level (swim/bike/run) comparison. Using R
  (dplyr, ggplot2), I analyzed performance by age group, gender, and race segment,
  and compared professional athletes against age-groupers.
- **Result:** On average, finishers spent about 1h19 swimming, 6h54 cycling and
  4h59 running. Professional athletes finished 3-4 hours faster than
  age-groupers, and average finish time was 13.5 hours — with a clear but
  non-deterministic age-performance correlation (some 50+ and 60+ athletes still
  posted competitive times).
- **Metrics:** 1,045 athletes analyzed · full 3-segment (swim/bike/run) breakdown
  · pro vs. age-group performance comparison

---

## 6. Placeholder / follow-up notes for Claude Code

- **LinkedIn URL** — still a placeholder (`linkedin.com/in/Snehan`) unless Snehan
  has confirmed the real one; check before removing the placeholder comment.
- **Job Market Analyzer live demo** — not yet deployed anywhere live. Do NOT add a
  "live demo" link/button for this project until Snehan confirms it's actually
  been deployed (e.g. to Streamlit Community Cloud). For now, only the GitHub
  source link should appear for this project.
- **"Explainable AI for Precision Agriculture" project — REMOVE ENTIRELY** if it
  was already scaffolded into `projects.ts` or anywhere else in the codebase. No
  real repo exists for it; it must not appear anywhere on the live site.
