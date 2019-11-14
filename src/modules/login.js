import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

  render = () => {
    return (
      <View style={styles.container}>
        <Text>
          LOGIN
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
