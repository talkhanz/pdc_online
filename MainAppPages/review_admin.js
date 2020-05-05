import React from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {ImageBackground, ActivityIndicator, Button, FlatList ,StyleSheet,TouchableOpacity, Text, View, Alert, TextInput, Image} from 'react-native';

export default class Review extends React.Component{

  componentDidMount(){
    const REVIEWS = []
    firestore().collection('Reviews').get()
    .then(snapshot => {
      
      snapshot.forEach(doc => {

        REVIEWS.push(doc.data())
      })
      REVIEWS.sort((a, b) => a.created.seconds<b.created.seconds)
      this.setState({pastreviews: REVIEWS})
      })
    
    }
    
  render(){
 
    return(
        <View style={styles.container}>
            <FlatList
                keyExtractor={ item => item.created.seconds}
                data={this.state.pastreviews}
                renderItem={({item})=>{
                    return(
                      <View style={styles.details}>
                        <Text style={styles.reviewername}>{item.name}</Text>
                        <Text style={styles.review}>{item.review}</Text>
                        <Text style={styles.Time}>Made on: {item.time}</Text>
                      </View>
                    )}
              }
            />
        </View>
      
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'gainsboro',
      alignItems: 'center'
      
    },
    details: {
      alignItems:'flex-start'
    },
    reviewername: {
      fontSize: 20,
      fontWeight: "bold",
      color: 'black'
    },
    review: {
      fontSize: 15,
      backgroundColor: 'pink'
    },
    Time:{
      alignContent: 'flex-end'
    },
    box: {
      justifyContent:'flex-end',
      borderWidth: 5,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      height: 100,
      width: 400
    },
    subtitleText: {
        marginVertical: 7,
        fontSize: 33, 
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset:  {width: -3, height: 3} ,
        textShadowRadius: 10
    },
    TextInput:{
      marginVertical: 5,
      height: 40, 
      width: '60%',
      backgroundColor: 'white',
      borderColor: 'black', 
      borderWidth: 1 ,
    }, 
    button: {
      backgroundColor: '#E9446A',
      marginHorizontal: 5,
      marginVertical: 15,
      borderRadius: 4,
      borderColor: '#CA2161',
      borderWidth: 1,
      height: 52,
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 100
    }   
  });
  