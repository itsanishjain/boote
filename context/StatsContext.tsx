import React, { createContext, useContext, useState, useEffect } from "react";
import { useDatabase } from "@/lib/db";

export type Stats = {
  // Basic stats
  totalPoints: number;
  currentStreak: number;
  tasksCompleted: number;

  // Time-based stats
  earlyBirdTasks: number;
  perfectDays: number;
  lastActivityDate: number | null;

  // Streak stats
  longestStreak: number;

  // Room stats
  uniqueRoomTypes: number;
  roomsCreated: number;

  // Task completion stats
  tasksCompletedToday: number;
  totalScheduledTasksToday: number;
  weeklyCompletionRate: number;
};

type StatsContextType = {
  stats: Stats;
  refreshStats: () => Promise<void>;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<Stats>({
    // Basic stats
    totalPoints: 0,
    currentStreak: 0,
    tasksCompleted: 0,

    // Time-based stats
    earlyBirdTasks: 0,
    perfectDays: 0,
    lastActivityDate: null,

    // Streak stats
    longestStreak: 0,

    // Room stats
    uniqueRoomTypes: 0,
    roomsCreated: 0,

    // Task completion stats
    tasksCompletedToday: 0,
    totalScheduledTasksToday: 0,
    weeklyCompletionRate: 0,
  });
  const db = useDatabase();

  const refreshStats = async () => {
    try {
      const loadedStats = await db.getStats();
      setStats(loadedStats);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  useEffect(() => {
    refreshStats();
  }, []);

  return (
    <StatsContext.Provider value={{ stats, refreshStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return context;
}
