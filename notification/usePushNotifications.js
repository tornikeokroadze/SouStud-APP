import * as Notifications from "expo-notifications";
import { Platform, Alert } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const projectId = "fb9d8862-41af-498f-8f85-b606fa5e6be1";

export function usePushNotifications(isAuthenticated) {
  useEffect(() => {
    let subscription = null;

    const registerForPushNotificationsAsync = async () => {
      try {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          Alert.alert(
            "Error",
            "Failed to get push token for push notifications!",
          );
          return;
        }

        const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
          .data;
        if (isAuthenticated) {
          await sendTokenToBackend(token);
        }

        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }
      } catch (error) {
        console.error("Error during notification registration:", error);
      }
    };

    registerForPushNotificationsAsync();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    subscription = Notifications.addNotificationReceivedListener();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isAuthenticated]);
}

const sendTokenToBackend = async (expoToken) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      console.error("No Bearer token found.");
      return;
    }

    const response = await axios.post(
      "https://mole-adjusted-owl.ngrok-free.app/api/store-token",
      { token: expoToken },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("Token sent successfully:", response.data);
  } catch (error) {
    console.error(
      "Error storing token:",
      error.response ? error.response.data : error.message,
    );
  }
};
