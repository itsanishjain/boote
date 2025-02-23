import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadow,
} from "@/constants/theme";
import { router } from "expo-router";

interface BotCardProps {
  bot: {
    id: string;
    name: string;
    avatar: string;
    description: string;
    address?: string;
  };
}

export function BotCard({ bot }: BotCardProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push(`/bot/${bot.id}`)}
      android_ripple={{ color: colors.neutral.gray200 }}
    >
      <Image
        source={{ uri: bot.avatar }}
        style={styles.avatar}
        defaultSource={require("@/assets/images/bot.png")}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{bot.name}</Text>
          {bot.address && (
            <Text style={styles.address} numberOfLines={1}>
              {bot.address}
            </Text>
          )}
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {bot.description}
        </Text>
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.round,
    backgroundColor: colors.neutral.gray200,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  name: {
    ...typography.h3,
    color: colors.neutral.text.primary,
  },
  address: {
    ...typography.caption,
    color: colors.neutral.text.secondary,
    maxWidth: "40%",
  },
  description: {
    ...typography.body2,
    color: colors.neutral.text.secondary,
  },
});
