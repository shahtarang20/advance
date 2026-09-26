"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/I18nContext";
import { usePrivacyGuard } from "@/lib/PrivacyGuard";
import { FieldTapHint } from "@/components/FieldTapHint";
import { useFieldHint } from "@/lib/fieldHints";
import { InstallAppCTA } from "@/components/InstallAppCTA";

type Message = {
  id: string;
  sender: "user" | "oracle";
  text: string;
};

export const OracleChat = () => {
  const { t, language } = useTranslation();
  const { wrapAction } = usePrivacyGuard();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const questionHint = useFieldHint("oracle-question");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "oracle",
      text: "welcome_key",
    },
  ]);

  const [isOracleTyping, setIsOracleTyping] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);
  const [activeQuestionIds, setActiveQuestionIds] = useState<number[]>([]);
  const [dbQuestions, setDbQuestions] = useState<Record<string, string>>({});
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [questionCount, setQuestionCount] = useState(0);

  const shuffleQuestions = () => {
    const newIds: number[] = [];
    while (newIds.length < 3) {
      const randomId = Math.floor(Math.random() * 600) + 1;
      if (!newIds.includes(randomId)) {
        newIds.push(randomId);
      }
    }
    setActiveQuestionIds(newIds);
  };

  useEffect(() => {
    shuffleQuestions();
  }, []);

  // Fetch the active questions from the DB
  useEffect(() => {
    if (activeQuestionIds.length === 0) return;
    setIsLoadingQuestions(true);
    const ids = activeQuestionIds.join(",");
    fetch(`/api/oracle-questions?lang=${language}&ids=${ids}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const map: Record<string, string> = { ...dbQuestions };
          data.forEach((q: any) => {
            map[q.question_id] = q.question_text || q.text;
          });
          setDbQuestions(map);
        }
      })
      .catch(console.error)
      .finally(() => {
        setIsLoadingQuestions(false);
      });
  }, [activeQuestionIds, language]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOracleTyping]);

  const handleAsk = async (qId: number | string, qText: string) => {
    if (isOracleTyping || hasAsked) return;
    questionHint.dismiss();
    setHasAsked(true);
    setQuestionCount((prev) => prev + 1);

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: qText };
    setMessages((prev) => [...prev, userMsg]);
    setIsOracleTyping(true);

    try {
      const res = await fetch(`/api/oracle?qId=${qId}&lang=${language}`);
      const data = await res.json();
      const answer = data.answer || "The stars align in mysterious ways. Trust your intuition.";
      
      // Add an artificial delay to simulate the Oracle "thinking" or consulting the stars
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsOracleTyping(false);
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "oracle", text: answer }]);
      
      setTimeout(() => {
        setHasAsked(false);
        shuffleQuestions();
      }, 2000);

    } catch (error) {
      setIsOracleTyping(false);
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "oracle", text: "The universe is momentarily quiet. Please try again." }]);
      setHasAsked(false);
    }
  };

  const renderMessageText = (msg: Message) => {
    if (msg.sender === "user") return msg.text;
    
    if (msg.text === "welcome_key") {
      return t("oracle.chat.welcome", { defaultValue: "Welcome, seeker. I am the Mystic Oracle. The universe has guided you here. What guidance do you seek today?" });
    }
    if (msg.text === "marriage_under30") {
      return t("oracle.a.marriage_under30", { defaultValue: "The stars see a beautiful union in your future. Focus on your own growth and follow your passion, and your soulmate will appear when the cosmic timing is absolutely perfect." });
    }
    if (msg.text === "marriage_over30") {
      return t("oracle.a.marriage_over30", { defaultValue: "The universe blesses your journey of love. Keep nurturing your partnership with patience and understanding, and your bond will grow stronger and more joyful every single day. Wishing you a happy married life!" });
    }
    if (msg.text === "marriage_unknown") {
      return t("oracle.a.marriage_unknown", { defaultValue: "Love is a deep cosmic journey. Whether you are seeking a partner to share your life with, or nurturing an existing bond, the stars ask you to keep your heart open to joy and trust the process." });
    }

    return msg.text;
  };

  const getQuestionText = (qId: string | number, fallback: string) => {
    return dbQuestions[String(qId)] || t(`oracle.q.${qId}`, { defaultValue: fallback });
  };

  return (
    <div className="mx-auto max-w-2xl w-full flex-1 flex flex-col min-h-0">
      <div className="bg-[var(--surface)] border border-[var(--surface-border)] rounded-3xl shadow-2xl overflow-hidden flex flex-col flex-1 min-h-0">
        
        {/* Header - Fixed layout, no weird flexbox tricks */}
        <div className="bg-[var(--surface-strong)] px-4 py-3 border-b border-[var(--surface-border)] flex items-center gap-3 shrink-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg relative shrink-0">
            <span className="text-lg">🔮</span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[var(--surface-strong)] rounded-full"></span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[var(--foreground)] m-0 leading-tight">
              {t("oracle.page.title", { defaultValue: "Mystic Oracle" })}
            </h2>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium m-0 mt-0.5">Online • Reading the Stars</p>
          </div>
        </div>

        {/* Chat Area - Scrollable */}
        <div ref={scrollContainerRef} className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6 space-y-6 relative custom-scrollbar bg-gradient-to-b from-transparent to-[var(--surface-strong)]/30">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex w-full ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
                    m.sender === "user"
                      ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-sm"
                      : "bg-[var(--surface-strong)] border border-[var(--surface-border)] text-[var(--foreground)] rounded-bl-sm"
                  }`}
                >
                  {renderMessageText(m)}
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
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-[var(--surface-strong)] border border-[var(--surface-border)] px-5 py-4">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="h-2 w-2 rounded-full bg-purple-500" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="h-2 w-2 rounded-full bg-purple-500" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="h-2 w-2 rounded-full bg-purple-500" />
                </div>
              </motion.div>
            )}

            {questionCount >= 2 && !isOracleTyping && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex justify-center py-4"
              >
                <div className="w-full max-w-[90%] transform scale-90 sm:scale-100 origin-center">
                  <InstallAppCTA forceShow={true} className="mt-4" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Area - Auto height based on buttons */}
        <div className="p-4 md:p-6 bg-[var(--surface-strong)] border-t border-[var(--surface-border)] shrink-0 min-h-[140px]">
          <div className="flex items-center justify-between mb-3 md:mb-4 px-2">
            <p className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-widest font-bold m-0">
              {t("oracle.chat.select_question", { defaultValue: "Select a cosmic question" })}
            </p>
            <button 
              type="button"
              onClick={shuffleQuestions} 
              disabled={isOracleTyping || hasAsked}
              className="text-2xl hover:rotate-180 transition-transform duration-500 disabled:opacity-50 flex items-center justify-center cursor-pointer active:scale-90"
              title="Shuffle Questions"
            >
              🎲
            </button>
          </div>
          <div className="flex flex-wrap gap-3 relative">
            <AnimatePresence mode="popLayout">
              {isLoadingQuestions ? (
                [1, 2, 3].map((i) => (
                  <motion.div
                    key={`skel-${i}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="h-[42px] w-[90%] md:w-[80%] bg-[var(--surface)] border border-[var(--surface-border)] rounded-xl animate-pulse"
                  />
                ))
              ) : (
                activeQuestionIds.map((qId) => {
                  const qText = getQuestionText(qId, `Mystic Question ${qId}?`);
                  return (
                    <motion.button
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      key={qId}
                      type="button"
                      onClick={wrapAction(() => handleAsk(qId, qText))}
                      disabled={isOracleTyping || hasAsked}
                      className="relative px-4 py-2.5 text-sm font-medium text-[var(--foreground)] bg-[var(--surface)] border border-[var(--surface-border)] rounded-xl shadow-sm hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                      {qText}
                      {questionHint.show && !hasAsked && <FieldTapHint className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
                    </motion.button>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};
