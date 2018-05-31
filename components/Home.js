import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Entypo, MaterialIcons, Foundation } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import axios from 'axios';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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

  componentDidMount() {
    axios.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&facet=updated_at&facet=city_district&refine.date_start=2018%2F06&geofilter.distance=43.208178746742924%2C6.090545654296875%2C28369.55163075742')
      .then((response) => {
        console.warn(response.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  EventListItemSeparator = () => (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
  )

  onItemPress = () => (
    console.warn('touch!')
  )

  render() {
    return (

        <View style={styles.container}>

          <SwipeListView
            useFlatList
            data={ this.state.EventList }
            ItemSeparatorComponent={this.EventListItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>

              <TouchableHighlight onPress={this.onItemPress} underlayColor='#5f27cd' activeOpacity={0.7}>

                <View style={styles.item}>

                  <Text style={styles.title}>
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
              </TouchableHighlight>
              }
          renderHiddenItem={({ item }) => (
            <View style={styles.itemBack}>
              <Text>Ne pas participer</Text>
              <Text>Participer</Text>
            </View>
          )}
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
    backgroundColor: '#5f27cd',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
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
    color: 'white',
  },
  text: {
    fontSize: 14,
    color: 'white',
    textAlign: 'right',
    padding: 10,
    paddingRight: 15,
  },
  icons: {
    fontSize: 20,
    color: 'white',
    textAlign: 'right',
  },
  itemBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
});
