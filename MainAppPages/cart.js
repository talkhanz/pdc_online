import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer,StackActions, 
  DefaultTheme as NavigationDefaultTheme,
 DarkTheme as NavigationDarkTheme, } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, StyleSheet,TouchableOpacity, FlatList, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';
import {
  Provider as PaperProvider,
  useTheme,
  Avatar,
  ProgressBar,
  Colors,
  Appbar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Drawer as PaperDrawer,
  IconButton,
  DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,

} from 'react-native-paper';

import Wallet from '../DrawerPages/wallet'
import {showWallet, updateWallet} from '../DrawerPages/wallet'
import { ScrollView } from 'react-native-gesture-handler';
var  globalTheme =  {
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#E9446A',
    accent: '#f1c40f',
  },
  };
export default class cart extends React.Component {
    state = {
      itemList: [],
      errorMessage: '',
      wallet: null ,
      order: {
        uid: 0,
        orderList: [],
        verified: false
      },
      progressLevel: 0.0
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
              <ProgressBar progress={this.state.progressLevel} color={Colors.green800} />
              <Appbar style={styles.row} theme = {globalTheme} >
     
                <Icon style={{marginLeft: '3%'}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} /* on clicking this icon we get a side tab/drawer */ />
                 <Title style= {styles.titleText}   >Shopping Cart</Title>
              </Appbar>


             
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
                    <ProgressBar progress={this.state.progressLevel} color={Colors.green800} />

                     <Text style={styles.titleText}>Your cart is empty</Text>
                </View>
        )
    }
  }
  
  const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        alignItems: 'center',
        fontWeight: "bold",
        color: 'black',
        paddingLeft: '25%',

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
        fontSize:30,
        alignItems: 'center',
        backgroundColor:'#f46a',
        flexDirection: 'row'
      }  
   });
  