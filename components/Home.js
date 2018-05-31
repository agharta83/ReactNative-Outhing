import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight } from 'react-native';
import { Entypo, MaterialIcons, Foundation } from '@expo/vector-icons';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EventList: [
        {
          id: 1, title: 'Event 1', place: 'Lieu', date: '30/05/2018', hours: '18h',
        },
        {
          id: 2, title: 'Event 2', place: 'Lieu', date: '30/05/2018', hours: '18h',
        },
        {
          id: 3, title: 'Event 3', place: 'Lieu', date: '30/05/2018', hours: '18h',
        },
        {
          id: 4, title: 'Event 4', place: 'Lieu', date: '30/05/2018', hours: '18h',
        },
        {
          id: 5, title: 'Event 5', place: 'Lieu', date: '30/05/2018', hours: '18h',
        },
        {
          id: 6, title: 'Event 6', place: 'Lieu', date: '30/05/2018', hours: '18h',
        },
        {
          id: 7, title: 'Event 7', place: 'Lieu', date: '30/05/2018', hours: '18h',
        },
        {
          id: 8, title: 'Event 8', place: 'Lieu', date: '30/05/2018', hours: '18h',
        },
        {
          id: 9, title: 'Event 9', place: 'Lieu', date: '30/05/2018', hours: '18h',
        },
      ],
    };
  }

  onPressItem = (item) => {
    console.warn(item);
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

        <SwipeListView
          useFlatList
          data={ this.state.EventList }
          ItemSeparatorComponent={this.EventListItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>

            <View
            style={styles.item} onPress={this.onPressItem}>

              <Text
                style={styles.title}
                onPress={this.GetItem.bind(this, item.title)}>
                {item.title}
              </Text>

                <View style={styles.content}>

                  <View style={styles.contentItem}>
                    <Text style={styles.text}>{item.place}</Text>
                    <Entypo name="location-pin" style={styles.icons} />
                    </View>
                  <View style={styles.contentItem}>
                    <Text style={styles.text}>{item.date}</Text>
                    <MaterialIcons name="date-range" style={styles.icons} />
                  </View>
                  <View style={styles.contentItem}>
                    <Text style={styles.text}>{item.hours}</Text>
                    <Foundation name="clock" style={styles.icons} />
                  </View>

                </View>

            </View>
          }
          renderHiddenItem={({ item }) => (
            <View>
              <Text>Ne pas participer</Text>
              <Text>Participer</Text>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
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
    width: '100%',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  contentItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    textAlign: 'right',
    padding: 10,
    paddingRight: 15,
  },
  icons: {
    fontSize: 20,
    color: 'white',
    textAlign: 'right',
  },
});
