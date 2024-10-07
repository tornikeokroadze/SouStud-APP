import { StyleSheet, View, Text, SafeAreaView, Platform, Dimensions } from 'react-native'

const { width } = Dimensions.get('window');

const JobScreen = () => {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text>JobScreen</Text>
    </SafeAreaView>
  )
}

export default JobScreen

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
   marginTop:  Platform.OS === 'android' && width * 0.08
  }
})