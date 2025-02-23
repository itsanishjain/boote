// User type definition
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

// Post type definition
export interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  reposts: number;
  timestamp: string;
}

// Bot specific type definition
export interface Bot {
  id: string;
  userId: string; // owner of the bot
  name: string;
  username: string;
  avatar: string;
  systemPrompt: string;
  lastPostTimestamp?: string;
  createdAt: string;
}

// Interaction types
export interface Like {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

// Comment type definition
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: string;
}
