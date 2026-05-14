import { type Locale } from "@/lib/course";

const copy = {
  en: { goal: "Goal", prerequisites: "Before you start" },
  ar: { goal: "الهدف", prerequisites: "قبل ما تبدأ" },
} satisfies Record<Locale, Record<string, string>>;

export function LessonPrep({
  locale,
  goal,
  prerequisites,
}: {
  locale: Locale;
  goal: string;
  prerequisites: string[];
}) {
  const text = copy[locale];

  return (
    <section className="grid gap-px overflow-hidden rounded-[1.75rem] border bg-border/70 md:grid-cols-2">
      <div className="bg-card p-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {text.goal}
        </p>
        <p className="mt-3 text-sm leading-6 text-foreground/90">{goal}</p>
      </div>
      <div className="bg-card p-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {text.prerequisites}
        </p>
        <ul className="mt-3 flex list-disc flex-col gap-1.5 ps-5 text-sm leading-6 text-foreground/90 marker:text-[color:var(--chart-4)]">
          {prerequisites.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
