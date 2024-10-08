import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Pressable, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const Job = [
  { id: '1', company: 'Tech Corp', position: 'Software Engineer', date: '2024-10-15', status: 'Scheduled', location: 'Online', type: 'Technical', feedback: 'Looking forward to meeting you!' },
  { id: '2', company: 'InnovateX', position: 'Backend Developer', date: '2024-10-20', status: 'Pending', location: 'On-site', type: 'Behavioral', feedback: 'Prepare for a coding challenge.' },
  { id: '3', company: 'GreenTech', position: 'Frontend Developer', date: '2024-10-25', status: 'Completed', location: 'On-site', type: 'Final Interview', feedback: 'Great job! We will contact you soon.' },
];

const JobItem = ({ company, position, date, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <View style={styles.cardContent}>
      <Text style={styles.companyName}>{company}</Text>
      <Text style={styles.position}>{position}</Text>
      <View style={styles.detailsContainer}>
        <MaterialIcons name="event" size={18} color="#555" />
        <Text style={styles.date}> {date}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const JobScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [animation] = useState(new Animated.Value(0));

  const openModal = (Job) => {
    setSelectedJob(Job);
    setModalVisible(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const modalScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={Job}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobItem
            company={item.company}
            position={item.position}
            date={item.date}
            onPress={() => openModal(item)}
          />
        )}
      />

      {selectedJob && (
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalView, { transform: [{ scale: modalScale }] }]}>
              <View style={styles.modalBackground}>
                <Text style={styles.modalTitle}>{selectedJob.company}</Text>

                <View style={styles.modalSection}>
                  <MaterialIcons name="work" size={24} color="#fff" />
                  <Text style={styles.modalText}>Position: {selectedJob.position}</Text>
                </View>
                <View style={styles.modalSection}>
                  <MaterialIcons name="event" size={24} color="#fff" />
                  <Text style={styles.modalText}>Date: {selectedJob.date}</Text>
                </View>
                <View style={styles.modalSection}>
                  <MaterialIcons name="check-circle" size={24} color="#fff" />
                  <Text style={styles.modalText}>Status: {selectedJob.status}</Text>
                </View>
                <View style={styles.modalSection}>
                  <MaterialIcons name="location-on" size={24} color="#fff" />
                  <Text style={styles.modalText}>Location: {selectedJob.location}</Text>
                </View>
                <View style={styles.modalSection}>
                  <MaterialIcons name="description" size={24} color="#fff" />
                  <Text style={styles.modalText}>Type: {selectedJob.type}</Text>
                </View>
                <View style={styles.modalSection}>
                  <MaterialIcons name="feedback" size={24} color="#fff" />
                  <Text style={styles.modalText}>Feedback: {selectedJob.feedback}</Text>
                </View>

                <Pressable style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </Animated.View>
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
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardContent: {
    padding: 20,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  position: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    width: '90%',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  modalBackground: {
    backgroundColor: '#673ab7', 
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
  },
  modalSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff4757',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default JobScreen;
