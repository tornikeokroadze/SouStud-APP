import LogInScreen from "../screens/LogInScreen";
import PasswordResetScreen from "../screens/PasswordResetScreen";
import MessageScreen from "../screens/MessageScreen";
import ConfirmScreen from "../screens/ConfirmScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LogIn"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={({ navigation }) => ({
          title: "",
          headerBackVisible: false,
          gestureEnabled: true,
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate("LogIn")}>
              <Text style={{ marginRight: 15, color: "blue", fontSize: 18 }}>
                ავტორიზაცია
              </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Message"
        component={MessageScreen}
        options={({ navigation }) => ({
          title: "",
          headerBackVisible: false,
          gestureEnabled: false,
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate("LogIn")}>
              <Text style={{ marginRight: 15, color: "blue", fontSize: 18 }}>
                ავტორიზაცია
              </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Confirm"
        component={ConfirmScreen}
        options={{
          headerShown: true,
          headerBackVisible: true,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
