import React, {Component} from 'react'
import {
  Text,
  StyleSheet,
  Image,
  Dimensions,
  View
} from 'react-native'

type Props = {}
export default class TitleForm extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={
            require('../assets/shape_tituloseccion/shape_tituloseccion.png')
          }
        />
        <Text style={styles.titlePrimary}>
          {this.props.label}
        </Text>
      </View>
    )
  }
}

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  titlePrimary:{
    color:'white',
    fontSize:16,
    fontWeight: 'bold',
    position:'absolute',
    left:25,
    top:3,
  },
})
