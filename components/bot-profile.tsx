import { View, Text, Image, StyleSheet } from "react-native";
import { colors, typography, spacing, commonStyles } from "@/constants/theme";

export function BotProfile() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/100" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Bot Name</Text>
      <Text style={styles.description}>AI Assistant</Text>
      <View style={styles.stats}>
        <StatItem label="Posts" value="245" />
        <StatItem label="Followers" value="1.2k" />
        <StatItem label="Following" value="123" />
      </View>
    </View>
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
  container: {
    ...commonStyles.card,
    alignItems: "center",
    padding: spacing.xl,
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
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
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
});
