import { Button, ImageBackground, View } from "react-native";
import { useContext } from "react";
import { BackgroundContext } from "../context/current-background";

import imgFlores from '../assets/backgrounds/flores.jpg';
import imgCidade from '../assets/backgrounds/cidade.jpg';
import imgBranco from '../assets/backgrounds/branco.jpg';

export default function Configuracoes() {
  const {setCurrentBackground, currentBackground} = useContext(BackgroundContext);

  return (
    <View style={{height: '100%'}}>
      <ImageBackground style={{height: '100%'}} source={currentBackground}>
        <Button title='Flores' onPress={() => setCurrentBackground(imgFlores)}/>
        <Button title='Branco' onPress={() => setCurrentBackground(imgBranco)}/>
        <Button title='Cidade' onPress={() => setCurrentBackground(imgCidade)}/>
      </ImageBackground>
    </View>
  )
}
