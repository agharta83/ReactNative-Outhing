import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Entypo, MaterialIcons, Foundation } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import axios from 'axios';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
    };
  }

  componentDidMount() {
    axios.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&facet=updated_at&facet=city_district&refine.date_start=2018%2F06&geofilter.distance=43.208178746742924%2C6.090545654296875%2C28369.55163075742')
      .then((response) => {
        this.setState({ eventList: response.data.records });
        console.warn(this.state.eventList);
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
               <Title>Suggestions</Title>
             </Body>
             <Right style={styles.right}>
              <Button><Icon name='menu' /></Button>
             </Right>
           </Header>

          <SwipeListView
            useFlatList
            data={ this.state.eventList }
            ItemSeparatorComponent={this.EventListItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>

              <TouchableHighlight onPress={this.onItemPress} underlayColor='#5f27cd' activeOpacity={0.7}>

                <View style={styles.item}>

                  <Text style={styles.title}>
                  {item.fields.title}
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
  header: {
    backgroundColor: '#341f97',
  },
  body: {
    flex: 1,
    paddingRight: 55,
  },
  right: {
    flex: 1,
    display: 'none',
  },
  left: {
    flex: 1,
  },
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
    fontSize: 16,
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
