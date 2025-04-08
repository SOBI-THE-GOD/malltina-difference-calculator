const requestBuilder = (fetchBody) => {
	return [
		"https://api.malltina.com/api/v1/asia-shop/compute-cost",
		{
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(fetchBody),
			method: "POST",
		},
	];
};
function RequestBody(country, price, weight) {
	this.country = country;
	this.price = price;
	this.weight = weight;
}
const makeRequest = (reqArray) => {
	return reqArray.map((req) => {
		return requestBuilder(new RequestBody(...req));
	});
};

export { makeRequest };
