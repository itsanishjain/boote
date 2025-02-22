import React from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadow,
} from "@/constants/theme";

export type SortOption =
  | "cleanliness"
  | "difficulty"
  | "frequency"
  | "alphabetical";

type SortMenuProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: SortOption) => void;
  selectedOption: SortOption;
};

export default function SortMenu({
  visible,
  onClose,
  onSelect,
  selectedOption,
}: SortMenuProps) {
  const options: { value: SortOption; label: string }[] = [
    { value: "cleanliness", label: "Cleanliness" },
    { value: "difficulty", label: "Difficulty" },
    { value: "frequency", label: "Frequency" },
    { value: "alphabetical", label: "Alphabetical" },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.menuContainer}>
          {options.map((option) => (
            <Pressable
              key={option.value}
              style={[
                styles.option,
                selectedOption === option.value && styles.selectedOption,
              ]}
              onPress={() => {
                onSelect(option.value);
                onClose();
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === option.value && styles.selectedOptionText,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 120,
    paddingRight: spacing.md,
  },
  menuContainer: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
    width: 200,
    ...shadow.lg,
  },
  option: {
    padding: spacing.md,
    borderRadius: borderRadius.sm,
  },
  selectedOption: {
    backgroundColor: colors.primary.main + "20",
  },
  optionText: {
    ...typography.body1,
    color: colors.neutral.gray900,
  },
  selectedOptionText: {
    color: colors.primary.main,
    fontWeight: "600",
  },
});
