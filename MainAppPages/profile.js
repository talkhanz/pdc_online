import React from 'react'
import {ImageBackground, StyleSheet, View, Alert, TextInput, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
const stack = createStackNavigator(); 


export default class profile extends React.Component {

    render(){
        return(
           <View>
     <Avatar.Image
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            size={77}
            onPress={()=>{this.props.navigation.navigate('profile')}}
          />
          
          <Title >Dawid Urbaniak</Title>
          <Caption >@trensik</Caption>

           </View>
        );

        ;
    }
}