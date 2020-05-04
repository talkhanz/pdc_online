import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, ScrollView,View, StyleSheet,TouchableOpacity, FlatList,Picker, Alert, Button, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import firestore, { firebase } from '@react-native-firebase/firestore';
import {fetchSehriMenu} from './fetcher';

export default class sehri extends React.Component {
    state = {
      menuAvailable: '',
      itemList : [],
      cartList:[],
      count : 0,
      uri: require('./images/notexist.gif')
    }
    renderQuarterIcon(item){ // checks for item.quarter property and if icon should be rendered
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
    renderHalfIcon(item){ // built in function runs when the component gets rendered for the first time
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
    componentDidMount(){ //built in function runs when the component gets rendered for the first time
      fetchSehriMenu()  // extracts sehri menu  
      .then( received => {
        if(received[0] == 'Menu not available'){
            this.setState({menuAvailable: received[0]})}
        else{
          this.setState({itemList: received})
        }
      })
      .catch(err => console.log(err))
    }
    render(){    
      if(this.state.menuAvailable == 'Menu not available'){ //checks if menu available
          return(
            //scroll component allows us to scroll
            <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} >
            <View style={styles.row} /*styles.row helps render comps horizontally  */> 
              <Icon style={{marginLeft: '3%'}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} /* on clicking this icon we get a side tab/drawer */ />
                <Text style={styles.titleText}>Menu</Text>
                <Icon style={{marginRight: '3%'}} onPress={() => this.props.navigation.navigate('cart')} name='md-cart' size={40} /*clicking cart icon navigates to cart screen*/ /> 
            </View>
            <View style={styles.titleback}>
            <Text style={{marginVertical: 10,fontSize: 20,paddingVertical: 250}}>Menu not available</Text>
            </View>
          </ScrollView>
          )
      }
      return ( //otherwise will display menu 
        <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} >
          <View style={styles.row}>
              <Icon style={{marginLeft: '3%'}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} />
                <Text style={styles.titleText}>Menu</Text>
                  <View style={{flexDirection:'row'}}>
                      <Text style={styles.cart}>{this.state.count}</Text>
                      <Icon onPress={() => this.props.navigation.navigate('cart',{cartItems: this.state.cartList})} name='md-cart' size={40} /* allows us to  pass cartList data to cart screen on Icon Press*//>  
                  </View>
          </View>

          <View >
            <FlatList
            removeClippedSubviews={true}
            extraData={true}
            keyExtractor={ item => item.key}
            data={this.state.itemList} // we get our menu from itemList and storing it in data prop 
             renderItem={({item}) => ( // each item is being rendered to screen using renderItem prop
              <View style={{alignItems:'center'}}>
                  <Text style={{marginVertical: 10,fontSize: 30,}}>{item.item}</Text> 
                  <FastImage
                      style={{ width: 200, height: 200 }}
                      source={require('./images/DaalMoongMasoor.gif')}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                    <View  style={{flex: 1,justifyContent: 'center',flexDirection: 'row'}} /*flexDirection row renders components horizontally */> 
                            <Text style={styles.subtitleText}>{'Standard  Rs '}{item.standard}{'   '}</Text> 
                            <Icon  onPress={() => { /* + icon for adding item */
                                const subItem = {
                                    name: item.item,
                                    portion: 'Standard',
                                    price: item.standard
                                }
                                const arr = this.state.cartList.concat(subItem) //concats item to cartList
                                this.setState({cartList: arr})
                                this.setState({count: this.state.count+1}) // count incremented as item gets added to cart
                                }} 
                            name='ios-add' size={40} />
                    </View>
                    <View  style={{flex: 1,justifyContent: 'center',flexDirection: 'row',}}>
                            <Text style={styles.subtitleText}>{'Half  Rs '}{item.half}{'   '}</Text> 
                            {
                                this.renderHalfIcon(item) // checks if the item.half + icon needs to be rendered (doesnt render if iten.half == '-') 
                            }
                    </View>
                    <View  style={{flex: 1,justifyContent: 'center',flexDirection: 'row',}}>
                        <Text style={styles.subtitleText}>{'Quarter  Rs '}{item.quarter}{'   '}</Text>{

                        this.renderQuarterIcon(item) // checks if the item.quarter + icon needs to be rendered (doesnt render if iten.quarter == '-') 
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor:'#f46a'
      },
      cart:{
        fontSize: 30,
        fontWeight: "bold",
        color: 'black',
      }
   });
  