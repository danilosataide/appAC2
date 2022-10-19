import { Text, View, TextInput, Button, FlatList } from 'react-native';
import { useState } from 'react';

export default function Turma() {
  const [turmas, setTurmas] = useState([]);
  const [formTurmas, setFormTurmas] = useState({
    cod_disc: '',
    cod_prof: '',
    ano: '',
    horario: '',
  });

  return (
    <View>
      <Text style={{ marginTop: '1rem' }}>Codigo da disciplina</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formTurmas.cod_disc}
        onChangeText={cod_disc => setFormTurmas({ ...formTurmas, cod_disc }) }
      />

      <Text style={{ marginTop: '1rem' }}>Codigo do professor</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formTurmas.cod_prof}
        onChangeText={cod_prof => setFormTurmas({ ...formTurmas, cod_prof }) }
      />

      <Text style={{ marginTop: '1rem' }}>Ano</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formTurmas.ano}
        onChangeText={ano => setFormTurmas({ ...formTurmas, ano }) }
      />

      <Text style={{ marginTop: '1rem' }}>Horario</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formTurmas.horario}
        onChangeText={horario => setFormTurmas({ ...formTurmas, horario })}
      />

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
        }}
      />

      <FlatList
        data={turmas}
        renderItem={({item, index}) => <Text key={index}>
          Disciplina: {item.cod_disc}, Professor: {item.cod_prof}, Ano: {item.ano}, Horario: {item.horario}
        </Text>}
      />
    </View>
  );
}
