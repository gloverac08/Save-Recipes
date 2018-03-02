const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const db = require('../models/index.js');


const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

// Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder
app.post('/', function(req, res) {
  
})

db.sequelize.sync().then(function () {
  app.listen(port, function() {
    console.log('listening on port ' + port + '!');
  });
});