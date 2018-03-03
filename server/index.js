const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const db = require('../models');
const helpers = require('./helpers');
require('dotenv').config();


const port = process.env.PORT || 3306;
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())


app.post('/createAccount', (req, res) => {
  console.log('req.body in /createAccount:', req.body);
  helpers.addUser(req.body.username, req.body.password, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/search', (req, res) => {
  console.log('req.body in /search:', req.body);
  helpers.apiCall(req.body.q, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.send(data);
  });
})

app.post('/saveRecipe', (req, res) => {
  console.log('req.body.recipe in /saveRecipes', req.body.recipe);
  helpers.saveRecipe(req.body.username, req.body.recipe, (err, data) => {
    if (err) {

    } 
    res.send(data);
  })
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log('listening on port ' + port + '!');
  })
});