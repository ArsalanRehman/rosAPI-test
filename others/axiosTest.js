const axios = require('axios');
var element = [];
function callAPI(endpoint) {
  axios
    .get(endpoint)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
}
