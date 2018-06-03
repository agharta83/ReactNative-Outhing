import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import * as firebase from 'firebase';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const customEvent = firebase.database().ref('customEvent');

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: [],
      loading: true,
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  componentDidMount() {
    customEvent.on('value', snapshot => {
      this.setState({
        eventsList: snapshot.val(),
      })
    })
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
        <Header style={styles.header}    >
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
             <Title>Header</Title>
           </Body>
           <Right style={styles.right}>
            <Button><Icon name='menu' /></Button>
           </Right>
         </Header>
        <FlatList
          data={ this.state.eventsList }
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
              <Text style={styles.price}>{item.price} €</Text>
            </View>}
         />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#341f97'
  },
  body: {
    flex: 1,
    paddingRight: 55
  },
  right: {
    flex: 1,
    display: 'none'
  },
  left: {
    flex: 1
  },
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
