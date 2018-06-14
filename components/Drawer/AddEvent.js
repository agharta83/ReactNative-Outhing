import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import axios from 'axios';
import * as firebase from 'firebase';

const customEvent = firebase.database().ref('customEvent');
const apiKey = 'AIzaSyClQSVaaniZcchqi4pIXNBat-YXo25_LQw';

export default class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customEventList: [],
      isDateTimePickerVisible: false,
      dateMessage: 'Quand ?',
      date_end: '',
      title: '',
      city: '',
      latlon: [],
      postalCode:'',
      price: '',
      firstPicker: false,
      eventAdmin: '',
      latIds: [],
      lonIds: [],
    };
  }

  componentDidMount() {
    customEvent.on('value', (snapshot) => {
      this.setState({
        customEventList: snapshot.val(),
      });
    });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({ firstPicker: !this.state.firstPicker });
    this._hideDateTimePicker();
    this.saveDate(date);
  }

  saveDate = (date) => {
    const dateConvert = JSON.stringify(date);
    const dateSlice = dateConvert.slice(1, 17);

    if (this.state.firstPicker === true) {
      date_start = dateSlice;
      this.setState({ date_start });
      this._showDateTimePicker();
    }
    if (this.state.firstPicker === false) {
      date_end = dateSlice;
      this.setState({date_end});
      this._hideDateTimePicker();
    }
  }

  geocoding = async () => {
    const apiQuery = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.city},&region=fr$key=${apiKey}`;
    await axios.get(apiQuery).then((locate) => {
      const latlng = locate.data.results[0].geometry.location;
      const lat = latlng.lat;
      const lon = latlng.lng;
      const latlon = { lat, lon };
      this.setState({ latlon });
    });
    this.createEvent( this.state.title, this.state.city, this.state.price, this.state.latlon, this.state.eventAdmin, this.state.postalCode );
  };

  createEvent = (title, city, price, latlon) => {
    const eventsIds = this.state.customEventList.map(e => e.fields.id);
    const newId = Math.max(...eventsIds) + 1;
    const id = newId;
    const timetable = `${this.state.date_start} ${this.state.date_end}`;
    const image = 'https://firebasestorage.googleapis.com/v0/b/outhing-13fcf.appspot.com/o/people.jpg?alt=media&token=b57e2271-4e23-499c-9a3f-7291f240cbb3';
    customEvent.child(newId).child('fields').set({
      id, title, city, image, timetable, latlon, price,
    });
    this.props.navigation.navigate('Home');
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
                onChangeText={title => this.setState({ title })} />
            </Item>
            <Item>
              <Input
                placeholder="Ville"
                onChangeText={city => this.setState({ city })} />
            </Item>
            <DateTimePicker
              mode='datetime'
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker} />
            <Button
              block primary
              onPress={this._showDateTimePicker}>
                <Text>
                  {this.state.dateMessage}
                </Text>
            </Button>
            <Item>
              <Input
                placeholder="Prix"
                keyboardType = 'numeric'
                onChangeText={price => this.setState({ price })}/>
              </Item>
              <Button
              block primary
              onPress={() => this.geocoding()}>
                <Text>
                  Créez cet événement
                </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
