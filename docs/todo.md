# Project Todo Lists

## Phase 1: Foundation And Content Shell

- [x] Verify Next.js 16 app-router, MDX, and metadata conventions from installed docs or current official docs.
- [x] Install and configure shadcn/ui for this project.
- [x] Define custom design tokens for the tinted white/blue theme and polished ink-dark theme.
- [x] Create locale routing with `/en` and `/ar` route prefixes.
- [x] Add RTL support for Arabic routes.
- [x] Choose and configure MDX support.
- [x] Create the base course layout: left course map, center lesson, right progress/checklist panel.
- [x] Create mobile lesson-first layout.
- [x] Build reusable lesson components: callout, warning, command block, reference box, checklist, OS tabs, lesson navigation.
- [x] Build the mission-control landing/course entry page.
- [x] Create placeholder MDX lessons in English and Arabic for every planned module.
- [x] Add a language switcher that maps equivalent pages between locales.
- [x] Add theme toggle for light and dark mode.

## Phase 2: Core Course Content

- [x] Write the welcome and workshop orientation lesson.
- [x] Write the “What AI agents are” lesson.
- [x] Write the OpenCode concept/demo lesson.
- [x] Write the Windows setup lesson.
- [x] Write the basic Linux guide.
- [x] Write the Node and npm setup lesson.
- [x] Verify official OpenCode installation instructions.
- [x] Write the OpenCode installation and hands-on usage lesson.
- [x] Write the personal portfolio build lesson.
- [x] Write the Git and GitHub setup lesson.
- [x] Write the secrets safety checklist lesson.
- [x] Write the deployment choice overview.
- [x] Write the Vercel deployment guide.
- [x] Write the Netlify deployment guide.
- [x] Write the GitHub Pages deployment guide for static-compatible projects.
- [x] Translate or co-write all core lessons in light Sudanese Arabic.
- [x] Add inline official references and end-of-lesson reference boxes.
- [x] Add “what just happened?” explanations after important commands.
- [x] Add safety labels to risky command blocks.

## Phase 3: Agent Catalog And References

- [x] Define the agent catalog data model for static content.
- [x] Add OpenCode catalog entry.
- [x] Add OpenAI Codex catalog entry.
- [x] Add Claude Code catalog entry.
- [x] Add Cursor catalog entry.
- [x] Add Windsurf catalog entry.
- [x] Add GitHub Copilot and Copilot CLI catalog entry where applicable.
- [x] Add Continue catalog entry.
- [x] Add Aider catalog entry.
- [x] Add OpenHands catalog entry.
- [x] Add Pi catalog entry using `https://pi.dev/docs/latest`.
- [ ] Add OpenClaw catalog entry after verifying official docs.
- [ ] Add Hermes catalog entry after verifying official docs.
- [x] Build comparison UI using practical criteria.
- [x] Avoid hard-coded prices, model names, or free-limit promises unless phrased as examples with current-reference links.
- [x] Add a global references page.

## Phase 4: Auth, Database, And Progress

- [x] Install and configure Clerk.
- [x] Add optional sign-in and sign-out UI.
- [x] Protect only user-specific progress/admin routes, not public lessons.
- [x] Configure Neon database connection.
- [x] Install and configure Drizzle ORM.
- [x] Define schema for users/profiles, preferences, lesson progress, checklist progress, project links, and course events.
- [x] Add migration workflow.
- [x] Save completed lessons for signed-in users.
- [x] Save completed checklist items for signed-in users.
- [x] Save selected locale and OS/path preferences.
- [x] Add nickname editing.
- [x] Add optional GitHub project URL submission.
- [x] Add optional deployed portfolio URL submission.
- [x] Validate submitted URLs as plain URLs and warn against private/tokenized links.
- [x] Keep anonymous/local progress behavior for unsigned users if feasible.
- [x] Ensure no secrets, tokens, `.env` content, or command contents are stored.

## Phase 5: Admin Analytics And Leaderboard

- [x] Add admin email allowlist configuration.
- [x] Restrict admin routes to allowlisted emails.
- [x] Build admin overview page.
- [x] Show aggregate lesson completion stats.
- [x] Show aggregate checklist completion stats.
- [x] Show individual student progress.
- [x] Show submitted project links.
- [x] Add progress reset capability if needed.
- [x] Build competitive leaderboard based on safe achievements.
- [x] Use nicknames publicly and never display emails on the public leaderboard.
- [x] Define leaderboard scoring rules.
- [x] Add milestone badges for safe achievements.
- [x] Decide whether analytics export belongs in v1 or later.

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

- [x] Run linting.
- [x] Run production build.
- [x] Test public course access while signed out.
- [ ] Test sign-in and saved progress.
- [ ] Test admin access with allowlisted email.
- [ ] Test non-admin denial for admin routes.
- [x] Test locale switching between equivalent English and Arabic pages.
- [x] Test RTL layout for Arabic pages.
- [x] Test light and dark themes.
- [x] Test desktop three-zone layout.
- [x] Test mobile lesson-first layout.
- [x] Test copy buttons and command block behavior.
- [ ] Review all official references.
- [x] Check that no secrets are committed.
- [x] Check that `.env*` files are ignored.
- [x] Prepare a short instructor run-of-show for the 2-3 hour session.

## Content Acceptance Checklist

- [x] Every lesson has a clear goal.
- [x] Every lesson has prerequisites.
- [x] Every command has the correct OS label.
- [x] Risky commands have safety warnings.
- [x] Important commands explain expected output.
- [x] Every lesson has checklist items.
- [x] Every install instruction links to official docs.
- [x] Fast-changing model/pricing information links out instead of making fixed promises.
- [x] Arabic content is complete and RTL-friendly.
- [x] Technical terms are understandable in both Arabic and English.

## Security And Privacy Acceptance Checklist

- [x] Public content does not require sign-in.
- [x] Signing in is optional for saved progress.
- [x] API keys and tokens are never stored.
- [x] `.env` contents are never shown in UI.
- [x] Student emails are not shown on the public leaderboard.
- [x] Admin access uses an explicit email allowlist.
- [x] Project URL submissions are optional.
- [x] URL submissions warn against private repos and tokenized links.
- [x] Leaderboard scoring uses safe achievements only.
