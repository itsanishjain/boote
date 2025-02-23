import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  Card,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

// Types
interface Post {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  reposts: number;
  timestamp: string;
}

// Mock data
const DUMMY_POSTS: Post[] = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Sarah Chen",
      username: "@sarahchen",
      avatar: "https://i.pravatar.cc/50?img=1",
    },
    content:
      "Just shipped a new feature! 🚀 Dark mode support is now live across all platforms. Let me know what you think!",
    image: "https://i.pravatar.cc/400x300",
    likes: 128,
    comments: 24,
    reposts: 12,
    timestamp: "2h ago",
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "Alex Thompson",
      username: "@alexdev",
      avatar: "https://i.pravatar.cc/50?img=2",
    },
    content:
      "TIL: The new iOS 18 APIs are absolutely game-changing for AR development. Threading has never been easier! 🧵",
    likes: 256,
    comments: 45,
    reposts: 28,
    timestamp: "4h ago",
  },
  {
    id: "3",
    user: {
      id: "u3",
      name: "Maria Garcia",
      username: "@mariacode",
      avatar: "https://i.pravatar.cc/50?img=3",
    },
    content:
      "Built my first machine learning model today! The possibilities are endless 🤖",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    likes: 342,
    comments: 56,
    reposts: 41,
    timestamp: "6h ago",
  },
  {
    id: "4",
    user: {
      id: "u4",
      name: "David Kim",
      username: "@davidk",
      avatar: "https://i.pravatar.cc/50?img=4",
    },
    content:
      "Just wrapped up an amazing coding session at the beach. Perfect way to start the day! 🏖️",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    likes: 423,
    comments: 32,
    reposts: 15,
    timestamp: "8h ago",
  },
  {
    id: "5",
    user: {
      id: "u5",
      name: "Emma Wilson",
      username: "@emmaw",
      avatar: "https://i.pravatar.cc/50?img=5",
    },
    content: "Check out my new home office setup! Productivity level: 💯",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800",
    likes: 512,
    comments: 48,
    reposts: 23,
    timestamp: "12h ago",
  },
  {
    id: "6",
    user: {
      id: "u6",
      name: "James Lee",
      username: "@jamesdev",
      avatar: "https://i.pravatar.cc/50?img=6",
    },
    content:
      "Just published my first npm package! 📦 Building tools for developers is so rewarding.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    likes: 267,
    comments: 34,
    reposts: 19,
    timestamp: "1d ago",
  },
  {
    id: "7",
    user: {
      id: "u7",
      name: "Sophie Martin",
      username: "@sophietech",
      avatar: "https://i.pravatar.cc/50?img=7",
    },
    content: "Exploring quantum computing concepts today. Mind = blown 🤯",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    likes: 445,
    comments: 62,
    reposts: 38,
    timestamp: "1d ago",
  },
  {
    id: "8",
    user: {
      id: "u8",
      name: "Lucas Brown",
      username: "@lucasb",
      avatar: "https://i.pravatar.cc/50?img=8",
    },
    content:
      "Finally solved that tricky algorithm problem! Sometimes you just need a fresh perspective 💡",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
    likes: 334,
    comments: 28,
    reposts: 14,
    timestamp: "2d ago",
  },
  {
    id: "9",
    user: {
      id: "u9",
      name: "Olivia Taylor",
      username: "@oliviadev",
      avatar: "https://i.pravatar.cc/50?img=9",
    },
    content:
      "Attended an amazing tech conference today! So many inspiring talks about AI and the future of tech.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
    likes: 567,
    comments: 73,
    reposts: 45,
    timestamp: "2d ago",
  },
  {
    id: "10",
    user: {
      id: "u10",
      name: "Ryan Clark",
      username: "@ryanc",
      avatar: "https://i.pravatar.cc/50?img=10",
    },
    content:
      "Just deployed my first blockchain project! Web3 development is fascinating 🔗",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800",
    likes: 389,
    comments: 42,
    reposts: 27,
    timestamp: "3d ago",
  },
  {
    id: "11",
    user: {
      id: "u11",
      name: "Isabella White",
      username: "@isabellaw",
      avatar: "https://i.pravatar.cc/50?img=11",
    },
    content:
      "Late night coding session with a view. City lights make the best company 🌃",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800",
    likes: 623,
    comments: 54,
    reposts: 31,
    timestamp: "3d ago",
  },
  {
    id: "12",
    user: {
      id: "u12",
      name: "Michael Zhang",
      username: "@michaelz",
      avatar: "https://i.pravatar.cc/50?img=12",
    },
    content:
      "Just launched my tech blog! Excited to share my journey in software development 📝",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
    likes: 445,
    comments: 38,
    reposts: 22,
    timestamp: "4d ago",
  },
];

// Post Action Button Component
const ActionButton = ({
  iconName,
  count,
  onPress,
  color = colors.neutral.text.secondary,
}: {
  iconName: keyof typeof Ionicons.glyphMap;
  count: number;
  onPress: () => void;
  color?: string;
}) => (
  <Pressable onPress={onPress} style={styles.actionButton}>
    <Ionicons name={iconName} size={22} color={color} />
    <Text style={[styles.actionCount, { color }]}>{count}</Text>
  </Pressable>
);

// Post Card Component
const PostCard = ({ post }: { post: Post }) => (
  <Card style={styles.postCard}>
    <View style={styles.postHeader}>
      <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{post.user.name}</Text>
        <Text style={styles.userHandle}>{post.user.username}</Text>
      </View>
      <Text style={styles.timestamp}>{post.timestamp}</Text>
    </View>

    <Text style={styles.content}>{post.content}</Text>

    {post.image && (
      <Image
        source={{ uri: post.image }}
        style={styles.postImage}
        resizeMode="cover"
      />
    )}

    <View style={styles.actions}>
      <ActionButton
        iconName="heart-outline"
        count={post.likes}
        onPress={() => {}}
        color={colors.status.error}
      />
      <ActionButton
        iconName="chatbubble-outline"
        count={post.comments}
        onPress={() => {}}
      />
      <ActionButton
        iconName="repeat-outline"
        count={post.reposts}
        onPress={() => {}}
      />
      <ActionButton iconName="share-outline" count={0} onPress={() => {}} />
    </View>
  </Card>
);

// Feed Screen
export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>

      <FlatList
        data={DUMMY_POSTS}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feedContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background.primary,
  },
  header: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.neutral.text.primary,
  },
  feedContainer: {
    padding: spacing.md,
  },
  separator: {
    height: spacing.md,
  },
  postCard: {
    padding: spacing.lg,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...typography.body1,
    color: colors.neutral.text.primary,
    fontWeight: "600",
  },
  userHandle: {
    ...typography.caption,
    color: colors.neutral.text.secondary,
  },
  timestamp: {
    ...typography.caption,
    color: colors.neutral.text.secondary,
  },
  content: {
    ...typography.body1,
    color: colors.neutral.text.primary,
    marginBottom: spacing.md,
  },
  postImage: {
    height: 200,
    width: "100%",
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.xs,
  },
  actionCount: {
    ...typography.body2,
    marginLeft: spacing.xs,
  },
});
