import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadow,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface BotProfileProps {
  bot: {
    name: string;
    avatar: string;
    description: string;
    address: string;
    stats?: {
      tasks: number;
      uptime: string;
      successRate: string;
    };
  };
  onSettingsPress?: () => void;
}

export function BotProfile({ bot, onSettingsPress }: BotProfileProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: bot.avatar }}
          style={styles.avatar}
          defaultSource={require("@/assets/images/bot.png")}
        />
        <Pressable
          style={styles.settingsButton}
          onPress={onSettingsPress}
          android_ripple={{ color: colors.neutral.gray200 }}
        >
          <Ionicons
            name="settings-outline"
            size={24}
            color={colors.neutral.text.primary}
          />
        </Pressable>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{bot.name}</Text>
        <Text style={styles.address} numberOfLines={1}>
          {bot.address}
        </Text>
        <Text style={styles.description}>{bot.description}</Text>
      </View>

      {bot.stats && (
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{bot.stats.tasks}</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{bot.stats.uptime}</Text>
            <Text style={styles.statLabel}>Uptime</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{bot.stats.successRate}</Text>
            <Text style={styles.statLabel}>Success</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadow.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.round,
    backgroundColor: colors.neutral.gray200,
  },
  settingsButton: {
    padding: spacing.xs,
    borderRadius: borderRadius.round,
    backgroundColor: colors.neutral.background.tertiary,
  },
  info: {
    marginTop: spacing.md,
  },
  name: {
    ...typography.h2,
    color: colors.neutral.text.primary,
  },
  address: {
    ...typography.caption,
    color: colors.neutral.text.secondary,
    marginTop: spacing.xxs,
  },
  description: {
    ...typography.body2,
    color: colors.neutral.text.secondary,
    marginTop: spacing.sm,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    ...typography.h3,
    color: colors.neutral.text.primary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.neutral.text.secondary,
    marginTop: spacing.xxs,
  },
});
