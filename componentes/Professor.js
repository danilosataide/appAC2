import { Text, View, TextInput, Button, FlatList } from 'react-native';
import { useState } from 'react';

export default function Professor() {
  const [professores, setProfessores] = useState([]);
  const [formProfessores, setFormProfessores] = useState({
    nome: '',
    endereco: '',
    cidade: '',
  });

  return (
    <View>
      <Text style={{ marginTop: '1rem' }}>Nome</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formProfessores.nome}
        onChangeText={nome => setFormProfessores({ ...formProfessores, nome }) }
      />

      <Text style={{ marginTop: '1rem' }}>Endereco</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formProfessores.endereco}
        onChangeText={endereco => setFormProfessores({ ...formProfessores, endereco }) }
      />

      <Text style={{ marginTop: '1rem' }}>Cidade</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formProfessores.cidade}
        onChangeText={cidade => setFormProfessores({ ...formProfessores, cidade }) }
      />

      <Button
        title="Salvar Professor"
        onPress={() => {
          setProfessores([...professores, formProfessores]);
          setFormProfessores({
            nome: '',
            endereco: '',
            cidade: '',
          });
        }}
      />

      <FlatList
        data={professores}
        renderItem={({item, index}) => <Text key={index}>
          Nome: {item.nome}, Endereco: {item.endereco}, Cidade: {item.cidade}
        </Text>}
      />
    </View>
  );
}
