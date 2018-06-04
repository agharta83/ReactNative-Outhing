import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';

// import { Font } from 'expo';
import * as firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBn1_TVI38blzh0thZm7dl73DxnIhqMTRk',
  authDomain: 'outhing-13fcf.firebaseapp.com',
  databaseURL: 'https://outhing-13fcf.firebaseio.com',
  projectId: 'outhing-13fcf',
  storageBucket: 'outhing-13fcf.appspot.com',
  messagingSenderId: '782761547865',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      email: '',
      password: '',
      errorMessage: false,
      login: false,
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('App');
      }
      if (!user) {
        this.setState({ login: true });
      }
    });
  }

    signIn = (email, password) => {
      if (password !== '' && email !== '') {
        firebase
          .auth().signInWithEmailAndPassword(email, password)
          .then(() => this.props.navigation.navigate('App'))
          .catch(error => this.setState({ errorMessage: true }));
      }
      else {
        this.setState({ errorMessage: true });
      }
    };

    render() {
      if (!this.state.login) {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Checking Login</Text>
          </View>
        )
      }
      return (
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding">
            <StatusBar
              barStyle="light-content"
            />
            <Text style={styles.title}>Bienvenue sur Outhing</Text>
            {this.state.errorMessage && <Text style={{color: 'red'}}>Mot de passe et/ou adresse non reconnus</Text>}
            <TextInput
              placeholder="Username or email"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              placeholder="Password"
              returnKeyType="done"
              ref={(input) => this.passwordInput = input}
              secureTextEntry
              style={styles.input}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.signIn(this.state.email, this.state.password)}
            >
              <Text
                style={styles.buttonText}
              >LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('SignUp')}
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
  loading: {
    flex: 1,
    marginTop: '75%',
  },
  container: {
    flex: 1,
    backgroundColor: '#5f27cd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
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
