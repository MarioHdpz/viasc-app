import React, {Component} from 'react'
import { StatusBar, StyleSheet, View} from 'react-native'
import AppNavigator from './src/containers/navigation'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#222"
          barStyle="light-content"
        />
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    flex: 1
  }
})
