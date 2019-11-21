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
    const {id, options, value, label} = this.props;
    return (
      <View style={styles.container}>

        <Text
          style={{color:'white', fontSize:16, textAlign:'center'}}
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          {label}
        </Text>
        <Text
          style={styles.textSelect}
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          {value}
        </Text>

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
              <Text
                style={styles.label}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                {`${label}  ❌`}
              </Text>
            </View>
            <View style={{width:'100%'}}>
              {
                options.map((data, index) =>{
                  return(
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        this.props.buttonSelected(this.props.index,id,data)
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
    marginBottom:30,
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
