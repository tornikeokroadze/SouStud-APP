import { StyleSheet, View, Text, Pressable, Platform, Dimensions } from 'react-native'


const { width, height } = Dimensions.get('window');

const CustomButton = ({ children, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
        android_ripple={{ color: '#DA7B00FF' }}   //6f00f6
      >
        <View
          style={styles.bttonContainer}
        >
          <Text style={styles.bttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.02,
    borderRadius: 24,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 8,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    backgroundColor: '#FF9001',
  },
  bttonContainer: {
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.1,
    borderRadius: 20,
    overflow: 'hidden'
  },
  bttonText: {
    fontSize: width * 0.055,
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.80,
    backgroundColor: '#DA7B00FF',
    borderRadius: 20.
  }
});