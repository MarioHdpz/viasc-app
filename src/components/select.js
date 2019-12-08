import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
  ScrollView
 } from "react-native";
import Modal from "react-native-modal";

export default class ModalTester extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    const {id, options, value, label} = this.props;
    return (
      <View style={styles.v1}>

      <TouchableOpacity
      style={{
        borderBottomColor: '#73DB1D',
        borderBottomWidth: 1,
        width:width-50,
        padding:0,
        margin:0,
        flexDirection:'row',
        justifyContent:'space-between'
      }}
      onPress={() => {
        this.toggleModal(!this.state.isModalVisible);
      }}
      >
        <Text
          style={styles.textSelect}
        >
          {value}
        </Text>
        <Image style={styles.icon} source={require('../assets/icono_flechaabajo/icono_flechaabajo.png')}/>
      </TouchableOpacity>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modal}>
          <ScrollView
            style={styles.scroll}
          >
          <View style={{alignItems:'center'}}>
            <Text
              style={styles.label}
            >
              {`${label}`}
            </Text>
          </View>
          <View style={{width:'100%',height:'auto'}}>
            {
              options.map((data, index) =>{
                return(
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.props.buttonSelected(this.props.index,id,data)
                      this.toggleModal(!this.state.isModalVisible)
                    }}
                    style={styles.options}
                  >
                    <Text style={styles.capture}>
                      {data[1]}
                    </Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          </ScrollView>
          <View style={{alignItems:'center'}}>
              <Text
                style={styles.labelExit}
                onPress={() => {
                  this.toggleModal(!this.state.isModalVisible);
                }}
              >
                {`❌`}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  textSelect:{
    color:'white',
    fontSize:16,
    fontWeight: 'bold',
  },
  modal:{
    backgroundColor:'black',
    borderRadius: 20,
  },
  options:{
    height:30,
    margin:20,
    padding:0,
    borderBottomColor:'rgba(255, 136, 13,0.7)',
    borderBottomWidth:1,
    textAlign:'center'
  },
  capture:{
    color:'white',
    paddingLeft:0,
    fontSize:16,
    fontWeight: 'bold',
    textAlign:'center'
  },
  v1:{
    margin:15,
  },
  label : {
    color:'white',
    fontSize:16,
    fontWeight: 'bold',
    marginLeft: 0,
    textAlign:'center',
    borderBottomColor:'#73DB1D',
    borderBottomWidth:3,
  },
  labelExit : {
    color:'white',
    fontSize:16,
    textAlign:'center',
    height:40,
    width:width,
  },
  icon:{
    width:20,
    height:20
  },
});
