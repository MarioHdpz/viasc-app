import React, {Component} from 'react'
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
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationEvents } from 'react-navigation'
import _ from 'lodash'
import axios from 'axios'

import {readResponseServer} from '../functions'
import ButtonLarge from '../components/buttonLarge'

export default class App extends Component {
  state = {
    user:null,

    docs : null,
    form : null,
    pics : null,

    okformulario:true,
    okfotos:true,

    respuestas: null,
  }

  componentDidMount = () => {
    this.validarFromStorage()
  }

  validarFromStorage = async () => {
    //GET USER
    try {
      const value = await AsyncStorage.getItem('user')
      if(value !== null) {
        this.setState({user:JSON.parse(value)}, ()=>{
          console.log('user', JSON.parse(value) )
        })
      }
    } catch(e) {
      console.log("error storage", e)
    }

    //VALIDAMOS DOCUMENTOS
    try {
      const value = await AsyncStorage.getItem('docs')
      let { docs, okformulario } = this.state

      if(value !== null) {
        const json = JSON.parse(value)
        docs = true
        for (const d in json ){
          //console.log('inFor->',json[d])
          if ( json[d] === null ) {
            //console.log('NULL->',json[d])
            docs = null
            break
          }
          if (json[d] === false) {
            //console.log('FALSE->',json[d])
            docs = false
            break
          }
        }
      }
      else{
        docs = null
      }

      console.log('VALIDAR DOCUMENTOS', docs)
      if (docs) {
        okformulario = true
      }

      this.setState({docs,okformulario})

    } catch(e) {
      console.log("error storage", e)
    }

    //VALIDAMOS FORMULARIO
    try {
      let {form, okfotos,} = this.state
      const value = await AsyncStorage.getItem('readyFormulario')
      console.log('1readyFormulario', value)
      if(value !== null) {
        const rf = JSON.parse(value)
        console.log('readyFormulario',rf)

        if (rf['DatosDelSolicitante'] && rf['Ubicacion'] && rf['TipoDeInmueble'] && rf['InformacionGeneral'] ) {
            this.setState({form:true,okfotos:true})
        }

      }
    } catch(e) {
      console.log("error storage", e)
    }

    //VALIDAMOS FOTOGRAFÍAS.
    try {
      let {form, okfotos,} = this.state
      const value = await AsyncStorage.getItem('readyPictures')
      console.log('1readyFormulario', value)
      if(value) {
        this.setState({pics:true})
      }
    } catch(e) {
      console.log("error storage", e)
    }
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
          this.clearAll()
          this.props.navigation.navigate('Init', {user:this.state.user})
        }},
      ],
      {cancelable: false},
    )
  }

  storeData = async (item,data) => {
    try {
      await AsyncStorage.setItem(item, data)
    } catch (e) {
      console.log("error de almacenaje")
    }
  }

  clearAll = async () => {

    try {
      await AsyncStorage.clear()

      console.warn("limpiando", JSON.stringify(this.state.user))
      this.storeData('user', JSON.stringify(this.state.user) )

      this.setState({
        docs : null,
        form : null,
        pics : null,

        okformulario:false,
        okfotos:false,
      })

    } catch(e) {
      console.log('error clear', e)
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
          this.clearAll()
        }},
      ],
      {cancelable: false},
    )
  }

  render = () => {
    const {okformulario, okfotos, docs, form, pics} = this.state
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
            onClickButton = {()=>{this.props.navigation.navigate('FInicio', {user:this.state.user})}}
            status = {form}
            disabled = {okformulario}
          />
          <ButtonLarge
            iconPrimary = {require('../assets/icono_iniciarformulario/icono_iniciarformulario.png')}
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
              style={styles.touch}
              source={require('../assets/btNCANCELAR/btNCANCELAR.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.sendAll}>
            <Image
              style={styles.touch}
              source={require('../assets/btn_guardar/btn_guardar.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const {height, width} = Dimensions.get('window')
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
  touch:{
    width:100,
  }
})
