import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import Button from '../components/Button'
import { white, persian, seaweed, meadow, pale  } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

export class QuizView extends Component {
    state={
        score: 0,
        count: 0,
        answered: false,
    }

    componentDidMount(){
        clearLocalNotification()
        setLocalNotification()
    }
    
    render() {
        const { answered, count, score } = this.state
        const { route, navigation } = this.props
        const { deck } = route.params
        const { questions } = deck
        const len = questions.length 

        if( count === len){
            return (
                <View style={styles.container}>
                    <LinearGradient 
                        style={styles.card}
                        colors={[meadow, persian, seaweed]}
                        >
                        <Text style={styles.text}>Your Score!</Text>
                        <Text style={[styles.text, styles.score]}>{score}</Text>
                    </LinearGradient>
                    <View style={styles.buttons}>
                            <Button
                                style={styles.button}
                                title={"Restart Quiz"}
                                onPress={() => { this.setState({count: 0, score: 0}) }}
                            />
                            <Button
                                style={styles.button}
                                title={"Back to Deck"}
                                onPress={() => navigation.goBack()}
                            />
                    </View>
                </View>
            )
        }

        const { question, answer } = deck.questions[count]

        return (
            <View style={styles.container}>
                <LinearGradient 
                    style={styles.card}
                    colors={[meadow, persian, seaweed]}
                    >
                    <Text style={styles.text}>Q:- {question}</Text>
                    {answered && <Text style={[styles.text, styles.answer]}>A:- "{answer}"</Text>}
                    <Text style={styles.remaining}>~ Question's remaining {len-(count+1)} ~</Text>
                </LinearGradient>
                <View>
                    { answered 
                    ?   <View style={styles.buttons}>
                            <Button
                                style={styles.button}
                                title={"Correct"}
                                onPress={() => { this.setState({score: score+1, count: count+1, answered:!answered}) }}
                            />
                            <Button
                                style={styles.button}
                                title={"Wrong"}
                                onPress={() => { this.setState({count: count+1, answered:!answered}) }}
                            />
                        </View> 
                    :   <Button
                            style={styles.button}
                            title={"View Answer"}
                            onPress={() => this.setState({answered: !answered})}
                        />   
                    }                    
                </View>
            </View>
        )
    }
}

export default QuizView

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 40, 
        justifyContent: "center", 
    },
    card:{
        height: 100,
        width: width - 80,
        borderRadius: 25,
        elevation:10,
        backgroundColor: white,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40,
        paddingVertical: 200,
    },
    text:{
        color: pale,
        fontSize: 25,
        fontWeight: "bold",
        letterSpacing: 1,
        textAlign: "center",
    },
    answer:{
        marginVertical: 20,
        fontSize: 40,
        color: white,
    },
    remaining:{
        position: "absolute",
        bottom: -25,
        right: 30,
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 1.8
    },
    score:{
        borderWidth: 1,
        borderColor: white,
        width: 50,
        height: 50,
        borderRadius: 25,
        textAlignVertical: "center", 
        marginTop: 20,
    },
    buttons:{
        flexDirection: "row",
    },
    button: {
        width: (width - 90 ) / 2,
        marginLeft: 5,
    }
})