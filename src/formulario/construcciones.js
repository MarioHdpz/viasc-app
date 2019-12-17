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
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen'

import ButtonBack from '../components/buttonBack';
import TitleForm from '../components/titleForm'
import ButtonForm from '../components/buttonForm'

export default class App extends Component<Props> {
  state = {
    user:null,
    respuestas : {},
    values:{},
  }

  componentDidMount = () => {

    this.backHandler = BackHandler.addEventListener('hardwareBackPress',()=>{ this.props.navigation.navigate('FInicio') });
    this.getStorage()
  }
  componentWillUnmount = () => {
    this.backHandler.remove()
  }

  getStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('respuestas');
      if(value !== null) {
        const respuestas = JSON.parse(value);
        console.log(respuestas);
        this.setState({respuestas})
      }
    } catch(e) {
      console.log("error storage", e);
    }

    try {
      const value = await AsyncStorage.getItem('values');
      if(value !== null) {
        const values = JSON.parse(value);
        console.log(values);
        this.setState({values})
      }
    } catch(e) {
      console.log("error storage", e);
    }
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
    let {values, respuestas} = this.state

    return(
      <ImageBackground
        source={require('../assets/bg_app/bg_app.png')}
        style={styles.container}
      >

      <ButtonBack
        backForm={()=>{this.props.navigation.navigate('FInicio', {user:this.state.user})}}
      />
      <TitleForm
        label="Construcciones"
      />

      <ScrollView style={{flex:1, marginTop:40}}>

        {
          respuestas[22] === 1
          ? null
          : <View>

          <ButtonForm
            icon = {require('../assets/icono_flechader/icono_flechader.png')}
            text = "Recámaras"
            disabled = {true}
            status={null}
            onClickButton = {()=>{ this.props.navigation.navigate('Recamaras') }}
          />

          <ButtonForm
            icon = {require('../assets/icono_flechader/icono_flechader.png')}
            text = "Estancia Comedor"
            disabled = {true}
            status={null}
            onClickButton = {()=>{ this.props.navigation.navigate('EstanciaComedor') }}
          />

          <ButtonForm
            icon = {require('../assets/icono_flechader/icono_flechader.png')}
            text = "Baños"
            disabled = {true}
            status={null}
            onClickButton = {()=>{ this.props.navigation.navigate('Banios') }}
          />

          <ButtonForm
            icon = {require('../assets/icono_flechader/icono_flechader.png')}
            text = "Escaleras"
            disabled = {true}
            status={null}
            onClickButton = {()=>{ this.props.navigation.navigate('Escaleras') }}
          />

          <ButtonForm
            icon = {require('../assets/icono_flechader/icono_flechader.png')}
            text = "Cocina"
            disabled = {true}
            status={null}
            onClickButton = {()=>{ this.props.navigation.navigate('Cocina') }}
          />

          <ButtonForm
            icon = {require('../assets/icono_flechader/icono_flechader.png')}
            text = "Patio Servicio"
            disabled = {true}
            status={null}
            onClickButton = {()=>{ this.props.navigation.navigate('PatioServicio') }}
          />

          <ButtonForm
            icon = {require('../assets/icono_flechader/icono_flechader.png')}
            text = "Estacionamiento"
            disabled = {true}
            status={null}
            onClickButton = {()=>{ this.props.navigation.navigate('Estacionamiento') }}
          />

          <ButtonForm
            icon = {require('../assets/icono_flechader/icono_flechader.png')}
            text = "Fachada"
            disabled = {true}
            status={null}
            onClickButton = {()=>{ this.props.navigation.navigate('Fachada') }}
          />

          </View>
        }

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
  btnBack:{
    width:width,
    height:20,
    alignItems:'flex-end'
  }
});
