import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
//import auth from '@react-native-firebase/auth';
import {ImageBackground, Button, StyleSheet, Text, View, Alert, TextInput, Image} from 'react-native';

export default class Userdata extends React.Component{
    state = {
        userIDs: null,
        userFields: [],
    }

    async componentDidMount(){
        var IDs = []
        var Fields = []

        await firebase.firestore().collection('Users').get()
        .then(snapshot => {
            snapshot.forEach( doc => {
                Fields.push(doc.data())
                IDs.push(doc.id)
                console.log('88888')
            })
            this.setState({userIDs: IDs})
            this.setState({userFields: Fields})
        })
        .catch(err => console.log(err))
    }

    render(){
        var index = -1
        return(
            <View style={styles.container}>{
                this.state.userIDs &&
                this.state.userIDs.map( id => {
                    index++
                    var fieldData = JSON.stringify(this.state.userFields[index], (k, v) => { return v === undefined ? null : v; })
                    var newFieldData = fieldData.replace(/,/g, "\n")
                    console.log(newFieldData)
                    return(
                    <View>
                    <Text style={styles.titleText}>{id}</Text>
                    <Text style={styles.subtitleText}>{newFieldData} {'\n'}</Text>
                    </View>
                    )
                })
            
            }</View>
        )        
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
     // justifyContent: 'center'
    },
    titleText: {
        fontSize: 20, 
        fontWeight: "bold",
        color: 'black',
      },
    subtitleText: {
      marginVertical: 3,
      fontSize: 20, 
      color: 'black',
    }
  });
  