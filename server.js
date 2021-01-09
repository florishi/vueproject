const express = require('express');

const app = express();

const PORT = 3000;

app.listen(PORT, function() {
  console.log('Hello and welcome to project 2 express server');
  console.log('I am running on port', PORT);
});
