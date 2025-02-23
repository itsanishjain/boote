import { View, FlatList, StyleSheet } from "react-native";
import { colors, spacing } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { BotCard } from "@/components/bot-card";

const DUMMY_BOTS = [
  {
    id: "1",
    name: "Code Assistant",
    avatar: "https://via.placeholder.com/50",
    description: "Your personal coding companion",
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.neutral.background.primary }}
    >
      <View style={styles.container}>
        <FlatList
          data={DUMMY_BOTS}
          renderItem={({ item }) => <BotCard bot={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background.primary,
  },
  listContainer: {
    padding: spacing.md,
  },
  separator: {
    height: spacing.md,
  },
});
