const db = require('../models');
const bcrypt = require('bcrypt');
const request = require('request');
require('dotenv').config();

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

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
    .spread((recipe, create) => {
      db.User.findOne({
        where: {username: username}
      })
        .then(user => {
          user.addRecipe(recipe);
          callback(null, 'recipe saved');
        })
    })
};

const getFavRecipes = (username, callback) => {
  // gets recipes associated with that user
  db.User.findOne({
    where: {username: username}
  })
    .then(user => {
      user.getRecipes()
        .then(recipes => {
          console.log('recipes from getFavRecipes:', recipes);
          callback(null, recipes);
        })
    })
};

const checkUser = (username, password, callback) => {
  db.User.findOne({
    where: {username: username}
  })
    .then(user => {
      console.log('user in checkUser:', user);
      const isMatch = bcrypt.compareSync(password, user.password);
      isMatch ? callback(null, username) : callback(true);
    })
};

module.exports.apiCall = apiCall;
module.exports.addUser = addUser;
module.exports.saveRecipe = saveRecipe;
module.exports.getFavRecipes = getFavRecipes;
module.exports.checkUser = checkUser;