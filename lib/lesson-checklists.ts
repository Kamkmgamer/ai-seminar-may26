import { type Locale } from "@/lib/course";

export type ChecklistItem = {
  key: string;
  label: Record<Locale, string>;
};

export const lessonChecklists: Record<string, ChecklistItem[]> = {
  "github-safety": [
    {
      key: "git-status",
      label: {
        en: "I ran git status before publishing.",
        ar: "شغلت git status قبل النشر.",
      },
    },
    {
      key: "env-not-staged",
      label: {
        en: "I checked that no .env files are staged.",
        ar: "اتأكدت إن ما في ملفات .env staged.",
      },
    },
    {
      key: "no-api-keys",
      label: {
        en: "I checked that no API keys appear in code.",
        ar: "اتأكدت إن ما في API keys في الكود.",
      },
    },
    {
      key: "repo-visibility",
      label: {
        en: "I understand whether my repository is public or private.",
        ar: "فاهم الـ repository عام ولا خاص.",
      },
    },
    {
      key: "rotate-secret",
      label: {
        en: "I know how to rotate a key if I accidentally expose it.",
        ar: "عارف كيف أعمل rotate لو مفتاح اتسرب.",
      },
    },
  ],
  deploy: [
    {
      key: "runs-locally",
      label: {
        en: "The project runs locally.",
        ar: "المشروع شغال محلياً.",
      },
    },
    {
      key: "code-on-github",
      label: {
        en: "The code is on GitHub.",
        ar: "الكود في GitHub.",
      },
    },
    {
      key: "no-secrets-committed",
      label: {
        en: "No secrets are committed.",
        ar: "ما في أسرار committed.",
      },
    },
    {
      key: "provider-connected",
      label: {
        en: "The hosting provider is connected to the correct repository.",
        ar: "منصة الاستضافة مربوطة بالـ repository الصحيح.",
      },
    },
    {
      key: "public-url-opens",
      label: {
        en: "The deployed URL opens in a private/incognito browser window.",
        ar: "رابط الموقع بيفتح في private/incognito browser window.",
      },
    },
  ],
};

export function getLessonChecklist(slug: string) {
  return lessonChecklists[slug] ?? [];
}

export function hasChecklistItem(slug: string, itemKey: string) {
  return Boolean(lessonChecklists[slug]?.some((item) => item.key === itemKey));
}

export function getChecklistItemCount() {
  return Object.values(lessonChecklists).reduce(
    (total, items) => total + items.length,
    0,
  );
}
