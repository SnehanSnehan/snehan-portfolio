export type Project = {
  slug: string;
  title: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  // Hand-written <meta> / Open Graph description: <= 155 characters, no truncation,
  // and only claims and figures that appear on this project's page.
  metaDescription: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  metrics: string[];
};

// Order below is the full /projects page order (per PROJECT_DATA_UPDATE.md).
// The Home page's featured section uses the first 3, in this same order.
export const projects: Project[] = [
  {
    slug: "graduate-job-internship-tracker",
    title: "Graduate Job & Internship Tracker",
    tags: ["MERN", "Docker", "JWT Auth", "REST APIs"],
    githubUrl: "https://github.com/SnehanSnehan/graduate-job-internship-tracker",
    metaDescription:
      "A multi-user job and internship application tracker with JWT auth, 2 external API integrations and 5 design patterns. Deployable with docker compose up.",
    situation:
      "A team project (3-person) for Maynooth University's Internet Solutions Engineering module — university students often lose track of job/internship applications, deadlines, and statuses across multiple platforms.",
    task: "Build a full-stack web app with real authentication, multi-user support, external API integration, and a containerized deployment — meeting academic requirements for layered architecture and design patterns.",
    action:
      "I served as Backend Lead and Team Lead. I built the Express.js server, JWT authentication system, all API route handlers, and the external API integrations with RemoteOK (live remote job listings) and RestCountries (location data). I implemented the middleware chain (helmet, morgan, cors, JWT auth guard) and structured the backend around MVC, Repository, and Singleton patterns. I coordinated the team's GitLab branching strategy and repository setup. The frontend (React/Vite, Recharts analytics dashboard, React Context for auth state) and database/Docker orchestration were built by my teammates, with me integrating my backend work against their schemas and containers.",
    result:
      "A fully working multi-user application — users register, log in with JWT auth, track applications through a full pipeline (Applied → Interview → Offer → Accepted/Rejected), pull live job listings from an external API, and view analytics on their application activity. Deployable end-to-end via a single `docker compose up` from a clean clone, with a full CI/CD pipeline on GitLab.",
    metrics: [
      "2 external API integrations",
      "5 design patterns implemented",
      "full Docker + CI/CD deployment",
      "multi-user with role-based (admin/user) access",
    ],
  },
  {
    slug: "ecommerce-churn-analysis",
    title: "E-Commerce Customer Churn Analysis",
    tags: ["R", "RFM Segmentation", "Predictive Modeling"],
    githubUrl: "https://github.com/SnehanSnehan/ecommerce-churn-analysis",
    metaDescription:
      "Analysis of 99,441 e-commerce transactions found a 70.7% baseline churn rate and 12,298 at-risk customers, across 5 RFM customer segments.",
    situation:
      "E-commerce businesses often don't know which customers are about to churn until it's too late — most analysis is reactive rather than predictive.",
    task: "Analyze real transaction data from a Brazilian e-commerce marketplace to understand churn drivers and produce concrete, data-backed retention recommendations, not just descriptive statistics.",
    action:
      "I worked with 99,441 real transactions across 93,358 customers (Olist/Kaggle dataset, Sep 2016–Oct 2018). I built an RFM (Recency, Frequency, Monetary) segmentation model to split customers into 5 distinct groups — Champions, Loyal, Potential Loyalists, At Risk, and Lost — then trained a logistic regression model to identify customers at risk of churning before they actually left. I translated the statistical output into a 3-tier business strategy (immediate/medium-term/long-term actions) with recommended actions for each tier.",
    result:
      "Identified a 70.7% baseline churn rate and 12,298 \"at-risk\" customers for immediate re-engagement. Illustrative scenario: if 10% of At Risk customers (about 1,230) moved up to Loyal-level spend (R$215 vs R$69 average), that is roughly R$180K in revenue.",
    metrics: [
      "99,441 transactions analyzed",
      "5 customer segments identified",
      "70.7% churn rate diagnosed",
    ],
  },
  {
    slug: "ai-job-market-intelligence",
    title: "AI-Powered Job Market Intelligence & Skill Gap Analyzer",
    tags: ["Python", "Streamlit", "Pandas", "NLP"],
    githubUrl: "https://github.com/SnehanSnehan/ai_job_market_intelligence",
    // No live demo link — not yet deployed. Do not add one until confirmed deployed
    // (e.g. Streamlit Community Cloud), per PROJECT_DATA_UPDATE.md Section 6.
    metaDescription:
      "SQL appears in 46% of the 12,217 job postings analysed (67% of data analyst postings). A Streamlit dashboard adds a personalized skill-gap analysis.",
    situation:
      "Job postings for AI/data roles list dozens of tools and skills, but it's hard to tell which ones actually matter versus which are boilerplate.",
    task: "Build a system to extract and rank in-demand skills from real job postings, then let a user compare their own skill set against actual market demand.",
    action:
      "I built a Python pipeline (Pandas/NumPy) to clean and process real job posting data, extracting and ranking the top in-demand skills per role. I built an interactive Streamlit dashboard where a user selects a role, sees the top skills ranked by frequency, and gets a personalized skill-gap analysis against their own profile with tailored learning recommendations, backed by Seaborn/Matplotlib visualizations of demand trends.",
    result:
      "A working, runnable dashboard (`streamlit run src/app.py`) that turns raw job posting data into a personalized, actionable skill roadmap rather than a static report. SQL appears in 46% of the 12,217 postings analysed (67% of data analyst postings).",
    metrics: [
      "12,217 postings analysed",
      "SQL in 46% of postings",
      "SQL in 67% of data analyst postings",
    ],
  },
  {
    slug: "tourism-spatial-analysis",
    title: "Tourism Infrastructure Spatial Analysis",
    tags: ["PostgreSQL", "PostGIS", "QGIS", "Spatial SQL"],
    githubUrl: "https://github.com/SnehanSnehan/karnataka-tourism-spatial-analysis",
    metaDescription:
      "Bangalore holds 4,937 of the 8,044 tourism facilities in the dataset, 14.5x Mysore's. Spatial SQL and PostGIS analysis of Karnataka's districts.",
    situation:
      "University project (CS621C – Spatial Databases, Maynooth University) examining how tourism infrastructure is actually distributed across Karnataka's districts, versus how it's assumed to be distributed.",
    task: "Quantify infrastructure concentration and accessibility using real geospatial data at district scale, in a way that could support an actual investment/policy argument.",
    action:
      "I modelled 691 tourist attractions, 1,499 hotels, and 5,854 restaurants (OpenStreetMap + DataMeet district boundary data) in PostgreSQL 18 with the PostGIS 3.6 extension. I wrote spatial queries using ST_Intersects (assigning points to districts), ST_DWithin (2km proximity/buffer analysis), and ST_Distance (nearest-neighbor calculations using the geography type for accurate meter-based distance) — plus materialized views and GIST indexes for query performance. I built choropleth maps in QGIS to visualize concentration by district.",
    result:
      "Found that Bangalore alone holds 4,937 of the 8,044 facilities in the dataset, while rural districts like Haveri have only 12 facilities total. Also surfaced that rural heritage sites can be 20+ km from the nearest hotel, versus 200-500m in urban areas.",
    metrics: [
      "8,000+ facilities analyzed",
      "30 districts covered",
      "4,937 of 8,044 facilities in Bangalore",
      "Bangalore has 14.5x Mysore's facilities",
    ],
  },
  {
    slug: "global-health-indicators-analysis",
    title: "Global Health Indicators Analysis",
    tags: ["R", "ggplot2", "Statistical Analysis"],
    githubUrl: "https://github.com/SnehanSnehan/global-health-indicators-analysis",
    metaDescription:
      "Spending share of GDP and life expectancy are positively but only weakly related (r = 0.29 across 145 countries in 2019), using World Bank indicators.",
    situation:
      "Understanding what actually drives population health outcomes globally requires looking past single-country statistics to real cross-country patterns in spending, mortality, and life expectancy.",
    task: "Analyze WHO/World Bank/UN health indicator data (1999–2022) to test specific hypotheses about healthcare spending, life expectancy, and mortality.",
    action:
      "I cleaned and standardized country-level health data spanning over two decades, handling missing values and building regional groupings for comparison. I used R (dplyr, ggplot2, tidyr) to analyze the relationship between healthcare spending (as a share of GDP) and life expectancy, regional disparities in child mortality, and the relationship between spending and maternal mortality, producing a full reproducible R Markdown report with supporting visualizations.",
    result:
      "Spending share of GDP and life expectancy are positively but only weakly related (r = 0.29 across 145 countries in 2019). Africa's median under-5 mortality (55.6 per 1,000) is about 9x North America's and 15x Europe's. Africa gained about 9 years of life expectancy between 2000 and 2019 (54.7 to 63.9), and the gap to Europe narrowed from about 21 to about 17 years.",
    metrics: [
      "data spanning 1999–2022",
      "4 major visualizations produced",
      "cross-country regional comparison",
    ],
  },
  {
    slug: "ironman-ireland-2022-analysis",
    title: "Ironman Ireland 2022: Performance Analysis",
    tags: ["R", "Statistical Analysis", "Sports Analytics"],
    githubUrl: "https://github.com/SnehanSnehan/ironman-ireland-2022-analysis",
    metaDescription:
      "What drives finishing time at Ironman Ireland 2022? On average, finishers spent about 1h19 swimming, 6h54 cycling and 4h59 running.",
    situation:
      "Endurance race performance is often discussed anecdotally — this project set out to quantify what actually drives finishing time using real competition data.",
    task: "Analyze race data from Ironman Ireland 2022 to identify which factors (age, gender, race segment) most affect overall performance.",
    action:
      "I processed race data from 1,045 athletes, converting race times from HH:MM:SS into numeric hours, extracting age from age-group categories, and reshaping the data for segment-level (swim/bike/run) comparison. Using R (dplyr, ggplot2), I analyzed performance by age group, gender, and race segment, and compared professional athletes against age-groupers.",
    result:
      "On average, finishers spent about 1h19 swimming, 6h54 cycling and 4h59 running. Professional athletes finished 3-4 hours faster than age-groupers, and average finish time was 13.5 hours — with a clear but non-deterministic age-performance correlation (some 50+ and 60+ athletes still posted competitive times).",
    metrics: [
      "1,045 athletes analyzed",
      "full 3-segment (swim/bike/run) breakdown",
      "pro vs. age-group performance comparison",
    ],
  },
];
