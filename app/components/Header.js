import React, { Component } from "react";
import { View } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text
} from "native-base";

export default class MainHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
            <Icon name="md-menu" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title || "Incrypto"}</Title>
        </Body>
        <Right>
        </Right>
      </Header>
    );
  }
}
