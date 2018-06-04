import React from 'react';
import { View, Text } from 'react-native';
import * as firebase from 'firebase';

export default class Logout extends React.Component {
  componentDidMount() {
    firebase.auth().signOut()
      .then(() => this.props.navigation.navigate('Auth'));
    };

  render() {
    return(
      <View><Text>Signing out</Text></View>
    )
  }
}
