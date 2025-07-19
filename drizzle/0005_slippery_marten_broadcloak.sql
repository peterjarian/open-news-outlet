ALTER TABLE "socialPlatform" ALTER COLUMN "platform" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "socialPlatform" ADD COLUMN "url" text NOT NULL;