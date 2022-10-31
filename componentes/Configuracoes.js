import { Button, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import imgFlores from '../assets/backgrounds/flores.jpg';
import imgCidade from '../assets/backgrounds/cidade.jpg';
import imgBranco from '../assets/backgrounds/branco.jpg';

export default function Configuracoes() {
  return (
    <View>
      <Button title='Flores' onPress={async () => await AsyncStorage.setItem('BACKGROUND', imgFlores)} />
      <Button title='Branco' onPress={async () => await AsyncStorage.setItem('BACKGROUND', imgBranco)} />
      <Button title='Cidade' onPress={async () => await AsyncStorage.setItem('BACKGROUND', imgCidade)} />
    </View>
  )
}
