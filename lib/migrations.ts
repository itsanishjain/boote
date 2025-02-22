import * as SQLite from "expo-sqlite";

export const MIGRATIONS = {
  1: `
      PRAGMA foreign_keys = OFF;
      
      CREATE TABLE IF NOT EXISTS rooms (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        icon TEXT NOT NULL,
        created_at INTEGER NOT NULL
      );
  
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        room_id TEXT NOT NULL,
        name TEXT NOT NULL,
        frequency_value INTEGER NOT NULL,
        frequency_unit TEXT NOT NULL,
        effort INTEGER NOT NULL,
        current_state INTEGER NOT NULL,
        is_completed INTEGER NOT NULL DEFAULT 0,
        last_completed_at INTEGER,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (room_id) REFERENCES rooms (id) ON DELETE CASCADE
      );
  
      CREATE TABLE IF NOT EXISTS user_stats (
        id TEXT PRIMARY KEY DEFAULT 'default',
        current_streak INTEGER NOT NULL DEFAULT 0,
        longest_streak INTEGER NOT NULL DEFAULT 0,
        total_points INTEGER NOT NULL DEFAULT 0,
        last_activity_date INTEGER,
        tasks_completed INTEGER NOT NULL DEFAULT 0,
        early_bird_tasks INTEGER NOT NULL DEFAULT 0,
        unique_room_types INTEGER NOT NULL DEFAULT 0,
        perfect_days INTEGER NOT NULL DEFAULT 0,
        rooms_created INTEGER NOT NULL DEFAULT 0,
        tasks_completed_today INTEGER NOT NULL DEFAULT 0,
        total_scheduled_tasks_today INTEGER NOT NULL DEFAULT 0,
        weekly_completion_rate REAL NOT NULL DEFAULT 0
      );
  
      CREATE TABLE IF NOT EXISTS achievements (
        id TEXT PRIMARY KEY,
        unlocked_at INTEGER NOT NULL
      );
  
      CREATE TABLE IF NOT EXISTS early_bird_completions (
        task_id TEXT NOT NULL,
        completed_at INTEGER NOT NULL,
        PRIMARY KEY (task_id, completed_at)
      );
    `,
  2: `
      ALTER TABLE tasks ADD COLUMN points INTEGER DEFAULT 0;
      ALTER TABLE tasks ADD COLUMN streak INTEGER DEFAULT 0;
    `,
  // Add more migrations as needed
} as const;

const CURRENT_VERSION = Math.max(...Object.keys(MIGRATIONS).map(Number));
export async function migrateDbIfNeeded(db: SQLite.SQLiteDatabase) {
  // First, enable WAL mode for better performance and concurrent access
  await db.execAsync("PRAGMA journal_mode = WAL;");

  // Get current database version
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version;"
  );
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion >= CURRENT_VERSION) {
    return;
  }

  // Run all pending migrations in order
  for (
    let version = currentVersion + 1;
    version <= CURRENT_VERSION;
    version++
  ) {
    const migration = MIGRATIONS[version as keyof typeof MIGRATIONS];
    const statements = migration
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const statement of statements) {
      await db.execAsync(statement);
    }
  }

  // Update database version
  await db.execAsync(`PRAGMA user_version = ${CURRENT_VERSION};`);
}
