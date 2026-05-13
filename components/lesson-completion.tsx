"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { saveLessonCompletion } from "@/app/actions/progress";
import { Button } from "@/components/ui/button";
import { type Locale } from "@/lib/course";

const STORAGE_KEY = "ai-seminar-completed-lessons";
const PROGRESS_EVENT = "ai-seminar-progress-change";

const copy = {
  en: {
    label: "Local progress",
    title: "Save this lesson on this device.",
    body: "No account needed yet. This only stores the lesson slug in your browser, not commands, secrets, or project files.",
    mark: "Mark complete",
    unmark: "Undo complete",
    saved: "Saved locally",
    savedAccount: "Saved to account",
  },
  ar: {
    label: "تقدم محلي",
    title: "احفظ الدرس في الجهاز ده.",
    body: "لسه ما محتاج حساب. ده بخزن slug الدرس في المتصفح بس، ما أوامر ولا أسرار ولا ملفات مشروع.",
    mark: "علّم كمكتمل",
    unmark: "إلغاء الاكتمال",
    saved: "محفوظ محلياً",
    savedAccount: "محفوظ في الحساب",
  },
} satisfies Record<Locale, Record<string, string>>;

export function getCompletedLessonSlugs() {
  if (typeof window === "undefined") return new Set<string>();

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []);
  } catch {
    return new Set<string>();
  }
}

function saveCompletedLessonSlugs(slugs: Set<string>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...slugs].sort()));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function subscribeToLessonProgress(callback: () => void) {
  window.addEventListener(PROGRESS_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(PROGRESS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function LessonCompletion({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const text = copy[locale];
  const { isSignedIn } = useUser();
  const [isComplete, setIsComplete] = useState(false);
  const [syncFailed, setSyncFailed] = useState(false);

  useEffect(() => {
    const sync = () => setIsComplete(getCompletedLessonSlugs().has(slug));
    sync();
    return subscribeToLessonProgress(sync);
  }, [slug]);

  async function toggleComplete() {
    const slugs = getCompletedLessonSlugs();
    const nextComplete = !slugs.has(slug);

    if (!nextComplete) {
      slugs.delete(slug);
    } else {
      slugs.add(slug);
    }

    saveCompletedLessonSlugs(slugs);
    setIsComplete(slugs.has(slug));

    if (isSignedIn) {
      try {
        await saveLessonCompletion(slug, nextComplete);
        setSyncFailed(false);
      } catch {
        setSyncFailed(true);
      }
    }
  }

  return (
    <section className="my-10 grid gap-4 rounded-[1.75rem] border border-dashed bg-card/60 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {text.label}
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight">{text.title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {text.body}
        </p>
      </div>
      <div className="flex items-center gap-3 sm:justify-end">
        {isComplete ? (
          <span className="text-sm font-medium text-[color:var(--chart-4)]">
            {isSignedIn && !syncFailed ? text.savedAccount : text.saved}
          </span>
        ) : null}
        <Button
          type="button"
          variant={isComplete ? "outline" : "default"}
          onClick={toggleComplete}
        >
          {isComplete ? text.unmark : text.mark}
        </Button>
      </div>
    </section>
  );
}
