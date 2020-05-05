import React from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {ImageBackground, ActivityIndicator, FlatList ,StyleSheet,TouchableOpacity, Text, View, Alert, Image} from 'react-native';

export default class suggestion_admin extends React.Component{

  constructor(props){
    super(props)
    this.state = ({
      suggestions: []
    })
  }
  
  componentDidMount(){
    const SUGGESTIONS = []
    firestore().collection('Suggestions').get()
    .then(snapshot => {
      
      snapshot.forEach(doc => {

        SUGGESTIONS.push(doc.data())
      })
      SUGGESTIONS.sort((a, b) => a.created.seconds<b.created.seconds)
      this.setState({suggestions: SUGGESTIONS})
      })
    
    }
    
  render(){
 
    return(
        <View style={styles.container}>
          <Text style={styles.subtitleText}> Customer Suggestions </Text>
            <FlatList
                keyExtractor={ item => item.created.seconds}
                data={this.state.suggestions}
                renderItem={({item})=>{
                    return(
                      <View style={styles.details}>
                        <Text style={styles.reviewername}>{item.name}</Text>
                        <Text style={styles.Suggest}>{item.suggestion}</Text>
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
    container:{
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#e2ffdb' 
    },  
    details: {
      alignItems: 'flex-start'
    },
    reviewername: {
      fontSize: 20,
      fontWeight: "bold",
      color: 'black',
      paddingLeft: '3%',
      marginVertical: '1%'
    },
    Suggest: {
      fontSize: 16,
      fontWeight: '900',
      marginHorizontal: '2.5%',
      marginBottom: '1%',
      letterSpacing:  0.3,
      paddingHorizontal: '2%',
      paddingVertical: '1%',
      textAlign: 'justify',
      backgroundColor: '#fdff9e',
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
      marginRight: '4%',
      alignSelf: 'flex-end'
    },
    subtitleText: {
      marginTop: 10,
      fontSize: 33, 
      color: 'black',
      borderBottomWidth: 1,
      borderBottomColor: 'gray'

  }
  });
  