import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons'
import {SafeAreaView, ImageBackground, Button, StyleSheet, Text, View, Alert, Image, ScrollView,TouchableOpacity} from 'react-native';

export default class SessionMenu extends React.Component {
  
  render(){
    return (    
     <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} > 
        <View style={styles.row}>
            
            <Icon style={{marginLeft: '3%'}} onPress={() =>           //On tapping the three horizontal bar icon on the top left, this fuction is called which shows the drawer
              this.props.navigation.openDrawer()} name='md-menu' size={40} // This is our drawer that has been defined with the repective screens in App.js
              />       
            <Text style={styles.titleText}>Sessions</Text>
              <Icon style={{marginRight: '3%'}} onPress={() =>                 //This function runs when the shopping cart icon in the top right corener is pressed
                this.props.navigation.navigate('cart')} name='md-cart' size={40} //This leads us to our shopping cart screen that has all the items that we added to it. In our shopping cart screen we will also place our order
                /> 
            </View>
        <View style={styles.titleback}>
         
          <TouchableOpacity 
            onPress={() =>                           //On tapping the sehri window, this function is called to display the sehri menu 
            this.props.navigation.navigate('sehri')} //This directs the user to the sehri page
            > 
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./sehri.jpeg')} //This displays the image seen in the box associated with sehri
              />
              <Text style={styles.sessioname}>Sehri</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() =>            //On tapping the iftari window, this function is called to display the iftari menu
            this.props.navigation.navigate('iftari') //This directs the user to the iftari page
            }>
            
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./iftari.jpeg')} //This displays the image seen in the box associated with iftari
              />
              <Text style={styles.sessioname}>Iftari</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() =>              //On tapping the breakfast window, this function is called to display the iftari menu
            this.props.navigation.navigate('breakfast') //This directs the user to the breakfast page
            }>
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./breakfast.jpeg')} //This displays the image seen in the box associated with breakfast
              /> 
              <Text style={styles.sessioname}>Breakfast</Text>
              </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() =>          //On tapping the lunch window, this function is called to display the lunch menu
            this.props.navigation.navigate('lunch') //This directs the user to the lunch page
            }>
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./lunch.jpeg')} //This displays the image seen in the box associated with lunch
              />
              <Text style={styles.sessioname}>Lunch</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() =>           //On tapping the dinner window, this function is called to display the dinner menu
            this.props.navigation.navigate('dinner') //This directs the user to the dinner page
            }>
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./dinner.jpg')} //This displays the image seen in the box associated with dinner
              />
              <Text style={styles.sessioname}>Dinner</Text>
            </View>
          </TouchableOpacity>
        
        </View>
     </ScrollView>
   );
  }
}

const styles = StyleSheet.create({   //This stylesheet is associated only with this screen i.e the sessionsMenu screen
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  box: {
    alignItems: 'center',
    borderWidth: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 267,
  },
  cart:{
    alignItems: 'center',
    paddingLeft: 100 ,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 45,
    width : 45
  },
  titleback: {
    backgroundColor:'navajowhite',
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: '2%',
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
  },
  scroll: {
    flexDirection: 'column',
    borderStyle: 'solid',
    position: 'relative'
  },
  row: {
    flex: 1,
    backgroundColor:'#f46a',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }   
 });