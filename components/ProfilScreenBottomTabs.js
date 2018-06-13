import React, { Component } from 'react';
import { View, TouchableBounce } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import ProfilScreen from './PagesProfil/Profil';
import CalendarScreen from './PagesProfil/calendar';
import FriendsScreen from './PagesProfil/friends';
import NotificationsScreen from './PagesProfil/notifications';

const tabBarIcon = name => ({ tintColor }) => (
  <FontAwesome name={name} color={tintColor} size={24} />
);

class Profil extends Component {
  static navigationOptions = {
    tabBarIcon: tabBarIcon('user'),
    tabBarButtonComponent: TouchableBounce,
  };

  render() {
    return <ProfilScreen id="profil" navigation={this.props.navigation} />;
  }
}

class Calendar extends Component {
  static navigationOptions = {
    tabBarIcon: tabBarIcon('calendar'),
    tabBarButtonComponent: TouchableBounce,
  };

  render() {
    return <CalendarScreen id="calendar" navigation={this.props.navigation} />;
  }
}

class Friends extends Component {
  static navigationOptions = {
    tabBarIcon: tabBarIcon('group'),
    tabBarButtonComponent: TouchableBounce,
  };

  render() {
    return <FriendsScreen id="friends" navigation={this.props.navigation} />;
  }
}

class Notifications extends Component {
  static navigationOptions = {
    tabBarIcon: tabBarIcon('bell'),
    tabBarButtonComponent: TouchableBounce,
  };

  render() {
    return <NotificationsScreen id="notifications" navigation={this.props.navigation} />;
  }
}

export default createMaterialBottomTabNavigator({
  Profil,
  Calendar,
  Friends,
  Notifications,
}, {
  initialRouteName: 'Profil',
  activeTintColor: '#f0edf6',
  inactiveTintColor: '#3e2465',
  barStyle: { backgroundColor: '#594192' },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#594192', // TODO Background header in profilscreen, don't work.
    },
  },
});
