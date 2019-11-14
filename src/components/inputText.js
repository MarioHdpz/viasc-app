import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class InputText extends Component {

  render() {
    return (
        <TextInput
          style={styles.textInputStyle}
          onChangeText={this.props.handleTextChange}
          placeholder="Enter your comment"
          placeholderTextColor="#f2f2f2"
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
