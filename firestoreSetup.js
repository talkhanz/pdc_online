import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const db = firestore();
  
export function addUser(userID,user){

        db.collection('Users').doc(userID)
        .set(user)
        .then(() => {
            console.log('User added!');
        });
}  

export async function showUser(){
    
  var IDs = []
  var Fields = []

  await db.collection('Users').get()
  .then(snapshot => {
      snapshot.forEach( doc => {
          Fields.push(doc.data())
          IDs.push(doc.id)
      })
  })
  .catch(err => console.log(err))

  return {
    key1: IDs,
    key2: Fields
  }
}