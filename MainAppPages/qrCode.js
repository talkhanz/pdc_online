import React from 'react';
import {Text,Button,View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import QRCode from 'react-native-qrcode-svg';

export default class QRcode extends React.Component{

    render(){
        return(
            <View style={{flex: 1,alignItems:'center', justifyContent: 'center',backgroundColor:'#75FFCF'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>QR Code Screen</Text>
                <QRCode
                value="Just some string value"
                //logo={require('./sehri.jpeg')}
                logoSize={30}
                logoBackgroundColor='transparent'
                />
               
            </View>
            )
    }
}