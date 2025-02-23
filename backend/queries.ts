import type { User, Bot, Post } from "./schema";
import { API_URL } from "@/constants";

interface QueryResponse<T> {
  data?: T;
  error?: string;
  isLoading: boolean;
}

const BACKEND_URL = API_URL || "http://localhost:3001";

export const QUERIES = {
  user: {
    create: async (walletAddress: string): Promise<QueryResponse<User>> => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: walletAddress,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          return {
            error: data.error || "Failed to create user",
            isLoading: false,
          };
        }

        return {
          data: data.data,
          isLoading: false,
        };
      } catch (error) {
        return {
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
          isLoading: false,
        };
      }
    },

    update: async (
      walletAddress: string,
      expoPushToken: string,
      platform: string
    ): Promise<QueryResponse<User>> => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/user`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: walletAddress,
            expo_push_token: expoPushToken,
            platform,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          return {
            error: data.error || "Failed to update user",
            isLoading: false,
          };
        }

        return {
          data: data.data,
          isLoading: false,
        };
      } catch (error) {
        return {
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
          isLoading: false,
        };
      }
    },
  },

  bot: {
    create: async (
      userId: string,
      systemPrompt: string
    ): Promise<QueryResponse<Bot>> => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/bot`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            systemPrompt,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          return {
            error: data.error || "Failed to create bot",
            isLoading: false,
          };
        }

        return {
          data: data.data,
          isLoading: false,
        };
      } catch (error) {
        return {
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
          isLoading: false,
        };
      }
    },

    generateFirstPost: async (
      botId: string
    ): Promise<QueryResponse<{ message: string; content: string }>> => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/bot/${botId}/first-post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return {
            error: data.error || "Failed to generate first post",
            isLoading: false,
          };
        }

        return {
          data: data.data,
          isLoading: false,
        };
      } catch (error) {
        return {
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
          isLoading: false,
        };
      }
    },
  },
};
