import React, { Component } from 'react';
import { AtivityIndicator, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Font } from 'expo';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { setCustomTextInput } from 'react-native-global-props';

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <StatusBar
            barStyle="light-content"
          />
          <Text style={styles.title}>Bienvenue sur Outhing</Text>
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
            <Text
              style={styles.buttonText}
              onPress={() => this.props.navigation.navigate('App')}
            >LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text
              style={styles.buttonText}
              onPress={() => this.props.navigation.navigate('SignUp')}
            >SIGN UP</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: "bold",
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
