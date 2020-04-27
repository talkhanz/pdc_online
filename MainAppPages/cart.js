import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View, StyleSheet,TouchableOpacity, FlatList, Alert} from 'react-native';

import {showWallet, updateWallet} from '../DrawerPages/wallet'

export default class cart extends React.Component {
    state = {
      itemList: [],
      errorMessage: '',
      wallet: 0 
    }

    calculateTotal(list){
      var total = 0 ;
      list.forEach(item=>{
        total = total + parseInt(item.price)      
        
      })
      return total
    }

    async checkWallet(total){
      const wallet = await showWallet()
      console.log(wallet)
      if(wallet < total){
        console.log(wallet, ' < ',total)
        this.setState({errorMessage: 'Insufficient Funds in Wallet'})
      }
      else{
        this.props.navigation.navigate('qrCode')
      }
    }

    render(){
     // console.log('Cart received ',)
        if(this.props.route.params){
            return (
                <View style={styles.titleback}>
                     <Text style={styles.titleText}>Cart</Text>
                     <FlatList
                     keyExtractor={ item => item.key}
                     data={this.props.route.params.cartItems}
                     renderItem={({item}) => (
                       <TouchableOpacity>
                              <Text style={styles.subtitleText}>{item.name}{'  '}{item.portion}{'    Rs '}{item.price}</Text>
                       </TouchableOpacity>
                      )}
                     />
                     <View style={{marginTop: 200}}>
                        <Text style={styles.subtitleText}>{this.state.errorMessage}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => {
                          const total = this.calculateTotal(this.props.route.params.cartItems)
                          const CheckoutStatus = this.checkWallet(total)

                        }}>
                          <Text style={{color: 'white'}}>Checkout</Text>
                        </TouchableOpacity>
                     </View>
                     
                </View>
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
        backgroundColor:'pink',
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
      }
   });
  