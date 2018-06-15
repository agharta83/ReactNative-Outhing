import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { FormValidationMessage } from 'react-native-elements';
import { Hoshi } from 'react-native-textinput-effects';
// import { Font } from 'expo';
import * as firebase from 'firebase';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      email: '',
      username: '',
      city: '',
      password: '',
      password2: '',
      errorMessage: '',
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
          .catch(error => this.setState({ errorMessage: error.message }));
      }
      if (!this.validateEmail(email)) {
        this.setState({ errorMessage: 'Adresse email invalide' });
      }
      if (password.length < 5) {
        this.setState({ errorMessage: 'Le mot de passe doit contenir au moins 5 caractères' });
      }
      if (this.state.password2 !== password) {
        this.setState({ errorMessage: 'Les mots de passe ne sont pas identiques' });
      }
      if (password.length < 5 && !this.validateEmail(email)) {
        this.setState({ errorMessage: 'Mot de passe et adresse email invalides' });
      }
    };

// TODO KeyboardAvoidingView does'nt work !

    render() {
      return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" >
          <StatusBar barStyle="light-content" />

          <Text style={styles.title}>Sign Up</Text>
          {this.state.errorMessage !== '' && <Text style={styles.error}>{this.state.errorMessage}</Text>}

          <View style={{ backgroundColor: '#594192', width: 300 }}>

            <Hoshi
            // Styling props
              label={'Email'}
              borderColor={'#5fbbe7'}
              maskColor={'#594192'}
              inputStyle= {{
                backgroundColor: '#594192',
                borderColor: '#594192',
                color: '#e4e7ec',
              }}
              // TextInput props
              onSubmitEditing={() => this.nextUsername.focus()}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />

            <Hoshi
              // Styling props
              label={'Username'}
              borderColor={'#5fbbe7'}
              maskColor={'#594192'}
              inputStyle= {{
                backgroundColor: '#594192',
                borderColor: '#594192',
                color: '#e4e7ec',
              }}
              // TextInput props
              returnKeyType="next"
              onSubmitEditing={() => this.usernameInput.focus()}
              onChangeText={username => this.setState({ username })}
            />

            <Hoshi
              // Styling props
              label={'City'}
              borderColor={'#5fbbe7'}
              maskColor={'#594192'}
              inputStyle= {{
                backgroundColor: '#594192',
                borderColor: '#594192',
                color: '#e4e7ec',
              }}
              // TextInput props
              returnKeyType="next"
              onSubmitEditing={() => this.cityInput.focus()}
              onChangeText={city => this.setState({ city })}
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
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              ref={input => this.nextPassword = input}
              onChangeText={password => this.setState({ password })}
            />

            <Hoshi
              // Styling props
              label={'Confirm password'}
              borderColor={'#5fbbe7'}
              maskColor={'#594192'}
              inputStyle= {{
                backgroundColor: '#594192',
                borderColor: '#594192',
                color: '#e4e7ec',
              }}
              // TextInput props
              returnKeyType="done"
              ref={input => this.nextPassword = input}
              secureTextEntry
              onChangeText={password2 => this.setState({ password2 })}
            />

          </View>

          <View style={styles.buttonContainer}>
            <TouchableBounce
              onPress={() =>
                this.signUp(
                this.state.email,
                this.state.username,
                this.state.city,
                this.state.password,
              )}
            >

            <View style={styles.button}>
              <Text style={styles.buttonText}>SIGN UP</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#594192',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    color: '#e4e7ec',
    fontWeight: 'bold',
  },
  form: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
