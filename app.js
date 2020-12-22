const express = require('express');
const app = express();
var cors = require('cors')
var bodyParser = require('body-parser')

const topic = require('./routes/topic');
const topicMetadata = require('./routes/topic-metadata');
const tag = require('./routes/tag');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/topics', topic);
app.use('/topics-metadata', topicMetadata);
app.use('/tags', tag);


const db = require('./config/db/db');
//Server 
db.sync({
    // force: true -- Note: Warning! This will re-create the complete database and data will be lost.
    // alter: true, // -- Use when you want to update table schema without loosing the data.
}, (req, res) => {});


app.listen('3000', () => {
    console.log("Server is listening on Port: " + 3000);
});