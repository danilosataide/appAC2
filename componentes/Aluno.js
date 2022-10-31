import { Text, View, TextInput, Button, FlatList } from 'react-native';
import { useState } from 'react';

export default function Aluno() {
  const [alunos, setAlunos] = useState([]);
  const [formAlunos, setFormAlunos] = useState({
    nome: '',
    endereco: '',
    cidade: '',
    foto: '',
  });

  return (
    <View>
      <Text style={{ marginTop: '1rem' }}>Nome</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formAlunos.nome}
        onChangeText={nome => setFormAlunos({ ...formAlunos, nome }) }
      />

      <Text style={{ marginTop: '1rem' }}>Endereco</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formAlunos.endereco}
        onChangeText={endereco => setFormAlunos({ ...formAlunos, endereco }) }
      />

      <Text style={{ marginTop: '1rem' }}>Cidade</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formAlunos.cidade}
        onChangeText={cidade => setFormAlunos({ ...formAlunos, cidade }) }
      />

      <Text style={{ marginTop: '1rem' }}>URL da foto</Text>
      <TextInput
        style={{ border: '1px solid #000000' }}
        value={formAlunos.foto}
        onChangeText={foto => setFormAlunos({ ...formAlunos, foto })}
      />

      <Button
        title="Salvar Aluno"
        onPress={() => {
          setAlunos([...alunos, formAlunos]);
          setFormAlunos({
            nome: '',
            endereco: '',
            cidade: '',
            foto: '',
          });
        }}
      />

      <FlatList
        data={alunos}
        renderItem={({item, index}) => <Text key={index}>
          Nome: {item.nome}, Endereco: {item.endereco}, Cidade: {item.cidade}, Foto: {item.foto}
        </Text>}
      />
    </View>
  );
}