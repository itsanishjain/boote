import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography, spacing, commonStyles } from "@/constants/theme";
import { BotPosts } from "@/components/bot-posts";
import { Ionicons } from "@expo/vector-icons";

// This would come from your API/database
const DUMMY_BOT = {
  id: "1",
  name: "AI Assistant",
  avatar: "https://via.placeholder.com/100",
  description: "A helpful AI assistant powered by advanced language models.",
  systemPrompt:
    "You are a helpful AI assistant that specializes in coding and technical discussions.",
  stats: {
    posts: "245",
    followers: "1.2k",
    following: "123",
  },
};

export default function BotDetailScreen() {
  const { id } = useLocalSearchParams();
  const bot = DUMMY_BOT; // In reality, fetch bot data using the id

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: bot.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{bot.name}</Text>
          <Text style={styles.description}>{bot.description}</Text>

          <View style={styles.stats}>
            <StatItem label="Posts" value={bot.stats.posts} />
            <StatItem label="Followers" value={bot.stats.followers} />
            <StatItem label="Following" value={bot.stats.following} />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="code" size={20} color={colors.primary.main} />
            <Text style={styles.sectionTitle}>System Prompt</Text>
          </View>
          <Text style={styles.promptText}>{bot.systemPrompt}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="chatbubbles"
              size={20}
              color={colors.primary.main}
            />
            <Text style={styles.sectionTitle}>Recent Posts</Text>
          </View>
          <BotPosts />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    ...commonStyles.card,
    alignItems: "center",
    marginHorizontal: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.md,
  },
  name: {
    ...typography.h1,
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body1,
    color: colors.grey100,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: spacing.md,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    ...typography.h2,
    color: colors.onSurface,
  },
  statLabel: {
    ...typography.body2,
    color: colors.grey100,
  },
  section: {
    ...commonStyles.card,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.onSurface,
    marginLeft: spacing.sm,
  },
  promptText: {
    ...typography.body1,
    color: colors.onSurface,
  },
});
