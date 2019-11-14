import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../modules/login';
import Init from '../modules/init';
import InitAvaluo from '../modules/initAvaluo';
import Avaluos from '../modules/avaluos';
import WorkSpace from '../modules/workspace';

const AppNavigator = createStackNavigator({
  WorkSpace: {
    screen: WorkSpace,
    navigationOptions: {
      headerStyle: {
      }
    },
  },

  Login: {
    screen: Login,

  },
  Init: {
    screen: Init,
  },
  InitAvaluo: {
    screen: InitAvaluo,
  },

  Avaluos: {
    screen: Avaluos,
  },
});

export default createAppContainer(AppNavigator);
