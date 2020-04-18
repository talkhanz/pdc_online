import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ImageBackground, Button, StyleSheet, Text, View, Alert, TextInput, Image} from 'react-native';

import login from './pages/login';
import sessionsMenu from './pages/sessionsMenu';
//import { divide } from 'react-native-reanimated';

const stack = createStackNavigator();
 
export default class App extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
    render(){
    return (
     <NavigationContainer>
        <stack.Navigator initialRouteName="Login">
            <stack.Screen name="Login" component={login} options={{ headerShown: false}}/>
            <stack.Screen name="Sessions Menu" component={sessionsMenu} options={{ headerShown: false}}/>
        </stack.Navigator>
     </NavigationContainer>
    );
  }
}
//headerTintColor: 'white', headerStyle: { backgroundColor: 'tomato' }