import React from "react";
import { View, Text, Pressable } from "react-native";

// Color Palette
const colors = {
  // Primary colors
  primary: {
    main: "#4A6741", // Hampton green - sophisticated, muted green
    light: "#728468", // Lighter sage green
    dark: "#2C3E28", // Deep forest green
  },
  // Secondary colors
  secondary: {
    main: "#1B3D6D", // Deep navy blue - complementary to Hampton green
    light: "#4B6A9B",
    dark: "#0E2444",
  },
  // Status colors
  status: {
    success: "#4A6741", // Using Hampton green for success
    warning: "#FFB347", // Warmer, more playful orange
    error: "#FF6B6B", // Softer, more playful red
    info: "#4B6A9B", // Muted blue
  },
  // Neutral colors with green tints
  neutral: {
    white: "#FFFFFF",
    background: "#F0F7F0", // Light, fresh green background
    gray100: "#F5F8F5", // Subtle green tint
    gray200: "#EBF1EB",
    gray300: "#DFE5DF",
    gray400: "#C2CAC2",
    gray500: "#9EA499",
    gray600: "#767D72",
    gray700: "#5C625A",
    gray800: "#424940",
    gray900: "#2A2E28",
    black: "#1A1C19",
  },
};

// Typography
const typography = {
  h1: {
    fontSize: 32,
    fontWeight: "700" as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: "700" as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 28,
  },
  body1: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
  },
};

// Spacing
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border Radius
const borderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

// Shadow
const shadow = {
  sm: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
};

// Base Components

const Button = ({
  variant = "filled",
  size = "md",
  onPress,
  children,
  disabled = false,
}: {
  variant?: "filled" | "outlined" | "text";
  size?: "sm" | "md" | "lg";
  onPress?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "filled":
        return {
          backgroundColor: disabled
            ? colors.neutral.gray300
            : colors.primary.main,
          color: colors.neutral.white,
        };
      case "outlined":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: disabled ? colors.neutral.gray300 : colors.primary.main,
          color: disabled ? colors.neutral.gray300 : colors.primary.main,
        };
      case "text":
        return {
          backgroundColor: "transparent",
          color: disabled ? colors.neutral.gray300 : colors.primary.main,
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs,
          ...typography.body2,
        };
      case "md":
        return {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          ...typography.body1,
        };
      case "lg":
        return {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          ...typography.h3,
        };
      default:
        return {};
    }
  };

  return (
    <Pressable
      onPress={disabled ? null : onPress}
      style={[
        {
          borderRadius: borderRadius.md,
          alignItems: "center",
          justifyContent: "center",
        },
        getVariantStyles(),
        getSizeStyles(),
        shadow.sm,
      ]}
    >
      <Text style={{ color: getVariantStyles().color }}>{children}</Text>
    </Pressable>
  );
};

// Card component for room/task displays
const Card = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style: any;
}) => (
  <View
    style={[
      {
        backgroundColor: colors.neutral.white,
        borderRadius: borderRadius.sm,
        padding: spacing.md,
      },
      style,
    ]}
  >
    {children}
  </View>
);

// Progress indicator for tasks
const ProgressBar = ({ progress, style }: { progress: number; style: any }) => (
  <View
    style={[
      {
        height: 8,
        backgroundColor: colors.neutral.gray200,
        borderRadius: borderRadius.round,
        overflow: "hidden",
      },
      style,
    ]}
  >
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: colors.primary.main,
        width: `${Math.min(Math.max(progress, 0), 100)}%`,
        borderRadius: borderRadius.round,
      }}
    />
  </View>
);

export {
  colors,
  typography,
  spacing,
  borderRadius,
  shadow,
  Button,
  Card,
  ProgressBar,
};
