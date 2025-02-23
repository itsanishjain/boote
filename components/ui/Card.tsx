import { View, ViewStyle } from "react-native";
import { Card as CardStyles } from "@/constants/theme";

interface CardProps {
  style?: ViewStyle;
  variant?: "base" | "elevated" | "interactive";
  children: React.ReactNode;
}

export function Card({ style, variant = "base", children }: CardProps) {
  return <View style={[CardStyles[variant], style]}>{children}</View>;
}
