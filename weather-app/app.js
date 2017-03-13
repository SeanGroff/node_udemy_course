const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=817%20sw%20highland%20ave%20grain%20valley',
  json: true,
}, (error, response, body) => {
  /**
   * @param value to convert to a JSON string.
   * @param filter params to show, undefined shows all.
   * @param number of spaces to use for readability.
   */
  console.log(JSON.stringify(body, undefined, 2));
});
