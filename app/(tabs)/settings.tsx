import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography, spacing, borderRadius } from "@/constants/theme";
import { router } from "expo-router";
import { settings } from "@/lib/settings";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { API_URL } from "@/constants";
import { Storage } from "expo-sqlite/kv-store";
import { SafeAreaView } from "react-native-safe-area-context";

type SettingItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
  isDestructive?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
};

const SettingItem = ({
  icon,
  label,
  value,
  onPress,
  showChevron = true,
  isDestructive = false,
  switchValue,
  onSwitchChange,
}: SettingItemProps) => (
  <Pressable
    style={styles.settingItem}
    onPress={onPress}
    android_ripple={{ color: colors.neutral.gray200 }}
  >
    <View
      style={[styles.iconContainer, isDestructive && styles.destructiveIcon]}
    >
      <Ionicons
        name={icon}
        size={20}
        color={isDestructive ? colors.status.error : colors.primary.main}
      />
    </View>
    <Text
      style={[
        styles.settingLabel,
        isDestructive && styles.destructiveText,
        typography.body1,
      ]}
    >
      {label}
    </Text>
    {value && (
      <Text style={[styles.settingValue, typography.body2]}>{value}</Text>
    )}
    {switchValue !== undefined && (
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        trackColor={{
          false: colors.neutral.gray300,
          true: colors.primary.main,
        }}
        thumbColor={colors.neutral.background.secondary}
      />
    )}
    {showChevron && !switchValue && (
      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.neutral.gray400}
        style={styles.chevron}
      />
    )}
  </Pressable>
);

export default function SettingsScreen() {
  const [soundsEnabled, setSoundsEnabled] = useState(
    settings.getSoundsEnabled()
  );
  const [darkMode, setDarkMode] = useState(settings.getDarkMode());
  const [language, setLanguage] = useState(settings.getLanguage());
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    settings.getNotificationsEnabled()
  );
  const [vacationMode, setVacationMode] = useState(settings.getVacationMode());
  const [gamificationEnabled, setGamificationEnabled] = useState(
    settings.getGamificationEnabled()
  );
  const [pushToken, setPushToken] = useState<string | null>(null);

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout");
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion logic
    console.log("Delete account");
  };

  const handleNotificationToggle = async (value: boolean) => {
    // Optimistically update UI immediately
    setNotificationsEnabled(value);
    settings.setNotificationsEnabled(value);

    try {
      if (value) {
        // Request permission
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }

        if (!Device.isDevice) {
          Alert.alert(
            "Error",
            "Must use physical device for push notifications"
          );
          setNotificationsEnabled(false);
          settings.setNotificationsEnabled(false);
          return;
        }

        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          Alert.alert("Error", "Failed to get push notification permission");
          setNotificationsEnabled(false);
          settings.setNotificationsEnabled(false);
          return;
        }

        // Get push token
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId;
        if (!projectId) {
          Alert.alert("Error", "Project ID not found");
          setNotificationsEnabled(false);
          settings.setNotificationsEnabled(false);
          return;
        }

        const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
          .data;
        setPushToken(token);
        console.log("Push token:", token);

        const userData = Storage.getItemSync("userData");
        if (!userData) {
          Alert.alert("Error", "User data not found");
          setNotificationsEnabled(false);
          settings.setNotificationsEnabled(false);
          return;
        }
        const parsedUserData = JSON.parse(userData);

        // Save token to your backend
        try {
          await fetch(`${API_URL}/user`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: parsedUserData.id,
              expo_push_token: token,
              platform: Platform.OS,
            }),
          });
        } catch (error) {
          console.error("Failed to save token to backend:", error);
          // Continue anyway - we don't want to block enabling notifications
        }
      }
    } catch (error) {
      console.error("Error toggling notifications:", error);
      Alert.alert("Error", "Failed to enable notifications. Please try again.");
      setNotificationsEnabled(false);
      settings.setNotificationsEnabled(false);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.neutral.background.primary }}
    >
      <ScrollView style={styles.container}>
        <SettingItem
          icon="pencil"
          label="Edit Bot"
          onPress={() => {
            /* Navigate to bot editing */
          }}
        />
        <SettingItem
          icon="color-palette"
          label="Appearance"
          onPress={() => {
            /* Open appearance settings */
          }}
        />
        <SettingItem
          icon="notifications"
          label="Notifications"
          onPress={() => {
            /* Open notification settings */
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral.background.primary,
  },
  header: {
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.neutral.background.secondary,
  },
  title: {
    color: colors.neutral.text.primary,
  },
  section: {
    backgroundColor: colors.neutral.background.secondary,
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.neutral.gray200,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.neutral.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary.light + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  destructiveIcon: {
    backgroundColor: colors.status.error + "20",
  },
  settingLabel: {
    flex: 1,
    color: colors.neutral.text.primary,
  },
  destructiveText: {
    color: colors.status.error,
  },
  settingValue: {
    marginRight: spacing.sm,
    color: colors.neutral.text.secondary,
  },
  chevron: {
    marginLeft: spacing.sm,
  },
  version: {
    textAlign: "center",
    color: colors.neutral.text.secondary,
    marginVertical: spacing.xl,
  },
});
