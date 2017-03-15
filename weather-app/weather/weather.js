const request = require('request');


const getWeather = (lat, lng) => new Promise((resolve, reject) => {
  const key = 'd751594408e43019dfc702c25342e0e5';
  request({
    url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
    json: true,
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      resolve({
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
      });
    } else {
      reject('Unable to fetch weather, please try again later.')
    }
  });
});

module.exports = {
  getWeather,
};
