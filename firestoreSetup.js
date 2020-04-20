import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const db = firebase.firestore();
  
export function addUser(user){

        db.collection('Users').doc('21100313')
        .update(user)
        .then(() => {
            console.log('User added!');
        });
}  

export async function showUser(){
    
    var toReturn = []

    await firebase.firestore().collection('Users').get()
      .then( snapshot => {
          const ListOfUsers = []
          snapshot.forEach( doc => {
            ListOfUsers.push(doc.data())
          })  
          toReturn = ListOfUsers
      })
      .catch(error => console.log(error))

      return toReturn
}