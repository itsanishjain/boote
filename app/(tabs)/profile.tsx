import { View, ScrollView } from "react-native";
import { commonStyles } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { BotProfile } from "@/components/bot-profile";
import { BotPosts } from "@/components/bot-posts";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView>
        <BotProfile />
        <BotPosts />
      </ScrollView>
    </SafeAreaView>
  );
}
