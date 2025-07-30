import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const playerConfigs = pgTable("player_configs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerType: text("player_type").notNull(),
  provider: text("provider").notNull(),
  videoUrl: text("video_url").notNull(),
  autoplay: boolean("autoplay").default(false),
  controls: boolean("controls").default(true),
  format: text("format"),
  iframeCode: text("iframe_code").notNull(),
  directLink: text("direct_link").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertPlayerConfigSchema = createInsertSchema(playerConfigs).pick({
  playerType: true,
  provider: true,
  videoUrl: true,
  autoplay: true,
  controls: true,
  format: true
}).extend({
  playerType: z.enum(["fluidplayer", "jwpl", "plyr", "video"]),
  provider: z.enum(["gdrive", "rand", "yt"]),
  videoUrl: z.string().min(1, "Please enter a video URL"),
  autoplay: z.boolean().default(false),
  controls: z.boolean().default(true),
  format: z.string().optional()
});

export type InsertPlayerConfig = z.infer<typeof insertPlayerConfigSchema>;
export type PlayerConfig = typeof playerConfigs.$inferSelect;
