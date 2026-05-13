import { notFound } from "next/navigation";

import { getLeaderboardRows } from "@/app/actions/progress";
import { CourseShell } from "@/components/course-shell";
import { Badge } from "@/components/ui/badge";
import { isLocale, type Locale } from "@/lib/course";
import { getMilestoneBadges, type MilestoneBadge } from "@/lib/milestones";

const copy = {
  en: {
    badge: "Safe leaderboard",
    title: "Progress without exposing student emails.",
    intro:
      "Scores are based on safe achievements: completed lessons and optional public project links. Email addresses are never displayed here.",
    empty: "Leaderboard appears after students save progress.",
    student: "Student",
    lessons: "Lessons",
    links: "Links",
    score: "Score",
    badges: "Badges",
  },
  ar: {
    badge: "ترتيب آمن",
    title: "تقدم بدون عرض إيميلات الطلاب.",
    intro:
      "النقاط مبنية على إنجازات آمنة: الدروس المكتملة وروابط المشاريع العامة الاختيارية. الإيميلات ما بتظهر هنا.",
    empty: "الترتيب بظهر بعد ما الطلاب يحفظوا تقدمهم.",
    student: "الطالب",
    lessons: "الدروس",
    links: "الروابط",
    score: "النقاط",
    badges: "الشارات",
  },
} satisfies Record<Locale, Record<string, string>>;

export const dynamic = "force-dynamic";

export default async function LeaderboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = copy[locale];
  const rows = await getLeaderboardRows();

  return (
    <CourseShell locale={locale}>
      <article className="flex flex-col gap-10 pb-16">
        <header className="max-w-4xl border-b border-dashed border-foreground/20 pb-10">
          <Badge variant="secondary">{text.badge}</Badge>
          <h1 className="mt-6 text-[clamp(2.5rem,6vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
            {text.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {text.intro}
          </p>
        </header>

        {rows.length === 0 ? (
          <p className="rounded-[2rem] border border-dashed bg-card/60 p-6 text-muted-foreground">
            {text.empty}
          </p>
        ) : (
          <ol className="flex flex-col border-t border-dashed border-foreground/20">
            {rows.map((row, index) => {
              const score = row.completedLessons * 10 + row.submittedLinks * 5;
              const badges = getMilestoneBadges(row);
              return (
                <li
                  key={row.profileId}
                  className="grid gap-4 border-b border-dashed border-foreground/20 py-5 md:grid-cols-[4rem_1fr_repeat(3,7rem)] md:items-center"
                >
                  <span className="font-mono text-sm text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-semibold tracking-tight">
                    {row.nickname || `${text.student} ${index + 1}`}
                  </span>
                  <Metric label={text.lessons} value={row.completedLessons} />
                  <Metric label={text.links} value={row.submittedLinks} />
                  <Metric label={text.score} value={score} />
                  {badges.length > 0 ? (
                    <div className="md:col-start-2 md:col-end-6">
                      <span className="sr-only">{text.badges}</span>
                      <BadgeList badges={badges} locale={locale} />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        )}
      </article>
    </CourseShell>
  );
}

function BadgeList({ badges, locale }: { badges: MilestoneBadge[]; locale: Locale }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <li
          key={badge.key}
          className="rounded-full border border-dashed bg-card/70 px-2.5 py-1 text-xs font-medium text-foreground/80"
        >
          {badge.label[locale]}
        </li>
      ))}
    </ul>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <span className="flex items-baseline justify-between gap-3 md:block">
      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-xl font-semibold md:mt-1 md:block">{value}</span>
    </span>
  );
}
