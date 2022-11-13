import { Button, FlatList, ImageBackground, Text, TextInput, View, StyleSheet } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { BackgroundContext } from "../context/current-background";

import { deleteDoc, query, collection, onSnapshot, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../Core/Config';

export default function Disciplina() {
  const myDoc = collection(db, "Disciplina");

  const { currentBackground } = useContext(BackgroundContext);

  const [idToEdit, setIdToEdit] = useState();
  const [disciplinas, setDisciplinas] = useState([]);
  const [formDisciplinas, setFormDisciplinas] = useState({
    cod_disc: '',
    carga_hor: '',
    nome_disc: '',
  });

  useEffect(() => {
    const q = query(collection(db, "Disciplina"));
    onSnapshot(q, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
      setDisciplinas(result);
    });
  }, []);

  const postDisciplina = (value) => {
    addDoc(myDoc, value)
      .then(() => alert("Disciplina Salva!"))
      .catch((error) => alert(error.message));
  }

  const Delete = (value) => {
    const myDoc = doc(db, "Disciplina", value)

    deleteDoc(myDoc)
      .then(() => {
        alert("Disciplina excluída!")
      })
      .catch((error) => {
        alert(error.message)
      })

  }

  const addToEditMode = (personData) => {
    setIdToEdit(personData.id);
    setFormDisciplinas(personData);
  }


  return (
    <View style={styles.container}>
      <ImageBackground style={{ height: '100%' }} source={currentBackground}>
        <View style={styles.form}>
          <Text style={styles.texto}>Nome</Text>
          <TextInput
            style={styles.input}
            value={formDisciplinas.nome_disc}
            onChangeText={nome_disc => setFormDisciplinas({...formDisciplinas, nome_disc})}
          />

          <Text style={styles.texto}>Carga Horária</Text>
          <TextInput
            style={styles.input}
            value={formDisciplinas.carga_hor}
            onChangeText={carga_hor => setFormDisciplinas({...formDisciplinas, carga_hor})}
          />

          <View style={styles.button}>
            <Button
              title={idToEdit ? 'Editar Disciplina' : 'Adicionar Disciplina'}
              color="#2196F3"
              onPress={async () => {
                if (idToEdit) {
                  setDoc(doc(db, "Disciplina", idToEdit), {
                    carga_hor: formDisciplinas.carga_hor,
                    nome_disc: formDisciplinas.nome_disc,
                  },{merge:true})
                  .then(() => {
                    alert("Alterações salvas!")
                  })
                  .catch((error) => {
                    alert(error.message)
                  });
                  
                  disciplinas.forEach((disciplina, index) => {
                    if (disciplina.id === idToEdit)
                      disciplinas[index] = { ...formDisciplinas, id: idToEdit};
                    else
                      disciplinas[index] = disciplina;
                  });
      
                  setIdToEdit(undefined);
                  setDisciplinas(disciplinas);
                } else {
                  const cot = {...formDisciplinas, cod_disc:disciplinas.length+1}
                  setFormDisciplinas(cot)
                  setDisciplinas([...disciplinas, cot])
                  await postDisciplina(cot);
                }

                setFormDisciplinas({
                  cod_disc: '',
                  carga_hor: '',
                  nome_disc: '',
                });
              }}
            />
          </View>
        </View>
        
        <FlatList
            data={disciplinas}
            renderItem={({ item, index }) => <>
              <Text key={index}>
                Nome da Disciplina: {item.nome_disc}, Carga Horária: {item.carga_hor}
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