import type { Locale } from "@/lib/course";
import type { ComponentType } from "react";

type LessonLoader = () => Promise<{ default: ComponentType }>;

const modules: Record<Locale, Record<string, LessonLoader>> = {
  en: {
    welcome: () => import("@/content/lessons/en/welcome.mdx"),
    agents: () => import("@/content/lessons/en/agents.mdx"),
  },
  ar: {
    welcome: () => import("@/content/lessons/ar/welcome.mdx"),
    agents: () => import("@/content/lessons/ar/agents.mdx"),
  },
};

export async function loadLesson(locale: Locale, slug: string) {
  const loader = modules[locale][slug];

  if (!loader) {
    return null;
  }

  return loader();
}
