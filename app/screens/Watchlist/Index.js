import React, { Component } from "react";
import { View, Modal } from "react-native";
import {
	Container,
	Content,
	Footer,
	FooterTab,
	Button,
	Text
} from "native-base";

// Components:
import Header from "../../components/Header";
import List from "../../components/Watchlist/List";
import AddModal from "../../components/Watchlist/Add";

import { getLocalUser, cache } from "../../utils/common";

export default class Watchlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 600,
			change: "0%",
			portfolio: [],
			user: null,
			loggedIn: false,
			addModalVisible: false,
			exchanges: null,
			currencies: null,
			availableCurrencies: null
		};
		this.closeModal = this.closeModal.bind(this);
	}

	componentWillMount() {
		getLocalUser((err, user) => {
			if (user) {
				console.log("User is logged in", user);
				this.setState({ loggedIn: true, user });
				cache.availableCurrencies((err, availableCurrencies) =>
					this.setState({ availableCurrencies })
				);
				cache.currencies((err, currencies) =>
					this.setState({ currencies })
				);
				cache.exchanges((err, exchanges) =>
					this.setState({ exchanges })
				);
			} else {
				console.log("User is not logged in");
				this.props.navigation.navigate("Login");
			}
		});
	}

	componentDidMount() {}

	closeModal() {
		this.setState({ addModalVisible: false });
	}

	openModal() {
		this.setState({ addModalVisible: true });
	}

	render() {
		return (
			<Container>
				<Header {...this.props} title="Watchlist" hasTabs={false} />
				<Content>
					<List portfolio={this.state.portfolio} />
				</Content>
				<Footer>
					<FooterTab>
						<Button full onPress={() => this.openModal()}>
							<Text>Add</Text>
						</Button>
					</FooterTab>
				</Footer>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.addModalVisible}
					onRequestClose={() => {
						alert("Modal has been closed.");
					}}
				>
					<AddModal
						{...this.props}
						{...this.state}
						closeModal={this.closeModal}
					/>
				</Modal>
			</Container>
		);
	}
}
