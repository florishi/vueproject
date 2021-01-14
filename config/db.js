const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
  process.env.DB_name,
  process.env.DB_username,
  process.env.DB_password,
  { host: process.env.DB_localhost,
    dialect: 'mysql'
  });

connection.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((e) =>{
  console.log(e);
});