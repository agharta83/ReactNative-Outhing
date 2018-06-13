import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { StyleSheet, Text, View, Alert } from 'react-native';

export default class Settings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header}>
            <Left style={styles.left}>
              <Button
                 transparent
                 onPress={() => this.props.navigation.openDrawer()}
               >
                <Icon
                 name='menu'
                />
              </Button>
            </Left>
           <Body style={styles.body}>
              <Title>Paramètres</Title>
          </Body>
          <Right style={styles.right}>
           <Button><Icon name='menu' /></Button>
          </Right>
        </Header>
        <Text style={styles.text}>BLA</Text>
        <Text style={styles.text}>BLU</Text>
        <Text style={styles.text}>BLI</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  header: {
    backgroundColor: '#341f97'
  },
  body: {
    flex: 1,
    paddingRight: 85
  },
  right: {
    flex: 1,
    display: 'none'
  },
  left: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#5f27cd',
    marginTop: 25
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 15,
    fontSize: 20,
    backgroundColor: '#9980FA',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    fontWeight: 'bold',
  }
})
