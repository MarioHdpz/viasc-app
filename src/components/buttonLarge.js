import React, {Component} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

  render = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onClickButton}>
        <View style={styles.v1}>
          <Image style={styles.image} source={this.props.icon}/>
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </View>
        {
          this.props.status === null
          ?null
          :this.props.status
            ? <View style={styles.ok}>
                <Image style={styles.image} source={this.props.icon}/>
              </View>
            :<View style={styles.no}>
              <Image style={styles.image} source={this.props.icon}/>
            </View>
        }

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    height:60,
    margin:15,
    padding:0,
    backgroundColor:'rgba(0,0,0,0.8)',
    borderRadius:15,
    borderBottomColor:'rgba(255, 136, 13,0.7)',
    borderRightColor:'rgba(255, 136, 13,0.7)',
    borderBottomWidth:4,
    borderRightWidth:5,
    elevation: 5,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
  },
  v1:{
    flexDirection:'row',
    width:'80%',
  },
  image:{
    width:40,
    height:40,
    marginLeft:20,
  },
  text:{
    color:'white',
    fontSize:20,
    marginLeft:20,
  },
  ok:{
    backgroundColor:'rgb(57, 194, 103)',
    flex:1,
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    borderBottomRightRadius:10,
    borderTopRightRadius:10
  },
  no:{
    backgroundColor:'rgb(194, 57, 57)',
    flex:1,
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    borderBottomRightRadius:10,
    borderTopRightRadius:10
  },
});
