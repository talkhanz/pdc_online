import 'react-native-gesture-handler';
import * as React from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {createDrawerNavigator,DrawerContentScrollView,DrawerItem,DrawerItemList} from '@react-navigation/drawer';
import {ImageBackground, StyleSheet, View, Alert, TextInput, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Fontisto'
import profile from './MainAppPages/profile.js';         //importing componenets/screens from their files

import login from './MainAppPages/login';         //importing componenets/screens from their files
import sessionsMenu from './MainAppPages/sessionsMenu';
import breakfast from './MainAppPages/breakfast';
import lunch from './MainAppPages/lunch';
import dinner from './MainAppPages/dinner';
import cart from './MainAppPages/cart';
import signup from './MainAppPages/signup';
import wallet from './DrawerPages/wallet';
import admin from './MainAppPages/adminhome';
import Sehri from './MainAppPages/sehri';
import Iftari from './MainAppPages/iftari';
import QRcode from './MainAppPages/qrCode';
import verifyOrder from './MainAppPages/adminVerifyOrder';
import salesLogs from './MainAppPages/salesLogs';
import review from './DrawerPages/Review';
import voucherManager from './MainAppPages/adminManageVouchers';
import suggestion from './DrawerPages/suggestion'
import chooseFeedback from './MainAppPages/choosefeedback';
import reviewAdmin from './MainAppPages/review_admin';
import suggestionAdmin from './MainAppPages/suggestion_admin';
import deleteAccount from './DrawerPages/deleteAccount'
import ForgotPassword from './MainAppPages/forgotPassword'
import MyOrder from './DrawerPages/currentOrder'

import { StackActions, 
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

  
const stack = createStackNavigator();        // stack container for the app main screens 
const drawer = createDrawerNavigator();      // drawer/side tab for screens in the side tab

class CustomDrawerComponent extends React.Component{
    
  // custom drawer to include a sign out button
  render(){                               // as default drawer does not have buttons
    return (
      <DrawerContentScrollView {...this.props}>
       <Text style={{color:'black',fontSize: 20,marginBottom: 20,fontWeight:'bold',alignSelf:'center'}}>PDC Online</Text>
       <Avatar.Image
            source={require('./MainAppPages/images/pdc_online_icon.png')}
            size={50}
          />
          
          <Title >{auth().currentUser.displayName}</Title>
          <Caption >@trensik</Caption>
       
        <View>
        <DrawerItem label="View Profile" onPress={()=>{this.props.navigation.navigate('profile')}} icon={()=>
          {
            return <Icon color='#E9446A' name='ios-person' size={40} />
          }
        }></DrawerItem>

          <DrawerItemList {...this.props} />
          <DrawerItem
            icon={()=>{return <Icon color='#E9446A' name='ios-log-out' size={40} />}}
            label="Sign Out"                                              // name of button
            onPress={() => {         // function that runs on pressing sign out button
              auth().signOut().catch(err => console.log(err));            // signs out user
              this.props.navigation.closeDrawer()                         // closes the drawer
              this.props.navigation.dispatch(StackActions.popToTop());    // clears all screens from stack except 1st login screen so user is navigated to login screen
            }}
          
          />
           
     
          </View>
      </DrawerContentScrollView>
    );
  }
}
function getGestureEnable(route) {    // function to disable opening drawer/side tab in login and sign up screens
  const routeName = route.state ?     // gets screen name from given route
      route.state.routes[route.state.index].name : (route.params?.screen || 'Login'); 

  switch (routeName) {    // switch case for the screens for whether to disable drawer or not
    case 'Login':   return false;
    case 'signup':  return false;
    case 'ForgotPassword':  return false;
    case 'adminhome':  return false;
    case 'adminVerifyOrder':  return false;
    case 'salesLogs':  return false;
    case 'adminManageVouchers':  return false;
    case 'choosefeedback':  return false;
    case 'reviewAdmin':  return false;
    case 'suggestionAdmin':  return false;
    default:        return true         // drawer is true for all other screens
  }
}
class AppStack extends React.Component {    // Stack of all screens for navigating in app
  render(){
    return(
      <stack.Navigator initialRouteName="Login" /* Intital screen is set to our login screen */ >  
        <stack.Screen name="Login" component={login} navi={this.props.navigation} options={{ gestureEnabled: false, headerShown: false}}/>
        <stack.Screen name="ForgotPassword" component={ForgotPassword} navi={this.props.navigation} options={{ gestureEnabled: false, headerShown: false}}/>
        <stack.Screen name="signup" component={signup} options={{ headerShown: false}}/>
        <stack.Screen name="profile" component={profile} navi={this.props.navigation} options={{ gestureEnabled: false, headerShown: false}}/>
        <stack.Screen name="Sessions Menu" component={sessionsMenu} options={{ headerShown: false}}/>
        <stack.Screen name="breakfast" component={breakfast} options={{ headerShown: false}}/>
        <stack.Screen name="lunch" component={lunch} options={{ headerShown: false}}/>
        <stack.Screen name="dinner" component={dinner} options={{ headerShown: false}}/>
        <stack.Screen name="cart" component={cart} options={{ headerShown: false}}/>
        <stack.Screen name="adminhome" component={admin} options={{ headerShown: false}}/>
        <stack.Screen name="sehri" component={Sehri} options={{ headerShown: false}}/>
        <stack.Screen name="iftari" component={Iftari} options={{ headerShown: false}}/>
        <stack.Screen name="qrCode" component={QRcode} options={{ headerShown: false}}/>
        <stack.Screen name="adminVerifyOrder" component={verifyOrder} options={{ headerShown: false}}/>
        <stack.Screen name="salesLogs" component={salesLogs} options={{ headerShown: false}}/>
        <stack.Screen name="adminManageVouchers" component={voucherManager} options={{ headerShown: false}}/>
        <stack.Screen name="choosefeedback" component={chooseFeedback} options={{ headerShown: false}}/>
        <stack.Screen name="reviewAdmin" component={reviewAdmin} options={{ headerShown: false}}/>
        <stack.Screen name="suggestionAdmin" component={suggestionAdmin} options={{ headerShown: false}}/>
      </stack.Navigator>
    )
  }
}
export default class App extends React.Component {  // this is the first component that runs in the app. Contains the drawer which contains the main app stack
    
  render(){
  return (
    <PaperProvider theme={globalTheme}>
   <NavigationContainer theme={globalTheme} >
     <drawer.Navigator theme ={globalTheme} initialRouteName='Main Menu' drawerContent={(props) => <CustomDrawerComponent {...props} />} drawerStyle={{backgroundColor: '#FFDAE3',width: 240}}>
        <drawer.Screen name='Main Menu' component={AppStack} options={({ route }) => ({drawerIcon:()=>{return <Icon color='#E9446A' name='ios-beer' size={40} />},gestureEnabled: getGestureEnable(route) })}/>
        <drawer.Screen name='Wallet' component={wallet} options={{drawerIcon:()=>{return <Icon color='#E9446A' name='ios-wallet' size={40} />}}}/>
        <drawer.Screen name='My Order' component={MyOrder} options={({ route }) => ({drawerIcon:()=>{return <Icon color='#E9446A' name='ios-beer' size={40} />},gestureEnabled: getGestureEnable(route) })}/>
        <drawer.Screen name='Post a Review' component={review} options={{drawerIcon:()=>{return <Icon color='#E9446A' name='ios-book' size={40} />}}}/>
        <drawer.Screen name='Got any Suggestions?' component={suggestion} options={{drawerIcon:()=>{return <Icon2 color='#E9446A' name='comment' size={27} />}}}/> 
        <drawer.Screen name="Delete Account" component={deleteAccount} options={{ drawerIcon:()=>{return <Icon color='#E9446A' name='ios-cog' size={40} />}}}/>
     </drawer.Navigator>  
   </NavigationContainer>
   </PaperProvider>
  );
}
}
