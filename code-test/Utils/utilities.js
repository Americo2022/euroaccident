/**
 * Class Utilities contains a serie of methods intended to
 * make API requests and template generation.
 *
 */
class Utilities {
	/**
	 * Method to read user input and dynamically show or hide
	 * sections of the DOM
	 * @param {*} userName = The username entered by the user on the login form
	 */
	checkUser = async (userName) => {
		// Create a instance of the API class
		let apiRepository = new APIRepository();

		// Prepare the query to be send
		let query = `users?login=${userName}`;

		// Call the get method from the APIrepository class to send
		// the request to the API
		apiRepository.get(query).then((response) => {
			if (response.length > 0) {
				document.querySelector('#loginContainer').style.display = 'none'; // hide login form if use is found
				this.fetchUserInsurances(response); // send response from request to fetchUserInsurances
			} else {
				// Show error message if the user is not found or if nothing was provided in the login form
				utilities.showErrorMessage();
			}
		});
	};

	showErrorMessage = () => {
		document.getElementById('errorMessage').style.display = 'block'; // display error message
	};

	/**
	 * Get a user object and extract its id and name
	 * Create a instance of the API class
	 * Prepare the query to be send
	 * Find in the response the object that match with the user's id and send it to
	 * renderDetails()
	 * @param {*} userData = a object representing a user
	 */
	fetchUserInsurances = (userData) => {
		let apiRepository = new APIRepository();
		let user = userData;
		let id;
		let name;
		user.map((user) => {
			id = user.id;
			name = user.name;
		});
		let query = `user_insurances`;
		apiRepository.get(query).then((response) => {
			for (let x in response) {
				if (x === id.toString()) {
					this.renderDetails(name, response[x]);
				}
			}
		});
	};

	/**
	 * Method to generate the html that will contains the markup for the list of insurances
	 * Create a instance of the API class
	 * Prepare the query to be send
	 * Use map agains the response if the response is larger than 1 to create the markup
	 * Send the generate markup to renderTemplate()
	 * @param {*} userName = the name of ther user
	 * @param {*} userInsurances = object containing user's insurances
	 */
	renderDetails = (userName, userInsurances) => {
		let apiRepository = new APIRepository();
		let template = `<div class="header"><h3>${userName}</h3><button onclick="window.location.reload();" class="button" type="button">Logga ut</button></div>`;
		userInsurances.forEach((element) => {
			let query = `insurances?id=${element}`;
			apiRepository.get(query).then((response) => {
				if (response.length > 0) {
					response.map((insurance) => {
						template += `<div class="card" key=${insurance.id}>
			                                         <h3>${insurance.title}</h3>
			                                         <h4>${insurance.preamble}</h4>
			                                         <p>${insurance.body}</p>
			                                         <a href="${insurance.url}">Läs mer</a>
			                                     </div>`;

						this.renderTemplate(template, document.getElementById('insurancesDetail'));
					});

					document.getElementById('insurancesDetail').style.display = 'block';
				}
			});
		});
	};

	/**
	 * Add the template to the DOM element contained on the node parameter
	 * @param {*} template = markup to append
	 * @param {*} node = element in the DOM
	 * @returns DOM element
	 */
	renderTemplate = (template, node) => {
		return (node.innerHTML = template);
	};
}
