import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Header from "../components/Header";

export default class News extends Component {
    render() {
      return (
        <Header headerText={"News"} />
      )
    }
}
