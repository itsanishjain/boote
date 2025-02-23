import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography, spacing } from "@/constants/theme";

interface SettingsItemProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export function SettingsItem({ title, icon, onPress }: SettingsItemProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      android_ripple={{ color: colors.grey800 }}
    >
      <Ionicons name={icon} size={24} color={colors.primary.main} />
      <Text style={styles.title}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color={colors.grey100} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey800,
  },
  title: {
    ...typography.body1,
    color: colors.onSurface,
    flex: 1,
    marginLeft: spacing.md,
  },
});
