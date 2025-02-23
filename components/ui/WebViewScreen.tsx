import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "@/constants/theme";
import { router } from "expo-router";

type WebViewScreenProps = {
  html: string;
};

export default function WebViewScreen({ html }: WebViewScreenProps) {
  return (
    <View style={styles.container}>
      {/* <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={colors.neutral.gray900} />
      </Pressable> */}
      <WebView
        style={styles.webview}
        source={{ html }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background.primary,
  },
  webview: {
    flex: 1,
    backgroundColor: colors.neutral.background.primary,
  },
  backButton: {
    position: "absolute",
    top: spacing.xxl,
    left: spacing.md,
    zIndex: 1,
    padding: spacing.sm,
    backgroundColor: colors.neutral.background.primary,
    borderRadius: 20,
    shadowColor: colors.neutral.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
