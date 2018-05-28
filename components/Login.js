import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={styles.title}>Bienvenue sur Outhing!</Text>
        <TextInput
          placeholder="Username or email"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          returnKeyType="done"
          ref={(input) => this.passwordInput = input}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    margin: 15,
    color: '#fff',
    paddingLeft: 10
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
