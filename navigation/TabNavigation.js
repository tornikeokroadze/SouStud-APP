import { Image, StyleSheet, Dimensions } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import SubjectScreen from "../screens/SubjectScreen";
import JobScreen from "../screens/JobScreen";
import NewsStack from "./NewsStact";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { icons } from "../constants";
const { width } = Dimensions.get("window");
const Tab = createMaterialBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FFFFFF"
      inactiveColor="#FFFFFF"
      barStyle={{ backgroundColor: "#673ab7" }}
      shifting={true}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "პროფილი",
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.user}
              resizeMode="contain"
              style={[
                styles.icon,
                { tintColor: focused ? "#673ab7" : "#FFFFFF" },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Subject"
        component={SubjectScreen}
        options={{
          tabBarLabel: "საგნები",
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.book}
              resizeMode="contain"
              style={[
                styles.icon,
                { tintColor: focused ? "#673ab7" : "#FFFFFF" },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Job"
        component={JobScreen}
        options={{
          tabBarLabel: "ვაკანსიები",
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.job}
              resizeMode="contain"
              style={[
                styles.icon,
                { tintColor: focused ? "#673ab7" : "#FFFFFF" },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsStack}
        options={{
          tabBarLabel: "სიახლეები",
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.news}
              resizeMode="contain"
              style={[
                styles.icon,
                { tintColor: focused ? "#673ab7" : "#FFFFFF" },
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: width * 0.06,
    height: width * 0.06,
  },
});
