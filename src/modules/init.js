import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import ButtonLarge from '../components/buttonLarge';

type Props = {};
export default class App extends Component<Props> {

  onClickButton = () => {
    this.props.navigation.navigate('InitAvaluo');
  }

  render = () => {
    return (
      <View style={styles.container}>
        <ButtonLarge
          icon = {require('../assets/icon/icon.png')}
          text = "Iniciar Avalúo"
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
