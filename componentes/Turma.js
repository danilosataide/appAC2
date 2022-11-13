import { Button, FlatList, ImageBackground, Text, TextInput, View, StyleSheet, Picker } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { BackgroundContext } from "../context/current-background";
import { deleteDoc, query, collection, onSnapshot, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../Core/Config';

export default function Turma() {
  const myDoc = collection(db, "Turma");
  const {currentBackground} = useContext(BackgroundContext);
  const [idToEdit, setIdToEdit] = useState();

  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessor] = useState([]);
  
  const [turmas, setTurmas] = useState([]);
  const [formTurmas, setFormTurmas] = useState({
    cod_turma: '',
    cod_disc: '',
    cod_prof: '',
    ano: '',
    horario: '',
  });

  useEffect(() => {
    const p = query(collection(db, "Turma"));
    onSnapshot(p, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
      setTurmas(result);
    });

    const q = query(collection(db, "Disciplina"));
    onSnapshot(q, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
      setDisciplinas(result);
    });

    const r = query(collection(db, "Professor"));
    onSnapshot(r, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
      setProfessor(result);
    });
  }, []);

  const postTurma = (value) => {
    addDoc(myDoc, value)
      .then(() => alert("Turma Salva!"))
      .catch((error) => alert(error.message));
  }

  const Delete = (value) => {
    const myDoc = doc(db, "Turma", value)

    deleteDoc(myDoc)
      .then(() => {
        alert("Turma excluída!")
      })
      .catch((error) => {
        alert(error.message)
      })

  }

  const addToEditMode = (personData) => {
    setIdToEdit(personData.id);
    setFormTurmas(personData);
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={{height: '100%'}} source={currentBackground}>
      <View style={styles.form}>
        <View style={styles.dropdown}>
          <Text style={styles.texto}>Disciplina</Text>
          <Picker
            selectedValue={formTurmas.cod_disc}
            style={{ height: 50 }}
            onValueChange={(itemValue) => {
              setFormTurmas({...formTurmas, cod_disc:itemValue})
              setDisciplinaSelecionada(itemValue)
            }}
          >
            <Picker.Item label="Seleciona uma disciplina" value="0"/>
            {
              disciplinas.map((disciplina, index) => {
                return <Picker.Item key={index} label={disciplina.nome_disc} value={disciplina.cod_disc }/>
              })
            } 
          </Picker>
        </View>
        
        <View style={styles.dropdown}>
          <Text style={styles.texto}>Professor</Text>
          <Picker
            selectedValue={formTurmas.cod_prof}
            style={{ height: 50 }}
            onValueChange={(itemValue) => {
              setFormTurmas({...formTurmas, cod_prof:itemValue})
              setProfessorSelecionado(itemValue)
            }}
          >
            <Picker.Item label="Seleciona um professor" value="0"/>
            {
              professores.map((professor, index) => {
                return <Picker.Item key={index} label={professor.nome} value={professor.cod_prof }/>
              })
            } 
          </Picker>
        </View>

        <Text style={styles.texto}>Horario</Text>
        <TextInput
          style={styles.input}
          value={formTurmas.horario}
          onChangeText={horario => setFormTurmas({ ...formTurmas, horario })}
        />

        <Text style={styles.texto}>Ano</Text>
        <TextInput
          style={styles.input}
          value={formTurmas.ano}
          onChangeText={ano => setFormTurmas({ ...formTurmas, ano }) }
        />

        <View style={styles.button}>
          <Button
              title={idToEdit ? 'Editar Turma' : 'Adicionar Turma'}
              color="#2196F3"
              onPress={async () => {
                if (idToEdit) {
                  setDoc(doc(db, "Turma", idToEdit), {
                    cod_disc: formTurmas.cod_disc,
                    cod_prof: formTurmas.cod_prof,
                    ano: formTurmas.ano,
                    horario: formTurmas.horario,
                  },{merge:true})
                  .then(() => {
                    alert("Alterações salvas!")
                  })
                  .catch((error) => {
                    alert(error.message)
                  });
                  
                  turmas.forEach((turma, index) => {
                    if (turma.id === idToEdit)
                      turmas[index] = { ...formTurmas, id: idToEdit};
                    else
                      turmas[index] = turma;
                  });
      
                  setIdToEdit(undefined);
                  setTurmas(turmas);
                } else {
                  const cot = {...formTurmas, cod_turma:turmas.length+1}
                  setFormTurmas(cot)
                  setTurmas([...turmas, cot])
                  await postTurma(cot);
                }

                setFormTurmas({
                  cod_turma: '',
                  cod_disc: '',
                  cod_prof: '',
                  ano: '',
                  horario: '',
                });
              }}
            />
        </View>
        
      </View>

        <FlatList
          data={turmas}
          renderItem={({ item, index }) => <>
              <Text key={index}>
                Disciplina: {item.cod_disc}, Professor: {item.cod_prof}, Ano: {item.ano}, Horario: {item.horario}
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
  },
  dropdown: {
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'    
  }
});
