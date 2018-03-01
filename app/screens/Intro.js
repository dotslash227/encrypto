import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320
  },
  text: {
    color: "#333",
    backgroundColor: "transparent",
    textAlign: "center",
    paddingHorizontal: 16
  },
  title: {
    fontSize: 22,
    color: "#000000",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 16
  }
});

const slides = [
  {
    key: "somethun",
    title: "Title 1",
    text: "Description.\nSay something cool",
    image: require("./../assets/1.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#E1E1E1",
    textStyle: styles.text,
    titleStyle: styles.title
  },
  {
    key: "somethun-dos",
    title: "Title 2",
    text: "Other cool stuff",
    image: require("./../assets/1.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#E1E1E1",
    textStyle: styles.text,
    titleStyle: styles.title
  },
  {
    key: "somethun1",
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("./../assets/1.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#E1E1E1",
    textStyle: styles.text,
    titleStyle: styles.title
  }
];

export default class Intro extends Component {
  componentWillMount() {
    storage.load({ key: "introScreen" })
    .then(data => {
      if(data && data.seen) {
        this.props.navigation.navigate("Home");
      }
    })
    .catch(e => console.log(e));
  };

  markAsSeen = () => {
    storage.save({
      key: 'introScreen',   // Note: Do not use underscore("_") in key!
      data: { 
        seen: true
      }
    });
  };

  _onDone = () => {
    this.markAsSeen();
    this.props.navigation.navigate("Home");
  };

  _onSkip = () => {
    this.markAsSeen();
    this.props.navigation.navigate("Home");
  };
  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={this._onDone}
        onSkip={this._onSkip}
        showSkipButton={true}
      />
    );
  }
}
