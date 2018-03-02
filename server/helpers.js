const db = require('../models');
require('dotenv').config();

const processData = function (data) {
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
}

const apiCall = function (query, callback) {
  request(`https://api.edamam.com/search?q=${query}&app_id=${process.env.APPID}&app_key=${process.env.APIKEY}`, function (error, response, body) {
    var dataParsed = JSON.parse(body);
    var processed = processData(dataParsed.hits);
    console.log('processed:', processed);
    callback(processed);
  })
};

