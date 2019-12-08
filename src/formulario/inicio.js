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
  Alert,
  BackHandler
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'

import TitleForm from '../components/titleForm'
import ButtonForm from '../components/buttonForm'

export default class App extends Component<Props> {
  state = {
    user:null,
  }

  componentDidMount = () => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }

    const user = this.props.navigation.getParam('user');
    this.setState({user});
    this.backHandler = BackHandler.addEventListener('hardwareBackPress',()=>{ this.props.navigation.navigate('FInicio') });
  }
  componentWillUnmount = () => {
    this.backHandler.remove()
  }

  render = () => {
    return(
      <ImageBackground
        source={require('../assets/bg_app/bg_app.png')}
        style={styles.container}
      >

      <View
        style={{
          alignItems:'flex-start',
          width:'100%',
          marginTop:80,
        }}
      >
        <TitleForm
          label="Iniciar formulario"
        />
      </View>

      <ScrollView style={{flex:1, marginTop:40}}>
        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Datos generales"
          disabled = {true}
          onClickButton = {()=>{
            console.log('datosgenerales');
            this.props.navigation.navigate('DatosGenerales', {user:this.state.user})
          }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Información general"
          disabled = {true}
          onClickButton = {()=>{
            console.log('InformacionGeneral');
            this.props.navigation.navigate('InformacionGeneral', {user:this.state.user})
          }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Infraestructura de zona"
          disabled = {true}
          onClickButton = {()=>{
            console.log('InfraestructuraDeZona');
            this.props.navigation.navigate('InfraestructuraDeZona', {user:this.state.user})
          }}
        />
        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Características de inmuebles"
          disabled = {true}
          onClickButton = {()=>{
            console.log('CaracteristicasDeInmuebles');
            this.props.navigation.navigate('CaracteristicasDeInmuebles', {user:this.state.user})
          }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Elementos Adicionales"
          disabled = {true}
          onClickButton = {()=>{
            console.log('ElementosAdicionales');
            this.props.navigation.navigate('ElementosAdicionales')
          }}
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
    justifyContent:'center',
    alignItems:'center',
  },
  btnBack:{
    width:width,
    height:20,
    alignItems:'flex-end'
  }
});
