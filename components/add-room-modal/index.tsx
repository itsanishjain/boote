import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { RoomType, TaskConfig } from "@/types";
import RoomDetailsStep from "./room-details-step";
import TaskSelectionStep from "./task-selection-step";
import TaskConfigModal from "./task-config-modal";
import { colors, typography, spacing, shadow } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

type Step = "room_details" | "task_selection";

export type AddRoomModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (
    name: string,
    type: RoomType,
    tasks: Array<{ name: string; config: TaskConfig }>
  ) => void;
};

export default function AddRoomModal({
  visible,
  onClose,
  onAdd,
}: AddRoomModalProps) {
  const [step, setStep] = useState<Step>("room_details");
  const [roomName, setRoomName] = useState("Bedroom");
  const [roomType, setRoomType] = useState<RoomType>("Bedroom");
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState<string | null>(null);
  const [configuredTasks, setConfiguredTasks] = useState<
    Map<string, TaskConfig>
  >(new Map());

  const resetState = () => {
    setStep("room_details");
    setRoomName("Bedroom");
    setRoomType("Bedroom");
    setConfiguredTasks(new Map());
    setCurrentTask(null);
    setConfigModalVisible(false);
  };

  const handleNext = () => {
    if (step === "room_details") {
      if (!roomName.trim()) {
        // Show error
        return;
      }
      setStep("task_selection");
    }
  };

  const handleTaskSelect = (task: string) => {
    setCurrentTask(task);
    setConfigModalVisible(true);
  };

  const handleTaskConfigSave = (task: string, config: TaskConfig) => {
    setConfiguredTasks(new Map(configuredTasks.set(task, config)));
    setConfigModalVisible(false);
  };

  const handleCreate = () => {
    if (configuredTasks.size === 0) {
      return;
    }

    const tasks = Array.from(configuredTasks.entries()).map(
      ([name, config]) => ({
        name,
        config,
      })
    );
    onAdd(roomName, roomType, tasks);
    resetState();
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  if (!visible) return null;

  return (
    <Animated.View entering={FadeIn} style={[styles.centeredView]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
      <Animated.View entering={SlideInDown} style={[styles.modalView]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {step === "room_details" ? "Add New Room" : "Choose Tasks"}
          </Text>
          <Pressable onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.neutral.gray600} />
          </Pressable>
        </View>

        {step === "room_details" ? (
          <RoomDetailsStep
            roomName={roomName}
            roomType={roomType}
            onNameChange={setRoomName}
            onTypeChange={setRoomType}
            onNext={handleNext}
          />
        ) : (
          <TaskSelectionStep
            roomType={roomType}
            configuredTasks={configuredTasks}
            onTaskSelect={handleTaskSelect}
            onDone={handleCreate}
          />
        )}

        <TaskConfigModal
          visible={configModalVisible}
          task={currentTask}
          onClose={() => setConfigModalVisible(false)}
          onSave={handleTaskConfigSave}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end", // Align modal to bottom
  },
  modalView: {
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray300,
    backgroundColor: colors.neutral.white,
    paddingTop: spacing.xxl,
    ...shadow.sm,
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
});
