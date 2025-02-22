import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RoomType } from "@/types";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadow,
} from "@/constants/theme";

type Props = {
  roomName: string;
  roomType: RoomType;
  onNameChange: (name: string) => void;
  onTypeChange: (type: RoomType) => void;
  onNext: () => void;
};

export default function RoomDetailsStep({
  roomName,
  roomType,
  onNameChange,
  onTypeChange,
  onNext,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={roomType}
            onValueChange={(value: RoomType) => {
              onTypeChange(value);
              onNameChange(value);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Custom" value="Custom" />
            <Picker.Item label="Bedroom" value="Bedroom" />
            <Picker.Item label="Child's room" value="Child's room" />
            <Picker.Item label="Bathroom" value="Bathroom" />
            <Picker.Item label="Toilet" value="Toilet" />
            <Picker.Item label="Dining room" value="Dining room" />
            <Picker.Item label="Entrance" value="Entrance" />
            <Picker.Item label="Dressing room" value="Dressing room" />
            <Picker.Item label="Kitchen" value="Kitchen" />
            <Picker.Item label="Office" value="Office" />
            <Picker.Item label="Living room" value="Living room" />
            <Picker.Item label="Laundry" value="Laundry" />
            <Picker.Item label="Garage" value="Garage" />
            <Picker.Item label="Garden" value="Garden" />
            <Picker.Item label="House" value="House" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={roomName === "Custom" ? "" : roomName}
          onChangeText={onNameChange}
          placeholder="Enter room name"
          placeholderTextColor="#9E9E9E"
        />
      </View>

      <Pressable
        style={[
          styles.nextButton,
          !roomName.trim() && styles.nextButtonDisabled,
        ]}
        onPress={onNext}
        disabled={!roomName.trim()}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.body1,
    color: colors.neutral.gray900,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...typography.body1,
    color: colors.neutral.gray900,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
    borderRadius: borderRadius.md,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  nextButton: {
    backgroundColor: colors.primary.main,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
    marginTop: spacing.lg,
    ...shadow.sm,
  },
  nextButtonDisabled: {
    backgroundColor: colors.neutral.gray300,
  },
  nextButtonText: {
    ...typography.body1,
    color: colors.neutral.white,
    fontWeight: "600",
  },
});
