import { Button, FlatList, ImageBackground, Text, TextInput, View, StyleSheet, Picker } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { BackgroundContext } from "../context/current-background";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { db } from "../Core/Config";

export default function Historico() {
  const myDoc = collection(db, "Histórico");
  const {currentBackground} = useContext(BackgroundContext);

  const [idToEdit, setIdToEdit] = useState();

  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);


  const [historicos, setHistoricos] = useState([]);
  const [formHistoricos, setFormHistoricos] = useState({
    cod_historico: '',
    matricula: '',
    cod_turma: '',
    frequencia: '',
    nota: '',
  });



  useEffect(() => {
    const p = query(collection(db, "Turma"));
    onSnapshot(p, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
      setTurmas(result);
    });

    const q = query(collection(db, "Aluno"));
    onSnapshot(q, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
      setAlunos(result);
    });

    const r = query(collection(db, "Historico"));
    onSnapshot(r, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
      setHistoricos(result);
    });

    const s = query(collection(db, "Disciplina"));
    onSnapshot(s, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
      setDisciplinas(result);
    });
  }, []);

  const postHistorico = async (value) => {
    await addDoc(myDoc, value)
      .then(() => alert("Historico Salvo!"))
      .catch((error) => alert(error.message));
  }

  const addToEditMode = (histData) => {
    setIdToEdit(histData.id);
    setFormHistoricos(histData);
  }

  const deleteHistorico = async (id) => {
    const myDoc = doc(db, "Histórico", id)

    deleteDoc(myDoc)
      .then(() => {
        const hist = historicos;
        hist.splice(index, 1);
        setHistoricos(hist);
        alert("Historico deletado!");
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const buscarDisciplina = async (id) => {
        
  }

  return (
    <View style={{height: '100%'}}>
      <ImageBackground style={{height: '100%'}} source={currentBackground}>
        <Text style={{marginTop: '1rem'}}>Matricula do Aluno</Text>
        <Picker
          selectedValue={formHistoricos.matricula}
          style={{ height: 50 }}
          onValueChange={(itemValue) => {
            setFormHistoricos({...formHistoricos, matricula:itemValue})
          }}
        >
          <Picker.Item label="Seleciona um aluno" value="0"/>
          {
            alunos.map((aluno, index) => {
              return <Picker.Item key={index} label={aluno.nome} value={alunos.matricula }/>
            })
          } 
        </Picker>

        <Text>Turma</Text>
          <Picker
            selectedValue={formHistoricos.cod_turma}
            style={{ height: 50 }}
            onValueChange={(itemValue) => {
              setFormHistoricos({...formHistoricos, cod_turma:itemValue})
            }}
          >
            <Picker.Item label="Seleciona uma turma" value="0"/>
            {
              turmas.map((turma, index) => {
                return <Picker.Item key={index} label={turma.cod_turma} value={turma.cod_turma}/>
              })
            } 
          </Picker>

        <Text style={{marginTop: '1rem'}}>Frequencia</Text>
        <TextInput
          style={{border: '1px solid #000000'}}
          value={formHistoricos.frequencia}
          onChangeText={frequencia => setFormHistoricos({...formHistoricos, frequencia})}
        />

        <Text style={{marginTop: '1rem'}}>Nota</Text>
        <TextInput
          style={{border: '1px solid #000000'}}
          value={formHistoricos.nota}
          onChangeText={nota => setFormHistoricos({...formHistoricos, nota})}
        />

        <Button
          title="Salvar Historico"
          onPress={async () => {
            if (idToEdit) {
              setDoc(doc(db, "Histórico", idToEdit), {
                cod_turma: formHistoricos.cod_turma,
                frequencia: formHistoricos.frequencia,
                nota: formHistoricos.nota,
                matricula: formHistoricos.matricula,
              }, {merge: true})
                .then(() => {
                  alert("Alterações salvas!")
                })
                .catch((error) => {
                  alert(error.message)  
                });

              historicos.forEach((hist, index) => {
                if (hist.id === idToEdit)
                  historicos[index] = {...formHistoricos, id: idToEdit};
                else
                  historicos[index] = hist;
              });

              setIdToEdit(undefined);
              setHistoricos(historicos);
            } else {
              const cot = {...formHistoricos, cod_historico:historicos.length+1}
              setFormHistoricos(cot)
              setHistoricos([...historicos, cot])
              await postHistorico(formHistoricos);
            }

            setFormHistoricos({
              matricula: '',
              cod_turma: '',
              frequencia: '',
              nota: '',
            });
          }}
        />

        <View style={{ marginTop: '2rem', marginBottom: '1rem' }}>
          <Text style={{ fontSize: '1.5rem', textAlign: 'center' }}>Filtros Disponiveis</Text>
        </View>

        <FlatList
          data={historicos}
          renderItem={({item, index}) => <>
            <Text key={index} style={{ marginTop: '2rem' }}>
              Matricula: {item.matricula || 'nenhum'}, Turma: {item.cod_turma || 'nenhum'},
              Frequencia: {item.frequencia || 'nenhum'}, Nota: {item.nota || 'nenhum'}
            </Text>
            <Button
              title="Editar"
              onPress={() => addToEditMode(item)}
            />
            <Button
              title="Apagar"
              onPress={async () => await deleteHistorico(item.id)}
            />
          </>}
        />
      </ImageBackground>
    </View>
  );
}
