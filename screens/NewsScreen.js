import { Flow } from "react-native-animated-spinkit";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import NewsCard from "../components/NewsCard";
import { images } from "../constants"; //es satestod aris
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { news } from "../store/newsAction";

const { width } = Dimensions.get("window");

const NewsScreen = () => {
  const dispatch = useDispatch();
  const { newsData, loadingNews } = useSelector((state) => state.news);

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
      <ScrollView>
        <View style={styles.innerConatiner}>
          <NewsCard
            title="სოხუმის სახელმწიფო უნივერსიტეტის განვითარების..."
            date="2024-10-03"
            imageUrl={images.souLogo}
            // OnPress={}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsScreen;

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
