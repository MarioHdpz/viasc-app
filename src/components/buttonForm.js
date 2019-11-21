import React, {Component} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {};
export default class ButtonForm extends Component<Props> {

  render = () => {
    const {disabled} = this.props;
    return (
      <TouchableOpacity
      style={styles.button}
      onPress={
        disabled
        ? ()=>{this.props.onClickButton(this.props.id)}
        : ()=>{}
      }
      activeOpacity={disabled ? 1 : 0.7}
      >
        <View style={styles.v1}>

          <Text style={styles.text}>
            {this.props.text}
          </Text>

        </View>
        <Image style={styles.image} source={this.props.icon}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    width:350,
    height:40,
    margin:15,
    padding:0,
    backgroundColor:'rgba(0,0,0,0.7)',
    borderBottomColor:'#76bc21',
    borderBottomWidth:2,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
  },
  v1:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  },
  image:{
    width:18,
    height:18,
    marginRight:5,
  },
  text:{
    color:'white',
    fontSize:15,
    marginLeft:20,
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
