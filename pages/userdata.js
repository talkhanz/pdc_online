import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ImageBackground, Button, StyleSheet, Text, View, ScrollView, Alert, TextInput, Image} from 'react-native';
import { showUser } from '../firestoreSetup';

export default class Userdata extends React.Component{
    state = {
        userIDs: [],
        userFields: [],
    }

    componentDidMount(){
        showUser()
        .then((returned) => {
            this.setState({userIDs: returned.key1 , userFields: returned.key2})
        })
        .catch(error => console.log(error))
    }

    render(){
        var index = -1
        return(
            <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} >
            <View style={styles.container}>{
                this.state.userIDs &&
                this.state.userIDs.map( id => {
                    index++
                    var fieldData = JSON.stringify(this.state.userFields[index], (k, v) => { return v === undefined ? null : v; })
                    var newFieldData = fieldData.replace(/,/g, "\n")
                    return(
                    <View>
                    <Text style={styles.titleText}>{id}</Text>
                    <Text style={styles.subtitleText}>{newFieldData} {'\n'}</Text>
                    </View>
                    )
                })   
            }</View>
                 </ScrollView>

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
  