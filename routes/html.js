const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const {select,createUsers,...rest} = require('../config/orm');

console.log(select,rest);
// route for home page
router.get('/', (req, res) => {
  res.render('index');
});

// route for login page
router.get('/login', (req, res) => {
  res.render('login');
});

// route for login page to accept user login form values
router.post('/login', async (req, res) => {
  try {
    let { name, email, userId } = req.body;
    console.log(`email is: ${email}`);
    console.log(`name: ${name}`);
    console.log(`local storage id:${userId}`);
    if (!userId) {
      userId = nanoid();
    }
    // CREATE SEQUELIZE QUERY HERE TO SAVE NAME, EMAIL AND USERID TO DB
    createUsers(email,name);
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