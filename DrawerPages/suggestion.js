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
            Alert.alert("Your suggestion has been submitted. Thank you!")
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
            <TouchableOpacity onPress={() => this.publishSuggestion()} style={styles.button}>
                <Text style={{color: 'white', fontSize: 17}} title="Submit" >Submit</Text>
            </TouchableOpacity>        
        </View>
    )
  }
}
//<Button color={'#9e79d9'} title='Submit' onPress={() => this.publishSuggestion() }></Button>
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
  