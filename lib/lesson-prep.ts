import { type Locale } from "@/lib/course";

type LessonPrep = {
  prerequisites: Record<Locale, string[]>;
};

const defaultPrerequisites: Record<Locale, string[]> = {
  en: ["A laptop", "Internet access", "A few minutes to read before running commands"],
  ar: ["لابتوب", "اتصال إنترنت", "كم دقيقة للقراءة قبل تشغيل الأوامر"],
};

export const lessonPrep: Record<string, LessonPrep> = {
  welcome: {
    prerequisites: {
      en: ["No AI or coding background required"],
      ar: ["ما محتاج خلفية AI أو برمجة"],
    },
  },
  agents: {
    prerequisites: {
      en: ["Read the welcome lesson", "Keep the agent safety rule in mind"],
      ar: ["اقرأ درس البداية", "خلي قاعدة أمان الـ agent في بالك"],
    },
  },
  "opencode-concept": {
    prerequisites: {
      en: ["Read the agents lesson", "Have a project folder in mind"],
      ar: ["اقرأ درس الـ agents", "خلي في بالك مجلد مشروع"],
    },
  },
  "windows-setup": {
    prerequisites: {
      en: ["A Windows laptop", "Permission to open PowerShell or Windows Terminal"],
      ar: ["لابتوب ويندوز", "صلاحية فتح PowerShell أو Windows Terminal"],
    },
  },
  "linux-basics": {
    prerequisites: {
      en: ["A terminal", "No destructive commands unless you fully understand them"],
      ar: ["تيرمنال", "ما تشغل أوامر خطرة إلا لو فاهمها تماماً"],
    },
  },
  "node-npm": {
    prerequisites: {
      en: ["A working terminal", "Permission to install software"],
      ar: ["تيرمنال شغال", "صلاحية تثبيت برامج"],
    },
  },
  "opencode-hands-on": {
    prerequisites: {
      en: ["Node and npm installed", "Official OpenCode docs open for current commands"],
      ar: ["Node و npm مثبتين", "وثائق OpenCode الرسمية مفتوحة للأوامر الحالية"],
    },
  },
  portfolio: {
    prerequisites: {
      en: ["A project folder", "An agent session you can review before accepting edits"],
      ar: ["مجلد مشروع", "جلسة agent تقدر تراجعها قبل قبول التعديلات"],
    },
  },
  "github-safety": {
    prerequisites: {
      en: ["A GitHub account or time to create one", "A project you are ready to inspect"],
      ar: ["حساب GitHub أو وقت لإنشائه", "مشروع جاهز تفتشه"],
    },
  },
  deploy: {
    prerequisites: {
      en: ["Code pushed to GitHub", "No secrets committed", "A hosting provider account"],
      ar: ["الكود مرفوع في GitHub", "ما في أسرار committed", "حساب في منصة استضافة"],
    },
  },
};

export function getLessonPrerequisites(slug: string, locale: Locale) {
  return lessonPrep[slug]?.prerequisites[locale] ?? defaultPrerequisites[locale];
}
