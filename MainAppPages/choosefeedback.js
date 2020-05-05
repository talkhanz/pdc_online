import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons'
import {Button, StyleSheet, View, Image,BackHandler,ScrollView,TouchableOpacity} from 'react-native';
import { StackActions, 
  DefaultTheme as NavigationDefaultTheme,
 DarkTheme as NavigationDarkTheme, } from '@react-navigation/native';
import {
  Provider as PaperProvider,
  useTheme,
  Avatar,
  Title,
  Card,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Drawer as PaperDrawer,
  IconButton,
  DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,

} from 'react-native-paper';

export default class choosefeedback extends React.Component {
  
  render(){
    return ( 
      <View>   
        <Card onPress={() =>this.props.navigation.navigate('reviewAdmin')}>
        <Card.Content>         
        <Card.Cover source={require('./images/review.jpg')} />
          <Text style={styles.sessioname}>Customer Reviews</Text>
          </Card.Content>

        </Card>
        <Card onPress={() =>this.props.navigation.navigate('suggestionAdmin')}>
        <Card.Content>   
          <Card.Cover source={require('./images/suggestion-box.jpg')} />
          <Text style={styles.sessioname}>Suggestions by Customers</Text>
          </Card.Content>   
        </Card>
        </View>

         
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
    marginLeft: '2.5%',
    borderWidth: 5,
    marginTop: '12%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 250, 
    width: '95%'
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '88%',
    width: '100%'
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