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
      password2: '',
      errorMessage: ''
    });
}

  validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      {
        return (true)
      }
      return (false)
  }

    signUp = (email, password) => {
      // this.setState({errorMessage: ''});
      if (this.validateEmail(email) && password.length > 5 && this.state.password2 === password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => this.props.navigation.navigate('Login'))
          .catch(error => this.setState({ errorMessage: error.message }))
      }
      if (!this.validateEmail(email)) {
        this.setState({ errorMessage: 'Adresse email invalide' });
      }
      if (password.length < 5) {
        this.setState({ errorMessage: 'Le mot de passe doit contenir au moins 5 caractères' })
      }
      if (this.state.password2 !== password) {
        this.setState({ errorMessage: 'Les mots de passe ne sont pas identiques' })
      }
      if (password.length < 5 && !this.validateEmail(email)) {
        this.setState({ errorMessage: 'Mot de passe et adresse email invalides' })
      }
    };

  render() {
    return (
      <View>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <StatusBar
            barStyle="light-content"
          />
          <Text style={styles.title}>Sign Up</Text>
          {this.state.errorMessage != '' && <Text style={styles.error}>{this.state.errorMessage}</Text>}
          <TextInput
            placeholder="Username or email"
            returnKeyType="next"
            onSubmitEditing={() => this.nextPassword.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(email)=> this.setState({email})}
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
            onChangeText={(password2) => this.setState({password2})}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.signUp(this.state.email, this.state.password)}
          >
            <Text
              style={styles.buttonText}
            >SIGN UP</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
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
  error: {
    color: 'red',
    textAlign: 'center'
  }
});
