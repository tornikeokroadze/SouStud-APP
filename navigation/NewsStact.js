import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text } from "react-native";
import NewsShowScreen from "../screens/NewsShowScreen.js";
import NewsScreen from "../screens/NewsScreen";

const Stack = createNativeStackNavigator();

export default function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewsShow"
        component={NewsShowScreen}
        options={({ navigation }) => ({
          title: "",
          // headerBackVisible: false,
          gestureEnabled: true,
          // headerLeft: () => (
          //   <Pressable onPress={() => navigation.navigate("NewsScreen")}>
          //     <Text style={{ marginRight: 15, color: "blue", fontSize: 18 }}>
          //       სიახლეები
          //     </Text>
          //   </Pressable>
          // ),
        })}
      />
    </Stack.Navigator>
  );
}
