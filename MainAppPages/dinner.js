import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { ScrollView,View, StyleSheet,TouchableOpacity, FlatList,Picker, Alert, Button, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import firestore, { firebase } from '@react-native-firebase/firestore';

import {fetchDinnerMenu} from './fetcher';
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
    Card,

} from 'react-native-paper';

var  globalTheme =  {
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.Colors,
    primary: '#E9446A',
    accent: '#f1c40f',
  },
  };

export default class iftari extends React.Component {
    state = {
      menuAvailable: '',
      itemList : [],
      cartList:[],
      count : 0,
      gifNames: []
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
      fetchDinnerMenu()  // extracts sehri menu  
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
            //scroll tags allow us to scroll
            <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} >
           <Appbar style={styles.row}>
                 <Icon style={{marginLeft: '3%'}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} />
                   <Title style={styles.titleText}>Menu</Title>
                     <View style={{flexDirection:'row'}}>
                         <Text style={styles.cart}>{this.state.count}</Text>
                         <Icon onPress={() => this.props.navigation.navigate('cart',{cartItems: this.state.cartList})} name='md-cart' size={40} /* allows us to  pass cartList data to cart screen on Icon Press*//>  
                     </View>
             </Appbar>
             <Text style={{marginVertical: 10,fontSize: 20,paddingVertical: 200,paddingLeft: '25%'}} >Menu not available</Text>
 
          </ScrollView>
          )
      }
      return ( //otherwise will display menu 
        <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={{color:'#FFDAE3'}} >
        <Appbar style={styles.row}>
            <Icon style={{marginLeft: '3%'}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} />
              <Title style={styles.titleText}>Menu</Title>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.cart}>{this.state.count}</Text>
                    <Icon onPress={() => this.props.navigation.navigate('cart',{cartItems: this.state.cartList})} name='md-cart' size={40} /* allows us to  pass cartList data to cart screen on Icon Press*//>  
                </View>
        </Appbar>


          <FlatList
          removeClippedSubviews={true}
          extraData={true}
          keyExtractor={ item => item.key}
          data={this.state.itemList} // we get our menu from itemList and storing it in data prop 
           renderItem={({item}) => ( // each item is being rendered to screen using renderItem prop
<Card style={styles.screen}>
  <Card.Title title={item.item}/>
  <Card.Content>
   
  </Card.Content>
  <Card.Cover   style={styles.box}  source={require('./breakfast.jpeg')} />
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
                  <Card.Actions>
        <Button onPress={() =>{ this.props.navigation.navigate('cart',{cartItems: this.state.cartList})}}>Proceed to cart?</Button>
      </Card.Actions>
      </View>

      
      

 
</Card> )} />

       
     </ScrollView>
             );
    }
  }
  
  const styles = StyleSheet.create({

    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        color: 'black',
      },
      subtitleText: {
        marginVertical: 10,
        fontSize: 20, 
      },
      screen:{
        backgroundColor:'#FEDBD0',
      } , 
      box: {
        borderWidth: 5,
        marginHorizontal: 5,

    
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: 250,
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
        backgroundColor:'#E9446A'
      },
      cart:{
        fontSize: 30,
        fontWeight: "bold",
        color: 'black',
      }
   });
  