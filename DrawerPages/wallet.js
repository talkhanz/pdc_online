import React from 'react';
import {Text,Button,View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const user = auth().currentUser

export async function showWallet(){
    const userData = await firestore().collection('Users').doc(user.uid).get()
                    .then(doc => {return doc.data()})
                    .catch(err => console.log(err))
    return userData.wallet
}
export function updateWallet(newValue){
    this.setState({wallet: this.state.wallet+newValue}) 
}

export default class Wallet extends React.Component{
    state = { wallet: null }

    constructor(props){
        super(props)
        this.updateWallet = updateWallet.bind(this)
    }

    async componentDidMount(){
        this.setState({wallet: await showWallet()}) 
    }

    render(){
        return(
            <View style={{flex: 1,alignItems:'center', justifyContent: 'center',backgroundColor:'#75FFCF'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Wallet Value: Rs {this.state.wallet}</Text>
                <Button title='Add' onPress={() => this.updateWallet(1)}></Button>
            </View>
            )
    }
}