"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { validateDob } from "@/lib/validation";
import { getAuraForLifePath, ChakraColor } from "@/lib/aura";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

function AuraResultContent() {
  const searchParams = useSearchParams();
  const dob = searchParams.get("dob") || "";
  const [aura, setAura] = useState<ChakraColor | null>(null);
  
  useEffect(() => {
    if (validateDob(dob)) return;
    
    // Calculate Life Path Number
    const parts = dob.split("-"); // YYYY-MM-DD
    const digits = parts.join("").split("").map(Number);
    
    const sumDigits = (n: number): number => {
      if (n <= 9) return n;
      if (n === 11 || n === 22 || n === 33) return n; // Keep master numbers temporarily
      return sumDigits(String(n).split('').map(Number).reduce((a,b)=>a+b,0));
    };
    
    const lp = sumDigits(digits.reduce((a,b)=>a+b,0));
    setAura(getAuraForLifePath(lp));
  }, [dob]);

  if (!dob || validateDob(dob)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Link href="/aura" className="text-purple-600 underline">
          Please enter a valid Date of Birth.
        </Link>
      </div>
    );
  }

  if (!aura) return null;

  return (
    <div className="relative min-h-screen overflow-hidden px-6 pb-32 pt-16">
      {/* Animated Glowing Aura Background */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 animate-pulse pointer-events-none"
        style={{ backgroundColor: aura.colorHex, animationDuration: '4s' }}
      />
      <div 
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 animate-pulse pointer-events-none"
        style={{ backgroundColor: aura.colorHex, animationDuration: '6s', animationDelay: '1s' }}
      />
      
      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest text-muted-soft uppercase mb-2">
              Your Primary Aura
            </p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-4" style={{ color: aura.colorHex }}>
              {aura.name}
            </h1>
            <p className="text-xl text-muted font-medium">
              Aligned with the <span className="text-[var(--foreground)]">{aura.chakra}</span>
            </p>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold tracking-tight mb-3">Your Energy Profile</h2>
              <p className="text-base leading-relaxed text-muted">{aura.description}</p>
            </GlassCard>
          </Reveal>
          
          <Reveal delay={0.2}>
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold tracking-tight mb-3 text-emerald-500">Your Greatest Strengths</h2>
              <p className="text-base leading-relaxed text-muted">{aura.strength}</p>
            </GlassCard>
          </Reveal>
          
          <Reveal delay={0.3}>
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold tracking-tight mb-3 text-amber-500">How to Balance Your Chakra</h2>
              <p className="text-base leading-relaxed text-muted">{aura.balanceTip}</p>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export default function AuraResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted">Loading...</div>}>
      <AuraResultContent />
    </Suspense>
  );
}
