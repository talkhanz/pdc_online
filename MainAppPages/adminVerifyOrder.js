import React from 'react';
import {Text,StyleSheet,TouchableOpacity,View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class verifyOrder extends React.Component{

    render(){
        return(
            <View style={{flex: 1,alignItems:'center', justifyContent: 'center',backgroundColor:'#75FFCF'}}>
                <Text style={styles.titleText}>Verify Order</Text>
                <QRCodeScanner
                    onRead={console.log('reading QR')}
                    //flashMode={QRCodeScanner.Constants.FlashMode.auto}
                    topContent={
                    <Text style={styles.subtitleText}>
                        Scan the QR code on customer's mobile device
                    </Text>
                    }
                    cameraStyle={{marginVertical:50}}
                    bottomContent={
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.subtitleText}>Done!</Text>
                    </TouchableOpacity>
                    }
                />
            </View>
            )
    }
}
const styles = StyleSheet.create({
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: 'black',
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
      subtitleText: {
        marginVertical: 10,
        fontSize: 20, 
      }
   });
  