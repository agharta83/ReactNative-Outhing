import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './Drawer/Home';
import SettingScreen from './Drawer/Settings';
import LogoutScreen from './Drawer/Logout';

class Home extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <FontAwesome name='home' color={tintColor} size={24}  />
    ),
  };

  render() {
    return (
      <HomeScreen id='home' navigation={this.props.navigation} />
    );
  }
}

class Setting extends Component {
  static navigationOptions = {
    drawerLabel: 'Setting',
    drawerIcon: ({ tintColor }) => (
      <MaterialIcons name='settings' color={tintColor} size={24} />
    ),
  };

  render() {
    return (
      <SettingScreen id='settings' navigation={this.props.navigation} />
    );
  }
}

class Logout extends Component {
  static navigationOption = {
    drawerLabel: 'Logout',
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name='logout' color={tintColor} size={24} navigation={this.props.navigation} />
    ),
  };

  render() {
    return (
      <LogoutScreen id='logout' navigation={this.props.navigation} />
    );
  }
}

export default createDrawerNavigator({
  Home,
  Setting,
  Logout,
});
