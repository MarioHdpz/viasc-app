import React, { Component } from 'react'
import { TextInput, StyleSheet, View, Text, Dimensions } from 'react-native'

export default class InputText extends Component {

  validar = (texto) => {

    switch (this.props.validation) {
      case 'caracter':
        const formato = texto.replace(/[1234567890`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,'')
        this.props.handleTextChange(formato,this.props.id)
        break
      default: this.props.handleTextChange(texto,this.props.id)
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          scrollEnabled={false}
          onChangeText={(texto) => {this.validar(texto)}}
          placeholder={this.props.label}
          placeholderTextColor="#f2f2f2"
          value = {this.props.value}
          multiline={true}
        />
      </View>
    )
  }
}

const {height, width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container:{
  },
  textInputStyle: {
    color:'white',
    borderBottomColor: '#73DB1D',
    borderBottomWidth: 1,
    width:width-50,
    height: 40,
    marginLeft:15,
    fontSize:16,
    fontWeight: 'bold',
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
