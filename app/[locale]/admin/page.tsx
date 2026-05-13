import { auth } from "@clerk/nextjs/server";
import { and, count, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import {
  checklistProgress,
  lessonProgress,
  profiles,
  projectLinks,
} from "@/db/schema";
import { CourseShell } from "@/components/course-shell";
import { Badge } from "@/components/ui/badge";
import { getAdminEmailAllowlist, isCurrentUserAdmin } from "@/lib/admin";
import { isLocale, type Locale } from "@/lib/course";
import { getDb } from "@/lib/db";

const copy = {
  en: {
    badge: "Admin overview",
    title: "Instructor snapshot.",
    denied: "Admin access is restricted to the configured email allowlist.",
    setup: "Set ADMIN_EMAIL_ALLOWLIST and DATABASE_URL to enable live admin analytics.",
    profiles: "Profiles",
    lessons: "Completed lessons",
    checklist: "Checklist items",
    links: "Project links",
    students: "Student progress",
    noNickname: "Unnamed student",
  },
  ar: {
    badge: "لوحة المدرب",
    title: "ملخص سريع للمدرب.",
    denied: "دخول الإدارة محدود للإيميلات الموجودة في allowlist.",
    setup: "اضبط ADMIN_EMAIL_ALLOWLIST و DATABASE_URL لتفعيل analytics الحية.",
    profiles: "البروفايلات",
    lessons: "الدروس المكتملة",
    checklist: "عناصر checklist",
    links: "روابط المشاريع",
    students: "تقدم الطلاب",
    noNickname: "طالب بدون اسم",
  },
} satisfies Record<Locale, Record<string, string>>;

export const dynamic = "force-dynamic";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  await auth.protect();
  const text = copy[locale];
  const isAdmin = await isCurrentUserAdmin();

  if (!isAdmin) {
    return (
      <CourseShell locale={locale}>
        <section className="max-w-3xl rounded-[2rem] border border-dashed bg-card/60 p-8">
          <Badge variant="outline">{text.badge}</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight">{text.denied}</h1>
        </section>
      </CourseShell>
    );
  }

  if (!process.env.DATABASE_URL || getAdminEmailAllowlist().length === 0) {
    return (
      <CourseShell locale={locale}>
        <section className="max-w-3xl rounded-[2rem] border border-dashed bg-card/60 p-8">
          <Badge variant="secondary">{text.badge}</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight">{text.setup}</h1>
        </section>
      </CourseShell>
    );
  }

  const db = getDb();
  const [[profileCount], [lessonCount], [checklistCount], [linkCount]] = await Promise.all([
    db.select({ value: count() }).from(profiles),
    db
      .select({ value: count() })
      .from(lessonProgress)
      .where(eq(lessonProgress.completed, true)),
    db
      .select({ value: count() })
      .from(checklistProgress)
      .where(eq(checklistProgress.completed, true)),
    db.select({ value: count() }).from(projectLinks),
  ]);

  const metrics = [
    { label: text.profiles, value: profileCount?.value ?? 0 },
    { label: text.lessons, value: lessonCount?.value ?? 0 },
    { label: text.checklist, value: checklistCount?.value ?? 0 },
    { label: text.links, value: linkCount?.value ?? 0 },
  ];

  const studentProfiles = await db.select().from(profiles).limit(50);
  const studentRows = await Promise.all(
    studentProfiles.map(async (profile) => {
      const [[completed], [completedChecklist], links] = await Promise.all([
        db
          .select({ value: count() })
          .from(lessonProgress)
          .where(
            and(
              eq(lessonProgress.profileId, profile.id),
              eq(lessonProgress.completed, true),
            ),
          ),
        db
          .select({ value: count() })
          .from(checklistProgress)
          .where(
            and(
              eq(checklistProgress.profileId, profile.id),
              eq(checklistProgress.completed, true),
            ),
          ),
        db.select().from(projectLinks).where(eq(projectLinks.profileId, profile.id)),
      ]);

      return {
        profile,
        completedLessons: completed?.value ?? 0,
        completedChecklistItems: completedChecklist?.value ?? 0,
        links,
      };
    }),
  );

  return (
    <CourseShell locale={locale}>
      <article className="flex flex-col gap-10 pb-16">
        <header className="max-w-4xl border-b border-dashed border-foreground/20 pb-10">
          <Badge variant="secondary">{text.badge}</Badge>
          <h1 className="mt-6 text-[clamp(2.5rem,6vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
            {text.title}
          </h1>
        </header>
        <section className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-[2rem] border bg-card/60 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {metric.label}
              </p>
              <p className="mt-4 font-mono text-5xl font-semibold tracking-[-0.08em]">
                {metric.value}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-5">
          <h2 className="text-2xl font-semibold tracking-tight">{text.students}</h2>
          <div className="overflow-x-auto border-t border-dashed border-foreground/20">
            <table className="w-full min-w-[42rem] text-sm">
              <thead className="text-start text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <tr className="border-b border-dashed border-foreground/20">
                  <th className="py-3 text-start font-medium">{text.profiles}</th>
                  <th className="py-3 text-start font-medium">{text.lessons}</th>
                  <th className="py-3 text-start font-medium">{text.checklist}</th>
                  <th className="py-3 text-start font-medium">{text.links}</th>
                </tr>
              </thead>
              <tbody>
                {studentRows.map((row) => (
                  <tr key={row.profile.id} className="border-b border-dashed border-foreground/15">
                    <td className="py-4 font-medium">
                      {row.profile.nickname || text.noNickname}
                    </td>
                    <td className="py-4 font-mono">{row.completedLessons}</td>
                    <td className="py-4 font-mono">{row.completedChecklistItems}</td>
                    <td className="py-4">
                      <div className="flex flex-col gap-1">
                        {row.links.length === 0 ? (
                          <span className="text-muted-foreground">-</span>
                        ) : (
                          row.links.map((link) => (
                            <a
                              key={link.id}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="max-w-sm truncate underline decoration-[color:var(--chart-4)] decoration-2 underline-offset-[5px]"
                            >
                              {link.type}: {link.url}
                            </a>
                          ))
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </article>
    </CourseShell>
  );
}
