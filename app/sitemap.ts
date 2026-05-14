import { MetadataRoute } from "next";
import { locales, readyLessons } from "@/lib/course";

const BASE_URL = "https://ai-seminar-may26.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  sitemapEntries.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  });

  for (const locale of locales) {
    for (const path of ["", "/agents", "/references", "/leaderboard", "/profile"]) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 0.9 : 0.8,
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
