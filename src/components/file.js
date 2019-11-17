import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';


type Props = {};
export default class File extends Component<Props> {

  getFile = async () => {
    try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf],
        });

        console.log(res);



      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
  }

  render = () => {
    return (
      <TouchableOpacity style={styles.container} onPress={this.getFile}>
        <Image
          style={styles.icon}
          source = {require('../assets/icon/icon.png')}
        />
        <Text style={styles.text}>
          Escritura
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width:150,
    margin: 20,
    padding: 10,
    alignItems:'center'
  },
  icon:{
    height:100,
    width:100,
  },
  text:{
    color:'white',
    fontSize:18,
    textAlign:'center',
  }
});
