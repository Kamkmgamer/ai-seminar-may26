import Link from "next/link";
import { notFound } from "next/navigation";

import { CourseShell } from "@/components/course-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { agentCatalog, catalogCriteria } from "@/lib/agent-catalog";
import { isLocale, type Locale } from "@/lib/course";

const copy = {
  en: {
    badge: "Agent catalog",
    title: "Compare the AI agents students keep hearing about.",
    intro:
      "This is a practical reference, not a ranking. Use it to understand what each tool is for, how beginner-friendly it is, and where to verify current setup details.",
    official: "Official docs",
    verify: "Verify first",
    bestFor: "Best for",
    compare: "Comparison criteria",
    current: "Current install commands, pricing, models, and limits change quickly. This catalog links to official docs instead of hard-coding promises.",
    back: "Back to course",
  },
  ar: {
    badge: "كتالوج الوكلاء",
    title: "قارن أدوات AI agents البتسمع عنها كتير.",
    intro:
      "ده مرجع عملي، ما ترتيب من الأفضل للأسوأ. استخدمه عشان تفهم كل أداة مفيدة في شنو، صعوبتها للمبتدئ، ووين تتحقق من تفاصيل التثبيت الحالية.",
    official: "الوثائق الرسمية",
    verify: "تحقق أولاً",
    bestFor: "مفيد لـ",
    compare: "معايير المقارنة",
    current: "أوامر التثبيت، الأسعار، الموديلات، والحدود بتتغير بسرعة. الكتالوج بيربطك بالوثائق الرسمية بدل وعود ثابتة.",
    back: "ارجع للكورس",
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function AgentCatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const text = copy[locale];

  return (
    <CourseShell locale={locale}>
      <article className="flex flex-col gap-16 pb-16">
        <header className="max-w-4xl border-b border-dashed border-foreground/20 pb-12">
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
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              {text.current}
            </p>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {agentCatalog.map((agent) => (
            <article
              key={agent.slug}
              className="group flex min-h-[29rem] flex-col rounded-[1.75rem] border bg-card p-5 transition-colors hover:bg-accent/35"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {agent.type[locale]}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    {agent.name}
                  </h2>
                </div>
                <Badge variant={agent.sourceStatus === "official" ? "default" : "outline"}>
                  {agent.sourceStatus === "official" ? text.official : text.verify}
                </Badge>
              </div>

              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                {agent.summary[locale]}
              </p>

              <div className="mt-6 rounded-2xl bg-background/70 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {text.bestFor}
                </p>
                <p className="mt-2 text-sm leading-6">{agent.bestFor[locale]}</p>
              </div>

              <dl className="mt-5 flex flex-col gap-4 text-sm">
                {catalogCriteria.map((criterion) => {
                  const value = agent[criterion.key];
                  return (
                    <div key={criterion.key}>
                      <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {criterion.label[locale]}
                      </dt>
                      <dd className="mt-1 leading-6 text-foreground/88">
                        {typeof value === "object" && value && locale in value
                          ? value[locale]
                          : ""}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <div className="mt-auto pt-6">
                {agent.officialUrl === "#" ? (
                  <span className="text-sm text-muted-foreground">{text.verify}</span>
                ) : (
                  <a
                    href={agent.officialUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm font-medium underline decoration-[color:var(--chart-4)] decoration-2 underline-offset-[5px] hover:text-[color:var(--chart-4)]"
                  >
                    {text.official} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="max-w-3xl border-t border-dashed border-foreground/20 pt-10">
          <h2 className="text-2xl font-semibold tracking-tight">{text.compare}</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {text.current}
          </p>
        </section>
      </article>
    </CourseShell>
  );
}
