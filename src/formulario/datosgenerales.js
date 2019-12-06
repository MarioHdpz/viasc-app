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
  Image
} from 'react-native';

import ButtonBack from '../components/buttonBack'
import TitleForm from '../components/titleForm'
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
        label="Datos generales"
      />

      <View style={styles.form}>
        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Datos del solicitante"
          disabled = {true}
          onClickButton = {()=>{
              this.props.navigation.navigate('DatosDelSolicitante', {user:this.state.user})
            }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Ubicación"
          disabled = {true}
          onClickButton = {()=>{
            this.props.navigation.navigate('Ubicacion', {user:this.state.user})
          }}
        />

        <Select
          id = {22}
          options = {
            [
              [1,"Terreno"],
              [2,"Casa habitación"],
              [3,"Casa en condominio"],
              [4,"Departamento en condominio"]
            ]
          }
          value = {
            values[22]
            ? values[22]
            : "Tipo de inmueble"
          }
          label = "Tipo de inmueble"
          buttonSelected = { this.buttonSelected }
        />
      </View>

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
});
