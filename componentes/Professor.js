import { Button, FlatList, ImageBackground, Text, TextInput, View, StyleSheet } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { BackgroundContext } from "../context/current-background";

import { deleteDoc, query, collection, onSnapshot, doc, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../Core/Config';

export default function Professor() {
  const myDoc = collection(db, "Professor");

  const { currentBackground } = useContext(BackgroundContext);

  const [idToEdit, setIdToEdit] = useState();
  const [professores, setProfessores] = useState([]);
  const [formProfessores, setFormProfessores] = useState({
    cod_prof: '',
    nome: '',
    endereco: '',
    cidade: '',
  });

  useEffect(() => {
    const q = query(collection(db, "Professor"));
    onSnapshot(q, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
      setProfessores(result);
    });
  }, []);

  const postProfessor = (value) => {
    addDoc(myDoc, value)
      .then(() => alert("Professor Salvo!"))
      .catch((error) => alert(error.message));
  }

  const addToEditMode = (personData) => {
    setIdToEdit(personData.id);
    setFormProfessores(personData);
  }

  const Delete = (value) => {
    const myDoc = doc(db, "Professor", value)

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
      <ImageBackground style={{ height: '100%' }} source={currentBackground}>
        <View style={styles.form}>
          <Text style={styles.texto}>Nome</Text>
          <TextInput
            style={styles.input}
            value={formProfessores.nome}
            onChangeText={nome => setFormProfessores({...formProfessores, nome})}
          />

          <Text style={styles.texto}>Endereço</Text>
          <TextInput
            style={styles.input}
            value={formProfessores.endereco}
            onChangeText={endereco => setFormProfessores({...formProfessores, endereco})}
          />

          <Text style={styles.texto}>Cidade</Text>
          <TextInput
            style={styles.input}
            value={formProfessores.cidade}
            onChangeText={cidade => setFormProfessores({...formProfessores, cidade})}
          />

          <View style={styles.button}>
            <Button
              title={idToEdit ? 'Editar Professor' : 'Adicionar Professor'}
              color="#2196F3"
              onPress={async () => {
                if (idToEdit) {
                  setDoc(doc(db, "Professor", idToEdit), {
                    cod_prof: formProfessores.cod_prof,
                    nome: formProfessores.nome,
                    endereco: formProfessores.endereco,
                    cidade: formProfessores.cidade,
                  },{merge:true})
                  .then(() => {
                    alert("Alterações salvas!")
                  })
                  .catch((error) => {
                    alert(error.message)
                  });
                  
                  professores.forEach((professor, index) => {
                    if (professor.id === idToEdit)
                      professores[index] = { ...formProfessores, id: idToEdit};
                    else
                      professores[index] = professor;
                  });
      
                  setIdToEdit(undefined);
                  setProfessores(professores);
                } else {
                  const cot = {...formProfessores, cod_prof:professores.length+1}
                  setFormProfessores(cot)
                  setProfessores([...professores, cot])
                  await postProfessor(cot);
                }

                setFormProfessores({
                  cod_prof: '',
                  nome: '',
                  endereco: '',
                  cidade: '',
                });
              }}
            />
          </View>
        </View>
        
        <FlatList
            data={professores}
            renderItem={({ item, index }) => <>
              <Text key={index}>
                Nome: {item.nome}, Endereço: {item.endereco}, Cidade: {item.cidade}
              </Text>
              <Button 
                title="Editar"
                onPress={() => addToEditMode(item)}  
              />
              <Button title='Excluir'
                onPress={() => {
                  Delete(
                    item.id
                  )
                }}
              ></Button>
            </>
            }
          />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },  
  form:{
    padding: 20,
    backgroundColor: '#79bdf2',
  },
  texto: {
    marginTop: '1rem',
    fontWeight: 'bold', 
    color: "#fff"//2196F3
  },
  button: {
    paddingVertical: '1rem',
  },
  input: {
    marginTop: 2,
    border: '2px solid #2196F3',
    backgroundColor: '#fff'
  }
});


