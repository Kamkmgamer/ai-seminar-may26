import Link from "next/link";
import { notFound } from "next/navigation";

import { CourseShell } from "@/components/course-shell";
import { Button } from "@/components/ui/button";
import { isLocale, lessons, type Locale } from "@/lib/course";

type Tool = {
  name: string;
  file: string;
  role: { en: string; ar: string };
};

const tools: Tool[] = [
  { name: "Claude", file: "claude.svg", role: { en: "Anthropic's reasoning model — careful thinking, code review, long edits.", ar: "موديل التفكير من Anthropic — مراجعة وتعديلات طويلة." } },
  { name: "ChatGPT", file: "openai.svg", role: { en: "OpenAI's all-purpose helper. Where most people ask their first AI question.", ar: "مساعد OpenAI العام. أغلب الناس بتسأل أول سؤال AI هنا." } },
  { name: "OpenCode", file: "opencode.svg", role: { en: "The terminal-native agent we install and run together during the workshop.", ar: "الـagent البنشتغل بيه في الترمنال خلال الورشة." } },
  { name: "Cursor", file: "cursor.svg", role: { en: "An AI-native code editor. Same idea as VS Code, with chat and agents wired in.", ar: "محرر مدمج بـAI. نفس فكرة VS Code، مع شات و agents جوّاه." } },
  { name: "Copilot", file: "copilot.svg", role: { en: "GitHub's inline completions — what AI-in-the-editor felt like first.", ar: "اقتراحات GitHub المباشرة — أول شكل لـAI داخل المحرر." } },
  { name: "VS Code", file: "vscode.svg", role: { en: "The editor most beginners start in. Free and well-documented.", ar: "المحرر البيبدأ بيه أغلب المبتدئين. مجاني وموثّق." } },
  { name: "Node.js", file: "node.svg", role: { en: "The JavaScript runtime that powers the portfolio project.", ar: "بيئة تشغيل JavaScript البتشغل مشروع البورتفوليو." } },
  { name: "npm", file: "npm.svg", role: { en: "The package manager. We use it to install everything else.", ar: "مدير الحزم. بنستخدمه عشان نثبت بقية الأدوات." } },
  { name: "GitHub", file: "github.svg", role: { en: "Where the code lives and where the site gets published from.", ar: "وين الكود بيتخزن، ومنه بنوصل لنشر الموقع." } },
];

const copy = {
  en: {
    badge: "Workshop · 26 May 2026",
    titleA: "A beginner's",
    titleAccent: "field guide",
    titleB: "to working with AI in 2026.",
    intro:
      "No prior coding required. In one workshop you'll set up your machine, learn how AI agents really work, and ship a small portfolio site you can show off.",
    primary: "Start the guide",
    secondary: "What is an agent?",
    statOne: { v: "0", l: "lines of code required to start" },
    statTwo: { v: "8", l: "lessons, English + Arabic" },
    statThree: { v: "1", l: "deployed site you keep" },
    asideLabel: "Live agent session",
    asideCaption:
      "What a real session looks like — a prompt, some thinking, three small tool calls, a green checkmark.",
    chapter1: "Chapter one",
    section1Eyebrow: "Tools you'll meet",
    section1Title: "The actual tools used in this workshop.",
    section1Lede:
      "Not a generic AI showcase. Every name below is something you'll click, install, or chat with during the session — not a logo wall for decoration.",
    chapter2: "Chapter two",
    section2Eyebrow: "By the end of the day",
    section2Title: "Three things you walk out with.",
    builds: [
      {
        t: "A working AI setup",
        d: "Node, npm, an editor, and OpenCode installed and tested on your own laptop. Not a borrowed machine, not a sandbox in a tab. Yours.",
      },
      {
        t: "A real conversation with an agent",
        d: "You'll write a prompt, watch a tool call run, review a diff, and decide whether to accept or push back. The same loop you'll use forever.",
      },
      {
        t: "A live portfolio URL",
        d: "Your name, your projects, deployed to the open web with a free hosting provider. A link you can drop into a CV the same evening.",
      },
    ],
    chapter3: "Chapter three",
    section3Eyebrow: "The path",
    section3Title: "Eight short lessons, one clear arc.",
    section3Lede:
      "Each one is built to be read in under twenty minutes. The first two are live; the rest unlock as the workshop runs.",
    chapter4: "A short detour",
    section4Eyebrow: "Safety, not theatre",
    section4Title: "Three rules we keep coming back to.",
    safety: [
      {
        lead: "Never paste secrets.",
        rest: "API keys, tokens, and .env files don't go in chats, screenshots, or commits. Treat them the way you'd treat a house key.",
      },
      {
        lead: "Read before you run.",
        rest: "If an agent asks to run a command, read what it does first. Pause and ask. Curiosity is faster than recovery.",
      },
      {
        lead: "You own the decision.",
        rest: "Agents move fast. Your job is to keep judgment in the loop — the diff is just a suggestion until you accept it.",
      },
    ],
    pullQuote:
      "Use agents to move faster, not to stop thinking.",
    pullQuoteAttribution: "— the rule that runs through every lesson",
    chapter5: "Before you sign up",
    section5Eyebrow: "First questions",
    section5Title: "Things students ask before they show up.",
    faqs: [
      {
        q: "Do I need to know programming?",
        a: "No. We start from a clean laptop and build up. If you've used a browser and a text editor, you have enough to follow along.",
      },
      {
        q: "Which AI tool will we actually use?",
        a: "OpenCode in the terminal as the hands-on agent. Claude and ChatGPT come up as comparison points and helpers, but you don't need a paid account for either.",
      },
      {
        q: "Is the workshop in Arabic or English?",
        a: "Both. The site has a language switch at the top, and the live session moves between Arabic and English depending on the room.",
      },
      {
        q: "What do I need to bring?",
        a: "A laptop with Windows, macOS, or Linux. Admin rights so you can install software. A stable internet connection. That's it.",
      },
    ],
    sessionLabels: {
      youSay: "you",
      agentSay: "agent",
      thinking: "thinking",
      read: "Read",
      edit: "Edit",
      bash: "Bash",
      prompt: "build me a portfolio site with my name",
      reply: "I'll start by reading your project layout.",
      cmd: "pnpm dev",
      ok: "ready on http://localhost:3000",
      file: "app/page.tsx",
    },
  },
  ar: {
    badge: "ورشة · 26 مايو 2026",
    titleA: "دليل ميداني",
    titleAccent: "للمبتدئين",
    titleB: "للشغل مع AI في 2026.",
    intro:
      "ما محتاج تعرف برمجة. في ورشة واحدة بتجهز لابتوبك، بتفهم الـ agents بصورة حقيقية، وبتطلع بموقع بورتفوليو صغير بتقدر تعرضه لأي زول.",
    primary: "ابدأ الدليل",
    secondary: "شنو الـagent؟",
    statOne: { v: "0", l: "سطر كود مطلوب في البداية" },
    statTwo: { v: "8", l: "دروس، إنجليزي + عربي" },
    statThree: { v: "1", l: "موقع منشور يخصك" },
    asideLabel: "جلسة agent حية",
    asideCaption:
      "شكل الجلسة الحقيقية — prompt، شوية تفكير، ثلاث tool calls صغار، وعلامة ✓ خضراء.",
    chapter1: "الفصل الأول",
    section1Eyebrow: "الأدوات",
    section1Title: "الأدوات الفعلية في هذي الورشة.",
    section1Lede:
      "ما عرض عام لأدوات AI. كل اسم تحت دا حاجة بتضغط عليها، بتثبتها، أو بتكلمها في الجلسة — مش جدار شعارات للزينة.",
    chapter2: "الفصل الثاني",
    section2Eyebrow: "بتطلع بشنو؟",
    section2Title: "ثلاث حاجات بتطلع بيهن.",
    builds: [
      {
        t: "بيئة AI شغّالة",
        d: "Node و npm ومحرر و OpenCode مثبتين ومجربين على لابتوبك انت. مش لابتوب مستعار، ولا sandbox في تبويب. لابتوبك.",
      },
      {
        t: "محادثة حقيقية مع agent",
        d: "بتكتب prompt، بتشوف tool call بتشتغل، بتراجع diff، وبتقرر تقبل أو ترفض. نفس اللوب البتستعمله طول العمر.",
      },
      {
        t: "رابط بورتفوليو حي",
        d: "اسمك ومشاريعك، منشورين على الإنترنت من استضافة مجانية. لينك تقدر تحطه في CV في نفس الليلة.",
      },
    ],
    chapter3: "الفصل الثالث",
    section3Eyebrow: "المسار",
    section3Title: "ثمانية دروس قصيرة، قصة واحدة.",
    section3Lede:
      "كل درس مكتوب عشان يتقرى في أقل من عشرين دقيقة. الدرسين الأول جاهزين، والباقي بيفتح مع تقدم الورشة.",
    chapter4: "وقفة قصيرة",
    section4Eyebrow: "أمان حقيقي مش مسرحية",
    section4Title: "ثلاث قواعد بنرجع ليها دايماً.",
    safety: [
      {
        lead: "ما تلصق أسرار.",
        rest: "API keys و tokens وملفات .env ما بتجي في الشات ولا الصور ولا الـ commits. تعامل معاهن زي مفتاح البيت.",
      },
      {
        lead: "اقرأ قبل ما تشغّل.",
        rest: "لو الـ agent طلب يشغل أمر، اقرى شنو بيسوي الأول. وقّف واسأل. الفضول أسرع من الإصلاح.",
      },
      {
        lead: "القرار قرارك.",
        rest: "الـ agents بتمشي بسرعة. شغلك انت تخلي الحكم في اللوب — الـ diff اقتراح لحدي ما تقبله.",
      },
    ],
    pullQuote: "استخدم الـ agents عشان تمشي أسرع، ما عشان تبطل تفكر.",
    pullQuoteAttribution: "— القاعدة البتمشي معاك في كل درس",
    chapter5: "قبل ما تسجل",
    section5Eyebrow: "أسئلة البداية",
    section5Title: "الأسئلة البتجي قبل ما تسجل.",
    faqs: [
      {
        q: "لازم أعرف برمجة؟",
        a: "لا. بنبدأ من لابتوب فاضي وبنبني خطوة خطوة. لو تعرف تستخدم متصفح ومحرر نصوص، انت تمام.",
      },
      {
        q: "أداة AI شنو الح نستعملها؟",
        a: "OpenCode في الترمنال كـagent عملي. Claude و ChatGPT بيظهروا كنقاط مقارنة، وما محتاج اشتراك مدفوع لأي منهم.",
      },
      {
        q: "الورشة عربي والا إنجليزي؟",
        a: "الاتنين. الموقع فيه زر للغة فوق، والجلسة الحية بتلف بين العربي والإنجليزي حسب الحضور.",
      },
      {
        q: "أجيب شنو معاي؟",
        a: "لابتوب ويندوز أو ماك أو لينكس. صلاحيات تثبيت برامج. إنترنت ثابتة. وبس.",
      },
    ],
    sessionLabels: {
      youSay: "انت",
      agentSay: "الوكيل",
      thinking: "بفكر",
      read: "قراءة",
      edit: "تعديل",
      bash: "أمر",
      prompt: "ابني لي بورتفوليو فيه اسمي",
      reply: "حقرى هيكل المشروع الأول.",
      cmd: "pnpm dev",
      ok: "جاهز على http://localhost:3000",
      file: "app/page.tsx",
    },
  },
} as const;

function HandUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 -bottom-1 h-[0.4em] w-full ${className}`}
    >
      <path
        d="M2 9 C 40 2, 80 12, 120 6 S 200 4, 218 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="hand-underline-path"
      />
    </svg>
  );
}

function AgentSession({ locale }: { locale: Locale }) {
  const t = copy[locale].sessionLabels;
  return (
    <figure className="agent-figure relative" dir="ltr">
      <div className="agent-window">
        <div className="agent-titlebar">
          <span className="flex gap-1.5">
            <span className="size-3 rounded-full bg-[#ff5f56]" />
            <span className="size-3 rounded-full bg-[#ffbd2e]" />
            <span className="size-3 rounded-full bg-[#27c93f]" />
          </span>
          <span className="font-mono text-[11px] text-muted-foreground tracking-tight">
            ~ / portfolio / {t.file}
          </span>
          <span className="ml-auto inline-flex items-center">
            <span className="size-1.5 rounded-full bg-emerald-500 agent-pulse-dot" />
          </span>
        </div>

        <div className="agent-body">
          <div className="agent-step" style={{ animationDelay: "120ms" }}>
            <div className="agent-role">{t.youSay}</div>
            <div className="mt-1.5 flex items-center gap-1">
              <span
                className="agent-type whitespace-nowrap font-mono text-sm"
                dir={locale === "ar" ? "rtl" : "ltr"}
              >
                {t.prompt}
              </span>
              <span className="agent-caret inline-block h-4 w-[7px] bg-foreground/80" />
            </div>
          </div>

          <div className="agent-step" style={{ animationDelay: "1200ms" }}>
            <div className="agent-role">{t.agentSay}</div>
            <div className="mt-1.5 flex items-center gap-2 text-muted-foreground">
              <span className="agent-dots inline-flex gap-1">
                <span className="size-1.5 rounded-full bg-current" />
                <span className="size-1.5 rounded-full bg-current" />
                <span className="size-1.5 rounded-full bg-current" />
              </span>
              <span className="font-mono text-xs">{t.thinking}…</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-foreground">{t.reply}</p>
          </div>

          <div className="agent-step" style={{ animationDelay: "2200ms" }}>
            <div className="agent-tool agent-tool-read">
              <div className="agent-tool-head">
                <span className="agent-tool-icon">●</span>
                <span>{t.read}</span>
              </div>
              <div className="agent-tool-body font-mono text-xs">
                app/page.tsx <span className="text-muted-foreground">· 142 lines</span>
              </div>
            </div>
          </div>

          <div className="agent-step" style={{ animationDelay: "3000ms" }}>
            <div className="agent-tool agent-tool-edit">
              <div className="agent-tool-head">
                <span className="agent-tool-icon">✎</span>
                <span>{t.edit}</span>
              </div>
              <div className="agent-tool-body space-y-1 font-mono text-xs">
                <div className="agent-diff-del">
                  - &lt;h1&gt;Default header&lt;/h1&gt;
                </div>
                <div className="agent-diff-add">
                  + &lt;h1&gt;Hi, I&apos;m {locale === "ar" ? "خليل" : "Khalil"}&lt;/h1&gt;
                </div>
              </div>
            </div>
          </div>

          <div className="agent-step" style={{ animationDelay: "3800ms" }}>
            <div className="agent-tool agent-tool-bash">
              <div className="agent-tool-head">
                <span className="agent-tool-icon">$</span>
                <span>{t.bash}</span>
              </div>
              <div className="agent-tool-body space-y-1 font-mono text-xs">
                <div className="text-foreground">$ {t.cmd}</div>
                <div className="agent-ok">
                  <span>✓</span>
                  <span>{t.ok}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const text = copy[locale];

  return (
    <CourseShell locale={locale}>
      <article className="flex flex-col gap-32 pb-20">
        <section className="relative grid items-start gap-14 pt-2 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative flex flex-col gap-8">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-current opacity-50" />
              {text.badge}
            </div>
            <h1 className="max-w-3xl text-[clamp(2.6rem,6vw,5.4rem)] font-semibold leading-[1.12] tracking-[0.005em] [font-variant-ligatures:none]">
              {text.titleA}{" "}
              <span className="relative inline-block whitespace-nowrap text-foreground pb-2">
                <span className="relative z-1">{text.titleAccent}</span>
                <HandUnderline className="text-[color:var(--chart-4)]" />
              </span>{" "}
              {text.titleB}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              {text.intro}
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Button render={<Link href={`/${locale}/learn/welcome`} />} size="lg">
                {text.primary} →
              </Button>
              <Link
                href={`/${locale}/learn/agents`}
                className="text-sm underline decoration-muted-foreground/40 decoration-1 underline-offset-[6px] hover:decoration-foreground"
              >
                {text.secondary}
              </Link>
            </div>
            <div className="mt-2 grid max-w-xl grid-cols-3 gap-x-8">
              {[text.statOne, text.statTwo, text.statThree].map((s) => (
                <div key={s.l}>
                  <div className="text-4xl font-semibold tracking-[-0.04em] text-foreground">{s.v}</div>
                  <div className="mt-1 text-xs leading-snug text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="relative pt-4 lg:pt-12">
            <AgentSession locale={locale} />
          </aside>
        </section>

        <section className="grid gap-12 lg:grid-cols-[12rem_1fr]">
          <header className="lg:sticky lg:top-32 lg:self-start">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{text.chapter1}</div>
            <div className="mt-1 text-xs font-medium text-foreground/70">{text.section1Eyebrow}</div>
          </header>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-[2.5rem]">
              {text.section1Title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
              {text.section1Lede}
            </p>
            <ul className="mt-10 flex flex-col">
              {tools.map((tool, i) => (
                <li
                  key={tool.name}
                  className="group flex items-start gap-5 border-t border-dashed border-foreground/20 dark:border-foreground/25 py-6 first:border-t-0 first:pt-0"
                >
                  <span className="mt-0.5 hidden w-8 text-xs font-mono text-muted-foreground sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/tools/${tool.file}`}
                    alt=""
                    width={28}
                    height={28}
                    className="mt-0.5 size-7 shrink-0 object-contain"
                  />
                  <div className="flex-1">
                    <span className="font-semibold tracking-tight">{tool.name}</span>
                    <span className="ms-2 text-muted-foreground">— {tool.role[locale]}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-[12rem_1fr]">
          <header className="lg:sticky lg:top-32 lg:self-start">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{text.chapter2}</div>
            <div className="mt-1 text-xs font-medium text-foreground/70">{text.section2Eyebrow}</div>
          </header>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-[2.5rem]">
              {text.section2Title}
            </h2>
            <ol className="mt-10 flex flex-col gap-10">
              {text.builds.map((b, i) => (
                <li key={b.t} className="grid gap-x-6 sm:grid-cols-[3rem_1fr]">
                  <span className="font-mono text-3xl text-muted-foreground/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{b.t}</h3>
                    <p className="mt-2 max-w-3xl text-base leading-7 text-muted-foreground">{b.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-[12rem_1fr]">
          <header className="lg:sticky lg:top-32 lg:self-start">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{text.chapter3}</div>
            <div className="mt-1 text-xs font-medium text-foreground/70">{text.section3Eyebrow}</div>
          </header>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-[2.5rem]">
              {text.section3Title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">{text.section3Lede}</p>

            <ol className="mt-10 flex flex-col">
              {lessons.map((lesson, index) => (
                <li key={lesson.slug}>
                  <Link
                    href={lesson.status === "ready" ? `/${locale}/learn/${lesson.slug}` : `/${locale}`}
                    className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-6 gap-y-1 border-t border-dashed border-foreground/20 dark:border-foreground/25 py-6 transition-colors first:border-t-0 first:pt-0 hover:text-foreground"
                  >
                    <span className="font-mono text-sm text-muted-foreground tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {lesson.title[locale]}
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm leading-7 text-muted-foreground">
                        {lesson.summary[locale]}
                      </p>
                    </div>
                    <span
                      className={`text-xs ${
                        lesson.status === "ready"
                          ? "text-foreground/80"
                          : "italic text-muted-foreground/70"
                      }`}
                    >
                      {lesson.status === "ready" ? `${lesson.minutes} min` : "soon"}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-[12rem_1fr]">
          <header className="lg:sticky lg:top-32 lg:self-start">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{text.chapter4}</div>
            <div className="mt-1 text-xs font-medium text-foreground/70">{text.section4Eyebrow}</div>
          </header>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-[2.5rem]">
              {text.section4Title}
            </h2>
            <div className="mt-10 flex flex-col">
              {text.safety.map((s, i) => (
                <div
                  key={s.lead}
                  className="grid gap-x-6 border-t border-dashed border-foreground/20 dark:border-foreground/25 py-6 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_1fr]"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    rule {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-3xl text-base leading-7">
                    <span className="font-semibold text-foreground">{s.lead}</span>{" "}
                    <span className="text-muted-foreground">{s.rest}</span>
                  </p>
                </div>
              ))}
            </div>

            <blockquote className="mt-14 max-w-2xl border-s-2 border-[color:var(--chart-4)] ps-6">
              <p className="text-2xl font-medium leading-snug tracking-tight text-foreground">
                &ldquo;{text.pullQuote}&rdquo;
              </p>
              <footer className="mt-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {text.pullQuoteAttribution}
              </footer>
            </blockquote>
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-[12rem_1fr]">
          <header className="lg:sticky lg:top-32 lg:self-start">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{text.chapter5}</div>
            <div className="mt-1 text-xs font-medium text-foreground/70">{text.section5Eyebrow}</div>
          </header>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-[2.5rem]">
              {text.section5Title}
            </h2>
            <div className="mt-10 flex flex-col">
              {text.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group border-t border-dashed border-foreground/20 dark:border-foreground/25 py-5 first:border-t-0 first:pt-0"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium tracking-tight [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span className="text-muted-foreground transition-transform group-open:rotate-45 text-2xl leading-none font-light">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </article>
    </CourseShell>
  );
}
