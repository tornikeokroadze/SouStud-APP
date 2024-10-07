import { StyleSheet, View, Text, Pressable, SafeAreaView, Platform, Dimensions, ScrollView, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { icons } from '../constants';
const { width, height } = Dimensions.get('window');

const LogInScreen = ({ navigation, route }) => {
    const Token = 'T782J9094H94587';

    const { getToken } = route.params;

    function goToPasswordReset() {
        navigation.navigate("PasswordReset");
    }

    async function loginHandler() {
        await AsyncStorage.setItem('Token', Token);
        navigation.replace('Home');
    }

    const [form, setForm] = useState({
        personalNum: '',
        password: '',
    })

    return (
        <SafeAreaView style={styles.rootContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.cardOutContainer}>
                    <View style={styles.cardContainer}>
                        <View style={styles.loginContainer}>
                            <View style={styles.loginInnerContainer}>
                                <Image
                                    source={icons.home}
                                    resizeMode='contains'
                                    style={styles.logo}
                                />
                                <Text style={styles.logoText}>StudApp-ში შესვლა</Text>
                            </View>
                            <CustomInput
                                title="პირადი ნომერი"
                                keyType="hide"
                                value={form.personalNum}
                                handleChangeText={(e) => setForm({ ...form, personalNum: e })}
                                keyboardType="numeric"
                            />

                            <CustomInput
                                title="პაროლი"
                                keyType="hide"
                                value={form.password}
                                handleChangeText={(e) => setForm({ ...form, password: e })}
                            />

                            <CustomButton onPress={loginHandler}>შესვლა</CustomButton>

                            <View style={styles.forgotPasswordContainer}>
                                <Text style={{ color: "#FFFFFF" }}>დაგავიწყდათ პაროლი? {" "}
                                    <Text onPress={goToPasswordReset} style={{ color: "#DA7B00FF" }}>
                                        აღდგენა
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default LogInScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: Platform.OS === 'android' && width * 0.08,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    cardOutContainer: {
        padding: width * 0.07,
    },
    cardContainer: {
        borderRadius: 24,
        backgroundColor: '#6B44ADFF',
        elevation: 8,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
    },
    logo: {
        width: 34,
        height: 34
    },
    logoText: {
        fontSize: 24,
        marginTop: width * 0.05,
        color: '#FFFFFF',
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: width * 0.07,
    },
    loginInnerContainer: {
        marginVertical: 10
    },
    forgotPasswordContainer: {
        marginTop: 15,
        alignItems: 'center'
    }
})