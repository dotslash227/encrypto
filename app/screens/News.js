import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, List, ListItem, Thumbnail, Text, Body, Spinner } from 'native-base';
import Header from "../components/Header";
import moment from "moment";

const samplePosts = [
  {
    title: "Hello, World!",
    source: "TechCrunch",
    time: "2018-03-01T19:39:37.567Z"
  },
  {
    title: "Hello, World!",
    source: "TechCrunch",
    time: "2018-03-01T19:39:37.567Z"
  },
  {
    title: "Hello, World!",
    source: "TechCrunch",
    time: "2018-03-01T19:39:37.567Z"
  }
];

class SinglePost extends Component {
  render() {
    return (
      <ListItem>
      <Thumbnail
        square
        size={80}
        source={{ uri: "https://via.placeholder.com/40x40" }}
        style={{ width:40, height: 40 }}
      />
      <Body>
        <Text>{this.props.title}</Text>
        <Text note>{this.props.source} | { moment(this.props.time).fromNow()}</Text>
      </Body>
    </ListItem>
    );
  }
}

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      posts: samplePosts
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false});
    }, 1000);
  }

  render() {
    let content = null;
    if(this.state.loading) {
      content = <Spinner color='blue' />;
    } else {
      content = (
        <List dataArray={this.state.posts}
            renderRow={post => <SinglePost {...post} /> }>
          </List>
      );
    }
    return (
      <Container>
        <Header {...this.props} title="News" />
        <Content>{content}</Content>
      </Container>
    );
  }
}
