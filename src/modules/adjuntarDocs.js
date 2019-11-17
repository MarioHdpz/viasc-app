import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native';
import File from '../components/file'
import AsyncStorage from '@react-native-community/async-storage';


type Props = {};
export default class App extends Component<Props> {
  state = {
    1:null,
    2:null,
    3:null,
    4:null,
    5:null,
    6:null,
  }

  componentDidMount = () => {
    this.getStorage();
  }

  getStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('docs')
      if(value !== null) {
        const json = JSON.parse(value);
        for (i in json) {
          this.setState({ [i]:json[i] });
        }
      }
    } catch(e) {
      // error reading value
    }
  }

  setStorage = async (data) => {
    try {
      await AsyncStorage.setItem('docs', JSON.stringify(this.state) )
    } catch (e) {
      console.log("error de almacenaje");
    }
  }

  getData = (id, data, estado) => {
    this.setState( {[id]:estado}, this.setStorage );
  }

  validar = () => {
    let ready = true;
    for(i in this.state){
      if (this.state[i]=== false || this.state[i] === null){
        ready = null;
        if (this.state[i]===false) {
            ready = false;
        }
      }
    }

    console.log(ready);
    if (ready !== null) {
      this.setStorage(ready.toString());
    }
    else{
      this.setStorage('null');
    }
  }

  render = () => {
    return (
      <ImageBackground source={
        require('../assets/bginit/bginit.png')
      } style={styles.container}>

        <View style={styles.row}>
          <File
            style={styles.left}
            label = "Escritura"
            getData = {this.getData}
            id={1}
            estado={this.state[1]}
          />
          <File
            style={styles.left}
            label = "INE Solicitante"
            getData = {this.getData}
            id={2}
            estado={this.state[2]}
          />
        </View>

        <View style={styles.row}>
          <File
            style={styles.left}
            label = "Boleto Predial"
            getData = {this.getData}
            id={3}
            estado={this.state[3]}
          />
          <File
            style={styles.left}
            label = "INE Propietario"
            getData = {this.getData}
            id={4}
            estado={this.state[4]}
          />
        </View>

        <View style={styles.row}>
          <File
            style={styles.left}
            label = "Recibos"
            getData = {this.getData}
            id={5}
            estado={this.state[5]}
          />
          <File
            style={styles.left}
            label = "Plano vivienda"
            getData = {this.getData}
            id={6}
            estado={this.state[6]}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:50,
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  }
});
