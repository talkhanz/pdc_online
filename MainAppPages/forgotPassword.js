import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, useNavigationState} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ImageBackground, Button, ScrollView ,StyleSheet,TouchableOpacity, Text, View, Alert, TextInput, Image} from 'react-native';

export default class ForgotPassword extends React.Component{
    state = {           // State of login component. State is data that can be used by component and changes over time
        user: null,       // The user that signs in. Will contain user details. Null by default
        email: '',             // user email
        errorMessage: null,    // Will contain all error messages to display on screen
    }

    resetPass(){
        if(this.state.email == ''){
            this.setState({errorMessage: 'Please Enter an your email address'})
        }
        else{
            auth().sendPasswordResetEmail(this.state.email)
            .then(()=> Alert.alert('Follow the link in the email sent to your address to reset your password'))
            .catch(err => this.setState({errorMessage: err.message}))
        }
    }

    render(){ 
        return (
            <ImageBackground source={require('./images/pdc_image_blur.png')} style={styles.container}>
            <Text style={styles.titleText}> PDC ONLINE</Text>
            {this.state.errorMessage && <Text style={{fontSize: 22, color: 'white',textShadowColor: 'black',textShadowOffset:  {width: -3} ,textShadowRadius: 20}}>{this.state.errorMessage}</Text>}
            <Text style={styles.subtitleText}>Enter your email address below</Text>
            <TextInput style={styles.TextInput} onChangeText={email => this.setState({email: email})} value={this.state.email} placeholder='Email' textAlign={'center'}  ></TextInput>
            <TouchableOpacity onPress={() => this.resetPass()} style={styles.button}>
                <Text style={{color: 'white', fontSize: 17}} title="Login" >Submit</Text>
            </TouchableOpacity>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    titleText: {
      marginTop: 95,
      fontSize: 55, 
      fontWeight: "bold",
      color: 'white',
      height : 100,
      textShadowColor: 'black',
      textShadowOffset:  {width: -5, height: 5} ,
      textShadowRadius: 20
    },
    subtitleText: {
      marginVertical: 7,
      fontSize: 22, 
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset:  {width: -3} ,
      textShadowRadius: 20,
    },
    TextInput:{
      marginVertical: 5,
      height: 40, 
      width: 180,
      backgroundColor: 'white',
      borderColor: 'black', 
      borderWidth: 1 ,
    }, 
    button: {
      backgroundColor: '#E9446A',
      marginHorizontal: 5,
      marginVertical: 15,
      borderRadius: 4,
      borderColor: '#CA2161',
      borderWidth: 1,
      height: 52,
      width: 180,
      alignItems: 'center',
      justifyContent: 'center'
    },
    scroll: {
      flexDirection: 'column',
      borderStyle: 'solid',
      position: 'relative'
    }   
  });
  