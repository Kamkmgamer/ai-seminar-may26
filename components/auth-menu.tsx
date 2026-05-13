"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { type Locale } from "@/lib/course";

const copy = {
  en: { signIn: "Sign in", profile: "Progress" },
  ar: { signIn: "دخول", profile: "تقدمي" },
} satisfies Record<Locale, Record<string, string>>;

export function AuthMenu({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="h-8 w-16" />;
  }

  return (
    <div className="flex items-center gap-2">
      {!isSignedIn ? (
        <SignInButton mode="modal">
          <Button type="button" variant="outline" size="sm">
            {text.signIn}
          </Button>
        </SignInButton>
      ) : (
        <>
          <Link
            href={`/${locale}/profile`}
            className="hidden rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:inline-flex"
          >
            {text.profile}
          </Link>
          <UserButton />
        </>
      )}
    </div>
  );
}
