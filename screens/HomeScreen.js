import { StyleSheet, View, Text, SafeAreaView, Platform, Dimensions } from 'react-native'

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.homeInnerContainer}>
        <Text>HomeScreen</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    marginTop: Platform.OS === 'android' && width * 0.08
  },
  homeInnerContainer: {
    paddingHorizontal: 10
  }
})