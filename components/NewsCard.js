import { View, Text, StyleSheet, Platform, Dimensions, Pressable, Image } from 'react-native'
import { icons } from '../constants';

const { width } = Dimensions.get('window');

const NewsCard = ({ onPress, imageUrl, title, date }) => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={ onPress }
                style={({ pressed }) => pressed && styles.pressed}
                android_ripple={{ color: '#ECECECFF' }}
            >
                <View style={styles.newsContainer}>
                    <View style={styles.iamgeContainer}>
                        <Image
                            source={imageUrl}
                            resizeMode='contain'
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.dateContainer}>
                            <Image
                                source={icons.calendar}
                                resizeMode='contain'
                                style={styles.dateIcon}
                            />
                            <Text style={styles.date}>{date}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

export default NewsCard

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        marginVertical: 8
    },
    pressed: {
        opacity: 0.60,
        backgroundColor: '#ECECECFF',
        borderRadius: 20,
    },
    newsContainer: {
        flexDirection: 'row',
        padding: width * 0.04,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.10,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        backgroundColor: '#FFFFFFFF',

    },
    iamgeContainer: {
        width: width * 0.4,
        height: width * 0.4,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20
    },
    content: {
        flex: 1,
        alignItems: 'center',
        flexWrap: 'wrap',
        marginVertical: width * 0.03,
        marginHorizontal: width * 0.03,
    },
    title: {
        flex: 1,
        flexWrap: 'wrap',
        flexShrink: 1,
        fontSize: width * 0.04,
    },
    dateContainer: {
        flex: 1,
        marginTop: 5,
        flexDirection: 'row',

    },
    dateIcon: {
        width: width * 0.05,
        height: width * 0.05,
    },
    date: {
        marginLeft: 5,
        fontSize: width * 0.035,
    }
})