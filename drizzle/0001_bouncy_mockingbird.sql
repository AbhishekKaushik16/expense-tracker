ALTER TABLE "expense" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "expense" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "expense" ALTER COLUMN "payer_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "expense" ALTER COLUMN "group_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "balance" ADD COLUMN "group_id" integer;--> statement-breakpoint
ALTER TABLE "expense" ADD COLUMN "details" text;--> statement-breakpoint
ALTER TABLE "expense" ADD COLUMN "split_equally" boolean DEFAULT true;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "balance" ADD CONSTRAINT "balance_group_id_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
