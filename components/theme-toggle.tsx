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
    <Button variant="outline" size="sm" onClick={toggleTheme} type="button">
      <SunIcon data-icon="inline-start" />
      <MoonIcon data-icon="inline-start" />
      Theme
    </Button>
  );
}
