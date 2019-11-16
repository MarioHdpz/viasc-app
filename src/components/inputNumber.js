import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class InputNumber extends Component {

  render() {
    return (
        <TextInput
          style={styles.textInputStyle}
          onChangeText={this.props.handleTextChange}
          placeholder={this.props.pholder}
          placeholderTextColor="#f2f2f2"
          keyboardType="numeric"
        />
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    color:'white',
    borderBottomColor: '#e04783',
    borderBottomWidth: 1,
    height: 40,
    margin: 20,
    padding: 10,
  },
  textOutputStyle: {
    fontSize: 20
  }
})
