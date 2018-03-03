const db = require('../models');
require('dotenv').config();
const bcrypt = require('bcrypt');

const processData = (data) => {
  var recipes = [];
  data.forEach(function (item) {
    recipes.push({
      title: item.recipe.label,
      image: item.recipe.image,
      source: item.recipe.source,
      link: item.recipe.shareAs,
      ingredients: item.recipe.ingredientLines
    });
  })
  return recipes;
};

const apiCall = (query, callback) => {
  request(`https://api.edamam.com/search?q=${query}&app_id=${process.env.APPID}&app_key=${process.env.APIKEY}`, function (error, response, body) {
    var dataParsed = JSON.parse(body);
    var processed = processData(dataParsed.hits);
    console.log('processed:', processed);
    callback(processed);
  })
};

const hashPassword = password => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(userObj.password, salt);
    return hash;
  };


const addUser = (user, password, callback) => {
  db.User.findOrCreate({
    where: {username: user},
    defaults: {password: password}
  })
    .spread((user, created) => {
      if (!created) {
        console.log('username already taken in helpers/addUser');
        callback('username already taken');
      } else {
        console.log('new user created:', user);
        callback(null, user);
      }
    })
};