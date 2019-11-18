import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Image,
  Dimensions
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Select from './select'

type Props = {};
export default class Camara extends Component<Props> {
  state = {
    modalVisible: false,
    pic:null,
    val1:'Seleccionar',
    val2:'Seleccionar',
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  takePicture = async() => {
    const {index, id}= this.props

    if (this.camera) {
      const options = { quality: 0.5, base64: true, orientation:'portrait', forceUpOrientation: true };
      const data = await this.camera.takePictureAsync(options);

      this.props.getPhoto(index, id, data.base64 )
      this.setModalVisible(!this.state.modalVisible)
    }
  };

  val1 = (val1) =>{
    this.setState({val1});
  }

  val2 = (val2) =>{
    this.setState({val2});
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Select
          options = {[[0,'Seleccionar'],[1,'Recamara'], [2,'Baño'], [3,'Estacionamiento']]}
          value = {this.state.val1}
          label = 'Seleccionar'
          buttonSelected = { this.val1 }
        />

        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          {
            this.props.value
            ?<Image style={styles.picture} source={{uri:`data:image/png;base64,${this.props.value}`}} />
            :<Image style={styles.picture} source={require('../assets/bginit/bginit.png')} />
          }
        </TouchableOpacity>


        <Select
        options = {[[0,'Seleccionar'],[1,'Piso de mosaico'], [2,'Muro de ladrillo'], [3,'Plafones']]}
        value = {this.state.val2}
        label = 'Etiquetas'
        buttonSelected = { this.val2 }
        />



        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modal}>

            <TouchableOpacity
              style={styles.capture}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Text>
                ❌
              </Text>
            </TouchableOpacity>

            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
              }}
            />
              <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>

          </View>
        </Modal>
      </View>
    );
  }
}


const {height, width} = Dimensions.get('window');
const ratio = width/541;
const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:20,
  },
  preview: {
    height:height-200,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    height:40,
  },
  picture:{
    width: width - 80,
    height: 362 * ratio,
    borderWidth:1,
    borderColor:'white',
  },
});
