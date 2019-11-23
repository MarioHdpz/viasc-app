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


    "Escritura":null,
    "INE Solicitante":null,
    "Boleto Predial":null,
    "INE Propietario":null,
    "Recibos":null,
    "Plano vivienda":null,

  }

  componentDidMount = () => {
    this.getDocsStorage();
  }

  getDocsStorage = async () => {
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

  getData = async (id, archive, estado) => {
    try {
      const value = await AsyncStorage.getItem('user')
      if(value !== null) {
        const user = JSON.parse(value);

        let data = new FormData()
        data.append('user', user.pk)
        data.append('encoding', '')
        data.append('archive', archive)
        data.append('process', '')
        data.append('label', id)
        data.append('appraisal', '1')
        data.append('created_at', '2019-11-02 04:41:16')
        data.append('updated_at', '2019-11-02 04:41:16')

        fetch('http://18.219.244.117/documents/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': user.token,
          },
          body: JSON.stringify(data),
        }).then((response) => {
          this.setState( {[id]:true}, this.setStorage );
          console.log(response);
        })
        .catch((error) => {
          console.log("response false",id, error);
          this.setState( {[id]:false}, this.setStorage );
        });

      }
    } catch(e) {
      // error reading value
    }
  }

  /*getData = (id, archive, estado) => {
    const token = this.getToken();
    console.log('token', token, 'archive', archive);
    const url = 'http://18.219.244.117/documents/'
    let data = new FormData()
    data.append('user', 'hubot')
    data.append('encoding', '')
    data.append('archive', archive)
    data.append('process', '')
    data.append('label', '')
    data.append('appraisal', '')
    data.append('created_at', '')
    data.append('updated_at', )

    //this.getData();

    //this.setState( {[id]:estado}, this.setStorage );
  }*/

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
            id="Escritura"
            estado={this.state["Escritura"]}
          />
          <File
            style={styles.left}
            label = "INE Solicitante"
            getData = {this.getData}
            id="INE Solicitante"
            estado={this.state["INE Solicitante"]}
          />
        </View>

        <View style={styles.row}>
          <File
            style={styles.left}
            label = "Boleto Predial"
            getData = {this.getData}
            id="Boleto Predial"
            estado={this.state["Boleto Predial"]}
          />
          <File
            style={styles.left}
            label = "INE Propietario"
            getData = {this.getData}
            id="INE Propietario"
            estado={this.state["INE Propietario"]}
          />
        </View>

        <View style={styles.row}>
          <File
            style={styles.left}
            label = "Recibos"
            getData = {this.getData}
            id="Recibos"
            estado={this.state["Recibos"]}
          />
          <File
            style={styles.left}
            label = "Plano vivienda"
            getData = {this.getData}
            id="Plano vivienda"
            estado={this.state["Plano vivienda"]}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:'20%',
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  }
});
