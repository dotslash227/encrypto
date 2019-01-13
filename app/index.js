/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, View } from "react-native";

import { StyleProvider, Root } from "native-base";

// Themes
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";

import Router from "./config/router";
import config from "./config.json";

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
	syncExchanges,
	syncMarketCap
} from "./utils/syncData";

import { getCacheUsingKey } from "./utils/common";

import OneSignal from 'react-native-onesignal';

import Instabug from 'instabug-reactnative';

// Storage:
// Global Storage
var storage = new Storage({
	size: 10000, // maximum capacity, default 1000
	storageBackend: AsyncStorage,

	// expire time, default 1 day(1000 * 3600 * 24 milliseconds).
	// can be null, which means never expire.
	defaultExpires: 1000 * 3600 * 24 * 7, // 7 Days

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
		},
		marketCap(params) {
			syncMarketCap(params);
		}
	}
});

/* storage.remove({
	key: 'marketCap'
}); */

console.log("Loading introScreen");
storage.load({key: "introScreen"})
.then(data => {
	console.log({data});
}).catch(e => {
	console.log({e});
});

global.storage = storage;

// Initial Sync
getCacheUsingKey("marketCap", () => {});
getCacheUsingKey("availableCurrencies", () => {});
getCacheUsingKey("currencies", () => {});
getCacheUsingKey("exchanges", () => {});
// Initial Sync END

export default class App extends Component {

	componentWillMount() {
		OneSignal.init(config.onesignal.appId);
	
	  OneSignal.addEventListener('received', this.onReceived);
	  OneSignal.addEventListener('opened', this.onOpened);
	  OneSignal.addEventListener('ids', this.onIds);

	  // Instabug:
	  Instabug.startWithToken('04c9efb1be90c705fbaf774d5df01e8d', [Instabug.invocationEvent.shake]);
  }

  componentWillUnmount() {
	  OneSignal.removeEventListener('received', this.onReceived);
	  OneSignal.removeEventListener('opened', this.onOpened);
	  OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
	  console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
	console.log('Message: ', openResult.notification.payload.body);
	console.log('Data: ', openResult.notification.payload.additionalData);
	console.log('isActive: ', openResult.notification.isAppInFocus);
	console.log('openResult: ', openResult);
  }

  onIds(device) {
	  console.log('Device info: ', device);
  }

	render() {
		return (
			<Root>
				<StyleProvider style={getTheme(material)}>
					<Router />
				</StyleProvider>
			</Root>
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
