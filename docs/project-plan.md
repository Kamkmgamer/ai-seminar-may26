# AI Seminar Website Project Plan

## Purpose

Build a bilingual learning app that introduces non-technical students to practical AI-agent workflows. The site should guide students from a fresh Windows setup to using an AI coding agent, building a personal portfolio, publishing it safely on GitHub, and deploying it online.

The site is both a live-session companion and a lasting reference. Students should be able to follow it during a 2-3 hour workshop, then return later for agent comparisons, setup links, deployment alternatives, and advanced automation material.

## Primary Outcome

By the end of the core path, a student should have:

- Understood what AI agents are and what they can do.
- Installed the required local tools for the workshop.
- Used OpenCode as the hands-on AI coding agent.
- Built a simple personal portfolio or the portfolio they wish they had.
- Created a GitHub account/repository and pushed code safely.
- Avoided committing secrets such as API keys, tokens, or `.env` files.
- Deployed the portfolio using one hosting provider guide.

## Audience

The audience is non-technical beginners. They may not know terminal commands, Node, npm, Git, GitHub, deployment, environment variables, or AI coding-agent workflows.

The teaching style should be friendly, practical, and command-by-command. Lessons should explain what happened after important commands and warn students before risky or system-changing steps.

## Product Shape

This is a full learning app, not only a static documentation site.

Core product capabilities:

- Public lesson reading without signing in.
- Optional Clerk sign-in for saved progress and preferences.
- Neon Postgres database with Drizzle ORM.
- Progress tracking per lesson and per key checklist item.
- Saved preferences for locale, selected OS/path, and learning state.
- Optional project URL submission for GitHub/deployed portfolio milestones.
- Admin analytics for instructors.
- Competitive leaderboard using nicknames and safe achievements.

The app must not store API keys, Telegram bot tokens, pasted terminal commands, private project files, or other secrets.

## Locales

Supported locales:

- English.
- Arabic with light Sudanese flavor.

Locale strategy:

- Use URL-prefixed routes such as `/en/...` and `/ar/...`.
- Arabic pages must use RTL layout.
- Technical terms should appear in both Arabic and English where useful, especially when the terminal or external tools use English labels.
- Content should be written in parallel, but the structure should stay synchronized between locales.

## Content Strategy

Lessons should be authored as static MDX in the repository. This keeps references reviewable, versioned, and intact.

Each lesson should include:

- Clear goal.
- Prerequisites.
- Guided steps.
- Copyable commands where relevant.
- Short explanations after important commands.
- Safety warnings before risky steps.
- Checklist items tied to progress tracking.
- Inline references for installation commands and fast-changing claims.
- An official references box at the end.

Fast-changing details such as model names, prices, free limits, and agent availability should not be hard-coded as promises. Link students to official docs and current model/provider pages instead.

## Reference Policy

Use official sources for:

- Installation commands.
- Agent setup instructions.
- Auth/API configuration.
- CLI usage.
- Deployment provider instructions.
- Pricing-sensitive or model-availability claims.

Community resources can be mentioned as places students may explore, but the site should not endorse specific community tutorials unless explicitly reviewed later.

## Course Structure

Use a hybrid structure: a guided beginner path plus separate reference/catalog material.

Working module order:

1. Welcome and workshop orientation.
2. What AI agents are and how people use them.
3. OpenCode concept/demo before installation.
4. Windows setup path.
5. Basic Linux guide.
6. Node and npm setup.
7. OpenCode installation and hands-on usage.
8. Agent catalog and practical comparison.
9. Build a personal portfolio locally.
10. Git and GitHub setup.
11. Secrets and publishing safety checklist.
12. Deployment provider choice.
13. Advanced OpenClaw walkthrough.
14. Advanced Hermes guide.
15. References and next steps.

The non-negotiable live-session success outcome is a deployed portfolio with safe GitHub workflow. Advanced sections can be completed after the session if time runs short.

## Agent Coverage

Hands-on core agent:

- OpenCode.

Catalog/reference agents:

- OpenCode.
- OpenAI Codex.
- Anthropic Claude Code.
- Cursor.
- Windsurf.
- GitHub Copilot and Copilot CLI if applicable.
- Continue.
- Aider.
- OpenHands.
- Pi, using `https://pi.dev/docs/latest` as the provided source.
- OpenClaw.
- Hermes.

Comparison criteria:

- Cost/auth model, without hard-coded price promises.
- Installation method.
- Supported operating systems.
- Terminal, IDE, desktop, or web workflow.
- Model/provider flexibility.
- Autonomy level.
- Safety controls.
- Best use case.
- Beginner difficulty.
- Official docs link.

## OpenCode Guidance

OpenCode should be the one hands-on agent in the core path.

The course should split OpenCode into two moments:

- Concept/demo before Node: explain what it is, what it can do, and what an agent workflow feels like.
- Installation/use after Node if official installation requires npm or other tooling.

The site should point students toward free/current model options through official or current provider references without naming specific models as permanent recommendations. It should mention that paid/faster models exist, but students should choose based on current needs, preferences, and provider docs.

## Portfolio Project

Students should build a personal portfolio or the portfolio they wish they had.

The project should be simple enough for beginners and useful after the workshop. It should avoid databases, complex auth, or backend setup in the student project.

The course should also explain that AI agents are not only for websites. Include safe inspirational examples, such as using an agent to help diagnose computer problems or plan an Android ADB audit, with strong warnings about backups, understanding commands, and avoiding destructive actions.

## GitHub And Secrets Safety

The GitHub section must include a required safety checklist.

Checklist topics:

- Create and understand `.gitignore`.
- Keep secrets in local environment files such as `.env.local`.
- Never commit `.env*` files or API keys.
- Run `git status` before committing.
- Inspect changes before publishing.
- Use provider dashboard environment variables for deployment secrets.
- Rotate any secret that was accidentally exposed.
- Never paste tokens into public chats, repos, screenshots, or leaderboard submissions.

## Deployment

Students should choose one deployment guide.

Deployment providers to cover:

- Vercel, recommended for Next.js projects.
- Netlify as an alternative.
- GitHub Pages only where the project is static-compatible.

Each deployment guide should include prerequisites, expected result, common failure points, and references to official docs.

## Advanced Agents

Advanced sections should cover:

- OpenClaw with Telegram linking as a hands-on walkthrough.
- Hermes as an advanced guide.

OpenClaw should be presented after safety guidance. Even if the agent runs locally, the course should explain that inference or connected services may use cloud infrastructure depending on setup. Students should avoid sharing secrets or sensitive files with any agent.

All exact claims about OpenClaw and Hermes behavior, installation, local/cloud boundaries, and Telegram integration must be verified against current official docs before publishing.

## UI Direction

Use shadcn/ui with a custom, polished lab-notebook visual identity.

Design scene:

- A student in a bright classroom with a laptop, slightly anxious about terminals, following a live instructor while keeping one eye on progress and one eye on copy-paste commands.

Visual direction:

- Tinted white and blue palette.
- Off-white surfaces rather than pure white.
- Ink-blue text rather than pure black.
- Royal-blue actions and soft sky-blue highlights.
- Polished ink-dark theme for dark mode.
- No generic SaaS dashboard look.
- No neon cyber aesthetic by default.

Desktop lesson layout:

- Left course map/sidebar.
- Center lesson content.
- Right sticky checklist, references, and progress panel.

Mobile lesson layout:

- Lesson content first.
- Navigation and checklist collapse into mobile-friendly controls.

Command blocks:

- OS label.
- Copy button.
- Explanation.
- Expected result/check.
- Safety label for commands that install software, change files, or affect system state.

Landing/course entry:

- Mission-control style.
- Fast access to the course path.
- Session agenda.
- Progress summary.
- Agent/reference shortcuts.

## Auth, Progress, Admin, And Leaderboard

Authentication:

- Clerk.
- Optional sign-in.
- Content remains public.

Database:

- Neon Postgres.
- Drizzle ORM.

Saved student data:

- Completed lessons.
- Completed checklist items.
- Selected locale.
- Selected OS/path.
- Nickname.
- Optional GitHub and deployed project URLs.
- Course event timestamps needed for progress and leaderboard.

Do not save:

- API keys.
- Telegram tokens.
- `.env` content.
- Terminal command contents pasted by students.
- Private project files.

Admin access:

- Email allowlist.
- All other signed-in users default to student.

Admin analytics:

- Student progress.
- Lesson completion.
- Checklist completion.
- Project URL submissions.
- Leaderboard standings.
- Aggregate completion charts.

Leaderboard:

- Competitive ranking is allowed.
- Use nickname-preferred public identity.
- Never show student email addresses publicly.
- Rank by safe achievements, not secrets, raw terminal activity, or invasive tracking.

## Implementation Phases

Phase 1 should build the public bilingual content shell first.

Recommended phase order:

1. Content shell, routing, MDX, locales, UI system, and core lesson structure.
2. Core lesson content for Windows, Node/npm, OpenCode, portfolio, GitHub safety, and deployment.
3. Clerk authentication, Neon database, Drizzle schema, and saved progress/preferences.
4. Admin analytics and leaderboard.
5. Agent catalog expansion and official reference verification.
6. OpenClaw and Hermes advanced walkthroughs.
7. Polish, accessibility, responsive QA, and final session readiness.

## Open Questions To Resolve During Implementation

- Exact Next.js 16 MDX setup and routing conventions after checking current docs/dependencies.
- Official OpenCode installation paths for Windows and whether non-npm install is supported.
- Current official docs for OpenClaw, Telegram linking, and cloud/local boundaries.
- Current official docs for Hermes.
- Exact shadcn/ui setup for this Next/Tailwind version.
- Final database schema once the progress and leaderboard event model is implemented.
- Whether admin analytics should include exports in v1 or later.
