import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Font, AppLoading } from "expo";
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

import Login from './components/Login';

const customTextProps = {
  style: {
    fontFamily: 'Roboto_Regular',
    color: 'white',
    fontSize: 20
  }
};

const customTextInputProps = {
  underlineColorAndroid: 'rgba(0,0,0,0)',
  style: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  }
};

setCustomText(customTextProps);
setCustomTextInput(customTextInputProps);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto_Regular: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
      Roboto_Italic: require('./assets/fonts/Roboto/Roboto-Italic.ttf'),
      Roboto_Bold: require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    });
    this.setState({ loading: false });
  }
  render() {
   if (this.state.loading) {
     return (
         <AppLoading />
     );
   }
   return (
     <View style={styles.container}>
       <Login />
     </View>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5f27cd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
