const Sequelize = require('sequelize')


const connection = new Sequelize('BLOG_PRESS', 'root', 'seattle6565301', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00'
});

module.exports = connection;
