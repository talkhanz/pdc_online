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
    this.backhandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if(this.props.navigation.isFocused()){
        BackHandler.exitApp() 
      }
    })
  }
  
  render(){
    return (  
      <View> 
        <Appbar style={styles.Appbar}>
        <Title  style = {styles.titleText} >Admin Home</Title>
          <Icon style={{marginLeft:'100%'}}  onPress={() =>{
              auth().signOut().catch(err => console.log(err));            // signs out user
              this.props.navigation.closeDrawer()                         // closes the drawer
              this.props.navigation.dispatch(StackActions.popToTop());    // clears all screens from stack except 1st login screen so user is navigated to login screen
            }} style={{marginLeft: 17}} name='ios-log-out' size={40} /* This is our drawer that has been defined with the repective screens in App.js */ />    


            </Appbar>
        
     <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} /* allows us to scroll */ > 
    <Card>
    <Card.Content>
    <BackgroundImage source={require('/blueBackground_screen.jpg')} >
    
    <Card style={styles.container} onPress={()=>{ this.props.navigation.navigate('adminVerifyOrder')}}>
      <Card.Content >
        <Card.Cover style= {styles.Img}  source={require('./VERIFYORDER.jpg')}  /> 
      </Card.Content >
    </Card>
  
    <Card style={styles.container} onPress={()=>{ this.props.navigation.navigate('adminManageVouchers')}}>
      <Card.Content >
        <Card.Cover style= {styles.Img}   source={require('./voucher.png')}  />
      </Card.Content >
    </Card>

    <Card style={styles.container} onPress={() => this.props.navigation.navigate('choosefeedback')} >
      <Card.Content >
        <Card.Cover style= {styles.Img}  source={require('./images/feedback.png')} />
      </Card.Content>
    </Card>
    </BackgroundImage>
    </Card.Content>
  </Card>
          
     </ScrollView>
     </View> 
     
   );
  }
}

const styles = StyleSheet.create({
  container: {
  },
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
    height: 45,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: 'black'
  },
  Img: {
    borderWidth: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 255,
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