import { StyleSheet, View, Text, SafeAreaView, Platform, Dimensions } from 'react-native'

const { width } = Dimensions.get('window');

const SubjectScreen = () => {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text>SubjectScreen</Text>
    </SafeAreaView>
  )
}

export default SubjectScreen

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
   marginTop:  Platform.OS === 'android' && width * 0.08
  }
})