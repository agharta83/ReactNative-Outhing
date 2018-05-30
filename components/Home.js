import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert } from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EventList: [
        {
          id: 1, title: 'Event 1', place: 'Lieu', date: '30/05/2018', hours: '18h'
        },
        {
          id: 2, title: 'Event 2', place: 'Lieu', date: '30/05/2018', hours: '18h'
        },
        {
          id: 3, title: 'Event 3', place: 'Lieu', date: '30/05/2018', hours: '18h'
        },
        {
          id: 4, title: 'Event 4', place: 'Lieu', date: '30/05/2018', hours: '18h'
        },
        {
          id: 5, title: 'Event 5', place: 'Lieu', date: '30/05/2018', hours: '18h'
        },
        {
          id: 6, title: 'Event 6', place: 'Lieu', date: '30/05/2018', hours: '18h'
        },
        {
          id: 7, title: 'Event 7', place: 'Lieu', date: '30/05/2018', hours: '18h'
        },
        {
          id: 8, title: 'Event 8', place: 'Lieu', date: '30/05/2018', hours: '18h'
        },
        {
          id: 9, title: 'Event 9', place: 'Lieu', date: '30/05/2018', hours: '18h'
        }
      ],
    };
  }

  EventListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  }

  GetItem(item) {
    Alert.alert(item);
  }


  render() {
    return (
      <View style={styles.container}>

        <FlatList
          data={ this.state.EventList }
          ItemSeparatorComponent={this.EventListItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <View
            style={styles.item}>
              <Text
                style={styles.title}
                onPress={this.GetItem.bind(this, item.title)}
                >{item.title}</Text>
              <Text style={styles.place}>{item.place}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.hours}>{item.hours}</Text>
            </View>}
         />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    width: '100%',
    backgroundColor: '#5f27cd',
  },
  item: {
    padding: 10,
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  place: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
  },
  hours: {
    fontSize: 16,
  },
});
