import { z } from "zod";

export const projectLinkSchema = z
  .string()
  .trim()
  .url()
  .max(300)
  .refine((value) => value.startsWith("https://"), "Use an https:// URL.")
  .refine((value) => !/[?&](token|key|secret|access_token)=/i.test(value), {
    message: "Remove tokenized query parameters before submitting.",
  })
  .refine((value) => !/localhost|127\.0\.0\.1|\.local/i.test(value), {
    message: "Submit a public URL, not a local development URL.",
  });

export function parseProjectLink(value: FormDataEntryValue | null) {
  return projectLinkSchema.safeParse(typeof value === "string" ? value : "");
}
