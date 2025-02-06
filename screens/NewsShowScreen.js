import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity, Pressable,
} from "react-native";
import { useState } from "react";
import NewsModal from "../components/NewsModal";
import RenderHtml from "react-native-render-html";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

export default function NewsShowScreen({ route }) {
  const { id } = route.params;
  const { newsData } = useSelector((state) => state.news);
  const filteredNews = newsData.find((newsItem) => newsItem.id === id);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Pressable onPress={handleImagePress}>
          <Image
            source={{ uri: filteredNews.image }}
            resizeMode="cover"
            style={styles.image}
          />
        </Pressable>
      </View>

      <NewsModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        imageUrl={{ uri: filteredNews.image }}
      />

      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{filteredNews.title}</Text>
            <RenderHtml
              contentWidth={width}
              ignoredDomTags={["o:p"]}
              source={{ html: filteredNews.text }}
              baseStyle={styles.text}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: height * 0.4,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    marginTop: height * 0.37,
    overflow: "hidden",
    zIndex: 2,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: width * 0.03,
    marginHorizontal: width * 0.03,
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    flexShrink: 1,
    fontSize: width * 0.05,
  },
  text: {
    marginTop: width * 0.05,
    flex: 1,
    flexWrap: "wrap",
    flexShrink: 1,
    fontSize: width * 0.04,
  },
  errorText: {
    textAlign: "center",
    marginTop: height * 0.2,
    fontSize: 18,
    color: "red",
  },
});
