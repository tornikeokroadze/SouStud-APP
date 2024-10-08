import { StyleSheet, View, Text, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');

const CardContent = ({ label, text, otherStyles, textStyles }) => {
    return (
        <View style={[styles.row, otherStyles]}>
            <Text style={styles.labelText}>{label}:</Text>
            <Text style={[styles.valueText, textStyles]}>{text}</Text>
        </View>
    )
}

export default CardContent

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    labelText: {
        fontSize: width * 0.041,
    },
    valueText: {
        fontSize: width * 0.041,
        marginLeft: 5,
    },
})