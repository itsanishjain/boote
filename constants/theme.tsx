// theme.tsx
import { StyleSheet } from "react-native";

// Color palette
export const colors = {
  // Dark theme colors
  background: "#121212",
  surface: "#1E1E1E",
  primary: {
    main: "#BB86FC",
    light: "#E9B8FE",
    dark: "#985EF7",
  },
  secondary: {
    main: "#03DAC6",
    light: "#64FFDA",
    dark: "#00B3A6",
  },
  status: {
    error: "#CF6679",
    warning: "#FFAB40",
    success: "#00C853",
  },
  neutral: {
    white: "#FFFFFF",
    gray100: "#F5F5F5",
    gray200: "#EEEEEE",
    gray300: "#E0E0E0",
    gray400: "#BDBDBD",
    gray500: "#9E9E9E",
    gray600: "#757575",
    gray700: "#616161",
    gray800: "#424242",
    gray900: "#212121",
    background: "#121212",
  },
  onBackground: "#FFFFFF",
  onSurface: "#FFFFFF",
  onPrimary: "#000000",
  onSecondary: "#000000",
  // Additional colors
  grey100: "#F5F5F5",
  grey800: "#424242",
  overlay: "rgba(0, 0, 0, 0.5)",
};

// Border radius
export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

// Shadow styles
export const shadow = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
};

// Typography
export const typography = {
  h1: {
    fontFamily: "SpaceMono",
    fontSize: 32,
    fontWeight: "700" as const,
    letterSpacing: 0.25,
  },
  h2: {
    fontFamily: "SpaceMono",
    fontSize: 24,
    fontWeight: "700" as const,
    letterSpacing: 0,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 28,
    fontFamily: "monospace",
  },
  body1: {
    fontFamily: "SpaceMono",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  body2: {
    fontFamily: "SpaceMono",
    fontSize: 14,
    letterSpacing: 0.25,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
    fontFamily: "monospace",
  },
  button: {
    fontFamily: "SpaceMono",
    fontSize: 14,
    fontWeight: "500" as const,
    letterSpacing: 1.25,
    textTransform: "uppercase" as const,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const theme = {
  typography,
  spacing,
  colors,
};

// Common styles
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.sm,
  },
  heading: {
    ...typography.h1,
    color: colors.onBackground,
    marginBottom: spacing.sm,
  },
  subheading: {
    ...typography.h2,
    color: colors.onBackground,
    marginBottom: spacing.sm,
  },
  bodyText: {
    ...typography.body1,
    color: colors.onBackground,
  },
  buttonText: {
    ...typography.button,
    color: colors.onPrimary,
  },
});

// Card component styles
export const Card = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.grey800,
  },
  elevated: {
    ...shadow.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  interactive: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.grey800,
    // Add pressed state styles
    pressable: {
      opacity: 0.7,
    },
  },
});

// Fix the tabBar color reference
export const tabBarTheme = {
  activeTintColor: colors.primary.main, // Use the main color from the primary object
  inactiveTintColor: colors.grey100,
  backgroundColor: colors.surface,
};
