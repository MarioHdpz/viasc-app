import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native';
import axios from 'axios';

import InputText from '../components/inputText';
import Calendar from '../components/calendar';
import InputNumber from '../components/inputNumber';
import ButtonLarge from '../components/buttonLarge';
import Select from '../components/select';
import Multiselect from '../components/multiselect';
import Camara from '../components/camara';

type Props = {};
export default class App extends Component<Props> {
  state = {
    myComment:'',
    number:'',
    selectedStartDate:null,
    multiselect:[],
    value:'Seleccionar',
    mulSelected:'MultiSelect',
  }

  componentDidMount = () => {
    //this.login();
  }

  login = async () => {
    const url = 'http://167.172.197.238:3000/rest-auth/login/';
    const obj = {
      email:'jess.monter@lytica.ai',
      password:'admin'
    }

    axios.post(url, obj, { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      console.log('login response', response);
    })
    .catch((response) => console.log('user sign in err', response));
  }

  handleTextChange = (inputText) => {
    this.setState({ myComment: inputText })
  }

  handleNumberChange = (inputText) => {
    this.setState({ number: inputText })
  }

  dateChange = (selectedStartDate) => {
    this.setState({selectedStartDate});
  }

  onClickButton = () => {
    console.warn("click");
  }

  buttonSelected = (data) => {
    this.setState({value:data[1]});
  }

  multiselected = (data) => {

  }

  render = () => {
    return (
      <ImageBackground source={
        require('../assets/bginit/bginit.png')
      } style={styles.container}>
        <ScrollView style={{marginTop:40, marginBottom:40,}}>
          <ButtonLarge
            icon = {require('../assets/icon/icon.png')}
            text = "Button"
            onClickButton = {this.onClickButton}
            status = {null}
          />
          <ButtonLarge
            icon = {require('../assets/icon/icon.png')}
            text = "Button"
            onClickButton = {this.onClickButton}
            status = {true}
          />
          <ButtonLarge
            icon = {require('../assets/icon/icon.png')}
            text = "Button"
            onClickButton = {this.onClickButton}
            status = {false}
          />
          <InputText
           handleTextChange = {this.handleTextChange}
           pholder="Texto"
          />
          <Calendar
            dateChange = {this.dateChange}
            selectedStartDate = {this.state.selectedStartDate}
          />
          <InputNumber
            handleTextChange = {this.handleNumberChange}
            pholder = "Número"
          />
          <Select
            options = {[[1,'casa'], [2,'edificio'], [3,'departamento']]}
            value = {this.state.value}
            label = 'Tipo de inmueble'
            buttonSelected = { this.buttonSelected }
          />

          <Multiselect
            options = {[[1,'baño'], [2,'cochera'], [3,'jardín']]}
            buttonSelected = { this.multiselected }
            label = {this.state.mulSelected}
            value={this.state.mulSelected}
          />

          <Camara/>


        </ScrollView>
      </ImageBackground>
    );
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
