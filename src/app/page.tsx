"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const threadId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      router.push(`/thread/${threadId}?message=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="absolute top-4 right-4"><ModeToggle/></div>
      <div className="w-full max-w-md px-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Electric Chat ⚡️</h1>
            <p className="text-muted-foreground">Really fast AI chat with ElectricSQL, TanstackDB and D2TS, inspired by T3</p>
          </div>
          
          <div className="relative">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              autoFocus
            />
          </div>
          
          <Button className="w-full" type="submit" disabled={!inputValue.trim()}>Start Chat</Button>
        </form>
      </div>
    </div>
  );
}
