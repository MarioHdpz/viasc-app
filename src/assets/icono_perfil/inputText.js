import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

export default class InputText extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {this.props.label}
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(texto) => {this.props.handleTextChange(texto,this.props.id)}}
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
    marginLeft: -10,
    marginTop:30,
  },
  textInputStyle: {
    color:'white',
    borderBottomColor: '#73DB1D',
    borderBottomWidth: 1,
    width:370,
    height: 40,
    margin: 20,
    padding: 10,
    fontSize:18,
    fontWeight: 'bold'
  },
  textOutputStyle: {
    fontSize: 20
  },
  label : {
    color:'white',
    fontSize:18,
    fontWeight: 'bold',
    marginLeft: 29,
    textAlign:'left'
  }

})
