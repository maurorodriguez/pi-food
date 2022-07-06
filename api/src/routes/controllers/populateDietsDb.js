const { Diet } = require('../../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const populateDietsDb = async (req, res, next) => {
  try {
    const diets = await Diet.findAll();
    if (!diets.length) {
      const rawData = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
      );
      rawData.data.results.forEach((recipe) => {
        recipe.diets.forEach(async (diet) => {
          await Diet.findOrCreate({
            where: {
              name: diet,
            },
          });
        });
      });
      return res.status(201).send('Diets have been successfully created');
    }

    return res.status(200).send(diets);
  } catch (error) {
    next(error);
  }
};

module.exports = populateDietsDb;
