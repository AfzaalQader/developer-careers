const express = require('express');
const router = express.Router();

const Topic = require('../models/topic');
const TopicMetadata = require('../models/topic-metadata');
const Tag = require('../models/tag');

router.get('/get-all-topics', async (req, res) => {
    console.log('get-all-topics called...!');
    let topicObj = await Topic.findAll({
        attributes: ['id', 'name', 'pId']
    });

    res.status(200).json({
        Response: topicObj
    });
});

router.get('/get-topic-metadata', async (req, res) => {
    console.log('get-topic-metadata called...!');

    let topicMetadataObj = await Topic.findAll({
        where: {
            id: req.query.topicId
        },
        attributes: ['id', 'name'],
        include: [{
            model: TopicMetadata,
            attributes: ['value'],
            include: [{
                model: Tag,
                attributes: ['name']
            }]
        }]
    });

    res.status(200).json({
        Response: topicMetadataObj
    });
});


module.exports = router;