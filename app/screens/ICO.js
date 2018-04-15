import React, { Component } from "react";
import { View, Linking } from "react-native";
import {
	Container,
	Content,
	List,
	ListItem,
	Thumbnail,
	Text,
	Body,
	Spinner,
	Button,
	Tabs,
	Tab
} from "native-base";
import Header from "../components/Header";
import ComingSoon from "../components/ComingSoon";
import moment from "moment";

export default class ICO extends Component {
	render() {
		return (
			<Container>
				<Header {...this.props} title="Encrypto ICO" />
				<Content>
					<ComingSoon />
				</Content>
			</Container>
		);
	}
}
