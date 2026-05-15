import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const localeEnum = pgEnum("locale", ["en", "ar"]);
export const projectLinkTypeEnum = pgEnum("project_link_type", [
  "github",
  "deployment",
]);
export const courseEventTypeEnum = pgEnum("course_event_type", [
  "lesson_completed",
  "lesson_reopened",
  "checklist_completed",
  "checklist_reopened",
  "project_link_submitted",
  "nickname_updated",
  "preferences_updated",
]);

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkUserId: text("clerk_user_id").notNull(),
    email: text("email"),
    nickname: text("nickname"),
    preferredLocale: localeEnum("preferred_locale").notNull().default("en"),
    osPreference: text("os_preference"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("profiles_clerk_user_id_idx").on(table.clerkUserId)],
);

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    lessonSlug: text("lesson_slug").notNull(),
    completed: boolean("completed").notNull().default(false),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("lesson_progress_profile_lesson_idx").on(
      table.profileId,
      table.lessonSlug,
    ),
    index("lesson_progress_lesson_idx").on(table.lessonSlug),
  ],
);

export const checklistProgress = pgTable(
  "checklist_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    lessonSlug: text("lesson_slug").notNull(),
    itemKey: text("item_key").notNull(),
    completed: boolean("completed").notNull().default(false),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("checklist_progress_profile_item_idx").on(
      table.profileId,
      table.lessonSlug,
      table.itemKey,
    ),
  ],
);

export const projectLinks = pgTable(
  "project_links",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    type: projectLinkTypeEnum("type").notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("project_links_profile_type_idx").on(table.profileId, table.type)],
);

export const courseEvents = pgTable(
  "course_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    type: courseEventTypeEnum("type").notNull(),
    lessonSlug: text("lesson_slug"),
    metadata: text("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("course_events_profile_idx").on(table.profileId),
    index("course_events_type_idx").on(table.type),
    index("course_events_created_idx").on(table.createdAt),
  ],
);

export const adminEmails = pgTable(
  "admin_emails",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    createdByEmail: text("created_by_email"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("admin_emails_email_idx").on(table.email)],
);

export const profilesRelations = relations(profiles, ({ many }) => ({
  lessonProgress: many(lessonProgress),
  checklistProgress: many(checklistProgress),
  projectLinks: many(projectLinks),
  courseEvents: many(courseEvents),
}));

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  profile: one(profiles, {
    fields: [lessonProgress.profileId],
    references: [profiles.id],
  }),
}));

export const checklistProgressRelations = relations(checklistProgress, ({ one }) => ({
  profile: one(profiles, {
    fields: [checklistProgress.profileId],
    references: [profiles.id],
  }),
}));

export const projectLinksRelations = relations(projectLinks, ({ one }) => ({
  profile: one(profiles, {
    fields: [projectLinks.profileId],
    references: [profiles.id],
  }),
}));

export const courseEventsRelations = relations(courseEvents, ({ one }) => ({
  profile: one(profiles, {
    fields: [courseEvents.profileId],
    references: [profiles.id],
  }),
}));

export const leaderboardView = sql`
  select
    p.id,
    p.nickname,
    count(distinct lp.lesson_slug)::int as completed_lessons,
    count(distinct cl.id)::int as submitted_links
  from profiles p
  left join lesson_progress lp on lp.profile_id = p.id and lp.completed = true
  left join project_links cl on cl.profile_id = p.id
  group by p.id, p.nickname
`;
