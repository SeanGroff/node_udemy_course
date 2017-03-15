const request = require('request');

const geocodeAddress = (address) => new Promise((resolve, reject) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
    json: true,
  }, (error, response, body) => {
    if (error) {
      reject('There is an issue with the Google Maps API, please try again later.');
    } else if (body.status === 'ZERO_RESULTS') {
      reject('Improper data provided to the API, please fix and try again.');
    } else if (body.status === 'OK') {
      resolve({
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
      });
    } else {
      reject('There is an issue with the Google Maps API, please try again later.');
    }
  });
});

module.exports = {
  geocodeAddress,
}
