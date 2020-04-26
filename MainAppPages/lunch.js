import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View, ScrollView,StyleSheet,TouchableOpacity, FlatList,Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import {fetchLunchMenu} from './fetcher';

export default class breakfast extends React.Component {
    state = {
      menuAvailable: '',
      itemList : []
    }

    componentDidMount(){
        fetchLunchMenu()
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
        if(this.state.menuAvailable == 'Menu not available'){
            return(
              <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} >
              <View style={styles.row}>
                <Icon style={{marginHorizontal: 122}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} />
                  <Text style={styles.titleText}>Menu</Text>
                <Icon style={{marginHorizontal:122}} onPress={() => this.props.navigation.navigate('cart')} name='md-cart' size={40} />
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
              <Icon style={{marginHorizontal: 122}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} />
                <Text style={styles.titleText}>Menu</Text>
                <Icon style={{marginHorizontal:122}} onPress={() => this.props.navigation.navigate('cart')} name='md-cart' size={40} />
          </View>
          <View style={styles.titleback}>

            <Text style={styles.subtitleText}>
                Item{'  '}Quarter{'  '}Half{'  '}Standard
            </Text>
            <FlatList
            keyExtractor={ item => item.key}
            data={this.state.itemList}
            renderItem={({item}) => (
              <TouchableOpacity>
                  <Text style={styles.subtitleText}>
                      {item.item}{'    Rs/'}{item.quarter}{'    Rs/'}{item.half}{'    Rs/'}{item.standard}
                  </Text> 
              </TouchableOpacity>
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
      cart:{
        alignItems: 'center',
        borderWidth: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: 45,
        width : 45
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
      }   
   });
  