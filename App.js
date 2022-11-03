import React, { useContext } from 'react'
import { Button, ImageBackground, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Aluno from './componentes/Aluno';
import Disciplina from './componentes/Disciplina';
import Professor from './componentes/Professor';
import Turma from './componentes/Turma';
import Historico from './componentes/Historico';
import TurmasCadastradas from './componentes/TurmasCadastradas';
import Configuracoes from './componentes/Configuracoes';
import { BackgroundContext, CurrentBackgroundContext } from "./context/current-background";

const Pilha = createNativeStackNavigator();

function TelaPrincipal(props) {
  const { currentBackground } = useContext(BackgroundContext);

  return (
    <View style={{height: '100%'}}>
      <ImageBackground style={{ height: '100%' }} source={currentBackground}>
      <Text>APP UNIVERSIDADE</Text>

      <Button
        style={{backgroundColor: 'blue'}}
        title="Aluno"
        onPress={() => props.navigation.navigate('Aluno')}
      />
      <Button
        style={{backgroundColor: 'blue'}}
        title="Disciplina"
        onPress={() => props.navigation.navigate('Disciplina')}
      />
      <Button
        style={{backgroundColor: 'blue'}}
        title="Professor"
        onPress={() => props.navigation.navigate('Professor')}
      />
      <Button
        style={{backgroundColor: 'blue'}}
        title="Turma"
        onPress={() => props.navigation.navigate('Turma')}
      />
      <Button
        style={{backgroundColor: 'blue'}}
        title="Histórico"
        onPress={() => props.navigation.navigate('Historico')}
      />
      <Button
        style={{backgroundColor: 'blue'}}
        title="Turmas cadastradas"
        onPress={() => props.navigation.navigate('TurmasCadastradas')}
      />
      <Button
        style={{backgroundColor: 'blue'}}
        title="Configuracoes"
        onPress={() => props.navigation.navigate('Configuracoes')}
      />
      </ImageBackground>
    </View>
  );
}


export default function App() {
  return (
    <CurrentBackgroundContext>
      <NavigationContainer independent={true}>
        <Pilha.Navigator>
          <Pilha.Screen name='TelaPrincipal' component={TelaPrincipal} options={{title: 'Principal'}}/>
          <Pilha.Screen name='Aluno' component={Aluno}/>
          <Pilha.Screen name='Disciplina' component={Disciplina}/>
          <Pilha.Screen name='Professor' component={Professor}/>
          <Pilha.Screen name='Turma' component={Turma}/>
          <Pilha.Screen name='Historico' component={Historico}/>
          <Pilha.Screen name='TurmasCadastradas' component={TurmasCadastradas}/>
          <Pilha.Screen name='Configuracoes' component={Configuracoes}/>
        </Pilha.Navigator>
      </NavigationContainer>
    </CurrentBackgroundContext>
  )
}
