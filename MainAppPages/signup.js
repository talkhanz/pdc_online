import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ImageBackground, Button, StyleSheet,ScrollView, TouchableOpacity, Text, View, Alert, TextInput, Image} from 'react-native';

export default class Login extends React.Component{
    state = {
        email: '',
        password: '',
        name: '',
        uid: ''
    }

    signup(){
        auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then((resp) => {
            auth().currentUser.sendEmailVerification().catch(err => console.log(err))
            Alert.alert('Please verify your email. It may be in your junk folder')
            resp.user.updateProfile({displayName: this.state.name})
            this.setState({uid: resp.user.uid})
            firestore().collection('Users').doc(resp.user.uid).set({
                name : this.state.name,
                password : this.state.password,
                email : this.state.email,
                wallet : 0,
                admin : false,
                pastOrders : 'False',
                currentOrder : {}
            })
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            this.setState({errorMessage: 'Email address already in use!'})
          }
          if (error.code === 'auth/invalid-email') {
            this.setState({errorMessage: 'Invalid Email!'})
          }
          this.setState({errorMessage: error.message})
        })
        auth().signOut().catch(err => console.log(err))
    }    

    render(){
        return (
            <ScrollView  contentContainerStyle={{flexGrow: 1}} persistentScrollbar= {true} styles={styles.scroll} >
            <ImageBackground source={require('./pdc_image_blur.png')} style={styles.container}>
              <Text style={styles.titleText}> PDC ONLINE</Text>
              {this.state.errorMessage && <Text style={styles.subtitleText}>{this.state.errorMessage}</Text>}
              <Text style={styles.subtitleText}> Name</Text>
              <TextInput style={styles.TextInput} onChangeText={name => this.setState({name: name})} value={this.state.name} placeholder='Enter your full name' textAlign={'center'} ></TextInput>
              <Text style={styles.subtitleText}> Email</Text>
              <TextInput style={styles.TextInput} onChangeText={email => this.setState({email: email})} value={this.state.email} placeholder='rollnumber@lums.edu.pk' textAlign={'center'}  ></TextInput>
              <Text style={styles.subtitleText}> Password</Text>
              <TextInput style={styles.TextInput} onChangeText={pass => this.setState({password: pass})} value={this.state.password} placeholder='password' secureTextEntry textAlign={'center'} ></TextInput>
              <TouchableOpacity onPress={() => this.signup()} style={styles.button}>
                <Text style={{color: 'white', fontSize: 17}}>Sign up</Text>
            </TouchableOpacity>
            </ImageBackground>
            </ScrollView>
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
    textShadowOffset:  {width: -3, height: 3} ,
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
},
button: {
    backgroundColor: '#E9446A',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 4,
    borderColor: '#CA2161',
    borderWidth: 1,
    height: 52,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center'   
}
});
  