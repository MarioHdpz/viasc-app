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
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import ButtonBack from '../components/buttonBack'
import TitleForm from '../components/titleForm'
import InputText from '../components/inputText';
import ButtonForm from '../components/buttonForm'
import Select from '../components/select';

export default class App extends Component<Props> {
  state = {
    user:null,
    respuestas : {},
    values:{},
    index:0,
    i1:false,
    i2:false,
    i3:false,
    i4:false,
    i5:false,
  }

  componentDidMount = () => {
    this.getStorage()
  }

  buttonSelected = (index, id, data) => {
    let {respuestas, values} =  this.state;

    respuestas[id] = data[0];
    values[id] = data[1];

    this.setState({respuestas, values}, this.setStorage)
  }

  addMedida = () => {
    let {index} = this.state;
    index = index+1;

    this.setState({
      index,
      [`i${index}`]:true
    })
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
          //despúes:
          this.clear();
        }},
      ],
      {cancelable: false},
    );
  }

  render = () => {
    const {values, i1, i2, i3, i4, i5} = this.state;
    return(
      <ImageBackground
        source={require('../assets/bg_app/bg_app.png')}
        style={styles.container}
      >

        <ButtonBack
          backForm={()=>{this.props.navigation.navigate('CaracteristicasDeInmuebles', {user:this.state.user})}}
        />

        <TitleForm
          label="Medidas Colindancias"
        />

        <ScrollView style={styles.form}>
          <Select
            id = {79}
            options = {
              [
                [0,"Norte"],
                [1,"Sur"],
                [2,"Oriente"],
                [3,"Poniente"],
                [4,"Nororiente"],
                [5,"Norponiente"],
                [6,"Suroriente"],
                [7,"Surponiente"],
                [8,"Este"],
                [9,"Oeste"],
                [10,"Noreste"],
                [11,"Noroeste"],
                [12,"Sureste"],
                [13,"Suroeste"],
                [14,"Sureste"],
                [15,"Suroeste"],
                [16,"Arriba"],
                [17,"Abajo"]
              ]
            }
            value = {
              values[79]
              ? values[79]
              : "Orientación"
            }
            label = "Orientación"
            buttonSelected = { this.buttonSelected }
          />

          {
            i1
            ?<Select
              id = {201}
              options = {
                [
                  [0,"Norte"],
                  [1,"Sur"],
                  [2,"Oriente"],
                  [3,"Poniente"],
                  [4,"Nororiente"],
                  [5,"Norponiente"],
                  [6,"Suroriente"],
                  [7,"Surponiente"],
                  [8,"Este"],
                  [9,"Oeste"],
                  [10,"Noreste"],
                  [11,"Noroeste"],
                  [12,"Sureste"],
                  [13,"Suroeste"],
                  [14,"Sureste"],
                  [15,"Suroeste"],
                  [16,"Arriba"],
                  [17,"Abajo"]
                ]
              }
              value = {
                values[201]
                ? values[201]
                : "Orientación"
              }
              label = "Orientación"
              buttonSelected = { this.buttonSelected }
            />
            :null
          }

          {
            i2
            ?<Select
              id = {202}
              options = {
                [
                  [0,"Norte"],
                  [1,"Sur"],
                  [2,"Oriente"],
                  [3,"Poniente"],
                  [4,"Nororiente"],
                  [5,"Norponiente"],
                  [6,"Suroriente"],
                  [7,"Surponiente"],
                  [8,"Este"],
                  [9,"Oeste"],
                  [10,"Noreste"],
                  [11,"Noroeste"],
                  [12,"Sureste"],
                  [13,"Suroeste"],
                  [14,"Sureste"],
                  [15,"Suroeste"],
                  [16,"Arriba"],
                  [17,"Abajo"]
                ]
              }
              value = {
                values[202]
                ? values[202]
                : "Orientación"
              }
              label = "Orientación"
              buttonSelected = { this.buttonSelected }
            />
            :null
          }

          {
            i3
            ?<Select
              id = {203}
              options = {
                [
                  [0,"Norte"],
                  [1,"Sur"],
                  [2,"Oriente"],
                  [3,"Poniente"],
                  [4,"Nororiente"],
                  [5,"Norponiente"],
                  [6,"Suroriente"],
                  [7,"Surponiente"],
                  [8,"Este"],
                  [9,"Oeste"],
                  [10,"Noreste"],
                  [11,"Noroeste"],
                  [12,"Sureste"],
                  [13,"Suroeste"],
                  [14,"Sureste"],
                  [15,"Suroeste"],
                  [16,"Arriba"],
                  [17,"Abajo"]
                ]
              }
              value = {
                values[203]
                ? values[203]
                : "Orientación"
              }
              label = "Orientación"
              buttonSelected = { this.buttonSelected }
            />
            :null
          }

          {
            i4
            ?<Select
              id = {204}
              options = {
                [
                  [0,"Norte"],
                  [1,"Sur"],
                  [2,"Oriente"],
                  [3,"Poniente"],
                  [4,"Nororiente"],
                  [5,"Norponiente"],
                  [6,"Suroriente"],
                  [7,"Surponiente"],
                  [8,"Este"],
                  [9,"Oeste"],
                  [10,"Noreste"],
                  [11,"Noroeste"],
                  [12,"Sureste"],
                  [13,"Suroeste"],
                  [14,"Sureste"],
                  [15,"Suroeste"],
                  [16,"Arriba"],
                  [17,"Abajo"]
                ]
              }
              value = {
                values[204]
                ? values[204]
                : "Orientación"
              }
              label = "Orientación"
              buttonSelected = { this.buttonSelected }
            />
            :null
          }

          {
            i5
            ?<Select
              id = {205}
              options = {
                [
                  [0,"Norte"],
                  [1,"Sur"],
                  [2,"Oriente"],
                  [3,"Poniente"],
                  [4,"Nororiente"],
                  [5,"Norponiente"],
                  [6,"Suroriente"],
                  [7,"Surponiente"],
                  [8,"Este"],
                  [9,"Oeste"],
                  [10,"Noreste"],
                  [11,"Noroeste"],
                  [12,"Sureste"],
                  [13,"Suroeste"],
                  [14,"Sureste"],
                  [15,"Suroeste"],
                  [16,"Arriba"],
                  [17,"Abajo"]
                ]
              }
              value = {
                values[205]
                ? values[205]
                : "Orientación"
              }
              label = "Orientación"
              buttonSelected = { this.buttonSelected }
            />
            :null
          }

          <View style={{justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity
              onPress={this.addMedida}
            >
              <Image
                style={{
                  width:100,
                }}
                source={require('../assets/btn_agregar/btn_agregar.png')}
              />
            </TouchableOpacity>
          </View>

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
