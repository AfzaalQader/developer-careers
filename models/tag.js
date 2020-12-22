const Sequelize = require('sequelize')
const db = require('../config/db/db');
const topicMetadata = require('../models/topic-metadata');

// db schema
const Tag = db.define('tag', {
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
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Relations
// Tag.hasMany(topicMetadata);

module.exports = Tag;