import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { setCustomTextInput } from 'react-native-global-props';
import { Container, Header, Content, Form, Item, Input, Button } from 'native-base';
import DatePicker from 'react-native-datepicker';
// import { Font } from 'expo';
import * as firebase from 'firebase';
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const customEvent = firebase.database().ref('customEvent');

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventsList: [],
      date: '',
      title: '',
      place: '',
      price: '',
    };
  }

  componentDidMount() {
    customEvent.on('value', snapshot => {
      this.setState({
        eventsList: snapshot.val(),
      })
    })
  }
  
  createEvent = (title, place, date, price) => {
    
    const eventsIds = this.state.eventsList.map(e => e.id);
    const newId = Math.max(...eventsIds) + 1;
    id = newId
    customEvent.child(newId).set({ id, title, place, date, price});
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
          <Container>
            <Header />
            <Content>
              <Form>
                <Item>
                  <Input 
                    placeholder="Nom de l'évènement"
                    onChangeText={(title) => this.setState({title})} />
                </Item>
                <Item>
                  <Input 
                    placeholder="Lieu"
                    onChangeText={(place) => this.setState({place})} />
                </Item>
                <DatePicker
                  style={{width: 200}}
                  date={this.state.date}
                  mode="date"
                  placeholder="select date"
                  format="DD-MM-YYYY"
                  minDate="01-06-2018"
                  maxDate="31-12-2018"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                    marginLeft: 36
                    }
                  }}
                  onDateChange={(date) => {this.setState({date: date})}}
                />
                <Item>
                  <Input 
                    placeholder="Prix"
                    keyboardType = 'numeric'
                    onChangeText={(price) => this.setState({price})}/>
                </Item>
                <Button block primary
                  onPress={() => this.createEvent(this.state.title, this.state.place, this.state.date, this.state.price)}>
            <Text>Créer un évènement</Text>
          </Button>
              </Form>
            </Content>
          </Container>
    );
  }
  }