import React from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {ImageBackground, ActivityIndicator, FlatList ,StyleSheet,TouchableOpacity,  View, Alert, Image} from 'react-native';
import { StackActions, 
  DefaultTheme as NavigationDefaultTheme,
 DarkTheme as NavigationDarkTheme, } from '@react-navigation/native';
import {
  Provider as PaperProvider,
  useTheme,
  Card,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Drawer as PaperDrawer,
  IconButton,
  DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,

} from 'react-native-paper';

export default class suggestion_admin extends React.Component{

  constructor(props){
    super(props)
    this.state = ({
      suggestions: [] //This stores all the suggestions' documents stored in the database
    })
  }
  
  componentDidMount(){                          // A function that is called when the admin enters the reviews' screen
    const SUGGESTIONS = []                      // This variable is used to stores all suggestions fetched from the database
    firestore().collection('Suggestions').get() // The Suggestions collection is fetched. As soon as the promise is returned the following happens
    .then(snapshot => {                       

      snapshot.forEach(doc => {

        SUGGESTIONS.push(doc.data())            //Documents of suggestions are pushed one by one in the SUGGESTIONS variable
      })
      SUGGESTIONS.sort((a, b) => a.created.seconds<b.created.seconds)   //Suggestions being sorted using the timestamp variable stored in each suggestion in the database
      this.setState({suggestions: SUGGESTIONS})                         //The suggestions variable in state is updated with the SUGGESTIONS variables after all documents are fetched
      })
    
    }
    
  render(){
 
    return(
        <View style={styles.container}>
          <Text style={styles.subtitleText}> Customer Suggestions </Text>
            <FlatList
                keyExtractor={ item => item.created.seconds}   //Flatlists require keys to sort it, we set that key component to the timestamp variable
                data={this.state.suggestions}                  //The other thing flatlists require is data, and that is set to pastreviews       
                renderItem={({item})=>{
                    return(
                      <Card style={styles.container}>
                        <Card.Content>
                        <Text style={styles.reviewername}>{item.name}</Text>
                        <Text style={styles.Suggest}>{item.suggestion}</Text>
                        <Text style={styles.Time}>Made on: {item.time}</Text>
                          
                        </Card.Content>
                      </Card>           
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
      alignContent: 'flex-start',
      backgroundColor: '#e2ffdb' 
    },  
    details: {
      alignItems: 'flex-start',
    },
    reviewername: {
      fontSize: 20,
      marginTop: '-1%',
      fontWeight: "bold",
      color: 'black'
    },
    Suggest: {
      fontSize: 16,
      alignSelf: 'flex-start',
      fontWeight: '900',
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
      alignSelf: 'flex-end'
    },
    subtitleText: {
      alignSelf: 'center',
      marginTop: "2%",
      fontSize: 30, 
      color: 'black',
      borderBottomWidth: 1,
      borderBottomColor: 'gray'
  }
  });
  