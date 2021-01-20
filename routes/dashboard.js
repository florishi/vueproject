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
    //const date = new Date().toISOString().split('T')[0];
    const { mood, water, steps, sleep, exercise, calorie, alcohol, coffee } = req.body;
    console.log(`mood: ${mood} water: ${water} steps: ${steps} sleep: ${sleep} exercise: ${exercise}`);
    userQuery.createStress(userId,mood,sleep,exercise,coffee);
    userQuery.createHealth(userId,water,alcohol,steps,calorie);
    return res.send({redirect: `/dashboard/${userId}/message`});
  } catch(error) {
    console.log(error);
    res.status(500).json( { success: false, payload: { mesaage: 'failed to save to database' }} );
  }
});

// route to load affirmation page from an api call. Need to get name from db to personalise experience
router.get('/:userId/message/', async (req, res) => {
  try {
    //const userId = req.params.userId;
    const response = await fetch('https://www.affirmations.dev/');
    if (response.ok) {
      const payload = await response.json();
      console.log(payload);
      // CREATE SEQUELIZE QUERY HERE TO GET NAME FROM DB
      res.render('message', {layout:'logs', payload});
    }
  } catch(error) {
    console.log(error);
    res.render('message', { mesaage: 'insert static affirmation here as unable to get from api' });
  }
});

// route to send user history dashboard
router.get('/:userId/history', async (req, res) => {
  const userId = req.params.userId;
  try {
  // CREATE SEQUELIZE QUERY HERE TO GET ALL HISTORY LOGS FROM DB

    //const getDataUser = await userQuery.select(Users,userId);
    //const getDataStress = await userQuery.select(Stress,userId);
    const getDataHealth = await userQuery.select('Health', userId);
    console.log('data got', getDataHealth);
    const getData = { 'mood': 'relaxed'};
    res.render('history', { getData });
  } catch(error) {
    console.log(error);
    res.render('history');
  }
});

// route to send user mood logs
router.get('/:userId/mood', async (req, res) => {
  const userId = req.params.userId;
  console.log(userId)
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL MOOD LOGS FOR THIS USER
    const getData = await userQuery.select('Stress',userId);
    console.log("getData",getData)
    res.render('mood', { getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user excercise logs
router.get('/:userId/excercise', async (req, res) => {
  //const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL EXERCISE LOGS FOR THIS USER
    const getData = { 'exercise': 1};
    res.render('excerise', { getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user sleep logs
router.get('/:userId/sleep', async (req, res) => {
  //const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL SLEEP LOGS FOR THIS USER
    const getData = { 'sleep': 8};
    res.render('sleep', { getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user coffee logs
router.get('/:userId/coffee', async (req, res) => {
  //const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL COFFEE LOGS FOR THIS USER
    const getData = { 'coffee': 2};
    res.render('coffee', { getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user water logs
router.get('/:userId/water', async (req, res) => {
  //const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL WATER LOGS FOR THIS USER
    const getData = { 'water': 2};
    res.render('water', { getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user alcohol logs
router.get('/:userId/alcohol', async (req, res) => {
  //const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL ALCOHOL LOGS FOR THIS USER
    const getData = { 'alcohol': 0};
    res.render('alcohol', { getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user steps logs
router.get('/:userId/steps', async (req, res) => {
  //const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL STEPS LOGS FOR THIS USER
    const getData = { 'steps': 5000};
    res.render('steps', { getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user calories logs
router.get('/:userId/calories', async (req, res) => {
  //const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL CALORIES LOGS FOR THIS USER
    const getData = { 'calories': 2100};
    res.render('calories', { getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route for redirecting to homepage
router.get('/:userId/logout', (req, res) => {
  res.redirect('/');
});

module.exports = router;
