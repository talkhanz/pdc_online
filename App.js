import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import {createDrawerNavigator,DrawerContentScrollView,DrawerItem,DrawerItemList} from '@react-navigation/drawer';
import {ImageBackground, Button, StyleSheet, Text, View, Alert, TextInput, Image} from 'react-native';

import login from './MainAppPages/login';
import userdata from './MainAppPages/userdata';
import sessionsMenu from './MainAppPages/sessionsMenu';
import breakfast from './MainAppPages/breakfast';
import lunch from './MainAppPages/lunch';
import dinner from './MainAppPages/dinner';
import cart from './MainAppPages/cart';
import signup from './MainAppPages/signup';
import wallet from './DrawerPages/wallet';

const stack = createStackNavigator();
const drawer = createDrawerNavigator();

class CustomDrawerComponent extends React.Component{
  render(){
    return (
      <DrawerContentScrollView {...this.props}>
      <DrawerItemList {...this.props} />
        <DrawerItem
          label="Sign Out"
          onPress={() => {
            auth().signOut().catch(err => console.log(err));
            this.props.navigation.closeDrawer()
            this.props.navigation.dispatch(StackActions.popToTop());
          }}
        />
      </DrawerContentScrollView>
    );
  }
}
function getGestureEnable(route) {
  const routeName = route.state ? 
      route.state.routes[route.state.index].name : (route.params?.screen || 'Login');

  switch (routeName) {
    case 'Login':
      return false;
    case 'signup':
      return false;
    default:
      return true
  }
}
class AppStack extends React.Component {
  render(){
    return(
      <stack.Navigator initialRouteName="Login">
        <stack.Screen name="Login" component={login} navi={this.props.navigation} options={{ gestureEnabled: false, headerShown: false}}/>
        <stack.Screen name="signup" component={signup} options={{ headerShown: false}}/>
        <stack.Screen name="UserData" component={userdata} options={{ headerShown: false}}/>
        <stack.Screen name="Sessions Menu" component={sessionsMenu} options={{ headerShown: false}}/>
        <stack.Screen name="breakfast" component={breakfast} options={{ headerShown: false}}/>
        <stack.Screen name="lunch" component={lunch} options={{ headerShown: false}}/>
        <stack.Screen name="dinner" component={dinner} options={{ headerShown: false}}/>
        <stack.Screen name="cart" component={cart} options={{ headerShown: false}}/>
      </stack.Navigator>
    )
  }
}
export default class App extends React.Component {
    render(){
    return (
     <NavigationContainer>
       <drawer.Navigator initialRouteName='Main App' drawerContent={(props) => <CustomDrawerComponent {...props} />}>
          <drawer.Screen name='Main App' component={AppStack} options={({ route }) => ({gestureEnabled: getGestureEnable(route) })}/>
          <drawer.Screen name='Wallet' component={wallet} />
       </drawer.Navigator>  
     </NavigationContainer>
    );
  }
}
//const index = this.props.navigation.dangerouslyGetState().index
