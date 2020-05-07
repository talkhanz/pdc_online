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
import {SafeAreaView, ImageBackground, StyleSheet,BackHandler, Text, View, Alert, Image, ScrollView,TouchableOpacity} from 'react-native';
import {DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,ProgressBar,Colors,withTheme,Card,Button,Appbar,Title,Paragraph,Provider as PaperProvider } from 'react-native-paper';


 class SessionMenu extends React.Component {
  componentDidMount(){    
    this.backhandler = BackHandler.addEventListener("hardwareBackPress", () => {  // if user presses back button on device from this screen, the app exits
      if(this.props.navigation.isFocused()){
        BackHandler.exitApp() 
      }
    })
  }

  render(){
    return (
      <View>
      <Appbar style={styles.Appbar} /* A component to display action items in a bar */ > 
     
      <Icon style={{marginLeft: '3%'}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} /* on clicking this icon we get a side tab/drawer */ />
      <Title  style = {styles.titleText} >Menu</Title>
      </Appbar>
            <ScrollView >
              
              <Card style={styles.screen} /*Card is a react-native-paper module that is Material Design Compliant & Provides responsive components */
                onPress={()=>{ this.props.navigation.navigate('sehri')}}/* navigates to sehri screen if card pressed */> 

                    <Card.Content>
                    <Title style={styles.title}>Sehri</Title>

                      
                    </Card.Content>
                    <Card.Cover style={styles.box} source={require('./images/VIEWSEHRI.jpg')} /*contains image for the card */ />


              </Card>
              <Card style={styles.screen} onPress={()=>{ this.props.navigation.navigate('iftari')}}/* navigates to iftari screen if card pressed */>
          
                  <Card.Content>
                    <Title style={styles.title}>Iftari</Title>
                    
                  </Card.Content>
                  <Card.Cover  style={styles.box} source={require('./images/VIEWIFTARI.jpg')} /*contains image for the card */ />

                  </Card>

                  <Card style={styles.screen} 
                  onPress={()=>{ this.props.navigation.navigate('breakfast')}}/*navigates to breakfast*/> 
                    
                      <Card.Content>
                        <Title style={styles.title}>Breakfast</Title>
                      </Card.Content>
                      
                      <Card.Cover style={styles.box} source={require('./images/VIEWBREAKFAST.jpeg')} /*contains image for the card */  />

                </Card>
                <Card style={styles.screen} onPress={()=>{ this.props.navigation.navigate('lunch')}}>
                
                    <Card.Content>
                      <Title  style={styles.title} >Lunch</Title>
                    
                    </Card.Content>
                    <Card.Cover style={styles.box} source={require('./images/VIEWLUNCH.jpeg')} /*contains image for the card */  />
                  
                </Card>

                  <Card style={{backgroundColor:'#FEDBD0',paddingBottom: '18%'}}  onPress={()=>{ this.props.navigation.navigate('dinner')}} /* navigates to sehri screen if card pressed */>
                
                      <Card.Content>
                        <Title  style={styles.title}>Dinner</Title>
                        
                      </Card.Content>
                      <Card.Cover style={styles.box} source={require('./images/dinner.jpeg')}  /*contains image for the card */   />

                  </Card>
          </ScrollView>
</View>

   
       
   );
  }
}

const styles = StyleSheet.create({  //This sheet is associated only with this screen i.e the sessionsMenu screen

  screen:{
    backgroundColor:'#FEDBD0'
  } , 
  title:{
    fontSize: 26
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  box: {
    borderWidth: 2,
    marginHorizontal: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 255,
  },
  Appbar: {
    backgroundColor:'#E9446A',
    height: 67
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: '2%',
    marginLeft:'30%',
    color: 'black'
  },
  Img: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 220,
  },
  scroll: {
    flexDirection: 'column',
    
    position: 'relative'
  }
 });

 export default withTheme(SessionMenu)