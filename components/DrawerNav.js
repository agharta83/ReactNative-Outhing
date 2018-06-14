import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import HomeScreen from './Drawer/Home';
import SettingScreen from './Drawer/Settings';
import LogoutScreen from './Drawer/Logout';
import AddEventScreen from './Drawer/AddEvent';

// TODO Styling drawer navigation

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
  static navigationOptions = {
    drawerLabel: 'Logout',
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name='logout' color={tintColor} size={24} />
    ),
  };

  render() {
    return (
      <LogoutScreen id='logout' navigation={this.props.navigation} />
    );
  }
}

class Add extends Component {
  static navigationOptions = {
    drawerLabel: 'Add',
    drawerIcon: ({ tintColor }) => (
      <Entypo name='add-to-list' color={tintColor} size={24} />
    ),
  };

  render() {
    return (
      <AddEventScreen id='add' navigation={this.props.navigation} />
    );
  }
}

export default createDrawerNavigator({
  Home,
  Setting,
  Logout,
  Add,
}, {

});
