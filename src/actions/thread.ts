import { eq } from "drizzle-orm";
import db from "../index";
import { messagesTable, threadsTable } from "../db/schema";

export enum Role {
  user = 'user',
  assistant = 'assistant',
}

export type Message = {
  id: number;
  threadId: string;
  role: Role;
  content: string;
  createdAt: Date;
};

export type NewMessage = {
  threadId: string;
  role: Role;
  content: string;
};

export async function saveMessage(message: NewMessage): Promise<Message> {
  const [savedMessage] = await db
    .insert(messagesTable)
    .values(message)
    .returning();
  
  return savedMessage as Message;
}

export async function getMessagesForThread(threadId: string): Promise<Message[]> {
  const messages = await db
    .select()
    .from(messagesTable)
    .where(eq(messagesTable.threadId, threadId))
    .orderBy(messagesTable.createdAt);
  
  return messages as Message[];
}

export async function createThread(name: string) {
  const [thread] = await db
    .insert(threadsTable)
    .values({ name })
    .returning();
  
  return thread;
}

export async function getThread(id: number) {
  const [thread] = await db
    .select()
    .from(threadsTable)
    .where(eq(threadsTable.id, id))
    .limit(1);
  
  return thread;
} 