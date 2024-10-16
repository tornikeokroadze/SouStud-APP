import { StyleSheet, View, TouchableOpacity, Modal, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

const NewsModal = ({ modalVisible, closeModal, imageUrl }) => {
    return (
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
                    <Image
                        source={imageUrl}
                        resizeMode='contain'
                        style={styles.modalImage}
                    />
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default NewsModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalOverlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: width * 0.9,
        height: height * 0.7,
    },
})