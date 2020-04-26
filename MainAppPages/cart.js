import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View, StyleSheet,TouchableOpacity, FlatList, Alert} from 'react-native';


export default class cart extends React.Component {
    state = {

    }
    
    render(){
        if(this.props.route.params){
            return (
                <View style={styles.titleback}>
                     <Text style={styles.titleText}>Cart</Text>
               <Text>{this.props.route.params.item}</Text>
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
      }
   });
  