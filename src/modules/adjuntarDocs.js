import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native';
import axios from 'axios';

import File from '../components/file'
import AsyncStorage from '@react-native-community/async-storage';

type Props = {};
export default class App extends Component<Props> {
  state = {
    user:null,
    docs:{
      "Escritura":null,
      "INE Solicitante":null,
      "Boleto Predial":null,
      "INE Propietario":null,
      "Recibos":null,
      "Plano vivienda":null,
    }
  }

  componentDidMount = () => {
    this.getDocsStorage();

    const user = this.props.navigation.getParam('user');
    this.setState({user},()=>{
      console.log('ADJUNTARDOCUMENTOS:',user);
    });
  }

  getDocsStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('docs')
      if(value !== null) {
        const json = JSON.parse(value);
        let {docs} = this.state;

        for (i in json) {
          docs[i]=json[i]
        }
        console.log('getDocsStorage',docs);
        this.setState({docs});
      }
    } catch(e) {
      // error reading value
    }
  }

  setDogsStorage = async () => {
    try {
      await AsyncStorage.setItem('docs', JSON.stringify(this.state.docs) )
    } catch (e) {
      console.log("error de almacenaje");
    }
  }

  getData = async (id, archive) => {
    let {docs, user} = this.state;

    console.log(archive);

    if (archive) {
      let data = new FormData()
      data.append('user', user.pk)
      data.append('encoding', '')
      data.append('archive', archive)
      data.append('process', '')
      data.append('label', id)
      data.append('appraisal', '1')
      data.append('created_at', '2019-11-02 04:41:16')
      data.append('updated_at', '2019-11-02 04:41:16')
      const conf = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `jwt ${user.token}`,
        }
      }

      console.log(conf);

      axios.post('http://18.219.244.117/documents/', data, conf)
      .then((response) => {
        console.log('AXIOS OK -> ',response);
        docs[id] = archive;
        this.setState({docs}, this.setDogsStorage);
      })
      .catch((response) => {
        docs[id] = false;
        this.setState({docs}, this.setDogsStorage);
        console.log('error Axios -> ', response);
      });

    }
    else{
      //console.log('NO HAY ARCHIVO');
      docs[id] = archive;
      this.setState({docs}, this.setDogsStorage);
    }

    //console.log('getData',docs);
  }

  render = () => {
    return (
      <ImageBackground source={
        require('../assets/bginit/bginit.png')
      } style={styles.container}>
        <ScrollView>
          <View style={styles.row}>
            <File
              style={styles.left}
              label = "Escritura"
              getData = {this.getData}
              id="Escritura"
              estado={this.state.docs["Escritura"]}
            />
            <File
              style={styles.left}
              label = "INE Solicitante"
              getData = {this.getData}
              id="INE Solicitante"
              estado={this.state.docs["INE Solicitante"]}
            />
          </View>

          <View style={styles.row}>
            <File
              style={styles.left}
              label = "Boleto Predial"
              getData = {this.getData}
              id="Boleto Predial"
              estado={this.state.docs["Boleto Predial"]}
            />
            <File
              style={styles.left}
              label = "INE Propietario"
              getData = {this.getData}
              id="INE Propietario"
              estado={this.state.docs["INE Propietario"]}
            />
          </View>

          <View style={styles.row}>
            <File
              style={styles.left}
              label = "Recibos"
              getData = {this.getData}
              id="Recibos"
              estado={this.state.docs["Recibos"]}
            />
            <File
              style={styles.left}
              label = "Plano vivienda"
              getData = {this.getData}
              id="Plano vivienda"
              estado={this.state.docs["Plano vivienda"]}
            />
          </View>
        </ScrollView>
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
