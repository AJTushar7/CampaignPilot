import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull(),
  channels: jsonb("channels").notNull(),
  targetAudience: integer("target_audience").notNull(),
  sent: integer("sent").default(0),
  delivered: integer("delivered").default(0),
  opened: integer("opened").default(0),
  clicked: integer("clicked").default(0),
  converted: integer("converted").default(0),
  cost: decimal("cost", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").default(sql`now()`),
  scheduledAt: timestamp("scheduled_at"),
  startedAt: timestamp("started_at"),
  pausedAt: timestamp("paused_at"),
});

export const channelPerformance = pgTable("channel_performance", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  channel: text("channel").notNull(),
  metric: text("metric").notNull(),
  value: decimal("value", { precision: 5, scale: 2 }).notNull(),
  date: timestamp("date").default(sql`now()`),
});

export const bspProviders = pgTable("bsp_providers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  smsDeliveryRate: decimal("sms_delivery_rate", { precision: 5, scale: 2 }),
  whatsappDeliveryRate: decimal("whatsapp_delivery_rate", { precision: 5, scale: 2 }),
  emailDeliveryRate: decimal("email_delivery_rate", { precision: 5, scale: 2 }),
  pushDeliveryRate: decimal("push_delivery_rate", { precision: 5, scale: 2 }),
  overallScore: text("overall_score").notNull(),
});

export const inactiveCustomers = pgTable("inactive_customers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: text("customer_id").notNull(),
  lastActivity: timestamp("last_activity").notNull(),
  segment: text("segment").notNull(),
  value: decimal("value", { precision: 10, scale: 2 }),
});

export const festivals = pgTable("festivals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  date: timestamp("date").notNull(),
  emoji: text("emoji").notNull(),
  daysLeft: integer("days_left").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
});

export const insertChannelPerformanceSchema = createInsertSchema(channelPerformance).omit({
  id: true,
  date: true,
});

export const insertBspProviderSchema = createInsertSchema(bspProviders).omit({
  id: true,
});

export const insertInactiveCustomerSchema = createInsertSchema(inactiveCustomers).omit({
  id: true,
});

export const insertFestivalSchema = createInsertSchema(festivals).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type ChannelPerformance = typeof channelPerformance.$inferSelect;
export type BspProvider = typeof bspProviders.$inferSelect;
export type InactiveCustomer = typeof inactiveCustomers.$inferSelect;
export type Festival = typeof festivals.$inferSelect;
