import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ImageBackground, Button, StyleSheet, Text, View, Alert, Image, ScrollView} from 'react-native';
 

export default class Login extends React.Component {
  render(){
    return (
      <ScrollView>
        <View style={styles.container}>
            
           <Text style={styles.titleText}>Sessions</Text>
                  
           <Image style={styles.Img} source={require('./breakfast.jpeg')} />
           <Text style={styles.sessioname}>Breakfast</Text>
           
           <Image style={styles.Img} source={require('./lunch.jpg')} />
           <Text style={styles.sessioname}>Lunch</Text>
           
           <Image style={styles.Img} source={require('./dinner.jpeg')} />
           <Text style={styles.sessioname}>Dinner</Text>
       
        </View>
     </ScrollView>
       
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  titleText: {
    fontSize: 30,
    paddingTop: '1%',
    paddingBottom: '1%',
    fontWeight: "bold",
    color: 'black'
  },
  Img: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 220,
    width: 380
  },
  sessioname: {
    fontSize: 25,
    paddingBottom: '6%',
    color: 'black'
  }
});
