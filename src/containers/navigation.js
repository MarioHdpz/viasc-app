import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, View, Image } from 'react-native';

import Login from '../modules/login';
import Init from '../modules/init';
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

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerTransparent:true,
    }
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
    },
  },
  Init: {
    screen: Init,
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
});

const FInicio = createStackNavigator(
  {
    FormInicio: {
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
  },
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

const rutas = createSwitchNavigator({
  FInicio: {
    screen: FInicio,
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

  AppNavigator: {
    screen: AppNavigator,
  },
});

export default createAppContainer(rutas);
