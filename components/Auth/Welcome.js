import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Animated, TouchableOpacity } from 'react-native';

export default class Welcome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bienvenue sur Outhing</Text>
        </View>

        <View style={styles.buttonsContainer}>

          <TouchableBounce>
            <View style={styles.buttons} onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.btnText}>LOGIN</Text>
            </View>
          </TouchableBounce>

          <TouchableBounce>
            <View style={styles.buttons} onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={styles.btnText}>SIGN UP</Text>
            </View>
          </TouchableBounce>

        </View>

      </View>
    );
  }
}


// Styling Coomponent for TouchableOpacity
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
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#e4e7ec',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttons: {
    borderRadius: 10,
    borderWidth: 1,
    elevation: 6,
    borderColor: '#aadaf0',
    backgroundColor: '#9980FA',
    width: 100,
    height: 60,
    marginHorizontal: 25,
  },
  btnText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontWeight: '700',
  },
});
