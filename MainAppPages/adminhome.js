import 'react-native-gesture-handler';
import React from 'react';
import { StackActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons'
import { StyleSheet,  View, Image,BackHandler,ScrollView,TouchableOpacity} from 'react-native';
import { 
  DefaultTheme as NavigationDefaultTheme,
 DarkTheme as NavigationDarkTheme, } from '@react-navigation/native';
import {
  Provider as PaperProvider,
  useTheme,
  Avatar,
  Title,
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
    primary: '#E9446A',
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
        
     <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} /* allows us to scroll */ > 
        <Appbar style={styles.row}>
          <Text style={styles.titleText}>Admin Home</Text>
          <View style={{marginRight:'3%'}}>
          <Icon  onPress={() =>{
              auth().signOut().catch(err => console.log(err));            // signs out user
              this.props.navigation.closeDrawer()                         // closes the drawer
              this.props.navigation.dispatch(StackActions.popToTop());    // clears all screens from stack except 1st login screen so user is navigated to login screen
            }} style={{marginLeft: 17}} name='ios-log-out' size={40} /* This is our drawer that has been defined with the repective screens in App.js */ />    
            <Text style={{fontSize:17, marginTop:-5}}>Sign Out</Text>
          </View>

            </Appbar>
        <Card  onPress={()=>{ this.props.navigation.navigate('adminVerifyOrder')}}>
 
    <Card.Content>
      <Title>Verify Order</Title>
      
    </Card.Content>
    <Card.Cover source={require('./qrscan.jpg')}  />
   
  </Card>
  <Card  onPress={()=>{ this.props.navigation.navigate('salesLogs')}}>
 
 <Card.Content>
   <Title>Sales Logs</Title>
   
 </Card.Content>
 <Card.Cover source={require('./logs.jpg')}  />

</Card>
<Card  onPress={()=>{ this.props.navigation.navigate('adminManageVouchers')}}>
 
 <Card.Content>
   <Title>Manage Vouchers</Title>
   
 </Card.Content>
 <Card.Cover source={require('./voucher.png')}  />

</Card>
         
          
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
    marginRight: '10%',
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