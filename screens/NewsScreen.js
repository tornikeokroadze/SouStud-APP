import { Flow } from "react-native-animated-spinkit";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Dimensions,
  ScrollView,
  SectionList,
} from "react-native";
import NewsCard from "../components/NewsCard";
import { images } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { news } from "../store/newsAction";
// import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const truncateText = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

export default function NewsScreen({ navigation }) {
  // const navigation = useNavigation();

  const dispatch = useDispatch();
  const { newsData, loadingNews } = useSelector((state) => state.news);

  function navigationHandler(item) {
    navigation.navigate("NewsShow", {
      id: item.id,
      title: item.title,
      text: item.text,
      date: item.date,
      image: item.image,
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
      <SectionList
        sections={[{ title: "News", data: newsData }]}
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
});
