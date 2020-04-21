import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ImageBackground, Button, StyleSheet, Text, View, Alert, TextInput, Image} from 'react-native';

import login from './pages/login';
import userdata from './pages/userdata';
import sessionsMenu from './pages/sessionsMenu';
import breakfast from './pages/breakfast';
import signup from './pages/signup';
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
            <stack.Screen name="UserData" component={userdata} options={{ headerShown: false}}/>
            <stack.Screen name="Sessions Menu" component={sessionsMenu} options={{ headerShown: false}}/>
            <stack.Screen name="breakfast" component={breakfast} options={{ headerShown: false}}/>
            <stack.Screen name="signup" component={signup} options={{ headerShown: false}}/>
        </stack.Navigator>
     </NavigationContainer>
    );
  }
}