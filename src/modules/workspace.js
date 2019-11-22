import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import db from '../containers/formulario.json';
/*
import InputText from '../components/inputText';
import Calendar from '../components/calendar';
import InputNumber from '../components/inputNumber';
import ButtonLarge from '../components/buttonLarge';
import Select from '../components/select';
import Multiselect from '../components/multiselect';
import Camara from '../components/camara';
import File from '../components/file';
*/

import InputText from '../components/inputText';
import InputNumber from '../components/inputNumber';
import ButtonLarge from '../components/buttonLarge';
import Select from '../components/select';
import ButtonForm from '../components/buttonForm'
import ButtonBack from '../components/buttonBack'
import File from '../components/file'

type Props = {};
export default class App extends Component<Props> {
  state = {
    beforeIndex: [],
    formIndex : false,
    optionActive : 0,
    group : [],
    respuestas : {},
    seccion:{},



    myComment:'',
    number:'',
    selectedStartDate:null,
    multiselect:[],
    value:'Seleccionar',
    mulSelected:'MultiSelect',
  }

  componentDidMount = () => {
    this.getStorage();
  }

  dynamicRender = () => {
    let {formIndex, group, seccion} = this.state;

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
        if ( respuestas[d.id] ) {
          value = d.options[ (respuestas[d.id]-1) ][1];
        }

        if (!value) { value = "Seleccionar"; }
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
        if ( respuestas[d.id] ) { value = d.options[ respuestas[d.id] ]; }
        if (!value) { value = null; }
        return (
          <Calendar
            key = {i}
            index = {i}
            id = {d.id}
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
        return (
          <InputText
            key = {i}
            id = {d.id}
            handleTextChange = {this.handleTextChange}
            pholder = {d.label}
            label = {d.label}
          />
        );
      break;

      case "number":
        return (
          <InputNumber
            key = {i}
            id = {d.id}
            handleTextChange = {this.handleTextChange}
            pholder = {d.label}
            label = {d.label}
          />
        );
      break;

      default:
        return null;
      break;
    }
  }

  onClickButton = (id) => {
    let { formIndex, beforeIndex } = this.state;
    //El index actual se convierte en el index anterior
    beforeIndex.push(formIndex);

    //El id del boton al que se le dio click se convierte en el index actual
    formIndex = id;

    //Envío a filtrar
    this.setState({formIndex, beforeIndex}, this.dynamicRender);
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
    console.log(respuestas);
    this.setState({respuestas});
  }

  dateChange = (index, id, data) => {
    let { group, respuestas } = this.state;
    respuestas[id] = data;

    const r = _.filter(db, {id});
    const component = this.getComponent(r[0], index, data)

    group[index] = component;
    this.setState({group, respuestas});
  }

  getPhoto = (index, id, data) => {
    let { group, respuestas } = this.state;
    respuestas[id] = data;

    const r = _.filter(db, {id});
    const component = this.getComponent(r[0], index, data)

    group[index] = component;
    this.setState({group, respuestas});
  }

  //Guardar en el storage.


  //··················································································//

  handleNumberChange = (inputText) => {
    this.setState({ number: inputText })
  }

  multiselected = (data) => {
  }

  render = () => {
    const {group, beforeIndex} = this.state;

    return(
      <ImageBackground
        source={require('../assets/bg_app/bg_app.png')}
        style={styles.container}
      >
        {
          beforeIndex.length===0
          ? null
          :<ButtonBack
          backForm={this.backForm}
          />
        }

        <ScrollView style={{marginTop:40, marginBottom:40,}}>
         {
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
  }
});
