"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useTransition } from "react";

import { saveChecklistCompletion } from "@/app/actions/progress";
import { type Locale } from "@/lib/course";
import { type ChecklistItem } from "@/lib/lesson-checklists";

const STORAGE_KEY = "ai-seminar-checklist-progress";
const CHECKLIST_EVENT = "ai-seminar-checklist-progress-change";

const copy = {
  en: {
    label: "Lesson checklist",
    body: "Tick these as you verify them. Signed-in students sync to the workshop dashboard; everyone else keeps progress in this browser.",
    savedLocal: "Saved locally",
    savedAccount: "Saved to account",
    syncFailed: "Local only for now",
  },
  ar: {
    label: "Checklist الدرس",
    body: "علّم الحاجات بعد ما تتأكد منها. الطلاب الداخلين بحساب بيتزامنوا مع لوحة الورشة؛ والباقي بيتحفظ في المتصفح ده.",
    savedLocal: "محفوظ محلياً",
    savedAccount: "محفوظ في الحساب",
    syncFailed: "محلي فقط حالياً",
  },
} satisfies Record<Locale, Record<string, string>>;

function storageKey(lessonSlug: string, itemKey: string) {
  return `${lessonSlug}:${itemKey}`;
}

function getCompletedChecklistKeys() {
  if (typeof window === "undefined") return new Set<string>();

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []);
  } catch {
    return new Set<string>();
  }
}

function saveCompletedChecklistKeys(keys: Set<string>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...keys].sort()));
  window.dispatchEvent(new Event(CHECKLIST_EVENT));
}

export function LessonChecklist({
  locale,
  lessonSlug,
  items,
}: {
  locale: Locale;
  lessonSlug: string;
  items: ChecklistItem[];
}) {
  const text = copy[locale];
  const { isSignedIn } = useUser();
  const [completedKeys, setCompletedKeys] = useState<Set<string>>(() => new Set());
  const [syncFailedKeys, setSyncFailedKeys] = useState<Set<string>>(() => new Set());
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const sync = () => setCompletedKeys(getCompletedChecklistKeys());
    sync();
    window.addEventListener(CHECKLIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHECKLIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (items.length === 0) return null;

  function toggleItem(itemKey: string) {
    const key = storageKey(lessonSlug, itemKey);
    const keys = getCompletedChecklistKeys();
    const nextComplete = !keys.has(key);

    if (nextComplete) {
      keys.add(key);
    } else {
      keys.delete(key);
    }

    saveCompletedChecklistKeys(keys);
    setCompletedKeys(keys);

    if (isSignedIn) {
      startTransition(async () => {
        try {
          await saveChecklistCompletion(lessonSlug, itemKey, nextComplete);
          setSyncFailedKeys((current) => {
            const next = new Set(current);
            next.delete(key);
            return next;
          });
        } catch {
          setSyncFailedKeys((current) => new Set(current).add(key));
        }
      });
    }
  }

  return (
    <section className="my-10 rounded-[1.75rem] border border-dashed bg-card/60 p-5">
      <div className="max-w-2xl">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {text.label}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{text.body}</p>
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => {
          const key = storageKey(lessonSlug, item.key);
          const checked = completedKeys.has(key);
          const syncFailed = syncFailedKeys.has(key);

          return (
            <li key={item.key}>
              <label className="group flex cursor-pointer items-start gap-3 rounded-2xl border bg-background/70 p-4 transition-colors hover:bg-accent/35">
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={isPending}
                  onChange={() => toggleItem(item.key)}
                  className="mt-1 size-4 accent-[color:var(--chart-4)]"
                />
                <span className="flex-1 text-sm leading-6">
                  {item.label[locale]}
                </span>
                {checked ? (
                  <span className="shrink-0 text-xs font-medium text-[color:var(--chart-4)]">
                    {syncFailed
                      ? text.syncFailed
                      : isSignedIn
                        ? text.savedAccount
                        : text.savedLocal}
                  </span>
                ) : null}
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
