import { Button, FlatList, ImageBackground, Text, TextInput, View } from 'react-native';
import { useContext, useState } from 'react';
import { BackgroundContext } from "../context/current-background";

export default function Disciplina() {
  const {currentBackground} = useContext(BackgroundContext);
  const [disciplinas, setDisciplinas] = useState([]);
  const [formDisciplinas, setFormDisciplinas] = useState({
    nome_disc: '',
    carga_hor: '',
  });

  return (
    <View style={{height: '100%'}}>
      <ImageBackground style={{height: '100%'}} source={currentBackground}>
        <Text style={{marginTop: '1rem'}}>Nome</Text>
        <TextInput
          style={{border: '1px solid #000000'}}
          value={formDisciplinas.nome_disc}
          onChangeText={nome_disc => setFormDisciplinas({...formDisciplinas, nome_disc})}
        />

        <Text style={{marginTop: '1rem'}}>Carga horaria</Text>
        <TextInput
          style={{border: '1px solid #000000'}}
          value={formDisciplinas.carga_hor}
          onChangeText={carga_hor => setFormDisciplinas({...formDisciplinas, carga_hor})}
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
      </ImageBackground>
    </View>
  );
}
