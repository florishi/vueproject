const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');

// route for home page
router.get('/', (req, res) => {
  //console.log(req.session);
  res.render('index');
});

// route for login page
router.get('/login', (req, res) => {
  res.render('login');
});

// route for login page to accept user login form values
router.post('/login', (req, res) => {
  const { name, email } = req.body;
  console.log(`email is: ${email}`);
  console.log(`name: ${name}`);
  const id = nanoid();
  //-------------CREATE SEQUELIZE QUERY HERE TO SAVE TO DB------------//
  return res.send({redirect: `/dashboard/?=${id}`});
});

// route for page not found
router.get('*', (req, res) => {
  res.status(404).send('Sorry, we cannot find that page!');
});

module.exports = router;