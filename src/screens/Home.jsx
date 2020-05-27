import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Deck from '../components/Deck'
import { meadow, white } from '../utils/colors'

import { fetchInitialData } from '../actions'

export class Home extends Component {
    componentDidMount(){
        this.props.dispatch(fetchInitialData())
      }
    render() {
        const {decks} = this.props

        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={{fontSize: 30, color: white, letterSpacing: 4}}> Flash Cards </Text>
                </View>
                
                { decks.length !== 0 
                ? <View>
                    <Text style={styles.title}>You have {decks.length} Deck</Text>
                    {decks.map(d => <Deck key={d} id={d} navigation={this.props.navigation}/>)}
                  </View>
                : <Text style={styles.nodeck}>Hey 👋,You didn't create any Deck!</Text>
                }
            </ScrollView>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks: Object.keys(decks).sort((a,b) => decks[b].timestamp - decks[a].timestamp ) 
    }
}

export default connect(mapStateToProps)(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    header:{
        backgroundColor: meadow,
        marginVertical: 20,
        height: 100,
        borderRadius: 20,
        elevation: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    nodeck:{
        fontSize: 20,
        fontStyle: "italic",
        letterSpacing: 1.8,
        textAlign:"center",
        marginTop: 200
    },
    title:{
        paddingBottom: 10,
        marginBottom: 8,
        borderBottomWidth: 1,
        fontSize: 20,
        letterSpacing: 2,
        marginBottom: 20,
    }
})