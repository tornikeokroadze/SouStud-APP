import { StyleSheet, View, Text, SafeAreaView, Platform, Dimensions } from 'react-native'

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text>ProfileScreen</Text>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
   marginTop:  Platform.OS === 'android' && width * 0.08
  }
})