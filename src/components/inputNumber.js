import React, { Component } from 'react'
import { TextInput, StyleSheet, View, Text, Dimensions } from 'react-native'

export default class InputNumber extends Component {

  validar = (texto) => {
    let formato

    switch (this.props.validation) {
      case 'entero':
        formato = texto.replace(/[abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ`~!@#$%^&*()_-|+\=?;:'",.<>\{\}\[\]\\\/]/gi,'')
      break

      default:
        formato = texto.replace(/[abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ`~!@#$%^&*()_|+\=?;:'",<>\{\}\[\]\\\/]/gi,'')
      break
    }

    this.props.handleTextChange(formato,this.props.id)

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {this.props.label}
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(texto)=>{this.validar(texto)}}
          placeholder="0000"
          placeholderTextColor="#f2f2f2"
          keyboardType="numeric"
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
    flexDirection:'row',
    alignItems:'center',
    height:40,
    width:width-50,
    marginLeft:15,
    marginBottom:30,
    marginTop:30,
    backgroundColor: 'transparent'
  },
  textInputStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    color:'white',
    borderColor: '#73DB1D',
    borderWidth: 1,
    borderRadius: 10,
    width:'100%',
    height: 40,
    padding: 5,
    fontSize:16,
    fontWeight: 'bold',
    textAlign:'center'
  },
  label : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color:'white',
    fontSize:16,
    fontWeight: 'bold',
    textAlign:'left',
  },
})
