export function formatRate(x) {
	x = parseFloat(x);
	if(typeof(x) === "number") x = x.toFixed(2);
	x = x.toString();
	var afterPoint = "";
	if (x.indexOf(".") > 0) afterPoint = x.substring(x.indexOf("."), x.length);
	x = Math.floor(x);
	x = x.toString();
	var lastThree = x.substring(x.length - 3);
	var otherNumbers = x.substring(0, x.length - 3);
	if (otherNumbers != "") lastThree = "," + lastThree;
	var res =
		otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
	return res;
}

export function getINRSymbol() {
	return <Text>&#8377;</Text>;
}

export function getLocalUser(callback) {
	storage
		.load({
			key: "user"
			//autoSync: true,
			//syncInBackground: true
		})
		.then(user => {
			return callback(null, user);
		})
		.catch(e => {
			console.log(e);
			return callback(e, null);
		});
}

export function loginUser({ userId, name, token }, callback) {
	storage
		.save({
			key: "user",
			data: {
				userId,
				name,
				token
			}
		})
		.then(r => {
			return callback();
		});
}

export function logoutUser(callback) {
	storage
		.remove({
			key: "user"
		})
		.then(r => {
			return callback();
		});
}

export function getCacheUsingKey(key, callback) {
	storage
		.load({
			key: key,
			autoSync: true,
			syncInBackground: true
		})
		.then(ret => {
			return callback(null, ret);
		})
		.catch(e => callback(e, null));
}

let containers = ["availableCurrencies", "exchanges", "currencies"];

export const cache = {
	availableCurrencies: function(callback) {
		getCacheUsingKey("availableCurrencies", function(err, data) {
			return callback(err, data);
		});
	},
	exchanges: function(callback) {
		getCacheUsingKey("exchanges", function(err, data) {
			return callback(err, data);
		});
	},
	currencies: function(callback) {
		getCacheUsingKey("currencies", function(err, data) {
			return callback(err, data);
		});
	}
};
