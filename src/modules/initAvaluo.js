import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import ButtonLarge from '../components/buttonLarge';

type Props = {};
export default class App extends Component<Props> {
  state = {
    docs : null,
    okformulario:false,
    okfotos:false,
  }


  getStorage = async () => {
    console.log('getStorage');
    try {
      const value = await AsyncStorage.getItem('docs')
      if(value !== null) {
        const json = JSON.parse(value);
        this.validarDocs(json);
      }
    } catch(e) {
      console.log("error storage", e);
    }
  }

  validarDocs = (estado) => {
    let ready = true;
    for(i in estado){
      if (estado[i]=== false || estado[i] === null){
        ready = null;
        if (estado[i]===false) {
            ready = false;
        }
      }
    }

    if (ready !== null) {
      this.setState({docs:ready, okformulario:ready});
    }

    console.log('validarDocs',ready);
  }

  cancelar = () => {
    this.clearAll();
    this.props.navigation.navigate('Init');
  }

  clearAll = async () => {
    console.warn("limpiando");
    try {
      await AsyncStorage.clear();
    } catch(e) {
      console.log('error clear', e);
    }
  }

  sendAll = () =>{
    console.warn("Enviando");
    this.clearAll();
    this.props.navigation.navigate('Init');
  }

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
    const {okformulario, okfotos} = this.state;
    return (
      <ImageBackground
        source={require('../assets/bg_home/bg_home.png')}
        style={styles.container}
      >
      <NavigationEvents
        onWillFocus={payload => {this.getStorage()}}
      />

        <View style={styles.container}>
          <ButtonLarge
            iconPrimary = {require('../assets/icono_adjuntar/icono_adjuntar.png')}
            icon = {require('../assets/icono_acierto/icono_acierto.png')}
            text = "Adjuntar documentos"
            onClickButton = {this.adjuntarDocs}
            status = {this.state.docs}
            disabled = {true}
          />
          <ButtonLarge
            iconPrimary = {require('../assets/icono_iniciarformulario/icono_iniciarformulario.png')}
            icon = {require('../assets/icono_acierto/icono_acierto.png')}
            text = "Iniciar formulario"
            onClickButton = {this.formulario}
            status = {null}
            disabled = {okformulario}
          />
          <ButtonLarge
            iconPrimary = {require('../assets/icono_camara/icono_camara.png')}
            icon = {require('../assets/icono_acierto/icono_acierto.png')}
            text = "Captura de fotos"
            onClickButton = {this.captura}
            status = {null}
            disabled = {okfotos}
          />
        </View>

        <View style={styles.fixToText}>
          <Button
            title="Cancelar"
            color="rgb(126, 4, 4)"
            onPress = {this.cancelar}
          />
          <Button
            title="Envíar"
            onPress = {this.sendAll}
          />
        </View>
      </ImageBackground>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  fixToText: {
    width:width-100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:20,
  },
});
