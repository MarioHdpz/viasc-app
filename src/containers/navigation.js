import React from 'react';
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
      headerTitle: "mi title"
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
