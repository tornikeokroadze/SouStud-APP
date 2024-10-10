import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  Platform,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { icons } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authActions";

const { width } = Dimensions.get("window");

const LogInScreen = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    personal_number: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    personal_number: null,
    password: null,
  });

  const handleInputChange = (name, value) => {
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    let valid = true;
    let newErrors = { personal_number: null, password: null };

    if (credentials.personal_number.trim() === "") {
      newErrors.personal_number = "გთხოვთ, შეიყვანეთ პირადი ნომერი.";
      valid = false;
    } else if (credentials.personal_number.length !== 11) {
      newErrors.personal_number = "პირადი ნომერი უნდა იყოს 11 ციფრი.";
      valid = false;
    }

    if (credentials.password.trim() === "") {
      newErrors.password = "გთხოვთ, შეიყვანეთ პაროლი.";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      setTimeout(() => {
        setErrors({ personal_number: null, password: null });
      }, 3400);
    }

    return valid;
  };

  const handleLogin = () => {
    if (validateInputs()) {
      dispatch(login(credentials));
    }
  };

  function goToPasswordReset() {
    navigation.navigate("PasswordReset");
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardOutContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.loginContainer}>
              <View style={styles.loginInnerContainer}>
                <Image
                  source={icons.home}
                  resizeMode="contains"
                  style={styles.logo}
                />
                <Text style={styles.logoText}>StudApp-ში შესვლა</Text>
              </View>
              <CustomInput
                title="პირადი ნომერი"
                keyType="hide"
                value={credentials.personal_number}
                handleChangeText={(value) =>
                  handleInputChange("personal_number", value)
                }
                keyboardType="numeric"
                error={errors.personal_number}
              />
              {errors.personal_number && (
                <Text style={styles.errorText}>{errors.personal_number}</Text>
              )}

              <CustomInput
                title="პაროლი"
                keyType="hide"
                value={credentials.password}
                handleChangeText={(value) =>
                  handleInputChange("password", value)
                }
                keyboardType="numeric"
                error={errors.password}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <CustomButton onPress={handleLogin}>შესვლა</CustomButton>

              <View style={styles.forgotPasswordContainer}>
                <Text style={{ color: "#FFFFFF" }}>
                  დაგავიწყდათ პაროლი?{" "}
                  <Text
                    onPress={goToPasswordReset}
                    style={{ color: "#DA7B00FF" }}
                  >
                    აღდგენა
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: Platform.OS === "android" && width * 0.08,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  cardOutContainer: {
    padding: width * 0.07,
  },
  cardContainer: {
    borderRadius: 24,
    backgroundColor: "#6B44ADFF",
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
  },
  logo: {
    width: 34,
    height: 34,
  },
  logoText: {
    fontSize: 24,
    marginTop: width * 0.05,
    color: "#FFFFFF",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: width * 0.07,
  },
  loginInnerContainer: {
    marginVertical: 10,
  },
  forgotPasswordContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  errorText: {
    color: "#ff5a3c",
    marginTop: 5,
    fontSize: 14,
  },
});
