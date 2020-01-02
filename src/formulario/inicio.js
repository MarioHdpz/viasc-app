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

import SplashScreen from 'react-native-splash-screen'

import TitleForm from '../components/titleForm'
import ButtonForm from '../components/buttonForm'

export default class App extends Component {
  state = {
    user:null,
  }

  componentDidMount = () => {
    if (Platform.OS === 'android') {
      SplashScreen.hide()
    }

    const user = this.props.navigation.getParam('user')
    this.setState({user})
    this.backHandler = BackHandler.addEventListener('hardwareBackPress',()=>{ this.props.navigation.navigate('FInicio') })
  }
  componentWillUnmount = () => {
    this.backHandler.remove()
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
          status = {null}
          onClickButton = {()=>{
            console.log('datosgenerales')
            this.props.navigation.navigate('DatosGenerales')
          }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Tipo de inmueble"
          disabled = {true}
          status = {null}
          onClickButton = {()=>{
            console.log('TipoDeInmueble')
            this.props.navigation.navigate('TipoDeInmueble')
          }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Información general"
          disabled = {true}
          status = {null}
          onClickButton = {()=>{
            console.log('InformacionGeneral')
            this.props.navigation.navigate('InformacionGeneral')
          }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Infraestructura de zona"
          disabled = {true}
          status = {null}
          onClickButton = {()=>{
            console.log('InfraestructuraDeZona')
            this.props.navigation.navigate('InfraestructuraDeZona')
          }}
        />
        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Características de inmuebles"
          disabled = {true}
          status = {null}
          onClickButton = {()=>{
            console.log('CaracteristicasDeInmuebles')
            this.props.navigation.navigate('CaracteristicasDeInmuebles')
          }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Construcciones"
          disabled = {true}
          status = {null}
          onClickButton = {()=>{
            console.log('Construcciones')
            this.props.navigation.navigate('Construcciones')
          }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Elementos Adicionales"
          disabled = {true}
          status = {null}
          onClickButton = {()=>{
            console.log('ElementosAdicionales')
            this.props.navigation.navigate('ElementosAdicionales')
          }}
        />
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
    justifyContent:'center',
    alignItems:'center',
  },
  btnBack:{
    width:width,
    height:20,
    alignItems:'flex-end'
  }
})
