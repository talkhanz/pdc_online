import React from 'react';
import {Text,FlatList,Alert,StyleSheet,TouchableOpacity,View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const voucher = require('voucher-code-generator')

export default class voucherManager extends React.Component{
    state = {
        codesList: [],
        codeDisplay: ''
    }

    codeGenerator(){        //A function that generates codes to be used for recharging user wallets
        Alert.alert("Reset codes in Database?" , 'This will clear and replace the codes present in databse with new ones',
        [
          {
            text: "Cancel",     // option to cancel
            style: "cancel"
          },
          { text: "OK", onPress: async () => {      // option to proceed
                const codes = voucher.generate({    // 10 codes are generated of length 12
                    length: 12,
                    count:10
                })
                var codeList = {}
                for(var i=0; i< codes.length; i++){
                    codeList[i] = ({
                        code: codes[i],
                        used: false     // all generated codes are are set with used = false
                    })
                }
                this.setState({codesList: codes})
                firestore().collection('Voucher Codes').doc('Codes List').set(codeList) // codes are put in databse
                .catch(err => console.log(err))
          }}
        ]
      );
    }

    getCode(){      // function to get a random unsed code from database
        firestore().collection('Voucher Codes').doc('Codes List').get().then(doc => {
            const totalCodes = Object.keys(doc.data()).length
            var codeNumber = 0
            var randomCode = null
            do {                    // do while loop for finding a random unused code
                randomCode = Math.round(Math.random() * totalCodes) - 1
                codeNumber++
            } while (doc.data()[randomCode].used == true && codeNumber <= totalCodes);

            if(codeNumber > totalCodes){        // if no such code found, the following line is displayed to user
                this.setState({codeDisplay: 'No new codes available. Generate new codes'})
            }
            else{       // if code found, it is stored in state
                this.setState({codeDisplay: doc.data()[randomCode].code})
            }
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <View style={{flex: 1,alignItems:'center', backgroundColor:'#D3D3D3'}}>
                <Text style={styles.titleText}>Manage Voucher Codes</Text>
                <Text style={{fontSize: 20, marginHorizontal:'5%', textAlign: 'center'}}>Click below button to generate a new code</Text>

                <TouchableOpacity onPress={() => this.getCode()} style={styles.button} /*A function that is run when the admin wants to retrieve a code from the database*/ >
                    <Text style={{color: 'white', fontSize: 17}} title="Login" >Get Random Code</Text>
                </TouchableOpacity>
            
                <Text style={{fontSize: 20,textAlign:'center',marginHorizontal:30,marginVertical:15}}>{this.state.codeDisplay}</Text>
                <Text style={{fontSize: 20, marginHorizontal:'5%', textAlign: 'center'}}>Click below button to reset the codes in the database once all are used</Text>
            
                <TouchableOpacity onPress={() => this.codeGenerator()} style={styles.button} /*The codegenerator function is called when to create codes for updating wallet amount*/ > 
                    <Text style={{color: 'white', fontSize: 17}} title="Login" >Generate Codes</Text>
                </TouchableOpacity>
            
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
        color: 'black',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'slategray'
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