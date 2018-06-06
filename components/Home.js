import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ImageBackground, Platform } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Entypo, MaterialIcons, Foundation } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Constants, Location, Permissions, AppLoading, Font } from 'expo';
import axios from 'axios';
import Moment from 'moment';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      loading: true,
      location: [],
      errorMessage: null,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });

    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: ' Oops, this will not work on Sketch in an Android emulator. Try it on your device !',
      });
    } else {
      this.getLocationAsync();
      this.setState({ loading: false });
    }
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    console.log('==== 1. location ====', this.state.location);
    this.getEventFromAPI();
  };

  getEventFromAPI = () => {
    const apiURL = 'https://public.opendatasoft.com/api/';
    const optionsURL = 'records/1.0/search/?dataset=evenements-publics-cibul&facet=tags&facet=placename&facet=department&facet=region&facet=city';
    const dateStart = '&facet=date_start';
    const dateEnd = '&facet=date_end';
    const otherOptions = '&facet=pricing_info&facet=updated_at&facet=city_district&refine.date_start=2018%2F06';
    const userLocation = `&geofilter.distance=${this.state.location.coords.latitude}%2C${this.state.location.coords.longitude}%2C30000`;

    axios.get(apiURL + optionsURL + dateStart + dateEnd + otherOptions + userLocation)
      .then((response) => {
        this.setState({ eventList: response.data.records });
        console.log('==== 2. eventlist ====', this.state);
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
    if (this.state.loading) {
      return <AppLoading />;
    }
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

              <TouchableHighlight onPress={this.onItemPress} underlayColor='transparent' activeOpacity={0.7}>

                <ImageBackground
                  style={[styles.item, styles.image]}
                  source={{ uri: item.fields.image }}
                >

                <View style={styles.content}>
                  <Text style={styles.title}>
                    {item.fields.title.toUpperCase()}
                  </Text>


                    <View style={styles.contentItem}>
                      <Text style={styles.text}>{item.fields.city}</Text>
                      <Entypo name="location-pin" style={styles.icons} />
                    </View>

                    <View style={styles.contentItem}>
                      <Text style={styles.text}>{item.fields.date_start}</Text>
                      <MaterialIcons name="date-range" style={styles.icons} />
                    </View>

                    <View style={styles.contentItem}>
                      <Text style={styles.text}>
                        {Moment(item.fields.timetable, 'YYYY-MM-DDTHH: mm: ss').format('HH:mm')}
                      </Text>
                      <Foundation name="clock" style={styles.icons} />
                    </View>

                    </View>
                  </ImageBackground>
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
  },
  item: {
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#5f27cd',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,.5)',
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
