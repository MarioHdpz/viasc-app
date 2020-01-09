import React, {Component} from 'react'
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native'

export default class ButtonForm extends Component {

  render = () => {
    const {disabled} = this.props
    return (
      <TouchableOpacity
      style={
        this.props.status === false
        ? styles.no
        : styles.button
      }
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
        {
          this.props.status === null
          ? <Image style={styles.image} source={this.props.icon}/>
          : this.props.status
            ? <Image style={styles.image} source={require('../assets/icono_acierto/icono_acierto.png')}/>
            : <Image style={styles.image} source={require('../assets/icono_errorblanco/icono_errorblanco.png')}/>

        }
      </TouchableOpacity>
    )
  }
}

const {height, width} = Dimensions.get('window')
const styles = StyleSheet.create({
  button:{
    width:width-50,
    height:40,
    margin:15,
    padding:0,
    borderBottomColor:'#76bc21',
    borderBottomWidth:2,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
  },
  no:{
    width:width-50,
    height:40,
    margin:15,
    padding:0,
    borderBottomColor:'rgb(194, 57, 57)',
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
    fontSize:16,
    fontWeight: 'bold'
  },

})
