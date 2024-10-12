import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { icons } from "../constants";
import CardContent from "../components/CardContent";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../store/authActions";

const { width, height } = Dimensions.get("window");

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeContent, setActiveContent] = useState("one");

  function logOutHandler() {
    Alert.alert(
      "გასვლა",
      "ნამდვილად გსურთ გასვლა?",
      [
        {
          text: "დიახ",
          onPress: () => dispatch(logoutUser()),
        },
        {
          text: "არა",
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.circle}></View>
        <Pressable onPress={logOutHandler}>
          <View style={styles.logOut}>
            <Image
              source={icons.exit}
              resizeMode="contain"
              style={{ width: "100%", height: "100%", tintColor: "#FFFFFF" }}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentInnerContainer}>
          <Text style={{ textAlign: "center", fontSize: width * 0.05 }}>
            {user.name}
          </Text>
          <CardContent
            label="დავალიანება"
            text="1125.00"
            textStyles={{ color: "#FF0000FF", fontWeight: "bold" }}
            otherStyles={{ marginTop: 8 }}
          />
          <CardContent label="სტატუსი" text="აქტიური" />
          <CardContent label="გრანტი" text="50%" />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoInnerContainer}>
          <Pressable
            onPress={() => setActiveContent("one")}
            style={[
              styles.contentButtonContainer,
              activeContent === "one" && { borderBottomColor: "#673ab7" },
            ]}
          >
            <Text>ჩემ შესახებ</Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveContent("two")}
            style={[
              styles.contentButtonContainer,
              activeContent === "two" && { borderBottomColor: "#673ab7" },
            ]}
          >
            <Text>ჩარიცხვის ინფორმაცია</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {activeContent === "one" ? (
              <View>
                <CardContent
                  label="პირადი ნომერი"
                  text={user.personal_number}
                  otherStyles={{ marginTop: 15 }}
                  labelStyle={{ fontSize: 14 }}
                  textStyles={{ fontSize: 14 }}
                />
                <CardContent
                  label="დაბადების თარიღი"
                  text="07.26.2000"
                  labelStyle={{ fontSize: 14 }}
                  textStyles={{ fontSize: 14 }}
                />
                <CardContent
                  label="სოციალური სტატუსი"
                  text="სოციალურად დაუცველი"
                  labelStyle={{ fontSize: 14 }}
                  textStyles={{ fontSize: 14 }}
                />
                <CardContent
                  label="Email"
                  text="vigacajigari@sou.edu.ge"
                  labelStyle={{ fontSize: 14 }}
                  textStyles={{ fontSize: 14 }}
                />
                <CardContent
                  label="მისამართი"
                  text="სადღაც ძაან შორს გადაკარგულში"
                  labelStyle={{ fontSize: 14 }}
                  textStyles={{ fontSize: 14 }}
                />
                <CardContent
                  label="მობილური"
                  text="000000000"
                  labelStyle={{ fontSize: 14 }}
                  textStyles={{ fontSize: 14 }}
                />
              </View>
            ) : (
              <View>
                <CardContent
                  label="ფაკულტეტი"
                  text="საბუნებისმეტყველო მეცნიერებათა, მათემატიკის, ტექნოლოგიებისა და ფარმაციის ფაკულტეტი"
                  otherStyles={{ marginTop: 15 }}
                  labelStyle={{ fontSize: 14 }}
                  textStyles={{ fontSize: 14 }}
                  info={true}
                />
                <CardContent
                  label="სპეციალობა"
                  text="კომპიუტერული ტექნოლოგიები"
                  labelStyle={{ fontSize: 14 }}
                  textStyles={{ fontSize: 14 }}
                  info={true}
                />
                <CardContent
                  label="ჩარიცხვის თარიღი"
                  text="16.09.2024"
                  labelStyle={{ fontSize: 14 }}
                  textStyles={{ fontSize: 14 }}
                  info={true}
                />
                <CardContent
                  label="საფეხური"
                  text="ბაკალავრიატი"
                  labelStyle={{ fontSize: 14 }}
                  textStyles={{ fontSize: 14 }}
                  info={true}
                />
                <CardContent
                  label="სემესტრი"
                  text="7"
                  labelStyle={{ fontSize: 14 }}
                  textStyles={{ fontSize: 14 }}
                  info={true}
                />
                <CardContent label="GPA" text="3.58" info={true} />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    height: height * 0.38,
    backgroundColor: "#673ab7",
    borderBottomStartRadius: width * 0.08,
    borderBottomEndRadius: width * 0.08,
    overflow: "hidden",
  },
  circle: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: "#DA7B00FF",
    position: "absolute",
    top: -width * 0.06,
    left: -width * 0.1,
  },
  logOut: {
    position: "absolute",
    width: width * 0.07,
    height: width * 0.07,
    top: width * 0.13,
    right: width * 0.05,
  },
  contentContainer: {
    bottom: height * 0.05,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 20,
    marginBottom: width * 0.1,
  },
  contentInnerContainer: {
    backgroundColor: "#FFFFFFFF",
    position: "absolute",
    width: width * 0.8,
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
  },
  infoContainer: {
    padding: width * 0.1,
    flexGrow: 1,
  },
  infoInnerContainer: {
    flexDirection: "row",
  },
  contentButtonContainer: {
    flex: 1,
    paddingBottom: width * 0.03,
    borderBottomWidth: 3,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollViewContent: {
    paddingBottom: width * 0.95,
  },
});
