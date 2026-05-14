import { type Locale } from "@/lib/course";

export type ChecklistItem = {
  key: string;
  label: Record<Locale, string>;
};

export const lessonChecklists: Record<string, ChecklistItem[]> = {
  welcome: [
    {
      key: "understand-outcome",
      label: {
        en: "I understand the workshop outcome: safe AI use plus a deployed portfolio.",
        ar: "فاهم نتيجة الورشة: استخدام AI بأمان ومعاه بورتفوليو منشور.",
      },
    },
    {
      key: "know-core-path",
      label: {
        en: "I know the core path: agents, setup, OpenCode, portfolio, GitHub, deploy.",
        ar: "عارف المسار الأساسي: agents، تجهيز، OpenCode، بورتفوليو، GitHub، نشر.",
      },
    },
  ],
  agents: [
    {
      key: "agent-vs-chatbot",
      label: {
        en: "I can explain the difference between a chatbot and an agent.",
        ar: "بقدر أشرح الفرق بين chatbot و agent.",
      },
    },
    {
      key: "human-decision",
      label: {
        en: "I understand that agent changes stay suggestions until I review them.",
        ar: "فاهم إن تعديلات الـ agent مجرد اقتراحات لحدي ما أراجعها.",
      },
    },
  ],
  "opencode-concept": [
    {
      key: "inspect-first",
      label: {
        en: "I know to ask the agent to inspect before editing.",
        ar: "عارف أطلب من الـ agent يفحص قبل التعديل.",
      },
    },
    {
      key: "verify-diff",
      label: {
        en: "I know to review the diff and ask how to verify it.",
        ar: "عارف أراجع الـ diff وأسأل كيف أتحقق منه.",
      },
    },
  ],
  "windows-setup": [
    {
      key: "terminal-opened",
      label: {
        en: "I opened a terminal and know where to type commands.",
        ar: "فتحت التيرمنال وعارف أكتب الأوامر وين.",
      },
    },
    {
      key: "powershell-check",
      label: {
        en: "I checked the shell/version information requested in the lesson.",
        ar: "راجعت معلومات الـ shell/version المطلوبة في الدرس.",
      },
    },
  ],
  "linux-basics": [
    {
      key: "current-directory",
      label: {
        en: "I understand that terminal commands run from the current directory.",
        ar: "فاهم إن أوامر التيرمنال بتشتغل من الـ directory الحالي.",
      },
    },
    {
      key: "destructive-warning",
      label: {
        en: "I know to stop before remove, reset, or --force commands.",
        ar: "عارف أوقف قبل أوامر المسح أو reset أو --force.",
      },
    },
  ],
  "node-npm": [
    {
      key: "node-installed",
      label: {
        en: "node --version prints a version number.",
        ar: "أمر node --version بطلع رقم نسخة.",
      },
    },
    {
      key: "npm-installed",
      label: {
        en: "npm --version prints a version number.",
        ar: "أمر npm --version بطلع رقم نسخة.",
      },
    },
  ],
  "opencode-hands-on": [
    {
      key: "docs-checked",
      label: {
        en: "I checked the current OpenCode docs before installing.",
        ar: "راجعت وثائق OpenCode الحالية قبل التثبيت.",
      },
    },
    {
      key: "safe-prompt",
      label: {
        en: "I practiced a safe prompt that asks before editing or running commands.",
        ar: "جربت prompt آمن بطلب قبل التعديل أو تشغيل الأوامر.",
      },
    },
  ],
  portfolio: [
    {
      key: "small-plan",
      label: {
        en: "I asked the agent for a short plan before code changes.",
        ar: "طلبت من الـ agent خطة قصيرة قبل تعديل الكود.",
      },
    },
    {
      key: "reviewed-changes",
      label: {
        en: "I reviewed which files changed before moving on.",
        ar: "راجعت الملفات الاتغيرت قبل ما أكمل.",
      },
    },
  ],
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
