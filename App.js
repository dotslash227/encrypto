/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';

import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
      <Container>
              <Header>
                <Left>
                  <Button transparent>
                    <Icon name='arrow-back' />
                  </Button>
                </Left>
                <Body>
                  <Title>Header</Title>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Cancel</Text>
                  </Button>
                </Right>
              </Header>
            </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
