CREATE TYPE "public"."platform" AS ENUM('twitter', 'email', 'linkedin');--> statement-breakpoint
CREATE TABLE "socialPlatform" (
	"id" serial PRIMARY KEY NOT NULL,
	"platform" "platform",
	"userId" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "bylineName" text;--> statement-breakpoint
ALTER TABLE "socialPlatform" ADD CONSTRAINT "socialPlatform_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "banned";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "ban_reason";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "ban_expires";