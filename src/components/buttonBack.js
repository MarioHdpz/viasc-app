import React, {Component} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {};
export default class ButtonBack extends Component<Props> {

  render = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
        style={styles.button}
        onPress={()=>{this.props.backForm()}}
        >
          <View style={styles.v1}>
            <Image style={styles.image} source={require('../assets/icono_flechaizq/icono_flechaizq.png')}/>
            <Text style={styles.text}>
              Volver
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop:40,
    marginRight:40,
    alignItems:'flex-end',
  },
  button:{
    width:70,
    height:40,
    borderBottomColor:'#76bc21',
  },
  v1:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  },
  image:{
    width:18,
    height:18,
    marginLeft:0,
  },
  text:{
    color:'white',
    fontSize:16,

  },
  ok:{
    backgroundColor:'rgb(57, 194, 103)',
    width:60,
    height:'100%',
    justifyContent:'center',
    borderBottomRightRadius:10,
    borderTopRightRadius:10
  },
  no:{
    backgroundColor:'rgb(194, 57, 57)',
    width:60,
    height:'100%',
    justifyContent:'center',
    borderBottomRightRadius:10,
    borderTopRightRadius:10
  },
});
