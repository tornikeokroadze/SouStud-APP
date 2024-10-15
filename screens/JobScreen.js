import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  PixelRatio,
  Dimensions,
  SafeAreaView,
  Alert,
  Linking,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Flow } from "react-native-animated-spinkit";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const { width } = Dimensions.get("window");
const scale = width / 320;

const normalize = (size) => {
  const newSize = size * scale;
  return PixelRatio.get() >= 3 ? newSize : newSize - 2;
};

const JobItem = ({ title, link }) => {
  const handleLinkPress = () => {
    Alert.alert(
      "Jobs.ge",
      "გსურთ ბმულზე გადასვლა?",
      [
        {
          text: "არა",
          style: "cancel",
        },
        {
          text: "დიახ",
          onPress: () => Linking.openURL(`https://www.jobs.ge${link}`),
        },
      ],
      { cancelable: false },
    );
  };
  return (
    <View style={styles.card}>
      <View style={styles.jobRow}>
        <Text style={styles.jobTitle}>{title}</Text>
        <View style={styles.jobTypeContainer}>
          <MaterialIcons name="location-on" size={width * 0.04} />
          <Text style={styles.jobTypeText}> თბილისი</Text>
        </View>
        <TouchableOpacity onPress={handleLinkPress}>
          <View style={styles.jobTypeContainer}>
            <MaterialIcons name="link" size={width * 0.04} />
            <Text style={styles.jobTypeText}> სრულად</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function JobScreen() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState({ id: null, label: null });
  const options = [
    { id: 20, label: "ყველა კატეგორია" },
    { id: 1, label: "ადნინისტრაცია/მენეჯმენტი" },
    { id: 1, label: "ზოგადი ტექნიკური პერსონალი" },
    { id: 2, label: "გაყიდვები" },
    { id: 3, label: "ფინანსები/სტატისტიკა" },
    { id: 4, label: "PR/მარკეტინგი" },
    { id: 5, label: "ლოგისტიკა/ტრანსპორტი/დისტრიბუცია" },
    { id: 11, label: "მშენებლობა/რემონტი" },
    { id: 16, label: "დასუფთავება" },
    { id: 17, label: "დაცვა/უსაფრთხოება" },
    { id: 6, label: "IT/პროგრამირება" },
    { id: 13, label: "მედია/გამომცემლობა" },
    { id: 12, label: "განათლება" },
    { id: 7, label: "სამართალი" },
    { id: 8, label: "მედიცინა/ფარმაცია" },
    { id: 14, label: "სილამაზე/მოდა" },
    { id: 10, label: "კვება" },
    { id: 9, label: "სხვა" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://www.jobs.ge/?page=1&q=&cid=${selectedItem.id == 20 ? "" : selectedItem.id}&lid=1`,
      );
      const html = response.data;

      const jobRegex = /<a href="([^"]+)" class="vip">(.*?)<\/a>/g;
      const jobsData = [];
      let match;

      while ((match = jobRegex.exec(html)) !== null) {
        jobsData.push({
          id: match[1],
          title: match[2],
          link: match[1],
        });
      }

      setJobs(jobsData);
      setLoading(false);
    };

    if (selectedItem.id !== null) {
      setLoading(true);
      fetchData();
    } else {
      fetchData();
    }
  }, [selectedItem.id]);

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredJobs(filtered);
  }, [searchQuery, jobs]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Flow size={48} color="#673ab7" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SectionList
          sections={[{ title: "მიმდინარე ვაკანსიები", data: filteredJobs }]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobItem title={item.title} link={item.link} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <>
              <TextInput
                style={styles.searchInput}
                placeholder="ძებნა..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Picker
                style={styles.selectStyle}
                selectedValue={selectedItem.id}
                onValueChange={(itemId) => {
                  const selectedOption = options.find(
                    (option) => option.id === itemId,
                  );
                  setSelectedItem(selectedOption);
                }}
              >
                {options.map((option) => (
                  <Picker.Item
                    key={option.id}
                    label={option.label}
                    value={option.id}
                  />
                ))}
              </Picker>
              <Text style={styles.sectionHeader}>{title}</Text>
            </>
          )}
          contentContainerStyle={{ paddingVertical: width * 0.05 }}
        />
      </View>
    </SafeAreaView>
  );
}

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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  jobTitle: {
    fontSize: normalize(16),
    fontWeight: "bold",
  },
  jobLink: {
    fontSize: normalize(16),
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: normalize(18),
    fontWeight: "bold",
    backgroundColor: "#fff",
    color: "#673ab7",
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.04,
  },
  jobTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: width * 0.05,
  },
  jobTypeText: {
    fontSize: normalize(12),
    color: "#555",
  },
  searchInput: {
    height: width * 0.1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: width * 0.03,
    marginTop: width * 0.05,
    marginHorizontal: width * 0.05,
  },
  selectStyle: {
    marginHorizontal: width * 0.03,
    color: "#646464",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
