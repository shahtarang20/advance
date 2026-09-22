"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { todayKey } from "./prng";

const STORAGE_KEY = "cosmic-gamification-v2";

export type ActionType =
  | "numerology_calc"
  | "horoscope_checkin"
  | "compatibility_check"
  | "share_click"
  | "chaldean_view"
  | "karmic_debt_view"
  | "personal_year_view"
  | "zodiac_profile_view"
  | "pinnacles_view"
  | "angel_numbers_view"
  | "nakshatra_browse"
  | "nakshatra_select"
  | "kundli_generate";

export type QuestId =
  | "quest_horoscope"
  | "quest_numerology"
  | "quest_share"
  | "quest_explore"
  | "quest_cosmic_reference";

export interface Badge {
  id: string;
  name: string;
  description: string;
  earnedAt: string;
}

export const BADGE_CATALOG: Record<string, { name: string; description: string }> = {
  "first-reading": { name: "First Reading", description: "Completed your first cosmic reading." },
  matchmaker: { name: "Matchmaker", description: "Ran your first compatibility check." },
  "cosmic-messenger": { name: "Cosmic Messenger", description: "Shared a reading with someone." },
  "streak-3": { name: "3-Day Streak", description: "Checked in three days in a row." },
  "streak-7": { name: "7-Day Streak", description: "A full week of cosmic check-ins." },
  "streak-14": { name: "Two-Week Streak", description: "Fourteen days of daily dedication." },
  "streak-30": { name: "30-Day Streak", description: "A month of daily cosmic dedication." },
  "numerology-master": { name: "Numerology Master", description: "Explored numerology readings in depth." },
  "zodiac-explorer": { name: "Zodiac Explorer", description: "Viewed horoscopes for 5 different signs." },
  "perfect-match": { name: "Perfect Match", description: "Scored 90% or higher on a compatibility check." },
  "night-owl": { name: "Night Owl", description: "Checked in between midnight and 4am." },
  "early-bird": { name: "Early Bird", description: "Checked in before 7am." },
  comeback: { name: "Comeback", description: "Returned after a broken streak to start a new one." },
  "quest-streak-3": { name: "Quest Regular", description: "Completed all daily quests three days running." },
  "chaldean-seeker": { name: "Chaldean Seeker", description: "Tried the ancient Chaldean numerology system." },
  "karmic-insight": { name: "Karmic Insight", description: "Uncovered a Karmic Debt Number in your chart." },
  "full-spectrum": { name: "Full Spectrum", description: "Checked your Personal Year Number." },
  "zodiac-scholar": { name: "Zodiac Scholar", description: "Explored your sign's full element, ruler & compatibility profile." },
  "pinnacle-seeker": { name: "Pinnacle Seeker", description: "Explored your Pinnacles & Challenges life-cycle timeline." },
  "angel-watcher": { name: "Angel Watcher", description: "Checked the meaning of a repeating angel number." },
  "nakshatra-scholar": { name: "Nakshatra Scholar", description: "Browsed the Vedic Nakshatra reference." },
  "star-seeker": { name: "Star Seeker", description: "Selected your own Nakshatra for a personal reading." },
  "kundli-seeker": { name: "Kundli Seeker", description: "Generated your first Janam Kundli (Vedic birth chart)." },
  "kundli-scholar": { name: "Kundli Scholar", description: "Generated three or more Kundli charts." },
};

interface DailyQuestState {
  date: string;
  completed: QuestId[];
  bonusAwarded: boolean;
}

interface GamificationState {
  xp: number;
  streak: number;
  bestStreak: number;
  lastCheckinDate: string | null;
  badges: Badge[];
  actionsCompleted: Record<ActionType, number>;
  signsViewed: string[];
  todayXp: { date: string; earned: number };
  bestXpDayTotal: number;
  questStreak: number;
  dailyQuest: DailyQuestState;
  totalReadings: number;
}

const emptyQuest = (): DailyQuestState => ({ date: todayKey(), completed: [], bonusAwarded: false });

const DEFAULT_STATE: GamificationState = {
  xp: 0,
  streak: 0,
  bestStreak: 0,
  lastCheckinDate: null,
  badges: [],
  actionsCompleted: {
    numerology_calc: 0,
    horoscope_checkin: 0,
    compatibility_check: 0,
    share_click: 0,
    chaldean_view: 0,
    karmic_debt_view: 0,
    personal_year_view: 0,
    zodiac_profile_view: 0,
    pinnacles_view: 0,
    angel_numbers_view: 0,
    nakshatra_browse: 0,
    nakshatra_select: 0,
    kundli_generate: 0,
  },
  signsViewed: [],
  todayXp: { date: todayKey(), earned: 0 },
  bestXpDayTotal: 0,
  questStreak: 0,
  dailyQuest: emptyQuest(),
  totalReadings: 0,
};

export const LEVELS = [
  { title: "Stargazer", minXp: 0 },
  { title: "Seer", minXp: 100 },
  { title: "Oracle", minXp: 300 },
  { title: "Cosmic Sage", minXp: 700 },
  { title: "Celestial Master", minXp: 1500 },
] as const;

const XP_REWARDS: Record<ActionType, number> = {
  numerology_calc: 25,
  horoscope_checkin: 15,
  compatibility_check: 20,
  share_click: 10,
  chaldean_view: 10,
  karmic_debt_view: 10,
  personal_year_view: 10,
  zodiac_profile_view: 10,
  pinnacles_view: 10,
  angel_numbers_view: 10,
  nakshatra_browse: 10,
  nakshatra_select: 15,
  kundli_generate: 25,
};

const QUEST_BONUS_XP = 30;

// Progressive feature unlocks — Numerology, Aura, Biorhythm, and Dreams stay hidden from
// navigation and their own pages until the user has built up enough daily-checkin streak,
// revealing one new feature per full week of consecutive check-ins. bestStreak (not the
// current streak) gates unlocks so a broken streak never takes an already-unlocked feature away.
export type LockableFeature = "numerology" | "aura" | "biorhythm" | "dreams";

export const FEATURE_UNLOCK_ORDER: LockableFeature[] = ["numerology", "aura", "biorhythm", "dreams"];

const STREAK_DAYS_PER_WEEK = 7;

export const FEATURE_UNLOCK_DAYS: Record<LockableFeature, number> = {
  numerology: 1 * STREAK_DAYS_PER_WEEK,
  aura: 2 * STREAK_DAYS_PER_WEEK,
  biorhythm: 3 * STREAK_DAYS_PER_WEEK,
  dreams: 4 * STREAK_DAYS_PER_WEEK,
};

const ACTION_TO_QUEST: Partial<Record<ActionType, QuestId>> = {
  horoscope_checkin: "quest_horoscope",
  numerology_calc: "quest_numerology",
  share_click: "quest_share",
  chaldean_view: "quest_explore",
  zodiac_profile_view: "quest_explore",
  angel_numbers_view: "quest_cosmic_reference",
  nakshatra_browse: "quest_cosmic_reference",
  kundli_generate: "quest_explore",
};

export const DAILY_QUESTS: { id: QuestId; label: string }[] = [
  { id: "quest_horoscope", label: "Check today's horoscope" },
  { id: "quest_numerology", label: "Calculate a numerology reading" },
  { id: "quest_share", label: "Share a result" },
  { id: "quest_explore", label: "Explore your Chaldean number or full sign profile" },
  { id: "quest_cosmic_reference", label: "Check an angel number meaning or browse a nakshatra" },
];

function getLevel(xp: number) {
  let current: (typeof LEVELS)[number] = LEVELS[0];
  let next: (typeof LEVELS)[number] | null = null;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].minXp) {
      current = LEVELS[i];
      next = LEVELS[i + 1] ?? null;
    }
  }
  const progress = next ? (xp - current.minXp) / (next.minXp - current.minXp) : 1;
  return { current: current.title, next: next?.title ?? null, progress: Math.min(1, Math.max(0, progress)) };
}

function loadState(): GamificationState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    const today = todayKey();
    const dailyQuest: DailyQuestState =
      parsed.dailyQuest && parsed.dailyQuest.date === today ? parsed.dailyQuest : emptyQuest();
    return {
      ...DEFAULT_STATE,
      ...parsed,
      actionsCompleted: { ...DEFAULT_STATE.actionsCompleted, ...parsed.actionsCompleted },
      signsViewed: parsed.signsViewed ?? [],
      todayXp: parsed.todayXp && parsed.todayXp.date === today ? parsed.todayXp : { date: today, earned: 0 },
      bestXpDayTotal: parsed.bestXpDayTotal ?? 0,
      dailyQuest,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state: GamificationState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage may be unavailable (private mode, quota) — fail silently.
  }
}

function daysBetween(a: string, b: string): number {
  const dateA = new Date(a + "T00:00:00Z").getTime();
  const dateB = new Date(b + "T00:00:00Z").getTime();
  return Math.round((dateB - dateA) / 86400000);
}

export interface LevelUpEvent {
  title: string;
}

interface GamificationContextValue extends GamificationState {
  levelTitle: string;
  nextLevelTitle: string | null;
  levelProgress: number;
  recordAction: (action: ActionType, meta?: { sign?: string; percentage?: number }) => void;
  checkinHoroscope: (sign?: string) => void;
  hydrated: boolean;
  pendingBadges: Badge[];
  dismissBadge: (id: string) => void;
  pendingLevelUp: LevelUpEvent | null;
  dismissLevelUp: () => void;
  questsCompletedToday: QuestId[];
  questBonusAwardedToday: boolean;
  unlockedFeatures: LockableFeature[];
  isFeatureUnlocked: (feature: LockableFeature) => boolean;
}

const GamificationContext = createContext<GamificationContextValue | null>(null);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GamificationState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [pendingBadges, setPendingBadges] = useState<Badge[]>([]);
  const [pendingLevelUp, setPendingLevelUp] = useState<LevelUpEvent | null>(null);
  const prevLevelRef = useRef<string | null>(null);

  useEffect(() => {
    const loaded = loadState();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage read must happen post-mount only
    setState(loaded);
    prevLevelRef.current = getLevel(loaded.xp).current;
    setHydrated(true);
  }, []);

  const persist = useCallback((updater: (prev: GamificationState) => GamificationState) => {
    setState((prev) => {
      const next = updater(prev);
      saveState(next);

      const prevLevel = prevLevelRef.current ?? getLevel(prev.xp).current;
      const nextLevel = getLevel(next.xp).current;
      if (nextLevel !== prevLevel) {
        prevLevelRef.current = nextLevel;
        setPendingLevelUp({ title: nextLevel });
      }

      return next;
    });
  }, []);

  const awardBadge = (
    s: GamificationState,
    badgeId: keyof typeof BADGE_CATALOG
  ): { state: GamificationState; awarded: Badge | null } => {
    if (s.badges.some((b) => b.id === badgeId)) return { state: s, awarded: null };
    const meta = BADGE_CATALOG[badgeId];
    const earned: Badge = { id: badgeId, name: meta.name, description: meta.description, earnedAt: new Date().toISOString() };
    return { state: { ...s, badges: [...s.badges, earned] }, awarded: earned };
  };

  function applyQuestProgress(s: GamificationState, action: ActionType): GamificationState {
    const questId = ACTION_TO_QUEST[action];
    if (!questId) return s;
    const today = todayKey();
    let dailyQuest = s.dailyQuest.date === today ? s.dailyQuest : emptyQuest();
    if (!dailyQuest.completed.includes(questId)) {
      dailyQuest = { ...dailyQuest, completed: [...dailyQuest.completed, questId] };
    }
    let xpBonus = 0;
    if (dailyQuest.completed.length === DAILY_QUESTS.length && !dailyQuest.bonusAwarded) {
      dailyQuest = { ...dailyQuest, bonusAwarded: true };
      xpBonus = QUEST_BONUS_XP;
    }
    return { ...s, dailyQuest, xp: s.xp + xpBonus };
  }

  /** Adds `earned` XP to today's running tally and keeps the personal-best record in sync. */
  function trackXpEarnedToday(s: GamificationState, earned: number): GamificationState {
    const today = todayKey();
    const todayTotal = (s.todayXp.date === today ? s.todayXp.earned : 0) + earned;
    return {
      ...s,
      todayXp: { date: today, earned: todayTotal },
      bestXpDayTotal: Math.max(s.bestXpDayTotal, todayTotal),
    };
  }

  const recordAction = useCallback(
    (action: ActionType, meta?: { sign?: string; percentage?: number }) => {
      const newlyAwarded: Badge[] = [];
      persist((prev) => {
        let next: GamificationState = {
          ...prev,
          xp: prev.xp + XP_REWARDS[action],
          totalReadings: action === "share_click" ? prev.totalReadings : prev.totalReadings + 1,
          actionsCompleted: {
            ...prev.actionsCompleted,
            [action]: prev.actionsCompleted[action] + 1,
          },
        };

        next = applyQuestProgress(next, action);

        if (action === "numerology_calc" && next.actionsCompleted.numerology_calc === 1) {
          const r = awardBadge(next, "first-reading");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "numerology_calc" && next.actionsCompleted.numerology_calc >= 3) {
          const r = awardBadge(next, "numerology-master");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "compatibility_check" && next.actionsCompleted.compatibility_check === 1) {
          const r = awardBadge(next, "matchmaker");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "compatibility_check" && meta?.percentage !== undefined && meta.percentage >= 90) {
          const r = awardBadge(next, "perfect-match");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "share_click") {
          const r = awardBadge(next, "cosmic-messenger");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "chaldean_view") {
          const r = awardBadge(next, "chaldean-seeker");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "karmic_debt_view") {
          const r = awardBadge(next, "karmic-insight");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "personal_year_view") {
          const r = awardBadge(next, "full-spectrum");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "zodiac_profile_view") {
          const r = awardBadge(next, "zodiac-scholar");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "pinnacles_view") {
          const r = awardBadge(next, "pinnacle-seeker");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "angel_numbers_view") {
          const r = awardBadge(next, "angel-watcher");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "nakshatra_browse") {
          const r = awardBadge(next, "nakshatra-scholar");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "nakshatra_select") {
          const r = awardBadge(next, "star-seeker");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "kundli_generate" && next.actionsCompleted.kundli_generate === 1) {
          const r = awardBadge(next, "kundli-seeker");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (action === "kundli_generate" && next.actionsCompleted.kundli_generate >= 3) {
          const r = awardBadge(next, "kundli-scholar");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }

        next = trackXpEarnedToday(next, next.xp - prev.xp);

        return next;
      });
      if (newlyAwarded.length) setPendingBadges((p) => [...p, ...newlyAwarded]);
    },
    [persist]
  );

  const checkinHoroscope = useCallback(
    (sign?: string) => {
      const newlyAwarded: Badge[] = [];
      persist((prev) => {
        const today = todayKey();
        const hour = new Date().getHours();
        let signsViewed = prev.signsViewed;
        if (sign && !signsViewed.includes(sign)) {
          signsViewed = [...signsViewed, sign];
        }

        if (prev.lastCheckinDate === today) {
          return { ...prev, signsViewed };
        }

        let streak = 1;
        let isComeback = false;
        if (prev.lastCheckinDate) {
          const gap = daysBetween(prev.lastCheckinDate, today);
          if (gap === 1) {
            streak = prev.streak + 1;
          } else {
            streak = 1;
            isComeback = prev.streak >= 3;
          }
        }

        let next: GamificationState = {
          ...prev,
          streak,
          bestStreak: Math.max(prev.bestStreak, streak),
          lastCheckinDate: today,
          xp: prev.xp + XP_REWARDS.horoscope_checkin,
          totalReadings: prev.totalReadings + 1,
          signsViewed,
          actionsCompleted: {
            ...prev.actionsCompleted,
            horoscope_checkin: prev.actionsCompleted.horoscope_checkin + 1,
          },
        };

        next = applyQuestProgress(next, "horoscope_checkin");

        if (isComeback) {
          const r = awardBadge(next, "comeback");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (streak >= 3) {
          const r = awardBadge(next, "streak-3");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (streak >= 7) {
          const r = awardBadge(next, "streak-7");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (streak >= 14) {
          const r = awardBadge(next, "streak-14");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (streak >= 30) {
          const r = awardBadge(next, "streak-30");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (next.actionsCompleted.horoscope_checkin === 1) {
          const r = awardBadge(next, "first-reading");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (next.signsViewed.length >= 5) {
          const r = awardBadge(next, "zodiac-explorer");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (hour >= 0 && hour < 4) {
          const r = awardBadge(next, "night-owl");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }
        if (hour >= 4 && hour < 7) {
          const r = awardBadge(next, "early-bird");
          next = r.state;
          if (r.awarded) newlyAwarded.push(r.awarded);
        }

        next = trackXpEarnedToday(next, next.xp - prev.xp);

        return next;
      });
      if (newlyAwarded.length) setPendingBadges((p) => [...p, ...newlyAwarded]);
    },
    [persist]
  );

  const dismissBadge = useCallback((id: string) => {
    setPendingBadges((p) => p.filter((b) => b.id !== id));
  }, []);

  const dismissLevelUp = useCallback(() => setPendingLevelUp(null), []);

  const level = getLevel(state.xp);

  const unlockedFeatures = hydrated
    ? FEATURE_UNLOCK_ORDER.filter((f) => state.bestStreak >= FEATURE_UNLOCK_DAYS[f])
    : [];
  const isFeatureUnlocked = (feature: LockableFeature) => unlockedFeatures.includes(feature);

  const value: GamificationContextValue = {
    ...state,
    levelTitle: level.current,
    nextLevelTitle: level.next,
    levelProgress: level.progress,
    recordAction,
    checkinHoroscope,
    hydrated,
    pendingBadges,
    dismissBadge,
    pendingLevelUp,
    dismissLevelUp,
    questsCompletedToday: state.dailyQuest.date === todayKey() ? state.dailyQuest.completed : [],
    questBonusAwardedToday: state.dailyQuest.date === todayKey() ? state.dailyQuest.bonusAwarded : false,
    unlockedFeatures,
    isFeatureUnlocked,
  };

  return <GamificationContext.Provider value={value}>{children}</GamificationContext.Provider>;
}

export function useGamification(): GamificationContextValue {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error("useGamification must be used within GamificationProvider");
  return ctx;
}
