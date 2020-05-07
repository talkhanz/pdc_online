import 'react-native-gesture-handler';
import React from 'react';
import { StackActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons'
import { StyleSheet,  BackgroundImage,View, Image,BackHandler,ScrollView,TouchableOpacity} from 'react-native';
import { 
  DefaultTheme as NavigationDefaultTheme,
 DarkTheme as NavigationDarkTheme, } from '@react-navigation/native';
import {
  Provider as PaperProvider,
  useTheme,
  Avatar,
  Title,
  Appbar,
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
var  globalTheme =  {
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#',
    accent: '#f1c40f',
  },
  };

export default class adminhome extends React.Component {
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
        <Appbar style={styles.Appbar}>
        <Icon size={40}  />    

        <Title style = {styles.titleText} >Home</Title>
          <Icon style={{marginRight:'3%', marginLeft: '-10%'}} name='ios-log-out' size={40} onPress={() =>{
              auth().signOut().catch(err => console.log(err));            // signs out user
              this.props.navigation.closeDrawer()                         // closes the drawer
              this.props.navigation.dispatch(StackActions.popToTop());    // clears all screens from stack except 1st login screen so user is navigated to login screen
            }}  /* This is our drawer that has been defined with the repective screens in App.js */ />    

        </Appbar>
        
     <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} /* allows us to scroll */ > 
  
    
    
    <Card /*Card is a react-native-paper module that is Material Design Compliant & Provides responsive components */ 
     onPress={()=>{ this.props.navigation.navigate('adminVerifyOrder')}} /*This Card redirects the user to the screen where an admin can verify an order*/ >
      <Card.Content >
        <Title  style={styles.title}>Verify Order</Title>
        <Card.Cover style= {styles.Img}  source={require('./images/VERIFYORDER.jpg')} /*contains image for the card */  /> 
      </Card.Content >
    </Card>
  
    <Card  onPress={()=>{ this.props.navigation.navigate('adminManageVouchers')}} /*This Card redirects the user to the screen where an admin can verify an order*/ >
      <Card.Content >
        <Title  style={styles.title}>Manage Voucher</Title>
        <Card.Cover style= {styles.Img}   source={require('./images/voucher.png')} /*contains image for the card */ />
      </Card.Content >
    </Card>

    <Card style={{paddingBottom: '16%'}} onPress={() => this.props.navigation.navigate('choosefeedback')} /*This Card redirects the user to the screen where an admin can verify an order*/ >
      <Card.Content >
        <Title style={styles.title}>Feedback</Title>
        <Card.Cover style= {styles.Img}  source={require('./images/feedback.jpeg')} /*contains image for the card */ />
      </Card.Content>
    </Card>
  
          
     </ScrollView>
     </View> 
     
   );
  }
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 260,
  },
  Appbar: {
    backgroundColor:'#E9446A',
    height: 67,
    justifyContent: 'space-between'
  },
  title:{
    fontSize: 24
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: '2%',
    color: 'black',

  },
  Img: {
    borderWidth: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 255,
    marginHorizontal: '-2%'
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