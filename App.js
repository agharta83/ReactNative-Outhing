import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


import Login from './components/Auth/Login';
import Home from './components/Home';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: true };
  }

  render() {
    if (this.state.isLogged) {
      return (
             <Home />
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
