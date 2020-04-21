import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View, StyleSheet, Alert} from 'react-native';

export default class breakfast extends React.Component {
    render(){
      return (
        <View style={styles.titleback}>
            <Text style={styles.titleText}>Menu</Text>
        </View>
     );
    }
  }
  
  const styles = StyleSheet.create({
    titleText: {
        fontSize: 30,
        textAlign:'center',
        fontWeight: "bold",
        color: 'black'
      },
      titleback: {
        backgroundColor:'pink',
        alignSelf: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: '7%',
        width: '95%'
      }
   });
  