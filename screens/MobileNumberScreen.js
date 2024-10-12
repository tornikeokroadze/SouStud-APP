import { StyleSheet, View, Text, SafeAreaView, Platform, Dimensions, ScrollView } from 'react-native'
import CustomButton from '../components/CustomButton';
const { width, height } = Dimensions.get('window');

export default function MobileNumberScreen({ navigation }) {
    const number = '000000000';

    function goToMessage() {
        navigation.navigate("Message");
    }

    function goLgin() {
        navigation.navigate('LogIn');
    }

    return (
        <SafeAreaView style={styles.rootContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.cardOutContainer}>
                    <View style={styles.cardContainer}>
                        <View style={styles.loginContainer}>
                            <Text style={styles.number}>{number.replace(/\d(?=\d{3})/g, '*')}</Text>
                            <Text style={styles.text}> ნამდვილად თქვენი ნომერია?</Text>
                            <View style={styles.buttonContainer}>
                                <CustomButton onPress={goLgin}>არა</CustomButton>
                                <CustomButton onPress={goToMessage} otherStyles={{ marginLeft: 15 }}>დიახ</CustomButton>
                            </View>
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
    number: {
        fontSize: 24,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})