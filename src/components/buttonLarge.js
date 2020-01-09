import React, {Component} from 'react'
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native'
const {height, width} = Dimensions.get('window')

export default class ButtonLarge extends Component {

  render = () => {
    const {disabled} = this.props
    return (
      <TouchableOpacity
      style={[
        styles.click,
          {
            backgroundColor:disabled
            ?'rgba(0,0,0,0.7)'
            :'rgba(0,0,0,0.3)'
          }
        ]}
      onPress={
        disabled
        ? ()=>{this.props.onClickButton(this.props.id)}
        : ()=>{}
      }
      >
        <View style={styles.v1}>
          <Image style={styles.image} source={this.props.iconPrimary}/>
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </View>
        {
          this.props.status === null
          ? null
          :this.props.status
            ? <View style={styles.ok}>
                <Image style={styles.image} source={this.props.icon}/>
              </View>
            :<View style={styles.no}>
              <Image style={styles.image} source={this.props.iconError}/>
            </View>
        }
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  v1:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  },
  image:{
    width:30,
    height:30,
    marginLeft:20,
  },
  text:{
    color:'white',
    fontSize:16,
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
  click:{
    width:width-50,
    height:60,
    margin:15,
    padding:0,
    borderRadius:15,
    borderBottomColor:'rgba(255, 136, 13,0.7)',
    borderRightColor:'rgba(255, 136, 13,0.7)',
    borderBottomWidth:4,
    borderRightWidth:5,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
  }
})
