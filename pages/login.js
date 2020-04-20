import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
//import auth from '@react-native-firebase/auth';
import {ImageBackground, Button, StyleSheet, Text, View, Alert, TextInput, Image} from 'react-native';

import {addUser, showUser} from '../firestoreSetup'

const me = {
  name : 'Talha',
  password : 'password',
  email : '21100313@lums.edu.pk',
  wallet : '0',
  admin : false,
  pastOrders : 'False',
  currentOrder : {}
}

export default class Login extends React.Component {
  render(){
    return (
        <ImageBackground source={require('./pdc_image_blur.png')} style={styles.container}>
          <Text style={styles.titleText}> PDC ONLINE</Text>
          <Text style={styles.subtitleText}> Username</Text>
          <TextInput style={styles.TextInput} placeholder='username@lums.edu.pk' textAlign={'center'}  ></TextInput>
          <Text style={styles.subtitleText}> Password</Text>
          <TextInput style={styles.TextInput} placeholder='password' textAlign={'center'} ></TextInput>
          <Button title="Login" onPress={() => this.props.navigation.navigate('Sessions Menu')}/>
          <Button title="Database" onPress={() => this.props.navigation.navigate('UserData')}/>
          <Text style={styles.subtitleText} onPress={() => addUser(me)}> Forgot your password?</Text>
        </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  titleText: {
    fontSize: 55, 
    fontWeight: "bold",
    color: 'white',
    height : 150,
    textShadowColor: 'black',
    textShadowOffset:  {width: -5, height: 5} ,
    textShadowRadius: 20
  },
  subtitleText: {
    marginVertical: 3,
    fontSize: 20, 
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset:  {width: -5, height: 5} ,
    textShadowRadius: 10
  },
  usernameText:{},
  passwordText:{},
  TextInput:{
    marginVertical: 5,
    height: 40, 
    width: 180,
    backgroundColor: 'white',
    borderColor: 'black', 
    borderWidth: 1 ,
  } 
 
  
});
