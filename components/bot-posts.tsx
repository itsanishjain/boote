import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { colors, spacing } from "@/constants/theme";
import { BotPost } from "./bot-post";

interface Post {
  id: string;
  content: string;
  timestamp: string;
  type: "message" | "task" | "notification";
  status?: "pending" | "completed" | "failed";
}

interface BotPostsProps {
  posts: Post[];
  onPostPress?: (post: Post) => void;
}

export function BotPosts({ posts, onPostPress }: BotPostsProps) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BotPost post={item} onPress={() => onPostPress?.(item)} />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  separator: {
    height: spacing.md,
  },
});
