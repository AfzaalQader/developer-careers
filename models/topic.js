const Sequelize = require('sequelize')
const db = require('../config/db/db');
const topicMetadata = require('../models/topic-metadata');

const Topic = db.define('topic', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Relations
Topic.hasMany(topicMetadata);
// Topic.hasMany(Topic);

module.exports = Topic;