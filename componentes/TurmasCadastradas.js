import { Button, FlatList, Image, Modal, Text, View } from "react-native";
import { useState } from "react";

export default function TurmasCadastradas() {
  const [turmaModal, setTurmaModal] = useState(false);
  const [turmas, setTurmas] = useState([
    {
      cod_disc: '23',
      cod_prof: '11',
      ano: '2022',
      horario: '22:22',
    },
    {
      cod_disc: '21',
      cod_prof: '51',
      ano: '2023',
      horario: '22:23',
    },
  ]);


  return(
    <View>
      <Text style={{fontSize: '2rem', color: 'blue', textAlign: 'center'}}>Turmas</Text>

      <FlatList
        data={turmas}
        renderItem={({item, index}) => <>
            <Text key={index} style={{ fontSize: '1.5rem', marginTop: '2rem' }}>
              Disciplina: {item.cod_disc}, Professor: {item.cod_prof}, Ano: {item.ano}, Horario: {item.horario}
            </Text>
            <Button title="Ver Alunos" onPress={() => setTurmaModal(item)} />
          </>
        }
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={turmaModal}
      >
        <View>
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
    </View>
  )
}
