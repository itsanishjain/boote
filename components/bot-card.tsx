import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { colors, typography, spacing, commonStyles } from "@/constants/theme";
import { Link } from "expo-router";

interface BotCardProps {
  bot: {
    id: string;
    name: string;
    avatar: string;
    description: string;
  };
}

export function BotCard({ bot }: BotCardProps) {
  return (
    <Link href={{ pathname: "/bot/[id]", params: { id: bot.id } }} asChild>
      <Pressable style={styles.container}>
        <Image source={{ uri: bot.avatar }} style={styles.avatar} />
        <View style={styles.content}>
          <Text style={styles.name}>{bot.name}</Text>
          <Text style={styles.description}>{bot.description}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.card,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    ...typography.h2,
    color: colors.onSurface,
  },
  description: {
    ...typography.body2,
    color: colors.grey100,
  },
});
