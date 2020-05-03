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
        let listener = firestore().collection('Orders').doc(this.props.route.params.orderID).onSnapshot(docSnapshot => {
            if(docSnapshot.data().verified == true){
                this.setState({verify: true})
                listener()
            }
        },
        err => console.log(err))
    }
    
    render(){
        if(this.state.verify == false){
            return(
                <View style={{flex: 1,alignItems:'center', justifyContent: 'center',backgroundColor:'#75FFCF'}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>{this.checkVerified()}QR Code Screen</Text>
                    <QRCode
                    size={200}
                    value={this.props.route.params.orderID}
                    logo={require('./pdc_online_icon.png')}
                    logoSize={50}
                    logoBackgroundColor='white'
                    logoMargin={1}
                    logoBorderRadius={30}
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