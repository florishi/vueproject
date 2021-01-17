const {Sequelize,DataTypes} = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
  process.env.DB_name,
  'root',
  'C449015t',
  { host: process.env.DB_localhost,
    dialect: 'mysql'
  });

connection.authenticate().then(()=>{
  console.log('Connection has been established successfully.');
});

module.exports = {connection,DataTypes};