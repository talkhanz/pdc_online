import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import {ImageBackground, TextInput, Button, ScrollView ,StyleSheet,TouchableOpacity, Text, View, Alert, Image} from 'react-native';

export default class deleteAccount extends React.Component {
    state = {
        email: '',
        password: ''
    }

    deleteUser(){
        const user = auth().currentUser
        const userDoc = firestore().collection('Users').doc(user.uid)
        user.delete()
        .then( () => {
            Alert.alert('Account deleted successfully')
            userDoc.delete()
            setTimeout(()=> this.props.navigation.navigate('Login',{verified: false}),200 )})
        .catch(err => {
            console.log(err)
            Alert.alert('For security purposes, you need to sign in again before deleting your account')})
     }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titleText}>Delete Account</Text>
                <View style={styles.pageBody}>
                    <Text style={{marginTop:20,fontSize: 20,textAlign:"center", marginHorizontal:'10%'}}>Are you sure you want to delete your account?</Text>
                    <TouchableOpacity onPress={() => this.deleteUser()} style={styles.button}>
                        <Text style={{color: 'white', fontSize: 17}} title="Login" >Yes</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}
}
const styles = StyleSheet.create({
    container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'flex-start'
    },
    pageBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    button: {
        backgroundColor: '#E9446A',
        marginHorizontal: 5,
        marginVertical: 15,
        borderRadius: 4,
        borderColor: '#CA2161',
        borderWidth: 1,
        height: 52,
        width: 180,
        alignItems: 'center',
        justifyContent: 'center'
      },
    titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: 'black'
    },  
});