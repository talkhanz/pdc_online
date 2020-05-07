import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { ScrollView,View, StyleSheet,TouchableOpacity, FlatList,Picker, Alert, Button, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import firestore, { firebase } from '@react-native-firebase/firestore';

import {fetchIftariMenu} from './fetcher';
import { NavigationContainer,StackActions, 
  DefaultTheme as NavigationDefaultTheme,
 DarkTheme as NavigationDarkTheme, } from '@react-navigation/native';
import {
  Provider as PaperProvider,
  useTheme,
  Avatar,
  ProgressBar,
  Colors,
  Appbar,
  Title,
  Card,
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



export default class iftari extends React.Component {
    state = {
      menuAvailable: '', //state contains a menuAvaible string,
      itemList : [], // itemList which contains items to show on screen, 
      cartList:[], //cartList consists of items added to the cart,
      count : 0, // count contains no of items in cart
      gifNames: [] //names of GIF images
    }
    renderQuarterIcon(item){ // checks for item.quarter property and if icon should be rendered
      if (item.quarter != '-'){ //if item is available or not
        return (
          <Icon  onPress={() => { //on pressing + icon, an item is added to cartList
            const subItem = {
                name: item.item,
                portion: 'Quarter',
                price: item.quarter
            }
            const arr = this.state.cartList.concat(subItem) // creating a new array with a new subItem added to array
            this.setState({cartList: arr}) //array is assigned to the cartList property
            this.setState({count: this.state.count+1}) //  the count property is incremented
            }} 
        name='ios-add' size={40} />
                  )  
      }
    }
    renderHalfIcon(item){ // built in function runs when the component gets rendered for the first time
        if (item.half != '-'){ //if item is available or not
          return (
            <Icon  onPress={() => { //on pressing + icon, an item is added to cartList
              const subItem = {
                  name: item.item,
                  portion: 'Half',
                  price: item.half
              }
              const arr = this.state.cartList.concat(subItem) // creating a new array with a new subItem added to array
              this.setState({cartList: arr}) //array is assigned to the cartList property
              this.setState({count: this.state.count+1}) //  the count property is incremented
              }} 
          name='ios-add' size={40} />
                    )  
        }
      }  
    componentDidMount(){ //built in function runs when the component gets rendered for the first time
      fetchIftariMenu()  // extracts iftari menu  
      .then( received => {
        if(received[0] == 'Menu not available'){
            this.setState({menuAvailable: received[0]})} //puts a menu not available string to menuAvailable property
        else{
          this.setState({itemList: received})  //otherwise we get list of items from fetchIftariMenu
        }
      })
      .catch(err => console.log(err)) //error is displayed to the terminal
    }
    render(){    
      if(this.state.menuAvailable == 'Menu not available'){ //checks if menu available
          return(
            <View>
               <Appbar style={styles.Appbar}>
                <Icon style={{marginLeft: '3%'}} onPress={() => this.props.navigation.openDrawer()} /* on pressing Icon on left of app bar, drawer opens */ 
                name='md-menu' size={40} />
                  <Title style={styles.titleText}>Menu</Title>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.cart}>{this.state.count}</Text>
                        <Icon onPress={() => this.props.navigation.navigate('cart',{cartItems: this.state.cartList})} name='md-cart' size={40} /* allows us to  pass cartList data to cart screen on Icon Press*//>  
                    </View>
            </Appbar>


            
            <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} >
           
            <Text style={{ alignSelf: 'center' ,fontSize: 20,marginVertical: '60%'}} >Menu not available</Text>

            </ScrollView>
            </View>
          )
      }
      return ( //otherwise will display menu 
        <View style={{paddingBottom: '16%'}}>
          <Appbar style={styles.Appbar} /* A component to display action items in a bar */>
            <Icon style={{marginLeft: '3%'}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} />
              <Title style={styles.titleText}>Menu</Title>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.cart}>{this.state.count}</Text>
                    <Icon onPress={() => this.props.navigation.navigate('cart',{cartItems: this.state.cartList})}  /* allows us to navigate & pass cartList data to cart screen on icon press*/
                     name='md-cart' size={40} /* allows us to  pass cartList data to cart screen on Icon Press*//>  
                </View>
        </Appbar>
        <ProgressBar style={styles.ProgressBar} progress={0.25} /* progress is set at 25% indicating further progress required */
             color={Colors.green800}  />
        <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={{color:'#FFDAE3'}} >
      


          <FlatList
            removeClippedSubviews={true}
            extraData={true}
            keyExtractor={ item => item.key}
            data={this.state.itemList} /* we get our menu from itemList and storing it in data prop */
            renderItem={({item}) => ( /* each item is being rendered to screen using renderItem prop */
                <Card style={styles.screen}>
                  <Card.Title  title={item.item}/>
                
                  <Card.Cover   style={styles.box}  source={{
                                        uri: item.img}} /* Image added here from a uri */ /> 
                      <View  style={{flex: 1,justifyContent: 'center',flexDirection: 'row'}} /*flexDirection row renders components horizontally */> 
                                          <Text style={styles.subtitleText}>{'Standard  Rs '}{item.standard}{'   '}</Text> 
                                          <Icon  onPress={() => { /* + icon for adding item */
                                              const subItem = {
                                                  name: item.item,
                                                  portion: 'Standard',
                                                  price: item.standard
                                              }
                                              const arr = this.state.cartList.concat(subItem) /* concats item to cartList */
                                              this.setState({cartList: arr})
                                              this.setState({count: this.state.count+1}) /*count incremented as item gets added to cart */
                                              }} 
                                          name='ios-add' size={40} />

                      </View>
                      <View  style={{flex: 1,justifyContent: 'center',flexDirection: 'row',}}>
                                          <Text style={styles.subtitleText}>{'Half  Rs '}{item.half}{'   '}</Text> 
                                          {
                                              this.renderHalfIcon(item) /* checks if the item.half + icon needs to be rendered  */
                                          }
                      </View>
                      <View  style={{flex: 1,justifyContent: 'center',flexDirection: 'row',}}>
                                      <Text style={styles.subtitleText}>{'Quarter  Rs '}{item.quarter}{'   '}</Text>{

                                      this.renderQuarterIcon(item) /* checks if the item.quarter + icon needs to be rendered  */
                                  }
                      </View>
                  </Card> )}/>

       
     </ScrollView>   
     </View>     
       
     );
    }
  }
  const styles = StyleSheet.create({
    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        color: 'black',
        paddingLeft: '5%',
      },
      screen:{
        backgroundColor:'#FEDBD0',
      } , 
      subtitleText: {
        marginVertical: 10,
        fontSize: 20, 
      },
      Appbar: {
        backgroundColor:'#E9446A',

        justifyContent: 'space-between',
        height: 67,
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
      box: {
        borderWidth: 2,
        marginHorizontal: 5,    
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: 250,
      },
      row: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor:'#E9446A'
      },
      cart:{
        fontSize: 30,
        fontWeight: "bold",
        color: 'black',
      }
   });
  