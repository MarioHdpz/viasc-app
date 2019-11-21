import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, View, Image } from 'react-native';

import Login from '../modules/login';
import Init from '../modules/init';
import InitAvaluo from '../modules/initAvaluo';
import Avaluos from '../modules/avaluos';
import WorkSpace from '../modules/workspace';
import AdjuntarDocs from '../modules/adjuntarDocs';
import Captura from '../modules/captura';

const AppNavigator = createStackNavigator({
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

  Login: {
    screen: Login,
    navigationOptions: {
      headerTransparent:true,
    }
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
  },
});

export default createAppContainer(AppNavigator);
