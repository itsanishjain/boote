import { AlchemySmartAccountClient } from "@account-kit/infra";
import { User } from "@account-kit/signer";

export type RoomType =
  | "Custom"
  | "Bedroom"
  | "Child's room"
  | "Bathroom"
  | "Toilet"
  | "Dining room"
  | "Entrance"
  | "Dressing room"
  | "Kitchen"
  | "Office"
  | "Living room"
  | "Laundry"
  | "Garage"
  | "Garden"
  | "House";

export type TaskFrequencyUnit = "days" | "weeks" | "months";

export type TaskConfig = {
  frequency: {
    value: number;
    unit: TaskFrequencyUnit;
  };
  effort: 1 | 2 | 3; // 1-3 dots for effort level
  currentState: number; // 0-100 for slider value
};

export type Task = {
  id: string;
  roomId: string;
  name: string;
  config: TaskConfig;
  isCompleted: boolean;
  lastCompletedAt: number | null;
  createdAt: number;
};

export type Room = {
  id: string;
  name: string;
  type: RoomType;
  icon: string;
  tasks: Task[];
};

// Predefined tasks list
export const PREDEFINED_TASKS = [
  "Change bed sheets",
  "Clean under bed",
  "Clean bedside table",
  "Tidy up wardrobe",
  "Clean TV",
  "Wash pillows",
  "Wash blankets",
  "Wash mattress pad",
  "Organize drawers",
  "Dust surfaces",
] as const;

export type RawRoom = {
  id: string;
  name: string;
  type: RoomType;
  icon: string;
  created_at: number;
};

export type RawTask = {
  id: string;
  room_id: string;
  name: string;
  frequency_value: number;
  frequency_unit: "days" | "weeks" | "months";
  effort: 1 | 2 | 3;
  current_state: number;
  is_completed: number;
  last_completed_at: number | null;
  created_at: number;
};

export enum AuthenticatingState {
  UNAUTHENTICATED = "unauthenticated",
  AWAITING_OTP = "awaiting-otp",
  AUTHENTICATED = "authenticated",
}

export interface AlchemyAuthSessionContextType {
  user: User | null;
  authState: AuthenticatingState | null;
  loading: boolean;
  lightAccountClient: AlchemySmartAccountClient | null;
  signInWithOTP: (email: string) => void;
  verifyUserOTP: (otp: string) => void;
  signOutUser: () => void;
}
