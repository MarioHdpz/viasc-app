import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class Calendar extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  onDateChange = (date) => {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = d.getMonth();
    const n = d.getDate();

    this.props.dateChange(`${y}-${m}-${n}`);
    this.setModalVisible(!this.state.modalVisible);
  }
  render() {
    const { selectedStartDate } = this.props;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '__-__-__';
    return (
      <View style={styles.container}>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modal}>
            <View>
              <TouchableHighlight

                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{textAlign:'right'}}>
                  ❌
                </Text>
              </TouchableHighlight>

              <CalendarPicker
                onDateChange={this.onDateChange}
                weekdays={['Lun', 'Mar', 'Míe', 'Jue', 'Vier', 'Sab', 'Dom']}
                months={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                previousTitle="Anterior"
                nextTitle="Próximo"
                selectedDayColor="#e04783"
                todayBackgroundColor="#d7b1c0"
              />
            </View>
          </View>
        </Modal>

          <Text
            style={styles.input}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            { startDate }
          </Text>
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
  modal:{
    marginTop: 22,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  }

});
