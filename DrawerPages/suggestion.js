import React from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {ImageBackground, ActivityIndicator, Button, FlatList ,StyleSheet,TouchableOpacity, Text, View, Alert, TextInput, Image} from 'react-native';
import moment from "moment";

export default class Suggestion extends React.Component{
  
  constructor(props){
    super(props)
    this.state = ({
      email: auth().currentUser.email,      //User email and..
      name: auth().currentUser.displayName, //..user name is extracted from the database
      suggestion: ''                        //This variable stores the suggestion that the user writes themself
    })  
  }
 
  async publishSuggestion(){                                          //A function created to store the suggestion a user enters, to the database.
      const reviewCollection = firestore().collection('Suggestions')  //This variable is a reference to the suggestions collection in the database.
                                                                      //Using this we can get all content in and and save data to this collection
      reviewCollection.add({            //The suggestion, entered by the user, is stored in the database by calling the builtin add function of firestore
          name : this.state.name,
          email : this.state.email,
          suggestion: this.state.suggestion,
          created: firebase.firestore.Timestamp.fromDate(new Date()),   //This timestamp variable is stored so we can sort our suggestions by time when fetching them
          time: moment()
          .utcOffset('+05:00')
          .format('DD-MM-YYYY hh:mm:ss a')
      }).then(()=> {
            Alert.alert("Your suggestion has been submitted. Thank you!")   //A message being displayed after the suggestion is successfully stored
        })
      .catch((err)=> {
          console.log(err)
      })
  } 
  render(){
 
    return(
        <View style={styles.container}>
           <Text style={styles.subtitleText}> Help Us Improve! </Text>
            <Image style={styles.Img} source={require('../MainAppPages/images/suggestion-box.jpg')}
              />
              
            <TextInput style={styles.TextInput} onChangeText={input => this.setState({suggestion:input})} value={this.state.suggestion} placeholderTextColor={'dimgrey'}  placeholder='Write your suggestion here' textAlign={'center'} ></TextInput>
            <TouchableOpacity onPress={() => this.publishSuggestion()} style={styles.button} /*A button like object created that calls a function on pressing it */ >
                <Text style={{color: 'black', fontSize: 17}} title="Submit" >Submit</Text>
            </TouchableOpacity>        
        </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e2ffdb',
      alignItems: 'center',
      justifyContent: 'center'
    },
    subtitleText: {
      marginTop: '0%',
      marginBottom: '4%',
      fontSize: 33, 
      color: 'black'
    },
    TextInput:{
      marginTop: '1%',
      marginBottom: '1%',
      height: 40, 
      width: '60%',
      borderBottomWidth: 1,
      marginBottom: '4%',
      borderColor: 'darkgrey'
    },
    Img: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      marginBottom: '2%',
      height: 220,
      width: 376
    },
    button: {
      backgroundColor: '#a981e6',
      marginVertical: '4%',
      borderRadius: 4,
      borderColor: 'black',
      borderWidth: 1,
      height: 53,
      width: 140,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  