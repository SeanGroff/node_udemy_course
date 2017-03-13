const fs = require('fs');

/**
 *  1) pass JS object to be written to a file
 *  2) write to file
 *  3) grab an object property from the file
 *  4) log to the console said property
 */
const originalObj = {
  name: 'Bob',
  age: 100
};
// stringify JS object
const objStringified = JSON.stringify(originalObj);
// write to file
fs.writeFile('./example.json', objStringified, (err) => {
  if (err) console.log('Unable to write to file ', err);
});
// read file
fs.readFile('./example.json', 'utf8', (err, data) => {
  if (err) {
    console.log('Unable to read file ', err);
  } else {
    // parse string to JS object
    const strFromFile = JSON.parse(data);
    console.log('Users name is: ', strFromFile.name);
  }
});
