import React from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {ImageBackground, ActivityIndicator, Button, FlatList ,StyleSheet,TouchableOpacity, View, Alert, TextInput, Image} from 'react-native';
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
                      <Card style={styles.container}>
                        <Card.Content>
                        <Text style={styles.reviewername}>{item.name}</Text>
                        <Text style={styles.review}>{item.review}</Text>
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
      paddingLeft: 0,
      marginVertical: 0
    },
    review: {
      fontSize: 16,
      fontWeight: '900',
      marginHorizontal: 0,
      marginBottom: 0,
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
      alignSelf: 'flex-end',
      marginBottom: '-5%'
    },

    subtitleText: {
      marginTop: '2%',
      alignSelf: 'center',
      fontSize: 30, 
      color: 'black',
      borderBottomWidth: 1,
      borderBottomColor: 'gray'
    }
  });
  