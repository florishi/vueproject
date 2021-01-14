const express = require('express');
const router = express.Router();

// route for home page
router.get('/', (req, res) => {
  //res.send('homepage: hello team!');
  res.render('index');
});

// route for login page - need to look into Google Auth
router.get('/login', (req, res) => {
  res.send('login page');
});

// route for page not found - need to set 404 header
router.get('*', (req, res) => {
  res.send('page not found 404');
});

module.exports = router;