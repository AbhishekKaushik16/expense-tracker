CREATE TABLE IF NOT EXISTS "friend" (
	"id" serial NOT NULL,
	"friend_1" integer,
	"friend_2" integer,
	CONSTRAINT "friend_uk" UNIQUE("friend_1","friend_2")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friend" ADD CONSTRAINT "friend_friend_1_user_id_fk" FOREIGN KEY ("friend_1") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friend" ADD CONSTRAINT "friend_friend_2_user_id_fk" FOREIGN KEY ("friend_2") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
