import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, useNavigationState} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ImageBackground, Button, ScrollView ,StyleSheet,TouchableOpacity, Text, View, Alert, TextInput, Image} from 'react-native';

export default class Login extends React.Component {
  state = {           // State of login component. State is data that can be used by component and changes over time
    user: null,       // The user that signs in. Will contain user details. Null by default
    verified: false,       // Boolean for whether user has verified email
    verifiedReset: false,
    email: '',             // user email
    password: '',          // user password
    errorMessage: null,    // Will contain all error messages to display on screen
    admin: false           // Variable for whether user is admin or not
  }

    componentDidMount(){      // Built in function that runs when component renders for the first time
    auth().onAuthStateChanged( user => {
      this.setState({user: user})                     // When a user logs in, the variable user in state is set to the user's unique details
      if(user != null){   
        firestore().collection('Users').doc(user.uid).get()
       .then(doc => this.setState({admin: doc.data().admin}))
       .catch(err => console.log(err))                            // After a user logs in, this condition becomes true 
        this.setState({verified: user.emailVerified}) // When a user logs in, the verified variable in state is set to the value of verfied of the user
      }
      
    })
  }

  async signin(){
      var email = this.state.email               // A function for sign in that is run when the user presses login after entering their details
      var password = this.state.password
      if(email == ''){  // If user enters nothing, value is changed from empty string to avoid error of empty string
        email = ' '
      }
      if(password == ''){  // If user enters nothing, value is changed from empty string to avoid error of empty string
        password = ' '
      }
      await auth().signInWithEmailAndPassword(email, password) // Details of the username and password are checked from the database. 
            .then(user=>{
                if(auth().currentUser.emailVerified == false){  // If email isn't verified, user is singed out
                  auth().signOut().catch(err => console.log(err))  
                  this.setState({errorMessage: 'Please verify your email'})
                }
                else{

                }

                firestore().collection('Users').doc(user.user.uid).get() // Database is checked for whether user is admin or not
                .then(doc => this.setState({admin: doc.data().admin}))  // Sets admin variable in state to true for admin or false for other users
                .catch(err => console.log(err))
            })
            .catch(err => {this.setState({errorMessage: err.message}) // In case of wrongly entered details, an error is set to the errorMessage variable in state
            })
    }

  render(){ 
    if(this.props.route.params){  // sets state verified variable to false after deleting account
      if(this.state.verifiedReset == false){
        this.setState({verified: this.props.route.params.verified})
        this.setState({verifiedReset: true})
      }
    }
    if(!this.state.user || !this.state.verified){
        return (
          <ScrollView  contentContainerStyle={{flexGrow: 1}} persistentScrollbar= {true} styles={styles.scroll} >
            <ImageBackground source={require('./images/pdc_image_blur.png')} style={styles.container}>
            <Text style={styles.titleText}> PDC ONLINE</Text>
            {this.state.errorMessage && <Text style={styles.subtitleText}>{this.state.errorMessage}</Text>}
            <Text style={styles.subtitleText}> Email</Text>
            <TextInput style={styles.TextInput} onChangeText={email => this.setState({email: email})} value={this.state.email} placeholder='Email' textAlign={'center'}  ></TextInput>
            <Text style={styles.subtitleText}> Password</Text>
            <TextInput style={styles.TextInput} onChangeText={pass => this.setState({password: pass})} value={this.state.password} placeholder='Password' secureTextEntry textAlign={'center'} ></TextInput>
            <TouchableOpacity onPress={() => this.signin()} style={styles.button}>
                <Text style={{color: 'white', fontSize: 17}} title="Login" >Login</Text>
            </TouchableOpacity>
            <Text style={styles.subtitleText} onPress={() => this.props.navigation.navigate('ForgotPassword')}> Forgot your password?</Text>
            <Text style={styles.subtitleText}> New to PDC Online?<Text style={{color: '#E9446A'}} onPress={() => this.props.navigation.navigate('signup')}> Sign up</Text></Text>
            </ImageBackground>
          </ScrollView>         
        )
    }
    if(this.state.admin == true){
      return(
        <View>{
          this.props.navigation.navigate('adminhome')
          }
        </View>
      )
    }
    else if(this.state.admin == false){
      return(
        <View>{
          this.props.navigation.navigate('Sessions Menu')
          }
        </View>
      )
    }
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
