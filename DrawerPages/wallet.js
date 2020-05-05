import React from 'react';
import {Text,Button,TouchableOpacity,TextInput,StyleSheet,View, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const user = auth().currentUser

export async function showWallet(){
    const userData = await firestore().collection('Users').doc(user.uid).get()
                    .then(doc => {return doc.data()})
                    .catch(err => console.log(err))
    return userData.wallet
}
export async function updateWallet(newValue, action){
    const userDoc = firestore().collection('Users').doc(user.uid)
    var wallet = 0
    await userDoc.get().then(res => wallet = res.data().wallet)

    if(action == 'add'){
        console.log('adding')
        userDoc.update({
            wallet: wallet + newValue
        }).catch(err => console.log(err))
    }
    else if(action == 'deduct'){
        console.log('deducting')
        userDoc.update({
            wallet: wallet - newValue
        }).catch(err => console.log(err))
    }
}

export default class Wallet extends React.Component{
    state = { 
        wallet: null,
        code: '',
        errorMessage: ''
    }

    constructor(props){
        super(props)
        this.updateWallet = updateWallet.bind(this)
    }

    async componentDidMount(){
        let listener = firestore().collection('Users').doc(user.uid).onSnapshot(docSnapshot => {
            this.setState({wallet: docSnapshot.data().wallet})
        },
        err => console.log(err))
    }

    processCode(){
        if(this.state.code == ''){
            this.setState({errorMessage: 'Please enter a code'})
            return
        }
        const codeListDoc =  firestore().collection('Voucher Codes').doc('Codes List')
        codeListDoc.get().then(doc => {
            var codeFound = false
            for(var i=0; i< Object.keys(doc.data()).length; i++){
                console.log(doc.data()[i])
                if(doc.data()[i].code == this.state.code && doc.data()[i].used == false){
                    this.updateWallet(200, 'add')
                    codeListDoc.update({
                        [`${i}.used`] : true
                    })
                    codeFound = true
                    Alert.alert('Rs. 200 have been added to your wallet')
                }
            }
            if(codeFound == false){
                this.setState({errorMessage: 'Invalid Code'})
            }
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titleText}>Wallet Value: <Text style={{fontSize: 30,fontWeight: "bold",color: '#E9446A'}}> Rs {this.state.wallet}</Text></Text>
                <Text style={{marginTop: 60,textAlign:'center',marginBottom:10,fontSize: 20, marginHorizontal:'10%'}}>Enter a voucher code below to add funds to your wallet</Text>
                <TextInput style={styles.TextInput} onChangeText={code => this.setState({code: code})} value={this.state.code} placeholder='Enter Code' textAlign={'center'} ></TextInput>
                <Text style={{marginVertical:20,fontSize:25, marginHorizontal:0}}>{this.state.errorMessage}</Text>
                <TouchableOpacity onPress={() => this.processCode()} style={styles.button}>
                        <Text style={{color: 'white', fontSize: 17}} title="Login" >Submit</Text>
                </TouchableOpacity>
            </View>
            )
    }
}
const styles = StyleSheet.create({
    container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor:'#FFDAE3'
    },
    TextInput:{
        marginVertical: 10,
        height: 40, 
        width: 320,
        backgroundColor: 'white',
        borderColor: 'black', 
        borderWidth: 1 ,
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