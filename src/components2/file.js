import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';


type Props = {};
export default class File extends Component<Props> {

  getFile = async () => {
    try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf],
        });
        if (res) {
            this.props.getData(this.props.id,res,true);
        }
        else{
          this.props.getData(this.props.id,res,false);
        }

      } catch (err) {

        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
  }

  render = () => {
    const {estado, label} = this.props

    return (
      <TouchableOpacity style={styles.container} onPress={this.getFile}>

        {
          estado === null
          ? <Image
              style={styles.icon}
              source = {require('../assets/icon/icon.png')}
            />
          :estado
            ?<Image
              style={styles.icon}
              source = {require('../assets/iconGreen/icon.png')}
            />
            :<Image
              style={styles.icon}
              source = {require('../assets/iconRed/icon.png')}
            />
        }


        <Text style={styles.text}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container:{
    width:width/2.3,
    height:width/2.3,
    margin: 10,
    padding: 10,
    alignItems:'center',
    borderWidth:1,
    borderColor:'black',
    justifyContent:'center',
  },
  icon:{
    height:100,
    width:100,
  },
  text:{
    color:'white',
    fontSize:14,
    textAlign:'center',
  }
});
