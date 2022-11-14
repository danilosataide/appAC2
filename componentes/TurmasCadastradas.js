import { Button, FlatList, Image, ImageBackground, Modal, Text, View } from "react-native";
import { useContext, useState, useEffect } from "react";
import { BackgroundContext } from "../context/current-background";
import { deleteDoc, query, where, getDocs, collection, onSnapshot, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../Core/Config';

export default function TurmasCadastradas() {
  const {currentBackground} = useContext(BackgroundContext);
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessor] = useState([]);
  const [turmaSelecionada, setTurma] = useState([]);

  const [turmaModal, setTurmaModal] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const [turmasPorId, setTurmaPorId] = useState([]);
  
  
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

    // const s = query(collection(db, "Turma"),  ('cod_turma','==', turmaSelecionada.cod_turma))
    // getDocs(s, (querySnapshot) => {
    //   const result = [];
    //   querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
    //   setTurmaPorId(result);
    // });
  }, []);


  return(
    <View style={{height: '100%'}}>
      <ImageBackground style={{height: '100%'}} source={currentBackground}>
      <Text style={{fontSize: '2rem', color: 'blue', textAlign: 'center'}}>Turmas</Text>

      <FlatList
        data={turmas}
        renderItem={({item, index}) => <>
            <Text key={index} style={{ fontSize: '1.5rem', marginTop: '2rem' }}>
              <Text style={{ fontSize: '1.0rem', fontWeight: 'bold' }}>Turma {item.cod_turma} </Text><br />
              Disciplina: {item.cod_disc}, Professor: {item.cod_prof}, Ano: {item.ano}, Horario: {item.horario}
            </Text>
            <Button title="Ver Alunos" onPress={() => {
              setTurmaModal(item)
              setTurma(item)  
            }} />
          </>
        }
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={turmaModal}
      >
        <View>
          <Text>Alunos da Turma {turmaSelecionada.cod_turma}</Text>
          <FlatList
            data={turmasPorId}
            renderItem={({item, index}) => <>
                <Text key={index} style={{ fontSize: '1.5rem', marginTop: '2rem' }}>
                  <Text style={{ fontSize: '1.0rem', fontWeight: 'bold' }}>Turma {item.cod_turma} </Text><br />
                  Disciplina: {item.cod_disc}, Professor: {item.cod_prof}, Ano: {item.ano}, Horario: {item.horario}
                </Text>
                <Button title="Ver Alunos" onPress={() => {
                  setTurmaModal(item)
                  setTurma(item)  
                }} />
              </>
            }
          />
          <Image
            style={{
              width: 'calc(100% - 2rem)',
              height: '16rem',
              margin: '1rem',
              objectFit: 'cover'}}
            source={require('../assets/aff.jpeg')}
          />

          <Text></Text>
          <Button
            style={{ padding: '1rem' }}
            title="Fechar Turma"
            onPress={() => setTurmaModal(false)}
          ></Button>
        </View>
      </Modal>
      </ImageBackground>
    </View>
  )
}
