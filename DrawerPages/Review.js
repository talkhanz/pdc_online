import React from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {ImageBackground, ActivityIndicator, Button, FlatList ,StyleSheet,TouchableOpacity, Text, View, Alert, TextInput, Image} from 'react-native';
import moment from "moment";
export default class Review extends React.Component{
  
  constructor(props){     
    super(props)
    this.state = ({
      pastreviews: [],                         //This stores all the reviews' documents stored in the database
      email: auth().currentUser.email,        //User email and.. 
      name: auth().currentUser.displayName,   //..user's name email is extracted from the database
      review: ''                              //This variable stores the review that the user writes themself
    })
  }

  async publishreview(){                                          //A function created to store the review a user enters, to the database
      const reviewCollection = firestore().collection('Reviews')  //This variable is a reference to the reviews collection in the database
                                                                  //Using this we can read & write data to this collection
      const REVIEWS = []                                          //This variable is used to stores all reviews fetched from the database

      reviewCollection.add({          //The review, entered by the user, is stored in the database by calling the builtin add function of firestore
          name : this.state.name,       
          email : this.state.email,
          review: this.state.review,
          created: firebase.firestore.Timestamp.fromDate(new Date()), //This timestamp variable is stored so we can sort our reviews by time when fetching them
          time: moment()        //This variable is used to display the time at which the review was made
          .utcOffset('+05:00')
          .format('DD-MM-YYYY hh:mm:ss a')
      }).then(()=> {
          reviewCollection.get().then(snapshot => {     //This collects the reviews again after a user posts a review so that they can now see their own review as well
           
            snapshot.forEach(doc => {

              REVIEWS.push(doc.data())                //Documents of reviews are pushed one by one in the REVIEWS variable
            })
            REVIEWS.sort((a, b) => a.created.seconds<b.created.seconds) //Reviews being sorted using the timestamp variable stored in each review in the database
            this.setState({pastreviews: REVIEWS})   //The pastreviews variable is updated with the REVIEWS variables after all reviews are fetched
            })
            
          })
          
      .catch((err)=> {
          console.log(err)
      })
  } 
  
  componentDidMount(){     // This does the exact same thing as the functions in the .then() handler above. This only happens when the user opens the review screen
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
        <Text style={styles.subtitleText}> Review </Text>
        <TextInput style={styles.TextInput} onChangeText={input => this.setState({review:input})} value={this.state.review} placeholder='Write your review here' textAlign={'center'} ></TextInput>
               
        
        <TouchableOpacity onPress={() => this.publishreview()} style={styles.button} /* This calls the function that stores the review in the database*/ >  
            <Text style={{color: 'black', fontSize: 17}} title="Submit" >Submit</Text>
        </TouchableOpacity>
        
        <FlatList          
            keyExtractor={ item => item.created.seconds}      //Flatlists require keys to sort it, we set that key component to the timestamp variable
            data={this.state.pastreviews}                     //The other thing flatlists require is data, and that is set to pastreviews
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
      backgroundColor: '#FEDBD0' 
    },
    details: {
      alignItems:'flex-start'
    },
    reviewername: {
      fontSize: 20,
      fontWeight: "bold",
      color: 'black',
      paddingLeft: 10,
      paddingBottom: 2
    },
    review: {
      fontSize: 16,
      marginHorizontal: 10,
      marginVertical: 3,
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
      marginRight: '4%',
      alignSelf: 'flex-end'
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
        marginTop: 10,
        fontSize: 40, 
        color: 'black'
    },
    TextInput:{
      marginVertical: 5,
      height: 40, 
      width: '60%',
      borderColor: 'black', 
      borderBottomWidth: 1,
      borderColor: 'darkgrey'
    },
    button: {
      backgroundColor: '#a09eff',
      marginVertical: '4%',
      borderRadius: 4,
      borderColor: 'black',
      borderWidth: 1,
      height: 53,
      width: 140,
      alignItems: 'center',
      justifyContent: 'center'
    }  
  });
  