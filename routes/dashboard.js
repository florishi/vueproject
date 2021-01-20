const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const userQuery = require('../models/user');
const orm = require('../config/orm');
let em = []
// route to load dashboard form page
router.get('/:userId', (req, res) => {
  res.render('dashboard', {layout:'form'});
});

// route to recieve user's dashboard submission, save to db and redirect to message page
router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const date = new Date().toISOString().split('T')[0];
    const { mood, water, steps, sleep, exercise, calorie, alcohol, coffee } = req.body;
    const email = req.body.email
    console.log(`mood: ${mood} water: ${water} steps: ${steps} sleep: ${sleep} exercise: ${exercise} date :${date} email :${email}`);
    const user = await orm.Users.findOne({where:{Email:email}, raw :true}).then((data) => data)
    em.push(email)
    console.log(em)
    userQuery.createStress(user.id,mood,sleep,exercise,coffee,date);
    userQuery.createHealth(user.id,water,alcohol,steps,calorie,date);
    return res.send({redirect: `/dashboard/${userId}/message`});
  } catch(error) {
    console.log(error);
    res.status(500).json( { success: false, payload: { mesaage: 'failed to save to database' }} );
  }
});

// route to load affirmation page from an api call. Need to get name from db to personalise experience
router.get('/:userId/message/', async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await fetch('https://www.affirmations.dev/');
    if (response.ok) {
      const payload = await response.json();
      console.log(payload);
      // CREATE SEQUELIZE QUERY HERE TO GET NAME FROM DB
      const getDataUser = await orm.Users.findAll({where:{sessionId:userId}, raw :true}).then((data) => data)
      
      res.render('message', {layout:'logs', payload,getDataUser});
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
    //const userId = req.params.userId;
    console.log("email",em)
    //const getDataUser = await userQuery.select(Users,userId);
    //const getDataStress = await userQuery.select(Stress,userId);
    //const getDataHealth = await userQuery.select('Health', userId);
    //const getUser = await orm.Users.findAll({where:{}})
    
    const user = await orm.Users.findOne({where:{sessionId:userId}, raw :true}).then((data) => data)
    console.log("user",user)
    const getDataStress = await orm.Stress.findAll({where:{usersId:user.id}, raw: true}).then((data) => {
      console.log(data);
      return data
    });
   const getDataHealth =await orm.Health.findAll({where:{usersId:user.id}, raw: true}).then((data) => {
      console.log(data);
      return data
    });
    console.log('data got', getDataStress);
    const getData = { 'mood': 'relaxed'};
    res.render('history', { layout:'logs', getData });
  } catch(error) {
    console.log(error);
    res.render('history');
  }
});

// route to send user mood logs
router.get('/:userId/mood', async (req, res) => {
  const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL MOOD LOGS FOR THIS USER
    //const getData = await userQuery.select('Stress',userId);
    //console.log("getData",getData)
    const user = await orm.Users.findOne({where:{sessionId:userId}, raw :true}).then((data) => data)
    const getData = await orm.Stress.findAll({where:{usersId:user.id}, raw: true}).then((data) => {
      return data
    });
    console.log(getData)
    res.render('mood', { getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user excercise logs
router.get('/:userId/exercise', async (req, res) => {
  const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL EXERCISE LOGS FOR THIS USER
    const user = await orm.Users.findOne({where:{sessionId:userId}, raw :true}).then((data) => data)
    const getData = await orm.Stress.findAll({where:{usersId:user.id}, raw: true}).then((data) => {
      return data
    });
    res.render('exercise', { layout:'logs', getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user sleep logs
router.get('/:userId/sleep', async (req, res) => {
  const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL SLEEP LOGS FOR THIS USER
    const user = await orm.Users.findOne({where:{sessionId:userId}, raw :true}).then((data) => data)
    const getData = await orm.Stress.findAll({where:{usersId:user.id}, raw: true}).then((data) => {
      return data
    });
    res.render('sleep', { layout:'logs', getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user coffee logs
router.get('/:userId/coffee', async (req, res) => {
  const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL COFFEE LOGS FOR THIS USER
    const user = await orm.Users.findOne({where:{sessionId:userId}, raw :true}).then((data) => data)
    const getData = await orm.Stress.findAll({where:{usersId:user.id}, raw: true}).then((data) => {
      return data
    });
    res.render('coffee', { layout:'logs', getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user water logs
router.get('/:userId/water', async (req, res) => {
  const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL WATER LOGS FOR THIS USER
    const user = await orm.Users.findOne({where:{sessionId:userId}, raw :true}).then((data) => data)
    const getData = await orm.Health.findAll({where:{usersId:user.id}, raw: true}).then((data) => {
      return data
    });
    res.render('water', { layout:'logs', getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user alcohol logs
router.get('/:userId/alcohol', async (req, res) => {
  const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL ALCOHOL LOGS FOR THIS USER
    const user = await orm.Users.findOne({where:{sessionId:userId}, raw :true}).then((data) => data)
    const getData = await orm.Health.findAll({where:{usersId:user.id}, raw: true}).then((data) => {
      return data
    });
    console.log(getData)
    res.render('alcohol', { layout:'logs', getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user steps logs
router.get('/:userId/steps', async (req, res) => {
  const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL STEPS LOGS FOR THIS USER
    const user = await orm.Users.findOne({where:{sessionId:userId}, raw :true}).then((data) => data)
    const getData = await orm.Health.findAll({where:{usersId:user.id}, raw: true}).then((data) => {
      return data
    });
    res.render('steps', { layout:'logs', getData });
  } catch(error) {
    console.log(error);
    res.render();
  }
});

// route to send user calories logs
router.get('/:userId/calories', async (req, res) => {
  const userId = req.params.userId;
  try {
    // CREATE SEQUELIZE QUERY TO GET ALL CALORIES LOGS FOR THIS USER
    const user = await orm.Users.findOne({where:{sessionId:userId}, raw :true}).then((data) => data)
    const getData = await orm.Health.findAll({where:{usersId:user.id}, raw: true}).then((data) => {
      return data
    });
    res.render('calories', { layout:'logs', getData });
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
