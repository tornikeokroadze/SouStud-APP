import { useState } from 'react';
import { StyleSheet, View, Text, Platform, Dimensions, Image, Pressable, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { icons } from '../constants';
import CardContent from '../components/CardContent';

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ }) => {

  const [activeContent, setActiveContent] = useState('one');

  const navigation = useNavigation();

  async function logOutHendler() {
    // const token = await AsyncStorage.getItem('Token');
    // navigation.replace('LogIn');
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.circle}></View>
        <Pressable onPress={logOutHendler}>
          <View style={styles.logOut}>
            <Image
              source={icons.exit}
              resizeMode='contain'
              style={{ width: '100%', height: '100%', tintColor: '#FFFFFF' }}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentInnerContainer}>
          <Text style={{ textAlign: 'center', fontSize: width * 0.05 }}>თორნიკე ოქროაძე</Text>
          <CardContent
            otherStyles={{ marginTop: 8 }}
            label="პირადი ნომერი"
            text="00000000000"
          />
          <CardContent
            label="დავალიანება"
            text="1125"
            textStyles={{ color: '#FF0000FF', fontWeight: 'bold' }}
          />
          <CardContent
            label="სტატუსი"
            text="აქტიური"
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoInnerContainer}>
          <Pressable
            onPress={() => setActiveContent('one')}
            style={[styles.contentButtonContainer, activeContent === 'one' && { borderBottomColor: '#673ab7' }]}
          >
            <Text>contentOne</Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveContent('two')}
            style={[styles.contentButtonContainer, activeContent === 'two' && { borderBottomColor: '#673ab7' }]}
          >
            <Text>contentTwo</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >

          <View>
            {activeContent === "one" ?
              (
                <View>
                  
                </View>
              ) : (
                <View></View>
              )
            }
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    height: height * 0.38,
    backgroundColor: '#673ab7',
    borderBottomStartRadius: width * 0.08,
    borderBottomEndRadius: width * 0.08,
    overflow: 'hidden',
  },
  circle: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#DA7B00FF',
    position: 'absolute',
    top: -width * 0.06,
    left: -width * 0.1,
  },
  logOut: {
    position: 'absolute',
    width: width * 0.07,
    height: width * 0.07,
    top: width * 0.13,
    right: width * 0.05
  },
  contentContainer: {
    bottom: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 20,
    marginBottom: width * 0.1
  },
  contentInnerContainer: {
    backgroundColor: '#FFFFFFFF',
    position: 'absolute',
    width: width * 0.8,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  infoContainer: {
    padding: width * 0.1,
    flexGrow: 1,
  },
  infoInnerContainer: {
    flexDirection: 'row',
  },
  contentButtonContainer: {
    flex: 1,
    paddingBottom: width * 0.03,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scrollViewContent: {
    paddingBottom: width * 0.95,
  },
})