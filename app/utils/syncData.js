import config from "../config.json";

// Available Currencies
export function syncAvailableCurrencies(params) {
	fetch(`${config.api.base}/api/data/currencies`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(response => {
			let currencies = response.currencies;
			if (currencies.length > 0) {
				storage.save({
					key: "availableCurrencies", // Note: Do not use underscore("_") in key!
					//id: '1001',	  // Note: Do not use underscore("_") in id!
					data: currencies
					//expires: 1000 * 60 * 24
				});
				console.log("Saved");
			} else {
				console.log("Currencies array seems to be empty");
			}
		});
}

// Currency Info
export function syncCurrencies(params) {
	fetch(`${config.api.base}/api/data/currencies-name`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(response => {
			let currencies = response.currencies;
			if (currencies) {
				storage.save({
					key: "currencies", // Note: Do not use underscore("_") in key!
					//id: '1001',	  // Note: Do not use underscore("_") in id!
					data: currencies
					//expires: 1000 * 60 * 24
				});
				console.log("Saved");
			} else {
				console.log("Currencies -Names array seems to be empty");
			}
		});
}

// Currency Info
export function syncExchanges(params) {
	fetch(`${config.api.base}/api/data/exchanges`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(response => {
			let exchanges = response.exchanges;
			if (exchanges) {
				storage.save({
					key: "exchanges", // Note: Do not use underscore("_") in key!
					//id: '1001',	  // Note: Do not use underscore("_") in id!
					data: exchanges
					//expires: 1000 * 60 * 24
				});
				console.log("Saved");
			} else {
				console.log("Exchanges array seems to be empty");
			}
		});
}
