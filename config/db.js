const {Sequelize,DataTypes} = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
  process.env.DB_name,
  process.env.DB_username,
  process.env.DB_password,
  { host: process.env.DB_localhost,
    dialect: 'mysql'
  });



module.exports = {connection,DataTypes}