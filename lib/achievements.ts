import { Ionicons } from "@expo/vector-icons";
import type { Stats } from "@/context/StatsContext";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  points: number;
  unlocked: boolean;
  progress: number;
  total: number;
  category: "general" | "streak" | "points" | "tasks" | "time";
  checkUnlock: (stats: Stats) => { unlocked: boolean; progress: number };
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "early_bird",
    title: "Early Bird",
    description:
      "Complete 5 different tasks before 11 AM (each task counts once per day)",
    icon: "sunny-outline",
    points: 100,
    unlocked: false,
    progress: 0,
    total: 5,
    category: "time",
    checkUnlock: (stats) => ({
      unlocked: stats.earlyBirdTasks >= 5,
      progress: stats.earlyBirdTasks,
    }),
  },
  {
    id: "clean_streak_7",
    title: "Clean Streak",
    description: "Complete tasks for 7 days in a row",
    icon: "flame-outline",
    points: 200,
    unlocked: false,
    progress: 0,
    total: 7,
    category: "streak",
    checkUnlock: (stats) => ({
      unlocked: stats.currentStreak >= 7,
      progress: stats.currentStreak,
    }),
  },
  {
    id: "clean_streak_30",
    title: "Clean Master",
    description: "Complete tasks for 30 days in a row",
    icon: "flame",
    points: 1000,
    unlocked: false,
    progress: 0,
    total: 30,
    category: "streak",
    checkUnlock: (stats) => ({
      unlocked: stats.currentStreak >= 30,
      progress: stats.currentStreak,
    }),
  },
  {
    id: "points_1000",
    title: "Point Collector",
    description: "Earn 1,000 total points",
    icon: "trophy-outline",
    points: 500,
    unlocked: false,
    progress: 0,
    total: 1000,
    category: "points",
    checkUnlock: (stats) => ({
      unlocked: stats.totalPoints >= 1000,
      progress: stats.totalPoints,
    }),
  },
  {
    id: "points_5000",
    title: "Point Master",
    description: "Earn 5,000 total points",
    icon: "trophy",
    points: 1000,
    unlocked: false,
    progress: 0,
    total: 5000,
    category: "points",
    checkUnlock: (stats) => ({
      unlocked: stats.totalPoints >= 5000,
      progress: stats.totalPoints,
    }),
  },
  {
    id: "tasks_50",
    title: "Task Enthusiast",
    description: "Complete 50 tasks",
    icon: "checkmark-circle-outline",
    points: 300,
    unlocked: false,
    progress: 0,
    total: 50,
    category: "tasks",
    checkUnlock: (stats) => ({
      unlocked: stats.tasksCompleted >= 50,
      progress: stats.tasksCompleted,
    }),
  },
  {
    id: "tasks_100",
    title: "Task Master",
    description: "Complete 100 tasks",
    icon: "checkmark-circle",
    points: 500,
    unlocked: false,
    progress: 0,
    total: 100,
    category: "tasks",
    checkUnlock: (stats) => ({
      unlocked: stats.tasksCompleted >= 100,
      progress: stats.tasksCompleted,
    }),
  },
  {
    id: "tasks_500",
    title: "Task Legend",
    description: "Complete 500 tasks",
    icon: "checkmark-done-circle",
    points: 2000,
    unlocked: false,
    progress: 0,
    total: 500,
    category: "tasks",
    checkUnlock: (stats) => ({
      unlocked: stats.tasksCompleted >= 500,
      progress: stats.tasksCompleted,
    }),
  },
  {
    id: "all_rooms",
    title: "Room Collector",
    description:
      "Complete at least 1 task in every room type (Bedroom, Bathroom, Kitchen, Living Room, Office, Garage, Outdoor, Other)",
    icon: "home-outline",
    points: 300,
    unlocked: false,
    progress: 0,
    total: 8,
    category: "general",
    checkUnlock: (stats) => ({
      unlocked: stats.uniqueRoomTypes >= 8,
      progress: stats.uniqueRoomTypes,
    }),
  },
  {
    id: "perfect_week",
    title: "Perfect Week",
    description: "Complete all scheduled tasks for 7 days straight",
    icon: "calendar",
    points: 1000,
    unlocked: false,
    progress: 0,
    total: 7,
    category: "streak",
    checkUnlock: (stats) => ({
      unlocked: stats.perfectDays >= 7,
      progress: stats.perfectDays,
    }),
  },
  {
    id: "room_master",
    title: "Room Master",
    description: "Create 10 different rooms",
    icon: "grid-outline",
    points: 500,
    unlocked: false,
    progress: 0,
    total: 10,
    category: "general",
    checkUnlock: (stats) => ({
      unlocked: stats.roomsCreated >= 10,
      progress: stats.roomsCreated,
    }),
  },
  {
    id: "completion_rate_90",
    title: "Efficiency Expert",
    description: "Maintain a 90% weekly completion rate",
    icon: "analytics-outline",
    points: 1000,
    unlocked: false,
    progress: 0,
    total: 90,
    category: "general",
    checkUnlock: (stats) => ({
      unlocked: stats.weeklyCompletionRate >= 90,
      progress: Math.round(stats.weeklyCompletionRate),
    }),
  },
  {
    id: "longest_streak_50",
    title: "Unstoppable",
    description: "Achieve a 50-day streak",
    icon: "infinite-outline",
    points: 2000,
    unlocked: false,
    progress: 0,
    total: 50,
    category: "streak",
    checkUnlock: (stats) => ({
      unlocked: stats.longestStreak >= 50,
      progress: stats.longestStreak,
    }),
  },
];
