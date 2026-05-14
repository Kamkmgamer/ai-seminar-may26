import Link from "next/link";
import { notFound } from "next/navigation";

import { CourseShell } from "@/components/course-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { agentCatalog } from "@/lib/agent-catalog";
import { isLocale, type Locale } from "@/lib/course";

type Reference = {
  label: string;
  href: string;
  note: Record<Locale, string>;
};

type ReferenceGroup = {
  title: Record<Locale, string>;
  intro: Record<Locale, string>;
  links: Reference[];
};

const copy = {
  en: {
    badge: "Official references",
    title: "Current links for setup, agents, publishing, and safety.",
    intro:
      "Use this page when a command, product screen, model list, or pricing page has changed since the lesson was written. Official docs win over screenshots and memory.",
    back: "Back to course",
    catalog: "Agent catalog",
    noteTitle: "Reference rule",
    note: "Do not copy commands from random posts during the workshop. Open the official page, check the date or product version, then run only what you understand.",
  },
  ar: {
    badge: "مراجع رسمية",
    title: "روابط حديثة للتثبيت، الوكلاء، النشر، والأمان.",
    intro:
      "استخدم الصفحة دي لو أمر، شاشة منتج، قائمة models، أو الأسعار اتغيرت بعد كتابة الدرس. الوثائق الرسمية أهم من الصور والذاكرة.",
    back: "ارجع للكورس",
    catalog: "كتالوج الوكلاء",
    noteTitle: "قاعدة المراجع",
    note: "ما تنسخ أوامر من بوستات عشوائية أثناء الورشة. افتح الصفحة الرسمية، راجع التاريخ أو نسخة المنتج، وشغل فقط الأمر الفاهمه.",
  },
} satisfies Record<Locale, Record<string, string>>;

const setupReferences: ReferenceGroup = {
  title: { en: "Setup basics", ar: "أساسيات الإعداد" },
  intro: {
    en: "Core tools students install or use before running an agent.",
    ar: "الأدوات الأساسية البثبتها أو يستخدمها الطالب قبل تشغيل agent.",
  },
  links: [
    {
      label: "Node.js downloads",
      href: "https://nodejs.org/en/download",
      note: {
        en: "Use the current LTS installer.",
        ar: "استخدم مثبت LTS الحالي.",
      },
    },
    {
      label: "Node.js docs",
      href: "https://nodejs.org/docs/latest/api/",
      note: {
        en: "Runtime reference for later study.",
        ar: "مرجع بيئة التشغيل للدراسة لاحقاً.",
      },
    },
    {
      label: "npm docs",
      href: "https://docs.npmjs.com/",
      note: {
        en: "Package-manager commands and concepts.",
        ar: "أوامر ومفاهيم مدير الحزم.",
      },
    },
    {
      label: "Windows Terminal",
      href: "https://learn.microsoft.com/windows/terminal/",
      note: {
        en: "Terminal setup and profile reference.",
        ar: "مرجع إعداد التيرمنال والبروفايلات.",
      },
    },
    {
      label: "PowerShell docs",
      href: "https://learn.microsoft.com/powershell/",
      note: {
        en: "Windows shell behavior and commands.",
        ar: "سلوك وأوامر shell في ويندوز.",
      },
    },
  ],
};

const publishingReferences: ReferenceGroup = {
  title: { en: "Publishing and GitHub", ar: "النشر و GitHub" },
  intro: {
    en: "Use these when creating accounts, enabling account safety, or deploying a portfolio.",
    ar: "استخدمها لإنشاء الحسابات، تفعيل الأمان، أو نشر البورتفوليو.",
  },
  links: [
    {
      label: "GitHub",
      href: "https://github.com/",
      note: { en: "Create or open your account.", ar: "أنشئ أو افتح حسابك." },
    },
    {
      label: "GitHub account guide",
      href: "https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github",
      note: {
        en: "Official account creation steps.",
        ar: "خطوات إنشاء الحساب الرسمية.",
      },
    },
    {
      label: "GitHub two-factor authentication",
      href: "https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication",
      note: {
        en: "Protect the account before publishing.",
        ar: "احم الحساب قبل النشر.",
      },
    },
    {
      label: "Vercel Git deployments",
      href: "https://vercel.com/docs/git",
      note: {
        en: "Recommended path for Next.js projects.",
        ar: "المسار المفضل لمشاريع Next.js.",
      },
    },
    {
      label: "Netlify docs",
      href: "https://docs.netlify.com/",
      note: { en: "Alternative hosting reference.", ar: "مرجع استضافة بديل." },
    },
    {
      label: "GitHub Pages docs",
      href: "https://docs.github.com/en/pages",
      note: {
        en: "Only for static-compatible projects.",
        ar: "فقط للمشاريع المناسبة للنشر الثابت.",
      },
    },
  ],
};

function getReferenceGroups(): ReferenceGroup[] {
  const verifiedAgents = agentCatalog
    .filter(
      (agent) => agent.sourceStatus === "official" && agent.officialUrl !== "#",
    )
    .map((agent) => ({
      label: agent.name,
      href: agent.officialUrl,
      note: agent.summary,
    }));

  return [
    setupReferences,
    {
      title: { en: "Agent docs", ar: "وثائق الوكلاء" },
      intro: {
        en: "Official sources for current install paths, product surfaces, and limits.",
        ar: "مصادر رسمية لمسارات التثبيت، واجهات المنتج، والحدود الحالية.",
      },
      links: verifiedAgents,
    },
    publishingReferences,
  ].map((group) => ({
    ...group,
    links: group.links.map((link) => ({
      ...link,
      note: { en: link.note.en, ar: link.note.ar },
    })),
  }));
}

export default async function ReferencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const text = copy[locale];
  const referenceGroups = getReferenceGroups();

  return (
    <CourseShell locale={locale}>
      <article className="flex flex-col gap-14 pb-16">
        <header className="grid gap-10 border-b border-dashed border-foreground/20 pb-12 lg:grid-cols-[1fr_18rem]">
          <div className="max-w-4xl">
            <Badge variant="secondary">{text.badge}</Badge>
            <h1 className="mt-6 text-[clamp(2.5rem,6vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
              {text.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {text.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                render={<Link href={`/${locale}`} />}
                nativeButton={false}
                variant="outline"
              >
                {text.back}
              </Button>
              <Button
                render={<Link href={`/${locale}/agents`} />}
                nativeButton={false}
                variant="ghost"
              >
                {text.catalog}
              </Button>
            </div>
          </div>

          <aside className="self-end rounded-[1.75rem] border border-dashed bg-card/60 p-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {text.noteTitle}
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground/85">
              {text.note}
            </p>
          </aside>
        </header>

        <div className="flex flex-col gap-14">
          {referenceGroups.map((group) => (
            <section
              key={group.title.en}
              className="grid gap-8 lg:grid-cols-[16rem_1fr]"
            >
              <header>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {group.title[locale]}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {group.intro[locale]}
                </p>
              </header>

              <ul className="flex flex-col border-t border-dashed border-foreground/20">
                {group.links.map((reference, index) => (
                  <li
                    key={`${reference.label}-${reference.href}`}
                    className="grid gap-3 border-b border-dashed border-foreground/20 py-5 sm:grid-cols-[3rem_1fr]"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-base font-medium underline decoration-color(--chart-4) decoration-2 underline-offset-[5px] hover:text-chart-4"
                      >
                        {reference.label} ↗
                      </a>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                        {reference.note[locale]}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </CourseShell>
  );
}
