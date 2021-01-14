const express = require('express');
const router = express.Router();

// route to send
router.get('/', (req, res) => {
  res.send('Welcome dashboard with form');
});

// route to recieve user's form submission for new logs
router.post('/add', (req, res) => {
  const { name } = req.body;
  console.log(name);
  res.render('add', {'name': name});
});

// route to send user affirmation and gif after form submission
router.get('/message', (req, res) => {
  res.render('message');
});

module.exports = router;