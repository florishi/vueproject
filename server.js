// require packages
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// require files
//const db = require('./config/db');

// initiate
const app = express();

// set middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// set handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// map routers
app.use('/dashboard', require('./routes/dashboard'));
app.use('/history', require('./routes/history'));
app.use('/', require('./routes/html'));

// connect server
// need to wrap this in the db sync function so server connects when database connected
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('I am running on port', PORT);
});