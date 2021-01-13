const express = require('express');
const router = express.Router();

// route to send user mood history
router.get('/mood', (req, res) => {
  res.send('mood history...');
});

// route to send user steps history
router.get('/steps', (req, res) => {
  res.send('steps history...');
});

// route to send user water history
router.get('/water', (req, res) => {
  res.send('water history...');
});

// route to send user gratitude history
router.get('/journal', (req, res) => {
  res.send('gratitude history...');
});

// route to send user saved affirmation history
router.get('/affirmations', (req, res) => {
  res.send('saved affirmations history...');
});

module.exports = router;