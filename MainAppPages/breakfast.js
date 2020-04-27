import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, ScrollView,View, StyleSheet,TouchableOpacity, FlatList,Picker, Alert, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import {fetchBreakfastMenu} from './fetcher';


export default class breakfast extends React.Component {
    state = {             // State of the breakfast menu component
      menuAvailable: '',  // This is updated to see whether the menu is available or not
      itemList : [],      // This stores all the items that are available during the breakfast session
      cartList:[],        // All items added to the cart by the user are stored here
      count : 0,          // This counts the number of items added to our cart
    }

    componentDidMount(){                            
      fetchBreakfastMenu()                        // A function that fetches the breakfast menu from pdc's website every time a user taps on the breakfast menu box
      .then( received => {                        // The function is called that returns a promise
        if(received[0] == 'Menu not available'){  // If the menu is not available, then we return with a string only
            this.setState({menuAvailable: received[0]})}  // Here the variable in state is set to Menu not available
          else{                                   
            this.setState({itemList: received})   // This updated the item list when the menu is avilable         
          }
      })
      .catch(err => console.log(err))             // When there's an error instead, it is displayed
    }

    render(){
     
      if(this.state.menuAvailable == 'Menu not available'){    // This checks, using the state variable menuAvailable, to see if menu is unavailable
          return(                                              // Only following piece of code is returned when the condition is true
            <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} > 
            <View style={styles.row}>
              <Icon style={{marginHorizontal: 122}} onPress={() =>           // A function that is called to open our drawer when the uuser taps on the icon in the tope left corner 
                this.props.navigation.openDrawer()} name='md-menu' size={40} /* Here the Drawer is being called */ />
                <Text style={styles.titleText}>Menu</Text>
                <Icon onPress={() =>                                         //This function runs when the shopping cart icon in the top right corener is pressed
                  this.props.navigation.navigate('cart')} name='md-cart' size={40} /*This leads us to our shopping cart screen that has all the items that we added to it. In our shopping cart screen we will also place our order */ />
            </View>
            <View style={styles.titleback}>
            
            <Text style={{marginVertical: 10,fontSize: 20,paddingVertical: 250}}>Menu not available</Text>
            
            </View>
          </ScrollView>
          )
      }
      return (
        <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} >
          <View style={styles.row}>
              <Icon style={{marginRight:110}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} />
                <Text style={styles.titleText}>Menu</Text>
                <Text style={styles.cart}>{this.state.count}</Text>

                <Icon  onPress={() => this.props.navigation.navigate('cart')} name='md-cart' size={40} />
          </View>
          <View >

            <Text style={styles.subtitleText}>
            Item
            </Text>
            <FlatList
            extraData={true}
            keyExtractor={ item => item.key}
            data={this.state.itemList}
            renderItem={({item}) => (
              <View style={styles.row} >
                  <Text 
                    style={styles.subtitleText}>
                      {item.item}{'   '}
                      
                  </Text> 
                  <Picker
                    selectedValue={item}
                    style={{height: 50, width: 100}}
                   >
                    <Picker.Item label={"Standard:     Rs " +item.standard} value={item.standard} />
                    <Picker.Item label={"Half:              Rs " + item.half} svalue={item.half} />
                    <Picker.Item label={"Quarter:        Rs " +item.quarter} value={item.quarter} />
                  </Picker>
                  <Icon  onPress={() => {
                  const arr = this.state.cartList.concat(item)
                  this.setState({cartList: arr})

                    this.setState({count: this.state.count+1})
                    }} name='ios-add' size={40} />
              </View>
             )}
            />
            <Button title='CHECKOUT' onPress={() => {
              // console.log('cartlist: ', typeof this.state.cartList)
              this.props.navigation.navigate('cart',{cartItems: this.state.cartList})
              
              }}></Button>
       </View>
       </ScrollView>
     );
    }
  }
  class cart extends React.Component {
    state = {

    }
    
    render(){
      console.log('Cart received ',this.props.route.params.cartItems)
        if(this.props.route.params){
            return (
                <View style={styles.titleback}>
                     <Text style={styles.titleText}>Cart</Text>
               <Text>{this.props.route.params.cartItems[0]}</Text>
                     {/* <FlatList
                     keyExtractor={ item => item.key}
                     data={this.state.itemList}
                     renderItem={({item}) => (
                       <TouchableOpacity>
                          
                       </TouchableOpacity>
                      )}
                     /> */}
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
        justifyContent: 'center',
        flexDirection: 'row'
      },
      cart:{
        fontSize: 30,
        fontWeight: "bold",
        color: 'black',
        marginLeft:122
      }
   });
  