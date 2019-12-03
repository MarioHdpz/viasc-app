import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  Dimensions
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
    const {index, id} = this.props;

    const d = new Date(date);
    const y = d.getFullYear();
    const m = d.getMonth()+1;
    const n = d.getDate();

    this.props.dateChange(index, id,`${n}-${m}-${y}`);
    this.setModalVisible(!this.state.modalVisible);
  }
  render() {
    const { selectedStartDate } = this.props;
    console.log('label',this.props.label);
    const startDate = selectedStartDate ? selectedStartDate.toString() : this.props.label;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
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

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  input: {
    width:width-50,
    color:'white',
    borderBottomColor: '#73DB1D',
    borderBottomWidth: 1,
    marginLeft:25,
    height: 40,
    padding: 10,
    fontSize:16,
    fontWeight: 'bold'
  },
  modal:{
    marginTop: 22,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  }

});
