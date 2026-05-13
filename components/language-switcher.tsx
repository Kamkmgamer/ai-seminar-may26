"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { localeLabels, locales, type Locale } from "@/lib/course";

type LanguageSwitcherProps = {
  locale: Locale;
  slug?: string;
};

export function LanguageSwitcher({ locale, slug }: LanguageSwitcherProps) {
  const pathname = usePathname();

  function getHref(nextLocale: Locale) {
    if (pathname) {
      return pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${nextLocale}`);
    }

    return slug ? `/${nextLocale}/learn/${slug}` : `/${nextLocale}`;
  }

  return (
    <div className="flex items-center gap-2">
      {locales.map((item) => {
        const href = getHref(item);

        return (
          <Button
            key={item}
            render={<Link href={href} />}
            nativeButton={false}
            variant={item === locale ? "default" : "outline"}
            size="sm"
          >
            {localeLabels[item]}
          </Button>
        );
      })}
    </div>
  );
}
