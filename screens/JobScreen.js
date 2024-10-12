import React, { useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  PixelRatio,
  Dimensions,
  SafeAreaView,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const jobs = [
  {
    title: "Current Openings",
    data: [
      {
        id: "1",
        title: "Software Engineer",
        company: "Xinklis Saxli",
        location: "Zugdidi, Samegrelo",
        salary: "$60k - $80k",
        type: "Full-time",
      },
      {
        id: "2",
        title: "Frontend Developer",
        company: "Beer Estrella",
        location: "Akhalkhalakhi, Georgia",
        salary: "$40k - $60k",
        type: "Part-time",
      },
      {
        id: "3",
        title: "Backend Developer",
        company: "NB Generals",
        location: "Vani, Georgia",
        salary: "$50k - $70k",
        type: "Remote",
      },
      {
        id: "4",
        title: "Backend Developer",
        company: "Google",
        location: "los angeles, USA",
        salary: "$90k - $100k",
        type: "Remote",
      },
      {
        id: "5",
        title: "Backend Developer",
        company: "Twittler",
        location: "ohaio, USA",
        salary: "$110k - $170k",
        type: "Remote",
      },
    ],
  },
];

const { width } = Dimensions.get("window");
const scale = width / 320;

const normalize = (size) => {
  const newSize = size * scale;
  return PixelRatio.get() >= 3 ? newSize : newSize - 2;
};

const JobItem = ({ title, company, location, salary, type, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <View style={styles.jobRow}>
      <View>
        <Text style={styles.jobTitle}>{title}</Text>
        <Text style={styles.companyName}>{company}</Text>
        <Text style={styles.location}>
          <MaterialIcons name="location-on" size={16} /> {location}
        </Text>
        <Text style={styles.salary}>
          <MaterialIcons name="attach-money" size={16} /> {salary}
        </Text>
        <Text style={styles.jobType}>
          <MaterialIcons name="work" size={16} /> {type}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const JobScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const openModal = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SectionList
          sections={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobItem
              title={item.title}
              company={item.company}
              location={item.location}
              salary={item.salary}
              type={item.type}
              onPress={() => openModal(item)}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          contentContainerStyle={{ paddingVertical: width * 0.05 }}
        />

        {selectedJob && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{selectedJob.title}</Text>
                <Text style={styles.companyName}>{selectedJob.company}</Text>
                <View style={styles.modalDetails}>
                  <Text style={styles.location}>
                    <MaterialIcons name="location-on" size={16} />{" "}
                    {selectedJob.location}
                  </Text>
                  <Text style={styles.salary}>
                    <MaterialIcons name="attach-money" size={16} />{" "}
                    {selectedJob.salary}
                  </Text>
                  <Text style={styles.jobType}>
                    <MaterialIcons name="work" size={16} /> {selectedJob.type}
                  </Text>
                </View>
                <Text style={styles.modalDescription}>
                  Samsaxuri gamoagzavnet aplikacia aq da chven gipasuxebt
                  aucileblad
                </Text>
                <TouchableOpacity style={styles.applyButton}>
                  <Text style={styles.applyButtonText}>Apply Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                >
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

    backgroundColor: "#fff",
  },
  card: {
    marginHorizontal: width * 0.05,
    backgroundColor: "#fff",
    padding: width * 0.05,
    marginVertical: width * 0.03,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  jobRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobTitle: {
    fontSize: normalize(16),
    fontWeight: "bold",
  },
  companyName: {
    fontSize: normalize(14),
    color: "#555",
    marginTop: 5,
  },
  location: {
    fontSize: normalize(12),
    color: "#555",
    marginTop: 5,
  },
  salary: {
    fontSize: normalize(12),
    color: "#555",
    marginTop: 5,
  },
  jobType: {
    fontSize: normalize(12),
    color: "#555",
    marginTop: 5,
  },
  sectionHeader: {
    fontSize: normalize(18),
    fontWeight: "bold",
    backgroundColor: "#fff",
    color: "#673ab7",
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.04,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#ffffff",

    borderRadius: 15,
    padding: width * 0.06,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: normalize(20),
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalDetails: {
    marginBottom: 15,
    alignItems: "flex-start",
  },

  modalDescription: {
    fontSize: normalize(14),
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
  },
  applyButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#673ab7",
    borderRadius: 5,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: normalize(16),
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#e53935",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: normalize(16),
    fontWeight: "bold",
  },
});

export default JobScreen;
