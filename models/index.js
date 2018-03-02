'use strict';

var Sequelize = require('sequelize')
  , sequelize = null

// if (process.env.HEROKU_POSTGRESQL_PURPLE_URL) {
//   // the application is executed on Heroku ... use the postgres database
//   sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_PURPLE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     port: process.env.PORT,
//     logging: true,
//     operatorsAliases: false
//   })
// } else {
  // the application is executed on the local machine ... use mysql
  sequelize = new Sequelize('saveRecipes', 'root', null, {
    host: 'localhost',
    dialect: "mysql",
    port: 3000
    // dialectOptions: {
    //   socketPath: "/var/run/mysqld/mysqld.sock"
    // }
  })

  sequelize
    .authenticate()
    .then(function (err) {
      console.log('Connection has been established successfully.');
    }, function (err) {
      console.log('Unable to connect to the database:', err);
    });
// }

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  User: sequelize.import(__dirname + '/user'),
  Recipe: sequelize.import(__dirname + '/recipe')
}

// Associations
db.Recipe.belongsToMany(db.User, { through: 'UserRecipe' });
db.User.belongsToMany(db.Recipe, { through: 'UserRecipe' });


module.exports = db;