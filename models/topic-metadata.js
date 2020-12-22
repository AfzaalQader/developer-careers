const Sequelize = require('sequelize')
const db = require('../config/db/db');
const tag = require('../models/tag');

const TopicMetadata = db.define('topic_metadata', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    value: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

// Relations
TopicMetadata.belongsTo(tag);

module.exports = TopicMetadata;