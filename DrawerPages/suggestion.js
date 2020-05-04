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
      email: auth().currentUser.email,
      name: auth().currentUser.displayName,
      suggestion: ''
    })
  }
 
  async publishSuggestion(){ 
      const reviewCollection = firestore().collection('Suggestions')
      
      reviewCollection.add({   
          name : this.state.name,
          email : this.state.email,
          suggestion: this.state.suggestion,
          created: firebase.firestore.Timestamp.fromDate(new Date()),
          time: moment()
          .utcOffset('+05:00')
          .format('DD-MM-YYYY hh:mm:ss a')
      }).then(()=> {
           
        })
      .catch((err)=> {
          console.log(err)
      })
  } 
  render(){
 
    return(
        <View style={styles.container}>
            <Text style={styles.subtitleText}>Suggestions</Text>
            <TextInput style={styles.TextInput} onChangeText={input => this.setState({suggestion:input})} value={this.state.suggestion} placeholder='Write your suggestion here' textAlign={'center'} ></TextInput>
            <Button styles={styles.button} title='Submit' onPress={() => this.publishSuggestion() }></Button>        
        </View>
      
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'gainsboro',
      alignItems: 'center'
      
    },
    subtitleText: {
        marginVertical: 7,
        fontSize: 33, 
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset:  {width: -3, height: 3} ,
        textShadowRadius: 10
    },
    TextInput:{
      marginVertical: 5,
      height: 40, 
      width: '60%',
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
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 100
    }   
  });
  