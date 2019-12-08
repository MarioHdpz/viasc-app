import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  Switch,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Callout, Marker,
  AnimatedRegion, PROVIDER_DEFAULT } from 'react-native-maps';
import axios from 'axios';
import isEqual from 'lodash/isEqual';
import AsyncStorage from '@react-native-community/async-storage';
import {readResponseServer} from '../functions';

import ButtonBack from '../components/buttonBack'
import TitleForm from '../components/titleForm'
import InputText from '../components/inputText';
import ButtonForm from '../components/buttonForm'

export default class App extends Component<Props> {
  state = {
    user:null,
    respuestas : {},
    values:{},

    myPosition: null,
    dir:null,
  }

  componentDidMount = () => {
    this.getStorage()
  }

  goToInitialLocation = () => {

    console.log('goToInitialLocation');

    this.mounted = true;
    if (this.props.coordinate) {
      return;
    }

    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(granted => {
        if (granted && this.mounted) {
          this.watchLocation();
        }
      });
    } else {
      this.watchLocation();
    }


    /*const {lon, lat} = this.props;
    let {myPosition} = this.state;
    if (lon && lat ) {
      console.log('props existen', lat, lon);

      myPosition = {
        latitude:parseFloat(lat),
        longitude:parseFloat(lon),
        latitudeDelta:0.0005,
        longitudeDelta:0.0005,
      }

      this.mapRef.animateToRegion(myPosition);
      this.setState({myPosition})
    }
    else{

    }
    */
  }

  watchLocation = () => {
    console.log('watchLocation');
    this.watchID = Geolocation.watchPosition(
      position => {
        const myLastPosition = this.state.myPosition;
        const myPosition = position.coords;
        if (!isEqual(myPosition, myLastPosition)) {
          if (!myPosition.latitudeDelta) {
            myPosition["latitudeDelta"] = 0.0005;
            myPosition["longitudeDelta"] = 0.0005;
          }

          console.log('myPosition', myPosition);

          this.mapRef.animateToRegion(myPosition, 1500);

          this.setState({ myPosition },()=>{
            this.getAddres()
            Geolocation.clearWatch( this.watchID );
          });
        }
      },
      null,
      this.props.geolocationOptions
    );
  }

  onPoiClick = (e) => {
    const myPosition = e.nativeEvent.coordinate;

    this.setState({ myPosition });

    if (!myPosition.latitudeDelta) {
      myPosition["latitudeDelta"] = 0.005;
      myPosition["longitudeDelta"] = 0.005;
    }

    this.mapRef.animateToRegion(myPosition, 1500);

    this.setState({ myPosition },()=>{
      this.getAddres()
    });
  }

  getAddres = () => {
    let {myPosition} = this.state;
    //const myApiKey = 'AIzaSyDWJENtkoY3yWKJyfZCQ3QovxaMy0wgpeM';//NUEVA API KEY
    const myApiKey = 'AIzaSyBoOou-XcFaKlNGocLLuGT5BF8igrNtLEo'; //MI API
    const url  = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${myPosition.latitude},${myPosition.longitude}&key=${myApiKey}`;

    console.log(url);

    axios({
      url: url,
      method: 'get'
    })
    .then((response) => {
      let {myPosition, values, respuestas} = this.state
      const dir = response.data.results[0].address_components
      console.log('AXIOS DIR', dir);

      values[12] = dir[0].long_name.toString()
      values[13] = dir[2].long_name.toString()
      values[14] = dir[6].long_name.toString()
      values[15] = dir[3].long_name.toString()
      values[16] = dir[4].long_name.toString()
      values[17] = dir[3].long_name.toString()
      values[18] = myPosition.longitude.toString()
      values[19] = myPosition.latitude.toString()
      values[20] = myPosition.altitude.toString()

      respuestas[12] = dir[0].long_name.toString()
      respuestas[13] = dir[2].long_name.toString()
      respuestas[14] = dir[6].long_name.toString()
      respuestas[15] = dir[3].long_name.toString()
      respuestas[16] = dir[4].long_name.toString()
      respuestas[17] = dir[3].long_name.toString()
      respuestas[18] = myPosition.longitude.toString()
      respuestas[19] = myPosition.latitude.toString()
      respuestas[20] = myPosition.altitude.toString()

      this.setState({values, respuestas},()=>{ this.setStorage() });
    })
    .catch((error) => {
      Alert.alert(
        'Error',
        readResponseServer(error.response.status),
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
      console.log('MAP ERROR:',error);
    });
  }

  handleTextChange = (inputText, id, index) => {
    let {respuestas, values} =  this.state;

    respuestas[id] = inputText;
    values[id] = inputText;

    this.setState({respuestas, values})
  }

  setStorage = async () => {
    try {
      await AsyncStorage.setItem('respuestas', JSON.stringify(this.state.respuestas) )
    } catch (e) {
      console.log("error de almacenaje");
    }

    try {
      await AsyncStorage.setItem('values', JSON.stringify(this.state.values) )
    } catch (e) {
      console.log("error de almacenaje");
    }
  }

  getStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('respuestas');
      if(value !== null) {
        const respuestas = JSON.parse(value);
        console.log(respuestas);
        this.setState({respuestas})
      }
    } catch(e) {
      console.log("error storage", e);
    }

    try {
      const value = await AsyncStorage.getItem('values');
      if(value !== null) {
        const values = JSON.parse(value);
        console.log(values);
        this.setState({values})
      }
    } catch(e) {
      console.log("error storage", e);
    }
  }

  clear = () => {
    let {respuestas, values} =  this.state;

    let clr={};
    for (const r in respuestas) {
      clr[r] = null;
    }

    console.log(clr);
    this.setState({respuestas : clr, values:clr }, ()=>{
      this.setStorage();
    })
  }

  fCancelar = () => {
    Alert.alert(
      'Cancelar',
      '¿Desea cancelar?',
      [
        {
          text: 'No, continuar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Si, cancelar', onPress: () => {
          this.clear()
        }},
      ],
      {cancelable: false},
    );
  }

  fSend = () => {
    Alert.alert(
      'Enviar',
      '¿Desea enviar su información?',
      [
        {
          text: 'No, continuar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Si, enviar', onPress: () => {
          //Aquí -> Axios a server
          //Confirmo que todo esta bien
          this.readyFormulario();
          //despúes:
          this.clear();
        }},
      ],
      {cancelable: false},
    );
  }

  readyFormulario = async () => {
    try {
      const value = await AsyncStorage.getItem('readyFormulario');
      if(value !== null) {
        const rf = JSON.parse(value);
        rf['Ubicacion'] = true
      }
      else {
        const rf = {};
        rf['Ubicacion'] = true;
      }

      this.setReadyFormulario(rf);

    } catch(e) {
      console.log("error storage", e);
    }
  }
  setReadyFormulario= async (rf) => {
    try {
      await AsyncStorage.setItem('readyFormulario', JSON.stringify(rf) )
    } catch (e) {
      console.log("error de almacenaje");
    }
  }

  render = () => {
    const {values, myPosition} = this.state;
    return(
      <ImageBackground
        source={require('../assets/bg_app/bg_app.png')}
        style={styles.container}
      >

        <ButtonBack
          backForm={()=>{this.props.navigation.navigate('DatosGenerales', {user:this.state.user})}}
        />

        <TitleForm
          label="Ubicación"
        />

        <ScrollView style={styles.form}>

          <MapView
            ref={(ref) => { this.mapRef = ref }}
            provider={PROVIDER_DEFAULT}
            style={styles.map}
            followUserLocation={true}
            showsUserLocation={false}
            zoomEnabled={true}
            onMapReady={this.goToInitialLocation.bind(this)}
            onPress={this.onPoiClick}
          >
            {myPosition
              ? <Marker coordinate={myPosition} />
              : null
            }
          </MapView>

          <InputText
            id = {12}
            handleTextChange = {this.handleTextChange}
            pholder = "Número exterior"
            label = "Número exterior"
            value= {
              values[12]
            ? values[12]
            : null}
          />
          <InputText
            id = {13}
            handleTextChange = {this.handleTextChange}
            pholder = "Colonia"
            label = "Colonia"
            value= {
              values[13]
            ? values[13]
            : null}
          />
          <InputText
            id = {14}
            handleTextChange = {this.handleTextChange}
            pholder = "Código postal"
            label = "Código postal"
            value= {
              values[14]
            ? values[14]
            : null}
          />
          <InputText
            id = {15}
            handleTextChange = {this.handleTextChange}
            pholder = "Municipio"
            label = "Municipio"
            value= {
              values[15]
            ? values[15]
            : null}
          />
          <InputText
            id = {16}
            handleTextChange = {this.handleTextChange}
            pholder = "Estado"
            label = "Estado"
            value= {
              values[16]
            ? values[16]
            : null}
          />
          <InputText
            id = {17}
            handleTextChange = {this.handleTextChange}
            pholder = "Ciudad"
            label = "Ciudad"
            value= {
              values[17]
            ? values[17]
            : null}
          />
          <InputText
            id = {18}
            handleTextChange = {this.handleTextChange}
            pholder = "Longitud"
            label = "Longitud"
            value= {
              values[18]
            ? values[18]
            : null}
          />
          <InputText
            id = {19}
            handleTextChange = {this.handleTextChange}
            pholder = "Latitud"
            label = "Latitud"
            value= {
              values[19]
            ? values[19]
            : null}
          />
          <InputText
            id = {20}
            handleTextChange = {this.handleTextChange}
            pholder = "Altitud"
            label = "Altitud"
            value= {
              values[20]
            ? values[20]
            : null}
          />

          <View style={styles.fixToText}>
            <TouchableOpacity onPress={this.fCancelar}>
              <Image
                style={{
                  width:100,
                }}
                source={require('../assets/btNCANCELAR/btNCANCELAR.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.fSend}>
              <Image
                style={{
                  width:100,
                }}
                source={require('../assets/btn_guardar/btn_guardar.png')}
              />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </ImageBackground>
    )
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container:{
    flex:1,
    height:height+10,
    paddingTop:35,
  },
  form:{
    marginTop:40
  },
  fixToText: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:20,
    padding:15,
    paddingRight:30,
  },
  map: {
    width:width-50,
    height:width-150,
    marginLeft:15
  },
});
