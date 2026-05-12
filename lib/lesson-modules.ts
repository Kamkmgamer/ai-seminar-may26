import type { Locale } from "@/lib/course";
import type { ComponentType } from "react";

type LessonLoader = () => Promise<{ default: ComponentType }>;

const modules: Record<Locale, Record<string, LessonLoader>> = {
  en: {
    welcome: () => import("@/content/lessons/en/welcome.mdx"),
    agents: () => import("@/content/lessons/en/agents.mdx"),
    "windows-setup": () => import("@/content/lessons/en/windows-setup.mdx"),
    "node-npm": () => import("@/content/lessons/en/node-npm.mdx"),
    "opencode-hands-on": () =>
      import("@/content/lessons/en/opencode-hands-on.mdx"),
    portfolio: () => import("@/content/lessons/en/portfolio.mdx"),
    "github-safety": () => import("@/content/lessons/en/github-safety.mdx"),
    deploy: () => import("@/content/lessons/en/deploy.mdx"),
  },
  ar: {
    welcome: () => import("@/content/lessons/ar/welcome.mdx"),
    agents: () => import("@/content/lessons/ar/agents.mdx"),
    "windows-setup": () => import("@/content/lessons/ar/windows-setup.mdx"),
    "node-npm": () => import("@/content/lessons/ar/node-npm.mdx"),
    "opencode-hands-on": () =>
      import("@/content/lessons/ar/opencode-hands-on.mdx"),
    portfolio: () => import("@/content/lessons/ar/portfolio.mdx"),
    "github-safety": () => import("@/content/lessons/ar/github-safety.mdx"),
    deploy: () => import("@/content/lessons/ar/deploy.mdx"),
  },
};

export async function loadLesson(locale: Locale, slug: string) {
  const loader = modules[locale][slug];

  if (!loader) {
    return null;
  }

  return loader();
}
