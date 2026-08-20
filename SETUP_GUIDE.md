# How to use this with Claude Code Desktop

This folder is a ready-to-use Claude Code project setup. It gives Claude Code:
- A `CLAUDE.md` — the rules it follows automatically every session (one step at a
  time, checkpoints, asks before deciding, explains things plainly)
- A `PORTFOLIO_SPEC.md` — the full content/design spec, so it never has to guess
  what the site should contain or look like
- Four subagents in `.claude/agents/` — specialists for design system, page
  building, QA/debugging, and deployment

## Step 1 — Install Claude Code Desktop

If you don't have it yet, download it from claude.com. Open it once installed.

## Step 2 — Create your project folder

On your computer, create a new empty folder for the project, e.g.:

```
snehan-portfolio/
```

Copy everything from this delivered folder into it — you should end up with:

```
snehan-portfolio/
├── CLAUDE.md
├── PORTFOLIO_SPEC.md
└── .claude/
    └── agents/
        ├── design-system-builder.md
        ├── page-builder.md
        ├── qa-debugger.md
        └── deploy-engineer.md
```

## Step 3 — Open this folder in Claude Code Desktop

Open Claude Code Desktop and open `snehan-portfolio` as the project folder. Claude
Code automatically reads `CLAUDE.md` and the subagent definitions from `.claude/agents/`
— you don't need to paste anything manually.

## Step 4 — Start the build

In the chat, just say:

```
Let's start. Read CLAUDE.md and PORTFOLIO_SPEC.md, give me the project state
assessment, and begin with the design system.
```

Because the folder is empty at first, the state assessment will correctly say
"nothing built yet" and it'll start with scaffolding the Next.js project, then hand
off to the design-system-builder subagent for the visual foundation.

## What to expect, step by step

1. **Scaffold** — Next.js + Tailwind project gets initialized
2. **Design system** (`design-system-builder`) — colors, fonts, animated hero
   graphic, shared header/footer — you'll be asked to check this in your browser
   before it moves on
3. **Home page** (`page-builder`) — first real page, reuses the design system
4. **Projects + project detail pages** (`page-builder`)
5. **About page** (`page-builder`)
6. **Contact page** (`page-builder`)
7. **QA pass** (`qa-debugger`) — full check across all pages, links, mobile,
   console errors
8. **Deploy** (`deploy-engineer`) — goes live on Vercel

At every step, it will stop and ask you to confirm a checkpoint before continuing —
that's intentional, not a bug. If something looks wrong, just describe what you see
and it'll fix it before moving forward.

## When you come back to a session later

Just start your message with "I'm back" or "resuming" — `CLAUDE.md` has a specific
protocol for that, so it'll re-check your files and tell you exactly where you left
off, instead of you having to remember or re-explain.

## Before you actually send the link to recruiters

`PORTFOLIO_SPEC.md` Section 6 lists placeholder values (your GitHub URL, LinkedIn
URL, and a live demo link) that were deliberately left as placeholders rather than
guessed. `deploy-engineer` will remind you about these after deployment, but don't
skip it — replace them with your real links before sharing the site.
