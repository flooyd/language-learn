CREATE TABLE "wordPoint" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"word" text NOT NULL,
	"language" text NOT NULL,
	"points" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "wordPoint" ADD CONSTRAINT "wordPoint_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;