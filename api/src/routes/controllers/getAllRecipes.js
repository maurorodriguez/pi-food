const axios = require('axios');
require('dotenv').config();
const { API_KEY, API_KEY2, API_KEY3 } = process.env;
const { Recipe, Diet } = require('../../db');

const getAllRecipes = async (req, res, next) => {
  try {
    const rawData = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    );

    const apiSearch = rawData.data.results.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.title,
        image: recipe.image,
        diets: recipe.diets,
        dishTypes: recipe.dishTypes,
        healthScore: recipe.healthScore,
        steps: recipe.analyzedInstructions.length
          ? recipe.analyzedInstructions[0].steps.length
          : null,
      };
    });

    const recipesFromDb = await Recipe.findAll({ include: Diet });

    res.status(200).send(recipesFromDb.concat(apiSearch));
  } catch (error) {
    next(error);
  }
};

module.exports = getAllRecipes;
