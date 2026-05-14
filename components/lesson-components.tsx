import { type ReactNode } from "react";

type LessonBoxProps = {
  title?: string;
  children: ReactNode;
};

export function Callout({ title, children }: LessonBoxProps) {
  return (
    <aside className="my-8 rounded-[1.5rem] border border-dashed bg-card/70 p-5">
      {title ? (
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {title}
        </p>
      ) : null}
      <div className="mt-3 text-sm leading-7 text-foreground/90">{children}</div>
    </aside>
  );
}

export function Warning({ title = "Safety note", children }: LessonBoxProps) {
  return (
    <aside className="my-8 rounded-[1.5rem] border border-dashed border-destructive/40 bg-destructive/10 p-5">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-destructive">
        {title}
      </p>
      <div className="mt-3 text-sm leading-7 text-foreground/90">{children}</div>
    </aside>
  );
}

export function ReferenceBox({ title = "Official references", children }: LessonBoxProps) {
  return (
    <section className="my-10 border-t border-dashed border-foreground/20 pt-6">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {title}
      </p>
      <div className="mt-3 text-sm leading-7 text-foreground/90">{children}</div>
    </section>
  );
}

export function OSTabs({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 rounded-[1.5rem] border bg-card/60 p-5">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        OS paths
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">{children}</div>
    </div>
  );
}

export function OSPanel({ title, children }: LessonBoxProps) {
  return (
    <section className="rounded-2xl border border-dashed bg-background/70 p-4">
      {title ? <h3 className="text-sm font-semibold tracking-tight">{title}</h3> : null}
      <div className="mt-2 text-sm leading-6 text-muted-foreground">{children}</div>
    </section>
  );
}
