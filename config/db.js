const {Sequelize,DataTypes} = require('sequelize');
const mysql = require('mysql')
require('dotenv').config();

 const connection = new Sequelize(
  process.env.DB_name,
  process.env.DB_username,
  process.env.DB_password,
  { host: process.env.DB_localhost,
    dialect: 'mysql'
  }); 
connection.authenticate().then(()=>{
    console.log("all good");
  });
module.exports = {connection,DataTypes}