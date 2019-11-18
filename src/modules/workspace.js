import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native';
import _ from 'lodash';
import axios from 'axios';

import db from '../containers/formulario.json';

import InputText from '../components/inputText';
import Calendar from '../components/calendar';
import InputNumber from '../components/inputNumber';
import ButtonLarge from '../components/buttonLarge';
import Select from '../components/select';
import Multiselect from '../components/multiselect';
import Camara from '../components/camara';
import File from '../components/file';


type Props = {};
export default class App extends Component<Props> {
  state = {
    beforeIndex: [],
    formIndex : false,
    optionActive : 0,
    group : [],
    respuestas : {},



    myComment:'',
    number:'',
    selectedStartDate:null,
    multiselect:[],
    value:'Seleccionar',
    mulSelected:'MultiSelect',
  }

  componentDidMount = () => {
    this.dynamicRender();
  }

  dynamicRender = () => {
    let {formIndex, group} = this.state;

    const result = _.filter(db, {parent:formIndex});

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

    formIndex = beforeIndex[beforeIndex.length-1];
    beforeIndex.pop();

    this.setState({formIndex, beforeIndex}, this.dynamicRender);
  }

  getComponent = (d, i, value) => {
    const { optionActive, respuestas } = this.state;
    switch (d.inputType) {
      case "button":
        //activa o desactiva los botones
        //{ i === optionActive ? true : false }
        return (
          <ButtonLarge
            key = {i}
            id = {d.id}
            disabled = {true}
            icon = {require('../assets/icon/icon.png')}
            text = {d.label}
            onClickButton = {this.onClickButton}
            status = {null}
          />
        );
      break;

      case "select":
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
    this.setState({group, respuestas});
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
        source={
          require('../assets/bginit/bginit.png')
        }
        style={styles.container}
      >
        {
          beforeIndex.length===0
          ? null
          :<Text
          style={{
            textAlign:'center',
            padding:10,
            marginTop:20,
            color:'#f2f2f2',
            fontWeight:'bold',
            borderWidth:1,
          }}
          onPress={this.backForm}
          >
            Regresar
          </Text>
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

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:35,
    paddingLeft:15,
    paddingRight:15,
  }
});
