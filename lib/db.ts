import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

let cachedDb: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getDb() {
  if (cachedDb) return cachedDb;

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required for persisted progress.");
  }

  cachedDb = drizzle(neon(databaseUrl), { schema });
  return cachedDb;
}
