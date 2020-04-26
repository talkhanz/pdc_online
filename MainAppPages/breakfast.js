import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, ScrollView,View, StyleSheet,TouchableOpacity, FlatList,Picker, Alert, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import {fetchBreakfastMenu} from './fetcher';


export default class breakfast extends React.Component {
    state = {
      menuAvailable: '',
      itemList : [],
      itemListCopy: [],
      cartList:[],
      count : 0, 
    }

    componentDidMount(){
      fetchBreakfastMenu()
      .then( received => {
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
                      {item.item}
                      
                  </Text> 
                  <Picker
                    selectedValue={item}
                    style={{height: 50, width: 100}}
                   >
                    <Picker.Item label={"Quarter: Rs " +item.quarter} value={item.quarter} />
                    <Picker.Item label={"Half: Rs " + item.half} svalue={item.half} />
                    <Picker.Item label={"Full: Rs " +item.quarter} value={item.full} />
                  </Picker>
                  <Icon  onPress={() => {
                    this.setState({cartList: this.state.cartList.push(item)})
                    this.setState({count: this.state.count+1})
                    }} name='ios-add' size={40} />
              </View>
             )}
            />
            <Button title='CHECKOUT' onPress={() => this.props.navigation.navigate('cart',{cartItems: this.state.cartList})}></Button>
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
  