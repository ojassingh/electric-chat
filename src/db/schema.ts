import { Role } from "@/actions/thread";
import { integer, pgTable, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const threadsTable = pgTable("threads", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const messagesTable = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  threadId: varchar({ length: 255 }).notNull(),
  role: text().notNull().$type<Role>(),
  content: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});