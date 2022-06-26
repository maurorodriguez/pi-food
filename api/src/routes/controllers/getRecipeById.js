const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../../db');

const getRecipeById = async (req, res, next) => {
  try {
    const idToSearch = req.params.id;
    const recipe = [];

    if (isNaN(idToSearch)) {
      recipe.push(await Recipe.findByPk(idToSearch, { include: Diet }));
    } else {
      const rawData = await axios.get(
        `https://api.spoonacular.com/recipes/${idToSearch}/information?apiKey=${API_KEY}`
      );
      const { id, title, image, diets, healthScore, analyzedInstructions } =
        rawData.data;
      recipe.push({
        id: id,
        name: title,
        image: image,
        diets: diets,
        healthScore: healthScore,
        steps: analyzedInstructions[0].steps.map((step) => {
          return step.step;
        }),
      });
    }
    res.status(200).send(recipe);
  } catch (error) {
    next(error);
  }
};

module.exports = getRecipeById;
