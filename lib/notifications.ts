import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

// Configure notification handler with basic settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function initializeNotifications() {
  try {
    const token = await registerForPushNotificationsAsync();
    if (token) {
      console.log("Push Notification Token:", token);
    }

    // Set up notification handlers
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  } catch (error) {
    console.error("Failed to initialize notifications:", error);
    throw error;
  }
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      throw new Error("Permission not granted for push notifications!");
    }

    const projectId = Constants?.expoConfig?.extra?.eas?.projectId;
    if (!projectId) {
      throw new Error("Project ID not found");
    }

    try {
      const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
        .data;
      console.log("Expo push token:", token);

      // Save token to your backend
      await saveTokenToBackend(token);

      return token;
    } catch (e) {
      throw new Error(`Failed to get push token: ${e}`);
    }
  } else {
    throw new Error("Must use physical device for push notifications");
  }
}

async function saveTokenToBackend(token: string) {
  try {
    // This is a mock API call - replace with your actual API endpoint
    console.log("Saving token to backend:", token);
    await fetch("https://your-api.com/save-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        userId: "user123", // Replace with actual user ID
        platform: Platform.OS,
      }),
    });
  } catch (error) {
    console.error("Failed to save token to backend:", error);
    // Don't throw error here - we still want the token to be returned
  }
}

export async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Test notification",
    body: "This is a test notification",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
