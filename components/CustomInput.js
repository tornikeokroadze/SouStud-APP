import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const { width, height } = Dimensions.get("window");

export default function CustomInput({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  keyType,
  maxLength,
  customInputStyle,
  error,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused ? styles.inputContainerFocused : {},
          error ? styles.inputContainerError : {},
        ]}
      >
        <TextInput
          maxLength={maxLength}
          style={[styles.input, customInputStyle]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#9999a4"
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          secureTextEntry={keyType === "hide" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {keyType === "hide" && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeCrossed}
              style={styles.icon}
              resizeMode="contain"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: height * 0.013,
  },
  title: {
    fontSize: 16,
    marginBottom: width * 0.01,
    color: "#FFFFFF",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: "#8262B9FF",
    width: "100%",
    height: height * 0.07,
    paddingHorizontal: width * 0.03,
    borderRadius: 24,
    alignItems: "center",
    flexDirection: "row",
  },
  inputContainerFocused: {
    borderColor: "#FF9001",
  },
  inputContainerError: {
    borderColor: "#ff5132",
  },
  input: {
    fontSize: 16,
    flex: 1,
    color: "#FFFFFF",
  },
  icon: {
    tintColor: "#FFFFFFFF",
    width: width * 0.06,
    height: width * 0.06,
  },
});
