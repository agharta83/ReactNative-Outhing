import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
// import { Font } from 'expo';
import * as firebase from 'firebase';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      email: '',
      password: '',
    });
}
    signUp = (email, password) => {
      firebase.auth().createUserWithEmailAndPassword(email, password);
    };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <StatusBar
            barStyle="light-content"
          />
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            placeholder="Username or email"
            returnKeyType="next"
            onSubmitEditing={() => this.nextEmail.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(email)=> this.setState({email})}
            style={styles.input}
          />
          <TextInput
            placeholder="Pseudonyme"
            returnKeyType="next"
            onSubmitEditing={() => this.nextPassword.focus()}
            ref={(input) => this.nextEmail = input}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            ref={(input) => this.nextPassword = input}
            secureTextEntry
            onChangeText={(password) => this.setState({password})}
            style={styles.input}
          />
          <TextInput
            placeholder="Confirm Password"
            returnKeyType="done"
            ref={(input) => this.passwordInput = input}
            secureTextEntry
            style={styles.input}
          />
          <TouchableOpacity style={styles.buttonContainer}>
            <Text
              style={styles.buttonText}
              onPress={() => this.signUp(this.state.email, this.state.password)}
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
    textAlign: 'center',
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    margin: 15,
    color: '#fff',
    paddingLeft: 10,
    width: 300,
  },
  buttonContainer: {
    marginTop: 50,
    padding: 15,
    backgroundColor: '#9980FA',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
  },
});
