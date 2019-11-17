import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

type Props = {};
export default class App extends Component<Props> {
  state={
    email:null,
    pass:null,
    text:'',
  }

  validate = (text) => {
    this.setState({email:text})
  }

  login = async () => {
    const {email,pass} = this.state;

    //email:'jess.monter@lytica.ai',
    //password:'admin'

    if (email && pass) {
      const url = 'http://167.172.197.238:3000/rest-auth/login/';
      const obj = {
        email:email,
        password:pass
      }

      axios.post(url, obj, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log('login response', response.data);
        this.storeData('data',JSON.stringify(response.data))
        this.storeData('email',email);
        this.storeData('pass',pass);
        this.props.navigation.navigate('Init');
      })
      .catch((response) => {
        Alert.alert(
          'Error',
          'Revise su usario y contraseña',
          [
            {text: 'OK'},
          ],
          {cancelable: false},
        );
      });
    }
    else{
      Alert.alert(
        'Error',
        'Faltan datos',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
    }
  }

  storeData = async (item,data) => {
    try {
      await AsyncStorage.setItem(item, data)
    } catch (e) {
      console.log("error de almacenaje");
    }
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/icon/icon.png')}/>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          onChangeText={(text) => this.validate(text)}
          value={this.state.email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={(pass) => this.setState({pass})}
          value={this.state.pass}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={this.login}>
          <Text style={{textAlign:'center'}}>
            Iniciar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  image:{
    width:150,
    height:150,
  },
  input:{
    borderColor:'black',
    borderWidth:1,
    width:width-100,
  },
  button:{
    borderColor:'black',
    borderWidth:1,
    width:width-100,
    paddingTop:10,
    paddingBottom:10,
    marginTop:20,
  },
  minitext:{
    fontSize:9,
    paddingBottom:12,
  },
});
