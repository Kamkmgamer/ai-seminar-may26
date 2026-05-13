import { type Locale } from "@/lib/course";

export type MilestoneInput = {
  completedLessons: number;
  completedChecklistItems: number;
  submittedLinks: number;
};

export type MilestoneBadge = {
  key: string;
  label: Record<Locale, string>;
};

export function getMilestoneBadges(input: MilestoneInput): MilestoneBadge[] {
  const badges: MilestoneBadge[] = [];

  if (input.completedLessons >= 1) {
    badges.push({
      key: "first-step",
      label: { en: "First step", ar: "أول خطوة" },
    });
  }

  if (input.completedChecklistItems >= 5) {
    badges.push({
      key: "safety-check",
      label: { en: "Safety check", ar: "فحص أمان" },
    });
  }

  if (input.submittedLinks >= 1) {
    badges.push({
      key: "shared-project",
      label: { en: "Shared project", ar: "مشروع منشور" },
    });
  }

  if (input.completedLessons >= 8) {
    badges.push({
      key: "path-finisher",
      label: { en: "Path finisher", ar: "ختم المسار" },
    });
  }

  return badges;
}
