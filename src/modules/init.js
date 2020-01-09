import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationEvents } from 'react-navigation'
import ButtonLarge from '../components/buttonLarge'

export default class App extends Component {
  state={
    label:'Iniciar Avalúo',
    user:null,
  }

  componentDidMount = () => {
    if (Platform.OS === 'android') {
      SplashScreen.hide()
    }

    const user = this.props.navigation.getParam('user')
    this.setState({user},()=>{
      this.getAllKeys()
    })
  }

  onClickButton = () => {
    this.props.navigation.navigate('InitAvaluo', { user:this.state.user })
  }

  getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }


    let k = false
    keys.map((d,i)=>{
      if (d === 'respuestas' ) {
        k = true
        return null
      }
    })

    if (k) {
      this.setState({label:'Continuar Avalúo'})
    }
    else{
      this.setState({label:'Iniciar Avalúo'})
    }
  }

  render = () => {
    return (
      <ImageBackground
        source={require('../assets/bg_home/bg_home.png')}
        style={styles.container}
      >
        <ButtonLarge
          disabled = {true}
          iconPrimary = {require('../assets/icono_iniciaravaluo/icono_iniciaravaluo.png')}
          icon = {require('../assets/icono_iniciaravaluo/icono_iniciaravaluo.png')}
          text = {this.state.label}
          onClickButton = {this.onClickButton}
          status = {null}
        />
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
})
