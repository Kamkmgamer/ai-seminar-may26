import type { MDXComponents } from "mdx/types";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-xl font-semibold text-foreground">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-base leading-7 text-muted-foreground">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 flex list-disc flex-col gap-2 ps-6 text-base leading-7 text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 flex list-decimal flex-col gap-2 ps-6 text-base leading-7 text-muted-foreground">
      {children}
    </ol>
  ),
  a: ({ children, href }) => (
    <a className="font-medium text-primary underline-offset-4 hover:underline" href={href}>
      {children}
    </a>
  ),
  pre: ({ children }) => (
    <pre className="mt-5 overflow-x-auto rounded-2xl border bg-muted p-4 font-mono text-sm leading-6 text-foreground">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <Alert className="mt-6">
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
