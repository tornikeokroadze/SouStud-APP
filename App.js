import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StyleSheet, Image, Dimensions, Pressable, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { icons } from './constants'
import HomeScreen from './screens/HomeScreen';
import NewsScreen from './screens/NewsScreen';
import ProfileScreen from './screens/ProfileScreen';
import Jobscreen from './screens/JobScreen';
import SubjectScreen from './screens/SubjectScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogInScreen from './screens/LogInScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';
import MessageScreen from './screens/MessageScreen'
import ConfirmScreen from './screens/ConfirmScreen'
import MobileNumberScreen from './screens/MobileNumberScreen'

const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();
const { width } = Dimensions.get('window');

function LoginStack({ getToken }) {
  return (
    <Stack.Navigator
    >
      <Stack.Screen
        name='LogIn'
        component={LogInScreen}
        options={{
          headerShown: false
        }}
        initialParams={{ getToken }}
      />
      <Stack.Screen
        name='PasswordReset'
        component={PasswordResetScreen}
        options={({ navigation }) => ({
          title: '',
          headerBackVisible: false,
          gestureEnabled: true,
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate('LogIn')}>
              <Text style={{ marginRight: 15, color: 'blue', fontSize: 18 }}>ავტორიზაცია</Text>
            </Pressable>
          ),
        })}
      />

      <Stack.Screen
        name='MobileNumber'
        component={MobileNumberScreen}
        options={({ navigation }) => ({
          title: '',
          headerBackVisible: false,
          gestureEnabled: false,
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate('LogIn')}>
              <Text style={{ marginRight: 15, color: 'blue', fontSize: 18 }}>ავტორიზაცია</Text>
            </Pressable>
          ),
        })}
      />

      <Stack.Screen
        name='Message'
        component={MessageScreen}
        options={({ navigation }) => ({
          title: '',
          headerBackVisible: false,
          gestureEnabled: false,
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate('LogIn')}>
              <Text style={{ marginRight: 15, color: 'blue', fontSize: 18 }}>ავტორიზაცია</Text>
            </Pressable>
          ),
        })}
      />

      <Stack.Screen
        name='Confirm'
        component={ConfirmScreen}
        options={({ navigation }) => ({
          title: '',
          headerBackVisible: false,
          gestureEnabled: false,
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate('LogIn')}>
              <Text style={{ marginRight: 15, color: 'blue', fontSize: 18 }}>ავტორიზაცია</Text>
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function getToken() {
    const token = await AsyncStorage.getItem('Token');
    setIsAuthenticated(!!token);
  }

  useEffect(() => {
    // AsyncStorage.removeItem('Token')
    getToken();
  }, []);




  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        {isAuthenticated ? (

          <Tab.Navigator
            initialRouteName="Home"
            activeColor="#FFFFFFFF"
            inactiveColor="#FFFFFFFF"
            barStyle={{ backgroundColor: '#673ab7' }}
            shifting={true}
          >
            <Tab.Screen
              name='Home'
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={icons.home}
                    resizeMode='contain'
                    style={[styles.icon, { tintColor: focused ? '#673ab7' : '#FFFFFF' }]}
                  />
                )
              }}
            />

            <Tab.Screen
              name='News'
              component={NewsScreen}
              options={{
                tabBarLabel: 'News',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={icons.news}
                    resizeMode='contain'
                    style={[styles.icon, { tintColor: focused ? '#673ab7' : '#FFFFFF' }]}
                  />
                )
              }}
            />

            <Tab.Screen
              name='Subject'
              component={SubjectScreen}
              options={{
                tabBarLabel: 'Subject',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={icons.book}
                    resizeMode='contain'
                    style={[styles.icon, { tintColor: focused ? '#673ab7' : '#FFFFFF' }]}
                  />
                )
              }}
            />

            <Tab.Screen
              name='Job'
              component={Jobscreen}
              options={{
                tabBarLabel: 'Job',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={icons.job}
                    resizeMode='contain'
                    style={[styles.icon, { tintColor: focused ? '#673ab7' : '#FFFFFF' }]}
                  />
                )
              }}
            />

            <Tab.Screen
              name='Profile'
              component={ProfileScreen}
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={icons.user}
                    resizeMode='contain'
                    style={[styles.icon, { tintColor: focused ? '#673ab7' : '#FFFFFF' }]}
                  />
                )
              }}
              initialParams={{ getToken }}
            />
          </Tab.Navigator>
        ) : (

          <LoginStack getToken={getToken} />
        )
        }
      </NavigationContainer>
    </>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
  },
});
