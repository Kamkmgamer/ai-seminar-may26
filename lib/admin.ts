import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { adminEmails } from "@/db/schema";
import { getDb } from "@/lib/db";

export function getAdminEmailAllowlist() {
  return (process.env.ADMIN_EMAIL_ALLOWLIST ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function isCurrentUserAdmin() {
  const allowlist = getAdminEmailAllowlist();
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();

  if (!email) return false;
  if (allowlist.includes(email)) return true;
  if (!process.env.DATABASE_URL) return false;

  try {
    const [adminEmail] = await getDb()
      .select({ id: adminEmails.id })
      .from(adminEmails)
      .where(eq(adminEmails.email, email))
      .limit(1);

    return Boolean(adminEmail);
  } catch {
    return false;
  }
}
