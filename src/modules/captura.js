import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';

import TitleForm from '../components/titleForm';
import Select from '../components/select';
import Camara from '../components/camara';

const selectEtiquetas = {
  0:[],
  1:[
    [1,"Casa"],
    [2,"Depto (Departamento)"],
    [3,"n (nulo)"]
  ],
  2:[
    [4,"banqueta"],
    [5,"colonia"],
    [6,"conjunto"],
    [7,"coto"],
    [8,"fracc (fraccionamiento)"],
    [9,"medidor"],
    [10,"n"],
    [11,"RedArea"]
  ],
  3:[
    [12,"esquina"],
    [13,"noesquina"]
  ],
  4:[
    [14,"CasaHab (Casa Habitación)"],
    [15,"Depto"],
    [16,"Terreno"]
  ],
  5:[
    [17,"Baño"],
    [18,"Cocina"],
    [19,"Comedor"],
    [20,"Escaleras"],
    [21,"FachPos (Fachada Posterior)"],
    [22,"Recamara"],
    [23,"Sala"],
    [24,"Vacio"],
  ],
  6:[
    [25,"uno"],
    [26,"dos"],
    [27,"tres"],
  ],
  7:[
    [28,"AUTOCONSTRUCCION"],
    [29,"DESARROLLADOR"],
    [30,"INGENIERO"],
  ],
  8:[
    [31,"nueva"],
    [32,"usada"],
  ],
  9:[
    [33,"andador"],
    [34,"AveBlvdCalz (Avenida o Boulevard o Calzada)"],
    [35,"calle"],
    [36,"carretera"],
  ],
}

type Props = {};
export default class App extends Component<Props> {
  state = {
    respuestas:{},
    active:null,
    user:null,

    picActive:0,
  }

  componentDidMount = () => {
    const user = this.props.navigation.getParam('user');
    this.setState({user},()=>{
      console.log('CAPTURADEFOTOS:',user);
    });
  }

  buttonSelected = (index,id, data) => {
    let { respuestas } = this.state;
    respuestas[id] = {};
    respuestas[id]['value'] = data[0];
    respuestas[id]['label'] = data[1];

    this.setState({respuestas, active:id});
  }

  getPhoto = (index, id, data, b64) => {
    let { respuestas, active } = this.state;

    if (!respuestas[active]['b64']) {
      console.log('creando arrays vacíos');
      respuestas[active]['b64'] = [];
      respuestas[active]['encoding'] = [];
    }
    else{
      console.log('active b64 existe', respuestas[active]);
    }

    respuestas[active]['b64'].push(b64);
    respuestas[active]['encoding'].push(data);
    this.setState({respuestas});
  }

  delPhoto = (index, id) => {
    let { respuestas } = this.state;
    respuestas[id] = null;
    this.setState({respuestas});
  }

  buttonSelectedEtiquetas = (index,id, data) => {
    let { respuestas } = this.state;
    respuestas[id]['etiquetas'] = data[1];

    console.log(respuestas);

    this.setState({respuestas});
  }

  saveConfirm = () => {
    if (this.state.active) {
      Alert.alert(
        'Envíar',
        '¿Desea enviar las fotos?',
        [
          {
            text: 'No, continuar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Si, Enviar', onPress: () => {
            this.send();
          }},
        ],
        {cancelable: false},
      );
    }
    else{
      Alert.alert(
        'Error',
        'Primero capture las fotografías correspondientes',
        [
          {},
          {text: 'Aceptar', onPress: () => {}},
        ],
        {cancelable: false},
      );
    }
  }

  hashCode = s => s.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0)

  send = () => {
    const { respuestas, user } = this.state;
    for(let item in respuestas){
      const p = respuestas[item];

      const pics = p.encoding

      console.log('PIC', pics);

      pics.map((pic, index) => {

        const data = {
        	"user": user.pk,
        	"encoding": pic,
        	"archive": null,
        	"process": null,
        	"items": null,
        	"label": p.label,
        	"appraisal": 1
        }

        const conf = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `jwt ${user.token}`,
          }
        }

        console.log(data);

        axios.post('http://18.219.244.117/pictures/', data, conf)
        .then((response) => {
          console.log('AXIOS OK -> ',response);
          //docs[id] = archive;
          //this.setState({docs}, this.setDogsStorage);
        })
        .catch((response) => {
          //docs[id] = false;
          //this.setState({docs}, this.setDogsStorage);
          console.log('error Axios -> ', response);
        });

      })
    }
  }

  clear = () => {
    Alert.alert(
      'Cancelar',
      '¿Desea eliminar todas las fotos?',
      [
        {
          text: 'No, continuar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Si, limpiar', onPress: () => {
          this.setState({
            respuestas:{},
            active:null,
          });
        }},
      ],
      {cancelable: false},
    );
  }

  moveCarrusel = (dir) => {
    let {respuestas, active, picActive} = this.state;

    if (dir === 'der' && picActive > 0) {
      picActive = picActive - 1;
    }
    if ( dir === 'izq' && (respuestas[active]['b64'].length - 1) > picActive ){
      picActive = picActive + 1;
    }

    this.setState({picActive});
  }

  render = () => {
    const {respuestas, active, picActive} = this.state;

    let arrayPic = null;
    if (respuestas[active]) {
      if (respuestas[active]['b64']) {
        arrayPic = respuestas[active]['b64'];
      }
    }


    let sin = null
    if (respuestas[active]) {
      sin = respuestas[active]['value']
    }

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
              options = {[
                [1,"CD (Construccion Dominante)"],
                [2,"Entorno"],
                [3,"Esquina"],
                [4,"Inmueble"],
                [5,"Interior"],
                [6,"Número_de_niveles"],
                [7,"Tipo_de_proyecto"],
                [8,"Tipo_de_vivienda"],
                [9,"Vialidad"]
              ]}
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
              arrayPic
              ? arrayPic[picActive]
              : null
            }
            modulo = {respuestas[active]}
            getPhoto = {this.getPhoto}
            delPhoto = {this.delPhoto}
            moveCarrusel = {this.moveCarrusel}
          />

          {
            respuestas[active]
            ?
            <Select
              index = {''}
              id = {1}
              options = {
                sin
                ? selectEtiquetas[sin]
                : []
              }
              value = {
                respuestas[active]['etiquetas']
                ? respuestas[active]['etiquetas']
                : 'Etiquetas'
              }
              label = ""
              buttonSelected = { this.buttonSelectedEtiquetas }
            />
            : null
          }

          <View style={styles.buttonsBottom}>
            <TouchableOpacity onPress={this.clear}>
              <Image
                style={{
                  width:100,
                }}
                source={require('../assets/btNCANCELAR/btNCANCELAR.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.saveConfirm}>
              <Image
                style={{
                  width:100,
                }}
                source={require('../assets/btn_guardar/btn_guardar.png')}
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
    height:height-100,
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
