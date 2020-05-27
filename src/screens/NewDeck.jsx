import React, { useState } from 'react'
import { Text, View, Modal, StyleSheet, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import Button from '../components/Button'
import { white, persian, seaweed, meadow } from '../utils/colors'

import { connect } from 'react-redux'
import { createDeck } from '../actions/decks'
import { saveDeck } from '../utils/api'

const NewDeck = (props) => {
    const [ title, setTitle ] = useState('')

    const onSubmit = () =>{
        const { dispatch, navigation } = props
        if( !title)
            return alert("Please fill the title!")

        const deck = {
            id: title,
            title: title,
            timestamp: Math.round(new Date() / 1000),
            created: new Date().toISOString().split('T')[0],
            questions: []
        }
        setTitle('')
        saveDeck(deck)
        .then(dispatch(createDeck(deck)))
        .then(navigation.navigate('Home'))
    }

        return (
                <View style={styles.container}>
                    <LinearGradient 
                        style={styles.inputContainer}
                        colors={[meadow, persian, seaweed]}
                        >
                        <Text style={styles.title}>Enter Title for your new Deck!</Text>
                        <TextInput
                            placeholder="Enter Title"
                            style={styles.input}
                            onChangeText={(i) => setTitle(i)}
                            value={title}
                        />
                    </LinearGradient>
                    <Button 
                        title={"Create new Deck"}
                        onPress={onSubmit}
                    />
                </View>
        )
}

export default connect()(NewDeck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
    },
    inputContainer:{
        height: 200,
        width: "100%",
        borderRadius: 20,
        marginVertical: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    title:{
        fontSize: 20,
        color: white,
        fontWeight: "bold",
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginVertical: 20,
        width: "80%",
        borderWidth: 1,
        borderRadius: 30,
        borderColor: white,
        backgroundColor: white,
    }
})