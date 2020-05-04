import 'react-native-gesture-handler';
//import React from 'react';
import * as  React from 'react';


import {NavigationContainer, DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,} from '@react-navigation/native';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons'
import {SafeAreaView, ImageBackground, StyleSheet, Text, View, Alert, Image, ScrollView,TouchableOpacity} from 'react-native';
import {DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,ProgressBar,Colors,withTheme,Card,Button,Appbar,Title,Paragraph,Provider as PaperProvider } from 'react-native-paper';

  var  globalTheme =  {
    ...PaperDefaultTheme,
    roundness: 2,
    colors: {
      ...PaperDefaultTheme.Colors,
      primary: '#E9446A',
      accent: '#f1c40f',
    },
    };
 class SessionMenu extends React.Component {
  render(){
    return (
   <ScrollView>

   
     
     <Appbar theme = {globalTheme} >
     
     <Icon style={{marginLeft: '3%'}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} /* on clicking this icon we get a side tab/drawer */ />
     <Title  style = {styles.titleText} >Menu</Title>
     </Appbar>
   <Card  onPress={()=>{ this.props.navigation.navigate('sehri')}}>
 
    <Card.Content>
      <Title>Sehri</Title>
      
    </Card.Content>
    <Card.Cover source={require('./sehri.jpeg')}  />
    <Card.Actions>
      
    </Card.Actions>
  </Card>
  <Card  onPress={()=>{ this.props.navigation.navigate('iftari')}}>
 
 <Card.Content>
   <Title>Iftari</Title>
   
 </Card.Content>
 <Card.Cover source={require('./iftari.jpeg')}  />
 <Card.Actions>
   
 </Card.Actions>
</Card>

 <Card
 onPress={()=>{ this.props.navigation.navigate('breakfast')}}>
  
    <Card.Content>
      <Title>Breakfast</Title>
      
   
    </Card.Content>
    
    <Card.Cover  source={require('./breakfast.jpeg')} />
  

       <Card.Actions>
    
    </Card.Actions>
  </Card>
  <Card onPress={()=>{ this.props.navigation.navigate('lunch')}}>
   
    <Card.Content>
      <Title>Lunch</Title>
     
    </Card.Content>
    <Card.Cover source={require('./lunch.jpeg')} />
    <Card.Actions>
      
    </Card.Actions>
  </Card>

  <Card  onPress={()=>{ this.props.navigation.navigate('dinner')}}>
 
    <Card.Content>
      <Title>Dinner</Title>
      
    </Card.Content>
    <Card.Cover source={require('./dinner.jpg')}  />
    <Card.Actions>
      
    </Card.Actions>
  </Card>
</ScrollView>

   
       
   );
  }
}

const styles = StyleSheet.create({   //This sheet is associated only with this screen i.e the sessionsMenu screen
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
    backgroundColor:'#E9446A',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: '2%',
    paddingLeft: '30%',
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
    
    position: 'relative'
  },
  row: {
    flex: 1,
    backgroundColor:'#E9446A',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }   
 });

 export default withTheme(SessionMenu)