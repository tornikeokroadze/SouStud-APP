import React, { useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");
const scale = width / 320;

const normalize = (size) => {
  const newSize = size * scale;
  if (PixelRatio.get() >= 2 && PixelRatio.get() < 3) {
    return newSize - 2;
  } else if (PixelRatio.get() >= 3) {
    return newSize;
  } else {
    return newSize + 1;
  }
};

const subjects = [
  { id: "1", name: "Programilebis sawyisebi", score: 80 },
  { id: "2", name: "Algoritmebis sawyisebi", score: 90 },
  { id: "3", name: "Linux", score: 65 },
  { id: "4", name: "Linux", score: 65 },
];

const assignments = [
  { id: "1", title: "Sabakalavro Dacva", dueDate: "2024-10-15" },
  { id: "2", title: "Shualeduri Exam", dueDate: "2024-10-22" },
  { id: "3", title: "Shualeduri Exam", dueDate: "2024-10-22" },
  { id: "4", title: "Shualeduri Exam", dueDate: "2024-10-22" },
];

const notifications = [
  {
    id: "1",
    message: "Finaluris qula daido benidzen chagwrat!",
    date: "2024-10-05",
  },
  {
    id: "2",
    message: "New assignment posted for Algoritmebis sawyisebi.",
    date: "2024-10-06",
  },
  {
    id: "3",
    message: "New assignment posted for Algoritmebis sawyisebi.",
    date: "2024-10-06",
  },
  {
    id: "4",
    message: "New assignment posted for Algoritmebis sawyisebi.",
    date: "2024-10-06",
  },
  {
    id: "5",
    message: "New assignment posted for Algoritmebis sawyisebi.",
    date: "2024-10-06",
  },
  {
    id: "6",
    message: "New assignment posted for Algoritmebis sawyisebi.",
    date: "2024-10-06",
  },
  {
    id: "7",
    message: "New assignment posted for Algoritmebis sawyisebi.",
    date: "2024-10-06",
  },
  {
    id: "8",
    message: "New assignment posted for Algoritmebis sawyisebi.",
    date: "2024-10-06",
  },
  {
    id: "9",
    message: "New assignment posted for Algoritmebis sawyisebi.",
    date: "2024-10-06",
  },
  {
    id: "10",
    message: "New assignment posted for Algoritmebis sawyisebi.",
    date: "2024-10-06",
  },
  {
    id: "11",
    message: "New assignment posted for Algoritmebis sawyisebi.",
    date: "2024-10-06",
  },
];

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState({
    subjects: false,
    assignments: false,
    notifications: false,
  });

  const [showContent, setShowContent] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3200,
      useNativeDriver: true,
    }).start(() => {
      setShowContent(true);
    });
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {!showContent && (
        <View style={styles.centeredContainer}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.header}>StudApp</Text>
          </Animated.View>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {showContent && (
            <>
              <TouchableWithoutFeedback
                onPress={() =>
                  setModalVisible({ ...modalVisible, subjects: true })
                }
              >
                <LinearGradient
                  colors={["#e0f7fa", "#80deea"]}
                  style={styles.section}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.sectionTitle}>Subjects</Text>
                  {subjects.slice(-3).map((subject) => (
                    <View key={subject.id} style={styles.itemContainer}>
                      <Text style={styles.itemText}>{subject.name}</Text>
                      <Text
                        style={styles.secondaryText}
                      >{`Score: ${subject.score}`}</Text>
                    </View>
                  ))}
                </LinearGradient>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() =>
                  setModalVisible({ ...modalVisible, assignments: true })
                }
              >
                <LinearGradient
                  colors={["#ffe0b2", "#ffcc80"]}
                  style={styles.section}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.sectionTitle}>Upcoming Assignments</Text>
                  {assignments.slice(-3).map((assignment) => (
                    <View key={assignment.id} style={styles.itemContainer}>
                      <Text style={styles.itemText}>{assignment.title}</Text>
                      <Text
                        style={styles.secondaryText}
                      >{`Due: ${assignment.dueDate}`}</Text>
                    </View>
                  ))}
                </LinearGradient>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() =>
                  setModalVisible({ ...modalVisible, notifications: true })
                }
              >
                <LinearGradient
                  colors={["#f1f8e9", "#c8e6c9"]}
                  style={styles.section}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.sectionTitle}>Notifications</Text>
                  {notifications.slice(-3).map((notification) => (
                    <View key={notification.id} style={styles.itemContainer}>
                      <Text style={styles.itemText}>
                        {notification.message}
                      </Text>
                      <Text
                        style={styles.secondaryText}
                      >{`Date: ${notification.date}`}</Text>
                    </View>
                  ))}
                </LinearGradient>
              </TouchableWithoutFeedback>
            </>
          )}

          {["subjects", "assignments", "notifications"].map((type) => (
            <Modal
              key={type}
              animationType="slide"
              transparent={true}
              visible={modalVisible[type]}
              onRequestClose={() =>
                setModalVisible({ ...modalVisible, [type]: false })
              }
            >
              <View style={styles.modalContainer}>
                <View
                  style={[styles.modalContent, { maxHeight: height * 0.7 }]}
                >
                  <Text style={styles.modalSubtitle}>
                    {type === "subjects"
                      ? "Subjects and Scores"
                      : type === "assignments"
                        ? "Assignments and Due Dates"
                        : "Your Notifications"}
                  </Text>
                  <FlatList
                    data={
                      type === "subjects"
                        ? subjects
                        : type === "assignments"
                          ? assignments
                          : notifications
                    }
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View style={styles.modalItemContainer}>
                        <Text style={styles.modalItemText}>
                          {item.name || item.title || item.message}
                        </Text>
                        <Text style={styles.modalDetailText}>
                          {item.score
                            ? `Score: ${item.score}`
                            : item.dueDate
                              ? `Due: ${item.dueDate}`
                              : `Date: ${item.date}`}
                        </Text>
                      </View>
                    )}
                  />
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() =>
                      setModalVisible({ ...modalVisible, [type]: false })
                    }
                    activeOpacity={0.7}
                  >
                    <Text style={styles.closeModalText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f9",
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    padding: width * 0.06,
    justifyContent: "center",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: normalize(28),
    fontWeight: "bold",
    color: "#673ab7",
    textAlign: "center",
    marginBottom: width * 0.05,
  },
  section: {
    borderRadius: 15,

    padding: width * 0.05,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,

    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  sectionTitle: {
    fontSize: normalize(18),
    fontWeight: "bold",
    marginBottom: 10,
    color: "#673ab7",
  },

  itemContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    marginVertical: 5,
  },
  itemText: {
    fontSize: normalize(14),
    fontWeight: "bold",
  },

  secondaryText: {
    fontSize: normalize(14),
    color: "#888",
    marginTop: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: width * 0.06,
    shadowColor: "#000",

    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalSubtitle: {
    fontSize: normalize(18),
    fontWeight: "bold",
    color: "#673ab7",
    marginBottom: 10,
  },
  modalItemContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  modalItemText: {
    fontSize: normalize(14),
  },

  modalDetailText: {
    fontSize: normalize(14),
    color: "#888",
  },
  closeButton: {
    marginTop: 15,
    padding: width * 0.03,
    backgroundColor: "#673ab7",
    borderRadius: 10,
  },
  closeModalText: {
    fontSize: normalize(16),
    color: "#fff",
    textAlign: "center",
  },
});

export default HomeScreen;
