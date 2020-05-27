import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { meadow, persian, seaweed, white, pale } from '../utils/colors'

const Card = ({card,index}) => {
    const { question } = card
    return (
        <LinearGradient 
            style={styles.card}
            colors={[meadow, persian, seaweed]}
        >
            <Text style={styles.question}>{question}</Text>
            <Text style={styles.index}>{index+1}</Text>
        </LinearGradient>
    )
}

export default Card

const styles = StyleSheet.create({
    card:{
        height: 400,
        backgroundColor: pale,
        borderRadius: 30,
        width: 300,
        marginRight: 30,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    question:{ 
        color: pale, 
        fontSize: 25, 
        textAlign: "center",
        fontStyle: "italic",
        fontWeight: "bold",
        letterSpacing: 2,
    },
    index:{
        marginTop: 10,
        fontSize: 20,
        width: 60,
        textAlign: "center",
        textAlignVertical: "center",
        height: 60,
        borderRadius: 30,
        borderColor: white,
        borderWidth: 2,
        color: pale,
    }
})