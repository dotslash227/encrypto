export function formatRate(x) {
	x = x.toString();
	var afterPoint = "";
	if (x.indexOf(".") > 0) afterPoint = x.substring(x.indexOf("."), x.length);
	x = Math.floor(x);
	x = x.toString();
	var lastThree = x.substring(x.length - 3);
	var otherNumbers = x.substring(0, x.length - 3);
	if (otherNumbers != "") lastThree = "," + lastThree;
	var res =
		otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
		lastThree +
		afterPoint;
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
