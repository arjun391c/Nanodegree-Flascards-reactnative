import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { seaweed, white } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Deck = (props) => {
    const { deck, navigation } = props
    const noOfCards = deck.questions.length === undefined ? 0 : deck.questions.length 

    const onPress = () =>{
        navigation.navigate('DeckView',{
            deckId : deck.id
        })
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} disabled={ navigation === undefined}>
            <View style={{justifyContent: "center"}}>
                <Text style={styles.name}>{deck.title}</Text>
                <Text style={styles.date}>created:-  {deck.created}</Text>
            </View>
            <View style={{justifyContent: "center"}}>
                <Text style={styles.cards}>{noOfCards} <MaterialCommunityIcons name="cards-outline" size={35} color={white} /> </Text>
            </View>
        </TouchableOpacity>
    )
}

function mapStateToProps(decks,{id}){
    return {
        deck: decks[id]
    }
}

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
    container:{
        backgroundColor: seaweed,
        marginBottom: 20,
        borderRadius: 10,
        height: 80,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        flexDirection: "row",
        elevation: 10,
    },
    name:{
        fontSize: 20,
        color: white,
        textTransform: "uppercase",
        fontWeight: "bold",
        letterSpacing: 2,
    },
    date:{
        color: white,
        fontSize: 15,
    },
    cards:{
        fontSize: 40,
        color: white
    }
})