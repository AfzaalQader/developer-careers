const express = require('express');
const router = express.Router();

const TopicMetadata = require('../models/topic-metadata');

router.post('/post-topic-metadata', (req, res) => {
    for (let i = 0; i < req.body.fieldListSubmit.length; i++) {
        console.log('req.body.fieldListSubmit[i]');
        console.log(req.body.fieldListSubmit[i]);

        TopicMetadata.create({
            topicId: req.body.topicId,
            tagId: req.body.fieldListSubmit[i].tagId,
            value: req.body.fieldListSubmit[i].text
        });
    }

    res.send({
        isSuccess: true
    });
});


module.exports = router;