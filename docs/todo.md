# Project Todo Lists

## Phase 1: Foundation And Content Shell

- [ ] Verify Next.js 16 app-router, MDX, and metadata conventions from installed docs or current official docs.
- [ ] Install and configure shadcn/ui for this project.
- [ ] Define custom design tokens for the tinted white/blue theme and polished ink-dark theme.
- [ ] Create locale routing with `/en` and `/ar` route prefixes.
- [ ] Add RTL support for Arabic routes.
- [ ] Choose and configure MDX support.
- [ ] Create the base course layout: left course map, center lesson, right progress/checklist panel.
- [ ] Create mobile lesson-first layout.
- [ ] Build reusable lesson components: callout, warning, command block, reference box, checklist, OS tabs, lesson navigation.
- [ ] Build the mission-control landing/course entry page.
- [ ] Create placeholder MDX lessons in English and Arabic for every planned module.
- [ ] Add a language switcher that maps equivalent pages between locales.
- [ ] Add theme toggle for light and dark mode.

## Phase 2: Core Course Content

- [ ] Write the welcome and workshop orientation lesson.
- [ ] Write the “What AI agents are” lesson.
- [ ] Write the OpenCode concept/demo lesson.
- [ ] Write the Windows setup lesson.
- [ ] Write the basic Linux guide.
- [ ] Write the Node and npm setup lesson.
- [ ] Verify official OpenCode installation instructions.
- [ ] Write the OpenCode installation and hands-on usage lesson.
- [ ] Write the personal portfolio build lesson.
- [ ] Write the Git and GitHub setup lesson.
- [ ] Write the secrets safety checklist lesson.
- [ ] Write the deployment choice overview.
- [ ] Write the Vercel deployment guide.
- [ ] Write the Netlify deployment guide.
- [ ] Write the GitHub Pages deployment guide for static-compatible projects.
- [ ] Translate or co-write all core lessons in light Sudanese Arabic.
- [ ] Add inline official references and end-of-lesson reference boxes.
- [ ] Add “what just happened?” explanations after important commands.
- [ ] Add safety labels to risky command blocks.

## Phase 3: Agent Catalog And References

- [ ] Define the agent catalog data model for static content.
- [ ] Add OpenCode catalog entry.
- [ ] Add OpenAI Codex catalog entry.
- [ ] Add Claude Code catalog entry.
- [ ] Add Cursor catalog entry.
- [ ] Add Windsurf catalog entry.
- [ ] Add GitHub Copilot and Copilot CLI catalog entry where applicable.
- [ ] Add Continue catalog entry.
- [ ] Add Aider catalog entry.
- [ ] Add OpenHands catalog entry.
- [ ] Add Pi catalog entry using `https://pi.dev/docs/latest`.
- [ ] Add OpenClaw catalog entry after verifying official docs.
- [ ] Add Hermes catalog entry after verifying official docs.
- [ ] Build comparison UI using practical criteria.
- [ ] Avoid hard-coded prices, model names, or free-limit promises unless phrased as examples with current-reference links.
- [ ] Add a global references page.

## Phase 4: Auth, Database, And Progress

- [ ] Install and configure Clerk.
- [ ] Add optional sign-in and sign-out UI.
- [ ] Protect only user-specific progress/admin routes, not public lessons.
- [ ] Configure Neon database connection.
- [ ] Install and configure Drizzle ORM.
- [ ] Define schema for users/profiles, preferences, lesson progress, checklist progress, project links, and course events.
- [ ] Add migration workflow.
- [ ] Save completed lessons for signed-in users.
- [ ] Save completed checklist items for signed-in users.
- [ ] Save selected locale and OS/path preferences.
- [ ] Add nickname editing.
- [ ] Add optional GitHub project URL submission.
- [ ] Add optional deployed portfolio URL submission.
- [ ] Validate submitted URLs as plain URLs and warn against private/tokenized links.
- [ ] Keep anonymous/local progress behavior for unsigned users if feasible.
- [ ] Ensure no secrets, tokens, `.env` content, or command contents are stored.

## Phase 5: Admin Analytics And Leaderboard

- [ ] Add admin email allowlist configuration.
- [ ] Restrict admin routes to allowlisted emails.
- [ ] Build admin overview page.
- [ ] Show aggregate lesson completion stats.
- [ ] Show aggregate checklist completion stats.
- [ ] Show individual student progress.
- [ ] Show submitted project links.
- [ ] Add progress reset capability if needed.
- [ ] Build competitive leaderboard based on safe achievements.
- [ ] Use nicknames publicly and never display emails on the public leaderboard.
- [ ] Define leaderboard scoring rules.
- [ ] Add milestone badges for safe achievements.
- [ ] Decide whether analytics export belongs in v1 or later.

## Phase 6: Advanced Agents

- [ ] Verify official OpenClaw docs and exact installation instructions.
- [ ] Verify OpenClaw local/cloud boundaries and describe them accurately.
- [ ] Verify Telegram linking flow for OpenClaw.
- [ ] Write OpenClaw prerequisites and safety checklist.
- [ ] Write OpenClaw hands-on walkthrough.
- [ ] Verify official Hermes docs and exact setup instructions.
- [ ] Write Hermes guide.
- [ ] Add advanced warnings about local files, tokens, cloud inference, and connected services.
- [ ] Translate advanced sections into light Sudanese Arabic.

## Phase 7: Quality, Accessibility, And Session Readiness

- [ ] Run linting.
- [ ] Run production build.
- [ ] Test public course access while signed out.
- [ ] Test sign-in and saved progress.
- [ ] Test admin access with allowlisted email.
- [ ] Test non-admin denial for admin routes.
- [ ] Test locale switching between equivalent English and Arabic pages.
- [ ] Test RTL layout for Arabic pages.
- [ ] Test light and dark themes.
- [ ] Test desktop three-zone layout.
- [ ] Test mobile lesson-first layout.
- [ ] Test copy buttons and command block behavior.
- [ ] Review all official references.
- [ ] Check that no secrets are committed.
- [ ] Check that `.env*` files are ignored.
- [ ] Prepare a short instructor run-of-show for the 2-3 hour session.

## Content Acceptance Checklist

- [ ] Every lesson has a clear goal.
- [ ] Every lesson has prerequisites.
- [ ] Every command has the correct OS label.
- [ ] Risky commands have safety warnings.
- [ ] Important commands explain expected output.
- [ ] Every lesson has checklist items.
- [ ] Every install instruction links to official docs.
- [ ] Fast-changing model/pricing information links out instead of making fixed promises.
- [ ] Arabic content is complete and RTL-friendly.
- [ ] Technical terms are understandable in both Arabic and English.

## Security And Privacy Acceptance Checklist

- [ ] Public content does not require sign-in.
- [ ] Signing in is optional for saved progress.
- [ ] API keys and tokens are never stored.
- [ ] `.env` contents are never shown in UI.
- [ ] Student emails are not shown on the public leaderboard.
- [ ] Admin access uses an explicit email allowlist.
- [ ] Project URL submissions are optional.
- [ ] URL submissions warn against private repos and tokenized links.
- [ ] Leaderboard scoring uses safe achievements only.
