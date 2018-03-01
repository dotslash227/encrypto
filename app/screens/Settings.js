import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import { Container, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';

export default class Settings extends Component {
  render() {
    return (
		<Container>
        <Header {...this.props} title="Settings" />
        <Content>
          <List>
            <ListItem icon>
              <Left>
                <Icon name="plane" />
              </Left>
              <Body>
                <Text>Airplane Mode</Text>
              </Body>
              <Right>
                <Switch value={false} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="wifi" />
              </Left>
              <Body>
                <Text>Wi-Fi</Text>
              </Body>
              <Right>
                <Text>wirddin</Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="bluetooth" />
              </Left>
              <Body>
                <Text>Bluetooth</Text>
              </Body>
              <Right>
                <Text>On</Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
