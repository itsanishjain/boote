import { View, FlatList } from "react-native";
import { commonStyles } from "@/constants/theme";
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
    <SafeAreaView style={commonStyles.safeArea}>
      <FlatList
        data={DUMMY_BOTS}
        renderItem={({ item }) => <BotCard bot={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
