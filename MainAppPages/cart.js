import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View, StyleSheet,TouchableOpacity, FlatList, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';

import Wallet from '../DrawerPages/wallet'
import {showWallet, updateWallet} from '../DrawerPages/wallet'
import { ScrollView } from 'react-native-gesture-handler';

export default class cart extends React.Component {
    state = {
      itemList: [],
      errorMessage: '',
      wallet: null ,
      order: {
        uid: 0,
        orderList: [],
        verified: false
      }
    }

    async componentDidMount(){
      this.setState({itemList: this.props.route.params.cartItems})
    }

    calculateTotal(list){
      var total = 0 ;
      var list = this.props.route.params.cartItems
      list.forEach(item=>{
        total = total + parseInt(item.price)  
      })
      return total
    }

    async checkWallet(total){
      const wallet = await showWallet()
      if(wallet < total){
        this.setState({errorMessage: 'Insufficient Funds in Wallet!'})
      }
      else{
        const uid = await auth().currentUser.uid
        this.setState({order:{
          uid: uid,
          orderList:this.props.route.params.cartItems,
          verified: false
        }})
        var orderID = ''
        await firestore().collection('Orders').add(this.state.order).then(result => {
          orderID = result._documentPath._parts[1]
        }).catch(err => console.log(err))
        await firestore().collection('Users').doc(uid).update({
          currentOrder: this.state.order
        })
        Alert.alert("Confirm Payment" , `Rs. ${total} are about to be deducted from your wallet.`,
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { text: "OK", onPress: async () => {
              await updateWallet(total, 'deduct')
              this.props.navigation.navigate('qrCode',{orderID: orderID})
            }}
          ],
          { cancelable: false }
        );
      }
    }

    render(){
        if(this.props.route.params){
          showWallet().then((response)=> this.setState({wallet: response}))
            return (
              <ScrollView>
                 <View style={styles.row}>
                    
                    <Icon style={{marginLeft: '3%'}} onPress={() =>           //On tapping the three horizontal bar icon on the top left, this fuction is called which shows the drawer
                      this.props.navigation.openDrawer()} name='md-menu' size={40} // This is our drawer that has been defined with the repective screens in App.js
                      />       
                    <Text style={styles.titleText}>Cart</Text>

                 </View>
                   <View style={styles.titleback}>
                     <FlatList
                     keyExtractor={ item => item.key}
                     data={this.state.itemList}
                     renderItem={({item}) => (
                       <TouchableOpacity>
                         <View style={{flexDirection: 'row'}}>
                     <Text style={styles.subtitleText}>{item.name}{' \n'}{item.portion}{'    Rs '}{item.price}{'                   '}</Text>
                                <Icon  onPress={() => {
                                  const newList = this.state.itemList
                                  newList.push(item)
                                  this.setState({itemList: newList})
                                }} 
                              name='ios-add' size={40} />
                              <Text>{'\t\t\t'}</Text>
                               <Icon  onPress={() => {
                                  const index = this.props.route.params.cartItems.indexOf(item)
                                  this.state.itemList.splice(index,1)
                                  this.setState({itemList: this.state.itemList})
                                  if(this.calculateTotal(this.state.itemList) <= this.state.wallet){
                                    this.setState({errorMessage: ''})
                                  }
                                }} 
                              name='ios-remove' size={40} />
                         </View>
                       </TouchableOpacity>
                      )}
                     />
                     <Text style={{marginVertical: 10,fontSize: 30}}>Total: { this.calculateTotal(this.state.itemList)} </Text>
                     <Text style={{marginVertical: 10,fontSize: 30}}>Wallet: { this.state.wallet} </Text>
                     <View style={{alignItems:'center'}}>
                        <Text style={{marginVertical:20,fontSize:25, marginHorizontal:0}}>{this.state.errorMessage}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => {
                          const total = this.calculateTotal(this.state.itemList)
                          const CheckoutStatus = this.checkWallet(total)
                        }}>
                           
                          <Text style={{color: 'white'}}>Checkout</Text>
                        </TouchableOpacity>
                     </View>
                     
                </View>
              </ScrollView>
              );
        }
        return(
            <View style={styles.titleback}>
                     <Text style={styles.titleText}>Your cart is empty</Text>
                </View>
        )
    }
  }
  
  const styles = StyleSheet.create({
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: 'black',
        marginLeft: '32%'
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
      },
      titleback: {
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
      },
      row: {
        flex: 1,
        backgroundColor:'#f46a',
        flexDirection: 'row'
      }  
   });
  