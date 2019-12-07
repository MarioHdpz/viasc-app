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


import ButtonBack from '../components/buttonBack';
import TitleForm from '../components/titleForm';
import InputText from '../components/inputText';
import ButtonForm from '../components/buttonForm';
import CheckBox from '../components/checkBox';

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

  booleanCheck = (value, id) => {
    let {respuestas, values} =  this.state;

    respuestas[id] = value;
    values[id] = value;

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
    const {values, respuestas} = this.state;
    return(
      <ImageBackground
        source={require('../assets/bg_app/bg_app.png')}
        style={styles.container}
      >

        <ButtonBack
          backForm={()=>{this.props.navigation.navigate('DatosGenerales', {user:this.state.user})}}
        />

        <TitleForm
          label="Elementos adicionales"
        />

        <ScrollView style={styles.form}>

          <CheckBox
            label="Refrigerador"
            id={165}
            booleanCheck = {this.booleanCheck}
            value = {
              values[165]
              ? values[165]
              : false
            }
          />

          <CheckBox
            label="Estufa"
            id={166}
            booleanCheck = {this.booleanCheck}
            value = {
              values[166]
              ? values[166]
              : false
            }
          />

          <CheckBox
            label="Ahorrador de energía eléctrica"
            id={161}
            booleanCheck = {this.booleanCheck}
            value = {
              values[161]
              ? values[161]
              : false
            }
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
