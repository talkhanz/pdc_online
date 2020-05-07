
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
import moment from "moment";
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
var  globalTheme =  {     // theme for the design module 'react-native-paper'
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#E9446A',
    accent: '#f1c40f',
  },
  };
export default class cart extends React.Component {   // cart component
    state = {
      itemList: [],   // state variable that contains all cart items
      errorMessage: '',   // error message to be displayed in case user makes a mistake
      wallet: null ,      // local wallet variable
      order: {            // the order object to be passed to the next QR code screen and the databse
        uid: 0,
        orderList: [],
        verified: false
      },
      progressLevel: 0.0    // for the progress bar visuualy seen below the header on the screen
    }

    async componentDidMount(){    // built in function that runs when component 1st mounts/renders
      this.setState({itemList: this.props.route.params.cartItems})
    }

    calculateTotal(list){   // function to calculate total
      var total = 0 ;
      var list = this.props.route.params.cartItems  
      list.forEach(item=>{
        total = total + parseInt(item.price)  // total is calculated
      })
      return total
    }

    async checkWallet(total){   // wallet is checked if enough funds are present in this function
      const wallet = await showWallet()
      if(wallet < total){       // if not enough funds, error message is displayed
        this.setState({errorMessage: 'Insufficient Funds in Wallet!'})
      }
      else{                     // if there are enough funds, the folowwing code runs
        const uid = await auth().currentUser.uid
        var orderID = ''
        Alert.alert("Confirm Payment" , `Rs. ${total} are about to be deducted from your wallet.`,
          [     // user is alerted that Rs 200 will be deducted from their wallet
            {
              text: "Cancel",   // option to cancel
              style: "cancel"
            },
            { text: "OK", onPress: async () => {    //option to proceed
              await updateWallet(total, 'deduct')   // funds are deducted from their wallet
              await firestore().collection('Orders').add(this.state.order).then(result => {   // order is put in the database
                orderID = result._documentPath._parts[1]    // orderID is retrieved
              }).catch(err => console.log(err))

              this.setState({order:{    // order is set in the state
                uid: uid,
                orderID: orderID,
                orderList:this.props.route.params.cartItems,
                verified: false
              }})
              firestore().collection('Users').doc(uid).update({   // users 'currentOrder' field in the database is updated
                currentOrder: this.state.order
              })  
              this.props.navigation.navigate('qrCode',{     // navigates to   qr   code screen with the following 2 params
                uid: uid,
                orderID: orderID
              })
            }}
          ],
          { cancelable: false }
        );
      }
    }

    render(){
        if(this.props.route.params){    // is cart is not empty
          showWallet().then((response)=> this.setState({wallet: response})) // wallet value is displayed
            return (
              <ScrollView>
              <Appbar style={styles.row} theme = {globalTheme} /* Header at top of screen */ >
     
                <Icon style={{marginLeft: '3%'}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} /* on clicking this icon we get a side tab/drawer */ />
                 <Title style= {styles.titleText}   >Shopping Cart</Title>
              </Appbar>
              <ProgressBar style={styles.ProgressBar} progress={0.5} color={Colors.green800} />


             
                   <View style={styles.titleback}>
                     <FlatList /* Flatlist component is used to display cart items */
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
        return(   // is cart is empty
            <View style={styles.titleback}>

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
      screen:{
        backgroundColor:'#FEDBD0',
      } , 
      
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
      ProgressBar:{
        height:20 ,
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
  