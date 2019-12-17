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

import ButtonBack from '../components/buttonBack'
import TitleForm from '../components/titleForm'
import InputText from '../components/inputText';
import ButtonForm from '../components/buttonForm'

export default class App extends Component<Props> {
  state = {
    user:null,
    respuestas : {},
    values:{},
    i1:false,
    i2:false,
    i3:false,
    i4:false,
    i5:false,
    i6:false,
    i7:false,
    i8:false,
    i9:false,
    i10:false,
    index:0,
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

  componentDidMount = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress',()=>{ this.props.navigation.navigate('FInicio') });
    this.getStorage()
  }
  componentWillUnmount = () => {
    this.backHandler.remove()
  }

  handleTextChange = (inputText, id, index) => {
    let {respuestas, values} =  this.state;

    respuestas[id] = inputText;
    values[id] = inputText;

    this.setState({respuestas, values}, this.setStorage)
  }

  addMedida = () => {
    let {index} = this.state;
    index = index+1;

    console.log(index);

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

    respuestas[74] = null
    respuestas[206] = null
    respuestas[207] = null
    respuestas[208] = null
    respuestas[209] = null
    respuestas[210] = null
    respuestas[211] = null
    respuestas[212] = null
    respuestas[213] = null
    respuestas[214] = null
    respuestas[215] = null
    respuestas[216] = null
    respuestas[217] = null
    respuestas[218] = null

    values[74] = null
    values[206] = null
    values[207] = null
    values[208] = null
    values[209] = null
    values[210] = null
    values[211] = null
    values[212] = null
    values[213] = null
    values[214] = null
    values[215] = null
    values[216] = null
    values[217] = null
    values[218] = null

    this.setState({respuestas, values }, ()=>{
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
          //this.clear();
        }},
      ],
      {cancelable: false},
    );
  }

  readyFormulario = async () => {
    try {
      const value = await AsyncStorage.getItem('readyFormulario');
      let rf = null;
      if (value) {
        rf = JSON.parse(value);
        rf['TerrenoID'] = true
      }
      else{
        rf = {};
        rf['TerrenoID'] = true;
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

  render = () => {
    const {values, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, } = this.state;
    return(
      <ImageBackground
        source={require('../assets/bg_app/bg_app.png')}
        style={styles.container}
      >

        <ButtonBack
          backForm={()=>{this.props.navigation.navigate('CaracteristicasDeInmuebles', {user:this.state.user})}}
        />

        <TitleForm
          label="Terreno ID"
        />

        <ScrollView style={styles.form}>
          <InputText
            id = {74}
            handleTextChange = {this.handleTextChange}
            pholder = "Frente de lote"
            label = "Frente de lote"
            value= {
              values[74]
            ? values[74]
            : null}
          />
          <InputText
            id = {206}
            handleTextChange = {this.handleTextChange}
            pholder = "Fondo de lote"
            label = "Fondo de lote"
            value= {
              values[206]
            ? values[206]
            : null}
          />
          <InputText
            id = {207}
            handleTextChange = {this.handleTextChange}
            pholder = "Fondo"
            label = "Fondo"
            value= {
              values[207]
            ? values[207]
            : null}
          />
          <InputText
            id = {208}
            handleTextChange = {this.handleTextChange}
            pholder = "Superficie"
            label = "Superficie"
            value= {
              values[208]
            ? values[208]
            : null}
          />

          {
            i1
            ?<InputText
              id = {209}
              handleTextChange = {this.handleTextChange}
              pholder = "Medida"
              label = "Medida"
              value= {
                values[209]
              ? values[209]
              : null}
            />
            :null
          }
          {
            i2
            ?<InputText
              id = {210}
              handleTextChange = {this.handleTextChange}
              pholder = "Medida"
              label = "Medida"
              value= {
                values[210]
              ? values[210]
              : null}
            />
            :null
          }
          {
            i3
            ?<InputText
              id = {211}
              handleTextChange = {this.handleTextChange}
              pholder = "Medida"
              label = "Medida"
              value= {
                values[211]
              ? values[211]
              : null}
            />
            :null
          }
          {
            i4
            ?<InputText
              id = {212}
              handleTextChange = {this.handleTextChange}
              pholder = "Medida"
              label = "Medida"
              value= {
                values[212]
              ? values[212]
              : null}
            />
            :null
          }
          {
            i5
            ?<InputText
              id = {213}
              handleTextChange = {this.handleTextChange}
              pholder = "Medida"
              label = "Medida"
              value= {
                values[213]
              ? values[213]
              : null}
            />
            :null
          }
          {
            i6
            ?<InputText
              id = {214}
              handleTextChange = {this.handleTextChange}
              pholder = "Medida"
              label = "Medida"
              value= {
                values[214]
              ? values[214]
              : null}
            />
            :null
          }
          {
            i7
            ?<InputText
              id = {215}
              handleTextChange = {this.handleTextChange}
              pholder = "Medida"
              label = "Medida"
              value= {
                values[215]
              ? values[215]
              : null}
            />
            :null
          }
          {
            i8
            ?<InputText
              id = {216}
              handleTextChange = {this.handleTextChange}
              pholder = "Medida"
              label = "Medida"
              value= {
                values[216]
              ? values[216]
              : null}
            />
            :null
          }
          {
            i9
            ?<InputText
              id = {217}
              handleTextChange = {this.handleTextChange}
              pholder = "Medida"
              label = "Medida"
              value= {
                values[217]
              ? values[217]
              : null}
            />
            :null
          }
          {
            i10
            ?<InputText
              id = {218}
              handleTextChange = {this.handleTextChange}
              pholder = "Medida"
              label = "Medida"
              value= {
                values[218]
              ? values[218]
              : null}
            />
            :null
          }

          <View style={{justifyContent:'center', alignItems:'center', marginTop:10}}>
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
