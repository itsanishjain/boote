import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography, spacing, borderRadius } from "@/constants/theme";

interface SettingsItemProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  value?: string;
  showChevron?: boolean;
  isDestructive?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
}

export function SettingsItem({
  title,
  icon,
  onPress,
  value,
  showChevron = true,
  isDestructive = false,
  switchValue,
  onSwitchChange,
}: SettingsItemProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      android_ripple={{ color: colors.neutral.gray200 }}
    >
      <View
        style={[styles.iconContainer, isDestructive && styles.destructiveIcon]}
      >
        <Ionicons
          name={icon}
          size={24}
          color={isDestructive ? colors.status.error : colors.primary.main}
        />
      </View>
      <Text
        style={[
          styles.title,
          isDestructive && styles.destructiveText,
          typography.body1,
        ]}
      >
        {title}
      </Text>
      {value && (
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
      )}
      {showChevron && !switchValue && (
        <Ionicons
          name="chevron-forward"
          size={24}
          color={colors.neutral.text.secondary}
          style={styles.chevron}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
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
  title: {
    flex: 1,
    color: colors.neutral.text.primary,
    marginLeft: spacing.md,
  },
  destructiveText: {
    color: colors.status.error,
  },
  value: {
    ...typography.body2,
    color: colors.neutral.text.secondary,
    marginRight: spacing.sm,
  },
  chevron: {
    marginLeft: spacing.sm,
  },
});
