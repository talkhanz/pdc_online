import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ImageBackground, Button, StyleSheet,TouchableOpacity, Text, View, Alert, TextInput, Image} from 'react-native';

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
            this.setState({uid: resp.user.uid})
            return firestore().collection('Users').doc(resp.user.uid).set({
                name : this.state.name,
                password : this.state.password,
                email : this.state.email,
                wallet : '0',
                admin : false,
                pastOrders : 'False',
                currentOrder : {}
            }).then(() => console.log('User added to Firestore!'))
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
        
    }    

    render(){
        return (
            <ImageBackground source={require('./pdc_image_blur.png')} style={styles.container}>
              <Text style={styles.titleText}> PDC ONLINE</Text>
              {this.state.errorMessage && <Text style={styles.subtitleText}>{this.state.errorMessage}</Text>}
              <Text style={styles.subtitleText}> Name</Text>
              <TextInput style={styles.TextInput} onChangeText={name => this.setState({name: name})} value={this.state.name} placeholder='Enter your full name' textAlign={'center'} ></TextInput>
              <Text style={styles.subtitleText}> Username</Text>
              <TextInput style={styles.TextInput} onChangeText={email => this.setState({email: email})} value={this.state.email} placeholder='rollnumber@lums.edu.pk' textAlign={'center'}  ></TextInput>
              <Text style={styles.subtitleText}> Password</Text>
              <TextInput style={styles.TextInput} onChangeText={pass => this.setState({password: pass})} value={this.state.password} placeholder='password' secureTextEntry textAlign={'center'} ></TextInput>
              <TouchableOpacity style={styles.button}>
                <Text style={{color: 'white', fontSize: 17}} onPress={() => this.signup()}>Sign up</Text>
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
    marginVertical: 10,
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
},
button: {
    backgroundColor: '#E9446A',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 4,
    borderColor: '#CA2161',
    borderWidth: 1,
    height: 52,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center'   
}
});
  