import { StyleSheet, View, SafeAreaView, Platform, Dimensions, ScrollView } from 'react-native'
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
const { width, height } = Dimensions.get('window');

export default function PasswordResetScreen({ navigation }) {

    function goToPhoneNumber() {
        navigation.navigate("MobileNumber");
    }

    const [form, setForm] = useState({
        personalNum: '',
    })

    return (
        <SafeAreaView style={styles.rootContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.cardOutContainer}>
                    <View style={styles.cardContainer}>
                        <View style={styles.loginContainer}>
                            <CustomInput
                                title="პირადი ნომერი"
                                keyType="hide"
                                value={form.personalNum}
                                handleChangeText={(e) => setForm({ ...form, personalNum: e })}
                                keyboardType="numeric"
                            />
                            <CustomButton onPress={goToPhoneNumber}>დადასტურება</CustomButton>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}


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