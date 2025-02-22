import React, { useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  withDelay,
  runOnJS,
  useSharedValue,
  interpolate,
  Extrapolate,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type CoinAnimationProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay?: number;
  onAnimationComplete: () => void;
};

const CoinAnimation = ({
  startX,
  startY,
  endX,
  endY,
  delay = 0,
  onAnimationComplete,
}: CoinAnimationProps) => {
  const translateX = useSharedValue(startX);
  const translateY = useSharedValue(startY);
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    // Calculate a gentler arc that stays on screen
    const distance = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    );
    const arcHeight = Math.min(distance * 0.3, 100); // Proportional to distance but capped

    // Control points for a smoother path
    const midX = startX + (endX - startX) * 0.5;
    const midY = startY + (endY - startY) * 0.3 - arcHeight; // Gentler arc

    const duration = 800; // Slightly faster for more snappy feel

    // Immediate start without setTimeout
    // Path animation
    translateX.value = withTiming(endX, {
      duration: duration,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    translateY.value = withTiming(endY, {
      duration: duration,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // Continuous rotation
    rotate.value = withTiming(360 * 2, {
      duration: duration,
      easing: Easing.linear,
    });

    // Scale animation for emphasis
    scale.value = withSequence(
      withSpring(1.2, { damping: 12, stiffness: 100 }), // Initial pop
      withTiming(1, { duration: duration * 0.5 }), // Normal size during flight
      withTiming(0.8, { duration: duration * 0.3 }), // Shrink slightly before impact
      withTiming(
        0,
        {
          // Final fade out
          duration: duration * 0.2,
          easing: Easing.out(Easing.quad),
        },
        (finished) => {
          if (finished) {
            runOnJS(onAnimationComplete)();
          }
        }
      )
    );
  }, [startX, startY, endX, endY]);

  const animatedStyle = useAnimatedStyle(() => {
    // Calculate current position in the arc
    const progress = interpolate(
      translateX.value,
      [startX, endX],
      [0, 1],
      Extrapolate.CLAMP
    );

    // Add a smooth arc to the path
    const arcOffset = Math.sin(progress * Math.PI) * 60; // Smooth arc height

    return {
      position: "absolute",
      left: -12,
      top: -12,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value - arcOffset }, // Apply arc offset
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
      ],
      opacity: scale.value, // Tie opacity to scale for smooth fade
      zIndex: 1000,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name="star" size={24} color={colors.status.warning} />
    </Animated.View>
  );
};

export default CoinAnimation;
