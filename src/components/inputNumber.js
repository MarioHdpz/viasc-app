import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

export default class InputNumber extends Component {

  render() {
    return (
      <View style={styles.v1}>
        <Text style={styles.label}>
          {this.props.label}
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(texto)=>{this.props.handleTextChange(texto,this.props.id)}}
          placeholder={this.props.pholder}
          placeholderTextColor="#f2f2f2"
          keyboardType="numeric"
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
    borderColor: '#73DB1D',
    borderWidth: 1,
    borderRadius: 10,
    width:130,
    height: 40,
    margin: 40,
    paddingLeft:10,
    fontSize:18,
    fontWeight: 'bold',
    textAlign:'right'
  },
  textOutputStyle: {
    fontSize: 20
  },
  label : {
    color:'white',
    padding:130,
    fontSize:18,
    fontWeight: 'bold',
    marginLeft:-110,
    textAlign:'left',
  },
  v1:{
    marginTop:30,
    flex:1,
    flexDirection:'row',
    alignItems:'center',

  },
})
