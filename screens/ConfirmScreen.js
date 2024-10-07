import { StyleSheet, View, Text, Pressable, SafeAreaView, Platform, Dimensions, ScrollView, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { icons } from '../constants';
const { width, height } = Dimensions.get('window');

const ConfirmScreen = ({ navigation }) => {

    function goToLogIn() {
        navigation.navigate("LogIn");
    }

    const [form, setForm] = useState({
        newPassword: '',
        repeatPassword: '',
    })

    return (
        <SafeAreaView style={styles.rootContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.cardOutContainer}>
                    <View style={styles.cardContainer}>
                        <View style={styles.loginContainer}>
                            <CustomInput
                                title="ახლი პაროლი"
                                keyType="hide"
                                value={form.newPassword}
                                handleChangeText={(e) => setForm({ ...form, newPassword: e })}
                            />

                            <CustomInput
                                title="გაიმეორეთ პაროლი"
                                keyType="hide"
                                value={form.repeatPassword}
                                handleChangeText={(e) => setForm({ ...form, repeatPassword: e })}
                            />

                            <CustomButton onPress={goToLogIn}>შესვლა</CustomButton>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default ConfirmScreen

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
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: width * 0.07,
    },
})