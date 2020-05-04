import 'react-native-gesture-handler';
import React from 'react';
import { StackActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons'
import {Button, StyleSheet, Text, View, Image,BackHandler,ScrollView,TouchableOpacity} from 'react-native';

export default class choosefeedback extends React.Component {
  
  render(){
    return (    
     //<ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} /* allows us to scroll */ > 
        <View >

          <TouchableOpacity onPress={() => this.props.navigation.navigate('reviewAdmin')} /* navigates to verifyOrder page onPress*/>  
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./images/review.jpg')} />
              <Text style={styles.sessioname}>Customer Reviews</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('suggestionAdmin')} /* navigates to verifyOrder page onPress*/>  
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./images/suggestion-box.jpg')} />
              <Text style={styles.sessioname}>Suggestions by Customers</Text>
            </View>
          </TouchableOpacity>
        
        </View>
     //</ScrollView>
     
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
    marginTop: '12%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 300,
    justifyContent: 'space-around' 
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
    marginRight: '10%',
    fontWeight: "bold",
    color: 'black'
  },
  Img: {
    marginTop: '7%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 220,
    width: 380
  },
  sessioname: {
    fontSize: 25,
    color: 'black'
  },
  scroll: {
    flexDirection: 'column',
    borderStyle: 'solid',
    position: 'relative'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'center',
    backgroundColor:'#f46a',
    height:60
  }   
 });