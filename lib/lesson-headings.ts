import { promises as fs } from "node:fs";
import path from "node:path";

import type { Locale } from "@/lib/course";

function slugifyHeading(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9؀-ۿ\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export type LessonHeading = { id: string; text: string };

export async function loadLessonHeadings(
  locale: Locale,
  slug: string,
): Promise<LessonHeading[]> {
  const file = path.join(
    process.cwd(),
    "content",
    "lessons",
    locale,
    `${slug}.mdx`,
  );
  let raw: string;
  try {
    raw = await fs.readFile(file, "utf8");
  } catch {
    return [];
  }
  const headings: LessonHeading[] = [];
  let inFence = false;
  for (const line of raw.split(/\r?\n/)) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) {
      const text = match[1].trim();
      headings.push({ id: slugifyHeading(text), text });
    }
  }
  return headings;
}
