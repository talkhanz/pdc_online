import React from 'react';
import {Text,Button,View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import QRCode from 'react-native-qrcode-svg';

export default class QRcode extends React.Component{

    state ={
        orderReceived : {},
        verify: false,
    }
   
    checkVerified(){
        var intervalID

        if(this.state.verify == false){
            intervalID =setInterval(() => {
                console.log(intervalID)
                firestore().collection('Orders').doc(this.props.route.params.orderID).get()
                .then( result => {
                    if(result.data().verified == true){
                        this.setState({verify : true})
                    }
                })
                .catch(err => console.log(err)) 
            },1000) 
        }
        else{
            console.log('out of if')
            clearInterval(intervalID)
            console.log('cleared interval')
        }
        
    }
    
    render(){
        if(this.state.verify == false){
            return(
                <View style={{flex: 1,alignItems:'center', justifyContent: 'center',backgroundColor:'#75FFCF'}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>{this.checkVerified()}QR Code Screen</Text>
                    <QRCode
                    value={this.props.route.params.orderID}
                    //logo={require('./sehri.jpeg')}
                    logoSize={30}
                    logoBackgroundColor='transparent'
                    />
                   
                </View>
                ) 
        }
        else{
            return(
                <View style={{flex: 1,alignItems:'center', justifyContent: 'center',backgroundColor:'#75FFCF'}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>Order Verified!</Text>
                   
                </View>
                )
        }
    }
}