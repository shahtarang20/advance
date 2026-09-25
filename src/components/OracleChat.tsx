"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/I18nContext";
import { GlassCard } from "@/components/ui/GlassCard";

interface Message {
  id: string;
  sender: "oracle" | "user";
  text: string;
  isTyping?: boolean;
}

export function OracleChat() {
  const { t } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "oracle",
      text: t("oracle.chat.welcome", { defaultValue: "Welcome, seeker. I am the Mystic Oracle. The universe has guided you here. What guidance do you seek today?" }),
    },
  ]);

  const [isOracleTyping, setIsOracleTyping] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOracleTyping]);

  const questions = [
    { id: "love", text: t("oracle.q.love", { defaultValue: "What do the stars say about my love life?" }) },
    { id: "career", text: t("oracle.q.career", { defaultValue: "Am I on the right career path?" }) },
    { id: "spiritual", text: t("oracle.q.spiritual", { defaultValue: "What is my spiritual lesson today?" }) },
    { id: "daily", text: t("oracle.q.daily", { defaultValue: "Give me a general reading for today." }) },
  ];

  const handleAsk = (qId: string, qText: string) => {
    if (isOracleTyping || hasAsked) return;
    setHasAsked(true);

    // Add User message
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: qText };
    setMessages((prev) => [...prev, userMsg]);
    setIsOracleTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      setIsOracleTyping(false);
      
      // Select the correct response based on the category
      const responseText = t(`oracle.a.${qId}`, { 
        defaultValue: "The stars align in mysterious ways. Trust your intuition, for it is your greatest compass in the days ahead. The universe is protecting you." 
      });

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "oracle", text: responseText },
      ]);
      
      // Reset after a delay so they can ask another question
      setTimeout(() => setHasAsked(false), 2000);
    }, 2500);
  };

  return (
    <div className="mx-auto max-w-2xl h-[600px] flex flex-col relative rounded-3xl overflow-hidden border border-[var(--surface-border)] shadow-2xl bg-[#0B0A10]">
      {/* Background magical elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 py-4 border-b border-white/5 bg-white/5 backdrop-blur-md flex items-center gap-4">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
          <span className="text-xl">🔮</span>
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0B0A10] bg-green-500"></div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide">Mystic Oracle</h2>
          <p className="text-xs text-purple-300">Online • Reading the Stars</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex w-full ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed shadow-lg ${
                  m.sender === "user"
                    ? "bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-br-sm"
                    : "bg-white/10 text-gray-100 backdrop-blur-md border border-white/10 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
          
          {isOracleTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex w-full justify-start"
            >
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white/10 px-5 py-4 backdrop-blur-md border border-white/10">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="h-2 w-2 rounded-full bg-purple-400"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="h-2 w-2 rounded-full bg-purple-400"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="h-2 w-2 rounded-full bg-purple-400"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area (Predefined Pills) */}
      <div className="relative z-10 p-4 bg-white/5 border-t border-white/5 backdrop-blur-md">
        <p className="text-xs text-purple-300/70 mb-3 text-center uppercase tracking-widest font-semibold">
          {t("oracle.chat.select_question", { defaultValue: "Select a cosmic question" })}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => handleAsk(q.id, q.text)}
              disabled={isOracleTyping || hasAsked}
              className="px-4 py-2 text-sm text-purple-100 bg-white/5 border border-purple-500/30 rounded-full hover:bg-purple-500/20 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {q.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
