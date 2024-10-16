import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const scale = width / 320;

function normalize(size) {
  const newSize = size * scale;
  return PixelRatio.get() >= 3 ? newSize : newSize - 2;
}

export default function JobItem({ title, link }) {
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
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: width * 0.05,
    backgroundColor: "#fff",
    padding: width * 0.05,
    marginVertical: width * 0.03,
    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    backgroundColor: "#FFFFFFFF",
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
});
