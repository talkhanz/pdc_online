import React from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {ImageBackground, ActivityIndicator, Button, FlatList ,StyleSheet,TouchableOpacity, Text, View, Alert, TextInput, Image} from 'react-native';

export default class review_admin extends React.Component{

  constructor(props){
    super(props)
    this.state = ({
      pastreviews: []
    })
  }
  
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
            <Text style={styles.subtitleText}> Customer Reviews </Text>
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
      alignItems: 'center',
      backgroundColor: '#FFE9EE' 
    },
    details: {
      alignItems:'flex-start'
    },
    reviewername: {
      fontSize: 20,
      fontWeight: "bold",
      color: 'black',
      paddingLeft: '3%',
      marginVertical: '1%'
    },
    review: {
      fontSize: 16,
      fontWeight: '900',
      marginHorizontal: '2.5%',
      marginBottom: '1%',
      letterSpacing:  0.3,
      paddingHorizontal: 8,
      paddingVertical:3,
      textAlign: 'justify',
      backgroundColor: '#fdff9e',
      justifyContent:'flex-end',
      borderWidth: 1,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    Time:{
      color: 'black',
      letterSpacing: 0.5,
      fontWeight: 'bold',
      paddingLeft: '41%'
    },

    subtitleText: {
        marginTop: 10,
        fontSize: 33, 
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset:  {width: -3, height: 3} ,
        textShadowRadius: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'

    }
  });
  