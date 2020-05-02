import 'react-native-gesture-handler';
import React from 'react';

import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons'
import {Button, StyleSheet, Text, View, Image, ScrollView,TouchableOpacity} from 'react-native';

export default class adminhome extends React.Component {
  
  render(){
    return (    
        
     <ScrollView persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} /* allows us to scroll */ > 
        <View style={styles.row}>
            <Icon style={{marginRight: 90}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} /* function in onPress prop opens sidetab/drawer*/ /> 
            <Text style={styles.titleText}>Admin Home</Text>
            </View>
        <View style={styles.titleback}>
         
          <TouchableOpacity onPress={() => this.props.navigation.navigate('adminVerifyOrder')} /* navigates to verifyOrder page onPress*/>  
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./qrscan.jpg')} />
              <Text style={styles.sessioname}>Verify Order</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('salesLogs')} >
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./logs.jpg')} />
              <Text style={styles.sessioname}>Sales Logs</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('adminManageVouchers')} /* navigates to verifyOrder page onPress*/>  
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./voucher.png')} />
              <Text style={styles.sessioname}>Manage Vouchers</Text>
              </View>
          </TouchableOpacity>
        
        </View>
     </ScrollView>
     
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  box: {
    alignItems: 'center',
    borderWidth: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 267,
  },
  cart:{
    alignItems: 'center',
    
    paddingLeft: 100 ,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 45,
    width : 45

  },
 
  titleback: {
    backgroundColor:'navajowhite',
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: '2%',
    color: 'black'
  },
  Img: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 220,
    width: 380
  },
  sessioname: {
    fontSize: 25,
    paddingBottom: '6%',
    color: 'black'
  },
  scroll: {
    flexDirection: 'column',
    borderStyle: 'solid',
    position: 'relative'
  },
  row: {
    flex: 1,
    marginLeft: 10,
    //justifyContent: 'center',
    flexDirection: 'row'
  }   
 });