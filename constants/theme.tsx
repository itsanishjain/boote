import React from "react";
import { View, Text, Pressable } from "react-native";

// Color Palette
const colors = {
  // Primary colors - Modern violet as primary
  primary: {
    main: "#A177FF", // Bright violet - eye-catching but not harsh
    light: "#BFA3FF", // Lighter violet for hover states
    dark: "#7747FF", // Deep violet for active states
  },
  // Secondary colors - Teal accents
  secondary: {
    main: "#4ECDC4", // Vibrant teal
    light: "#61E4DC",
    dark: "#3BA89F",
  },
  // Status colors
  status: {
    success: "#00B894", // Minty green
    warning: "#FFB156", // Soft orange
    error: "#FF7675", // Coral red
    info: "#74B9FF", // Electric blue
  },
  // Dark mode specific neutrals
  neutral: {
    // Main background colors
    background: {
      primary: "#000000", // True black for OLED screens
      secondary: "#121212", // Slightly lighter for cards
      tertiary: "#1E1E1E", // For elevated surfaces
    },
    // Text and icon colors
    text: {
      primary: "#FFFFFF", // Pure white for primary text
      secondary: "rgba(255, 255, 255, 0.7)", // 70% white for secondary text
      disabled: "rgba(255, 255, 255, 0.38)", // 38% white for disabled state
      error: "#FF7675", // Coral red for error text
    },
    // Grayscale for various UI elements
    gray100: "#2C2C2C",
    gray200: "#383838",
    gray300: "#404040",
    gray400: "#585858",
    gray500: "#717171",
    gray600: "#8F8F8F",
    gray700: "#A3A3A3",
    gray800: "#CFCFCF",
    gray900: "#E8E8E8",
  },
};

// Typography - Using SF Pro inspired metrics
const typography = {
  // Display typography
  display: {
    fontSize: 40,
    fontWeight: "700" as const,
    lineHeight: 48,
    letterSpacing: -0.4,
  },
  // Headers
  h1: {
    fontSize: 32,
    fontWeight: "700" as const,
    lineHeight: 40,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 24,
    fontWeight: "600" as const,
    lineHeight: 32,
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 28,
    letterSpacing: -0.1,
  },
  h6: {
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 24,
    letterSpacing: -0.24,
  },
  // Body text
  body1: {
    fontSize: 17,
    fontWeight: "400" as const,
    lineHeight: 24,
    letterSpacing: -0.24,
  },
  body2: {
    fontSize: 15,
    fontWeight: "400" as const,
    lineHeight: 22,
    letterSpacing: -0.24,
  },
  // Supporting text
  caption: {
    fontSize: 13,
    fontWeight: "400" as const,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 24,
    letterSpacing: -0.24,
  },
};

// Spacing - Using 8-point grid system
const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border Radius - Following Apple's varying radius approach
const borderRadius = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  round: 9999,
};

// Shadows for dark mode - More subtle than light mode
const shadow = {
  sm: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

// Modern Button Component
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
          color: colors.neutral.text.primary,
        };
      case "outlined":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: disabled ? colors.neutral.gray300 : colors.primary.main,
          color: disabled ? colors.neutral.text.disabled : colors.primary.main,
        };
      case "text":
        return {
          backgroundColor: "transparent",
          color: disabled ? colors.neutral.text.disabled : colors.primary.main,
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
          paddingVertical: spacing.xxs,
          ...typography.body2,
        };
      case "md":
        return {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xs,
          ...typography.body1,
        };
      case "lg":
        return {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
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

// Card Component with dark mode styling
const Card = ({
  children,
  style,
  elevation = "md",
}: {
  children: React.ReactNode;
  style?: any;
  elevation?: "sm" | "md" | "lg";
}) => (
  <View
    style={[
      {
        backgroundColor: colors.neutral.background.secondary,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        ...shadow[elevation],
      },
      style,
    ]}
  >
    {children}
  </View>
);

export { colors, typography, spacing, borderRadius, shadow, Button, Card };
