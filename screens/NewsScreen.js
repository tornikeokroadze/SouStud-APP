import { Flow } from "react-native-animated-spinkit";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Dimensions,
  Text,
  SectionList,
  PixelRatio,
} from "react-native";
import NewsCard from "../components/NewsCard";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { news } from "../store/newsAction";
import { FlatList } from "react-native";

const { width } = Dimensions.get("window");

const scale = width / 320;

const normalize = (size) => {
  const newSize = size * scale;
  return PixelRatio.get() >= 3 ? newSize : newSize - 2;
};

const truncateText = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

export default function NewsScreen({ navigation }) {
  const dispatch = useDispatch();
  const { newsData, loadingNews } = useSelector((state) => state.news);

  function navigationHandler(item) {
    navigation.navigate("NewsShow", {
      id: item.id,
    });
  }

  useEffect(() => {
    dispatch(news());
  }, [dispatch]);
  if (loadingNews) {
    return (
      <View style={styles.loadingContainer}>
        <Flow size={48} color="#673ab7" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.rootContainer}>
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.innerConatiner}>
            <NewsCard
              title={truncateText(item.title, 60)}
              date={item.date}
              imageUrl={{ uri: item.image }}
              onPress={() => navigationHandler(item)}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: Platform.OS === "android" && width * 0.1,
    backgroundColor: "#F3F3F3FF",
  },
  innerConatiner: {
    flex: 1,
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontSize: normalize(18),
    fontWeight: "bold",
    backgroundColor: "#F3F3F3FF",
    color: "#673ab7",
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.04,
  },
});
