import { User, Bot, Post } from "./schema";

// API Response wrapper type
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  details?: string;
};

// User Endpoints
export namespace UserAPI {
  export namespace Create {
    export type Url = "/api/user";
    export type RequestBody = {
      user_id: string;
    };
    export type Response = ApiResponse<User>;
  }

  export namespace Update {
    export type Url = "/api/user";
    export type RequestBody = {
      user_id: string;
      expo_push_token: string;
      platform: string;
    };
    export type Response = ApiResponse<User>;
  }
}

// Bot Endpoints
export namespace BotAPI {
  export namespace Create {
    export type Url = "/api/bot";
    export type RequestBody = {
      user_id: string;
      systemPrompt: string;
    };
    export type Response = ApiResponse<Bot>;
  }

  export namespace GenerateFirstPost {
    export type Url = "/api/bot/:botId/first-post";
    export type PathParams = {
      botId: string;
    };
    export type Response = ApiResponse<{
      message: string;
      content: string;
    }>;
  }
}

// Example usage:
export const API = {
  user: {
    create: async (
      body: UserAPI.Create.RequestBody
    ): Promise<UserAPI.Create.Response> => {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return response.json();
    },

    update: async (
      body: UserAPI.Update.RequestBody
    ): Promise<UserAPI.Update.Response> => {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return response.json();
    },
  },

  bot: {
    create: async (
      body: BotAPI.Create.RequestBody
    ): Promise<BotAPI.Create.Response> => {
      const response = await fetch("/api/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return response.json();
    },

    generateFirstPost: async (
      botId: string
    ): Promise<BotAPI.GenerateFirstPost.Response> => {
      const response = await fetch(`/api/bot/${botId}/first-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  },
};
