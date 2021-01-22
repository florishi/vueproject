// require packages
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const fileUpload = require('express-fileupload')
const FileType = require('file-type');

require('dotenv').config();

// initiate
const app = express();

// set middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())

// set handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// map routers
app.use('/dashboard', require('./routes/dashboard'));
app.use('/', require('./routes/html'));

// connect server
// need to wrap this in the db sync function so server connects when database connected
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('I am running on port', PORT);
});