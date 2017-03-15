const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const getWeather = weather.getWeather;
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address)
  .then(({ latitude, longitude }) => getWeather(latitude, longitude))
  .then(({ temperature, apparentTemperature }) =>
    console.log(
      `It's currently ${parseInt(temperature, 10)} degrees. It feels like ${parseInt(apparentTemperature, 10)} degrees.`
    ))
  .catch(err => console.log(err));
