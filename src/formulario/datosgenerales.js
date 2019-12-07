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
  Image
} from 'react-native';

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
    const user = this.props.navigation.getParam('user');
    this.setState({user});
  }

  buttonSelected = (index, id, data) => {
    let {respuestas, values} =  this.state;

    respuestas[id] = data[0];
    values[id] = data[1];

    this.setState({respuestas, values})
  }

  handleTextChange = (inputText, id, index) => {
    let {respuestas, values} =  this.state;

    respuestas[id] = inputText;
    values[id] = inputText;

    this.setState({respuestas, values})
  }
  dateChange = (index, id, data) => {
    let {respuestas, values} =  this.state;

    respuestas[id] = data;
    values[id] = data;

    this.setState({respuestas, values})
  }

  elementos = (respuesta) => {
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
            values[31]
            ? this.cConstruccion(respuestas[31])
            : null
          }
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
    const {values} = this.state
    switch (respuesta) {
      //Mínima
      case 1:
        return(
          <View>
            <Select
              id = {79}
              options = {
                [
                  [0,"Piso de cemento"],
                  [1,"Piso de loseta vinílica"],
                  [2,"Piso de mosaico"],
                  [3,"Piso de loseta cerámica"],
                ]
              }
              value = {
                values[79]
                ? values[79]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {82}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Pasta texturizada"],
                  [3,"Rústico"],
                ]
              }
              value = {
                values[82]
                ? values[82]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break;
      //Económica
      case 2:
        return(
          <View>
            <Select
              id = {79}
              options = {
                [
                  [0,"Piso de cemento"],
                  [1,"Piso de loseta vinílica"],
                  [2,"Piso de mosaico"],
                  [3,"Piso de loseta cerámica"],
                ]
              }
              value = {
                values[79]
                ? values[79]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {82}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Pasta texturizada"],
                  [3,"Rústico"],
                ]
              }
              value = {
                values[82]
                ? values[82]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break;
      //Interés Social
      case 3:
        return(
          <View>
            <Select
              id = {79}
              options = {
                [
                  [0,"Piso de cemento"],
                  [1,"Piso de loseta vinílica"],
                  [2,"Piso de mosaico"],
                  [3,"Piso de loseta cerámica"],
                ]
              }
              value = {
                values[79]
                ? values[79]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {82}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Pasta texturizada"],
                  [3,"Rústico"],
                ]
              }
              value = {
                values[82]
                ? values[82]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
      break;
      //Media
      case 4:
        return(
          <View>
            <Select
              id = {80}
              options = {
                [
                  [0,"Piso de cemento"],
                  [1,"Piso de mosaico"],
                  [2,"Piso de loseta cerámica"],
                  [3,"Piso con laminado de madera"],
                  [4,"Piso con alfombra"],
                ]
              }
              value = {
                values[80]
                ? values[80]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {83}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Terminado con yeso"],
                  [3,"Pasta texturizada"],
                ]
              }
              value = {
                values[83]
                ? values[83]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break;
      //Semilujo
      case 5:
        return(
          <View>
            <Select
              id = {80}
              options = {
                [
                  [0,"Piso de cemento"],
                  [1,"Piso de mosaico"],
                  [2,"Piso de loseta cerámica"],
                  [3,"Piso con laminado de madera"],
                  [4,"Piso con alfombra"],
                ]
              }
              value = {
                values[80]
                ? values[80]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {83}
              options = {
                [
                  [0,"Liso"],
                  [1,"Ladrillo aparente"],
                  [2,"Terminado con yeso"],
                  [3,"Pasta texturizada"],
                ]
              }
              value = {
                values[83]
                ? values[83]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break;
      //Lujo
      case 6:
        return(
          <View>
            <Select
              id = {81}
              options = {
                [
                  [0,"Piso de loseta cerámica"],
                  [1,"Piso con laminado de madera"],
                  [2,"Piso con alfombra"],
                  [3,"Piso con duela de madera"],
                  [4,"Piso de mármol"],
                  [5,"Otro"],
                ]
              }
              value = {
                values[79]
                ? values[79]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {84}
              options = {
                [
                  [0,"Rústico"],
                  [1,"Liso"],
                  [2,"Terminado con yeso"],
                  [3,"Recubrimientos especiales"],
                ]
              }
              value = {
                values[84]
                ? values[84]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break;
      //Residencial
      case 7:
        return(
          <View>
            <Select
              id = {81}
              options = {
                [
                  [0,"Piso de loseta cerámica"],
                  [1,"Piso con laminado de madera"],
                  [2,"Piso con alfombra"],
                  [3,"Piso con duela de madera"],
                  [4,"Piso de mármol"],
                  [5,"Otro"],
                ]
              }
              value = {
                values[79]
                ? values[79]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {84}
              options = {
                [
                  [0,"Rústico"],
                  [1,"Liso"],
                  [2,"Terminado con yeso"],
                  [3,"Recubrimientos especiales"],
                ]
              }
              value = {
                values[84]
                ? values[84]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break;
      //Residencial plus
      case 8:
        return(
          <View>
            <Select
              id = {81}
              options = {
                [
                  [0,"Piso de loseta cerámica"],
                  [1,"Piso con laminado de madera"],
                  [2,"Piso con alfombra"],
                  [3,"Piso con duela de madera"],
                  [4,"Piso de mármol"],
                  [5,"Otro"],
                ]
              }
              value = {
                values[79]
                ? values[79]
                : "Pisos"
              }
              label = "Pisos"
              buttonSelected = { this.buttonSelected }
            />
            <Select
              id = {84}
              options = {
                [
                  [0,"Rústico"],
                  [1,"Liso"],
                  [2,"Terminado con yeso"],
                  [3,"Recubrimientos especiales"],
                ]
              }
              value = {
                values[84]
                ? values[84]
                : "Plafones"
              }
              label = "Plafones"
              buttonSelected = { this.buttonSelected }
            />
          </View>
        )
        break;
      default: null
    }
  }

  render = () => {
    const {values, respuestas} = this.state;
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
          values[22]
          ? this.elementos(respuestas[22])
          : null
        }

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
});
