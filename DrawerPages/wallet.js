import React from 'react';
import {Text,Button,TouchableOpacity,TextInput,StyleSheet,View, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function showWallet(){                         //A function that fetches the amount of virtual money of a user
    const userData = await firestore().collection('Users').doc(auth().currentUser.uid).get() //This refers to a user's details stored in the document
                    .then(doc => {return doc.data()})        
                    .catch(err => console.log(err))
    return userData.wallet           //The value of the user's wallet is retured
}
export async function updateWallet(newValue, action){        //A function that is called when the value of the wallet needs to be changed
    const userDoc = firestore().collection('Users').doc(auth().currentUser.uid)
    var wallet = 0
    await userDoc.get().then(res => wallet = res.data().wallet) //
                       .catch(err=> console.log(err))

    if(action == 'add'){       //This is true when a user enter a code to increase their virtual money
        userDoc.update({
            wallet: wallet + newValue
        }).catch(err => console.log(err))
    }
    else if(action == 'deduct'){      //This is true when a user places an order and the virtual money is hence, decreased
        userDoc.update({
            wallet: wallet - newValue
        }).catch(err => console.log(err))
    }
}

export default class Wallet extends React.Component{    // this is the wallet component
    state = { 
        wallet: null,   // local wallet variable in state
        code: '',       // state variable of voucher code to enter to add funds
        errorMessage: '' // state variable of error message to display in case user makes a mistake
    }

    constructor(props){     // constructor for this class component
        super(props)        // a necessary built in function in constructors for class componenets in react
        this.updateWallet = updateWallet.bind(this)
    }

    async componentDidMount(){  // built in function that runs when wallet first mounts/renders
        let listener = firestore().collection('Users').doc(auth().currentUser.uid).onSnapshot(docSnapshot => {  // a listener that listens to the wallet value of user in database
            this.setState({wallet: docSnapshot.data().wallet})
        },
        err => console.log(err))
    }

    processCode(){  //This function is called when a user enters a code to recharge their wallet
        if(this.state.code == ''){  //If the user entered an empty string, this caters it with an error message
            this.setState({errorMessage: 'Please enter a code'})    
            return
        }
        const codeListDoc =  firestore().collection('Voucher Codes').doc('Codes List')  //The codes stored in firebase database are fetched to check them with the one the user entered
        codeListDoc.get().then(doc => {     
            var codeFound = false
            for(var i=0; i< Object.keys(doc.data()).length; i++){
                if(doc.data()[i].code == this.state.code && doc.data()[i].used == false){ //This checks whether the code exists and that it is unused
                    this.updateWallet(200, 'add') // When the condition checks out, the update wallet function is called to recharge a user's wallet by 200
                    codeListDoc.update({          // the code in the database is updated with used = true
                        [`${i}.used`] : true
                    })
                    codeFound = true
                    Alert.alert('Rs. 200 have been added to your wallet')   // user is alertied that RS. 200 have been added
                }
            }
            if(codeFound == false){     // is user enters wrong code, error message is displayed
                this.setState({errorMessage: 'Invalid Code'})
            }
        })
        .catch(err => console.log(err))
    }

    render(){   // the render function that displays the contents of the screen
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