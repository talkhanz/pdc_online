import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, ScrollView,View, StyleSheet,TouchableOpacity, FlatList,Picker, Alert, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import {fetchSehriMenu} from './fetcher';

export default class sehri extends React.Component {
    state = {
      menuAvailable: '',
      itemList : [],
      itemListCopy: [],
      cartList:[],
      count : 0, 
    }
    renderQuarterIcon(item){
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
    renderHalfIcon(item){
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
    

    componentDidMount(){
      fetchSehriMenu()
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
     
      if(this.state.menuAvailable == 'Menu not available'){
          return(
            <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} >
            <View style={styles.row}>
              <Icon style={{marginHorizontal: 122}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} />
                <Text style={styles.titleText}>Menu</Text>
                <Icon onPress={() => this.props.navigation.navigate('cart')} name='md-cart' size={40} />
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

                <Icon  onPress={() => this.props.navigation.navigate('cart',{cartItems: this.state.cartList})} name='md-cart' size={40} />
          </View>
          <View >

            <FlatList
            extraData={true}
            keyExtractor={ item => item.key}
            data={this.state.itemList}
            renderItem={({item}) => (
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
                                const arr = this.state.cartList.concat(subItem)
                                this.setState({cartList: arr})
                                this.setState({count: this.state.count+1})
                                }} 
                            name='ios-add' size={40} />
                    </View>
                    <View  style={styles.row}>
                            <Text style={styles.subtitleText}>{'Half  Rs '}{item.half}{'   '}</Text> 
                            {
                                this.renderHalfIcon(item)
                            }
                    </View>
                    <View  style={styles.row}>
                        <Text style={styles.subtitleText}>{'Quarter  Rs '}{item.quarter}{'   '}</Text>{

                        this.renderQuarterIcon(item)
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
  