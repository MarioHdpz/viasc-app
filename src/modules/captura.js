import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import TitleForm from '../components/titleForm';
import Select from '../components/select';
import Camara from '../components/camara';

type Props = {};
export default class App extends Component<Props> {
  state = {
    respuestas:{},
    active:null,
  }

  buttonSelected = (index,id, data) => {
    let { respuestas } = this.state;
    respuestas[id] = {};
    respuestas[id]['label'] = data[1];

    console.log(respuestas);

    this.setState({respuestas, active:id});
  }

  getPhoto = (index, id, data) => {
    let { respuestas, active } = this.state;
    respuestas[active]['encoding'] = data;

    console.log('getPhoto',respuestas);
    this.setState({respuestas});
  }

  render = () => {
    const {respuestas, active} = this.state;

    return (
      <ImageBackground
        source={require('../assets/bg_app/bg_app.png')}
        style={styles.container}
      >
        <TitleForm
        label="Captura de fotos"
        />

        <View style={styles.area}>
            <Select
              index = {1}
              id = {1}
              options = {[[1,"Originación"],[2,"Recuperación por Reestructura"],[3,"Recuperación por Adjudicación"],[4,"Recuperación por Dación En Pago"],[5,"Otro"]]}
              value = {
                respuestas[active]
                ? respuestas[active]['label']
                : 'Módulo'
              }
              label = ""
              buttonSelected = { this.buttonSelected }
            />

          <Camara
            id={1}
            index={1}
            value={
              respuestas[active]
              ? respuestas[active]['encoding']
              : null
            }
            modulo = {respuestas[active]}
            getPhoto = {this.getPhoto}
          />

          <Select
            index = {''}
            id = {1}
            options = {[[1,"Originación"],[2,"Recuperación por Reestructura"],[3,"Recuperación por Adjudicación"],[4,"Recuperación por Dación En Pago"],[5,"Otro"]]}
            value = "Seleccionar"
            label = ""
            buttonSelected = { this.buttonSelected }
          />

          <View style={styles.buttonsBottom}>
            <TouchableOpacity>
              <Image
                style={{
                  width:100,
                }}
                source={require('../assets/btn_guardar/btn_guardar.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                style={{
                  width:100,
                }}
                source={require('../assets/btNCANCELAR/btNCANCELAR.png')}
              />
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container:{
    flex:1,
    height:height+10,
    paddingTop:35,
    justifyContent:'center',
    alignItems:'center',
  },
  area:{
    flex:1,
    width:width,
    paddingRight:10,
  },
  buttonsBottom:{
    paddingTop:10,
    height:100,
    flexDirection:'row',
    justifyContent:'space-around',
  },
});
