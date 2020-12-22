var credentials = require("./credentials.js");

const Sequelize = require('sequelize');
const db = new Sequelize(credentials.database, credentials.user, credentials.password, {
    host: credentials.host,
    dialect: 'mysql'
});

module.exports = db;