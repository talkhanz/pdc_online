import React from 'react';
import {ImageBackground, TextInput, Button, ScrollView ,StyleSheet,TouchableOpacity, Text, View, Alert, Image} from 'react-native';

export default class updateProfile extends React.Component {
    state = {
        email: '',
        password: ''
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titleText}>Update Profile</Text>
                <View style={styles.pageBody}>
                    <Text style={{fontSize: 20, marginHorizontal:'10%'}}>To update your email address, enter a new address</Text>
                    <TextInput style={styles.TextInput} onChangeText={email => this.setState({email: email})} value={this.state.email} placeholder='Email' textAlign={'center'}></TextInput>
                    <TouchableOpacity onPress={() => this.signin()} style={styles.button}>
                        <Text style={{color: 'white', fontSize: 17}} title="Login" >Update Email</Text>
                    </TouchableOpacity>
                    <Text style={{marginTop:20,fontSize: 20, marginHorizontal:'10%'}}>To update your password, enter a password</Text>
                    <TextInput style={styles.TextInput} onChangeText={pass => this.setState({password: pass})} value={this.state.password} placeholder='password' secureTextEntry textAlign={'center'} ></TextInput>
                    <TouchableOpacity onPress={() => this.signin()} style={styles.button}>
                        <Text style={{color: 'white', fontSize: 17}} title="Login" >Update Password</Text>
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
    TextInput:{
        marginVertical: 5,
        height: 40, 
        width: 320,
        backgroundColor: 'white',
        borderColor: 'black', 
        borderWidth: 1 ,
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