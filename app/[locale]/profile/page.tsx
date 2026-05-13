import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import {
  getSignedInDashboard,
  submitProjectLinkAction,
  updateProfileAction,
} from "@/app/actions/progress";
import { CourseShell } from "@/components/course-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isLocale, readyLessons, type Locale } from "@/lib/course";

const copy = {
  en: {
    badge: "Saved progress",
    title: "Your workshop checkpoint.",
    intro:
      "Sign-in is optional. When enabled, this page stores only safe progress data: lesson slugs, checklist states, nickname, preferences, and public project URLs.",
    setupTitle: "Database not connected yet",
    setupBody:
      "Add DATABASE_URL, run pnpm db:generate, then pnpm db:migrate to enable saved progress.",
    nickname: "Nickname",
    locale: "Preferred language",
    os: "Laptop path",
    save: "Save profile",
    completed: "Completed lessons",
    github: "GitHub project URL",
    deployment: "Deployed portfolio URL",
    submit: "Save URL",
    warning:
      "Submit public https links only. Do not paste private repositories, tokenized URLs, API keys, or dashboard preview links.",
  },
  ar: {
    badge: "تقدم محفوظ",
    title: "نقطة متابعة الورشة بتاعتك.",
    intro:
      "تسجيل الدخول اختياري. عند التفعيل الصفحة دي بتخزن بيانات آمنة فقط: slugs الدروس، حالة checklist، nickname، التفضيلات، وروابط المشاريع العامة.",
    setupTitle: "قاعدة البيانات لسه ما متصلة",
    setupBody:
      "أضف DATABASE_URL، شغل pnpm db:generate، وبعدها pnpm db:migrate لتفعيل حفظ التقدم.",
    nickname: "الاسم الظاهر",
    locale: "اللغة المفضلة",
    os: "مسار اللابتوب",
    save: "احفظ البروفايل",
    completed: "دروس مكتملة",
    github: "رابط مشروع GitHub",
    deployment: "رابط البورتفوليو المنشور",
    submit: "احفظ الرابط",
    warning:
      "أرسل روابط https عامة فقط. ما تلصق repos خاصة، روابط فيها tokens، API keys، أو روابط dashboard preview.",
  },
} satisfies Record<Locale, Record<string, string>>;

const osOptions = ["", "windows", "macos", "linux", "unsure"];

export const dynamic = "force-dynamic";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  await auth.protect();
  const text = copy[locale];

  if (!process.env.DATABASE_URL) {
    return (
      <CourseShell locale={locale}>
        <section className="max-w-3xl rounded-[2rem] border border-dashed bg-card/60 p-8">
          <Badge variant="secondary">{text.badge}</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight">
            {text.setupTitle}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {text.setupBody}
          </p>
        </section>
      </CourseShell>
    );
  }

  const dashboard = await getSignedInDashboard();
  const githubUrl = dashboard.links.find((link) => link.type === "github")?.url ?? "";
  const deploymentUrl =
    dashboard.links.find((link) => link.type === "deployment")?.url ?? "";

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

        <section className="grid gap-6 lg:grid-cols-[1fr_18rem]">
          <form action={updateProfileAction} className="grid gap-5 rounded-[2rem] border bg-card/60 p-6">
            <label className="grid gap-2 text-sm font-medium">
              {text.nickname}
              <input
                name="nickname"
                defaultValue={dashboard.profile.nickname ?? ""}
                required
                minLength={2}
                maxLength={40}
                className="h-11 rounded-lg border bg-background px-3 text-base outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              {text.locale}
              <select
                name="locale"
                defaultValue={dashboard.profile.preferredLocale}
                className="h-11 rounded-lg border bg-background px-3 text-base outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium">
              {text.os}
              <select
                name="osPreference"
                defaultValue={dashboard.profile.osPreference ?? ""}
                className="h-11 rounded-lg border bg-background px-3 text-base outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {osOptions.map((option) => (
                  <option key={option || "blank"} value={option}>
                    {option || "-"}
                  </option>
                ))}
              </select>
            </label>
            <Button type="submit">{text.save}</Button>
          </form>

          <aside className="rounded-[2rem] border border-dashed bg-card/60 p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {text.completed}
            </p>
            <p className="mt-4 font-mono text-5xl font-semibold tracking-[-0.08em]">
              {dashboard.completedLessons}/{readyLessons.length}
            </p>
          </aside>
        </section>

        <section className="grid gap-5 rounded-[2rem] border border-dashed p-6">
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            {text.warning}
          </p>
          <ProjectLinkForm label={text.github} type="github" value={githubUrl} button={text.submit} />
          <ProjectLinkForm
            label={text.deployment}
            type="deployment"
            value={deploymentUrl}
            button={text.submit}
          />
        </section>
      </article>
    </CourseShell>
  );
}

function ProjectLinkForm({
  label,
  type,
  value,
  button,
}: {
  label: string;
  type: "github" | "deployment";
  value: string;
  button: string;
}) {
  return (
    <form action={submitProjectLinkAction} className="grid gap-3 md:grid-cols-[10rem_1fr_auto] md:items-end">
      <input type="hidden" name="type" value={type} />
      <label className="text-sm font-medium md:pb-3" htmlFor={`${type}-url`}>
        {label}
      </label>
      <input
        id={`${type}-url`}
        name="url"
        type="url"
        inputMode="url"
        defaultValue={value}
        placeholder="https://..."
        className="h-11 rounded-lg border bg-background px-3 text-base outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      <Button type="submit" variant="outline">
        {button}
      </Button>
    </form>
  );
}
