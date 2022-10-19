import { Text, View, TextInput, Button, FlatList } from 'react-native';
import { useState } from 'react';

export default function Disciplina() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [formDisciplinas, setFormDisciplinas] = useState({
    nome_disc: '',
    carga_hor: '',
  });

  return (
    <View>
      <Text style={{ marginTop: '1rem' }}>Nome</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formDisciplinas.nome_disc}
        onChangeText={nome_disc => setFormDisciplinas({ ...formDisciplinas, nome_disc }) }
      />

      <Text style={{ marginTop: '1rem' }}>Carga horaria</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formDisciplinas.carga_hor}
        onChangeText={carga_hor => setFormDisciplinas({ ...formDisciplinas, carga_hor }) }
      />

      <Button
        title="Salvar Disciplina"
        onPress={() => {
          setDisciplinas([...disciplinas, formDisciplinas]);
          setFormDisciplinas({
            nome_disc: '',
            carga_hor: '',
          });
        }}
      />

      <FlatList
        data={disciplinas}
        renderItem={({item, index}) => <Text key={index}>
          Nome: {item.nome_disc}, Carga horaria: {item.carga_hor}
        </Text>}
      />
    </View>
  );
}