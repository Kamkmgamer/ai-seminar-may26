export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export type Lesson = {
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  status: "ready" | "planned";
  minutes: number;
};

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

export const lessons: Lesson[] = [
  {
    slug: "welcome",
    status: "ready",
    minutes: 8,
    title: {
      en: "Welcome to AI in 2026",
      ar: "مرحب بيك في AI سنة 2026",
    },
    summary: {
      en: "Understand why AI changed so quickly and what students should learn first.",
      ar: "نفهم ليه AI اتغير بسرعة وشنو أول حاجات الطلاب يتعلموها.",
    },
  },
  {
    slug: "agents",
    status: "ready",
    minutes: 14,
    title: {
      en: "What AI agents are",
      ar: "يعني شنو AI Agents؟",
    },
    summary: {
      en: "Learn what makes an agent different from a chatbot and where OpenCode fits.",
      ar: "نعرف الفرق بين الـ agent والـ chatbot، ووين OpenCode داخل القصة.",
    },
  },
  {
    slug: "opencode-concept",
    status: "ready",
    minutes: 12,
    title: {
      en: "OpenCode before installation",
      ar: "OpenCode قبل التثبيت",
    },
    summary: {
      en: "Preview the agent loop before installing anything: prompt, inspect, propose, edit, verify.",
      ar: "شوف لوب الـ agent قبل أي تثبيت: prompt، فحص، اقتراح، تعديل، تحقق.",
    },
  },
  {
    slug: "windows-setup",
    status: "ready",
    minutes: 18,
    title: {
      en: "Windows setup path",
      ar: "تجهيز ويندوز",
    },
    summary: {
      en: "Prepare a Windows machine for practical AI tools and agent workflows.",
      ar: "نجهز ويندوز لأدوات AI العملية وشغل الـ agents.",
    },
  },
  {
    slug: "linux-basics",
    status: "ready",
    minutes: 14,
    title: {
      en: "Basic Linux guide",
      ar: "أساسيات Linux",
    },
    summary: {
      en: "Learn the small set of Linux terminal habits that make AI agent work safer.",
      ar: "اتعلم عادات Linux terminal البتخلي شغل الـ agents أكثر أماناً.",
    },
  },
  {
    slug: "node-npm",
    status: "ready",
    minutes: 16,
    title: {
      en: "Node and npm",
      ar: "Node و npm",
    },
    summary: {
      en: "Install the JavaScript runtime and package manager used by the portfolio project.",
      ar: "نثبت الأدوات البتشغل JavaScript وبتنزل المكتبات للمشروع.",
    },
  },
  {
    slug: "opencode-hands-on",
    status: "ready",
    minutes: 22,
    title: {
      en: "OpenCode hands-on",
      ar: "تجربة OpenCode عملي",
    },
    summary: {
      en: "Install OpenCode, open a project, and practice safe agent prompts.",
      ar: "نثبت OpenCode ونفتح مشروع ونتعلم نسأل الـ agent بطريقة آمنة.",
    },
  },
  {
    slug: "portfolio",
    status: "ready",
    minutes: 35,
    title: {
      en: "Build your portfolio",
      ar: "ابني البورتفوليو بتاعك",
    },
    summary: {
      en: "Use the agent to build a small personal portfolio that can be deployed.",
      ar: "نستخدم الـ agent عشان نبني بورتفوليو بسيط نقدر ننشره.",
    },
  },
  {
    slug: "github-safety",
    status: "ready",
    minutes: 20,
    title: {
      en: "GitHub and secrets safety",
      ar: "GitHub وحماية الأسرار",
    },
    summary: {
      en: "Publish code without leaking API keys, tokens, or environment files.",
      ar: "ننشر الكود من غير ما نسرب API keys أو tokens أو ملفات البيئة.",
    },
  },
  {
    slug: "deploy",
    status: "ready",
    minutes: 20,
    title: {
      en: "Deploy your site",
      ar: "انشر موقعك",
    },
    summary: {
      en: "Choose a hosting guide and get the portfolio online.",
      ar: "اختار طريقة استضافة وخلي البورتفوليو يظهر في الإنترنت.",
    },
  },
];

export const readyLessons = lessons.filter((lesson) => lesson.status === "ready");

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getNextReadyLesson(slug: string) {
  const index = readyLessons.findIndex((lesson) => lesson.slug === slug);
  return readyLessons[index + 1];
}

export function getPreviousReadyLesson(slug: string) {
  const index = readyLessons.findIndex((lesson) => lesson.slug === slug);
  return index > 0 ? readyLessons[index - 1] : undefined;
}

export function getLessonPosition(slug: string) {
  const index = readyLessons.findIndex((lesson) => lesson.slug === slug);
  return { index, total: readyLessons.length };
}

const chapterCopy: Record<Locale, Record<string, string>> = {
  en: {
    welcome: "Orientation",
    agents: "Foundation",
    "opencode-concept": "Foundation",
    "windows-setup": "Setup",
    "linux-basics": "Setup",
    "node-npm": "Setup",
    "opencode-hands-on": "Practice",
    portfolio: "Build",
    "github-safety": "Safety",
    deploy: "Ship",
  },
  ar: {
    welcome: "البداية",
    agents: "الأساس",
    "opencode-concept": "الأساس",
    "windows-setup": "التجهيز",
    "linux-basics": "التجهيز",
    "node-npm": "التجهيز",
    "opencode-hands-on": "تطبيق",
    portfolio: "البناء",
    "github-safety": "الأمان",
    deploy: "النشر",
  },
};

export function getChapterLabel(slug: string, locale: Locale) {
  return chapterCopy[locale][slug] ?? "";
}
