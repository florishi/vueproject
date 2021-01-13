const express = require('express');
const router = express.Router();

// route to send
router.get('/', (req, res) => {
  res.send('Welcome dashboard with form');
});

// route to recieve user's form submission for new logs
router.post('/add', (req, res) => {
  res.send('route for recieving POST request');
});

// route to send user affirmation and gif after form submission
router.get('/message', (req, res) => {
  res.send('here is your affirmation and gif...');
});

module.exports = router;