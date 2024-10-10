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
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// es daayenet npm install 'expo-linear-gradient'

const { width } = Dimensions.get("window");

const subjects = [
  { id: "1", name: "Programilebis sawyisebi", score: 80 },
  { id: "2", name: "Algoritmebis sawyisebi", score: 90 },
  { id: "3", name: "Linux", score: 65 },
];

const assignments = [
  { id: "1", title: "Sabakalavro Dacva", dueDate: "2024-10-15" },
  { id: "2", title: "Shualeduri Exam", dueDate: "2024-10-22" },
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
    // Fade out the welcome text
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3500,
      useNativeDriver: true,
    }).start(() => {
      setShowContent(true);
    });
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {!showContent && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.header}>Welcome to StudApp</Text>
          </Animated.View>
        )}

        {showContent && (
          <TouchableWithoutFeedback
            onPress={() => setModalVisible({ ...modalVisible, subjects: true })}
          >
            <LinearGradient
              colors={["#e0f7fa", "#80deea"]}
              style={styles.section}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.sectionTitle}>Subjects</Text>
              {subjects.map((subject) => (
                <View key={subject.id} style={styles.itemContainer}>
                  <Text style={styles.itemText}>{subject.name}</Text>
                  <Text style={styles.scoreText}>{subject.score}</Text>
                </View>
              ))}
            </LinearGradient>
          </TouchableWithoutFeedback>
        )}

        {showContent && (
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
              {assignments.map((assignment) => (
                <View key={assignment.id} style={styles.itemContainer}>
                  <Text style={styles.itemText}>{assignment.title}</Text>
                  <Text style={styles.dueDateText}>{assignment.dueDate}</Text>
                </View>
              ))}
            </LinearGradient>
          </TouchableWithoutFeedback>
        )}

        {showContent && (
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
              {notifications.map((notification) => (
                <View key={notification.id} style={styles.itemContainer}>
                  <Text style={styles.itemText}>{notification.message}</Text>
                  <Text style={styles.dateText}>{notification.date}</Text>
                </View>
              ))}
            </LinearGradient>
          </TouchableWithoutFeedback>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible.subjects}
          onRequestClose={() =>
            setModalVisible({ ...modalVisible, subjects: false })
          }
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalSubtitle}>Subjects and Scores</Text>
              <FlatList
                data={subjects}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text style={styles.modalItemText}>{item.name}</Text>
                    <Text style={styles.modalScoreText}>{item.score}</Text>
                  </View>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() =>
                  setModalVisible({ ...modalVisible, subjects: false })
                }
                activeOpacity={0.7}
              >
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible.assignments}
          onRequestClose={() =>
            setModalVisible({ ...modalVisible, assignments: false })
          }
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalSubtitle}>
                Assignments and Due Dates
              </Text>
              <FlatList
                data={assignments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text style={styles.modalItemText}>{item.title}</Text>
                    <Text style={styles.modalDueDateText}>{item.dueDate}</Text>
                  </View>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() =>
                  setModalVisible({ ...modalVisible, assignments: false })
                }
                activeOpacity={0.7}
              >
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible.notifications}
          onRequestClose={() =>
            setModalVisible({ ...modalVisible, notifications: false })
          }
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalSubtitle}>Your Notifications</Text>
              <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text style={styles.modalItemText}>{item.message}</Text>
                    <Text style={styles.modalDateText}>{item.date}</Text>
                  </View>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() =>
                  setModalVisible({ ...modalVisible, notifications: false })
                }
                activeOpacity={0.7}
              >
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f9",
  },
  container: {
    flex: 1,
    padding: 20,

    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#673ab7",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,

    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",

    marginBottom: 10,
    color: "#673ab7",
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
  },
  itemText: {
    fontSize: 18,
  },
  scoreText: {
    fontSize: 16,
    color: "#333",
    textAlign: "right",
    flex: 0,
  },
  dueDateText: {
    fontSize: 14,
    color: "#888",
    textAlign: "right",
  },
  dateText: {
    fontSize: 14,
    color: "#888",
    textAlign: "right",
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
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#673ab7",
    textAlign: "center",
  },
  modalItemText: {
    fontSize: 18,
    flex: 1,
  },
  modalScoreText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  modalDueDateText: {
    fontSize: 16,
    color: "#888",
    textAlign: "right",
  },
  modalDateText: {
    fontSize: 16,
    color: "#888",
    textAlign: "right",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#4fc3f7",
    borderRadius: 5,
    paddingVertical: 10,
  },
  closeModalText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
