module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    source: DataTypes.STRING,
    link: DataTypes.STRING,
    ingredients: DataTypes.STRING
  })
  return Recipe;
}