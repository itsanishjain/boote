import * as SQLite from "expo-sqlite";
import { RoomType, TaskConfig, Room, Task, RawRoom, RawTask } from "@/types";
import { ACHIEVEMENTS } from "./achievements";
import { migrateDbIfNeeded } from "@/lib/migrations";
import { getRoomIcon } from "./utils";

export const DB_NAME = "papa.db";
let db: Database | null = null;

export function useDatabase() {
  if (!db) {
    db = new Database();
  }
  return db;
}

export class Database {
  private db!: SQLite.SQLiteDatabase;
  private initialized: Promise<void>;

  constructor() {
    this.initialized = this.init();
  }

  private async init() {
    this.db = await SQLite.openDatabaseAsync(DB_NAME);
    await migrateDbIfNeeded(this.db);
  }

  private async ensureInitialized() {
    await this.initialized;
  }

  async addRoom(name: string, type: RoomType): Promise<Room> {
    await this.ensureInitialized();

    const roomId = Math.random().toString(36).slice(2);
    const now = Date.now();
    const icon = getRoomIcon(type);

    console.log("Adding room", name, type, icon);

    await this.db.runAsync(
      `INSERT INTO rooms (id, name, type, icon, created_at)
       VALUES (?, ?, ?, ?, ?);`,
      [roomId, name, type, icon, now]
    );

    // Get current unique room types
    const uniqueRoomTypes = await this.db.getAllAsync<{ count: number }>(
      `SELECT COUNT(DISTINCT type) as count FROM rooms`
    );

    // Get current stats
    const stats = await this.db.getAllAsync<{
      rooms_created: number;
    }>('SELECT * FROM user_stats WHERE id = "default"');

    if (stats.length === 0) {
      // Initialize user stats if they don't exist
      await this.db.runAsync(
        `INSERT INTO user_stats (
          id, current_streak, longest_streak, total_points,
          last_activity_date, tasks_completed, early_bird_tasks,
          unique_room_types, perfect_days, rooms_created,
          tasks_completed_today, total_scheduled_tasks_today,
          weekly_completion_rate
        ) VALUES (
          'default', 0, 0, 0, NULL, 0, 0, ?, 0, 1, 0, 0, 0
        )`,
        [uniqueRoomTypes[0].count]
      );
    } else {
      // Update room-related stats
      await this.db.runAsync(
        `UPDATE user_stats 
         SET rooms_created = rooms_created + 1,
             unique_room_types = ?
         WHERE id = "default";`,
        [uniqueRoomTypes[0].count]
      );
    }

    return {
      id: roomId,
      name,
      type,
      icon,
      tasks: [],
    };
  }

  async addTask(
    roomId: string,
    name: string,
    config: TaskConfig
  ): Promise<Task> {
    await this.ensureInitialized();

    const taskId = Math.random().toString(36).slice(2);
    const now = Date.now();

    await this.db.runAsync(
      `INSERT INTO tasks (
        id, room_id, name,
        frequency_value, frequency_unit,
        effort, current_state,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        taskId,
        roomId,
        name,
        config.frequency.value,
        config.frequency.unit,
        config.effort,
        config.currentState,
        now,
      ]
    );

    return {
      id: taskId,
      roomId,
      name,
      config,
      isCompleted: false,
      lastCompletedAt: null,
      createdAt: now,
    };
  }

  async addTasksToRoom(
    roomId: string,
    tasks: Array<{ name: string; config: TaskConfig }>
  ): Promise<Task[]> {
    return Promise.all(
      tasks.map(({ name, config }) => this.addTask(roomId, name, config))
    );
  }

  async getRooms(): Promise<Room[]> {
    await this.ensureInitialized();

    const rows = await this.db.getAllAsync<RawRoom>(
      `SELECT * FROM rooms ORDER BY created_at DESC;`
    );

    const roomsWithTasks = await Promise.all(
      rows.map(async (row) => {
        const { tasks } = await this.getRoomWithTasks(row.id);
        return {
          id: row.id,
          name: row.name,
          type: row.type,
          icon: row.icon,
          tasks,
        };
      })
    );

    return roomsWithTasks;
  }

  async getRoomWithTasks(
    roomId: string
  ): Promise<{ room: Room; tasks: Task[] }> {
    await this.ensureInitialized();

    const rooms = await this.db.getAllAsync<RawRoom>(
      `SELECT * FROM rooms WHERE id = ?;`,
      [roomId]
    );

    if (rooms.length === 0) {
      throw new Error("Room not found");
    }

    const rawRoom = rooms[0];
    const tasks = await this.db.getAllAsync<RawTask>(
      `SELECT * FROM tasks WHERE room_id = ? ORDER BY created_at;`,
      [roomId]
    );

    const mappedTasks = tasks.map((task) => ({
      id: task.id,
      roomId: task.room_id,
      name: task.name,
      config: {
        frequency: {
          value: task.frequency_value,
          unit: task.frequency_unit,
        },
        effort: task.effort,
        currentState: task.current_state,
      },
      isCompleted: Boolean(task.is_completed),
      lastCompletedAt: task.last_completed_at,
      createdAt: task.created_at,
    }));

    return {
      room: {
        id: rawRoom.id,
        name: rawRoom.name,
        type: rawRoom.type,
        icon: rawRoom.icon,
        tasks: mappedTasks,
      },
      tasks: mappedTasks,
    };
  }

  async getRoom(roomId: string): Promise<Room> {
    const { room } = await this.getRoomWithTasks(roomId);
    return room;
  }

  async getTasks(roomId: string): Promise<Task[]> {
    const { tasks } = await this.getRoomWithTasks(roomId);
    return tasks;
  }

  async completeTask(taskId: string): Promise<void> {
    await this.ensureInitialized();
    const now = Date.now();

    // Get task details first
    const tasks = await this.db.getAllAsync<RawTask>(
      "SELECT * FROM tasks WHERE id = ?",
      [taskId]
    );

    if (tasks.length === 0) {
      throw new Error("Task not found");
    }

    const task = tasks[0];
    const points = task.effort;

    // Update task completion
    await this.db.runAsync(
      `UPDATE tasks 
       SET is_completed = 1, 
           last_completed_at = ?,
           current_state = 100
       WHERE id = ?`,
      [now, taskId]
    );

    // Get current user stats
    const stats = await this.db.getAllAsync<{
      current_streak: number;
      longest_streak: number;
      last_activity_date: number | null;
      total_points: number;
      tasks_completed: number;
      early_bird_tasks: number;
      perfect_days: number;
      tasks_completed_today: number;
      total_scheduled_tasks_today: number;
    }>('SELECT * FROM user_stats WHERE id = "default"');

    // Check if task was completed before 11 AM
    const completionDate = new Date(now);
    const completionHour = completionDate.getHours();

    // Get today's date bounds
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    // Check if this task was already counted as early bird today
    const earlyBirdToday = await this.db.getAllAsync<{ count: number }>(
      `SELECT COUNT(*) as count
       FROM early_bird_completions 
       WHERE task_id = ? 
       AND completed_at >= ? 
       AND completed_at <= ?`,
      [taskId, todayStart.getTime(), todayEnd.getTime()]
    );

    // Only count as early bird if:
    // 1. It's before 11 AM
    // 2. This task hasn't been counted as early bird today
    const isEarlyBird = completionHour < 11 && earlyBirdToday[0].count === 0;

    // If it's an early bird completion, record it
    if (isEarlyBird) {
      await this.db.runAsync(
        `INSERT INTO early_bird_completions (task_id, completed_at)
         VALUES (?, ?);`,
        [taskId, now]
      );
    }

    // Get today's tasks stats
    const todayTasks = await this.db.getAllAsync<{
      total: number;
      completed: number;
    }>(
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN is_completed = 1 THEN 1 ELSE 0 END) as completed
       FROM tasks 
       WHERE created_at >= ? AND created_at <= ?`,
      [todayStart.getTime(), todayEnd.getTime()]
    );

    const isPerfectDay =
      todayTasks[0].total > 0 &&
      todayTasks[0].total === todayTasks[0].completed;

    // Calculate weekly completion rate
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);
    const weeklyTasks = await this.db.getAllAsync<{
      total: number;
      completed: number;
    }>(
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN is_completed = 1 THEN 1 ELSE 0 END) as completed
       FROM tasks 
       WHERE created_at >= ?`,
      [weekStart.getTime()]
    );

    const weeklyCompletionRate =
      weeklyTasks[0].total > 0
        ? (weeklyTasks[0].completed / weeklyTasks[0].total) * 100
        : 0;

    if (stats.length === 0) {
      // Initialize user stats if they don't exist
      await this.db.runAsync(
        `INSERT INTO user_stats (
          id, current_streak, longest_streak, total_points,
          last_activity_date, tasks_completed, early_bird_tasks,
          perfect_days, tasks_completed_today,
          total_scheduled_tasks_today, weekly_completion_rate
        ) VALUES (?, 1, 1, ?, ?, 1, ?, ?, ?, ?, ?)`,
        [
          "default",
          points,
          now,
          isEarlyBird ? 1 : 0,
          isPerfectDay ? 1 : 0,
          todayTasks[0].completed,
          todayTasks[0].total,
          weeklyCompletionRate,
        ]
      );
    } else {
      const currentStats = stats[0];
      // Calculate streak
      const lastDate = currentStats.last_activity_date
        ? new Date(currentStats.last_activity_date)
        : null;
      const today = new Date(now);

      // Check if the last activity was today
      const isToday =
        lastDate &&
        lastDate.getDate() === today.getDate() &&
        lastDate.getMonth() === today.getMonth() &&
        lastDate.getFullYear() === today.getFullYear();

      // Check if the last activity was yesterday
      const isConsecutiveDay =
        lastDate &&
        !isToday && // Only check for consecutive day if it's not today
        today.getDate() - lastDate.getDate() === 1 &&
        today.getMonth() === lastDate.getMonth() &&
        today.getFullYear() === lastDate.getFullYear();

      // Determine the new streak
      let newStreak = currentStats.current_streak;
      if (isToday) {
        // Keep the current streak if activity was today
        newStreak = currentStats.current_streak;
      } else if (isConsecutiveDay) {
        // Increment streak if activity was yesterday
        newStreak = currentStats.current_streak + 1;
      } else {
        // Reset streak if more than a day has passed
        newStreak = 1;
      }

      const newLongestStreak = Math.max(newStreak, currentStats.longest_streak);

      // Update user stats
      await this.db.runAsync(
        `UPDATE user_stats 
         SET current_streak = ?,
             longest_streak = ?,
             total_points = total_points + ?,
             last_activity_date = ?,
             tasks_completed = tasks_completed + 1,
             early_bird_tasks = early_bird_tasks + ?,
             perfect_days = perfect_days + ?,
             tasks_completed_today = ?,
             total_scheduled_tasks_today = ?,
             weekly_completion_rate = ?
         WHERE id = "default"`,
        [
          newStreak,
          newLongestStreak,
          points,
          now,
          isEarlyBird ? 1 : 0,
          isPerfectDay ? 1 : 0,
          todayTasks[0].completed,
          todayTasks[0].total,
          weeklyCompletionRate,
        ]
      );
    }
  }

  async updateTaskConfig(taskId: string, config: TaskConfig) {
    await this.ensureInitialized();

    console.log("Updating task config", taskId, config);

    await this.db.runAsync(
      `UPDATE tasks SET frequency_value = ?, frequency_unit = ?, effort = ?, current_state = ? WHERE id = ?;`,
      [
        config.frequency.value,
        config.frequency.unit,
        config.effort,
        config.currentState,
        taskId,
      ]
    );
  }

  async getStats() {
    await this.ensureInitialized();

    const stats = await this.db.getAllAsync<{
      current_streak: number;
      longest_streak: number;
      total_points: number;
      last_activity_date: number | null;
      tasks_completed: number;
      early_bird_tasks: number;
      unique_room_types: number;
      perfect_days: number;
      rooms_created: number;
      tasks_completed_today: number;
      total_scheduled_tasks_today: number;
      weekly_completion_rate: number;
    }>('SELECT * FROM user_stats WHERE id = "default"');

    if (stats.length === 0) {
      // Return default values if no stats exist
      return {
        totalPoints: 0,
        currentStreak: 0,
        tasksCompleted: 0,
        earlyBirdTasks: 0,
        uniqueRoomTypes: 0,
        perfectDays: 0,
        lastActivityDate: null,
        longestStreak: 0,
        roomsCreated: 0,
        tasksCompletedToday: 0,
        totalScheduledTasksToday: 0,
        weeklyCompletionRate: 0,
      };
    }

    const currentStats = stats[0];
    return {
      totalPoints: currentStats.total_points,
      currentStreak: currentStats.current_streak,
      tasksCompleted: currentStats.tasks_completed,
      earlyBirdTasks: currentStats.early_bird_tasks,
      uniqueRoomTypes: currentStats.unique_room_types,
      perfectDays: currentStats.perfect_days,
      lastActivityDate: currentStats.last_activity_date,
      longestStreak: currentStats.longest_streak,
      roomsCreated: currentStats.rooms_created,
      tasksCompletedToday: currentStats.tasks_completed_today,
      totalScheduledTasksToday: currentStats.total_scheduled_tasks_today,
      weeklyCompletionRate: currentStats.weekly_completion_rate,
    };
  }

  async getUnlockedAchievements(): Promise<string[]> {
    await this.ensureInitialized();
    const rows = await this.db.getAllAsync<{ id: string }>(
      `SELECT id FROM achievements;`
    );
    return rows.map((row) => row.id);
  }

  async unlockAchievement(achievementId: string): Promise<void> {
    await this.ensureInitialized();

    // First check if achievement is already unlocked to avoid double-counting points
    const existing = await this.db.getAllAsync<{ id: string }>(
      `SELECT id FROM achievements WHERE id = ?;`,
      [achievementId]
    );

    if (existing.length > 0) {
      return; // Achievement already unlocked, skip to avoid double-counting points
    }

    // Find the achievement points from the ACHIEVEMENTS constant
    const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
    if (!achievement) {
      console.error(`Achievement ${achievementId} not found`);
      return;
    }

    // Add achievement to unlocked list and update total points
    await this.db.runAsync(
      `INSERT INTO achievements (id, unlocked_at)
       VALUES (?, ?);`,
      [achievementId, Date.now()]
    );

    // Update total points in user_stats
    await this.db.runAsync(
      `UPDATE user_stats 
       SET total_points = total_points + ?
       WHERE id = "default";`,
      [achievement.points]
    );
  }

  async deleteRoom(roomId: string): Promise<void> {
    await this.ensureInitialized();

    try {
      // Get room type before deletion to update stats
      const room = await this.getRoom(roomId);

      // Delete the room (cascade will delete associated tasks)
      await this.db.runAsync(`DELETE FROM rooms WHERE id = ?;`, [roomId]);

      // Get current unique room types after deletion
      const uniqueRoomTypes = await this.db.getAllAsync<{ count: number }>(
        `SELECT COUNT(DISTINCT type) as count FROM rooms`
      );

      // Update user stats
      await this.db.runAsync(
        `UPDATE user_stats 
         SET unique_room_types = ?
         WHERE id = "default";`,
        [uniqueRoomTypes[0].count]
      );
    } catch (error) {
      console.error("Error deleting room:", error);
      throw new Error("Failed to delete room");
    }
  }
}
