import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadow,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface Post {
  id: string;
  content: string;
  timestamp: string;
  type: "message" | "task" | "notification";
  status?: "pending" | "completed" | "failed";
}

interface BotPostProps {
  post: Post;
  onPress?: () => void;
}

export function BotPost({ post, onPress }: BotPostProps) {
  const getIconName = () => {
    switch (post.type) {
      case "task":
        return "checkbox-outline";
      case "notification":
        return "notifications-outline";
      default:
        return "chatbubble-outline";
    }
  };

  const getStatusColor = () => {
    switch (post.status) {
      case "completed":
        return colors.status.success;
      case "failed":
        return colors.status.error;
      case "pending":
        return colors.status.warning;
      default:
        return colors.neutral.text.secondary;
    }
  };

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      android_ripple={{ color: colors.neutral.gray200 }}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={getIconName()}
          size={20}
          color={colors.neutral.text.primary}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>{post.content}</Text>
        <View style={styles.footer}>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
          {post.status && (
            <Text style={[styles.status, { color: getStatusColor() }]}>
              {post.status}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.neutral.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadow.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.neutral.background.tertiary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  message: {
    ...typography.body1,
    color: colors.neutral.text.primary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  timestamp: {
    ...typography.caption,
    color: colors.neutral.text.secondary,
  },
  status: {
    ...typography.caption,
    textTransform: "capitalize",
  },
});
