import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Font } from 'expo';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { setCustomTextInput } from 'react-native-global-props';
import * as firebase from 'firebase';

export default class LoginScreen extends Component {
  state = {
    email: 'test@test.com',
    password: 'testtest',
  }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCH7afXHdq6dbc4CYu_5EhT1SxEXtpdRYU',
      authDomain: 'testouthing.firebaseapp.com',
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  onPressSignIn() {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('App'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <StatusBar
            barStyle="light-content"
          />
          <Text style={styles.title}>Bienvenue sur Outhing</Text>
          {this.state.errorMessage ? <Text style={{color: "red"}}> {this.state.errorMessage}</Text> : <Text></Text>}
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
            onPress={() => this.onPressSignIn()}
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
    marginTop: '75%'
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
