import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  CheckBox
} from 'react-native';
var tempCheckValues = [];
type Props = {};
export default class Select extends Component<Props> {
  state = {
    modalVisible: false,
    checkBoxChecked: []
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  checkBoxChanged = (id, value) => {

      this.setState({
        checkBoxChecked: tempCheckValues
      })

      var tempCheckBoxChecked = this.state.checkBoxChecked;
      tempCheckBoxChecked[id] = !value;

      this.setState({
        checkBoxChecked: tempCheckBoxChecked
      })

    }

  render = () => {
    const products = [{id: 1},{id: 2},{id: 3}];
    return (
      <View style={styles.container}>
      <Text style={styles.label}>
        {this.props.label}
      </Text>
      {
        products.map((val) => {

          { tempCheckValues[val.id] = false }

          return (

            <View key={val.id} style={{ flexDirection: 'column' }}>

              <View style={{ flexDirection: 'row' }}>
                <CheckBox
                  style={{color:'white'}}
                  value={this.state.checkBoxChecked[val.id]}
                  onValueChange={() => this.checkBoxChanged(val.id, this.state.checkBoxChecked[val.id])}
                />
                <Text style={{color:'black'}}>
                {val.id}
                </Text>
              </View >
            </View >

          )

        })

      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:30,
    backgroundColor:'#f2f2f2',
    padding:10,
    borderTopColor: '#e04783',
    borderTopWidth: 10,
  },
  textSelect:{
    color:'white',
    borderBottomColor: '#e04783',
    borderBottomWidth: 1,
    padding: 10,
    margin: 15,
  },
  modal:{
    backgroundColor:'rgba(0,0,0,0.7)',
    marginTop: 22,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  },
  options:{
    height:40,
    margin:15,
    padding:0,
    borderBottomColor:'rgba(255, 136, 13,0.7)',
    borderBottomWidth:1,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
  },
  capture:{
    color:'black',
    paddingLeft:15,
  },
  label:{
    color:'black',
  },
  image:{
    width:50,
    height:50,
    marginLeft:20,
  },
});
