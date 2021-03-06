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
import moment from "moment";

import {
	CustomTabs,
	ANIMATIONS_SLIDE,
	ANIMATIONS_FADE
  } from "react-native-custom-tabs";

class SinglePost extends Component {

	openURL(url) {
		CustomTabs.openURL(url, {
			toolbarColor: "#021B79",
			showPageTitle: true,
			animations: {
				startEnter: "slide_in_bottom",
				startExit: "slide_out_bottom",
				endEnter: "slide_in_bottom",
				endExit: "slide_out_bottom"
			  }
		}).then((launched) => {
			console.log(`Launched custom tabs: ${launched}`);
		}).catch(err => {
			console.error(err)
		});
	}

	render() {
		return (
			<ListItem button onPress={() => this.openURL(this.props.url)}>
				<Thumbnail
					square
					size={80}
					source={{ uri: this.props.thumbnail }}
					style={{ width: 40, height: 40 }}
				/>
				<Body>
					<Text
						ellipsizeMode="tail"
						numberOfLines={2}
						style={{ color: "#324152" }}
					>
						{this.props.title}
					</Text>
					<Text note style={{ color: "#404E5E" }}>
						{this.props.source} | {moment(this.props.time).fromNow()}
					</Text>
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
			posts: [],
			error: null
		};
	}

	componentDidMount() {
		fetch("https://www.reddit.com/r/CryptoMarkets/new.json?sort=new", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(response => {
				if (
					response &&
					response.data &&
					response.data.children &&
					response.data.children.length > 0
				) {
					let posts = [];
					const filtered = response.data.children.filter(
						post => post.kind === "t3"
					);
					console.log({ filtered });
					filtered.forEach(post => {
						posts.push({
							title: post.data.title,
							source: post.data.domain,
							url: post.data.url,
							time: post.data.created_utc * 1000,
							thumbnail: post.data.thumbnail
								? post.data.thumbnail
								: "https://a.thumbs.redditmedia.com/WWuKgvJ08Ak7ccBfNFyER2nKxY-pqvcLzCSfTuo4ag4.jpg"
						});
					});
					console.log({ posts });
					this.setState({ loading: false, posts });
				} else {
					this.setState({ loading: false, error: "Something went wrong." });
				}
			})
			.catch(e => {
				console.log(e);
				this.setState({ loading: false, error: "Something went wrong." });
			});
	}

	render() {
		let content = null;
		if (this.state.loading) {
			content = <Spinner />;
		} else if (this.state.error) {
			content = <Text>{this.state.error}</Text>;
		} else {
			content = (
				<List
					dataArray={this.state.posts}
					renderRow={post => <SinglePost {...post} />}
				/>
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
