import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

import { CodeBlock } from "@/components/code-block";

function slugify(input: unknown): string {
  if (typeof input === "string") {
    return input
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9؀-ۿ\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }
  if (Array.isArray(input)) {
    return input.map(slugify).join("-");
  }
  if (input && typeof input === "object" && "props" in input) {
    return slugify((input as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

const components: MDXComponents = {
  h1: () => null,
  h2: ({ children }) => {
    const id = slugify(children);
    return (
      <h2
        id={id}
        className="mt-14 scroll-mt-28 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = slugify(children);
    return (
      <h3
        id={id}
        className="mt-10 scroll-mt-28 text-lg font-semibold tracking-tight text-foreground md:text-xl"
      >
        {children}
      </h3>
    );
  },
  p: ({ children }) => (
    <p className="mt-5 text-[1.0625rem] font-medium leading-[1.75] text-foreground/90">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 flex list-disc flex-col gap-2 ps-6 text-[1.0625rem] font-medium leading-[1.75] text-foreground/90 marker:text-[color:var(--chart-4)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 flex list-decimal flex-col gap-2 ps-6 text-[1.0625rem] font-medium leading-[1.75] text-foreground/90 marker:font-mono marker:text-muted-foreground">
      {children}
    </ol>
  ),
  a: ({ children, href }) => {
    const isExternal = typeof href === "string" && /^https?:\/\//i.test(href);
    return (
      <a
        className="font-medium text-foreground underline decoration-[color:var(--chart-4)] decoration-2 underline-offset-[5px] transition-colors hover:text-[color:var(--chart-4)]"
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer noopener" : undefined}
      >
        {children}
        {isExternal ? (
          <span
            aria-hidden
            className="ms-1 inline-block translate-y-[-1px] text-[0.7em] text-muted-foreground"
          >
            ↗
          </span>
        ) : null}
      </a>
    );
  },
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  code: ({ children, className, ...rest }) => {
    const isBlock = typeof className === "string" && className.startsWith("language-");
    if (isBlock) {
      return (
        <code dir="ltr" className={className} {...rest}>
          {children}
        </code>
      );
    }
    return (
      <code
        dir="ltr"
        className="rounded-md border border-foreground/10 bg-foreground/[0.05] px-1.5 py-0.5 font-mono text-[0.875em] text-foreground"
        {...rest}
      >
        {children}
      </code>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="mt-8 border-s-2 border-[color:var(--chart-4)] ps-6 py-1 text-xl font-medium leading-snug tracking-tight text-foreground/90">
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-12 border-0 border-t border-dashed border-foreground/20" />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
