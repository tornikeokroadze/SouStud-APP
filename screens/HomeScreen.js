import React from 'react';
import { View, Text, StyleSheet, FlatList, Platform, SafeAreaView } from 'react-native';

const subjects = [
  { id: '1', name: 'Programilebis sawyisebi', score: 80 },
  { id: '2', name: 'Algoritmebis sawyisebi', score: 90 },
  { id: '3', name: 'Linux', score: 65 },
];

const assignments = [
  { id: '1', title: 'Sabakalavro Dacva', dueDate: '2024-10-15' },
  { id: '2', title: 'Shualeduri Exam', dueDate: '2024-10-22' },
];

const notifications = [
  { id: '1', message: 'Finaluris qula daido benidzen chagwrat!', date: '2024-10-05' },
  { id: '2', message: 'New assignment posted for Algoritmebis sawyisebi.', date: '2024-10-06' },
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to StudApp</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subjects</Text>
        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.scoreText}>Score: {item.score}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>mosalodneli gamocdeni an rame</Text>
        <FlatList
          data={assignments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
              <Text style={styles.dueDateText}>Due: {item.dueDate}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.notificationText}>{item.message}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          )}
        />
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    marginTop: Platform.OS === 'android' && width * 0.02
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#673ab7',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  scoreText: {
    fontSize: 14,
    color: '#555',
  },
  dueDateText: {
    fontSize: 14,
    color: '#888',
  },
  notificationText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
});

export default HomeScreen;
