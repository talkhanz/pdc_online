import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import {ImageBackground, TextInput, Button, ScrollView ,StyleSheet,TouchableOpacity, Text, View, Alert, Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class MyOrder extends React.Component {
    state = {
        currentOrder: {}
    }

    componentDidMount(){
        let listener = firestore().collection('Users').doc(auth().currentUser.uid).onSnapshot(docSnapshot => {
            this.setState({currentOrder: docSnapshot.data().currentOrder})
        },
        err => console.log(err))
     }

    render(){
        if( Object.keys(this.state.currentOrder).length == 0 ){
            return(
                <View style={styles.container}>
                    <Text style={styles.titleText}>Current Order</Text>
                    <View style={styles.pageBody}>
                        <Text style={{marginTop:20,fontSize: 20,textAlign:"center", marginHorizontal:'10%'}}>You currently have no order</Text>
                    </View>
                </View>
        )
        }
        return(
            <View style={styles.container}>
                <Text style={styles.titleText}>Current Order</Text>
                <FlatList 
                removeClippedSubviews={true}
                extraData={true}
                keyExtractor={ item => item.item}
                data={this.state.currentOrder.orderList}
                renderItem={({item}) => (
                    <View style={styles.pageBody}>
                        <Text style={{marginTop:20,fontSize: 20,textAlign:"center", marginHorizontal:'10%'}}>
                            {item.item}</Text>
                    </View>
                )}
                />
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