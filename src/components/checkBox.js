import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, Dimensions } from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'react-native-check-box'

export default class InputBoolean extends Component {
  state = {
    value:false
  }

  render() {
    return (
      <View style={styles.container}>

        <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={()=>{
              this.props.booleanCheck(!this.props.value, this.props.id)
            }}
            isChecked={this.props.value}
            leftText={this.props.label}
            leftTextStyle={styles.label}
            checkBoxColor={'#73DB1D'}
        />

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
