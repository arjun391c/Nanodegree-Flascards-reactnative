import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { meadow, persian, seaweed, white } from '../utils/colors'

const Button = ({title, style, onPress }) => {
    return (
        <LinearGradient
            colors={[meadow, persian, seaweed]}
            style={[styles.button,style]}
        >
            <TouchableOpacity onPress={onPress}>
            <Text style={{fontSize: 20, color: white, fontWeight: "bold"}}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default Button

const styles = StyleSheet.create({
    button:{
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
    }
})