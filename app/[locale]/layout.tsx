import { notFound } from "next/navigation";

import { isLocale, localeDirections } from "@/lib/course";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div lang={locale} dir={localeDirections[locale]}>
      {children}
    </div>
  );
}
