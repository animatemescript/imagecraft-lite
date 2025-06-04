import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  type: text("type").notNull().default("text"), // 'text', 'image', 'gif', 'link'
  title: text("title").notNull().default(""),
  content: text("content").notNull().default(""),
  linkUrl: text("link_url").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  isActive: boolean("is_active").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAnnouncementSchema = createInsertSchema(announcements).pick({
  type: true,
  title: true,
  content: true,
  linkUrl: true,
  imageUrl: true,
  isActive: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;
export type Announcement = typeof announcements.$inferSelect;
