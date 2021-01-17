const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const {Users,select,createUsers,createStress,createHealth} = require('../config/orm');
console.log(createUsers);
// route to load dashboard form page
router.get('/:userId', (req, res) => {
  res.render('dashboard');
});

// route to recieve user's dashboard submission, save to db and redirect to message page
router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { mood, water, steps, sleep, exercise } = req.body;
    console.log(`mood: ${mood} water: ${water} steps: ${steps} sleep: ${sleep} exercise: ${exercise}`);
    // CREATE SEQUELIZE QUERY HERE TO SAVE TO DB
    select(Users,1);
    createStress(mood,sleep,exercise);
    createHealth(water,steps);
    return res.send({redirect: `/dashboard/${userId}/message`});
  } catch(error) {
    console.log(error);
    res.status(500).json( { success: false, payload: { mesaage: 'failed to save to database' }} );
    //res.render('message'); decide if to render message page or throw message as won't be able to get history
  }
});

// route to load affirmation page from an api call. Need to get name from db to personalise experience
router.get('/:userId/message/', async (req, res) => {
  try {
    const response = await fetch('https://www.affirmations.dev/');
    if (response.ok) {
      const payload = await response.json();
      // CREATE SEQUELIZE QUERY HERE TO GET NAME FROM DB, STORE AS A VARIABLE AND THEN PASS TO RENDER ENGINE
      res.render('message', { payload });
    }
  } catch(error) {
    console.log(error);
    res.render('message', { mesaage: 'insert static affirmation here as unable to get from api' });
  }
});

// route to send user history logs
router.get('/:userId/history', async (req, res) => {
  //const userId = req.params.userId;
  try {
  // CREATE SEQUELIZE QUERY HERE TO GET ALL HISTORY LOGS FROM DB AND THEN PASS TO RENDER ENGINE
  // eg const getData = await User.findByPK(userId);
    const getData = { 'mood': 'relaxed'};
    res.render('history', { getData });
  } catch(error) {
    console.log(error);
    res.render('history');
  }
});

// route for clearing session and redirecting to homepage
router.get('/:userId/logout', (req, res) => {
  res.redirect('/');
});

module.exports = router;



