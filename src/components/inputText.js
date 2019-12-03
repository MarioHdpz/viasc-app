import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, Dimensions } from 'react-native';

export default class InputText extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(texto) => {this.props.handleTextChange(texto,this.props.id)}}
          placeholder={this.props.label}
          placeholderTextColor="#f2f2f2"
          value = {this.props.value}
        />
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container:{
    height:40,
    marginBottom:30,
    marginTop:30,
  },
  textInputStyle: {
    color:'white',
    borderBottomColor: '#73DB1D',
    borderBottomWidth: 1,
    width:width-50,
    height: 40,
    marginLeft:10,
    padding: 10,
    fontSize:16,
    fontWeight: 'bold'
  },
  textOutputStyle: {
    fontSize: 16
  },
  label : {
    color:'white',
    fontSize:16,
    fontWeight: 'bold',
    marginLeft: 29,
    textAlign:'left'
  }

})
