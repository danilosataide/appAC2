import { Text, View, TextInput, Button, FlatList } from 'react-native';
import { useState } from 'react';

export default function Historico() {
  const [historicos, setHistoricos] = useState([]);
  const [formHistoricos, setFormHistoricos] = useState({
    matricula: '',
    cod_turma: '',
    frequencia: '',
    nota: '',
  });

  return (
    <View>
      <Text style={{ marginTop: '1rem' }}>Matricula</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formHistoricos.matricula}
        onChangeText={matricula => setFormHistoricos({ ...formHistoricos, matricula }) }
      />

      <Text style={{ marginTop: '1rem' }}>Codigo da turma</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formHistoricos.cod_turma}
        onChangeText={cod_turma => setFormHistoricos({ ...formHistoricos, cod_turma }) }
      />

      <Text style={{ marginTop: '1rem' }}>Frequencia</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formHistoricos.frequencia}
        onChangeText={frequencia => setFormHistoricos({ ...formHistoricos, frequencia }) }
      />

      <Text style={{ marginTop: '1rem' }}>Nota</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formHistoricos.nota}
        onChangeText={nota => setFormHistoricos({ ...formHistoricos, nota })}
      />

      <Button
        title="Salvar Historico"
        onPress={() => {
          setHistoricos([...historicos, formHistoricos]);
          setFormHistoricos({
            matricula: '',
            cod_turma: '',
            frequencia: '',
            nota: '',
          });
        }}
      />

      <FlatList
        data={historicos}
        renderItem={({item, index}) => <Text key={index}>
          Matricula: {item.matricula}, Turma: {item.cod_turma}, Frequencia: {item.frequencia}, Nota: {item.nota}
        </Text>}
      />
    </View>
  );
}