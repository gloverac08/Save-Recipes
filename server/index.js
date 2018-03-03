const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const db = require('../models');
require('dotenv').config();


const port = process.env.PORT || 3306;
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

// Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder
app.post('/', function(req, res) {
  
})

db.sequelize.sync({force: true}).then(() => {
  app.listen(port, () => {
    console.log('listening on port ' + port + '!');
  })
});