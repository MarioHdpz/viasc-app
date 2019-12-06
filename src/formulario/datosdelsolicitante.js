import React, {Component} from 'react';
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
  Alert
} from 'react-native';

import ButtonBack from '../components/buttonBack'
import TitleForm from '../components/titleForm'
import InputText from '../components/inputText';
import ButtonForm from '../components/buttonForm'

export default class App extends Component<Props> {
  state = {
    user:null,
    respuestas : {},
    values:{},
  }

  componentDidMount = () => {
    const user = this.props.navigation.getParam('user');
    this.setState({user});
  }

  handleTextChange = (inputText, id, index) => {
    let {respuestas, values} =  this.state;

    respuestas[id] = inputText;
    values[id] = inputText;

    this.setState({respuestas, values})
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
          this.setState({respuestas : {}, values:{}})
        }},
      ],
      {cancelable: false},
    );
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
          this.setState({respuestas : {}, values:{}})
        }},
      ],
      {cancelable: false},
    );
  }

  render = () => {
    const {values} = this.state;
    return(
      <ImageBackground
        source={require('../assets/bg_app/bg_app.png')}
        style={styles.container}
      >

        <ButtonBack
          backForm={()=>{this.props.navigation.navigate('DatosGenerales', {user:this.state.user})}}
        />

        <TitleForm
          label="Datos del solicitante"
        />

        <ScrollView style={styles.form}>
          <InputText
            id = {3}
            handleTextChange = {this.handleTextChange}
            pholder = "Apellido Paterno"
            label = "Apellido Paterno"
            value= {
              values[3]
            ? values[3]
            : null}
          />
          <InputText
            id = {4}
            handleTextChange = {this.handleTextChange}
            pholder = "Apellido Materno"
            label = "Apellido Materno"
            value= {
              values[4]
            ? values[4]
            : null}
          />
          <InputText
            id = {5}
            handleTextChange = {this.handleTextChange}
            pholder = "Nombre"
            label = "Nombre"
            value= {
              values[5]
            ? values[5]
            : null}
          />
          <InputText
            id = {6}
            handleTextChange = {this.handleTextChange}
            pholder = "Calle"
            label = "Calle"
            value= {
              values[6]
            ? values[6]
            : null}
          />
          <InputText
            id = {7}
            handleTextChange = {this.handleTextChange}
            pholder = "Numero Exterior"
            label = "Numero Exterior"
            value= {
              values[7]
            ? values[7]
            : null}
          />
          <InputText
            id = {8}
            handleTextChange = {this.handleTextChange}
            pholder = "Colonia"
            label = "Colonia"
            value= {
              values[8]
            ? values[8]
            : null}
          />
          <InputText
            id = {9}
            handleTextChange = {this.handleTextChange}
            pholder = "Código Postal"
            label = "Código Postal"
            value= {
              values[9]
            ? values[9]
            : null}
          />
          <InputText
            id = {10}
            handleTextChange = {this.handleTextChange}
            pholder = "Delegación"
            label = "Delegación"
            value= {
              values[10]
            ? values[10]
            : null}
          />

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

const {height, width} = Dimensions.get('window');
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
});
