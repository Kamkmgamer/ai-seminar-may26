import { auth } from "@clerk/nextjs/server";
import { and, count, eq } from "drizzle-orm";

import { checklistProgress, lessonProgress, profiles, projectLinks } from "@/db/schema";
import { isCurrentUserAdmin } from "@/lib/admin";
import { isLocale, type Locale } from "@/lib/course";
import { getDb } from "@/lib/db";
import { getMilestoneBadges } from "@/lib/milestones";

const headers = [
  "nickname",
  "email",
  "preferred_locale",
  "os_preference",
  "completed_lessons",
  "completed_checklist_items",
  "project_links",
  "badges",
];

function csvCell(value: string | number | null | undefined) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response("Not found", { status: 404 });

  await auth.protect();

  if (!(await isCurrentUserAdmin())) {
    return new Response("Forbidden", { status: 403 });
  }

  if (!process.env.DATABASE_URL) {
    return new Response("Admin analytics are not configured.", { status: 503 });
  }

  const db = getDb();
  const studentProfiles = await db.select().from(profiles);
  const rows = await Promise.all(
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
      const completedLessons = completed?.value ?? 0;
      const completedChecklistItems = completedChecklist?.value ?? 0;
      const badges = getMilestoneBadges({
        completedLessons,
        completedChecklistItems,
        submittedLinks: links.length,
      })
        .map((badge) => badge.label[locale as Locale])
        .join("; ");

      return [
        profile.nickname,
        profile.email,
        profile.preferredLocale,
        profile.osPreference,
        completedLessons,
        completedChecklistItems,
        links.map((link) => `${link.type}: ${link.url}`).join("; "),
        badges,
      ];
    }),
  );
  const csv = [headers, ...rows]
    .map((row) => row.map((value) => csvCell(value)).join(","))
    .join("\n");

  return new Response(csv, {
    headers: {
      "content-disposition": `attachment; filename="admin-students-${locale}.csv"`,
      "content-type": "text/csv; charset=utf-8",
    },
  });
}
