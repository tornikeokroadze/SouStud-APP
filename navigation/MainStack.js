import { Flow } from "react-native-animated-spinkit";
import { StyleSheet, View, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import TabNavigation from "../navigation/TabNavigation";
import LoginStack from "../navigation/LoginStack";
import { useEffect } from "react";
import { checkToken } from "../store/authActions";
import { usePushNotifications } from "../notification/usePushNotifications";

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );
  const { newsData, loadingNews } = useSelector((state) => state.news);

  usePushNotifications(isAuthenticated);
  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Flow size={48} color="#673ab7" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Main"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={LoginStack}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
