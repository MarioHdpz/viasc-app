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
        <TouchableHighlight style={{flex:1}} onPress={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}>
          <Text style={styles.textSelect}>
            {this.props.value}
          </Text>
        </TouchableHighlight>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modal}>

            <View style={{alignItems:'center'}}>
              <Image style={styles.image} source={require('../assets/icon/icon.png')}/>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.label}>
                  {`${this.props.label}  ❌`}
                </Text>
              </TouchableHighlight>

            </View>
            <View style={{width:'100%'}}>
              {
                products.map((val) => {

                  { tempCheckValues[val.id] = false }

                  return (

                    <View key={val.id} style={{ flexDirection: 'column' }}>
                      <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                          value={this.state.checkBoxChecked[val.id]}
                          onValueChange={() => this.checkBoxChanged(val.id, this.state.checkBoxChecked[val.id])}
                        />
                        <Text>
                        {val.id}
                        </Text>
                      </View >
                    </View >

                  )

                })

              }
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height:40,
    margin:15,
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
    color:'white',
    paddingLeft:15,
  },
  label:{
    color:'white',
    fontSize:20,
    textAlign:'center'
  },
  image:{
    width:50,
    height:50,
    marginLeft:20,
  },
});
