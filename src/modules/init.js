import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
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
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => {this.getAllKeys()}}
        />
        <ButtonLarge
          disabled = {true}
          icon = {require('../assets/icon/icon.png')}
          text = {this.state.label}
          onClickButton = {this.onClickButton}
          status = {null}
        />
      </View>
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
