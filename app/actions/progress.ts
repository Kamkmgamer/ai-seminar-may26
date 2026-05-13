"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { and, count, desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  courseEvents,
  lessonProgress,
  profiles,
  projectLinks,
} from "@/db/schema";
import { getDb } from "@/lib/db";
import { isLocale, readyLessons } from "@/lib/course";
import { parseProjectLink } from "@/lib/project-links";

const nicknameSchema = z.string().trim().min(2).max(40);
const osSchema = z.enum(["windows", "macos", "linux", "unsure", ""]);

async function requireProfile() {
  const { userId } = await auth();
  if (!userId) throw new Error("Sign in required.");

  const user = await currentUser();
  const db = getDb();
  const email = user?.primaryEmailAddress?.emailAddress ?? null;

  const [profile] = await db
    .insert(profiles)
    .values({ clerkUserId: userId, email })
    .onConflictDoUpdate({
      target: profiles.clerkUserId,
      set: { email, updatedAt: new Date() },
    })
    .returning();

  return profile;
}

export async function saveLessonCompletion(slug: string, completed: boolean) {
  if (!readyLessons.some((lesson) => lesson.slug === slug)) {
    throw new Error("Unknown lesson.");
  }

  const profile = await requireProfile();
  const db = getDb();
  const now = new Date();

  await db
    .insert(lessonProgress)
    .values({
      profileId: profile.id,
      lessonSlug: slug,
      completed,
      completedAt: completed ? now : null,
    })
    .onConflictDoUpdate({
      target: [lessonProgress.profileId, lessonProgress.lessonSlug],
      set: { completed, completedAt: completed ? now : null, updatedAt: now },
    });

  await db.insert(courseEvents).values({
    profileId: profile.id,
    type: completed ? "lesson_completed" : "lesson_reopened",
    lessonSlug: slug,
  });

  revalidatePath("/[locale]/learn/[slug]", "page");
}

export async function updateProfileAction(formData: FormData) {
  const profile = await requireProfile();
  const db = getDb();
  const rawLocale = formData.get("locale");
  const locale = typeof rawLocale === "string" && isLocale(rawLocale) ? rawLocale : "en";
  const nickname = nicknameSchema.parse(formData.get("nickname"));
  const osPreference = osSchema.parse(formData.get("osPreference") ?? "");

  await db.update(profiles).set({
    nickname,
    preferredLocale: locale,
    osPreference: osPreference || null,
    updatedAt: new Date(),
  }).where(eq(profiles.id, profile.id));

  await db.insert(courseEvents).values({
    profileId: profile.id,
    type: "preferences_updated",
  });

  revalidatePath(`/${locale}/profile`);
  revalidatePath(`/${locale}/leaderboard`);
}

export async function submitProjectLinkAction(formData: FormData) {
  const profile = await requireProfile();
  const db = getDb();
  const type = formData.get("type") === "deployment" ? "deployment" : "github";
  const rawUrl = formData.get("url");

  if (typeof rawUrl !== "string" || rawUrl.trim() === "") {
    await db
      .delete(projectLinks)
      .where(and(eq(projectLinks.profileId, profile.id), eq(projectLinks.type, type)));
    revalidatePath("/[locale]/profile", "page");
    revalidatePath("/[locale]/leaderboard", "page");
    return;
  }

  const parsed = parseProjectLink(formData.get("url"));

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid URL.");
  }

  await db
    .insert(projectLinks)
    .values({ profileId: profile.id, type, url: parsed.data })
    .onConflictDoUpdate({
      target: [projectLinks.profileId, projectLinks.type],
      set: { url: parsed.data, updatedAt: new Date() },
    });

  await db.insert(courseEvents).values({
    profileId: profile.id,
    type: "project_link_submitted",
    metadata: JSON.stringify({ type }),
  });

  revalidatePath("/[locale]/profile", "page");
  revalidatePath("/[locale]/leaderboard", "page");
}

export async function getSignedInProfile() {
  const { userId } = await auth();
  if (!userId || !process.env.DATABASE_URL) return null;

  const db = getDb();
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.clerkUserId, userId))
    .limit(1);

  return profile ?? null;
}

export async function getSignedInDashboard() {
  const profile = await requireProfile();
  const db = getDb();

  const [completed] = await db
    .select({ value: count() })
    .from(lessonProgress)
    .where(and(eq(lessonProgress.profileId, profile.id), eq(lessonProgress.completed, true)));

  const links = await db
    .select()
    .from(projectLinks)
    .where(eq(projectLinks.profileId, profile.id));

  return { profile, completedLessons: completed?.value ?? 0, links };
}

export async function getLeaderboardRows() {
  if (!process.env.DATABASE_URL) return [];

  try {
    const db = getDb();

    return await db
      .select({
        profileId: profiles.id,
        nickname: profiles.nickname,
        completedLessons: sql<number>`count(distinct ${lessonProgress.lessonSlug})::int`,
        submittedLinks: sql<number>`count(distinct ${projectLinks.id})::int`,
      })
      .from(profiles)
      .leftJoin(
        lessonProgress,
        and(eq(lessonProgress.profileId, profiles.id), eq(lessonProgress.completed, true)),
      )
      .leftJoin(projectLinks, eq(projectLinks.profileId, profiles.id))
      .groupBy(profiles.id)
      .orderBy(
        desc(sql`count(distinct ${lessonProgress.lessonSlug})`),
        desc(sql`count(distinct ${projectLinks.id})`),
      )
      .limit(25);
  } catch {
    return [];
  }
}
