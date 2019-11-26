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

  componentDidMount = () => {
    //const fghApiKey = 'AIzaSyBRlf1PoCQPMF6F8sNiEOzUiuuwG0JXH4A'
    const myApiKey = 'AIzaSyDWJENtkoY3yWKJyfZCQ3QovxaMy0wgpeM';//NUEVA API KEY
    const lng = -73.961452;
    const lat = 40.714224;
    const url  = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${myApiKey}`;

    axios({
      url: url,
      method: 'get'
    })
    .then((response) => {
      console.log('MAP OK:',response);
    })
    .catch((response) => {
      console.log('MAP ERROR:',response);
    });

  }

  validate = (text) => {
    this.setState({email:text})
  }

  login = async () => {
    const {email,pass} = this.state;

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
        const user = {
          token:response.data.token,
          pk:response.data.user.pk,
          email:email,
          pass:pass
        }

        this.props.navigation.navigate('Init', {user:user});
      })
      .catch((response) => {
        console.log(response);
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
