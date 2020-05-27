import React, { useState, useEffect, useRef } from 'react'
import { Text, View, FlatList, StyleSheet, Dimensions, Animated } from 'react-native'
import { connect } from 'react-redux'

import AddCard from './AddCard'

import Button from '../components/Button'
import Deck from '../components/Deck'
import Card from '../components/Card'
import { seaweed } from '../utils/colors'

const DeckView = (props) =>{
        const [ modalOpen, setModalOpen ] = useState(false)

        const [fadein, setFadein] = useState(new Animated.Value(0))

        useEffect(() => {
            Animated.timing( fadein ,{
                toValue: 1,
                duration: 500,
            }).start()
        },[])
        
        const { navigation, dispatch, deck } = props
        const { questions, id } = deck
        const len = questions.length
        
        return (
            <View style={[styles.container, {opacity : 1}]}>
                <AddCard
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    deckId={id}
                    dispatch={dispatch}
                />
                <View>
                    <Deck 
                        id={id}
                    />
                </View>
                <View style={styles.cards}>
                    { len !== 0 
                    ?   <FlatList 
                            style={styles.flatList}
                            horizontal={true}
                            data={questions}
                            keyExtractor={item => item.answer}
                            renderItem={({item,index}) => <Card card={item} index={index}/>}
                        />
                    :   <Text style={styles.nocard}>Hey 👋,You didn't create any Card!</Text>
                    }
                </View>
                <View style={styles.buttons}>
                    { len !== 0 && <Button
                                    style={styles.button}
                                    title={"Take a Quiz"}
                                    onPress={ () => navigation.navigate('Quiz',{deck}) }
                                />
                    }
                    <Button
                        style={styles.button}
                        title={"Add a new Card"}
                        onPress={() =>  {setModalOpen(!modalOpen); }}
                    />
                </View>
            </View>
        )
}

function mapStateToProps(decks, props) {
    const { deckId } = props.route.params
    return {
        deck : decks[deckId]
    }
}

export default connect(mapStateToProps)(DeckView)

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 40, 
        justifyContent: "space-evenly" 
    },
    title:{
        color: seaweed,
        paddingVertical: 12,
        fontWeight: "bold",
        fontSize: 20,
        textTransform: "uppercase",
        letterSpacing: 2,
    },
    cards:{
        alignItems: "center",
        justifyContent: "center"
    },
    nocard:{
        fontSize: 20,
        fontStyle: "italic",
        letterSpacing: 1.8
    },
    flatList: {
        paddingVertical: 20,
    },
    buttons:{
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        width: (width - 90 ) / 2
    }
})