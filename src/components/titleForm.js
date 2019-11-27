import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native';

type Props = {};
export default class TitleForm extends Component {

  render() {
    return (
      <ImageBackground source={require('../assets/shape_tituloseccion/shape_tituloseccion.png')}  style={styles.labelTitle} >
        <Text style={styles.titlePrimary}>
          {this.props.label}
        </Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  titlePrimary:{
    marginTop:5,
    marginLeft:270,
    color:'white',
    fontSize:18,
    fontWeight: 'bold',
    textAlign:'center',
  },
  labelTitle:{
    width:500,
    height:40,
    marginLeft: -350,
    marginTop: 70,
  },
});