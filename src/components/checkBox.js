import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default class InputBoolean extends Component {
  state = {
    value:false
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:3}}>
          <Text style={styles.label}>
            {this.props.label}
          </Text>
        </View>
        <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
          <CheckBox
            onValueChange = {(value)=>{this.props.booleanCheck(value, this.props.id)}}
            value={this.props.value}
          />
        </View>
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container:{
    borderBottomColor: '#73DB1D',
    borderBottomWidth: 1,
    width:width-50,
    flexDirection:'row',
    marginLeft:15,
  },
  label : {
    color:'white',
    fontSize:16,
    fontWeight: 'bold',
    textAlign:'left'
  }
})
