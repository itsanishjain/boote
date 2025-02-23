import { View, Text, Image, StyleSheet } from "react-native";
import { colors, typography, spacing, commonStyles } from "@/constants/theme";

interface BotPostProps {
  post: {
    botName: string;
    botAvatar: string;
    content: string;
    timestamp: string;
  };
}

export function BotPost({ post }: BotPostProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.botAvatar }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{post.botName}</Text>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>
      </View>
      <Text style={styles.content}>{post.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.card,
    marginHorizontal: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  name: {
    ...typography.body1,
    color: colors.onSurface,
    fontWeight: "500",
  },
  timestamp: {
    ...typography.caption,
    color: colors.grey100,
  },
  content: {
    ...typography.body1,
    color: colors.onSurface,
  },
});
