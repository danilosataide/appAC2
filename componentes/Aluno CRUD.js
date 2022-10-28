import { useState } from 'react';
import { deleteDoc, collection, doc, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../Core/Config';

export default function App() {
  const [userDoc, setUserDoc] = useState(null)
  const [text, setText] = useState("")

  const Create = () => {
    const myDoc = collection(db, "Aluno");

    const docData = {
      "nome": "Danilo da Silva Ataide",
      "matricula": "200886",
      "foto": "/",
      "endereço": "Rua A 45 Bairro C",
      "cidade": "Sorocaba"
    }

    addDoc(myDoc, docData)
      .then(() => {
        alert("Document Created!")
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const Read = () => {
    const myDoc = doc(db, "Aluno", "YvYkxjD5QOOhY55U9Iyr")

    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserDoc(snapshot.data())
          console.log(userDoc)
        }
        else {
          alert("No Doc Found")
        }
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const Update = (value, merge) => {
    const myDoc = doc(db, "Aluno", "YvYkxjD5QOOhY55U9Iyr")

    setDoc(myDoc, value, { merge: merge })
      .then(() => {
        alert("Updated Successfully!")
        setText("")
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const Delete = () => {
    const myDoc = doc(db, "Aluno", "YvYkxjD5QOOhY55U9Iyr")

    deleteDoc(myDoc)
      .then(() => {
        alert("Deleted Successfully!")
      })
      .catch((error) => {
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
      }} disabled={text === ''}></Button>

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
