const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const userQuery = require('../models/user');

// route to load dashboard form page
router.get('/:userId', (req, res) => {
  res.render('dashboard', {layout:'form'});
});

// route to recieve user's dashboard submission, save to db and redirect to message page
router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { mood, water, steps, sleep, exercise } = req.body;
    console.log(`mood: ${mood} water: ${water} steps: ${steps} sleep: ${sleep} exercise: ${exercise}`);
    // CREATE SEQUELIZE QUERY HERE TO SAVE TO DB
    userQuery.createStress(userId,mood,sleep,exercise);
    userQuery.createHealth(userId,water,steps);
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
    const getDataUser = await user.userQuery.select(Users,userId);
    const getDataStress = await userQuery.select(Stress,userId);
    const getDataHealth = await userQuery.select(Health,userId);
    console.log('data got',getDataUser,getDataStress,getDataHealth);
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



