import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, StatusBar, Animated } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
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
      } else {
        this.setState({ errorMessage: true });
      }
    };

    render() {
      if (!this.state.login) {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Checking Login</Text>
          </View>
        );
      }
      return (
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding">
            <StatusBar
              barStyle="light-content"
            />
            <Text style={styles.title}>Bienvenue sur Outhing</Text>
            {this.state.errorMessage && <Text style={{color: 'red'}}>Mot de passe et/ou adresse non reconnus</Text>}

            <View style={{ backgroundColor: '#594192', width: 300 }}>
              <Hoshi
              // Styling props
                label={'Username or email'}
                borderColor={'#5fbbe7'}
                maskColor={'#594192'}
                inputStyle= {{
                  backgroundColor: '#594192',
                  borderColor: '#594192',
                  color: '#e4e7ec',
                }}
                // TextInput props
                onSubmitEditing={() => this.passwordInput.focus()}
                returnKeyType="next"
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
              />

              <Hoshi
              // Styling props
                label={'Password'}
                borderColor={'#5fbbe7'}
                maskColor={'#594192'}
                inputStyle= {{
                  backgroundColor: '#594192',
                  borderColor: '#594192',
                  color: '#e4e7ec',
                }}
                // TextInput props
                onSubmitEditing={() => this.passwordInput.focus()}
                returnKeyType="done"
                secureTextEntry
                onChangeText={password => this.setState({ password })}
              />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableBounce
              onPress={() => this.signIn(this.state.email, this.state.password)}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </View>
            </TouchableBounce>

            <TouchableBounce
              onPress={() => this.props.navigation.navigate('SignUp')}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>SIGNUP</Text>
              </View>

            </TouchableBounce>
          </View>
        </KeyboardAvoidingView>
      </View>
      );
    }
}

// Styling Component for TouchableOpacity
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

class TouchableBounce extends React.Component {
  static defaultProps = {
    activeOpacity: 0.7,
  };
  scale = new Animated.Value(1);

  bounceTo = (
    value: number,
    velocity: number,
    bounciness: number,
    callback?: ?Function,
  ) =>
    Animated.spring(this.scale, {
      toValue: value,
      velocity,
      bounciness,
    }).start(callback);

  onPressIn = (e) => {
    this.bounceTo(0.93, 0.1, 0);
    this.props.onPressIn && this.props.onPressIn(e);
  };

  onPressOut = (e) => {
    this.bounceTo(1, 0.5, 0);
    this.props.onPressOut && this.props.onPressOut(e);
  };

  onPress = (e) => {
    this.bounceTo(1, 10, 10, this.props.onPressAnimationComplete);
    this.props.onPress && this.props.onPress(e);
  };

  render() {
    const { style, ...props } = this.props;
    return (
      <AnimatedTouchable
        {...props}
        style={[{ transform: [{ scale: this.scale }] }, style]}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={this.onPress}
      />
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#594192',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 28,
    color: '#e4e7ec',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 50,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    elevation: 3,
    borderColor: '#aadaf0',
    backgroundColor: '#9980FA',
    width: 100,
    height: 60,
    marginHorizontal: 25,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#e4e7ec',
    fontWeight: '700',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
