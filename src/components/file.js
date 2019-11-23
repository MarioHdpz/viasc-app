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
        console.log('res');
        if (res) {
          this.props.getData(this.props.id,res,true);
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
          ?<Image
              style={styles.icon}
              source = {require('../assets/icono_folder/icono_folder.png')}
            />
          :estado === true
            ?<Image
              style={styles.icon}
              source = {require('../assets/icono_seleccionararchivo/icono_seleccionararchivo.png')}
            />
            :<Image
              style={styles.icon}
              source = {require('../assets/icono_foldererror/icono_foldererror.png')}
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
    borderColor:'#76bc21',
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
