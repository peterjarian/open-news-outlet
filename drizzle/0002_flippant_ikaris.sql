ALTER TABLE "articles" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "status" SET DEFAULT 'concept'::text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('concept', 'published');--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "status" SET DEFAULT 'concept'::"public"."status";--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";