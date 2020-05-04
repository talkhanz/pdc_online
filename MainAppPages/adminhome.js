import 'react-native-gesture-handler';
import React from 'react';
import { StackActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons'
import {Button, StyleSheet, Text, View, Image,BackHandler,ScrollView,TouchableOpacity} from 'react-native';

export default class adminhome extends React.Component {
  componentDidMount(){
    this.backhandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if(this.props.navigation.isFocused()){
        BackHandler.exitApp() 
      }
    })
  }
  
  render(){
    return (    
        
     <ScrollView backgroundColor={'lightgrey'} persistentScrollbar= {true} showsVerticalScrollIndicator= {true} styles={styles.scroll} /* allows us to scroll */ > 
        <View style={styles.row}>
          <Text style={styles.titleText}>Admin Home</Text>
          <View style={{marginRight:'3%'}}>
          <Icon  onPress={() =>{
              auth().signOut().catch(err => console.log(err));            // signs out user
              this.props.navigation.closeDrawer()                         // closes the drawer
              this.props.navigation.dispatch(StackActions.popToTop());    // clears all screens from stack except 1st login screen so user is navigated to login screen
            }} style={{marginLeft: 17}} name='ios-log-out' size={40} /* This is our drawer that has been defined with the repective screens in App.js */ />    
            <Text style={{fontSize:17, marginTop:-5}}>Sign Out</Text>
          </View>

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
              <Image style={styles.Img} source={require('./images/sales-box2.jpg')} />
              <Text style={styles.sessioname}>Sales Logs</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('adminManageVouchers')} /* navigates to verifyOrder page onPress*/>  
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./voucher.png')} />
              <Text style={styles.sessioname}>Manage Vouchers</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('choosefeedback')} /* navigates to verifyOrder page onPress*/>  
            <View style={styles.box}>
              <Image style={styles.Img} source={require('./images/feedback.png')} />
              <Text style={styles.sessioname}>Feedback</Text>
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
    marginBottom: '2%',
    borderWidth: 5,
    backgroundColor: 'white',
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
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  titleText: {
    fontSize: 30,
    marginRight: '10%',
    fontWeight: "bold",
    color: 'black'
  },
  Img: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'center',
    backgroundColor:'#f46a',
    height:60
  }   
 });