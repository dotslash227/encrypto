import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
import {
	Container,
	Content,
	List,
	ListItem,
	Text,
	Icon,
	Left,
	Body,
	Right,
	Switch
} from "native-base";

export default class Settings extends Component {
	render() {
		return (
			<Container>
				<Header {...this.props} title="Settings" />
				<Content style={styles.content}>
					<List style={styles.singleList}>
						<ListItem icon>
							<Body>
								<Text>Feedback / Support</Text>
							</Body>
							<Right>
								<Icon name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Body>
								<Text>About Us</Text>
							</Body>
							<Right>
								<Icon name="arrow-forward" />
							</Right>
						</ListItem>
					</List>

					<List style={styles.singleList}>
						<ListItem icon>
							<Body>
								<Text>Rate Us</Text>
							</Body>
							<Right>
								<Icon name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Body>
								<Text>v1.0</Text>
							</Body>
						</ListItem>
					</List>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: "#F0EFF5"
	},
	singleList: {
		marginTop: 20,
		marginBottom: 20,
		backgroundColor: "#fff"
	}
});
