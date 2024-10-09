import { StyleSheet, View, Text, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');

const CardContent = ({ label, text, otherStyles, textStyles, labelStyle, info }) => {
    return (
        <View style={[styles.row, otherStyles, info && { paddingVertical: 7 }]}>
            {label &&
                <Text style={[styles.labelText, labelStyle]}>{label}:</Text>
            }
            <Text style={[styles.valueText, textStyles, info && { marginLeft: width * 0.05 }]}>{text}</Text>
        </View>
    )
}

export default CardContent

const styles = StyleSheet.create({
    row: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 5,
        flexWrap: 'wrap',
    },
    labelText: {
        fontSize: width * 0.04,
        flexShrink: 1
    },
    valueText: {
        flex: 1,
        flexWrap: 'wrap',
        flexShrink: 1,
        fontSize: width * 0.04,
        marginLeft: 8,
    },
})