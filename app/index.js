/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, View } from "react-native";

import {
	Container,
	Header,
	Left,
	Body,
	Right,
	Button,
	Icon,
	Title,
	Text,
	StyleProvider
} from "native-base";

// Themes
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";

import Router from "./config/router";

// Drawer
import { Drawer } from "native-base";
import DrawerContent from "./components/DrawerContent";

// Storage
import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";
// Sync Services
import {
	syncAvailableCurrencies,
	syncCurrencies,
	syncExchanges
} from "./utils/syncData";

export default class App extends Component {
	render() {
		return (
			<StyleProvider style={getTheme(material)}>
				<Router />
			</StyleProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF"
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	},
	instructions: {
		textAlign: "center",
		color: "#333333",
		marginBottom: 5
	}
});

// Global Storage
var storage = new Storage({
	size: 10000, // maximum capacity, default 1000
	storageBackend: AsyncStorage,

	// expire time, default 1 day(1000 * 3600 * 24 milliseconds).
	// can be null, which means never expire.
	defaultExpires: null,

	// cache data in the memory. default is true.
	enableCache: true,

	// if data was not found in storage or expired,
	// the corresponding sync method will be invoked and return
	// the latest data.
	sync: {
		availableCurrencies(params) {
			syncAvailableCurrencies(params);
		},
		currencies(params) {
			syncCurrencies(params);
		},
		exchanges(params) {
			syncExchanges(params);
		}
	}
});

global.storage = storage;
