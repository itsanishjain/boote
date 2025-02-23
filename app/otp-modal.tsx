import { useCallback, useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useAlchemyAuthSession } from "@/context/AlchemyAuthSessionProvider";
import { colors, typography, spacing, borderRadius } from "@/constants/theme";
import { QUERIES } from "@/backend/queries";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function ModalScreen() {
  const [otpCode, setOtpCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { verifyUserOTP, authState, user } = useAlchemyAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (authState === "authenticated" && user?.address) {
      handleCreateUser(user.address);
    }
  }, [authState, user]);

  const handleCreateUser = async (walletAddress: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await QUERIES.user.create(walletAddress);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.data) {
        // Successfully created user, navigate to tabs
        router.push("/(tabs)");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserOtp = useCallback(async () => {
    if (otpCode.length < 6) {
      setError("Please enter a valid OTP");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await verifyUserOTP(otpCode);
      // User creation will be handled by the useEffect when authState changes
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify OTP");
      setIsLoading(false);
    }
  }, [otpCode, verifyUserOTP]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={[styles.titleText, typography.h3]}>Awesome!</Text>
        <Text style={[styles.descriptionText, typography.body1]}>
          We have sent a One-Time Password to your email address. Enter it below
          to sign-in!
        </Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={otpCode}
            onChangeText={(val) => setOtpCode(val.toLowerCase())}
            placeholder="123456"
            placeholderTextColor={colors.neutral.text.secondary}
            editable={!isLoading}
          />
          <Pressable onPress={handleUserOtp} disabled={isLoading}>
            {({ pressed }) => (
              <View
                style={[
                  styles.signInButton,
                  {
                    opacity: pressed || isLoading ? 0.5 : 1,
                    transform: [
                      {
                        scale: pressed ? 0.98 : 1,
                      },
                    ],
                  },
                ]}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.neutral.text.primary} />
                ) : (
                  <Text style={styles.signInText}>Verify OTP</Text>
                )}
              </View>
            )}
          </Pressable>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: windowWidth * 0.8,
    backgroundColor: colors.neutral.background.secondary,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },

  titleText: {
    color: colors.neutral.text.primary,
    marginBottom: spacing.xxs,
  },

  descriptionText: {
    color: colors.neutral.text.secondary,
    marginBottom: spacing.md,
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

  errorText: {
    color: colors.neutral.text.error,
    marginTop: spacing.sm,
    textAlign: "center",
    ...typography.caption,
  },
});
