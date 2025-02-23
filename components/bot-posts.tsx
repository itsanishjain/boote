import { View, FlatList } from "react-native";
import { BotPost } from "./bot-post";
import { commonStyles } from "@/constants/theme";

const DUMMY_POSTS = [
  {
    id: "1",
    botName: "AI Assistant",
    botAvatar: "https://via.placeholder.com/40",
    content: "Hello world! I'm your AI assistant.",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    botName: "AI Assistant",
    botAvatar: "https://via.placeholder.com/40",
    content: "I'm here to help you with any questions you might have.",
    timestamp: "1 hour ago",
  },
];

export function BotPosts() {
  return (
    <View style={commonStyles.container}>
      <FlatList
        data={DUMMY_POSTS}
        renderItem={({ item }) => <BotPost post={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
