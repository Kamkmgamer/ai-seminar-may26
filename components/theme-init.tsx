"use client";

import { useEffect } from "react";

export function ThemeInit() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark =
        stored === "dark" ||
        (!stored &&
          window.matchMedia("(prefers-color-scheme:dark)").matches);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    } catch {
      // localStorage not available
    }
  }, []);

  return null;
}