/**
 * Main class to make request to API repository
 * I uses generics to accept different parameter's type
 */
export abstract class MainRepository<T> {
	// protected to make available on derivaded classes
	protected endPoint: string;

	constructor(endPoint: string) {
		this.endPoint = endPoint;
	}

	/**
	 * Method to get all requested items from the API repository asynchronous (other tasks doesn't need to wait until the request is finished)
	 *
	 * @param query = can be used to request specific data from repository
	 * @returns It return an array to the caller method
	 */

	public async get(query?: string): Promise<T[]> {
		let queryString: string = query ? query : '';
		// Try to make the request, if the response is ok send the result to the caller method
		// otherwise return an empty array and print the error to the console for debugging
		try {
			const getAllResponse = await fetch(`${this.baseUrl()}${this.endPoint}${queryString}`, {
				method: 'GET',
			});
			const result: T[] = await getAllResponse.json();
			return result;
		} catch (error) {
			console.error(error.message);
			return [] as T[];
		}
	}

	/**
	 * Method to get an item by its id
	 * @param id A numberic value used to find a specific item
	 * @returns
	 */
	public async findOne(id: number): Promise<T> {
		if (!id) {
			return undefined;
		}
		// Try to make the request, if the response is ok send the result to the caller method
		// otherwise return undefined and print the error to the console for debugging

		try {
			const findOneResponse: Response = await fetch(`${this.baseUrl()}${this.endPoint}?id=${id}`, {
				method: 'GET',
			});
			const result: T = await findOneResponse.json();
			return await result;
		} catch (error) {
			console.error(error.message);
			return undefined;
		}
	}

	/**
	 * Protected since no one outside the class should has access to it
	 * @returns a string with the API url
	 */
	protected baseUrl(): string {
		return 'https://my-json-server.typicode.com/proactivehealth/work-test-sample/';
	}
}
