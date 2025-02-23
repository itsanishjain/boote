import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Switch,
  ScrollView,
  Dimensions,
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

interface BotSettings {
  likePosts: boolean;
  followOthers: boolean;
  generateImages: boolean;
}

const ProfileHeader = () => (
  <View style={styles.headerContainer}>
    <View style={styles.coverImage} />
    <View style={styles.avatarContainer}>
      <Image
        source={{ uri: "https://avatar.iran.liara.run/public" }}
        style={styles.avatar}
      />
      <View style={styles.editAvatarButton}>
        <Ionicons name="camera" size={18} color={colors.neutral.text.primary} />
      </View>
    </View>
    <View style={styles.profileInfo}>
      <Text style={styles.name}>AI Assistant</Text>
      <Text style={styles.username}>@ai_assistant</Text>
      <Text style={styles.bio}>
        🤖 AI-powered social companion | Creating engaging content | Available
        24/7
      </Text>
    </View>
  </View>
);

const StatsCard = () => (
  <Card style={styles.statsCard}>
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>245</Text>
        <Text style={styles.statLabel}>Posts</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statValue}>1.2k</Text>
        <Text style={styles.statLabel}>Followers</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statValue}>123</Text>
        <Text style={styles.statLabel}>Following</Text>
      </View>
    </View>
  </Card>
);

const SettingItem = ({
  icon,
  label,
  value,
  onToggle,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: boolean;
  onToggle: () => void;
}) => (
  <View style={styles.settingItem}>
    <View style={styles.settingLeft}>
      <View style={styles.settingIconContainer}>
        <Ionicons name={icon} size={20} color={colors.primary.main} />
      </View>
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{
        false: colors.neutral.gray300,
        true: colors.primary.light,
      }}
      thumbColor={value ? colors.primary.main : colors.neutral.gray600}
    />
  </View>
);

export default function ProfileScreen() {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [settings, setSettings] = useState<BotSettings>({
    likePosts: false,
    followOthers: false,
    generateImages: false,
  });

  const toggleSetting = (setting: keyof BotSettings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <StatsCard />

        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="code" size={20} color={colors.primary.main} />
            </View>
            <Text style={styles.sectionTitle}>System Prompt</Text>
          </View>
          <TextInput
            style={styles.promptInput}
            multiline
            placeholder="Enter your bot's system prompt..."
            placeholderTextColor={colors.neutral.text.secondary}
            value={systemPrompt}
            onChangeText={setSystemPrompt}
            cursorColor={colors.primary.main}
          />
        </Card>

        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="settings" size={20} color={colors.primary.main} />
            </View>
            <Text style={styles.sectionTitle}>Bot Settings</Text>
          </View>

          <SettingItem
            icon="heart"
            label="Like Other Posts"
            value={settings.likePosts}
            onToggle={() => toggleSetting("likePosts")}
          />
          <SettingItem
            icon="people"
            label="Follow Others"
            value={settings.followOthers}
            onToggle={() => toggleSetting("followOthers")}
          />
          <SettingItem
            icon="image"
            label="Generate Images"
            value={settings.generateImages}
            onToggle={() => toggleSetting("generateImages")}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.background.primary,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: spacing.lg,
  },
  coverImage: {
    height: 150,
    backgroundColor: colors.primary.dark,
    opacity: 0.8,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.neutral.background.primary,
  },
  editAvatarButton: {
    position: "absolute",
    right: Dimensions.get("window").width / 2 - 60,
    bottom: 0,
    backgroundColor: colors.primary.main,
    padding: spacing.xs,
    borderRadius: borderRadius.round,
  },
  profileInfo: {
    alignItems: "center",
    padding: spacing.md,
  },
  name: {
    ...typography.h2,
    color: colors.neutral.text.primary,
    marginBottom: spacing.xxs,
  },
  username: {
    ...typography.body2,
    color: colors.neutral.text.secondary,
    marginBottom: spacing.sm,
  },
  bio: {
    ...typography.body2,
    color: colors.neutral.text.secondary,
    textAlign: "center",
    paddingHorizontal: spacing.xl,
  },
  statsCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: "60%",
    backgroundColor: colors.neutral.gray300,
  },
  statValue: {
    ...typography.h3,
    color: colors.neutral.text.primary,
    fontWeight: "700",
  },
  statLabel: {
    ...typography.caption,
    color: colors.neutral.text.secondary,
    marginTop: spacing.xxs,
  },
  section: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  iconContainer: {
    backgroundColor: colors.neutral.background.secondary,
    padding: spacing.sm,
    borderRadius: borderRadius.round,
    marginRight: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.neutral.text.primary,
  },
  promptInput: {
    color: colors.neutral.text.primary,
    backgroundColor: colors.neutral.background.secondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    minHeight: 120,
    textAlignVertical: "top",
    ...typography.body1,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIconContainer: {
    backgroundColor: colors.neutral.background.secondary,
    padding: spacing.sm,
    borderRadius: borderRadius.round,
    marginRight: spacing.sm,
  },
  settingLabel: {
    ...typography.body1,
    color: colors.neutral.text.primary,
  },
});
