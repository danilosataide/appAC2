import { Button, FlatList, ImageBackground, Text, TextInput, View, StyleSheet } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { BackgroundContext } from "../context/current-background";
import RNPickerSelect from 'react-native-picker-select';
import SelectDropdown from 'react-native-select-dropdown'

import { deleteDoc, query, collection, onSnapshot, doc, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../Core/Config';

export default function Turma() {
  const myDoc = collection(db, "Turma");

  const {currentBackground} = useContext(BackgroundContext);
  const [disciplinas, setDisciplinas] = useState([]);
  const [disc, setDisc] = useState();
  const [turmas, setTurmas] = useState([]);
  const [formTurmas, setFormTurmas] = useState({
    cod_turma: '',
    cod_disc: '',
    cod_prof: '',
    ano: '',
    horario: '',
  });

  useEffect(() => {
    const q = query(collection(db, "Disciplina"));
    onSnapshot(q, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
      setDisciplinas(result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground style={{height: '100%'}} source={currentBackground}>
      <View style={styles.form}>
        <Text style={styles.texto}>Codigo da disciplina</Text>
        <TextInput
          style={styles.input}
          value={formTurmas.cod_disc}
          onChangeText={cod_disc => setFormTurmas({ ...formTurmas, cod_disc }) }
        />

        {/* <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
              { label: 'Football', value: 'football' },
              { label: 'Baseball', value: 'baseball' },
              { label: 'Hockey', value: 'hockey' },
          ]}
        /> */}
        <View style={styles.dropdown}>
          <Text style={styles.texto}>Disciplina</Text>
          <SelectDropdown 
            dropdownOverlayColor="#2196F3"
            dropdownBackgroundColor="red"
            defaultButtonText="Selecione uma Disciplina"
            data={disciplinas}
            color="black"
            onSelect={async (selectedItem, index) => {
              console.log(selectedItem, index)
              // cod_disc => setFormTurmas({ ...formTurmas, cod_disc })
              console.log("Selecionado: ", selectedItem.id)
              setDisc(selectedItem.id)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.nome_disc
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item.nome_disc
            }}
          />
        </View>

        <Text style={styles.texto}>Codigo do professor</Text>
        <TextInput
          style={styles.input}
          value={formTurmas.cod_prof}
          onChangeText={cod_prof => setFormTurmas({ ...formTurmas, cod_prof }) }
        />
        
        <Text style={styles.texto}>Horario</Text>
        <TextInput
          style={styles.input}
          value={formTurmas.horario}
          onChangeText={horario => setFormTurmas({ ...formTurmas, horario })}
        />

        <Text style={styles.texto}>Ano</Text>
        <TextInput
          style={styles.input}
          value={formTurmas.ano}
          onChangeText={ano => setFormTurmas({ ...formTurmas, ano }) }
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
        
        </View>

        <FlatList
          data={turmas}
          renderItem={({item, index}) => <Text key={index}>
            Disciplina: {item.cod_disc}, Professor: {item.cod_prof}, Ano: {item.ano}, Horario: {item.horario}
          </Text>}
        />
        
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },  
  form:{
    padding: 20,
    backgroundColor: '#79bdf2',
  },
  texto: {
    marginTop: '1rem',
    fontWeight: 'bold', 
    color: "#fff"//2196F3
  },
  button: {
    paddingVertical: '1rem',
  },
  input: {
    marginTop: 2,
    border: '2px solid #2196F3',
    backgroundColor: '#fff'
  },
  dropdown: {
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'    
  }
});
