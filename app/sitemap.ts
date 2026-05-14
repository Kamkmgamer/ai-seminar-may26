import { MetadataRoute } from "next";
import { locales, lessons, readyLessons } from "@/lib/course";

const BASE_URL = "https://ai-seminar-may26.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/en",
    "/ar",
    "/en/agents",
    "/ar/agents",
    "/en/references",
    "/ar/references",
    "/en/leaderboard",
    "/ar/leaderboard",
    "/en/profile",
    "/ar/profile",
    "/en/admin",
    "/ar/admin",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      const url = `${BASE_URL}/${locale}${path}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.8,
      });
    }
  }

  for (const locale of locales) {
    for (const lesson of readyLessons) {
      const url = `${BASE_URL}/${locale}/learn/${lesson.slug}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  return sitemapEntries;
}