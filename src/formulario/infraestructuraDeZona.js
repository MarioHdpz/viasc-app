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
    const user = this.props.navigation.getParam('user');
    this.setState({user});
  }
  componentWillUnmount = () => {
    this.backHandler.remove()
  }

  render = () => {
    const {values} = this.state;
    return(
      <ImageBackground
        source={require('../assets/bg_app/bg_app.png')}
        style={styles.container}
      >

        <ButtonBack
          backForm={()=>{this.props.navigation.navigate('FInicio', {user:this.state.user})}}
        />

        <TitleForm
          label="Infraestructura de Zona"
        />

        <ScrollView style={styles.form}>
          <ButtonForm
            icon = {require('../assets/icono_flechader/icono_flechader.png')}
            text = "Infraestructura Disponible"
            disabled = {true}
            onClickButton = {()=>{
              console.log('Infraestructura Disponible');
              this.props.navigation.navigate('InfraestructuraDisponible', {user:this.state.user})
            }}
          />
          <ButtonForm
            icon = {require('../assets/icono_flechader/icono_flechader.png')}
            text = "Equipamiento Urbano"
            disabled = {true}
            onClickButton = {()=>{
              console.log('Equipamiento Urbano');
              this.props.navigation.navigate('EquipamientoUrbano', {user:this.state.user})
            }}
          />
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
