import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ImageBackground,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import _ from 'lodash';
import axios from 'axios';

import {readResponseServer} from '../functions'
import db from '../containers/formulario.json';
import ep from '../containers/endpoints.json';
import ButtonLarge from '../components/buttonLarge';

type Props = {};
export default class App extends Component<Props> {
  state = {
    user:null,

    docs : true,
    form : null,
    pics : null,

    okformulario:false,
    okfotos:false,

    respuestas: null,
  }

  componentDidMount = () => {
    const user = this.props.navigation.getParam('user');
    this.setState({user});
    this.validarFromStorage();
  }

  validarFromStorage = async () => {
    //VALIDAMOS DOCUMENTOS
    try {
      const value = await AsyncStorage.getItem('docs')
      let { docs, okformulario } = this.state;

      if(value !== null) {
        const json = JSON.parse(value);
        docs = true;
        for (const d in json ){
          //console.log('inFor->',json[d]);
          if ( json[d] === null ) {
            //console.log('NULL->',json[d]);
            docs = null;
            break;
          }
          if (json[d] === false) {
            //console.log('FALSE->',json[d]);
            docs = false;
            break;
          }
        }
      }
      else{
        docs = null
      }

      console.log('VALIDAR DOCUMENTOS', docs);
      if (docs) {
        okformulario = true
      }

      this.setState({docs,okformulario});

    } catch(e) {
      console.log("error storage", e);
    }

    //VALIDAMOS FORMULARIO
    const buttons = _.filter(db, {inputType:'button'});
    const formulario = Object.keys(db).length;
    const totalRespuestas = formulario - buttons.length

    try {
      let {form, okfotos, respuestas} = this.state;
      const value = await AsyncStorage.getItem('respuestas')

      if(value !== null) {
        respuestas = JSON.parse(value)
        const okRespuestas = Object.keys(JSON.parse(value)).length;
        if (totalRespuestas === okRespuestas) {
          form = true;
          okfotos = true;
        }

        this.setState({ form, okfotos, respuestas });
      }
    } catch(e) {
      console.log("error storage", e);
    }

    //VALIDAMOS FOTOGRAFÍAS.
    //Función de Validación
  }

  cancelar = () => {
    Alert.alert(
      'Cancelar gestión',
      '¿Desea cancelar la gestión?',
      [
        {
          text: 'No, continuar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Si, cancelar', onPress: () => {
          this.clearAll();
          this.props.navigation.navigate('Init', {user:this.state.user});
        }},
      ],
      {cancelable: false},
    );
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

    Alert.alert(
      'Envíar gestión',
      '¿Desea envíar la gestión?',
      [
        {
          text: 'No envíar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Si envíar', onPress: () => {
          this.redirectEndPoints();

        }},
      ],
      {cancelable: false},
    );
  }

  redirectEndPoints = () => {
    const {respuestas, user} = this.state;

    const keys =  Object.keys(respuestas);
    let obj = {}
    keys.map((id, index) =>{
      const result = _.filter(db, {id:parseInt(id)});
      if (!obj[ result[0].endpoint ]) {
        obj[ result[0].endpoint ] = {}
      }
      obj[ result[0].endpoint ][id] = respuestas[id]
    });

    const epindex =  Object.keys(obj);

    epindex.map( (index) => {
      const url = ep[index];
      const data = obj[index]

      const conf = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `jwt ${user.token}`,
        }
      }

      axios.post(url, data, conf)
      .then((response) => {
        console.log('AXIOS OK -> ',response);
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          readResponseServer(error.response.status),
          [
            {text: 'OK'},
          ],
          {cancelable: false},
        );
      });

      //LIMPIAMOS TODO Y REGRESAMOS PARA INICIAR UN NUEVO AVALÚO.
      //this.clearAll();
      //this.props.navigation.navigate('Init', {user:this.state.user});

    })
  }

  render = () => {
    const {okformulario, okfotos, docs, form, pics} = this.state;
    return (
      <ImageBackground
        source={require('../assets/bg_home/bg_home.png')}
        style={styles.container}
      >
        <NavigationEvents
          onWillFocus={payload => {this.validarFromStorage()}}
        />
        <View style={styles.container}>
          <ButtonLarge
            iconPrimary = {require('../assets/icono_adjuntar/icono_adjuntar.png')}
            icon = {require('../assets/icono_acierto/icono_acierto.png')}
            iconError = {require('../assets/icono_errorblanco/icono_errorblanco.png')}
            text = "Adjuntar documentos"
            onClickButton = { () => { this.props.navigation.navigate('AdjuntarDocs', {user:this.state.user}) }}
            status = {docs}
            disabled = {true}
          />
          <ButtonLarge
            iconPrimary = {require('../assets/icono_iniciarformulario/icono_iniciarformulario.png')}
            icon = {require('../assets/icono_acierto/icono_acierto.png')}
            iconError = {require('../assets/icono_errorblanco/icono_errorblanco.png')}
            text = "Iniciar formulario"
            onClickButton = {()=>{this.props.navigation.navigate('WorkSpace', {user:this.state.user})}}
            status = {form}
            disabled = {okformulario}
          />
          <ButtonLarge
            iconPrimary = {require('../assets/icono_camara/icono_camara.png')}
            icon = {require('../assets/icono_acierto/icono_acierto.png')}
            iconError = {require('../assets/icono_errorblanco/icono_errorblanco.png')}
            text = "Captura de fotos"
            onClickButton = {() => { this.props.navigation.navigate('Captura', {user:this.state.user}) }}
            status = {pics}
            disabled = {okfotos}
          />
        </View>

        <View style={styles.fixToText}>

          <TouchableOpacity onPress={this.cancelar}>
            <Image
              style={{
                width:100,
              }}
              source={require('../assets/btNCANCELAR/btNCANCELAR.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.sendAll}>
            <Image
              style={{
                width:100,
              }}
              source={require('../assets/btn_guardar/btn_guardar.png')}
            />
          </TouchableOpacity>
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
