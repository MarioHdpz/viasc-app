import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {  View, Image, StyleSheet } from 'react-native'

import Login from '../modules/login'
import Iniciar from '../modules/init'
import InitAvaluo from '../modules/initAvaluo'
import AdjuntarDocs from '../modules/adjuntarDocs'
import Captura from '../modules/captura'

import FormInicio from '../formulario/inicio'
import DGenerales from '../formulario/datosgenerales'
import DDSolicitante from '../formulario/datosdelsolicitante'
import Ubi from '../formulario/ubicacion'
import IGeneral from '../formulario/informacionGeneral'
import IDZona from '../formulario/infraestructuraDeZona'
import IDisponible from '../formulario/infraestructuraDisponible'
import EUrbano from '../formulario/equipamientoUrbano'
import CDInmuebles from '../formulario/caracteristicasDeInmuebles'
import MColindancia from '../formulario/medidasColindancias'
import TId from '../formulario/terrenoID'
import TInmueble from '../formulario/tipoDeInmueble'
import Cnt from '../formulario/construcciones'

import EDCRecamaras from '../formulario/recamaras'
import EComedor from '../formulario/estanciaComedor'
import Ban from '../formulario/banios'
import Esc from '../formulario/escaleras'
import Coc from '../formulario/cocina'
import PServicio from '../formulario/patioServicio'
import Est from '../formulario/estacionamiento'
import Fach from '../formulario/fachada'

import EAdicionales from '../formulario/elementosAdicionales'

const styles = StyleSheet.create({
  image: {
    width:50,
    height:50
  },
  title:{
    justifyContent:'center',
    alignItems:'center',
    flex:1
  }
})

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerTransparent:true,
    }
  },
})

const Init = createStackNavigator({
  Iniciar: {
    screen: Iniciar,
    navigationOptions: {
      headerTransparent:true,
      headerTitle: () => (
        <View style={styles.title}>
          <Image
            style = {styles.image}
            source={require('../assets/logotipo_vias/logotipo_vias.png')}
          />
        </View>
      ),
    },
  },
})

const AppNavigator = createStackNavigator({
  InitAvaluo: {
    screen: InitAvaluo,
    navigationOptions: {
      headerTransparent:true,
      headerTitle: () => (
        <View style={styles.title}>
          <Image
            style = {styles.image}
            source={require('../assets/logotipo_vias/logotipo_vias.png')}
          />
        </View>
      ),
      headerLeft:(<Image style={styles.image}/>),
    },
  },

  AdjuntarDocs: {
    screen: AdjuntarDocs,
    navigationOptions: {
      headerTransparent:true,
      headerTitle: () => (
        <View style={styles.title}>
          <Image
            style = {styles.image}
            source={require('../assets/logotipo_vias/logotipo_vias.png')}
          />
        </View>
      ),
    },
  },
  Captura: {
    screen: Captura,
    navigationOptions: {
      headerTransparent:true,
      headerTitle: () => (
        <View style={styles.title}>
          <Image
            style = {styles.image}
            source={require('../assets/logotipo_vias/logotipo_vias.png')}
          />
        </View>
      ),
    },
  },
},
{
    initialRouteName: 'InitAvaluo',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerRight:(
        <Image style={styles.image}/>
      ),
    },
  }
)

const FInicio = createStackNavigator(
{
  FormInicio : {
    screen: FormInicio,
    navigationOptions: {
      headerTransparent:true,
      headerTitle: () => (
        <View style={styles.title}>
          <Image
            style = {styles.image}
            source={require('../assets/logotipo_vias/logotipo_vias.png')}
          />
        </View>
      ),
      headerRight:(
          <Image style={styles.image}/>
      ),
    },
  },
}
)

const DatosGenerales = createStackNavigator(
  {
    DGenerales: {
      screen: DGenerales,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const Construcciones = createStackNavigator(
  {
    Cnt: {
      screen: Cnt,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const DatosDelSolicitante = createStackNavigator(
  {
    DDSolicitante: {
      screen: DDSolicitante,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const TipoDeInmueble = createStackNavigator(
  {
    TInmueble: {
      screen: TInmueble,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const InformacionGeneral = createStackNavigator(
  {
    IGeneral: {
      screen: IGeneral,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const InfraestructuraDeZona = createStackNavigator(
  {
    IDZona: {
      screen: IDZona,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const InfraestructuraDisponible = createStackNavigator(
  {
    IDisponible: {
      screen: IDisponible,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const EquipamientoUrbano = createStackNavigator(
  {
    EUrbano: {
      screen: EUrbano,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const Ubicacion = createStackNavigator(
  {
    Ubi: {
      screen: Ubi,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
      },
    },
  },
)

const CaracteristicasDeInmuebles = createStackNavigator(
  {
    CDInmuebles: {
      screen: CDInmuebles,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
      },
    },
  },
)

const MedidasColindancias = createStackNavigator(
  {
    MColindancia: {
      screen: MColindancia,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
      },
    },
  },
)

const Recamaras = createStackNavigator(
  {
    EDCRecamaras: {
      screen: EDCRecamaras,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
      },
    },
  },
)

const EstanciaComedor = createStackNavigator(
  {
    EComedor: {
      screen: EComedor,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const Banios = createStackNavigator(
  {
    Ban: {
      screen: Ban,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const Escaleras = createStackNavigator(
  {
    Esc: {
      screen: Esc,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const Cocina = createStackNavigator(
  {
    Coc: {
      screen: Coc,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const PatioServicio = createStackNavigator(
  {
    PServicio: {
      screen: PServicio,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const Estacionamiento = createStackNavigator(
  {
    Est: {
      screen: Est,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const Fachada = createStackNavigator(
  {
    Fach: {
      screen: Fach,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const TerrenoID = createStackNavigator(
  {
    TId: {
      screen: TId,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)

const ElementosAdicionales = createStackNavigator(
  {
    EAdicionales: {
      screen: EAdicionales,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={styles.title}>
            <Image
              style = {styles.image}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={styles.image}/>
        ),
      },
    },
  },
)


const rutas = createSwitchNavigator({
  AuthStack:{
    screen:AuthStack,
  },

  Init:{
    screen:Init,
  },

  AppNavigator: {
    screen: AppNavigator,
  },

  FInicio: {
    screen: FInicio,
  },

  DatosGenerales: {
    screen: DatosGenerales,
  },

  Construcciones : {
    screen: Construcciones
  },

  DatosDelSolicitante: {
    screen: DatosDelSolicitante,
  },

  InformacionGeneral: {
    screen: InformacionGeneral,
  },

  TipoDeInmueble:{
    screen:TipoDeInmueble,
  },

  InfraestructuraDeZona:{
    screen:InfraestructuraDeZona,
  },

  InfraestructuraDisponible: {
    screen: InfraestructuraDisponible,
  },

  EquipamientoUrbano: {
    screen: EquipamientoUrbano,
  },

  Ubicacion: {
    screen: Ubicacion,
  },

  CaracteristicasDeInmuebles: {
    screen: CaracteristicasDeInmuebles,
  },

  MedidasColindancias:{
    screen: MedidasColindancias,
  },

  TerrenoID:{
    screen: TerrenoID,
  },

  Recamaras:{
    screen: Recamaras,
  },

  EstanciaComedor:{
    screen: EstanciaComedor,
  },

  Banios:{
    screen: Banios,
  },

  Escaleras:{
    screen: Escaleras,
  },

  Cocina:{
    screen: Cocina,
  },

  PatioServicio:{
    screen: PatioServicio,
  },

  Estacionamiento:{
    screen: Estacionamiento,
  },

  Fachada:{
    screen: Fachada,
  },

  ElementosAdicionales:{
    screen: ElementosAdicionales,
  },
})

export default createAppContainer(rutas)
