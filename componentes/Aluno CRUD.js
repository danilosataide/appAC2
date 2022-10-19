import { StatusBar } from 'expo-status-bar';
import { deleteDoc, collection, doc, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
// Using DB Reference
import { db } from './Core/Config'

export default function App() {
  // Storing User Data
  const [userDoc, setUserDoc] = useState(null)
  // Update Text
  const [text, setText] = useState("")

  // CRUD functions
  // MARK: CRUD Function
  const Create = () => {
    // MARK: Creating New Doc in Firebase
    // Before that enable Firebase in Firebase Console
    
    const myDoc = collection(db, "Aluno")

    // Your Document Goes Here
    const docData = {
      "nome": "Danilo da Silva Ataide",
      "matricula": "200886",
      "foto": "/",
      "endereço": "Rua A 45 Bairro C",
      "cidade": "Sorocaba"
    }

    addDoc(myDoc, docData)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Document Created!")
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message)
      })
  }

  const Read = () => {
    // MARK: Reading Doc
    // You can read what ever document by changing the collection and document path here
    const myDoc = doc(db, "Aluno", "YvYkxjD5QOOhY55U9Iyr")

    getDoc(myDoc)
      // Handling Promises
      .then((snapshot) => {
        // MARK: Success
        if (snapshot.exists) {
          setUserDoc(snapshot.data())
          console.log(userDoc)
        }
        else {
          alert("No Doc Found")
        }
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message)
      })
  }

  const Update = (value, merge) => {
    // MARK: Updating Doc
    const myDoc = doc(db, "Aluno", "YvYkxjD5QOOhY55U9Iyr")

    // If you set merge true then it will merge with existing doc otherwise it will be a fresh one
    setDoc(myDoc, value, { merge: merge })
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Updated Successfully!")
        setText("")
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message)
      })
  }

  const Delete = () => {
    // MARK: Deleting Doc
    const myDoc = doc(db, "Aluno", "YvYkxjD5QOOhY55U9Iyr")

    deleteDoc(myDoc)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Deleted Successfully!")
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message)
      })

  }

  return (
    <View style={styles.container}>
      <Button title="Create new Aluno" onPress={Create}></Button>

      <Button title='Read Doc' onPress={Read}></Button>
      {
        userDoc != null &&
        <Text>Bio: {userDoc.bio}</Text>
      }
      <TextInput style={{
        width: '95%',
        fontSize: 18,
        padding: 12,
        borderColor: 'gray',
        borderWidth: 0.2,
        borderRadius: 10,
        marginVertical: 20
      }} placeholder='Editar nome' onChangeText={(text) => { setText(text) }} value={text}></TextInput>

      <Button title='Update Doc' onPress={() => {
        Update({
          "nome": text
        }, true)
      }} disabled={text == ""}></Button>

      <Button title='Delete Doc' onPress={Delete}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});