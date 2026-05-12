import Link from "next/link";
import { notFound } from "next/navigation";

import { CourseShell } from "@/components/course-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { isLocale, lessons, type Locale } from "@/lib/course";

const pageCopy = {
  en: {
    badge: "2026 AI field guide",
    title: "Learn the AI world students are entering now",
    intro:
      "A focused path through modern AI: what agents are, how to use them safely, which tools matter, and how to turn AI help into real projects.",
    primary: "Start with welcome",
    secondary: "Open agent overview",
    agenda: "Learning path",
    note: "The goal is AI literacy for 2026: understand the landscape, practice with agents, build something useful, and know how to stay safe.",
  },
  ar: {
    badge: "دليل AI لسنة 2026",
    title: "اتعلم عالم الذكاء الاصطناعي الداخلينو الطلاب هسع",
    intro:
      "مسار مركز عن الذكاء الاصطناعي الحديث: يعني شنو agents، كيف تستخدمهم بأمان، شنو الأدوات المهمة، وكيف تحول مساعدة AI لمشاريع حقيقية.",
    primary: "ابدأ بالترحيب",
    secondary: "افتح مقدمة الوكلاء",
    agenda: "مسار التعلم",
    note: "الهدف إنك تفهم AI في 2026: تعرف الخريطة، تجرب agents، تبني حاجة مفيدة، وتتعلم الأمان.",
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const text = pageCopy[locale];

  return (
    <CourseShell locale={locale}>
      <div className="flex flex-col gap-12">
      <section className="relative py-8 md:py-14">
        <div className="pointer-events-none absolute -inset-x-24 -top-8 h-72 rounded-full bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_68%)] opacity-15 blur-3xl md:-inset-x-40" />
        <div className="pointer-events-none absolute -right-32 top-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl rtl:-left-32 rtl:right-auto" />
        <div className="relative flex max-w-3xl flex-col gap-7">
          <Badge className="w-fit" variant="secondary">
            {text.badge}
          </Badge>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {text.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {text.intro}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button render={<Link href={`/${locale}/learn/welcome`} />} size="lg">
              {text.primary}
            </Button>
            <Button
              render={<Link href={`/${locale}/learn/agents`} />}
              variant="outline"
              size="lg"
            >
              {text.secondary}
            </Button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">{text.agenda}</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">{text.note}</p>
        </div>
        <div className="flex flex-col">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.slug}
              href={lesson.status === "ready" ? `/${locale}/learn/${lesson.slug}` : `/${locale}`}
              className="group grid gap-4 py-5 transition-colors hover:bg-accent/50 md:grid-cols-[5rem_1fr_auto] md:px-3"
            >
              <div className="flex items-center gap-3 md:block">
                <span className="text-sm font-semibold text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="md:hidden">
                <Badge variant={lesson.status === "ready" ? "default" : "outline"}>
                  {lesson.status}
                </Badge>
                </span>
              </div>
              <div>
              <h2 className="text-lg font-semibold">{lesson.title[locale]}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {lesson.summary[locale]}
              </p>
              </div>
              <Badge className="hidden self-start md:inline-flex" variant={lesson.status === "ready" ? "default" : "outline"}>
                {lesson.status}
              </Badge>
            </Link>
          ))}
        </div>
        <Separator />
      </section>
      </div>
    </CourseShell>
  );
}
