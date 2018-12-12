

/**
 * This class connects to our server and uploads the image to our server class.
 */
class ImageCapture {

  constructor(server_address) {
    this.server_address = server_address;
    this.fetch = this.fetch.bind(this);
    this.uploadImageToServer = this.uploadImageToServer.bind(this);
  }

  uploadImageToServer(data) {
    console.log("DATA: ", data);
    return fetch(this.getServerAddress() + `/upload-image/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      body: data
    }).then((res) => {
      // Return the res to the function
      return res;
    })
    .catch((err) => {
      console.error(err);
    })
  }

  getServerAddress() {
    return this.server_address;
  }


  /**
   * fetch - Custom fetch function that captures error
   *
   * @param  {type} url takes the url params
   * @return {type}     description
   */
   /**
 	 * fetch - Calls the server with the correct JWT token that is in the stored in the session
 	 *
 	 * @param  {type} url     the url of the server we are querying
 	 * @param  {type} options the options that are associated with the url endpotin
 	 * @return {JSON}         the response.json
 	 */
 	fetch(url, options) {
 		// performs api calls sending the required authentication headers
 		const headers = {
 			"Accept": "application/json",
 			"Content-Type": "application/json"
 		};

 		return fetch(url, {
 			headers,
 			...options
 		})
 			.then(this._checkStatus)
 			.then((response) => response.json())
 			.catch((err) => {
 				console.error(err);
 			});
  }

  	/**
  	 * _checkStatus - Checks the status of the response. Called with the fetch api
  	 *
  	 * @param  {type} response Response from the server for login
  	 * @return {type}
     * @throws {error} Error
  	 */
  	_checkStatus(response) {
  		// raises an error in case response status is not a success
  		if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
  			return response;
  		} else {
  			var error = new Error(response.statusText);
  			console.log("Response: " + JSON.stringify(response));
  			error.response = response;
  			throw error;
  		}
  	}

}

export default ImageCapture;
