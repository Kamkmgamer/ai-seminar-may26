CREATE TYPE "public"."course_event_type" AS ENUM('lesson_completed', 'lesson_reopened', 'checklist_completed', 'checklist_reopened', 'project_link_submitted', 'nickname_updated', 'preferences_updated');--> statement-breakpoint
CREATE TYPE "public"."locale" AS ENUM('en', 'ar');--> statement-breakpoint
CREATE TYPE "public"."project_link_type" AS ENUM('github', 'deployment');--> statement-breakpoint
CREATE TABLE "checklist_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"lesson_slug" text NOT NULL,
	"item_key" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"type" "course_event_type" NOT NULL,
	"lesson_slug" text,
	"metadata" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"lesson_slug" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"email" text,
	"nickname" text,
	"preferred_locale" "locale" DEFAULT 'en' NOT NULL,
	"os_preference" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"type" "project_link_type" NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "checklist_progress" ADD CONSTRAINT "checklist_progress_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_events" ADD CONSTRAINT "course_events_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_links" ADD CONSTRAINT "project_links_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "checklist_progress_profile_item_idx" ON "checklist_progress" USING btree ("profile_id","lesson_slug","item_key");--> statement-breakpoint
CREATE INDEX "course_events_profile_idx" ON "course_events" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "course_events_type_idx" ON "course_events" USING btree ("type");--> statement-breakpoint
CREATE INDEX "course_events_created_idx" ON "course_events" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_progress_profile_lesson_idx" ON "lesson_progress" USING btree ("profile_id","lesson_slug");--> statement-breakpoint
CREATE INDEX "lesson_progress_lesson_idx" ON "lesson_progress" USING btree ("lesson_slug");--> statement-breakpoint
CREATE UNIQUE INDEX "profiles_clerk_user_id_idx" ON "profiles" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "project_links_profile_type_idx" ON "project_links" USING btree ("profile_id","type");