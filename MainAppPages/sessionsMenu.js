import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons'
import {SafeAreaView, ImageBackground, Button, StyleSheet, Text, View, Alert, Image, ScrollView,TouchableOpacity} from 'react-native';

/*
elevation:3,
backgroundColor: '#fff',
shadowOffset: {width:1,height:1},
shadowColor: '#333',
shadowOpacity: 0.3,
shadowRadius: 2,
marginHorizontal:4,
marginVertical:6
*/

export default class SessionMenu extends React.Component {
  
  render(){
    return (    
     <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} >

        <View style={styles.row}>
            <Icon style={{marginHorizontal: 100}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} />
            <Text style={styles.titleText}>Sessions</Text>
              <Icon style={{marginHorizontal:100}} onPress={() => this.props.navigation.navigate('cart')} name='md-cart' size={40} />
            </View>
        <View style={styles.titleback}>
         
          <TouchableOpacity onPress={() => this.props.navigation.navigate('sehri')}>
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./sehri.jpeg')} />
              <Text style={styles.sessioname}>Sehri</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('iftari')}>
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./iftari.jpeg')} />
              <Text style={styles.sessioname}>Iftari</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('breakfast')}>
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./breakfast.jpeg')} />
              <Text style={styles.sessioname}>Breakfast</Text>
              </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => this.props.navigation.navigate('lunch')}>
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./lunch.jpeg')} />
              <Text style={styles.sessioname}>Lunch</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('dinner')}>
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./dinner.jpg')} />
              <Text style={styles.sessioname}>Dinner</Text>
            </View>
          </TouchableOpacity>
        
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
    justifyContent: 'center',
    flexDirection: 'row'
  }   
 });