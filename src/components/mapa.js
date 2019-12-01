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
    const {lon, lat} = this.props;
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
    }
  }

  watchLocation = () => {
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
    const myApiKey = 'AIzaSyDWJENtkoY3yWKJyfZCQ3QovxaMy0wgpeM';//NUEVA API KEY
    const url  = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${myPosition.latitude},${myPosition.longitude}&key=${myApiKey}`;

    axios({
      url: url,
      method: 'get'
    })
    .then((response) => {
      const {myPosition} = this.state
      const dir = response.data.results[0].address_components
      console.log('AXIOS DIR',this.props.index, dir);

      this.props.getDataGeo(dir[0].long_name.toString(), 12, this.props.index);
      this.props.getDataGeo(dir[2].long_name.toString(), 13, this.props.index);
      this.props.getDataGeo(dir[6].long_name.toString(), 14, this.props.index);
      this.props.getDataGeo(dir[3].long_name.toString(), 15, this.props.index);
      this.props.getDataGeo(dir[4].long_name.toString(), 16, this.props.index);
      this.props.getDataGeo(dir[3].long_name.toString(), 17, this.props.index);
      this.props.getDataGeo(myPosition.longitude.toString(), 18, this.props.index);
      this.props.getDataGeo(myPosition.latitude.toString(), 19, this.props.index);
      this.props.getDataGeo(myPosition.altitude.toString(), 20, this.props.index);


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

  render = () => {
    const {myPosition, dir} = this.state
    const {num, col, cp, mun, est,
      ciu, lon, lat, alt} = this.props

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


        <View>
          <InputText
            id = {12}
            handleTextChange = {this.props.getDataGeo}
            pholder = "Número exterior"
            label = "Número exterior"
            value = {num}
          />
          <InputText
            id = {13}
            handleTextChange = {this.props.getDataGeo}
            pholder = "Colonia"
            label = "Colonia"
            value = {col}
          />
          <InputText
            id = {14}
            handleTextChange = {this.props.getDataGeo}
            pholder = "Código postal"
            label = "Código postal"
            value = {cp}
          />
          <InputText
            id = {15}
            handleTextChange = {this.props.getDataGeo}
            pholder = "Municipio"
            label = "Municipio"
            value = {mun}
          />
          <InputText
            id = {16}
            handleTextChange = {this.props.getDataGeo}
            pholder = "Estado"
            label = "Estado"
            value = {est}
          />
          <InputText
            id = {17}
            handleTextChange = {this.props.getDataGeo}
            pholder = "Ciudad"
            label = "Ciudad"
            value = {ciu}
          />
          <InputText
            id = {18}
            handleTextChange = {this.props.getDataGeo}
            pholder = "Longitud"
            label = "Longitud"
            value = {lon}
          />
          <InputText
            id = {19}
            handleTextChange = {this.props.getDataGeo}
            pholder = "Latitud"
            label = "Latitud"
            value = {lat}
          />
          <InputText
            id = {20}
            handleTextChange = {this.props.getDataGeo}
            pholder = "Altitud"
            label = "Altitud"
            value = {alt}
          />
        </View>
      </View>
    )
  }
}

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
