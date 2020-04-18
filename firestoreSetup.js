import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

export function addUser(user){
    const db = firebase.firestore();

    db.collection('Users').get()
    .then((data) => {
        console.log(data.data())
        console.log('this is dataaaaaaaaaa')})
    .catch((error) => {
        console.log(error)
        console.log('errooooooooooooor')})
}  