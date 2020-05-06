import React from 'react';
import {Button, StyleSheet, Text, View, Image, ScrollView,TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default class salesLogs extends React.Component {
    componentDidMount(){
        
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titleText}>Sales Logs</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    titleText: {
      fontSize: 30,
      fontWeight: "bold",
      paddingTop: '2%',
      color: 'black'
    },  
   });