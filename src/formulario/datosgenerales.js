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
  BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions } from 'react-navigation';

import ButtonBack from '../components/buttonBack'
import TitleForm from '../components/titleForm'
import ButtonForm from '../components/buttonForm'
import Select from '../components/select';
import InputText from '../components/inputText';
import InputNumber from '../components/inputNumber';
import Calendar from '../components/calendar';

export default class App extends Component<Props> {
  state = {
    user:null,
    respuestas : {},
    values:{},
  }

  componentDidMount = () => {
    const {navigation} = this.props;

    this.backHandler = BackHandler.addEventListener('hardwareBackPress',()=>{ this.props.navigation.navigate('FInicio') });
    this.getStorage()
  }

  componentWillUnmount = () => {
    this.backHandler.remove()
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft:(
        <TouchableOpacity
          onPress={()=>{navigation.navigate('InitAvaluo')}}
        >
          <Image
            style={{
              width:30,
              height:30
            }}
            source={require('../assets/icono_flechaizq/icono_flechaizq.png')}
          />
        </TouchableOpacity>
      ),
    }
  }

  buttonSelected = (index, id, data) => {
    let {respuestas, values} =  this.state;

    respuestas[id] = data[0];
    values[id] = data[1];

    //console.log('buttonSelected id:', id, 'data0',data[0],'data1', data[1]);
    console.log('buttonSelected', respuestas[id], 'data', data, 'respuestas', respuestas, 'values', values);

    this.setState({respuestas, values},this.setStorage)
  }

  handleTextChange = (inputText, id, index) => {
    let {respuestas, values} =  this.state;

    respuestas[id] = inputText;
    values[id] = inputText;

    this.setState({respuestas, values},this.setStorage)
  }

  dateChange = (index, id, data) => {
    let {respuestas, values} =  this.state;

    respuestas[id] = data;
    values[id] = data;

    this.setState({respuestas, values}, this.setStorage)
  }

  elementos = (respuesta) => {
    console.log('elementos', respuesta );
    const {values, respuestas} = this.state
    switch (respuesta) {
      case 1:
        return  <InputText
                  id = {24}
                  handleTextChange = {this.handleTextChange}
                  pholder = "Superficie de Construcción"
                  label = "Superficie de Construcción"
                  value= {
                    values[24]
                  ? values[24]
                  : null}
                />
        break;
      case 2:
        return  <View>
          <Select
            id = {26}
            options = {
              [
                [0,"0"],
                [1,"1"],
                [2,"2"],
                [3,"3"],
                [4,"4"],
                [5,"5"]
              ]
            }
            value = {
              values[26]
              ? values[26]
              : "Número de Estacionamiento"
            }
            label = "Número de Estacionamiento"
            buttonSelected = { this.buttonSelected }
          />
          <Select
            id = {27}
            options = {
              [
                [1,"1"],
                [2,"2"],
                [3,"3"]
              ]
            }
            value = {
              values[27]
              ? values[27]
              : "Tipo de Construcción"
            }
            label = "Tipo de Construcción"
            buttonSelected = { this.buttonSelected }
          />
          <InputText
            id = {160}
            handleTextChange = {this.handleTextChange}
            pholder = "Superficie"
            label = "Superficie"
            value= {
              values[160]
            ? values[160]
            : null}
          />
          <Calendar
            id = {28}
            label = "Año de Terminación"
            dateChange = {this.dateChange}
            selectedStartDate = {values[28]}
          />
          <Select
            id = {29}
            options = {
              [
                [0,"Terminada al 100%"],
                [1,"Sin terminar"],
              ]
            }
            value = {
              values[29]
              ? values[29]
              : "Grado de Terminación"
            }
            label = "Grado de Terminación"
            buttonSelected = { this.buttonSelected }
          />
          {
            values[29]
            ? this.eGTerminacion(values[29])
            : null
          }
          <Select
            id = {31}
            options = {
              [
                [0,"No aplica"],
                [1,"Mínima"],
                [2,"Económica"],
                [3,"Interés Social"],
                [4,"Media"],
                [5,"Semilujo"],
                [6,"Lujo"],
                [7,"Residencial"],
                [8,"Residencial Plus"],
                [9,"Residencial Plus +"],
                [10,"Única"],
              ]
            }
            value = {
              values[31]
              ? values[31]
              : "Clase de Construcción"
            }
            label = "Clase de Construcción"
            buttonSelected = { this.buttonSelected }
          />
          {
            respuestas[31] && respuestas[31]>0
            ? this.cConstruccion(respuestas[31])
            : null
          }
          <Select
            id = {32}
            options = {
              [
                ['Nueva','Nueva'],
                ['Usada','Usada']
              ]
            }
            value = {
              values[32]
              ? values[32]
              : "Estado de la Casa"
            }
            label = "Estado de la Casa"
            buttonSelected = { this.buttonSelected }
          />
        </View>
        break;
      case 3:
        return  <View>
          <Select
            id = {35}
            options = {
              [
                [0,"0"],
                [1,"1"],
                [2,"2"],
                [3,"3"],
                [4,"4"],
                [5,"5"]
              ]
            }
            value = {
              values[35]
              ? values[35]
              : "Recámaras"
            }
            label = "Recámaras"
            buttonSelected = { this.buttonSelected }
          />

            <InputNumber
              id = {36}
              handleTextChange = {this.handleTextChange}
              pholder = "Superficie Vendible"
              label = "Superficie Vendible"
              value= {
                values[36]
              ? values[36]
              : null}
            />

            <Select
              id = {37}
              options = {
                [
                  [0,"Nueva"],
                  [1,"Usada"],
                ]
              }
              value = {
                values[37]
                ? values[37]
                : "Estatus de la casa"
              }
              label = "Estatus de la casa"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        break;
      case 4:
        return  <View>
          <Select
            id = {40}
            options = {
              [
                [0,"0"],
                [1,"1"],
                [2,"2"],
                [3,"3"],
                [4,"4"],
                [5,"5"]
              ]
            }
            value = {
              values[40]
              ? values[40]
              : "Closets"
            }
            label = "Closets"
            buttonSelected = { this.buttonSelected }
          />
          <Select
            id = {41}
            options = {
              [
                [0,"0"],
                [1,"1"],
                [2,"2"],
                [3,"3"],
                [4,"4"],
                [5,"5"]
              ]
            }
            value = {
              values[41]
              ? values[41]
              : "Cocina integral"
            }
            label = "Cocina integral"
            buttonSelected = { this.buttonSelected }
          />
          {
            respuestas[41]>0
            ? <Select
              id = {42}
              options = {
                [
                  [1,"Lujo"],
                  [2,"Muy buena"],
                  [3,"Buena"],
                ]
              }
              value = {
                values[42]
                ? values[42]
                : "Cocina integral Calidad"
              }
              label = "Cocina integral Calidad"
              buttonSelected = { this.buttonSelected }
            />
            : null
          }
          <Select
            id = {43}
            options = {
              [
                [1,"1"],
                [2,"2"],
                [3,"3"],
              ]
            }
            value = {
              values[43]
              ? values[43]
              : "Número de niveles del departamento"
            }
            label = "Número de niveles del departamento"
            buttonSelected = { this.buttonSelected }
          />
          <Select
            id = {45}
            options = {
              [
                [0,"0"],
                [1,"1"],
                [2,"2"],
                [3,"3"],
                [4,"4"],
                [5,"5"],
              ]
            }
            value = {
              values[45]
              ? values[45]
              : "Escaleras"
            }
            label = "Escaleras"
            buttonSelected = { this.buttonSelected }
          />
          <Select
            id = {47}
            options = {
              [
                [0,"0"],
                [1,"1"],
                [2,"2"],
                [3,"3"],
                [4,"4"],
                [5,"5"],
              ]
            }
            value = {
              values[47]
              ? values[47]
              : "Alberca"
            }
            label = "Alberca"
            buttonSelected = { this.buttonSelected }
          />
          {
            respuestas[47] > 0
            ? <InputNumber
                id = {48}
                handleTextChange = {this.handleTextChange}
                pholder = "Alberca m2"
                label = "Alberca m2"
                value= {
                  values[48]
                ? values[48]
                : null}
              />
            : null
          }
          {
            respuestas[47] > 1
            ? <InputNumber
                id = {161}
                handleTextChange = {this.handleTextChange}
                pholder = "Alberca m2"
                label = "Alberca m2"
                value= {
                  values[161]
                ? values[161]
                : null}
              />
            : null
          }
          {
            respuestas[47] > 2
            ? <InputNumber
                id = {162}
                handleTextChange = {this.handleTextChange}
                pholder = "Alberca m2"
                label = "Alberca m2"
                value= {
                  values[162]
                ? values[162]
                : null}
              />
            : null
          }
          {
            respuestas[47] > 3
            ? <InputNumber
                id = {163}
                handleTextChange = {this.handleTextChange}
                pholder = "Alberca m2"
                label = "Alberca m2"
                value= {
                  values[163]
                ? values[163]
                : null}
              />
            : null
          }
          {
            respuestas[47] > 4
            ? <InputNumber
                id = {164}
                handleTextChange = {this.handleTextChange}
                pholder = "Alberca m2"
                label = "Alberca m2"
                value= {
                  values[164]
                ? values[164]
                : null}
              />
            : null
          }
          <Select
            id = {49}
            options = {
              [
                [0,"0"],
                [1,"1"],
                [2,"2"],
                [3,"3"],
                [4,"4"],
                [5,"5"],
              ]
            }
            value = {
              values[49]
              ? values[49]
              : "Canchas deportivas"
            }
            label = "Canchas deportivas"
            buttonSelected = { this.buttonSelected }
          />
          {
            respuestas[49] > 0
            ? <InputText
                id = {50}
                handleTextChange = {this.handleTextChange}
                pholder = "Nombre cancha 1"
                label = "Nombre cancha 1"
                value= {
                  values[50]
                ? values[50]
                : null}
              />
            : null
          }
          {
            respuestas[49] > 1
            ? <InputText
                id = {51}
                handleTextChange = {this.handleTextChange}
                pholder = "Nombre cancha 2"
                label = "Nombre cancha 2"
                value= {
                  values[51]
                ? values[51]
                : null}
              />
            : null
          }
          {
            respuestas[49] > 2
            ? <InputText
                id = {52}
                handleTextChange = {this.handleTextChange}
                pholder = "Nombre cancha 3"
                label = "Nombre cancha 3"
                value= {
                  values[52]
                ? values[52]
                : null}
              />
            : null
          }
          {
            respuestas[49] > 3
            ? <InputText
                id = {53}
                handleTextChange = {this.handleTextChange}
                pholder = "Nombre cancha 4"
                label = "Nombre cancha 4"
                value= {
                  values[53]
                ? values[53]
                : null}
              />
            : null
          }
          {
            respuestas[49] > 4
            ? <InputText
                id = {54}
                handleTextChange = {this.handleTextChange}
                pholder = "Nombre cancha 5"
                label = "Nombre cancha 5"
                value= {
                  values[54]
                ? values[54]
                : null}
              />
            : null
          }
          <Select
            id = {31}
            options = {
              [
                [0,"No aplica"],
                [1,"Mínima"],
                [2,"Económica"],
                [3,"Interés Social"],
                [4,"Media"],
                [5,"Semilujo"],
                [6,"Lujo"],
                [7,"Residencial"],
                [8,"Residencial Plus"],
                [9,"Residencial Plus +"],
                [10,"Única"],
                [11,"Nueva"],
                [12,"Usada"],
              ]
            }
            value = {
              values[31]
              ? values[31]
              : "Clase de Construcción"
            }
            label = "Clase de Construcción"
            buttonSelected = { this.buttonSelected }
          />
          {
            respuestas[31] && respuestas[31]>0
            ? this.cConstruccion(respuestas[31])
            : null
          }
          <Select
            id = {57}
            options = {
              [
                [0,"0"],
                [1,"1"],
                [2,"2"],
                [3,"3"],
                [4,"4"],
                [5,"5"],
              ]
            }
            value = {
              values[57]
              ? values[57]
              : "Sala"
            }
            label = "Sala"
            buttonSelected = { this.buttonSelected }
          />
          <Select
            id = {58}
            options = {
              [
                ['Si',"Si"],
                ['No',"No"],
              ]
            }
            value = {
              values[58]
              ? values[58]
              : "Cajón de estacionamiento"
            }
            label = "Cajón de estacionamiento"
            buttonSelected = { this.buttonSelected }
          />
          <Select
            id = {59}
            options = {
              [
                ['Si',"Si"],
                ['No',"No"],
              ]
            }
            value = {
              values[59]
              ? values[59]
              : "Bodega"
            }
            label = "Bodega"
            buttonSelected = { this.buttonSelected }
          />
          {
            values[59] === 'Si'
            ? <InputNumber
                id = {60}
                handleTextChange = {this.handleTextChange}
                pholder = "Bodega m2"
                label = "Bodega m2"
                value= {
                  values[60]
                ? values[60]
                : null}
              />
            : null
          }
          <Select
            id = {61}
            options = {
              [
                ['Nuevo',"Nuevo"],
                ['Usado',"Usado"],
              ]
            }
            value = {
              values[61]
              ? values[61]
              : "Estado del departamento"
            }
            label = "Estado del departamento"
            buttonSelected = { this.buttonSelected }
          />
        </View>
        break;
      default: null

    }
  }

  eGTerminacion = (respuesta) => {
    const {values} = this.state
    if (respuesta === "Sin terminar") {
      return(
        <Select
          id = {37}
          options = {
            [
              [0,"90%"],
              [1,"80%"],
              [2,"70%"],
              [3,"60%"],
              [4,"50%"],
              [5,"40%"],
              [6,"30%"],
              [7,"20%"],
              [8,"10%"],
            ]
          }
          value = {
            values[37]
            ? values[37]
            : "Avance"
          }
          label = "Avance"
          buttonSelected = { this.buttonSelected }
        />
      )
    }
    else{
      return null
    }
  }

  cConstruccion = (respuesta) => {
    let {values, respuestas} = this.state
    return(
      <View>
        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Recámaras"
          disabled = {true}
          onClickButton = {()=>{ this.props.navigation.navigate('Recamaras') }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Estancia Comedor"
          disabled = {true}
          onClickButton = {()=>{ this.props.navigation.navigate('EstanciaComedor') }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Baños"
          disabled = {true}
          onClickButton = {()=>{ this.props.navigation.navigate('Banios') }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Escaleras"
          disabled = {true}
          onClickButton = {()=>{ this.props.navigation.navigate('Escaleras') }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Cocina"
          disabled = {true}
          onClickButton = {()=>{ this.props.navigation.navigate('Cocina') }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Patio Servicio"
          disabled = {true}
          onClickButton = {()=>{ this.props.navigation.navigate('PatioServicio') }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Estacionamiento"
          disabled = {true}
          onClickButton = {()=>{ this.props.navigation.navigate('Estacionamiento') }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Fachada"
          disabled = {true}
          onClickButton = {()=>{ this.props.navigation.navigate('Fachada') }}
        />
      </View>
    )
  }

  readyFormulario = async () => {
    try {
      const value = await AsyncStorage.getItem('readyFormulario');
      let rf = null;
      if (value) {
        rf = JSON.parse(value);
        rf['DatosGenerales'] = true
      }
      else{
        rf = {};
        rf['DatosGenerales'] = true;
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

    let clv={};
    for (const r in values) {
      clv[r] = null;
    }

    this.setState({respuestas : clr, values:clv }, ()=>{
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

  render = () => {
    const {values, respuestas} = this.state;

    console.log('values[22]',respuestas[22]);

    return(
      <ImageBackground
        source={require('../assets/bg_app/bg_app.png')}
        style={styles.container}
      >

      <ButtonBack
        backForm={()=>{this.props.navigation.navigate('FInicio', {user:this.state.user})}}
      />

      <TitleForm
        label="Datos generales"
      />

      <ScrollView style={styles.form}>
        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Datos del solicitante"
          disabled = {true}
          onClickButton = {()=>{
              this.props.navigation.navigate('DatosDelSolicitante', {user:this.state.user})
            }}
        />

        <ButtonForm
          icon = {require('../assets/icono_flechader/icono_flechader.png')}
          text = "Ubicación"
          disabled = {true}
          onClickButton = {()=>{
            this.props.navigation.navigate('Ubicacion', {user:this.state.user})
          }}
        />

        <Select
          id = {22}
          options = {
            [
              [1,"Terreno"],
              [2,"Casa habitación"],
              [3,"Casa en condominio"],
              [4,"Departamento en condominio"]
            ]
          }
          value = {
            values[22]
            ? values[22]
            : "Tipo de inmueble"
          }
          label = "Tipo de inmueble"
          buttonSelected = { this.buttonSelected }
        />

        {
          respuestas[22]
          ? this.elementos( respuestas[22] )
          :null
        }

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
    flex:1,
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
});
