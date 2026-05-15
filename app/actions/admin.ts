"use server";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { adminEmails } from "@/db/schema";
import { getAdminEmailAllowlist, isCurrentUserAdmin } from "@/lib/admin";
import { isLocale } from "@/lib/course";
import { getDb } from "@/lib/db";

const adminEmailSchema = z.string().trim().toLowerCase().email();

async function requireAdmin() {
  if (!(await isCurrentUserAdmin())) {
    throw new Error("Admin access required.");
  }
}

function getLocale(formData: FormData) {
  const locale = formData.get("locale");
  return typeof locale === "string" && isLocale(locale) ? locale : "en";
}

export async function addAdminEmailAction(formData: FormData) {
  await requireAdmin();

  const locale = getLocale(formData);
  const email = adminEmailSchema.parse(formData.get("email"));
  const user = await currentUser();
  const createdByEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? null;

  await getDb()
    .insert(adminEmails)
    .values({ email, createdByEmail })
    .onConflictDoNothing({ target: adminEmails.email });

  revalidatePath(`/${locale}/admin`);
}

export async function removeAdminEmailAction(formData: FormData) {
  await requireAdmin();

  const locale = getLocale(formData);
  const id = formData.get("id");
  if (typeof id !== "string" || id.trim() === "") {
    throw new Error("Missing admin id.");
  }

  const db = getDb();
  const [adminEmail] = await db
    .select({ email: adminEmails.email })
    .from(adminEmails)
    .where(eq(adminEmails.id, id))
    .limit(1);

  if (!adminEmail) return;

  const user = await currentUser();
  const currentEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
  const envAdminEmails = getAdminEmailAllowlist();
  if (currentEmail === adminEmail.email && !envAdminEmails.includes(currentEmail)) {
    throw new Error("You cannot remove your own only admin access.");
  }

  await db.delete(adminEmails).where(eq(adminEmails.id, id));
  revalidatePath(`/${locale}/admin`);
}
