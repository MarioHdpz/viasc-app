import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  Switch
} from 'react-native';
import _ from 'lodash';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import ToggleSwitch from 'toggle-switch-react-native'

import db from '../containers/formulario.json';

import InputText from '../components/inputText';
import InputNumber from '../components/inputNumber';
import ButtonLarge from '../components/buttonLarge';
import Select from '../components/select';
import ButtonForm from '../components/buttonForm'
import ButtonBack from '../components/buttonBack'
import File from '../components/file'
import TitleForm from '../components/titleForm'
import Calendar from '../components/calendar';
import Mapa from '../components/mapa';

type Props = {};
export default class App extends Component<Props> {
  state = {
    beforeIndex: [],
    formIndex : false,
    optionActive : 0,
    group : [],
    respuestas : {},
    seccion:{},
    title:{},



    myComment:'',
    number:'',
    selectedStartDate:null,
    multiselect:[],
    value:'Seleccionar',
    mulSelected:'MultiSelect',

    switchValue:false,
  }

  componentDidMount = () => {
    this.getStorage();
  }

  dynamicRender = () => {
    let {formIndex, group, seccion} = this.state;

    //result se genera un array de componentes fitrados.
    const result = _.filter(db, {parent:formIndex});

    //¿Cuántos componentes tiene esta sección?
    //Guardar la sección y la cantidad de respuestasa recibir
    seccion[formIndex] = result.length

    //Limpio los componentes
    group = [];

    //Recorro el mapa de componentes filtrados
    result.map((data,index) => {
      //console.log(data, index);
      //Obtengo el nuevo componente
      const component = this.getComponent(data, index);
      group.push(component);
    });

    //group['select', 'button', 'calendar', 'text',...]

    //Envío a renderizar el grupo
    this.setState({group});
  }

  backForm = () => {
    let { beforeIndex, formIndex } = this.state

    //El index anterior se convierte en el actual
    formIndex = beforeIndex[beforeIndex.length-1];

    //El último registrado se elimina del array.
    beforeIndex.pop();

    this.setState({formIndex, beforeIndex}, this.dynamicRender);
  }

  setStorage = async () => {
    console.log('set storage');
    try {
      await AsyncStorage.setItem('respuestas', JSON.stringify(this.state.respuestas) )
    } catch (e) {
      console.log("error de almacenaje");
    }
  }

  getStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('respuestas');
      console.log('value', value);
      if(value !== null) {
        const respuestas = JSON.parse(value);
        this.setState({respuestas}, this.dynamicRender )
      }
      else{
        this.dynamicRender()
      }
    } catch(e) {
      console.log("error storage", e);
    }
  }

  getComponent = (d, i, value) => {
    const { optionActive, respuestas } = this.state;

    switch (d.inputType) {
      case "button":
        //activa o desactiva los botones
        //{ i === optionActive ? true : false }
        return (
          <ButtonForm
            key = {i}
            id = {d.id}
            disabled = {true}
            icon = {require('../assets/icono_flechader/icono_flechader.png')}
            text = {d.label}
            onClickButton = {this.onClickButton}
            status = {null}
          />
        );
      break;

      case "select":
        if ( respuestas[d.id] ) {//obtengo la respuesta guardada en el storage
          value = d.options[ (respuestas[d.id]-1) ][1];
        }

        if (!value) { value = d.label; }
        return (
          <Select
            key = {i}
            index = {i}
            id = {d.id}
            options = {d.options}
            value = {value}
            label = {d.label}
            buttonSelected = { this.buttonSelected }
          />
        )
      break;

      case "calendar":
        if ( respuestas[d.id] ) {//obtengo la respuesta guardada en el storage
          value = respuestas[d.id];
        }
        if (!value) { value = null; }
        return (
          <Calendar
            key = {i}
            index = {i}
            id = {d.id}
            label = {d.label}
            dateChange = {this.dateChange}
            selectedStartDate = {value}
          />
        );
      break;

      case "photo":
        if ( respuestas[d.id] ) { value = d.options[ respuestas[d.id] ]; }
        return (
          <Camara
            key = {i}
            index = {i}
            id = {d.id}
            getPhoto = {this.getPhoto}
            value = {value}
          />
        );
      break;

      case "text":
        if ( respuestas[d.id] ) {//obtengo la respuesta guardada en el storage
          value = respuestas[d.id];
        }
        if (!value) { value = null }
        return (
          <InputText
            key = {i}
            id = {d.id}
            handleTextChange = {this.handleTextChange}
            pholder = {d.label}
            label = {d.label}
            value = {value}
          />
        );
      break;

      case "number":
        if ( respuestas[d.id] ) {//obtengo la respuesta guardada en el storage
          value = respuestas[d.id];
        }
        if (!value) { value = null }
        return (
          <InputNumber
            key = {i}
            id = {d.id}
            handleTextChange = {this.handleTextChange}
            pholder = {d.label}
            label = {d.label}
            value = {value}
          />
        );
      break;

      case "switch":
        if ( respuestas[d.id] ) {//obtengo la respuesta guardada en el storage
          value = respuestas[d.id];
        }
        if (value===null || value == undefined ) { value = true }
        return (
          <ToggleSwitch
            key = {i}
            isOn={ value }
            onColor="#73DB1D"
            offColor="#dbdbdb"
            label = {d.label}
            labelStyle={{ color: "white", fontWeight: "900",paddingLeft:5, }}
            size="large"
            onToggle={(data)=>{this.toggleSwitch(i, d.id, data)}}
          />
        );
      break

      case "mapa":
      console.log('switch: ',d, i, value);
        return (
          <Mapa
            key = {i}
            index = {i}
            num = {respuestas[12]}
            col = {respuestas[13]}
            cp  = {respuestas[14]}
            mun = {respuestas[15]}
            est = {respuestas[16]}
            ciu = {respuestas[17]}
            lon = {respuestas[18]}
            lat = {respuestas[19]}
            alt = {respuestas[20]}
            getDataGeo = {this.getDataGeo}
          />
        )
      break

      default:
        return null;
      break;
    }
  }

  onClickButton = (id) => {
    let { formIndex, beforeIndex, title } = this.state;
    //Busco la label para poner en el title
    const result = _.filter(db, {id:id});
    title[id] = result[0].label;

    //El index actual se convierte en el index anterior
    beforeIndex.push(formIndex);

    //El id del boton al que se le dio click se convierte en el index actual
    formIndex = id;

    //Envío a filtrar
    this.setState({formIndex, beforeIndex, title}, this.dynamicRender);
  }

  buttonSelected = (index,id, data) => {
    let { group, respuestas } = this.state;
    respuestas[id] = data[0];

    const r = _.filter(db, {id});
    const component = this.getComponent(r[0], index, data[1])

    group[index] = component;
    this.setState({group, respuestas}, this.setStorage);
  }

  handleTextChange = (inputText, id) => {
    let { respuestas } = this.state;
    respuestas[id] = inputText;
    this.setState({respuestas}, this.setStorage);
  }

  dateChange = (index, id, data) => {
    let { group, respuestas } = this.state;
    respuestas[id] = data;

    const r = _.filter(db, {id});
    const component = this.getComponent(r[0], index, data)

    group[index] = component;
    this.setState({group, respuestas}, this.setStorage);
  }

  getPhoto = (index, id, data) => {
    let { group, respuestas } = this.state;
    respuestas[id] = data;

    const r = _.filter(db, {id});
    const component = this.getComponent(r[0], index, data)

    group[index] = component;
    this.setState({group, respuestas});
  }

  toggleSwitch = (index, id, data) => {
    let { group, respuestas } = this.state;
    respuestas[id] = data;

    const r = _.filter(db, {id});
    const component = this.getComponent(r[0], index, data)//<Text key={index}>{ `value = ${data}` }</Text>//

    group[index] = component;
    this.setState({group, respuestas}, this.setStorage);
   }

  getDataGeo = (inputText, id, index) =>{
    let { group,respuestas } = this.state;
    respuestas[id] = inputText;

    if (index>=0) {
      const component = this.getComponent({inputType:'mapa'}, index)
      group[index] = component;
    }

    this.setState({group, respuestas}, this.setStorage);
  }

  //Guardar en el storage.
  //··················································································//

  handleNumberChange = (inputText) => {
    this.setState({ number: inputText })
  }

  multiselected = (data) => {
  }

  render = () => {
    const {group, beforeIndex, title, formIndex} = this.state;

    return(
      <ImageBackground
        source={require('../assets/bg_app/bg_app.png')}
        style={styles.container}
      >
        {
          beforeIndex.length===0
          ? null
          :<View style={styles.btnBack}>
            <ButtonBack
              backForm={this.backForm}
            />
          </View>
        }

        <TitleForm
          label={
            formIndex
            ? title[formIndex]
            : "Iniciar formulario"

          }
        />

        <ScrollView style={{marginTop:40, marginBottom:40,}}>
         {
           //group['select', 'button', 'calendar', 'text',...]
           group.map((data, index)=>{
             return data
           })
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
    justifyContent:'center',
    alignItems:'center',
  },
  btnBack:{
    width:width,
    height:20,
    alignItems:'flex-end'
  }
});
