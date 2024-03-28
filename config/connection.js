// config/connection.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task', 'postgres', 'Test@123', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
