import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
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
      <View style={styles.v1}>
        <Text
          style={styles.textSelect}
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          {value}

        </Text>
        <Image style={styles.icon} source={this.props.icon}/>
        <Modal style={styles.container}
          transparent
          animationType="slide"
          transparent={true}
          presentationStyle={this.formSheet}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={styles.modal}>
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
            <View style={{alignItems:'center'}}>
              <Text
                style={styles.labelExit}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
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
  container:{
    height:40,
    margin:15,
    marginBottom:30,
    marginTop:30,
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  textSelect:{
    color:'white',
    borderBottomColor: '#73DB1D',
    borderBottomWidth: 1,
    width:width-50,
    height: 40,
    margin: -15,
    marginLeft:10,
    padding: 10,
    fontSize:18,
    fontWeight: 'bold'
  },
  modal:{
    backgroundColor:'black',
    marginTop: 100,
    marginBottom: 100,
    borderRadius: 20,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    margin:35,
    opacity:0.9
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
    fontSize:15,
    fontWeight: 'bold',
    textAlign:'center'
  },
  v1:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    height:40,
    margin:15,
    marginBottom:30,
    marginTop:30,
    backgroundColor: 'transparent'
  },
  label : {
    color:'white',
    fontSize:18,
    fontWeight: 'bold',
    marginLeft: 0,
    textAlign:'center',
    borderBottomColor:'#73DB1D',
    borderBottomWidth:3,
  },
  labelExit : {
    color:'white',
    fontSize:18,
    textAlign:'center',
  },
  icon:{
    width:20,
    height:20
  },
});
