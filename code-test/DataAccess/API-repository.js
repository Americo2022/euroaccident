/**
 * Class APIRepository contains a method for APIRequests
 * It take in its constructor the end point where the request will be send
 *
 */
class APIRepository {
	constructor(endpoint) {
		this.endpoint = endpoint;
	}

	/**
	 * Get method will send a GET request to the API
	 * and can receive queries via apiQuery parameter
	 * If the request is wrong undefined will be send to the caller method
	 * and a helper console log message will be send to the browser for debugging,
	 * @param {*} apiQuery
	 * @returns
	 */
	async get(apiQuery) {
		let query = apiQuery ? apiQuery : '';

		try {
			const getReponse = await fetch(
				`https://my-json-server.typicode.com/proactivehealth/work-test-sample/${query}`,
				{
					method: 'GET',
				}
			);
			return getReponse.json();
		} catch (error) {
			console.log(error.message);
			return undefined;
		}
	}
}
