import React, {Component}  from 'react';
import {
  StyleSheet, Text, View,
  PermissionsAndroid, Platform, Dimensions,
  BackHandler, Alert
} from 'react-native';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Callout, Marker,
  AnimatedRegion, PROVIDER_DEFAULT } from 'react-native-maps';
import axios from 'axios';
import {readResponseServer} from '../functions';
import InputText from './inputText';

type Props = {};
export default class Mapa extends Component<Props> {
  state = {
    myPosition: null,
    dir:null,
  }

  goToInitialLocation = () => {
    this.mounted = true;
    // If you supply a coordinate prop, we won't try to track location automatically
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
  }

  watchLocation = () => {
    console.log('Buscando ubicación...');
    this.watchID = Geolocation.watchPosition(
      position => {
        const myLastPosition = this.state.myPosition;
        const myPosition = position.coords;
        if (!isEqual(myPosition, myLastPosition)) {
          if (!myPosition.latitudeDelta) {
            myPosition["latitudeDelta"] = 0.0005;
            myPosition["longitudeDelta"] = 0.0005;
          }

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

    this.setState({
      myPosition,
      save:false
    });

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
    const myApiKey = 'AIzaSyDWJENtkoY3yWKJyfZCQ3QovxaMy0wgpeM';//NUEVA API KEY
    const lng = -73.961452;
    const lat = 40.714224;
    const url  = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${myPosition.latitude},${myPosition.longitude}&key=${myApiKey}`;

    axios({
      url: url,
      method: 'get'
    })
    .then((response) => {
      let {dir} = this.state
      dir = response.data.results[0].address_components
      this.setState({dir});
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

  handleTextChange = (inputText, id) => {
    console.log(inputText, id);
    //let { respuestas } = this.state;
    //respuestas[id] = inputText;
    //this.setState({respuestas}, this.setStorage);
  }

  render = () => {
    const {myPosition, dir} = this.state
    return(
      <View style={styles.container}>
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

        {dir
          ? <View>
          <InputText
            id = {1}
            handleTextChange = {this.handleTextChange}
            pholder = "Número"
            label = "Número"
            value = {dir[0].long_name.toString()}
          />
          <InputText
            id = {1}
            handleTextChange = {this.handleTextChange}
            pholder = "Calle"
            label = "Calle"
            value = {dir[1].long_name.toString()}
          />
          <InputText
            id = {1}
            handleTextChange = {this.handleTextChange}
            pholder = "Ciudad"
            label = "Ciudad"
            value = {dir[3].long_name.toString()}
          />
          <InputText
            id = {1}
            handleTextChange = {this.handleTextChange}
            pholder = "Estado"
            label = "Estado"
            value = {dir[4].long_name.toString()}
          />
          <InputText
            id = {1}
            handleTextChange = {this.handleTextChange}
            pholder = "Código postal"
            label = "Código postal"
            value = {dir[6].long_name.toString()}
          />
          <InputText
            id = {1}
            handleTextChange = {this.handleTextChange}
            pholder = "Longitud"
            label = "Longitud"
            value = {myPosition.longitude.toString()}
          />
          <InputText
            id = {1}
            handleTextChange = {this.handleTextChange}
            pholder = "Latitud"
            label = "Latitud"
            value = {myPosition.latitude.toString()}
          />
          <InputText
            id = {1}
            handleTextChange = {this.handleTextChange}
            pholder = "Altitud"
            label = "Altitud"
            value = {myPosition.altitude.toString()}
          />
          </View>
          :null
        }


      </View>
    )
  }
}
/*


*/

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  map: {
    width:width-50,
    height:width-150,
  },
});
