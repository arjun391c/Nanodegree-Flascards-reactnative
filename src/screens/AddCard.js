import React, { Component } from 'react'
import { Text, View, Modal, StyleSheet, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import Button from '../components/Button'
import { white, persian, seaweed, meadow } from '../utils/colors'

import { createCard } from '../actions/decks'
import { saveCard } from '../utils/api'


class AddCard extends Component {
    state={
        question: '',
        answer: ''
    }

    onSubmit = () =>{
        const { question, answer } = this.state
        const { deckId, dispatch, modalOpen, setModalOpen } = this.props
        if( !question || !answer)
            return alert("Please fill all the fields!")
        const card = {
            question,
            answer
        } 
        this.setState({question: '', answer: ''})
        saveCard(deckId, card)
        .then(dispatch(createCard(deckId,card)))
        .then(setModalOpen(!modalOpen))
    }

    render() {
        const { modalOpen, setModalOpen } = this.props
        const { question, answer } = this.state 
        return (
            <Modal
                animationType="slide"
                visible={modalOpen}
                onRequestClose={() => setModalOpen(!modalOpen)}
            >
                <View style={styles.container}>
                    <LinearGradient 
                        style={styles.inputContainer}
                        colors={[meadow, persian, seaweed]}
                        >
                        <Text style={styles.title}>Enter the details for your new card!</Text>
                        <TextInput
                            placeholder="Enter Question"
                            style={styles.input}
                            onChangeText={(i) => this.setState({question: i})}
                            value={question}
                        />
                        <TextInput
                            placeholder="Enter Answer"
                            style={styles.input}
                            onChangeText={(i) => this.setState({answer: i})}
                            value={answer}
                        />
                    </LinearGradient>
                    <Button 
                        title={"Submit"}
                        onPress={this.onSubmit}
                    />
                </View>
            </Modal>
        )
    }
}

export default AddCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
    },
    inputContainer:{
        height: 300,
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