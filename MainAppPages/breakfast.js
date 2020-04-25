import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View, StyleSheet,TouchableOpacity, FlatList, Alert} from 'react-native';
import { WebView } from 'react-native-webview';

import {fetchBreakfastMenu} from './fetcher';

export default class breakfast extends React.Component {
    state = {
      menuAvailable: '',
      itemList : []
    }

    componentDidMount(){
      fetchBreakfastMenu()
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
            <View style={styles.titleback}>
            <Text style={styles.titleText}>Menu</Text>
            <Text style={{marginVertical: 10,fontSize: 20,paddingVertical: 250}}>Menu not available</Text>
            </View>
          )
      }
      return (
       <View style={styles.titleback}>
            <Text style={styles.titleText}>Menu</Text>
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
      }
   });
  