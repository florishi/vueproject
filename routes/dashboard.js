const express = require('express');
const router = express.Router();

// route to send user form
router.get('/', (req, res) => {
  res.render('add');
});

// route to send user affirmation and gif after form submission
router.get('/message', (req, res) => {
  res.render('message');
});

// route to recieve user's form submission for new logs
router.post('/add', (req, res) => {
  const { name } = req.body;
  console.log(name);
  res.json(name);
});



module.exports = router;