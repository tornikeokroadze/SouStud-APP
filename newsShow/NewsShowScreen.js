import { StyleSheet, View, Text, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react';

import NewsModal from '../components/NewsModal';
import { images } from '../constants';  //es satestod aris

const { width, height } = Dimensions.get('window');

const NewsShowScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);

    const handleImagePress = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.rootContainer}>
            <View style={styles.imageConatiner}>
                <TouchableOpacity onPress={handleImagePress}>
                    <Image
                        source={images.souLogo}
                        resizeMode='conatin'
                        style={styles.image}
                    />
                </TouchableOpacity>
            </View>

            <NewsModal 
                modalVisible={modalVisible}
                closeModal={closeModal}
                imageUrl={images.souLogo} //aq is rac zemoT suraTshi
            />

            <View style={styles.srcollConatiner}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.contentConatiner}>
                        <Text style={styles.title}>ილია ჭავჭავაძე</Text>
                        <Text style={styles.text}>
                            lorem ipsum dolor sit amet ipsum dolor amet sit lorem
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default NewsShowScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    imageConatiner: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: height * 0.4,
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    srcollConatiner: {
        flex: 1,
        backgroundColor: '#FFFFFFFF',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        marginTop: height * 0.37,
        overflow: 'hidden',
        zIndex: 2,
    },
    contentConatiner: {
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
        fontSize: width * 0.05,
    },
    text: {
        marginTop: width * 0.05,
        flex: 1,
        flexWrap: 'wrap',
        flexShrink: 1,
        fontSize: width * 0.04,
    },
})