import type React from "react";
import { StyleSheet, View, Dimensions, Pressable } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { colors, spacing, borderRadius } from "@/constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ACTION_BUTTON_WIDTH = 80;
const SWIPE_THRESHOLD = ACTION_BUTTON_WIDTH * 0.3;

type SwipeableCardProps = {
  onDelete?: () => void;
  children: React.ReactNode;
};

export default function SwipeableCard({
  onDelete,
  children,
}: SwipeableCardProps) {
  const translateX = useSharedValue(0);
  const isSwipeActive = useSharedValue(false);

  const handleDelete = () => {
    if (onDelete) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onDelete();
      // Reset position after delete action
      translateX.value = withSpring(0);
    }
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10]) // Prevents conflict with vertical scrolling
    .onStart(() => {
      isSwipeActive.value = true;
    })
    .onUpdate((event) => {
      const newX = Math.min(
        0,
        Math.max(-ACTION_BUTTON_WIDTH, event.translationX)
      );
      translateX.value = newX;
    })
    .onEnd((event) => {
      const velocity = event.velocityX;

      if (translateX.value < -SWIPE_THRESHOLD || velocity < -500) {
        translateX.value = withSpring(-ACTION_BUTTON_WIDTH, {
          damping: 20,
          stiffness: 200,
        });
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
      } else {
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 200,
        });
      }
      isSwipeActive.value = false;
    });

  const rContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rDeleteButtonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-ACTION_BUTTON_WIDTH, -ACTION_BUTTON_WIDTH / 2, 0],
      [1, 0.5, 0],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      translateX.value,
      [-ACTION_BUTTON_WIDTH, -ACTION_BUTTON_WIDTH / 2, 0],
      [1, 0.9, 0.8],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Animated.View style={[styles.deleteButton, rDeleteButtonStyle]}>
          <Pressable onPress={handleDelete} style={styles.deleteButtonContent}>
            <Ionicons name="trash" size={24} color="white" />
          </Pressable>
        </Animated.View>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.contentContainer, rContentStyle]}>
            {children}
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: spacing.xs,
    overflow: "hidden",
  },
  contentContainer: {
    width: "100%",
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: ACTION_BUTTON_WIDTH,
    backgroundColor: colors.status.error,
    borderRadius: borderRadius.sm,
  },
  deleteButtonContent: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
