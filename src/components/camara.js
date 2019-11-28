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
  ScrollView,
  Alert,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { sha256 } from 'react-native-sha256';
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

      sha256(data.base64).then(hash => {
        this.props.getPhoto(index, id, hash, data.base64 )
        this.setModalVisible(!this.state.modalVisible)
      });
    }
  };

  delpic = () =>{
    const {index, id}= this.props
    Alert.alert(
      'Eliminar fotografía',
      '¿Desea eliminar esta fotografía?',
      [
        {
          text: 'No, continuar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Si, eliminar', onPress: () => {
          this.props.delPhoto(index, id)
        }},
      ],
      {cancelable: false},
    );
  }

  render = () => {

    let cantFotos = 0;
    if (this.props.modulo) {
      if (this.props.modulo['b64']) {
        cantFotos = this.props.modulo['b64'].length;
      }
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.show}>
            {
              this.props.modulo && cantFotos < 6
              ? <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Image
                    style={{
                      width:40,
                      height:40,
                    }}
                    source={require('../assets/icono_camara/icono_camara.png')}
                  />
                </TouchableOpacity>
              :null
            }

            </View>

            {
              this.props.value
              ? <View style={styles.carrusel}>
                  <TouchableOpacity
                    style={styles.moveCarrusel}
                    onPress={()=>{this.props.moveCarrusel('izq')}}
                  >
                    <Image
                      style={{width:40, height:40}}
                      source={require('../assets/icono_flechaizq/icono_flechaizq.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onLongPress = {this.delpic}
                  >
                    <Image
                      style={styles.picture}
                      source={{uri:`data:image/png;base64,${this.props.value}`}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.moveCarrusel}
                    onPress={()=>{this.props.moveCarrusel('der')}}
                  >
                    <Image
                      style={{width:40, height:40}}
                      source={require('../assets/icono_flechader/icono_flechader.png')}
                    />
                  </TouchableOpacity>
                </View>
              : null
            }

          </View>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
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
  moveCarrusel:{
    height: 362 * ratio,
    alignItems:'center',
    justifyContent:'center',
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
  carrusel:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
});
