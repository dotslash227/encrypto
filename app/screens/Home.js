import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

export default class Home extends Component {
  render() {
    return (
      <View>
        <Header {...this.props} />
        <Text>Home Screen</Text>
      </View>
    );
  }
}
