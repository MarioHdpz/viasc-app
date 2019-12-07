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
import Select from '../components/select';

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

  buttonSelected = (index, id, data) => {
    let {respuestas, values} =  this.state;

    respuestas[id] = data[0];
    values[id] = data[1];

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
          backForm={()=>{this.props.navigation.navigate('FInicio', {user:this.state.user})}}
        />

        <TitleForm
          label="Información General"
        />

        <ScrollView style={styles.form}>
          <Select
            id = {63}
            options = {
              [
                [1,"1"],
                [2,"2"],
                [3,"3"],
                [4,"4"],
                [5,"5"],
                [6,"6"],
                [7,"7"],
                [8,"8"],
                [9,"9"],
                [10,"10"],
                [11,"11"],
                [12,"12"],
                [13,"13"],
                [14,"14"],
                [15,"15"],
                [16,"Más de 15"],
              ]
            }
            value = {
              values[63]
              ? values[63]
              : "Niveles de Zona"
            }
            label = "Niveles de Zona"
            buttonSelected = { this.buttonSelected }
          />
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
