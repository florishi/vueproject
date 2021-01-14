const express = require('express');
const router = express.Router();

// route for home page
router.get('/', (req, res) => {
  res.render('index');
});

// route for login page - need to take express-session cookie id
router.get('/login', (req, res) => {
  res.render('login');
});

// route for clearing session and redirecting to homepage
router.get('/logout', (req, res) => {
  res.redirect('/');
});

// route for page not found
router.get('*', (req, res) => {
  res.send('sorry, page not found').status(404);
});

module.exports = router;