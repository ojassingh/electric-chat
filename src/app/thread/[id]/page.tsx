"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { useChat } from "@ai-sdk/react";

export default function ThreadPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const threadId = params.id as string;
  const initialMessage = searchParams.get("message");

  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Thread</h1>
            <p className="text-sm text-muted-foreground">ID: {threadId}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              ← New Chat
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div key={message.id}>
              <div className="text-sm font-medium text-muted-foreground min-w-0">
                {message.role === "user" ? "You" : "AI"}
              </div>
              <div
                key={message.id}
                className={`rounded-lg p-4 border ${
                  message.role === "user"
                    ? "bg-primary/5 border-primary/20 ml-12"
                    : "bg-card mr-12"
                }`}
              >
                <div className="">
                  <div className="flex-1 min-w-0">
                    <div className="whitespace-pre-wrap break-words">
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case "text":
                            return (
                              <div key={`${message.id}-${i}`}>{part.text}</div>
                            );
                          default:
                            return null;
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {messages.length === 0 && !initialMessage && (
            <div className="text-center text-muted-foreground py-12">
              <p>No messages yet. Send your first message below!</p>
            </div>
          )}
        </div>
      </div>

      <div className="border-t px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" disabled={!input.trim()}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
