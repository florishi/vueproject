const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// route to load dashboard form page
router.get('/', (req, res) => {
  res.render('dashboard');
});

// route to recieve user's dashboard submission, save to db and redirect to message page
router.post('/', (req, res) => {
  console.log(`req ${req}`);
  //console.log(`id paramter: ${req.params.id}`);
  const { mood, water, steps, sleep, exercise } = req.body;
  console.log(`mood: ${mood} water: ${water} steps: ${steps} sleep: ${sleep} exercise: ${exercise}`);
  //___________CREATE SEQUELIZE QUERY HERE TO SAVE TO DB___________//
  return res.send({redirect: '/dashboard/message'});
});

// route to load affirmation page from an api call. Need to get name from db to personalise experience
router.get('/message/', (req, res) => {
  fetch('https://www.affirmations.dev/')
    .then( res => res.json())
    .then( data => console.log(`affirmation: ${data.affirmation}`))
    .catch( err => console.log(`error getting message: ${err}`));
  //console.log(req.params.id);
  //___________CREATE SEQUELIZE QUERY HERE TO GET NAME FROM DB AND THEN PASS TO RENDER ENGINE___________//
  const testData = {
    'name': 'Sandy'
  };
  res.render('message', { testData });
});
// route to send user history logs
router.get('/history', (req, res) => {
//-------------CREATE SEQUELIZE QUERY HERE TO GET ALL HISTORY LOGS FROM DB AND THEN PASS TO RENDER ENGINE--------//
  const testData = {
    'mood': 'Relaxed',
    'water': 2,
    'timestamp': '15/01/2021'
  };
  res.render('history', { testData });
});

// route for clearing session and redirecting to homepage
router.get('/logout', (req, res) => {
  res.redirect('/');
});


module.exports = router;