import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, View, Image, TouchableOpacity } from 'react-native';

import Login from '../modules/login';
import Iniciar from '../modules/init';
import InitAvaluo from '../modules/initAvaluo';
import Avaluos from '../modules/avaluos';
import WorkSpace from '../modules/workspace';
import AdjuntarDocs from '../modules/adjuntarDocs';
import Captura from '../modules/captura';


import FormInicio from '../formulario/inicio';
import DGenerales from '../formulario/datosgenerales';
import DDSolicitante from '../formulario/datosdelsolicitante'
import Ubi from '../formulario/ubicacion'
import IGeneral from '../formulario/informacionGeneral'
import IDZona from '../formulario/infraestructuraDeZona'
import IDisponible from '../formulario/infraestructuraDisponible'
import EUrbano from '../formulario/equipamientoUrbano'
import CDInmuebles from '../formulario/caracteristicasDeInmuebles'
import MColindancia from '../formulario/medidasColindancias'
import TId from '../formulario/terrenoID'

import EDCRecamaras from '../formulario/recamaras'
import EComedor from '../formulario/estanciaComedor';
import Ban from '../formulario/banios';
import Esc from '../formulario/escaleras';
import Coc from '../formulario/cocina';
import PServicio from '../formulario/patioServicio';
import Est from '../formulario/estacionamiento';
import Fach from '../formulario/fachada';

import EAdicionales from '../formulario/elementosAdicionales'

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerTransparent:true,
    }
  },
});

const Init = createStackNavigator({
  Iniciar: {
    screen: Iniciar,
    navigationOptions: {
      headerTransparent:true,
      headerTitle: () => (
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
          <Image
            style = {{width:50, height:50}}
            source={require('../assets/logotipo_vias/logotipo_vias.png')}
          />
        </View>
      ),
    },
  },
});

const AppNavigator = createStackNavigator({
  InitAvaluo: {
    screen: InitAvaluo,
    navigationOptions: {
      headerTransparent:true,
      headerTitle: () => (
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
          <Image
            style = {{width:50, height:50}}
            source={require('../assets/logotipo_vias/logotipo_vias.png')}
          />
        </View>
      ),
      headerLeft:(<Image style={{height:50, width:50}}/>),
    },
  },
  FInicio: {
    screen: FormInicio,
    navigationOptions: {
      headerTransparent:true,
      headerTitle: () => (
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
          <Image
            style = {{width:50, height:50}}
            source={require('../assets/logotipo_vias/logotipo_vias.png')}
          />


        </View>
      ),
    },
  },
  AdjuntarDocs: {
    screen: AdjuntarDocs,
    navigationOptions: {
      headerTransparent:true,
      headerTitle: () => (
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
          <Image
            style = {{width:50, height:50}}
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
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
          <Image
            style = {{width:50, height:50}}
            source={require('../assets/logotipo_vias/logotipo_vias.png')}
          />
        </View>
      ),
    },
  },
  WorkSpace: {
    screen: WorkSpace,
    navigationOptions: {
      headerTransparent:true,
      headerTitle: () => (
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
          <Image
            style = {{width:50, height:50}}
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
        <Image style={{height:50, width:50}}/>
      ),
    },
  }
);

const DatosGenerales = createStackNavigator(
  {
    DGenerales: {
      screen: DGenerales,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const DatosDelSolicitante = createStackNavigator(
  {
    DDSolicitante: {
      screen: DDSolicitante,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const InformacionGeneral = createStackNavigator(
  {
    IGeneral: {
      screen: IGeneral,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const InfraestructuraDeZona = createStackNavigator(
  {
    IDZona: {
      screen: IDZona,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const InfraestructuraDisponible = createStackNavigator(
  {
    IDisponible: {
      screen: IDisponible,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const EquipamientoUrbano = createStackNavigator(
  {
    EUrbano: {
      screen: EUrbano,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const Ubicacion = createStackNavigator(
  {
    Ubi: {
      screen: Ubi,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
      },
    },
  },
);

const CaracteristicasDeInmuebles = createStackNavigator(
  {
    CDInmuebles: {
      screen: CDInmuebles,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
      },
    },
  },
);

const MedidasColindancias = createStackNavigator(
  {
    MColindancia: {
      screen: MColindancia,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
      },
    },
  },
);

const Recamaras = createStackNavigator(
  {
    EDCRecamaras: {
      screen: EDCRecamaras,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
      },
    },
  },
);

const EstanciaComedor = createStackNavigator(
  {
    EComedor: {
      screen: EComedor,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const Banios = createStackNavigator(
  {
    Ban: {
      screen: Ban,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const Escaleras = createStackNavigator(
  {
    Esc: {
      screen: Esc,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const Cocina = createStackNavigator(
  {
    Coc: {
      screen: Coc,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const PatioServicio = createStackNavigator(
  {
    PServicio: {
      screen: PServicio,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const Estacionamiento = createStackNavigator(
  {
    Est: {
      screen: Est,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const Fachada = createStackNavigator(
  {
    Fach: {
      screen: Fach,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const TerrenoID = createStackNavigator(
  {
    TId: {
      screen: TId,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);

const ElementosAdicionales = createStackNavigator(
  {
    EAdicionales: {
      screen: EAdicionales,
      navigationOptions: {
        headerTransparent:true,
        headerTitle: () => (
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image
              style = {{width:50, height:50}}
              source={require('../assets/logotipo_vias/logotipo_vias.png')}
            />
          </View>
        ),
        headerRight:(
            <Image style={{height:50, width:50}}/>
        ),
      },
    },
  },
);


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

  DatosGenerales: {
    screen: DatosGenerales,
  },

  DatosDelSolicitante: {
    screen: DatosDelSolicitante,
  },

  InformacionGeneral: {
    screen: InformacionGeneral,
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
});

export default createAppContainer(rutas);
