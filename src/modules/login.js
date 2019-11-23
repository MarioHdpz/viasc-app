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
  ImageBackground
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

type Props = {};
export default class App extends Component<Props> {
  state={
    email:'gibran.aguilar@lytica.ai',
    pass:'admin',
    text:'',
  }

  validate = (text) => {
    this.setState({email:text})
  }

  login = async () => {
    const {email,pass} = this.state;

    //email:'jess.monter@lytica.ai',
    //password:'admin'

    /*
    http://18.219.244.117/rest-auth/login/
    {
    	"user":"gibran",
    	"email":"gibran.aguilar@lytica.ai",
    	"password":  "admin"
    }

    fetch('http://18.219.244.117/rest-auth/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:'jess.monter@lytica.ai',
        password:'admin'
      }),
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
    */

    /*
    fetch('http://18.219.244.117/rest-auth/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization: '/JWT Tocken',
      },
      body: JSON.stringify({
        email:'jess.monter@lytica.ai',
        password:'admin'
      }),
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });


    http://18.219.244.117/pictures/

    {
    "token":"el token que se genero"
      	"user" : 2,
        "encoding" : "base 64 del archivo",
        "archive":"¿poner un archivo? el blob??? necesitas los dos archivos blob y base64",
        "process" :"",
        "items" : "",
        "label" : "Lugar donde se tomo la foto ej. recamara, patio, terreno",
        "appraisal" : 1,
        "created_at" : "2019-11-02 04:41:16.206000",
        "updated_at" : "2019-11-02 04:41:16.206000"
    }
    */

    /*
    http://18.219.244.117/documents/
    {

    	  "user" : 2,
        "encoding" : "",
        "archive":"poner un archivo",
        "process" :"",
        "label" : "entorno",
        "appraisal" : 1,
        "created_at" : "2019-11-02 04:41:16.206000",
        "updated_at" : "2019-11-02 04:41:16.206000"


    }
    */

    if (email && pass) {
      //before url: http://167.172.197.238:3000/rest-auth/login/
      //new url: http://18.219.244.117/rest-auth/login/
      const url = 'http://18.219.244.117/rest-auth/login/';
      const obj = {
        email:email,
        password:pass
      }

      axios.post(url, obj, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        //console.log('login response', response.data.user.pk);
        //this.storeData('data',JSON.stringify(response.data))

        const user = {
          token:response.data.token,
          pk:response.data.user.pk
        }

        this.storeData('user',JSON.stringify(user));
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
      <ImageBackground
        source={require('../assets/bg_login/bg_login.png')}
        style={styles.container}
      >
        <Image style={styles.image} source={require('../assets/logotipo_vias/logotipo_vias.png')}/>
        <Image style={styles.image} source={require('../assets/icono_usuario/icono_usuario.png')}/>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#f2f2f2"
          onChangeText={(text) => this.validate(text)}
          value={this.state.email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#f2f2f2"
          onChangeText={(pass) => this.setState({pass})}
          value={this.state.pass}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={this.login}>
          <Image
            style={{
              width:200,
            }}
            source={require('../assets/btn_iniciarsesion/btn_iniciarsesion.png')}
          />
        </TouchableOpacity>
      </ImageBackground>
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
    width:100,
    height:100,
    margin:20,
  },
  input:{
    borderBottomColor: '#73DB1D',
    borderBottomWidth: 1,
    color:'white',
    width:width-100,
    textAlign:'center',
  },
  button:{
    paddingTop:20,
    alignItems:'center',
    justifyContent:'center',
  },
  minitext:{
    fontSize:9,
    paddingBottom:12,
  },
});
