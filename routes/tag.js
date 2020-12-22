const express = require('express');
const router = express.Router();

const Tag = require('../models/tag');

router.get('/get-all-tags', async (req, res) => {
    console.log('get-all-tags called...!');
    let tagObj = await Tag.findAll({
        attributes: ['id', 'name']
    });

    res.status(200).json({
        Response: tagObj
    });
});


module.exports = router;