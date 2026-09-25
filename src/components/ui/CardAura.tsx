"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export type AuraType = "fire" | "water" | "earth" | "air" | "dark" | "mystic";

interface CardAuraProps {
  type: AuraType;
  isActive: boolean;
}

export function CardAura({ type, isActive }: CardAuraProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number; blur: string }[]>([]);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }
    
    // Generate 80 random particles for a much denser, magical effect
    const newParticles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 18 + 4, // 4px to 22px
      delay: Math.random() * 2, // seconds
      duration: Math.random() * 4 + 2, // seconds
      blur: Math.random() > 0.5 ? "blur-[2px]" : Math.random() > 0.8 ? "blur-[4px]" : "", 
    }));
    setParticles(newParticles);
  }, [isActive]);

  if (!isActive) return null;

  let colors = "";
  let glow = "";
  let animationType = "floatUp"; // floatUp, ripple, spin

  switch (type) {
    case "fire":
      colors = "bg-orange-400 shadow-[0_0_20px_#f97316]";
      glow = "radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(220,38,38,0.1) 40%, rgba(0,0,0,0) 80%)";
      break;
    case "water":
      colors = "bg-cyan-300 shadow-[0_0_20px_#38bdf8]";
      glow = "radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(59,130,246,0.1) 40%, rgba(0,0,0,0) 80%)";
      animationType = "ripple";
      break;
    case "earth":
      colors = "bg-emerald-300 shadow-[0_0_20px_#34d399]";
      glow = "radial-gradient(circle, rgba(52,211,153,0.4) 0%, rgba(16,185,129,0.1) 40%, rgba(0,0,0,0) 80%)";
      break;
    case "air":
      colors = "bg-yellow-100 shadow-[0_0_20px_#fef08a]";
      glow = "radial-gradient(circle, rgba(254,240,138,0.4) 0%, rgba(255,255,255,0.1) 40%, rgba(0,0,0,0) 80%)";
      animationType = "spin";
      break;
    case "dark":
      colors = "bg-purple-600 shadow-[0_0_30px_#9333ea]";
      glow = "radial-gradient(circle, rgba(147,51,234,0.5) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 90%)";
      break;
    case "mystic":
      colors = "bg-fuchsia-300 shadow-[0_0_25px_#e879f9]";
      glow = "radial-gradient(circle, rgba(232,121,249,0.4) 0%, rgba(192,38,211,0.1) 40%, rgba(0,0,0,0) 80%)";
      animationType = "spin";
      break;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[0] flex items-center justify-center">
      {/* Initial Flash Bang Effect */}
      <motion.div
        initial={{ opacity: 0.8, scale: 1 }}
        animate={{ opacity: 0, scale: 2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 z-10 h-full w-full bg-white mix-blend-overlay"
      />

      {/* Massive Central Ambient Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 2.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 h-full w-full"
        style={{ background: glow }}
      />
      
      {/* Dense Particles */}
      {particles.map((p) => {
        let animateProps = {};
        
        if (animationType === "floatUp") {
          animateProps = { y: ["0%", "-400%"], opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] };
        } else if (animationType === "ripple") {
          animateProps = { scale: [0, 3], opacity: [0.8, 0] };
        } else if (animationType === "spin") {
          animateProps = { rotate: [0, 360], scale: [0.2, 2, 0.2], opacity: [0, 0.8, 0] };
        }
        
        return (
          <motion.div
            key={p.id}
            className={`absolute rounded-full ${colors} ${p.blur} z-10`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            initial={{ opacity: 0 }}
            animate={animateProps}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
