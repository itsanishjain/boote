import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TaskConfig, RoomType } from "@/types";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadow,
} from "@/constants/theme";
import { PREFERRED_TASKS } from "@/lib/preferred-tasks";

type Props = {
  roomType: RoomType;
  configuredTasks: Map<string, TaskConfig>;
  onTaskSelect: (task: string) => void;
  onDone: () => void;
};

export default function TaskSelectionStep({
  roomType,
  configuredTasks,
  onTaskSelect,
  onDone,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Now choose the chores that you want to add. You will be able to add
        other tasks later! {roomType}
      </Text>

      <ScrollView
        style={styles.taskList}
        contentContainerStyle={styles.taskListContent}
      >
        {PREFERRED_TASKS[roomType].map((task) => (
          <Pressable
            key={task}
            style={styles.taskItem}
            onPress={() => onTaskSelect(task)}
          >
            <View style={styles.checkboxContainer}>
              <View
                style={[
                  styles.checkbox,
                  configuredTasks.has(task) && styles.checkboxChecked,
                ]}
              >
                {configuredTasks.has(task) && (
                  <Ionicons name="checkmark" size={18} color="#fff" />
                )}
              </View>
            </View>
            <Text style={styles.taskText}>{task}</Text>
            <Ionicons
              name="ellipsis-horizontal"
              size={20}
              color="#9E9E9E"
              style={styles.taskConfig}
            />
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        style={[
          styles.createButton,
          configuredTasks.size === 0 && styles.createButtonDisabled,
        ]}
        onPress={onDone}
        disabled={configuredTasks.size === 0}
      >
        <Text style={styles.createButtonText}>Create</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  subtitle: {
    ...typography.body2,
    color: colors.neutral.gray600,
    marginBottom: spacing.lg,
    lineHeight: 20,
    padding: spacing.md,
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    padding: spacing.md,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray300,
  },
  checkboxContainer: {
    marginRight: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.neutral.gray300,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  taskText: {
    flex: 1,
    ...typography.body1,
    color: colors.neutral.gray900,
  },
  taskConfig: {
    padding: spacing.sm,
  },
  createButton: {
    backgroundColor: colors.primary.main,
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
    ...shadow.sm,
  },
  createButtonDisabled: {
    backgroundColor: colors.neutral.gray300,
  },
  createButtonText: {
    ...typography.body1,
    color: colors.neutral.white,
    fontWeight: "600",
  },
});
