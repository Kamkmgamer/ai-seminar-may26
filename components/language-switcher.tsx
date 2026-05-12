import Link from "next/link";

import { Button } from "@/components/ui/button";
import { localeLabels, locales, type Locale } from "@/lib/course";

type LanguageSwitcherProps = {
  locale: Locale;
  slug?: string;
};

export function LanguageSwitcher({ locale, slug }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      {locales.map((item) => {
        const href = slug ? `/${item}/learn/${slug}` : `/${item}`;

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
