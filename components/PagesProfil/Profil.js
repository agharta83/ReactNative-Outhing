import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardItem, Body, Text, Thumbnail, Content } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default class Profil extends Component {
  render() {
    return (

        <Content>
          <Card>
            <CardItem>
              <Body>
                <View style={styles.body}>
                  <View style={styles.photo}>
                    <Thumbnail style={styles.thumbnail} source={{ uri: 'https://www.jokeme.fr/images/simpson-marge.jpg' }} />
                    <MaterialIcons style={styles.iconAddPhoto} name="add-a-photo" />
                  </View>
                  <View style={styles.profilInfos}>
                    <Text style={styles.profilName}>Nom Prénom</Text>
                    <Text style={styles.profilText}>(pseudo)</Text>
                    <Text style={styles.profilText}>Ville</Text>
                  </View>
                </View>
                <View style={styles.preference}>
                  <Text>Item 1</Text>
                  <Text>Item 2</Text>
                  <Text>Item 3</Text>
                </View>
                <View>
                  <Text>Vous avez participé à ??? évenements.</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
        </Content>

    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  photo: {
    flex: 1,
  },
  thumbnail: {
    width: 85,
    height: 85,
    borderWidth: 1,
    borderColor: 'black',
  },
  iconAddPhoto: {
    alignSelf: 'center',
    fontSize: 18,
  },
  profilInfos: {
    flex: 1,
    alignItems: 'center',
  },
  profilName: {
    fontSize: 22,
  },
  profilText: {
    fontSize: 16,
  },
  preference: {
    flex: 1,
    padding: 10,
    marginVertical: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'black',
  },
});
