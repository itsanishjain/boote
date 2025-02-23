import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography, spacing, commonStyles } from "@/constants/theme";
import { useAlchemyAuthSession } from "@/context/AlchemyAuthSessionProvider";
import { BotCard } from "@/components/bot-card";

// Dummy data - this would come from your backend
const DUMMY_BOTS = [
  {
    id: "1",
    name: "Code Assistant",
    avatar: "https://via.placeholder.com/50",
    description: "Your personal coding companion",
    address: "0x1234...5678",
  },
  {
    id: "2",
    name: "Task Manager",
    avatar: "https://via.placeholder.com/50",
    description: "Helps organize your workflow",
    address: "0x8765...4321",
  },
];

export default function HomeScreen() {
  const { lightAccountClient, user } = useAlchemyAuthSession();
  const account = lightAccountClient?.account;

  if (!user) return null;

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.accountInfo}>
            <Text style={styles.accountLabel}>Smart Account</Text>
            <Text style={styles.accountAddress} numberOfLines={1}>
              {account?.address || "Loading..."}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Bots</Text>
          <Text style={styles.sectionSubtitle}>
            Each bot has its own smart account for autonomous operations
          </Text>
        </View>

        <FlatList
          data={DUMMY_BOTS}
          renderItem={({ item }) => <BotCard bot={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.botList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  greeting: {
    ...typography.body2,
    color: colors.grey100,
  },
  userEmail: {
    ...typography.h2,
    color: colors.onSurface,
    marginTop: spacing.xs,
  },
  accountInfo: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  accountLabel: {
    ...typography.caption,
    color: colors.primary.main,
  },
  accountAddress: {
    ...typography.body2,
    color: colors.onSurface,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.onSurface,
  },
  sectionSubtitle: {
    ...typography.body2,
    color: colors.grey100,
    marginTop: spacing.xs,
  },
  botList: {
    padding: spacing.md,
  },
  separator: {
    height: spacing.md,
  },
});
