import { Button, FlatList, ImageBackground, Text, TextInput, View, StyleSheet } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { BackgroundContext } from "../context/current-background";

import { deleteDoc, query, collection, onSnapshot, doc, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../Core/Config';

export default function Aluno() {
  const myDoc = collection(db, "Aluno");

  const { currentBackground } = useContext(BackgroundContext);

  const [idToEdit, setIdToEdit] = useState();
  const [alunos, setAlunos] = useState([]);
  const [formAlunos, setFormAlunos] = useState({
    matricula: '',
    nome: '',
    endereco: '',
    cidade: '',
    foto: '',
  });
  
  useEffect(() => {
    const q = query(collection(db, "Aluno"));
    onSnapshot(q, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
      setAlunos(result);
    });
  }, []);

  const postAluno = async (value) => {
    await addDoc(myDoc, value)
      .then(() => alert("Aluno Salvo!"))
      .catch((error) => alert(error.message));
  }

  const addToEditMode = (personData) => {
    setIdToEdit(personData.id);
    setFormAlunos(personData);
  }


  return (
    <View style={styles.container}>
      <ImageBackground style={{ height: '100%' }} source={currentBackground}>
        <View style={styles.form}>
          <Text style={styles.texto}>Matrícula</Text>
          <TextInput
            style={styles.input}
            value={formAlunos.matricula}
            onChangeText={matricula => setFormAlunos({...formAlunos, matricula})}
          />

          <Text style={styles.texto}>Nome</Text>
          <TextInput
            style={styles.input}
            value={formAlunos.nome}
            onChangeText={nome => setFormAlunos({...formAlunos, nome})}
          />

          <Text style={styles.texto}>Endereco</Text>
          <TextInput
            style={styles.input}
            value={formAlunos.endereco}
            onChangeText={endereco => setFormAlunos({...formAlunos, endereco})}
          />

          <Text style={styles.texto}>Cidade</Text>
          <TextInput
            style={styles.input}
            value={formAlunos.cidade}
            onChangeText={cidade => setFormAlunos({...formAlunos, cidade})}
          />

          <Text style={styles.texto}>URL da foto</Text>
          <TextInput
            style={styles.input}
            value={formAlunos.foto}
            onChangeText={foto => setFormAlunos({...formAlunos, foto})}
          />

          <View style={styles.button}>
            <Button
              title={idToEdit ? 'Editar Aluno' : 'Adicionar Aluno'}
              color="#2196F3"
              onPress={async () => {
                if (idToEdit) {
                  setDoc(doc(db, "Aluno", idToEdit), {
                    cidade: formAlunos.cidade,
                    endereco: formAlunos.endereco,
                    foto: formAlunos.foto,
                    matricula: formAlunos.matricula,
                    nome: formAlunos.nome,
                  },{merge:true})
                  .then(() => {
                    alert("Alterações salvas!")
                  })
                  .catch((error) => {
                    alert(error.message)
                  });
                  
                  alunos.forEach((aluno, index) => {
                    if (aluno.id === idToEdit)
                      alunos[index] = { ...formAlunos, id: idToEdit};
                    else
                      alunos[index] = aluno;
                  });
      
                  setIdToEdit(undefined);
                  setAlunos(alunos);
                } else {
                  setAlunos([...alunos, formAlunos]);
                  await postAluno(formAlunos);
                }

                setFormAlunos({
                  nome: '',
                  endereco: '',
                  cidade: '',
                  foto: '',
                });
              }}
            />
          </View>
        </View>
        
        <FlatList
            data={alunos}
            renderItem={({ item, index }) => <>
              <Text key={index}>
                Matrícula: {item.matricula},Nome: {item.nome}, endereço: {item.endereço}, cidade: {item.cidade}, foto: {item.foto}
              </Text>
              <Button 
                title="Editar"
                onPress={() => addToEditMode(item)}  
              />
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


