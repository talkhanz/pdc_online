import React from 'react';
import {Text,FlatList,StyleSheet,TouchableOpacity,View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const voucher = require('voucher-code-generator')

export default class voucherManager extends React.Component{
    state = {
        codesList: []
    }

    codeGenerator(){
        const codes = voucher.generate({
            length: 12,
            count:10
        })
        this.setState({codesList: codes})
    }

    render(){
        return(
            <View style={{flex: 1,alignItems:'center', backgroundColor:'#D3D3D3'}}>
                <Text style={styles.titleText}>Manage Voucher Codes</Text>
                <Button title='Generate Codes' onPress={() => this.codeGenerator()}></Button>
                <FlatList
            removeClippedSubviews={true}
            extraData={true}
            keyExtractor={ item => item}
            data={this.state.codesList} 
             renderItem={({item}) => ( 
              <View style={{alignItems:'center'}}>
                  <Text style={{fontSize: 20}}>{item}</Text>
              </View>
             )}
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
})