const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const { method, originalUrl, timestamp } = req;
  console.log(`${method} to ${originalUrl} to ${timestamp}`);
  next();
}

server.use(logger);

module.exports = server;
