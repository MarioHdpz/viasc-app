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
    //console.log('DB', db);
    this.getStorage();
  }

  dynamicRender = () => {
    let {formIndex, group, seccion, respuestas} = this.state;

    //result se genera un array de componentes fitrados.
    const result = _.filter(db, {parent:formIndex});

    //Limpio el grupo de componentes
    group = [];

    //[{data, parent:false},{data, parent:false}.{data, parent:false}]
    //Recorro el mapa de componentes filtrados
    result.map((data,index) => {
      let value = null

      /*
      respuestas = {
        22 : "Algo",
        35: "otro valor"
      }
      */
      if ( respuestas[data.id] ) {//obtengo la respuesta guardada en el storage
        value = respuestas[data.id];
      }
      //console.log(data, index);
      //Obtengo el nuevo componente
      const component = this.getComponent(data, index, value);
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
    try {
      await AsyncStorage.setItem('respuestas', JSON.stringify(this.state.respuestas) )
    } catch (e) {
      console.log("error de almacenaje");
    }
  }

  getStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('respuestas');
      console.log('GETSTORAGE', value);
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
    //console.log(d, i, value);
    const { optionActive, respuestas } = this.state;

    switch (d.inputType) {
      case "button":
        //activa o desactiva los botones
        //{ i === optionActive ? true : false }
        return (
          <ButtonForm
            key = {d.id}
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
        //si no trae nada entonces pongo la label de contenido
        if (!value) { value = d.label; }
        else{//si trae algo, este será el value del option por consecuencia tengo que ponder su contenido
          //si hay una opcion seleccionada y revisaré si tiene hijos

          if (d.response) {//si tiene hijos
            //console.log('response',d.response);
            this.createChildComponent(i, d.id, d.parent, d.response, value);
          }

          //obtengo el texto de la opción seleccionada
          const opts = d.options
          for(const op in opts){
            if (opts[op][0] === value ) {
              //esta es la opción seleccionada y estoy obteniendo su texto
              value =opts[op][1]
              break;
            }
          }
        }

        return (
          <Select
            key = {d.id}
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
            key = {d.id}
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
            key = {d.id}
            index = {i}
            id = {d.id}
            getPhoto = {this.getPhoto}
            value = {value}
          />
        );
      break;

      case "text":
        if (!value) { value = null }
        return (
          <InputText
            key = {d.id}
            index = {i}
            id = {d.id}
            handleTextChange = {this.handleTextChange}
            pholder = {d.label}
            label = {d.label}
            value={value}
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
            key = {d.id}
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
            key = {d.id}
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
        return (
          <Mapa
            key = {d.id}
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

  //Acción que realiza cuando se usa un select
  buttonSelected = (index, id, data) => {
    let { group, respuestas } = this.state;
    //En las respuestas se guarda el value
    respuestas[id] = data[0];

    //obtengo el componente para ahora cargarlo con la información contenido del option
    const r = _.filter(db, {id});
    const component = this.getComponent(r[0], index, data[0])
    group[index] = component;

    //SI EL SELECT GENERA ACCIONES POR SU REPUESTA ENTOCES SE INICIA EL SIGUIENTE PROCESO
    if (r[0].response) {
      /*
      acciones : {
          1:[
            24
          ],
          2:[
            26,27,160,28,29,30,31,32
          ],
          3:[
            35,36,37
          ],
          4:[
            40,41,42,43,45,47,48
          ]
        }
      */
      const acciones = r[0].response
      const respuesta = data[0]

      //creamos los componentes que correspondan a la respuesta
      this.createChildComponent(index, r[0].id, r[0].parent, acciones, respuesta)
    }

    //ACTUALIZO EL STATE Y MANDO GAURDAR EN EL STORAGE
    this.setState({group, respuestas}, this.setStorage);
  }

  handleTextChange = (inputText, id, index) => {
    let { group, respuestas } = this.state;
    respuestas[id] = inputText;

    const r = _.filter(db, {id});
    const component = this.getComponent(r[0], index, inputText)

    group[index] = component;
    this.setState({group, respuestas}, this.setStorage);
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

  createChildComponent = (indexPadre, idPadre, parentPadre, acciones, respuesta) => {
    console.log('createChildComponent', indexPadre, idPadre, parentPadre, acciones, respuesta);
    let { group } = this.state;
    //console.log(group, indexPadre, idPadre, parentPadre, acciones, respuesta);

    //1.- Revisar si hay componentes hijos
    let arrayDeAcciones = []
    for(const accion in acciones){
      arrayDeAcciones = arrayDeAcciones.concat(acciones[accion])
    }

    console.log('GROUP', group, 'ARRAYDEACCIONES', arrayDeAcciones);

    group.map((data,posicion)=>{
      /*const coincidencia = arrayDeAcciones.filter(item => {
        const key = parseInt(data.key);
        //console.log('EVALUANDO',item,key);
        return item === key
      });*/
      const key = parseInt(data.key);
      console.log(key);
      /*for ( const accion in arrayDeAcciones ) { //reviso que ninguna acción este renderizada antes de crear el componente
        const idAccion = arrayDeAcciones[accion];

        if (idAccion === key){ //se debe borrar por que ya existe y se esta volviendo a pedir
          console.log('idAccion',idAccion, 'data.key',key);
          group.splice(posicion,1)//Borro elemento del array para que pueda volver a existir
        }
      }*/

      //--------------///
      //console.log('coincidencia', coincidencia);
      //si hay coincidencias y se deben borrar
      /*if (coincidencia.length > 0) {
        console.log('SE BORRO:',coincidencia);
        //2.- Borrar los componentes hijos que existan o coincidan
      }*/
      //if (coincidencia.length > 0){ // si hay coincidencia no hago nada
      //}else {//si no hay entonces renderizo el nuevo hijo
      //}//else de no hay coincidencias y se deber renderizar el nuevo hijo

      //--------------///




    });

    //3.- Crear los nuevos componentes hijos en la misma pantalla y debajo del padre
    /*Ejemplo:
      [
        0: padre1 -> va a crear hijos
        1: hijo1
        2: hijo2
        3: hijo3
        4: padre2
        5: padre3
      ]
    */


    //Renderizo los componentes que corresponden a la respuesta
    let indexHijo = indexPadre;
    acciones[respuesta].map((idComponenteHijo)=>{
      indexHijo++;
      const getComponenteHijo = _.filter(db, {id:idComponenteHijo});//obtengo el hijo perteneciente a la respuesta selecionada
      let componenteHijo = getComponenteHijo[0];
      //componenteHijo.parent = parentPadre //CON ESTO YA TENGO A LOS DOS EN LA MISMA PANTALLA
      //console.log('ORIGINAL:',original, 'CAMBIO:',componenteHijo);
      //console.log('HIJO', componenteHijo);
      const hijo = this.getComponent(componenteHijo, indexHijo ) //GENERO EL COMPONENTE HIJO
      group.splice( indexHijo, 0, hijo);//lo meto entre los elementos del array Group
    })




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
