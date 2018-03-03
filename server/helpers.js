const db = require('../models');
const bcrypt = require('bcrypt');
const request = require('request');
require('dotenv').config();

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
  console.log('query in apiCall:', query)
  console.log('appkey:', process.env.APP_ID);
  request(`https://api.edamam.com/search?q=${query}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`, (err, response, body) => {
    if (err) {
      callback(err);
    } 
    
    var dataParsed = JSON.parse(body);
    var processed = processData(dataParsed.hits);
    console.log('processed:', processed);
    callback(null, processed);
  })
};

const hashPassword = password => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  };


const addUser = (username, password, callback) => {
  const hashed = hashPassword(password);
  console.log('hashed:', hashed);
  db.User.findOrCreate({
    where: {username: username},
    defaults: {password: hashed}
  })
    .spread((user, created) => {
      if (!created) {
        console.log('username already taken in helpers/addUser');
        callback('username already taken');
      } else {
        console.log('new user created:', user);
        callback(null, user.username);
      }
    })
};

const saveRecipe = (username, recipe, callback) => {
  db.Recipe.findOrCreate({
    where: {title: recipe.title},
    defaults: {
      image: recipe.image,
      source: recipe.source,
      link: recipe.link,
      ingredients: JSON.stringify(recipe.ingredients),
    }
  })
};

const getFavRecipes = () => {
  // gets recipes associated with that user
};

const checkUser = () => {
  // checks if user exists
  // if so, checks if passwords match
};

module.exports.apiCall = apiCall;
module.exports.addUser = addUser;
module.exports.saveRecipe = saveRecipe;