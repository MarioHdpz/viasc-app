import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import ButtonLarge from '../components/buttonLarge';

type Props = {};
export default class App extends Component<Props> {
  state={
    label:'Iniciar Avalúo',
  }

  componentDidMount = () => {
    this.getAllKeys()
  }

  onClickButton = () => {
    this.props.navigation.navigate('InitAvaluo');
  }

  getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }

    if (keys.length>0) {
      this.setState({label:'Continuar Avalúo'})
    }
    else{
      this.setState({label:'Iniciar Avalúo'});
    }
  }

  render = () => {
    return (
      <ImageBackground
        source={require('../assets/bg_home/bg_home.png')}
        style={styles.container}
      >
        <NavigationEvents
          onWillFocus={payload => {this.getAllKeys()}}
        />
        <ButtonLarge
          disabled = {true}
          icon = {require('../assets/icono_iniciaravaluo/icono_iniciaravaluo.png')}
          text = {this.state.label}
          onClickButton = {this.onClickButton}
          status = {null}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
});
