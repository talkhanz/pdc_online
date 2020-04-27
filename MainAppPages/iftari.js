import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, ScrollView,View, StyleSheet,TouchableOpacity, FlatList,Picker, Alert, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import {fetchIftariMenu} from './fetcher';

export default class sehri extends React.Component {
    state = {
      menuAvailable: '',
      itemList : [],
      itemListCopy: [],
      cartList:[],
      count : 0, 
    }
    renderQuarterIcon(item){ // checks for item.half property is - or valid to check if icon should be rendered
      if (item.quarter != '-'){
        return (
          <Icon  onPress={() => {
            const subItem = {
                name: item.item,
                portion: 'Quarter',
                price: item.quarter
            }
            const arr = this.state.cartList.concat(subItem)
            this.setState({cartList: arr})
            this.setState({count: this.state.count+1})
            }} 
        name='ios-add' size={40} />
                  )  
      }
    }
    renderHalfIcon(item){ // checks for item.half property is - or valid to check if icon should be rendered
        if (item.half != '-'){
          return (
            <Icon  onPress={() => {
              const subItem = {
                  name: item.item,
                  portion: 'Half',
                  price: item.half
              }
              const arr = this.state.cartList.concat(subItem)
              this.setState({cartList: arr})
              this.setState({count: this.state.count+1})
              }} 
          name='ios-add' size={40} />
                    )  
        }
    }

    componentDidMount(){ // built in function runs when the component gets rendered for the first time
      fetchIftariMenu() // iftaari menu is fetched as soon the componenent is mounted
      .then( received => {
        console.log(received)
        if(received[0] == 'Menu not available'){
            this.setState({menuAvailable: received[0]})}
          else{
            this.setState({itemList: received})
            
            this.setState({itemListCopy: received})
          }
      })
      .catch(err => console.log(err))
    }

    render(){
     
      if(this.state.menuAvailable == 'Menu not available'){ // checking if state.menuAvailable variable has a menu or not
          return(
            <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} /* allows us to scroll*/ > 
            <View style={styles.row}> {/* components are rendered horizontally */}
              <Icon style={{marginHorizontal: 122}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} /* allows us to open a sidetab/drawer as icon in topleft of screen is clicked*/ />  
                <Text style={styles.titleText}>Menu</Text>
                <Icon onPress={() => this.props.navigation.navigate('cart')} name='md-cart' size={40} /* allows us to navigate to cart screen as cart icon in topRight of screen is clicked*/ /> 
                <Text style={styles.titleText}>Menu</Text>
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
              <Icon style={{marginRight:110}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} /* allows us to open a sidetab/drawer as icon in topleft of screen is clicked*/ />  
                <Text style={styles.titleText}>Menu</Text>
                <Text style={styles.cart}>{this.state.count}</Text>

                <Icon  onPress={() => this.props.navigation.navigate('cart',{cartItems: this.state.cartList})} name='md-cart' size={40} /* allows us to  pass cartList data to cart screen on Icon Press*/ /> 
          </View>
          <View >

            <FlatList
            extraData={true}
            keyExtractor={ item => item.key}
            data={this.state.itemList} //  itemList is passed to FlatList through data prop so it can be used to display menu  
            renderItem={({item}) => (  // each item is being rendered to screen using renderItem prop
              <View >
                  <Text style={styles.subtitleText}>{item.item}</Text> 
                    <View  style={styles.row}>
                            <Text style={styles.subtitleText}>{'Standard  Rs '}{item.standard}{'   '}</Text> 
                            <Icon  onPress={() => {
                                const subItem = {
                                    name: item.item,
                                    portion: 'Standard',
                                    price: item.standard
                                }
                                const arr = this.state.cartList.concat(subItem)  //concats item to cartList
                                this.setState({cartList: arr})
                                this.setState({count: this.state.count+1})  // count incremented as item gets added to cart
                                }} 
                            name='ios-add' size={40} />
                    </View>
                    <View  style={styles.row}>
                            <Text style={styles.subtitleText}>{'Half  Rs '}{item.half}{'   '}</Text> 
                            {
                                this.renderHalfIcon(item) // checks if the item.half + icon needs to be rendered (doesnt render if iten.half == '-') 
                            }
                    </View>
                    <View  style={styles.row}>
                        <Text style={styles.subtitleText}>{'Quarter  Rs '}{item.quarter}{'   '}</Text>{

                        this.renderQuarterIcon(item) // checks if the item.quarter + icon needs to be rendered (doesnt render if iten.half == '-') 
                    }
                     </View>
              </View>
             )}
            />

       </View>
       </ScrollView>
     );
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
  