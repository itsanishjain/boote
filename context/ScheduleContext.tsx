import React, { createContext, useContext, useState, useEffect } from "react";
import { useDatabase } from "@/lib/db";
import { Task } from "@/types";
import {
  startOfToday,
  addDays,
  isSameDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  isWithinInterval,
} from "date-fns";

export type ScheduleTask = Task & {
  roomName: string;
  roomIcon: string;
};

type ViewMode = "week" | "month" | "3months";

type ScheduleContextType = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  scheduledTasks: ScheduleTask[];
  loading: boolean;
  refreshSchedule: () => Promise<void>;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [scheduledTasks, setScheduledTasks] = useState<ScheduleTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const db = useDatabase();

  const getFrequencyInDays = (frequency: {
    value: number;
    unit: "days" | "weeks" | "months";
  }) => {
    switch (frequency.unit) {
      case "days":
        return frequency.value;
      case "weeks":
        return frequency.value * 7;
      case "months":
        return frequency.value * 30;
      default:
        return frequency.value;
    }
  };

  const calculateShouldShowTask = (task: Task, date: Date): boolean => {
    if (!task.lastCompletedAt) return true;

    const lastCompletionDate = new Date(task.lastCompletedAt);
    const frequencyInDays = getFrequencyInDays(task.config.frequency);

    // Calculate the next due date
    const nextDueDate = addDays(lastCompletionDate, frequencyInDays);

    // Calculate the date range based on view mode
    let rangeStart: Date, rangeEnd: Date;
    switch (viewMode) {
      case "week":
        rangeStart = date;
        rangeEnd = addDays(date, 7);
        break;
      case "month":
        rangeStart = startOfMonth(date);
        rangeEnd = endOfMonth(date);
        break;
      case "3months":
        rangeStart = date;
        rangeEnd = addMonths(date, 3);
        break;
    }

    // Check if the next due date falls within our range
    return isWithinInterval(nextDueDate, { start: rangeStart, end: rangeEnd });
  };

  const sortTasksByPriority = (tasks: ScheduleTask[]): ScheduleTask[] => {
    return [...tasks].sort((a, b) => {
      // If neither task has been completed, sort by frequency
      if (!a.lastCompletedAt && !b.lastCompletedAt) {
        return (
          getFrequencyInDays(a.config.frequency) -
          getFrequencyInDays(b.config.frequency)
        );
      }

      // If only one task has never been completed, it gets priority
      if (!a.lastCompletedAt) return -1;
      if (!b.lastCompletedAt) return 1;

      // Otherwise, sort by how overdue they are
      const aOverdue = getDaysOverdue(a);
      const bOverdue = getDaysOverdue(b);
      return bOverdue - aOverdue;
    });
  };

  const getDaysOverdue = (task: Task): number => {
    if (!task.lastCompletedAt) return Number.MAX_SAFE_INTEGER;

    const lastCompletion = new Date(task.lastCompletedAt);
    const now = new Date();
    const daysSinceCompletion = Math.floor(
      (now.getTime() - lastCompletion.getTime()) / (1000 * 60 * 60 * 24)
    );
    const frequencyInDays = getFrequencyInDays(task.config.frequency);

    return Math.max(0, daysSinceCompletion - frequencyInDays);
  };

  const refreshSchedule = async () => {
    try {
      setLoading(true);
      const rooms = await db.getRooms();
      const allTasks: ScheduleTask[] = [];

      rooms.forEach((room) => {
        room.tasks.forEach((task) => {
          // Skip completed tasks
          if (task.isCompleted) return;

          // Calculate if task should be shown based on the date range
          const shouldShowTask = calculateShouldShowTask(task, selectedDate);
          if (shouldShowTask) {
            allTasks.push({
              ...task,
              roomName: room.name,
              roomIcon: room.icon,
            });
          }
        });
      });

      // Sort tasks by priority
      const sortedTasks = sortTasksByPriority(allTasks);
      setScheduledTasks(sortedTasks);
    } catch (error) {
      console.error("Error loading schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSchedule();
  }, [selectedDate, viewMode]);

  return (
    <ScheduleContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        scheduledTasks,
        loading,
        refreshSchedule,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
}
