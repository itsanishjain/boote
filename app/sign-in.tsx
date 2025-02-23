import { useAlchemyAuthSession } from "@/context/AlchemyAuthSessionProvider";
import { AuthenticatingState } from "@/types";
import { Redirect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  StyleProp,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, typography, spacing, borderRadius } from "@/constants/theme";
import { QUERIES } from "../backend/queries";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;

export default function SignIn() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const { signInWithOTP, authState, user } = useAlchemyAuthSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSignIn = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await QUERIES.user.create(email);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.data) {
        router.replace("/(tabs)");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (authState === AuthenticatingState.AWAITING_OTP) {
      router.navigate("/otp-modal");
    }
  }, [authState]);

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  const signInDisabled = email.length < 1;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={containerStyles({ top, bottom })}>
            <View style={styles.formContainer}>
              <Text style={styles.titleText}>
                {`Welcome! \nEnter Your Email to Sign In.`}
              </Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={(val) => setEmail(val.toLowerCase())}
                  placeholder="john@doe.com"
                  placeholderTextColor={colors.neutral.text.secondary}
                />
                <Pressable onPress={onSignIn} disabled={signInDisabled}>
                  {({ pressed }) => (
                    <View
                      style={[
                        styles.signInButton,
                        {
                          opacity: pressed || signInDisabled ? 0.5 : 1,
                          transform: [
                            {
                              scale: pressed ? 0.98 : 1,
                            },
                          ],
                        },
                      ]}
                    >
                      <Text style={[styles.signInText]}>Sign In</Text>
                    </View>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        )}

        {error && (
          <Text style={{ color: "red", textAlign: "center", marginTop: 16 }}>
            {error}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

interface StyleProps {
  top: number;
  bottom: number;
}
const containerStyles = ({
  top,
  bottom,
}: StyleProps): StyleProp<ViewStyle> => ({
  paddingTop: top + spacing.lg,
  paddingBottom: bottom,
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  backgroundColor: colors.neutral.background.primary,
});

const styles = StyleSheet.create({
  formContainer: {
    width: windowWidth * 0.8,
    backgroundColor: colors.neutral.background.secondary,
    borderRadius: borderRadius.xl,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },

  titleText: {
    ...typography.h2,
    color: colors.neutral.text.primary,
  },

  textInputContainer: {
    marginTop: spacing.md,
    width: "100%",
  },

  textInput: {
    width: "100%",
    height: 40,
    borderColor: colors.neutral.gray300,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.neutral.background.tertiary,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.lg,
    color: colors.neutral.text.primary,
    ...typography.body1,
  },

  signInButton: {
    width: "100%",
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary.main,
  },

  signInText: {
    color: colors.neutral.text.primary,
    ...typography.subtitle1,
  },
});
