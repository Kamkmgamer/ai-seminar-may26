"use client";

import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");

    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  }

  return (
    <Button
      aria-label="Toggle theme"
      className="site-icon-button"
      variant="outline"
      size="icon-sm"
      onClick={toggleTheme}
      type="button"
      title="Toggle theme"
    >
      <SunIcon className="site-sun-icon size-3.5" />
      <MoonIcon className="site-moon-icon size-3.5" />
    </Button>
  );
}
