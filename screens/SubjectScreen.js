import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

const subjects = [
  { id: '1', name: 'Programilebis sawyisebi', lecturer: 'Dr. Nana Gulua', activeScore: 25, shualeduriScore: 20, finaluriScore: 35 },
  { id: '2', name: 'Algoritmebis sawyisebi', lecturer: 'Dr. Nana Benidze', activeScore: 30, shualeduriScore: 28, finaluriScore: 40 },
  { id: '3', name: 'Linux', lecturer: 'Dr. Beqa Toklikishvili', activeScore: 15, shualeduriScore: 12, finaluriScore: 25 },
  { id: '4', name: 'MMA', lecturer: 'Dr. Israel Adesanya', activeScore: 28, shualeduriScore: 25, finaluriScore: 38 },
  { id: '5', name: 'History', lecturer: 'Dr. Bladwin IV', activeScore: 27, shualeduriScore: 26, finaluriScore: 37 },
];

const SubjectItem = ({ name, lecturer, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Text style={styles.subjectName}>{name}</Text>
    <Text style={styles.lecturer}>Lecturer: {lecturer}</Text>
  </TouchableOpacity>
);

const SubjectsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // es modalebis gaxsna
  const openModal = (subject) => {
    setSelectedSubject(subject);
    setModalVisible(true);
  };

  // es daxurva
  const closeModal = () => {
    setModalVisible(false);
  };

  // qulebis kalkulatori
  const getGrade = (score) => {
    if (score <= 50) return 'F';
    if (score <= 61) return 'E';
    if (score <= 71) return 'D';
    if (score <= 81) return 'C';
    if (score <= 91) return 'B';
    return 'A';
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubjectItem
            name={item.name}
            lecturer={item.lecturer}
            onPress={() => openModal(item)}
          />
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

             
              <Text style={styles.grade}>
                Grade: {getGrade(selectedSubject.activeScore + selectedSubject.shualeduriScore + selectedSubject.finaluriScore)}
              </Text>

              <Button title="Close" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
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
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lecturer: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 16,
    marginBottom: 10,
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
});

export default SubjectsScreen;
