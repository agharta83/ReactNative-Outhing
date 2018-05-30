import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Font } from 'expo';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate('Auth')}
          >SIGN OUT</Text>
        </TouchableOpacity>
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
  buttonContainer: {
    marginTop: 50,
    padding: 15,
    backgroundColor: "#9980FA",
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700'
  }
})
