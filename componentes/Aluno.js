import { Button, FlatList, ImageBackground, Text, TextInput, View } from 'react-native';
import { useContext, useState } from 'react';
import { BackgroundContext } from "../context/current-background";

export default function Aluno() {
  const [alunos, setAlunos] = useState([]);
  const [formAlunos, setFormAlunos] = useState({
    nome: '',
    endereco: '',
    cidade: '',
    foto: '',
  });

  // const myDoc = collection(db, "Aluno");

  // useEffect(() => {
  //   const q = query(collection(db, "Aluno"));
  //   onSnapshot(q, (querySnapshot) => {
  //     const result = [];
  //     querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
  //     setAlunos(result);
  //   });
  // }, []);

  // const postAluno = (value) => {
  //   addDoc(myDoc, value)
  //     .then(() => alert("Aluno Salvo!"))
  //     .catch((error) => alert(error.message));
  // }

  // const addToEditMode = (personData) => {
  //   setIdToEdit(personData.id);
  //   setFormAlunos(personData);
  // }

  return (
    <View style={{ height: '100%' }}>
      <ImageBackground style={{ height: '100%' }} source={currentBackground}>
        <Text style={{marginTop: '1rem'}}>Nome</Text>
        <TextInput
          style={{border: '1px solid #000000'}}
          value={formAlunos.nome}
          onChangeText={nome => setFormAlunos({...formAlunos, nome})}
        />

        <Text style={{marginTop: '1rem'}}>Endereco</Text>
        <TextInput
          style={{border: '1px solid #000000'}}
          value={formAlunos.endereco}
          onChangeText={endereco => setFormAlunos({...formAlunos, endereco})}
        />

        <Text style={{marginTop: '1rem'}}>Cidade</Text>
        <TextInput
          style={{border: '1px solid #000000'}}
          value={formAlunos.cidade}
          onChangeText={cidade => setFormAlunos({...formAlunos, cidade})}
        />

        <Text style={{marginTop: '1rem'}}>URL da foto</Text>
        <TextInput
          style={{border: '1px solid #000000'}}
          value={formAlunos.foto}
          onChangeText={foto => setFormAlunos({...formAlunos, foto})}
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
      </ImageBackground>
    </View>
  );
}
