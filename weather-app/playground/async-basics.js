console.log('Starting app');

setTimeout(() => {
  console.log('Inside of callback');
}, 2000);

setTimeout(() => {
  console.log('What happens with a 0 timeout?');
  // Fires after "finishing up" because of the Call Stack & Event Loop
}, 0);

const cb = (name) => console.log(`${name}, this is a callback test`);
const test = (callbackFunction) => callbackFunction('Sean');
test(cb);

console.log('Finishing up');
