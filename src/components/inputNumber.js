import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, Dimensions } from 'react-native';

export default class InputNumber extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {this.props.label}
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(texto)=>{this.props.handleTextChange(texto,this.props.id)}}
          placeholder="000"
          placeholderTextColor="#f2f2f2"
          keyboardType="numeric"
          value = {this.props.value}
        />
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');
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
    fontSize:18,
    fontWeight: 'bold',
    textAlign:'center'
  },
  label : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color:'white',
    fontSize:15,
    fontWeight: 'bold',
    textAlign:'left',
  },
})
