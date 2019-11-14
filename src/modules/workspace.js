import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native';
import axios from 'axios';

import InputText from '../components/inputText';
import Calendar from '../components/calendar';

type Props = {};
export default class App extends Component<Props> {
  state = {
    myComment:''
  }

  componentDidMount = () => {
    this.login();
  }

  login = async () => {
    const testerUrl = 'https://httpbin.org/post';
    const testerObj = {a: 1, b: 'Textual content'}

    const url = 'http://167.172.197.238:3000/rest-auth/login';
    //const url = 'http://www.happr.ai/auth';

    const obj = {
      email:'jess.monter@lytica.ai',
      password:'admin'
    }

    /*
    const body = {
      email: 'jess.monter@lytica.ai',
      password: 'admin',
    };
    yield put(addErrorMessage(`Error de credenciales`));
    try {
      const requestURL = `http://167.172.197.238:3000/rest-auth/login/`;
      // const requestURL = 'http://92ead1f1.ngrok.io/rest-auth/login/';
      const response = yield call(request, requestURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.token) {
        yield call(login, response.token, response.user, action.history);
      }
    } catch (error) {
      yield put(addErrorMessage(`Error de credenciales`));
      yield put({
        type: constants.LOGIN_FAILED,
      });
    }
    */

    /*axios.post(url, obj, { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      console.log('login response', response);
    })
    .catch((response) => console.log('user sign in err', response));
    */

    /*fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
    */

    /*fetch(testerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testerObj),
    })
    .then((response) => {
      console.log('response', response);
    });
    */

    /*fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
    .then((response) => response.text())
    .then((responseData) => {
      console.log('responseData', responseData);
    });*/

    /*axios.post(url, obj)
    .then(function (response) {
      console.log('response',response);
    })
    .catch(function (error) {
      console.log(error);
    });
    */

    /*const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    const content = await rawResponse.text();
    console.log('content', content);*/
  }

  handleTextChange = (inputText) => {
    this.setState({ myComment: inputText })
  }

  render = () => {
    return (
      <ImageBackground source={
        require('../assets/bginit/bginit.png')
      } style={styles.container}>
        <Text>
          Conexión WS
        </Text>
        <InputText
         handleTextChange = {this.handleTextChange}
        />
        <Calendar />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});
