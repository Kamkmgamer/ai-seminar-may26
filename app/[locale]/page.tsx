import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Cpu,
  FileCode2,
  GitBranch,
  GraduationCap,
  Laptop,
  LockKeyhole,
  Network,
  Play,
  Terminal,
  Wrench,
} from "lucide-react";
import { notFound } from "next/navigation";

import { CourseShell } from "@/components/course-shell";
import { Button } from "@/components/ui/button";
import { isLocale, lessons, readyLessons, type Locale } from "@/lib/course";

type Tool = {
  name: string;
  file: string;
  role: { en: string; ar: string };
};

const tools: Tool[] = [
  {
    name: "ChatGPT",
    file: "openai.svg",
    role: {
      en: "The familiar starting point for questions, drafts, explanations, and quick checks.",
      ar: "نقطة البداية المألوفة للأسئلة، المسودات، الشرح، والمراجعة السريعة.",
    },
  },
  {
    name: "Claude",
    file: "claude.svg",
    role: {
      en: "Useful for careful reasoning, code review, long edits, and comparing answers.",
      ar: "مفيد للتفكير الهادئ، مراجعة الكود، التعديلات الطويلة، ومقارنة الإجابات.",
    },
  },
  {
    name: "OpenCode",
    file: "opencode.svg",
    role: {
      en: "The hands-on terminal agent we install and run together during the workshop.",
      ar: "الـ agent العملي في الترمينال، بنثبته ونشغله مع بعض في الورشة.",
    },
  },
  {
    name: "Cursor",
    file: "cursor.svg",
    role: {
      en: "An AI-native code editor, close to VS Code but with chat and agents wired in.",
      ar: "محرر كود مدعوم بالـ AI، قريب من VS Code لكن فيه شات و agents جاهزة.",
    },
  },
  {
    name: "GitHub",
    file: "github.svg",
    role: {
      en: "Where your code lives, gets reviewed, and can publish your portfolio.",
      ar: "المكان البتخزن فيه الكود، تراجعه، ومنه ممكن تنشر البورتفوليو.",
    },
  },
  {
    name: "Node.js",
    file: "node.svg",
    role: {
      en: "The JavaScript runtime behind the portfolio project and modern web tools.",
      ar: "بيئة تشغيل JavaScript البتعتمد عليها أدوات الويب ومشروع البورتفوليو.",
    },
  },
];

const copy = {
  en: {
    heroKicker: "AI literacy for students",
    title: "Your practical control room for AI in 2026.",
    intro:
      "A bilingual field guide for the workshop: understand agents, set up the right tools, practice safe workflows, and ship a small portfolio before the room goes quiet.",
    primary: "Start the guide",
    secondary: "Preview the agent loop",
    meta: ["No coding background", "Arabic + English", "Laptop-first"],
    artifactTitle: "Workshop run",
    artifactSubtitle: "May 26 · student mode",
    promptLabel: "student prompt",
    prompt:
      "I want to build a portfolio with AI, but I do not know what to install first.",
    agentReply:
      "We will map the tools, install the basics, run OpenCode, review each diff, then deploy the result.",
    runStatus: "ready for the first lesson",
    signal: "Agent workflow preview",
    reactionsTitle: "Built for the questions students actually ask",
    reactionsLead:
      "The guide is shaped around the confusion points that appear in the first hour: which tool to trust, what an agent can change, where secrets belong, and how to know when to stop.",
    reactions: [
      {
        handle: "Before setup",
        text: "What is the difference between ChatGPT, Cursor, Claude, and OpenCode?",
      },
      {
        handle: "During practice",
        text: "If the agent wants to run a command, how do I know it is safe?",
      },
      {
        handle: "After shipping",
        text: "How do I keep the site online and update it without breaking it?",
      },
    ],
    toolsEyebrow: "Toolchain",
    toolsTitle: "Bring the tools you already recognize. Learn where each one belongs.",
    toolsLead:
      "This is not a logo wall. Every tool below has a job in the workshop, from asking the first question to deploying the final portfolio.",
    outcomesEyebrow: "End state",
    outcomesTitle: "One afternoon, three concrete wins.",
    outcomes: [
      {
        icon: Wrench,
        title: "A working local setup",
        text: "Node, npm, an editor, GitHub basics, and OpenCode installed on your own laptop.",
      },
      {
        icon: Network,
        title: "A real agent loop",
        text: "Prompt, inspect, tool call, diff review, fix, verify. You see the loop before you trust it.",
      },
      {
        icon: Laptop,
        title: "A live portfolio URL",
        text: "A small personal site deployed online, with a clear path for future updates.",
      },
    ],
    pathEyebrow: "Lesson path",
    pathTitle: "Eight short lessons, one clear arc.",
    pathLead:
      "The sequence moves from orientation to setup, then hands-on agent work, safety, and deployment.",
    safetyEyebrow: "Safety layer",
    safetyTitle: "The agent does the work. You keep judgment in the loop.",
    safetyLead:
      "Speed is only useful when the student still understands what changed.",
    safety: [
      "Never paste API keys, tokens, or .env files into chats or screenshots.",
      "Read terminal commands before you run them. Curiosity is cheaper than recovery.",
      "Treat every diff as a proposal until you accept it.",
    ],
    finalTitle: "Start with the map, then build the thing.",
    finalLead:
      "The first lesson gives students a clean mental model before the workshop moves into installs and hands-on agent work.",
    finalCta: "Open lesson one",
    soon: "soon",
    min: "min",
    lessonCount: (ready: number, total: number) => `${ready}/${total} lessons ready`,
  },
  ar: {
    badge: "ورشة مباشرة · 26 مايو 2026",
    heroKicker: "AI literacy للطلاب",
    title: "غرفة تحكم عملية لفهم AI في 2026.",
    intro:
      "دليل ثنائي اللغة للورشة: تفهم الـ agents، تجهز الأدوات الصح، تتدرب على شغل آمن، وتطلع ببورتفوليو صغير قبل نهاية اليوم.",
    primary: "ابدأ الدليل",
    secondary: "شوف لوب الـ agent",
    meta: ["ما محتاج خبرة برمجة", "عربي + إنجليزي", "على لابتوبك"],
    artifactTitle: "مسار الورشة",
    artifactSubtitle: "26 مايو · وضع الطالب",
    promptLabel: "سؤال الطالب",
    prompt: "عايز أبني بورتفوليو بالـ AI، لكن ما عارف أثبت شنو أول.",
    agentReply:
      "حنرتب الأدوات، نثبت الأساسيات، نشغل OpenCode، نراجع كل diff، وبعدها ننشر النتيجة.",
    runStatus: "جاهز للدرس الأول",
    signal: "معاينة شغل الـ agent",
    reactionsTitle: "مصمم حول الأسئلة البتظهر فعلا في القاعة",
    reactionsLead:
      "الدليل بيركز على نقاط اللخبطة في أول ساعة: أثق في ياتو أداة، الـ agent ممكن يغير شنو، الأسرار مكانها وين، وأعرف أوقف متين.",
    reactions: [
      {
        handle: "قبل التجهيز",
        text: "الفرق شنو بين ChatGPT و Cursor و Claude و OpenCode؟",
      },
      {
        handle: "أثناء التطبيق",
        text: "لو الـ agent طلب يشغل أمر، أعرف إنه آمن كيف؟",
      },
      {
        handle: "بعد النشر",
        text: "أخلي الموقع شغال وأحدثه بدون ما أكسره كيف؟",
      },
    ],
    toolsEyebrow: "الأدوات",
    toolsTitle: "ابدأ بالأدوات البتعرفها. واتعلم مكان كل واحدة.",
    toolsLead:
      "دي ما لوحة شعارات. كل أداة تحت عندها دور في الورشة، من أول سؤال لحد نشر البورتفوليو.",
    outcomesEyebrow: "النهاية",
    outcomesTitle: "عصر واحد، ثلاث نتائج واضحة.",
    outcomes: [
      {
        icon: Wrench,
        title: "تجهيز محلي شغال",
        text: "Node و npm ومحرر و GitHub و OpenCode مثبتين على لابتوبك.",
      },
      {
        icon: Network,
        title: "لوب agent حقيقي",
        text: "Prompt، فحص، tool call، مراجعة diff، إصلاح، تحقق. تشوف اللوب قبل ما تثق فيه.",
      },
      {
        icon: Laptop,
        title: "رابط بورتفوليو منشور",
        text: "موقع شخصي صغير على الإنترنت، ومعاه طريق واضح للتحديثات الجاية.",
      },
    ],
    pathEyebrow: "مسار الدروس",
    pathTitle: "ثمانية دروس قصيرة، قصة واحدة واضحة.",
    pathLead:
      "المسار يبدأ بفهم الصورة، بعدها التجهيز، ثم تطبيق الـ agent، الأمان، والنشر.",
    safetyEyebrow: "طبقة الأمان",
    safetyTitle: "الـ agent يعمل بسرعة. إنت تخلي القرار في اللوب.",
    safetyLead: "السرعة مفيدة بس لما الطالب لسه فاهم الحصل شنو.",
    safety: [
      "ما تلصق API keys أو tokens أو ملفات .env في الشات أو الصور.",
      "اقرأ أوامر الترمينال قبل تشغيلها. الفضول أرخص من الإصلاح.",
      "اعتبر أي diff اقتراح لحد ما تقبله بنفسك.",
    ],
    finalTitle: "ابدأ بالخريطة، وبعدها ابن الحاجة.",
    finalLead:
      "الدرس الأول بيدي الطلاب نموذج واضح قبل ما الورشة تدخل في التثبيت والشغل العملي مع الـ agents.",
    finalCta: "افتح الدرس الأول",
    soon: "قريبا",
    min: "د",
    lessonCount: (ready: number, total: number) => `${ready}/${total} دروس جاهزة`,
  },
} as const;

function HeroConstellation() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="ai-grid" />
      <div className="float-chip chip-claude">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="tool-logo" src="/tools/claude.svg" alt="" width={30} height={30} />
      </div>
      <div className="float-chip chip-openai">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="tool-logo" src="/tools/openai.svg" alt="" width={30} height={30} />
      </div>
      <div className="float-chip chip-opencode">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="tool-logo" src="/tools/opencode.svg" alt="" width={30} height={30} />
      </div>
      <div className="float-chip chip-cursor">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="tool-logo" src="/tools/cursor.svg" alt="" width={30} height={30} />
      </div>
    </div>
  );
}

function WorkshopArtifact({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <div className="hero-artifact mx-auto w-full max-w-4xl" dir="ltr">
      <div className="artifact-topbar">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[oklch(0.68_0.2_25)]" />
          <span className="size-2.5 rounded-full bg-[color:var(--site-accent-2)]" />
          <span className="size-2.5 rounded-full bg-[color:var(--site-good)]" />
        </span>
        <span className="font-mono text-[11px] text-foreground/72">
          ai-seminar / workshop-control
        </span>
        <span className="ms-auto rounded-full border border-foreground/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-foreground/60">
          live
        </span>
      </div>
      <div className="grid gap-0 md:grid-cols-[15rem_1fr]">
        <aside className="artifact-sidebar">
          <div className="mb-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/45">
              {text.artifactTitle}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground/88">
              {text.artifactSubtitle}
            </p>
          </div>
          {[
            ["01", "orientation", BookOpen],
            ["02", "setup", Wrench],
            ["03", "agent loop", Cpu],
            ["04", "deploy", GitBranch],
          ].map(([n, label, Icon]) => (
            <div key={label as string} className="artifact-nav-row">
              <Icon className="size-3.5" />
              <span>{n as string}</span>
              <span>{label as string}</span>
            </div>
          ))}
        </aside>
        <div className="artifact-main">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/75">
                {text.signal}
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-[color:var(--site-strong)]">
                prompt → inspect → edit → verify
              </h2>
            </div>
            <Button
              render={<Link href={`/${locale}/learn/agents`} />}
              nativeButton={false}
              size="sm"
              className="hidden bg-[color:var(--site-strong)] text-[color:var(--site-bg)] hover:bg-[color:var(--site-accent)] md:inline-flex"
            >
              <Play data-icon="inline-start" />
              {text.secondary}
            </Button>
          </div>

          <div className="artifact-chat">
            <div className="artifact-message">
              <span className="artifact-message-label">{text.promptLabel}</span>
              <p dir={locale === "ar" ? "rtl" : "ltr"}>{text.prompt}</p>
            </div>
            <div className="artifact-message artifact-message-agent">
              <span className="artifact-message-label">agent</span>
              <p dir={locale === "ar" ? "rtl" : "ltr"}>{text.agentReply}</p>
            </div>
          </div>

          <div className="artifact-files">
            {[
              ["install", "node --version", "ok"],
              ["read", "content/lessons/welcome.mdx", "ok"],
              ["edit", "app/portfolio/page.tsx", "+124"],
              ["verify", "pnpm build", "ok"],
            ].map(([kind, name, status]) => (
              <div key={name} className="artifact-file-row">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/42">
                  {kind}
                </span>
                <span className="truncate font-mono text-xs text-foreground/78">
                  {name}
                </span>
                <span className="ms-auto text-xs text-emerald-200">{status}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-foreground/62">
            <span className="inline-flex items-center gap-2 text-emerald-200">
              <Check className="size-3.5" />
              {text.runStatus}
            </span>
            <span className="hidden h-px w-8 bg-foreground/14 sm:block" />
            <span>localhost:3000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--site-accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.06] tracking-[-0.045em] text-[color:var(--site-strong)] md:text-5xl">
        {title}
      </h2>
      {lead ? (
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-7 text-[color:var(--site-muted)] md:text-base">
          {lead}
        </p>
      ) : null}
    </header>
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
    <CourseShell locale={locale} variant="landing">
      <article className="landing-page relative overflow-hidden rounded-b-[2rem]">
        <section className="hero-section relative min-h-[calc(100svh-5rem)] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <HeroConstellation />
          <div className="relative z-1 mx-auto flex max-w-6xl flex-col items-center text-center">
<p className="text-sm font-medium text-[color:var(--site-muted)]">
              {text.heroKicker}
            </p>
            <h1 className="mt-4 max-w-5xl text-balance text-[clamp(3.1rem,9vw,7.4rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[color:var(--site-strong)]">
              {text.title}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-[color:var(--site-muted)] md:text-lg">
              {text.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                render={<Link href={`/${locale}/learn/welcome`} />}
                nativeButton={false}
                size="lg"
                className="h-11 rounded-xl bg-[color:var(--site-strong)] px-4 text-[color:var(--site-bg)] hover:bg-[color:var(--site-accent)]"
              >
                <GraduationCap data-icon="inline-start" />
                {text.primary}
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                render={<Link href={`/${locale}/learn/agents`} />}
                nativeButton={false}
                variant="outline"
                size="lg"
                className="h-11 rounded-xl border-foreground/10 bg-foreground/[0.03] px-4 text-[color:var(--site-strong)] hover:bg-foreground/[0.07]"
              >
                <Terminal data-icon="inline-start" />
                {text.secondary}
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[color:var(--site-muted)]">
              {text.meta.map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="size-3.5 text-[color:var(--site-good)]" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-14 w-full">
              <WorkshopArtifact locale={locale} />
            </div>
          </div>
        </section>

        <section className="relative border-t border-foreground/[0.07] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--site-accent-2)]">
                field notes
              </p>
              <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-[color:var(--site-strong)] md:text-5xl">
                {text.reactionsTitle}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[color:var(--site-muted)]">
                {text.reactionsLead}
              </p>
            </div>
            <div className="question-marquee" aria-label={text.reactionsTitle}>
              {[...text.reactions, ...text.reactions].map((item, index) => (
                <div key={`${item.handle}-${index}`} className="question-card">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--site-accent)]">
                    {item.handle}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--site-strong)]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-t border-foreground/[0.07] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow={text.toolsEyebrow}
              title={text.toolsTitle}
              lead={text.toolsLead}
            />
            <div className="tool-strip mt-12">
              {tools.map((tool) => (
                <div key={tool.name} className="tool-cell">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="tool-logo" src={`/tools/${tool.file}`} alt="" width={26} height={26} />
                  <div>
                    <h3 className="text-sm font-semibold text-[color:var(--site-strong)]">
                      {tool.name}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-[color:var(--site-muted)]">
                      {tool.role[locale]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-t border-foreground/[0.07] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--site-accent-2)]">
                {text.outcomesEyebrow}
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-[color:var(--site-strong)] md:text-5xl">
                {text.outcomesTitle}
              </h2>
            </div>
            <div className="outcome-stack">
              {text.outcomes.map((outcome, index) => {
                const Icon = outcome.icon;
                return (
                  <div key={outcome.title} className="outcome-row">
                    <span className="font-mono text-xs text-[color:var(--site-faint)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon className="size-5 text-[color:var(--site-good)]" />
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-[color:var(--site-strong)]">
                        {outcome.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--site-muted)]">
                        {outcome.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative border-t border-foreground/[0.07] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow={text.pathEyebrow}
              title={text.pathTitle}
              lead={text.pathLead}
            />
            <ol className="lesson-board mt-12">
              {lessons.map((lesson, index) => {
                const ready = lesson.status === "ready";
                return (
                  <li key={lesson.slug}>
                    <Link
                      href={ready ? `/${locale}/learn/${lesson.slug}` : `/${locale}`}
                      className="lesson-row"
                      aria-disabled={!ready}
                    >
                      <span className="font-mono text-xs text-[color:var(--site-faint)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="lesson-icon">
                        {ready ? <FileCode2 className="size-4" /> : <LockKeyhole className="size-4" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-base font-semibold tracking-tight text-[color:var(--site-strong)]">
                          {lesson.title[locale]}
                        </span>
                        <span className="mt-1 line-clamp-2 text-sm leading-6 text-[color:var(--site-muted)]">
                          {lesson.summary[locale]}
                        </span>
                      </span>
                      <span className="ms-auto whitespace-nowrap text-xs text-[color:var(--site-muted)]">
                        {ready ? `${lesson.minutes} ${text.min}` : text.soon}
                      </span>
                      <ChevronRight className="size-4 text-[color:var(--site-faint)]" />
                    </Link>
                  </li>
                );
              })}
            </ol>
            <p className="mt-5 text-center text-xs text-[color:var(--site-faint)]">
              {text.lessonCount(readyLessons.length, lessons.length)}
            </p>
          </div>
        </section>

        <section className="relative border-t border-foreground/[0.07] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="safety-panel">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--site-accent-2)]">
                {text.safetyEyebrow}
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-[color:var(--site-strong)] md:text-5xl">
                {text.safetyTitle}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[color:var(--site-muted)]">
                {text.safetyLead}
              </p>
            </div>
            <ul className="safety-list">
              {text.safety.map((item, index) => (
                <li key={item}>
                  <span className="font-mono text-xs text-[color:var(--site-accent-2)]">
                    rule {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative border-t border-foreground/[0.07] px-4 py-28 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.06em] text-[color:var(--site-strong)] md:text-6xl">
              {text.finalTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-[color:var(--site-muted)]">
              {text.finalLead}
            </p>
            <Button
              render={<Link href={`/${locale}/learn/welcome`} />}
              nativeButton={false}
              size="lg"
              className="mt-8 h-11 rounded-xl bg-[color:var(--site-strong)] px-4 text-[color:var(--site-bg)] hover:bg-[color:var(--site-accent)]"
            >
              {text.finalCta}
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </section>
      </article>
    </CourseShell>
  );
}
