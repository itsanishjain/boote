import React, { createContext, useContext, useState, useEffect } from "react";
import { useDatabase } from "@/lib/db";
import { useStats } from "@/context/StatsContext";
import type { Achievement } from "@/lib/achievements";
import { ACHIEVEMENTS } from "@/lib/achievements";

type AchievementsContextType = {
  achievements: Achievement[];
  totalUnlocked: number;
  totalPoints: number;
  refreshAchievements: () => Promise<void>;
};

const AchievementsContext = createContext<AchievementsContextType | undefined>(
  undefined
);

export function AchievementsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const { stats } = useStats();
  const db = useDatabase();

  const refreshAchievements = async () => {
    console.log("Refreshing achievements");
    try {
      const unlockedAchievements = await db.getUnlockedAchievements();
      const updatedAchievements = ACHIEVEMENTS.map((achievement) => {
        const { unlocked, progress } = achievement.checkUnlock(stats);
        const wasUnlocked = unlockedAchievements.includes(achievement.id);

        // If newly unlocked, save to database
        if (unlocked && !wasUnlocked) {
          db.unlockAchievement(achievement.id);
        }

        return {
          ...achievement,
          unlocked: unlocked || wasUnlocked,
          progress,
        };
      });

      setAchievements(updatedAchievements);
    } catch (error) {
      console.error("Error refreshing achievements:", error);
    }
  };

  useEffect(() => {
    refreshAchievements();
  }, [stats]);

  const totalUnlocked = achievements.filter((a) => a.unlocked).length;
  const totalPoints = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <AchievementsContext.Provider
      value={{
        achievements,
        totalUnlocked,
        totalPoints,
        refreshAchievements,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementsContext);
  if (context === undefined) {
    throw new Error(
      "useAchievements must be used within an AchievementsProvider"
    );
  }
  return context;
}
