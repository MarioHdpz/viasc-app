import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import ButtonLarge from '../components/buttonLarge';

type Props = {};
export default class App extends Component<Props> {

  adjuntarDocs = () => {
    this.props.navigation.navigate('AdjuntarDocs');
  }

  formulario = () => {
    this.props.navigation.navigate('WorkSpace');
  }

  captura = () => {
    this.props.navigation.navigate('Captura');
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Text>
          Proceso de avalúo
        </Text>
        <ButtonLarge
          icon = {require('../assets/icon/icon.png')}
          text = "Adjuntar documentos"
          onClickButton = {this.adjuntarDocs}
          status = {null}
        />
        <ButtonLarge
          icon = {require('../assets/icon/icon.png')}
          text = "Iniciar formulario"
          onClickButton = {this.formulario}
          status = {null}
        />
        <ButtonLarge
          icon = {require('../assets/icon/icon.png')}
          text = "Captura de fotos"
          onClickButton = {this.captura}
          status = {null}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
});
