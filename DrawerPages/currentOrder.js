import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import QRCode from 'react-native-qrcode-svg';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import {ImageBackground, TextInput, Button, ScrollView ,StyleSheet,TouchableOpacity, Text, View, Alert, Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class MyOrder extends React.Component {
    state = {
        currentOrder: {},
        verify: false
    }

    componentDidMount(){
        let userlistener = firestore().collection('Users').doc(auth().currentUser.uid).onSnapshot(userSnapshot => {
            if(auth().currentUser){
                this.setState({currentOrder: userSnapshot.data().currentOrder})
                console.log('setting current order', userSnapshot.data().currentOrder)
            }
            else{
                userlistener()
            }
        },
        err => console.log(err))

     }

    resetUserOrder(){
        firestore().collection('Users').doc(auth().currentUser.uid).update({
            currentOrder: {
                uid: null,
                orderID: null,
                orderList: [],
                verified: false
            }
        })
        .catch(err => console.log(err))
        console.log('resetting')
    }

    render(){
        if( this.state.currentOrder.orderID == null){
            return(
                <View style={styles.container}>
                    <Text style={styles.titleText}>Current Order</Text>
                    <View style={styles.pageBody}>
                        <Text style={{marginTop:20,fontSize: 20,textAlign:"center", marginHorizontal:'10%'}}>You currently have no order</Text>
                    </View>
                </View>
            )
        }
        else{
            console.log('after 1st if')
            let orderlistener = firestore().collection('Orders').doc(this.state.currentOrder.orderID).onSnapshot(orderSnapshot => {
                if(orderSnapshot.data().verified == true){
                    this.setState({verify: true})
                    orderlistener()
                }
            },
            err => console.log(err))
    
            if( this.state.verify == true){
                this.resetUserOrder()
                Alert.alert('Order Verified!')
            }
            return(
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.titleText}>Current Order</Text>
                        <QRCode
                        size={200}
                        value={this.state.currentOrder.orderID}
                        logo={require('../MainAppPages/images/pdc_online_icon.png')}
                        logoSize={50}
                        logoBackgroundColor='white'
                        logoMargin={1}
                        logoBorderRadius={30}
                        />
                        <FlatList 
                        removeClippedSubviews={true}
                        extraData={true}
                        keyExtractor={ item => item.item}
                        data={this.state.currentOrder.orderList}
                        renderItem={({item}) => (
                            <View style={styles.pageBody}>
                                <Text style={styles.subtitleText}>{item.name}{' \n'}{item.portion}{'    Rs '}{item.price}</Text>
                            </View>      
                        )}
                        />
                    </View>
                </ScrollView>
            )
        }
      
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
        marginTop: '50%',
        alignItems:'center',
    },
    subtitleText: {
        fontSize: 20, 
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
    marginBottom:'10%',
    fontSize: 30,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    },  
});