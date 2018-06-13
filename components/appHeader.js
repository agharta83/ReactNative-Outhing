import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class AppHeader extends Component {
  render() {
    return (
        <Header style={styles.header}>
          <Left style={styles.left}>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name='menu' style={styles.btnLeft}/>
            </Button>
          </Left>

          <Body style={styles.body}>
            <Title style={styles.titleHeader}>Suggestions</Title>
          </Body>

          <Right style={styles.right}>

            <Button transparent>
              <Icon name='search' />
            </Button>

            <Button
              transparent
              onPress={() => this.props.navigation.push('BottomTabs')}
            >
              <FontAwesome name='user' style={styles.btnRight}/>
            </Button>

            <Button transparent>
              <Icon name='more' />
            </Button>

          </Right>

      </Header>

    );
  }
}

module.export = AppHeader;

const styles = StyleSheet.create({
  header: {
    height: 45,
    backgroundColor: '#594192',
  },
  titleHeader: {
    fontSize: 18,
    color: '#e4e7ec',
  },
  btnRight: {
    color: '#e4e7ec',
    fontSize: 20,
  },
  btnLeft: {
    color: '#e4e7ec',
    fontSize: 26,
  },
});
