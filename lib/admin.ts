import { currentUser } from "@clerk/nextjs/server";

export function getAdminEmailAllowlist() {
  return (process.env.ADMIN_EMAIL_ALLOWLIST ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function isCurrentUserAdmin() {
  const allowlist = getAdminEmailAllowlist();
  if (allowlist.length === 0) return false;

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();

  return Boolean(email && allowlist.includes(email));
}
