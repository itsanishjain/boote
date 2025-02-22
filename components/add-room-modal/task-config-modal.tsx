import React, { useState, useCallback } from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { TaskConfig, TaskFrequencyUnit } from "@/types";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadow,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  task: string | null;
  onClose: () => void;
  onSave: (task: string, config: TaskConfig) => void;
  config?: TaskConfig;
};

export default function TaskConfigModal({
  visible,
  task,
  onClose,
  onSave,
  config,
}: Props) {
  const [frequency, setFrequency] = useState(
    config?.frequency || {
      value: 1,
      unit: "weeks" as TaskFrequencyUnit,
    }
  );
  const [effort, setEffort] = useState<1 | 2 | 3>(config?.effort || 1);
  const [currentState, setCurrentState] = useState(config?.currentState || 50);
  const [slidingValue, setSlidingValue] = useState(config?.currentState || 50);

  const handleValueChange = useCallback((value: number) => {
    setSlidingValue(Math.round(value));
  }, []);

  const handleSlidingComplete = useCallback((value: number) => {
    const roundedValue = Math.round(value);
    setSlidingValue(roundedValue);
    setCurrentState(roundedValue);
  }, []);

  const handleSave = useCallback(() => {
    if (!task) return;
    onSave(task, {
      frequency,
      effort,
      currentState,
    });
  }, [task, frequency, effort, currentState, onSave]);

  if (!task) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{task}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.neutral.gray600} />
            </Pressable>
          </View>

          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Frequency</Text>
              <View style={styles.frequencyContainer}>
                <View style={styles.frequencyInput}>
                  <Picker
                    selectedValue={frequency.value}
                    onValueChange={(value) =>
                      setFrequency({ ...frequency, value: Number(value) })
                    }
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <Picker.Item
                        key={num}
                        label={num.toString()}
                        value={num}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.frequencyUnit}>
                  <Picker
                    selectedValue={frequency.unit}
                    onValueChange={(value) =>
                      setFrequency({
                        ...frequency,
                        unit: value as TaskFrequencyUnit,
                      })
                    }
                  >
                    <Picker.Item label="Days" value="days" />
                    <Picker.Item label="Weeks" value="weeks" />
                    <Picker.Item label="Months" value="months" />
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Effort</Text>
              <View style={styles.effortContainer}>
                {[1, 2, 3].map((level) => (
                  <Pressable
                    key={level}
                    style={[
                      styles.effortDot,
                      level <= effort && styles.effortDotActive,
                    ]}
                    onPress={() => setEffort(level as 1 | 2 | 3)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Current state</Text>
              <View style={styles.stateContainer}>
                <Text style={styles.stateLabel}>Dirty</Text>
                <View style={styles.sliderContainer}>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    value={currentState}
                    onValueChange={handleValueChange}
                    onSlidingComplete={handleSlidingComplete}
                    minimumTrackTintColor={colors.primary.main}
                    maximumTrackTintColor={colors.neutral.gray300}
                    thumbTintColor={colors.primary.main}
                    step={1}
                  />
                  <Text style={styles.sliderValue}>{slidingValue}%</Text>
                </View>
                <Text style={styles.stateLabel}>Clean</Text>
              </View>
            </View>
          </View>

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    alignItems: "center",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderValue: {
    ...typography.caption,
    color: colors.neutral.gray600,
    marginTop: spacing.xs,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.md,
    maxHeight: "80%",
    ...shadow.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  headerText: {
    ...typography.h3,
    color: colors.neutral.gray900,
  },
  closeButton: {
    padding: spacing.sm,
  },
  closeButtonText: {
    fontSize: 24,
    color: colors.neutral.gray600,
  },
  content: {
    gap: spacing.lg,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.body1,
    color: colors.neutral.gray900,
    fontWeight: "500",
  },
  frequencyContainer: {
    flexDirection: "row",
    gap: spacing.md,
  },
  frequencyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
    borderRadius: borderRadius.md,
    overflow: "hidden",
  },
  frequencyUnit: {
    flex: 2,
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
    borderRadius: borderRadius.md,
    overflow: "hidden",
  },
  effortContainer: {
    flexDirection: "row",
    gap: spacing.md,
  },
  effortDot: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.round,
    backgroundColor: colors.neutral.gray300,
  },
  effortDotActive: {
    backgroundColor: colors.primary.main,
  },
  stateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  stateLabel: {
    ...typography.body2,
    color: colors.neutral.gray600,
  },
  saveButton: {
    backgroundColor: colors.primary.main,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
    marginTop: spacing.lg,
    ...shadow.sm,
  },
  saveButtonText: {
    ...typography.body1,
    color: colors.neutral.white,
    fontWeight: "600",
  },
});
