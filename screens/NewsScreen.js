import { StyleSheet, View, SafeAreaView, Platform, Dimensions, ScrollView } from 'react-native'
import NewsCard from '../components/NewsCard';
import { images } from '../constants';  //es satestod aris

const { width } = Dimensions.get('window');

const NewsScreen = () => {
    return (
        <SafeAreaView style={styles.rootContainer}>
            <ScrollView>
                <View style={styles.innerConatiner}>
                    <NewsCard
                        title='სოხუმის სახელმწიფო უნივერსიტეტის განვითარების...'
                        date='2024-10-03'
                        imageUrl={images.souLogo}
                        // OnPress={}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default NewsScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: Platform.OS === 'android' && width * 0.1,
        backgroundColor: '#F3F3F3FF'
    },
    innerConatiner: {
        flex: 1,
        padding: 15,
    },
})