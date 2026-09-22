import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Goal = 'confidence' | 'career' | 'fitness' | 'relationships' | 'productivity';
export type CoachStyle = 'direct' | 'warm' | 'curious';

export type Habit = {
  id: string;
  title: string;
  detail: string;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  points: number;
  completed: boolean;
};

export type CoachMessage = {
  id: string;
  role: 'user' | 'coach';
  text: string;
};

type VibeUpState = {
  onboarded: boolean;
  displayName: string;
  goal: Goal;
  lifestyle: string;
  coachStyle: CoachStyle;
  streak: number;
  xp: number;
  level: number;
  habits: Habit[];
  messages: CoachMessage[];
  completedChallenges: string[];
  notificationsEnabled: boolean;
};

type VibeUpContextValue = VibeUpState & {
  hydrated: boolean;
  finishOnboarding: (details: Pick<VibeUpState, 'displayName' | 'goal' | 'lifestyle' | 'coachStyle'>) => void;
  toggleHabit: (habitId: string) => void;
  completeChallenge: (challengeId: string) => void;
  sendMessage: (text: string) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  clearProgress: () => void;
};

const STORAGE_KEY = 'vibeup-state-v1';

const defaultHabits: Habit[] = [
  { id: 'move', title: 'Move for 20 minutes', detail: 'A walk, stretch, or workout counts.', icon: 'body-outline', points: 20, completed: false },
  { id: 'water', title: 'Drink a full glass of water', detail: 'Small reset, better energy.', icon: 'water-outline', points: 10, completed: false },
  { id: 'focus', title: 'Protect one focus block', detail: '25 minutes on what matters most.', icon: 'timer-outline', points: 25, completed: false },
  { id: 'connect', title: 'Send one thoughtful message', detail: 'Keep a good connection warm.', icon: 'chatbubble-ellipses-outline', points: 15, completed: false },
];

const initialState: VibeUpState = {
  onboarded: false,
  displayName: 'there',
  goal: 'confidence',
  lifestyle: 'finding my rhythm',
  coachStyle: 'warm',
  streak: 7,
  xp: 320,
  level: 4,
  habits: defaultHabits,
  messages: [
    { id: 'welcome', role: 'coach', text: 'Good morning. You do not need a perfect day to make real progress. What would feel like a win today?' },
  ],
  completedChallenges: [],
  notificationsEnabled: true,
};

function getCoachReply(text: string, state: VibeUpState): string {
  const lowered = text.toLowerCase();
  if (lowered.includes('job') || lowered.includes('career') || lowered.includes('interview')) {
    return 'Let’s make this concrete: choose one role, spend 15 minutes tailoring your opening, then send one application before the day ends. Momentum beats overthinking.';
  }
  if (lowered.includes('friend') || lowered.includes('dating') || lowered.includes('social')) {
    return 'Try a low-pressure opener that is specific and easy to answer. A genuine question is more memorable than a perfect line.';
  }
  if (lowered.includes('stress') || lowered.includes('anxious') || lowered.includes('overwhelm')) {
    return 'Pause the full list. Name the next five-minute action, make it smaller, and start there. You are allowed to move gently.';
  }
  if (state.coachStyle === 'direct') {
    return 'Pick the smallest useful action and put it on your calendar now. You can refine the plan after you have started.';
  }
  if (state.coachStyle === 'curious') {
    return 'What part of this feels hardest: starting, knowing what to do next, or staying consistent? Your answer will point us to the right next step.';
  }
  return 'That is worth working through. Choose one small action that supports the person you want to become, and let today be enough to begin.';
}

const VibeUpContext = createContext<VibeUpContextValue | null>(null);

export function VibeUpProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<VibeUpState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) setState({ ...initialState, ...JSON.parse(stored) });
      })
      .catch(() => undefined)
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => undefined);
  }, [hydrated, state]);

  const finishOnboarding = useCallback((details: Pick<VibeUpState, 'displayName' | 'goal' | 'lifestyle' | 'coachStyle'>) => {
    setState((current) => ({ ...current, ...details, onboarded: true }));
  }, []);

  const toggleHabit = useCallback((habitId: string) => {
    setState((current) => {
      const habit = current.habits.find((item) => item.id === habitId);
      if (!habit) return current;
      const completed = !habit.completed;
      return {
        ...current,
        xp: Math.max(0, current.xp + (completed ? habit.points : -habit.points)),
        habits: current.habits.map((item) => item.id === habitId ? { ...item, completed } : item),
      };
    });
  }, []);

  const completeChallenge = useCallback((challengeId: string) => {
    setState((current) => current.completedChallenges.includes(challengeId)
      ? current
      : { ...current, xp: current.xp + 40, completedChallenges: [...current.completedChallenges, challengeId] });
  }, []);

  const sendMessage = useCallback((text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setState((current) => ({
      ...current,
      messages: [
        ...current.messages,
        { id: `${Date.now()}-user`, role: 'user', text: clean },
        { id: `${Date.now()}-coach`, role: 'coach', text: getCoachReply(clean, current) },
      ],
    }));
  }, []);

  const clearProgress = useCallback(() => {
    setState((current) => ({ ...initialState, onboarded: current.onboarded, displayName: current.displayName, goal: current.goal, lifestyle: current.lifestyle, coachStyle: current.coachStyle }));
  }, []);

  const value = useMemo(() => ({
    ...state,
    hydrated,
    finishOnboarding,
    toggleHabit,
    completeChallenge,
    sendMessage,
    setNotificationsEnabled: (enabled: boolean) => setState((current) => ({ ...current, notificationsEnabled: enabled })),
    clearProgress,
  }), [state, hydrated, finishOnboarding, toggleHabit, completeChallenge, sendMessage, clearProgress]);

  return <VibeUpContext.Provider value={value}>{children}</VibeUpContext.Provider>;
}

export function useVibeUp() {
  const context = useContext(VibeUpContext);
  if (!context) throw new Error('useVibeUp must be used within VibeUpProvider');
  return context;
}