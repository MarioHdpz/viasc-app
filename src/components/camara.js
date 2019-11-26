import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Select from './select'

type Props = {};
export default class Camara extends Component<Props> {
  state = {
    modalVisible: false,
    pic:null,
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

  render = () => {
    return (
      <View style={styles.container}>
      <ScrollView>

        <View>
          <View style={styles.show}>
          {
            this.props.modulo
            ? <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Image
                  style={{
                    width:50,
                    height:50,
                  }}
                  source={require('../assets/icono_camara/icono_camara.png')}
                />
              </TouchableOpacity>
            :null
          }

          </View>

          {
            this.props.value
            ? <Image style={styles.picture} source={{uri:`data:image/png;base64,${this.props.value}`}} />
            : null
          }

        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View>
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

            <View style={styles.buttonsModal}>
              <TouchableOpacity onPress={this.takePicture.bind(this)}>
                <Image
                  style={{
                    width:100,
                  }}
                  source={require('../assets/btn_guardar/btn_guardar.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
              <Image
                style={{
                  width:100,
                }}
                source={require('../assets/btNCANCELAR/btNCANCELAR.png')}
              />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </ScrollView>
      </View>
    );
  }
}


const {height, width} = Dimensions.get('window');
const ratio = width/541;
const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    height:height,
    width:width,
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
    borderRadius:20,
  },

  show:{
    alignItems: 'flex-end',
    marginBottom:10,
  },

  buttonsModal:{
    position:'absolute',
    bottom:50,
    width:width,
    flexDirection:'row',
    justifyContent:'space-around',
  },
});
