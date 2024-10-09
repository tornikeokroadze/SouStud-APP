import React, { useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, Modal, Button, Platform, Dimensions, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const sections = [
  {
    title: 'Current Semester',
    data: [
      { id: '1', name: 'Programilebis sawyisebi', lecturer: 'Dr. Nana Gulua', activeScore: 25, shualeduriScore: 20, finaluriScore: 35 },
      { id: '2', name: 'Algoritmebis sawyisebi', lecturer: 'Dr. Nana Benidze', activeScore: 30, shualeduriScore: 28, finaluriScore: 40 },
      { id: '3', name: 'Linux', lecturer: 'Dr. Beqa Toklikishvili', activeScore: 15, shualeduriScore: 12, finaluriScore: 25 },
      { id: '4', name: 'MMA', lecturer: 'Dr. Israel Adesanya', activeScore: 28, shualeduriScore: 25, finaluriScore: 38 },
      { id: '5', name: 'History', lecturer: 'Dr. Bladwin IV', activeScore: 27, shualeduriScore: 26, finaluriScore: 37 },
    ],
  },
  {
    title: 'Last Semester',
    data: [
      { id: '6', name: 'Biznesis sawyisebi', lecturer: 'Dr. Sofia shengelia', activeScore: 26, shualeduriScore: 21, finaluriScore: 36 },
      { id: '7', name: 'C++', lecturer: 'Dr. Nana Benidze', activeScore: 2, shualeduriScore: 1, finaluriScore: 1 },
      { id: '8', name: 'Java', lecturer: 'Dr. Giorgi Vanishvili', activeScore: 30, shualeduriScore: 30, finaluriScore: 40 },
      { id: '9', name: 'Javascript', lecturer: 'Dr. Nugzar Kereselidze', activeScore: 12, shualeduriScore: 12, finaluriScore: 35 },
      { id: '10', name: 'Software Engineering', lecturer: 'Dr. Beqa Toklikishvili', activeScore: 27, shualeduriScore: 25, finaluriScore: 37 },
      { id: '11', name: 'Python', lecturer: 'Dr. Lali Beselia', activeScore: 27, shualeduriScore: 25, finaluriScore: 37 },
      { id: '12', name: 'Diskretuli ragaca', lecturer: 'Dr. Nestan Kekelia', activeScore: 27, shualeduriScore: 25, finaluriScore: 35 },
      { id: '13', name: 'HTML', lecturer: 'Dr. Nugzar Kereselidze', activeScore: 27, shualeduriScore: 25, finaluriScore: 19 },
    ],
  },
];

const { width } = Dimensions.get('window');

const SubjectItem = ({ name, lecturer, totalScore, onPress, passed }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <View style={styles.subjectRow}>
      <View>
        <Text style={styles.subjectName}>{name}</Text>
        <Text style={styles.lecturer}>Lecturer: {lecturer}</Text>
      </View>
      {passed !== null && (
        <MaterialIcons
          name={passed ? "check-circle" : "cancel"}
          size={24}
          color={passed ? "green" : "red"}
        />
      )}
    </View>
  </TouchableOpacity>
);

const SubjectsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const openModal = (subject) => {
    setSelectedSubject(subject);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getGrade = (score) => {
    if (score <= 50) return 'F';
    if (score <= 61) return 'E';
    if (score <= 71) return 'D';
    if (score <= 81) return 'C';
    if (score <= 91) return 'B';
    return 'A';
  };

  const isPassed = (active, shualeduri, final) => {
    const totalScore = active + shualeduri + final;
    if (final < 20) return false;
    return totalScore >= 50;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <View style={styles.container}>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubjectItem
              name={item.name}
              lecturer={item.lecturer}
              totalScore={item.activeScore + item.shualeduriScore + item.finaluriScore}
              onPress={() => openModal(item)}
              passed={sections[1].data.includes(item) ? isPassed(item.activeScore, item.shualeduriScore, item.finaluriScore) : null}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />

        {selectedSubject && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{selectedSubject.name}</Text>

                <Text style={styles.scoreText}>Active Score: {selectedSubject.activeScore}/30</Text>
                <Text style={styles.scoreText}>Shualeduri Score: {selectedSubject.shualeduriScore}/30</Text>
                <Text style={styles.scoreText}>Finaluri Score: {selectedSubject.finaluriScore}/40</Text>

                <Text style={styles.totalScore}>
                  Total: {selectedSubject.activeScore + selectedSubject.shualeduriScore + selectedSubject.finaluriScore}/100
                </Text>

                <Text style={[styles.grade, { color: isPassed(selectedSubject.activeScore, selectedSubject.shualeduriScore, selectedSubject.finaluriScore) ? '#28A745' : 'red' }]}>
                  Grade: {getGrade(selectedSubject.activeScore + selectedSubject.shualeduriScore + selectedSubject.finaluriScore)}
                </Text>

                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: Platform.OS === 'android' && width * 0.03,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lecturer: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  scoreText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  totalScore: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#007BFF',
  },
  grade: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#28A745',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubjectsScreen;
