import { StyleSheet, Text, View, ImageBackground, Platform, Animated } from 'react-native';
import React, { Component } from 'react';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Entypo, MaterialIcons, Foundation } from '@expo/vector-icons';
import { Icon } from 'native-base';
import { Constants, Location, Permissions, AppLoading, Font } from 'expo';
import axios from 'axios';
import Moment from 'moment';

import AppHeader from '../appHeader';

const Row = ({ item }) => (
  <RectButton style={styles.rectButton}>

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
          <Foundation name="clock" style={[styles.icons, { paddingRight: 12 }]} />
        </View>

        </View>
      </ImageBackground>
  </RectButton>
);

const SwipeableRow = ({ item, index }) => {
  return (
    <StyleSwipeableRow>
      <Row item={item} />
    </StyleSwipeableRow>
  );
};

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

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
    return (

        <View style={styles.container}>

          <AppHeader navigation={this.props.navigation} />

           <FlatList
              data={ this.state.eventList }
              ItemSeparatorComponent={this.EventListItemSeparator}
              renderItem={({ item, index }) => (
                <SwipeableRow item={item} index={index} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
  }
}

/*** STYLE ANIMATION ***/

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class StyleSwipeableRow extends Component {
  renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <AnimatedIcon
          name="md-checkmark-circle-outline"
          size={60}
          style={[styles.actionIcon, { color: '#388e3c', transform: [{ scale }, { translateX: trans }] }]}
        />
      </RectButton>
    );
  };
  renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const trans = dragX.interpolate({
      inputRange: [-101, -100, -50, 0],
      outputRange: [-1, 0, 0, 20],
    });
    return (
      <RectButton style={styles.rightAction} onPress={this.close}>
        <AnimatedIcon
          name="md-close-circle"
          size={60}
          style={[styles.actionIcon, { color: '#dd2c00', transform: [{ scale }, { translateX: trans }] }]}
        />
      </RectButton>
    );
  };

  updateRef = (ref) => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={80}
        rightThreshold={40}
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#f0f9fa',
    justifyContent: 'center',
  },
  actionIcon: {
    width: 60,
    marginHorizontal: 10,
    fontSize: 50,
  },
  rightAction: {
    alignItems: 'flex-end',
    backgroundColor: '#f0f9fa',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
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
    paddingLeft: 10,
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
    paddingRight: 10,
  },
  itemBack: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  iconsBackContainer: {
    backgroundColor: '#ecf0f1',
    borderRadius: 50,
    elevation: 6,
  },
  iconsBack: {
    fontSize: 30,
    color: 'black',
  },
});
