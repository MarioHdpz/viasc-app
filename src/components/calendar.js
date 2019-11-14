import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class App extends Component {
  state = {
    modalVisible: false,
    selectedStartDate: null,
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  onDateChange = (date) => {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '--/--/--/';
    return (
      <View style={styles.container}>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <CalendarPicker
                onDateChange={this.onDateChange}
              />

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

          <Text style={styles.input}>{ startDate }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    color:'white',
    borderBottomColor: '#e04783',
    borderBottomWidth: 1,
    height: 40,
    margin: 20,
    padding: 10,
  },
});
