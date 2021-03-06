import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  Switch,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import ButtonBack from '../components/buttonBack'
import TitleForm from '../components/titleForm'
import ButtonForm from '../components/buttonForm'
import Select from '../components/select'
import InputText from '../components/inputText'
import InputNumber from '../components/inputNumber'
import Calendar from '../components/calendar'

export default class App extends Component {
  state = {
    user:null,
    respuestas : {},
    values:{},
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft:(
        <TouchableOpacity
          onPress={()=>{navigation.navigate('InitAvaluo')}}
        >
          <Image
            style={{
              width:30,
              height:30
            }}
            source={require('../assets/icono_flechaizq/icono_flechaizq.png')}
          />
        </TouchableOpacity>
      ),
    }
  }

  componentDidMount = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress',()=>{ this.props.navigation.navigate('FInicio') })
    this.getStorage()
  }
  componentWillUnmount = () => {
    this.backHandler.remove()
  }

  setStorage = async () => {
    try {
      await AsyncStorage.setItem('respuestas', JSON.stringify(this.state.respuestas) )
    } catch (e) {
      console.log("error de almacenaje")
    }

    try {
      await AsyncStorage.setItem('values', JSON.stringify(this.state.values) )
    } catch (e) {
      console.log("error de almacenaje")
    }
  }

  getStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('respuestas')
      if(value !== null) {
        const respuestas = JSON.parse(value)
        console.log(respuestas)
        this.setState({respuestas})
      }
    } catch(e) {
      console.log("error storage", e)
    }

    try {
      const value = await AsyncStorage.getItem('values')
      if(value !== null) {
        const values = JSON.parse(value)
        console.log(values)
        this.setState({values})
      }
    } catch(e) {
      console.log("error storage", e)
    }
  }

  clear = () => {
    let {respuestas, values} =  this.state

    let clr={}
    for (const r in respuestas) {
      clr[r] = null
    }

    console.log(clr)
    this.setState({respuestas : clr, values:clr }, ()=>{
      this.setStorage()
    })
  }

  fCancelar = () => {
    Alert.alert(
      'Cancelar',
      '¿Desea cancelar?',
      [
        {
          text: 'No, continuar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Si, cancelar', onPress: () => {
          this.clear()
        }},
      ],
      {cancelable: false},
    )
  }

  fSend = () => {
    Alert.alert(
      'Enviar',
      '¿Desea enviar su información?',
      [
        {
          text: 'No, continuar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Si, enviar', onPress: () => {
          //Aquí -> Axios a server
          //Confirmo que todo esta bien
          this.readyFormulario()
          //despúes:
          this.clear()
        }},
      ],
      {cancelable: false},
    )
  }

  readyFormulario = async () => {
    try {
      const value = await AsyncStorage.getItem('readyFormulario')
      let rf = null
      if (value) {
        rf = JSON.parse(value)
        rf['Escaleras'] = true
      }
      else{
        rf = {}
        rf['Escaleras'] = true
      }
      this.setReadyFormulario(rf)

    } catch(e) {
      console.log("error storage", e)
    }
  }
  setReadyFormulario= async (rf) => {
    try {
      await AsyncStorage.setItem('readyFormulario', JSON.stringify(rf) )
    } catch (e) {
      console.log("error de almacenaje")
    }
  }

  buttonSelected = (index, id, data) => {
    let {respuestas, values} =  this.state

    respuestas[id] = data[0]
    values[id] = data[1]

    this.setState({respuestas, values},this.setStorage)
  }

  handleTextChange = (inputText, id, index) => {
    let {respuestas, values} =  this.state

    respuestas[id] = inputText
    values[id] = inputText

    this.setState({respuestas, values},this.setStorage)
  }

  cConstruccion = (respuesta) => {
    const {values} = this.state
    switch (respuesta) {
      //Mínima
      case 1:
        return(
          <View>
            <Select
              id = {79}
              options = {
                [
                  [0,"Piso de cemento"],
                  [1,"Piso de loseta vinílica"],
                  [2,"Piso de mosaico"],
                  [3,"Piso de loseta cerámica"],
                ]
              }
              value = {
                values[79]
                ? values[79]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {82}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Pasta texturizada"],
                  [3,"Rústico"],
                ]
              }
              value = {
                values[82]
                ? values[82]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {85}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Pasta texturizada"],
                  [3,"Rústico"],
                ]
              }
              value = {
                values[85]
                ? values[85]
                : "Muros"
              }
              label = "Muros"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break
      //Económica
      case 2:
        return(
          <View>
            <Select
              id = {79}
              options = {
                [
                  [0,"Piso de cemento"],
                  [1,"Piso de loseta vinílica"],
                  [2,"Piso de mosaico"],
                  [3,"Piso de loseta cerámica"],
                ]
              }
              value = {
                values[79]
                ? values[79]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {82}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Pasta texturizada"],
                  [3,"Rústico"],
                ]
              }
              value = {
                values[82]
                ? values[82]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {85}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Pasta texturizada"],
                  [3,"Rústico"],
                ]
              }
              value = {
                values[85]
                ? values[85]
                : "Muros"
              }
              label = "Muros"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break
      //Interés Social
      case 3:
        return(
          <View>
            <Select
              id = {79}
              options = {
                [
                  [0,"Piso de cemento"],
                  [1,"Piso de loseta vinílica"],
                  [2,"Piso de mosaico"],
                  [3,"Piso de loseta cerámica"],
                ]
              }
              value = {
                values[79]
                ? values[79]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {82}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Pasta texturizada"],
                  [3,"Rústico"],
                ]
              }
              value = {
                values[82]
                ? values[82]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {85}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Pasta texturizada"],
                  [3,"Rústico"],
                ]
              }
              value = {
                values[85]
                ? values[85]
                : "Muros"
              }
              label = "Muros"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
      break
      //Media
      case 4:
        return(
          <View>
            <Select
              id = {80}
              options = {
                [
                  [0,"Piso de cemento"],
                  [1,"Piso de mosaico"],
                  [2,"Piso de loseta cerámica"],
                  [3,"Piso con laminado de madera"],
                  [4,"Piso con alfombra"],
                ]
              }
              value = {
                values[80]
                ? values[80]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {83}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Terminado con yeso"],
                  [3,"Pasta texturizada"],
                ]
              }
              value = {
                values[83]
                ? values[83]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {86}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Terminado con yeso"],
                  [3,"Pasta texturizada"],
                ]
              }
              value = {
                values[86]
                ? values[86]
                : "Muros"
              }
              label = "Muros"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break
      //Semilujo
      case 5:
        return(
          <View>
            <Select
              id = {80}
              options = {
                [
                  [0,"Piso de cemento"],
                  [1,"Piso de mosaico"],
                  [2,"Piso de loseta cerámica"],
                  [3,"Piso con laminado de madera"],
                  [4,"Piso con alfombra"],
                ]
              }
              value = {
                values[80]
                ? values[80]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {83}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Terminado con yeso"],
                  [3,"Pasta texturizada"],
                ]
              }
              value = {
                values[83]
                ? values[83]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {86}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Terminado con yeso"],
                  [3,"Pasta texturizada"],
                ]
              }
              value = {
                values[86]
                ? values[86]
                : "Muros"
              }
              label = "Muros"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break
      //Lujo
      case 6:
        return(
          <View>
            <Select
              id = {81}
              options = {
                [
                  [0,"Piso de loseta cerámica"],
                  [1,"Piso con laminado de madera"],
                  [2,"Piso con alfombra"],
                  [3,"Piso con duela de madera"],
                  [4,"Piso de mármol"],
                  [5,"Otro"],
                ]
              }
              value = {
                values[79]
                ? values[79]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {84}
              options = {
                [
                  [0,"Rústico"],
                  [1,"Liso"],
                  [2,"Terminado con yeso"],
                  [3,"Recubrimientos especiales"],
                ]
              }
              value = {
                values[84]
                ? values[84]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {87}
              options = {
                [
                  [0,"Rústico"],
                  [1,"Liso"],
                  [2,"Terminado con yeso"],
                  [3,"Recubrimientos especiales"],
                ]
              }
              value = {
                values[87]
                ? values[87]
                : "Muros"
              }
              label = "Muros"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break
      //Residencial
      case 7:
        return(
          <View>
            <Select
              id = {81}
              options = {
                [
                  [0,"Piso de loseta cerámica"],
                  [1,"Piso con laminado de madera"],
                  [2,"Piso con alfombra"],
                  [3,"Piso con duela de madera"],
                  [4,"Piso de mármol"],
                  [5,"Otro"],
                ]
              }
              value = {
                values[79]
                ? values[79]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {84}
              options = {
                [
                  [0,"Rústico"],
                  [1,"Liso"],
                  [2,"Terminado con yeso"],
                  [3,"Recubrimientos especiales"],
                ]
              }
              value = {
                values[84]
                ? values[84]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {87}
              options = {
                [
                  [0,"Rústico"],
                  [1,"Liso"],
                  [2,"Terminado con yeso"],
                  [3,"Recubrimientos especiales"],
                ]
              }
              value = {
                values[87]
                ? values[87]
                : "Muros"
              }
              label = "Muros"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break
      //Residencial plus
      case 8:
        return(
          <View>
            <Select
              id = {81}
              options = {
                [
                  [0,"Piso de loseta cerámica"],
                  [1,"Piso con laminado de madera"],
                  [2,"Piso con alfombra"],
                  [3,"Piso con duela de madera"],
                  [4,"Piso de mármol"],
                  [5,"Otro"],
                ]
              }
              value = {
                values[79]
                ? values[79]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {84}
              options = {
                [
                  [0,"Rústico"],
                  [1,"Liso"],
                  [2,"Terminado con yeso"],
                  [3,"Recubrimientos especiales"],
                ]
              }
              value = {
                values[84]
                ? values[84]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {87}
              options = {
                [
                  [0,"Rústico"],
                  [1,"Liso"],
                  [2,"Terminado con yeso"],
                  [3,"Recubrimientos especiales"],
                ]
              }
              value = {
                values[87]
                ? values[87]
                : "Muros"
              }
              label = "Muros"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break
      default: null
    }
  }

  render = () => {
    const {values, respuestas} = this.state
    return(
      <ImageBackground
        source={require('../assets/bg_app/bg_app.png')}
        style={styles.container}
      >
        <ButtonBack
          backForm={()=>{this.props.navigation.navigate('Construcciones', {user:this.state.user})}}
        />

        <TitleForm
          label="Escaleras"
        />

        <ScrollView style={styles.form}>
          {
            respuestas[31]
            ? this.cConstruccion( respuestas[31] )
            :null
          }

          <View style={styles.fixToText}>
            <TouchableOpacity onPress={this.fCancelar}>
              <Image
                style={{
                  width:100,
                }}
                source={require('../assets/btNCANCELAR/btNCANCELAR.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.fSend}>
              <Image
                style={{
                  width:100,
                }}
                source={require('../assets/btn_guardar/btn_guardar.png')}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    )
  }
}

const {height, width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container:{
    flex:1,
    height:height+10,
    paddingTop:35,
  },
  form:{
    flex:1,
    marginTop:40
  },
  fixToText: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:20,
    padding:15,
    paddingRight:30,
  },
})
