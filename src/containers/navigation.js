import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, View, Image } from 'react-native';

import Login from '../modules/login';
import Init from '../modules/init';
import InitAvaluo from '../modules/initAvaluo';
import Avaluos from '../modules/avaluos';
import WorkSpace from '../modules/workspace';

const AppNavigator = createStackNavigator({
  WorkSpace: {
    screen: WorkSpace,
    navigationOptions: {
      headerTransparent:true,
      headerTitle: () => (
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
          <Image
            style = {{width:50, height:50}}
            source={require('../assets/icon/icon.png')}
          />
        </View>
      ),
      headerRight: () => (
        <View style={{flex:1, paddingRight:30}}>
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="black"
          />
        </View>
      ),
      headerLeft: () => (
        <View style={{flex:1, paddingLeft:30}}>
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="black"
          />
        </View>
      ),
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
