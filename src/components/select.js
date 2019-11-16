import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';

type Props = {};
export default class Select extends Component<Props> {
  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  render = () => {
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
              this.props.options.map((data, index) =>{
                return(
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.props.buttonSelected(data)
                      this.setModalVisible(!this.state.modalVisible)
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
