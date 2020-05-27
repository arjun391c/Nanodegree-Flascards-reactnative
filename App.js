import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { persian } from './src/utils/colors'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//screens
import Home from './src/screens/Home'
import DeckView from './src/screens/DeckView'
import NewDeck from './src/screens/NewDeck'
import QuizView from './src/screens/QuizView'

//redux
import reducers from './src/reducers/decks'
import middlewares from './src/middlewares'
import { createStore } from 'redux' 
import { Provider } from 'react-redux'

import { setLocalNotification } from './src/utils/helpers'


const store = createStore(reducers,middlewares)

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const MainTab = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {

        if (route.name === 'Home') {
          return <MaterialCommunityIcons name="cards-variant" size={24} color={color} />
        } 
        else if (route.name === 'Add') {
          return <Entypo name="add-to-list" size={24} color={color} />
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: persian,
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={Home}/>
    <Tab.Screen name="Add" component={NewDeck}/>
  </Tab.Navigator>
)

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={MainTab} options={{headerShown: false}}/>
    <Stack.Screen name="DeckView" component={DeckView}/>
    <Stack.Screen name="Quiz" component={QuizView}/>
  </Stack.Navigator>
)

export class App extends Component {
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <HomeStack/>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App