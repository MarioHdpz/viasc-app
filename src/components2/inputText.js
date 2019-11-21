import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

export default class InputText extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:'white', fontSize:16, textAlign:'center'}}>
          {this.props.label}
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(texto)=>{this.props.handleTextChange(texto,this.props.id)}}
          placeholder={this.props.pholder}
          placeholderTextColor="#f2f2f2"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height:40,
    margin:15,
    marginBottom:30,
    marginTop:30,
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
