const express = require('express');

const server = express();

// http://expressjs.com/en/guide/using-template-engines.html
// Note: you can omit the file extension because we set the view engine
server.set('view engine', 'hbs');
server.use(express.static(`${__dirname}/public`));

server.get('/', (req, res) => {
  res.render('welcome', {
    title: 'Welcome',
    welcomeMessage: 'Welcome to my website powered by Express.js!',
    year: new Date().getFullYear(),
  });
});

server.get('/about', (req, res) => {
  // defaults to looking in thew /views directory
  res.render('about', {
    title: 'About',
    text: 'Cool dynamic text!',
    year: new Date().getFullYear(),
  });
});

server.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to display page',
  });
});

server.listen(3000, () => {
  console.log('Server is up at port 3000');
});
