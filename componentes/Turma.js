import { Button, FlatList, ImageBackground, Text, TextInput, View, StyleSheet, Picker } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { BackgroundContext } from "../context/current-background";
import SelectDropdown from 'react-native-select-dropdown'

import { deleteDoc, query, collection, onSnapshot, doc, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../Core/Config';

export default function Turma() {
  const myDoc = collection(db, "Turma");
  const {currentBackground} = useContext(BackgroundContext);

  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState([
    ''
  ]);

  const [professores, setProfessor] = useState([]);
  const [professorSelecionado, setProfessorSelecionado] = useState([
    
  ]);

  useEffect(() => {
    console.log("Disciplina Selecionada: ", disciplinaSelecionada)
    console.log("Professor Selecionado: ", professorSelecionado)
    console.log("Turmas: ", turmas)
  })

  const [turmas, setTurmas] = useState([]);
  const [formTurmas, setFormTurmas] = useState({
    cod_turma: '',
    cod_disc: '',
    cod_prof: '',
    ano: '',
    horario: '',
  });

  useEffect(() => {
    const q = query(collection(db, "Disciplina"));
    onSnapshot(q, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
      setDisciplinas(result);
    });

    const p = query(collection(db, "Professor"));
    onSnapshot(p, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
      setProfessor(result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground style={{height: '100%'}} source={currentBackground}>
      <View style={styles.form}>
        <View style={styles.dropdown}>
          <Text style={styles.texto}>Disciplina</Text>
          <Picker
            // selectedValue={disciplinaSelecionada}
            selectedValue={formTurmas.cod_disc}
            style={{ height: 50 }}
            onValueChange={(itemValue) => setDisciplinaSelecionada(itemValue)}
          >
            <Picker.Item label="Seleciona uma disciplina" value="0"/>
            {
              disciplinas.map(disciplina => {
                return <Picker.Item label={disciplina.nome_disc} value={disciplina.id}/>
              })
            } 
          </Picker>
        </View>
        
        <View style={styles.dropdown}>
          <Text style={styles.texto}>Professor</Text>
          <Picker
            selectedValue={professorSelecionado}
            style={{ height: 50}}
            onValueChange={(itemValue) => setProfessorSelecionado(itemValue)}
          >
            <Picker.Item label="Seleciona um professor" value="0"/>
            {
              professores.map(professor => {
                return <Picker.Item label={professor.nome} value={professor.id}/>
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
            title="Salvar Turma"
            onPress={() => {
              setTurmas([...turmas, formTurmas]);
              setFormTurmas({
                cod_disc: '',
                cod_prof: '',
                ano: '',
                horario: '',
              });
              console.log(formTurmas)
            }}
          />
        </View>
        
      </View>

        <FlatList
          data={turmas}
          renderItem={({item, index}) => <Text key={index}>
            Disciplina: {item.cod_disc}, Professor: {item.cod_prof}, Ano: {item.ano}, Horario: {item.horario}
          </Text>}
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
