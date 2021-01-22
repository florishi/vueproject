const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const userQuery = require('../models/user');
const orm = require('../config/orm');


// route for home page
router.get('/', (req, res) => {
  res.render('index');
});

// route for login page
router.get('/login', (req, res) => {
  res.render('login', {layout:'form'});
});

// route for login page to accept user login form values
router.post('/login', async (req, res) => {
  try {
    let { name, email, userId } = req.body;
    userId = nanoid();
    let user = await orm.Users.findOne({where:{Email:email}, raw :true});
    console.log('nanoid',userId);
    console.log(`email is: ${email}`);
    console.log(`name: ${name}`);
    console.log(`local storage id:${userId}`);
    // CREATE SEQUELIZE QUERY HERE TO SAVE NAME, EMAIL AND USERID TO DB
    if(user === null){
      await userQuery.createUsers(userId,email,name);
    }
    if(user !== null){
      await orm.Users.update({sessionId : userId,userName:name}, {where:{id : user.id}});
    }
    res.json({ userId: userId});
  } catch(error) {
    console.log(error);
    res.render('message');
  }
});

// route for page not found
router.get('*', (req, res) => {
  res.status(404).json( { success: false, payload: { mesaage: 'Sorry, we cannot find that page!' }} );
});

module.exports = router;